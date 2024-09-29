import {  useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { fetchArtist } from "../Artists/artistsThunk";
import { selectArtist } from "../Artists/artistsSlice";
import { selectAlbums, selectLoad } from "./albumsSlice";
import { fetchAlbums } from "./albumsThunk";
import AlbumsItem from "./components/AlbumsItem";
import { IAlbum } from "../../types";


const Albums = ()=>{

    const {id} = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const artist = useAppSelector(selectArtist);
    const artistId = artist?._id
    const isFetching = useAppSelector(selectLoad);
    const albums = useAppSelector(selectAlbums);
    let albumArtist:IAlbum[] = [];
    if(albums.length > 0){
        console.log(albums);
        albums.map((artist)=>{
            console.log(id + ' dd ' + artist.artist);
            
            if (artist.artist === id) {
                albumArtist.push(artist);
            }
        });
    }


    useEffect(()=>{
        dispatch(fetchArtist(id))
        if (artistId) {
            dispatch(fetchAlbums())
        }
    }, [dispatch, artistId]);

    let content: React.ReactNode = (
        <h5 className="text-center my-5">
          No albums!
        </h5>
    );

    if (!isFetching) {
        content = albumArtist.map((album) => (
            <AlbumsItem key={album._id} image={album.image} date={album.date} name={album.name} id={album._id} />
        ));
    }

    return(
        <>
            <h3 className="text-center my-4">
                    {artist?.name} 
            </h3>
            <div className="list-group">
                {content}
            </div>
        </>
    )
}

export default Albums;