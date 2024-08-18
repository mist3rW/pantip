import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

import type {
  BloggangData,
  HighLightData,
  MarketData,
  PantipRoomData,
  PantipTag,
  PantipTopic,
} from '../types/pantip';

type PantipState = {
  roomData: PantipRoomData[];
  roomPantipmarket: MarketData[];
  roomBloggang: BloggangData[];
  getHighlight: HighLightData[];
  getSuggestTopicBehavior: PantipTopic[];
  getSuggestTopicPopularRoom: PantipTopic[];
  getSuggestTopicPopularTag: PantipTag[];
  getAnnouce: [];
  getTagHit: PantipTag[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined | null;
};

const initialState: PantipState = {
  roomData: [],
  roomPantipmarket: [],
  roomBloggang: [],
  getHighlight: [],
  getSuggestTopicBehavior: [],
  getSuggestTopicPopularRoom: [],
  getSuggestTopicPopularTag: [],
  getAnnouce: [],
  getTagHit: [],
  status: 'idle',
  error: null,
};

const axiosInstance = axios.create({
  headers: {
    Ptauthorize: `Basic ${process.env.NEXT_PUBLIC_PANTIP_AUTH}`,
  },
});

export const fetchPantip = createAsyncThunk('pantip/fetchPantip', async () => {
  const tagHit = await axiosInstance.get(
    'https://pantip.com/api/forum-service/home/get_tag_hit?limit=10',
  );
  const roomBloggangData = await axiosInstance.get(
    'https://pantip.com/api/forum-service/forum/room_bloggang?room=all',
  );
  const roomPantipmarketData = await axiosInstance.get(
    'https://pantip.com/api/forum-service/forum/room_pantipmarket?room=all',
  );
  const roomRecommendData = await axiosInstance.get(
    'https://pantip.com/api/forum-service/home/get_room_recommend',
  );
  const roomHighlightData = await axiosInstance.get(
    'https://pantip.com/api/forum-service/home/get_highlight',
  );
  const suggestTopicBehaviorData = await axiosInstance.get(
    'https://pantip.com/api/forum-service/home/get_suggest_topic_behavior',
    {
      params: {
        tracking_code: 'shxp8h15c6wnyJPN3DvU9',
      },
    },
  );
  const annouceData = await axiosInstance.get(
    'https://pantip.com/api/forum-service/forum/get_announce?room=homepage&limit=3',
  );
  const suggestTopicPopularRoomData = await axiosInstance.post(
    'https://pantip.com/api/forum-service/home/get_suggest_topic_popular',
    new URLSearchParams({ type: 'room' }),
  );
  const suggestTopicPopularTagData = await axiosInstance.post(
    'https://pantip.com/api/forum-service/home/get_suggest_topic_popular',
    new URLSearchParams({ type: 'tag' }),
  );

  return {
    tag_hit_data: tagHit.data.data,
    room_bloggang_data: roomBloggangData.data.data,
    room_pantipmarket_data: roomPantipmarketData.data.data,
    room_recommend_data: roomRecommendData.data.data,
    room_highlight_data: roomHighlightData.data.data,
    suggest_topic_behavior_data: suggestTopicBehaviorData.data.data[0].topics,
    annouce_data: annouceData.data.data,
    suggest_topic_popular_room_data:
      suggestTopicPopularRoomData.data.data[0].topics,
    suggest_topic_popular_tag_data: suggestTopicPopularTagData.data.data,
  };
});

const pantipSlice = createSlice({
  name: 'pantip',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPantip.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchPantip.fulfilled,
        (
          state,
          action: PayloadAction<
            ReturnType<typeof fetchPantip.fulfilled>['payload']
          >,
        ) => {
          state.status = 'succeeded';
          state.getTagHit = action.payload.tag_hit_data;
          state.roomBloggang = action.payload.room_bloggang_data;
          state.roomPantipmarket = action.payload.room_pantipmarket_data;
          state.roomData = action.payload.room_recommend_data;
          state.getHighlight = action.payload.room_highlight_data;
          state.getSuggestTopicBehavior =
            action.payload.suggest_topic_behavior_data;
          state.getAnnouce = action.payload.annouce_data;
          state.getSuggestTopicPopularRoom =
            action.payload.suggest_topic_popular_room_data;
          state.getSuggestTopicPopularTag =
            action.payload.suggest_topic_popular_tag_data;
        },
      )
      .addCase(fetchPantip.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pantipSlice.reducer;
