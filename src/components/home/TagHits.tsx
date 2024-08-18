import Link from 'next/link';

import type { PantipTag } from '@/types/pantip';

type TagHitsProps = {
  data: PantipTag[];
};
export default function TagHits({ data }: TagHitsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {data.map((item) => (
        <Link href={`https://pantip.com/tag/${item.slug}`} key={item.slug}>
          <div className="flex h-24 flex-col items-center justify-center rounded-md border p-4 hover:scale-105">
            <div className="grow text-center text-base font-semibold">
              {item.name}
            </div>
            <div className="text-xs text-gray-500">
              จำนวนกระทู้ {item.topic_count}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
