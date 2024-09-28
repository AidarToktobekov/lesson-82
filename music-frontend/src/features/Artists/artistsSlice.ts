import { createSlice } from "@reduxjs/toolkit";
import { IAlbum, IArtist } from "../../types";
import { createArtist, fetchArtist, fetchArtists } from "./artistsThunk";

interface ArtistsState {
    items: IArtist[];
    oneArtist: IArtist | null;
    artistAlbums: IAlbum[];
    artistFetching: boolean;
    itemsFetching: boolean;
}

const initialState: ArtistsState = {
    items: [],
    oneArtist: null,
    artistAlbums: [],
    artistFetching: false,
    itemsFetching: false,
}

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchArtists.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
                state.itemsFetching = false;
                state.items = artists;
            })
            .addCase(fetchArtists.rejected, (state) => {
                state.itemsFetching = false;
            })
            .addCase(fetchArtist.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(fetchArtist.fulfilled, (state, { payload: artist }) => {
                state.itemsFetching = false;
                state.oneArtist = artist;
            })
            .addCase(fetchArtist.rejected, (state) => {
                state.itemsFetching = false;
            })
            .addCase(createArtist.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(createArtist.fulfilled, (state) => {
                state.itemsFetching = false;
            })
            .addCase(createArtist.rejected, (state) => {
                state.itemsFetching = false;
            });
    },
    selectors: {
        selectArtists: (state)=>state.items,
        selectOneArtist: (state)=>state.oneArtist,
        selectLoad: (state)=>state.itemsFetching,
        selectArtist: (state)=>state.oneArtist,
    }
})

export const artistsReducer = artistsSlice.reducer;

export const {
    selectArtists,
    selectLoad,
    selectOneArtist,
    selectArtist,
  } = artistsSlice.selectors;