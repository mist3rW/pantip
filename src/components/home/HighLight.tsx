import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { HighLightData } from '@/types/pantip';

type HighLightProps = {
  data: HighLightData[];
};

export default function HighLight({ data }: HighLightProps) {
  return (
    <div className="h-fit w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {data.map((topic) => (
          <SwiperSlide key={topic.name}>
            <Link href={topic.post_url}>
              <div className="flex flex-col overflow-hidden rounded-md">
                <div className="relative h-72">
                  <Image
                    src={topic.image_url[0]||''}
                    alt="{topic.name}"
                    className="size-full object-cover"
                    fill
                  />
                </div>
                <p className="mt-2 px-2 text-center text-sm">{topic.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
