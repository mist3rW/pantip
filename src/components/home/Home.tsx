'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/libs/hook';
import { fetchPantip } from '@/state/pantipSlice';

import { Separator } from '../ui/separator';
import Popular from './Popular';
import Recommend from './Recommend';
import Bloggang from './Bloggang';
import HighLight from './HighLight';
import Market from './Market';
import RoomCarousel from './RoomCarousel';
import TagHits from './TagHits';

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    room_data,
    room_pantipmarket,
    room_bloggang,
    get_highlight,
    get_suggest_topic_behavior,
    get_suggest_topic_popular_room,
    get_tag_hit,
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
      <RoomCarousel data={room_data} />
      <h2 className="text-lg font-semibold">แท็กยอดนิยิม</h2>
      <Separator className="my-4" />
      <TagHits data={get_tag_hit} />
      <h2 className="text-lg font-semibold mt-4">Bloggang</h2>
      <Separator className="my-4" />
      <Bloggang data={room_bloggang} />
      <h2 className="mt-4 text-lg font-semibold">Pantip Market</h2>
      <Separator className="my-4" />
      <Market data={room_pantipmarket} />
      <h2 className="mt-4 text-lg font-semibold">กระทู้ไฮล์ไลท์</h2>
      <Separator className="my-4" />
      <HighLight data={get_highlight} />
      <h2 className="mt-4 text-lg font-semibold">กระทู้แนะนำ</h2>
      <Separator className="my-4" />
      <Recommend data={get_suggest_topic_behavior}/>
      <h2 className="mt-4 text-lg font-semibold">กระทู้ยอดนิยม</h2>
      <Separator className="my-4" />
      <Popular data={get_suggest_topic_popular_room}/>
    </div>
  );
}
