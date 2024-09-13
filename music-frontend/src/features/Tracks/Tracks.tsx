import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLoad, selectTracks } from "./tracksSlice";
import { selectOneAlbum } from "../Albums/albumsSlice";
import { useEffect } from "react";
import { fetchTracks } from "./trackThunk";
import { fetchArtist } from "../Artists/artistsThunk";
import { selectOneArtist } from "../Artists/artistsSlice";
import { fetchAlbum } from "../Albums/albumsThunk";
import TrackItem from "./components/TrackItem";

const Tracks = ()=>{

    const {id} = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const isFetching = useAppSelector(selectLoad);
    const albums = useAppSelector(selectOneAlbum);
    const artistId = albums?.artist;
    const artist = useAppSelector(selectOneArtist)


    useEffect(()=>{
        dispatch(fetchTracks(id));
        dispatch(fetchAlbum(id))
        if (artistId) {
            dispatch(fetchArtist(artistId))
        }
    }, [dispatch, artistId]);

    let content: React.ReactNode = (
        <h5 className="text-center my-5">
          No Tracks!
        </h5>
    );

    if (!isFetching) {
        content = tracks.map((track) => (
            <TrackItem key={track._id} duration={track.duration} trackNumber={track.trackNumber} name={track.name} id={track._id} />
        ));
    }

    return(
        <>
            <h3 className="text-center mt-4">
                {artist?.name}
            </h3>
            <h3 className="text-center my-4">
                {albums?.name}
            </h3>
            <div className="list-group">
                {content}
            </div>
        </>
    )
}

export default Tracks;