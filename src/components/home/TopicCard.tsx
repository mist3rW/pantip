import Image from 'next/image';
import Link from 'next/link';
import { MessageCircleMore } from 'lucide-react';
import React from 'react';
import { formatDateToThai } from '@/libs/utils';
import placeholderImg from '../../../public/placeholder.png'
import type { PantipTopic } from '@/types/pantip';

type TopicCardProps =  {
  topic: PantipTopic;
}
export default function TopicCard({topic}: TopicCardProps) {
  

  return (
    <Link
      href={`https://pantip.com/topic/${topic.topic_id}`}
      key={topic.topic_id}
      className="flex flex-row gap-4 p-4 border rounded-lg hover:bg-gray-50"
    >
      <div className="relative h-24 w-24 flex justify-center items-center">
        {topic.thumbnail_url ? (
          <Image
            src={topic.thumbnail_url}
            alt={topic.title}
            fill
            className="rounded-md object-cover"
          />
        ) : (
          <Image
            src={placeholderImg}
            alt={topic.title}
            fill
            className="rounded-md object-cover"
          />
        )}
      </div>
      <div className="flex-1">
        <p className="font-semibold">{topic.title}</p>
        <p className="text-sm text-gray-700">
          แท็ก:{' '}
          {topic.tags.map((tag, index) => (
            <span key={index} className="p-1 mx-1 text-sm bg-gray-200 rounded-md">
              {tag.name}
            </span>
          ))}
        </p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            {topic.author.name} | <span>{formatDateToThai(topic.created_time)}</span>
          </p>
          <p className="flex gap-2 items-center text-xs text-gray-500">
            <MessageCircleMore size="16" />
            <span>{topic.comments_count || 0}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

