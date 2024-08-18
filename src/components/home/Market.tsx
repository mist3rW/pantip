import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { MarketData } from '@/types/pantip';

type MarketProps = {
  data: MarketData[];
};

export default function Market({ data }: MarketProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {data.map((item) => (
          <Link href={item.url} key={item.title}>
            <div
              key={item.id}
              className="flex min-h-64 flex-col gap-2 rounded-md border p-4 shadow-sm"
            >
              <div className="relative h-36">
                <Image
                  src={item.thumbnail_url}
                  alt={item.title}
                  fill
                  className="rounded-md object-cover"
                />
                <span className="absolute left-0 top-1 mt-auto rounded-md bg-black/50 px-2 py-1 text-xs font-bold text-white">
                  {item.group_name}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">
                  {item.title.length > 30 ? (
                    <p className="text-sm font-semibold">
                      {item.title.substring(0, 54)}...
                    </p>
                  ) : (
                    <p className="text-sm font-semibold">{item.title}</p>
                  )}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
