import type { PantipTag } from "@/types/pantip";
import Link from "next/link";

type TagHitsProps = {
  data: PantipTag[];
}
export default function TagHits({data}: TagHitsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {data.map((item) => (
        <Link href={`https://pantip.com/tag/${item.slug}`} key={item.slug}>
          <div  className="flex flex-col justify-center items-center border rounded-md p-4 h-24 hover:scale-105">
            <div className="text-base text-center flex-grow font-semibold">{item.name}</div>
            <div className="text-xs text-gray-500">จำนวนกระทู้ {item.topic_count}</div>
            </div>
        </Link>
      ))}
    </div>
  )
}
