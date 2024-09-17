import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {ArtistMutation} from "../types";
import {imagesUpload} from "../multer";

const artistRouter = express.Router();

artistRouter.get('/', async(req, res, next) => {
    try{
        const artists = await Artist.find();
        return res.send(artists);
    }catch (error){
        next(error);
    }
})

artistRouter.get('/:id', async(req, res, next) => {
    try{
        const artist = await Artist.findById(req.params.id);
        return res.send(artist);
    }catch (error){
        next(error);
    }
})

artistRouter.post('/', imagesUpload.single('image'),  async (req, res, next) => {
    try {

        const artistMutation: ArtistMutation = {
            name: req.body.name,
            description: req.body.description ? req.body.description : null,
            image: req.file ? req.file.filename : null,
        };

        const artist = new Artist(artistMutation);
        await artist.save();

        return res.send(artist);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

export default artistRouter;