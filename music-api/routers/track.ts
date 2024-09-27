import express from "express";
import mongoose from "mongoose";
import { TrackMutation} from "../types";
import Track from "../models/Track";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get('/', async(req, res, next) => {
    try{
        const trackId = req.query.track_id as string;
        if (trackId){
            const track = await Track.findById(trackId);
            return res.send(track);
        }else {
            const tracks = await Track.find();
            return res.send(tracks);
        }
    }catch (error){
        next(error);
    }
})

tracksRouter.get('/album/:id', async(req, res, next) => {
    try{
        const tracks = await Track.find({album: req.params.id});
        return res.send(tracks);
    }catch (error){
        next(error);
    }
})

tracksRouter.get('/:id', async(req, res, next) => {
    try{
        const track = await Track.findById(req.params.id);
        return res.send(track);
    }catch (error){
        next(error);
    }
})

tracksRouter.post('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        if (!user) {
            res.status(403).send({error: 'Unauthorized'});
        }
        const albums = await Track.find({album: req.body.album});

        const tracksMutation = {
            name: req.body.name,
            duration: req.body.duration,
            album: req.body.album,
            trackNumber: albums.length + 1,
            user: user?._id,
        };

        const track = new Track(tracksMutation);
        await track.save();
        
        return res.send(tracksMutation);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

tracksRouter.delete('/:id', auth, permit('admin'), async(req, res, next)=>{
    try{
        const track = await Track.findByIdAndDelete(req.params.id);
        return res.send(track);
    }catch(e){
        next(e);
    }
});

export default tracksRouter;