import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ITrack, TrackMutation } from '../../types';
import { RootState } from '../../app/store';

export const fetchTracks = createAsyncThunk<ITrack[], string>('tracks/fetchAll', async (idAlbum) => {
  const { data: tracks } = await axiosApi.get<ITrack[]>(`/tracks/album/${idAlbum}`);
  return tracks;
});

export const createTrack = createAsyncThunk<void, TrackMutation, {state: RootState}>('tracks/create', async (trackMutation, {getState}) => {
  const token = getState().users.user?.token;
  await axiosApi.post<ITrack>('/tracks', trackMutation, {headers: {Authorization: `Bearer ${token}`}});
});
