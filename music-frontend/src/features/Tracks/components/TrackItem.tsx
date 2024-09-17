interface Props{
    id: string;
    name: string;
    trackNumber: number;
    duration: string;
    buttonState: boolean;
}

const TrackItem:React.FC<Props> = ({name, duration, trackNumber, buttonState})=>{

    return(
        <div className="list-group-item d-flex align-items-center justify-content-between ">
            <div>
                {trackNumber}. {name} 
            </div>
            <div>
                {duration}
                <button disabled={buttonState} className="ms-3 btn btn-dark">
                    play
                </button>
            </div>
        </div> 
    )
}

export default TrackItem;