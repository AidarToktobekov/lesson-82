import express from "express";
import mongoose from "mongoose";
import { TrackMutation} from "../types";
import Track from "../models/Track";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import Album from "../models/Album";

const tracksRouter = express.Router();

tracksRouter.get('/tracks', async(req, res, next) => {
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

tracksRouter.get('/tracks/:id', async(req, res, next) => {
    try{
        const tracks = await Track.find({album: req.params.id});
        return res.send(tracks);
    }catch (error){
        next(error);
    }
})

tracksRouter.post('/tracks',  async (req, res, next) => {
    try {
        const albums = await Track.find({album: req.body.album});

        const tracksMutation: TrackMutation = {
            name: req.body.name,
            duration: req.body.duration,
            album: req.body.album,
            trackNumber: albums.length + 1,
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

tracksRouter.post('/track_history',  async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');
        if (!headerValue){
            return res.status(401).send({error: 'Unauthorized'});
        }
        const [_bearer, token] = headerValue.split(' ');
        const user = await User.findOne({token});
        if (!user){
            return res.status(401).send({error: 'Unauthorized'});
        }
        const userHistory = {
            user: user._id,
            track: req.body.track,
            date: new Date().toISOString(),
        };

        const trackHistory = new TrackHistory(userHistory);
        await trackHistory.save();

        return res.send(userHistory);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

export default tracksRouter;