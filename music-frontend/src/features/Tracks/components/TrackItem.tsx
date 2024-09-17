import { useAppDispatch } from "../../../app/hooks";
import { trackHistory } from "../../TrackHistory/trackHistoryThunk";

interface Props{
    id: string;
    name: string;
    trackNumber: number;
    duration: string;
    buttonState: boolean;
}

const TrackItem:React.FC<Props> = ({name, id, duration, trackNumber, buttonState})=>{
    const dispatch = useAppDispatch();

    const listenTrack = ()=>{
        dispatch(trackHistory({track: id}));
    }

    return(
        <div className="list-group-item d-flex align-items-center justify-content-between ">
            <div>
                {trackNumber}. {name} 
            </div>
            <div>
                {duration}
                <button disabled={buttonState} onClick={listenTrack} className="ms-3 btn btn-dark">
                    play
                </button>
            </div>
        </div> 
    )
}

export default TrackItem;