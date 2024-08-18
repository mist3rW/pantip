'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/libs/hook';
import { fetchPantip } from '@/state/pantipSlice';

import { Separator } from '../ui/separator';
import Bloggang from './Bloggang';
import HighLight from './HighLight';
import Market from './Market';
import Popular from './Popular';
import Recommend from './Recommend';
import RoomCarousel from './RoomCarousel';
import TagHits from './TagHits';

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    roomData,
    getTagHit,
    roomBloggang,
    roomPantipmarket,
    getHighlight,
    getSuggestTopicBehavior,
    getSuggestTopicPopularRoom,
    status,
    error,
  } = useAppSelector((state) => state.pantip);

  useEffect(() => {
    dispatch(fetchPantip());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">เลือกห้อง</h2>
      <Separator className="my-4" />
      <RoomCarousel data={roomData} />
      <h2 className="text-lg font-semibold">แท็กยอดนิยิม</h2>
      <Separator className="my-4" />
      <TagHits data={getTagHit} />
      <h2 className="mt-4 text-lg font-semibold">Bloggang</h2>
      <Separator className="my-4" />
      <Bloggang data={roomBloggang} />
      <h2 className="mt-4 text-lg font-semibold">Pantip Market</h2>
      <Separator className="my-4" />
      <Market data={roomPantipmarket} />
      <h2 className="mt-4 text-lg font-semibold">กระทู้ไฮล์ไลท์</h2>
      <Separator className="my-4" />
      <HighLight data={getHighlight} />
      <h2 className="mt-4 text-lg font-semibold">กระทู้แนะนำ</h2>
      <Separator className="my-4" />
      <Recommend data={getSuggestTopicBehavior} />
      <h2 className="mt-4 text-lg font-semibold">กระทู้ยอดนิยม</h2>
      <Separator className="my-4" />
      <Popular data={getSuggestTopicPopularRoom} />
    </div>
  );
}
