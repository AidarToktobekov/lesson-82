import express from "express";
import mongoose from "mongoose";
import {AlbumMutation} from "../types";
import {imagesUpload} from "../multer";
import Album from "../models/Album";

const albumRouter = express.Router();

albumRouter.get('/albums', async(req, res, next) => {
    try{
        const albums = await Album.find();
        return res.send(albums);
    }catch (error){
        next(error);
    }
})

albumRouter.get('/albums/:id', async(req, res, next) => {
    try{
        const albums = await Album.findById(req.params.id);
        return res.send(albums);
    }catch (error){
        next(error);
    }
})

albumRouter.get('/artistAlbums/:idArtist', async(req, res, next) => {
    try{
        const albums = await Album.find({artist: req.params.idArtist});
        return res.send(albums);
    }catch (error){
        next(error);
    }
})

albumRouter.post('/albums', imagesUpload.single('image'),  async (req, res, next) => {
    try {
        const albumMutation: AlbumMutation = {
            name: req.body.name,
            artist: req.body.artist,
            date: new Date(),
            image: req.file ? req.file.filename : null,
        };

        const albums = new Album(albumMutation);
        await albums.save();

        return res.send(albums);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

export default albumRouter;