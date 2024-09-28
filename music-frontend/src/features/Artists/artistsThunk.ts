import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ArtistMutation, IArtist } from '../../types';
import { RootState } from '../../app/store';

export const fetchArtists = createAsyncThunk<IArtist[]>('artists/fetchAll', async () => {
  const { data: artists } = await axiosApi.get<IArtist[]>('/artists');
  return artists;
});

export const fetchArtist = createAsyncThunk<IArtist, string>('artist/fetchOne',  async (id) => {
  const { data: artist } = await axiosApi.get<IArtist>(`/artists/${id}`);
  return artist;
});

export const createArtist = createAsyncThunk<void, ArtistMutation, {state: RootState}>('artist/create',  async (artistMutation, {getState}) => {
  const user = getState().users.user;
  const formData = new FormData();
  if (user) {    
    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
    keys.forEach((key) => {
      const value = artistMutation[key];
      if (value) {
        formData.append(key, value);
      }
    });
    await axiosApi.post<IArtist>(`/artists`, formData, {headers: {'Authorization': `Bearer ${user.token}`}});
  }

});