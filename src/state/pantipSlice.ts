import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {PantipRoomData, type BloggangData, type HighLightData, type MarketData, type PantipTag, type PantipTopic} from '../types/pantip';

type PantipState = {
  room_data: PantipRoomData[],
  room_pantipmarket: MarketData[],
  room_bloggang: BloggangData[],
  get_highlight: HighLightData[],
  get_suggest_topic_behavior: PantipTopic[],
  get_suggest_topic_popular_room: PantipTopic[],
  get_suggest_topic_popular_tag: PantipTag[],
  get_annouce: [],
  get_tag_hit: PantipTag[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined | null,
}

const initialState: PantipState = {
  room_data: [],
  room_pantipmarket: [],
  room_bloggang: [],
  get_highlight: [],
  get_suggest_topic_behavior: [],
  get_suggest_topic_popular_room: [],
  get_suggest_topic_popular_tag: [],
  get_annouce: [],
  get_tag_hit: [],
  status: 'idle',
  error: null,
}


const axiosInstance = axios.create({
  headers: {
    'Ptauthorize': `Basic ${process.env.NEXT_PUBLIC_PANTIP_AUTH}`,
    
  },
});

export const fetchPantip = createAsyncThunk('pantip/fetchPantip', async () => {
  const tag_hit = await axiosInstance.get(
    'https://pantip.com/api/forum-service/home/get_tag_hit?limit=10'
  );
  const room_bloggang_data = await axiosInstance.get(
    'https://pantip.com/api/forum-service/forum/room_bloggang?room=all'
  );
  const room_pantipmarket_data = await axiosInstance.get(
    'https://pantip.com/api/forum-service/forum/room_pantipmarket?room=all'
  );
  const room_recommend_data = await axiosInstance.get(
    'https://pantip.com/api/forum-service/home/get_room_recommend'
  );
  const room_highlight_data = await axiosInstance.get(
    'https://pantip.com/api/forum-service/home/get_highlight'
  );
  const suggest_topic_behavior_data = await axiosInstance.get(
    'https://pantip.com/api/forum-service/home/get_suggest_topic_behavior', {
      params: {
        tracking_code: 'shxp8h15c6wnyJPN3DvU9'
      }
    }
  );
  const annouce_data = await axiosInstance.get(
    'https://pantip.com/api/forum-service/forum/get_announce?room=homepage&limit=3'
  );
  const suggest_topic_popular_room_data = await axiosInstance.post(
    'https://pantip.com/api/forum-service/home/get_suggest_topic_popular',
    new URLSearchParams({ type: 'room' })
  );
  const suggest_topic_popular_tag_data = await axiosInstance.post(
    'https://pantip.com/api/forum-service/home/get_suggest_topic_popular',
    new URLSearchParams({ type: 'tag' })
  );

  return {
    tag_hit_data: tag_hit.data.data,
    room_bloggang_data: room_bloggang_data.data.data,
    room_pantipmarket_data: room_pantipmarket_data.data.data,
    room_recommend_data: room_recommend_data.data.data,
    room_highlight_data: room_highlight_data.data.data,
    suggest_topic_behavior_data: suggest_topic_behavior_data.data.data[0].topics,
    annouce_data: annouce_data.data.data,
    suggest_topic_popular_room_data: suggest_topic_popular_room_data.data.data[0].topics,
    suggest_topic_popular_tag_data: suggest_topic_popular_tag_data.data.data,
  };
})

const pantipSlice = createSlice({
  name: 'pantip',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPantip.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPantip.fulfilled, (state, action: PayloadAction<ReturnType<typeof fetchPantip.fulfilled>['payload']>) => {
        state.status = 'succeeded';
        state.get_tag_hit = action.payload.tag_hit_data;
        state.room_bloggang = action.payload.room_bloggang_data;
        state.room_pantipmarket = action.payload.room_pantipmarket_data;
        state.room_data = action.payload.room_recommend_data;
        state.get_highlight = action.payload.room_highlight_data;
        state.get_suggest_topic_behavior = action.payload.suggest_topic_behavior_data;
        state.get_annouce = action.payload.annouce_data;
        state.get_suggest_topic_popular_room =  action.payload.suggest_topic_popular_room_data;
        state.get_suggest_topic_popular_tag =  action.payload.suggest_topic_popular_tag_data;
      })
      .addCase(fetchPantip.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default pantipSlice.reducer;