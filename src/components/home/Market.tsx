import type { MarketData } from '@/types/pantip';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type MarketProps = {
  data: MarketData[];
}

export default function Market({ data }: MarketProps) {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {data.map((data) => (
          <Link href={data.url} key={data.title}>
            <div
              key={data.id}
              className="flex flex-col gap-2 rounded-md border p-4 shadow-sm min-h-64"
            >
              <div className="relative h-36">
                <Image
                  src={data.thumbnail_url}
                  alt={data.title}
                  fill
                  className="rounded-md object-cover"
                />
                <span className="absolute left-0 top-1 mt-auto rounded-md bg-black/50 px-2 py-1 text-xs font-bold text-white">
                  {data.group_name}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">
                  {data.title.length > 30 ? (
                    <p className="text-sm font-semibold">
                      {data.title.substring(0, 54)}...
                    </p>
                  ) : (
                    <p className="text-sm font-semibold">{data.title}</p>
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
