import Image from 'next/image';
import Link from 'next/link';

import type { BloggangData } from '@/types/pantip';

type BloggangType = {
  data: BloggangData[];
};

export default function Bloggang({ data }: BloggangType) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {data.map((item) => (
        <Link href={item.url} key={item.id}>
          <div
            key={item.id}
            className="flex flex-col gap-2 rounded-md border p-4 shadow-sm"
          >
            <div className="relative h-36">
              <Image
                src={item.thumbnail_url}
                alt={item.name}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">{item.title}</p>
              <span className="mt-auto text-xs text-gray-500">
                {item.group_name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
