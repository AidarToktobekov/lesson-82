import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchArtists } from "./artistsThunk";
import { selectArtists, selectLoad } from "./artistsSlice";
import ArtistItem from "./components/ArtistItem";
import { Link } from "react-router-dom";

const Artists = ()=>{
    
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const isFetching = useAppSelector(selectLoad)

    let content: React.ReactNode = (
        <h5 className="text-center my-5">
            Artist list is empty
        </h5>
    );

    if (!isFetching) {
        content = artists.map((artist) => (
          <ArtistItem
            key={artist._id}
            id={artist._id}
            name={artist.name}
            image={artist.image}
          />
        ));
    }

    useEffect(()=>{
        dispatch(fetchArtists());
    },[dispatch])
    return(
        <>
        <div className="d-flex align-items-center justify-content-between">
            <h3 className="text-center my-4">
                Artists 
            </h3>
            <Link to='/add-new-artist' className="btn btn-dark">
                New Artist
            </Link>
        </div>
        <div className="list-group">
            {content}
        </div>
        </>
    )
}

export default Artists;