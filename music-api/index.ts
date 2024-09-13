import express from "express";
import config from "./config";
import cors from "cors";
import * as mongoose from "mongoose";
import artistRouter from "./routers/artist";
import albumRouter from "./routers/album";
import tracksRouter from "./routers/track";
import userRouter from "./routers/user";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors(config.corsOptions));
app.use(express.static('public'));
app.use('/', artistRouter);
app.use('/', albumRouter);
app.use('/', tracksRouter);
app.use('/user', userRouter);

const run = async()=>{
    await mongoose.connect('mongodb://localhost/homeWorks');
    app.listen(port,()=>{
        console.log('Listening on port ',port);
    });

    process.on('exit', ()=>{
        mongoose.disconnect();
    });
}

run().catch(console.error);