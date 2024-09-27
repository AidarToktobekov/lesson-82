import mongoose, {Types} from "mongoose";
import Album from "./Album";
import User from "./User";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    trackNumber: {
        type: Number,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: "Album",
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const album = await Album.findById(value);
                return Boolean(album);
            },
            message: 'Album does not exist!',
        }
    },
    isPublished: {
        type: Boolean,
        required: true,
    }
});

const Track = mongoose.model("Track", TrackSchema);

export default Track;