import type { BloggangData } from '@/types/pantip';
import Image from 'next/image';
import Link from 'next/link';

type BloggangType = {
  data: BloggangData[];
}

export default function Bloggang({ data }: BloggangType) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((data) => (
        <Link href={data.url} key={data.id}>
          <div
            key={data.id}
            className="flex flex-col gap-2 rounded-md border p-4 shadow-sm"
          >
            <div className="relative h-36">
              <Image
                src={data.thumbnail_url}
                alt={data.name}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">{data.title}</p>
              <span className="mt-auto text-xs text-gray-500">
                {data.group_name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
