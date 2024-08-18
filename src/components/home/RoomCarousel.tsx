import type { PantipRoomData } from '@/types/pantip';
import Link from 'next/link';
import {  Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


type RoomCarouselProps = {
  data: PantipRoomData[];
};

export default function RoomCarousel({ data }: RoomCarouselProps) {
  return (
    <div>
      <Swiper
        modules={[Scrollbar]}
        scrollbar={{ draggable: true }}
        slidesPerView={12}
        spaceBetween={8}
        breakpoints={{
          320: {
            slidesPerView: 4,
          },
          480: {
            slidesPerView: 6,
          },
          640: {
            slidesPerView: 6,
          },
          768: {
            slidesPerView: 8,
          },
          1024: {
            slidesPerView: 8,
          },
          1280: {
            slidesPerView: 12,
          },
          1536: {
            slidesPerView: 12,
          },
        }}
        className='my-4'
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={item.link_url}>
              <div className="flex flex-col justify-center items-center overflow-hidden rounded-md">
                <img
                    src={item.room_icon_url}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-md bg-[#aeaeae] p-1"
                  />
                <p className="mt-2 px-2 text-center text-xs sm:text-sm">{item.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
