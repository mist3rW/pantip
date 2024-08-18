import { MessageCircleMore } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { formatDateToThai } from '@/libs/utils';
import type { PantipTopic } from '@/types/pantip';

import placeholderImg from '../../../public/placeholder.png';

type TopicCardProps = {
  topic: PantipTopic;
};
export default function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      href={`https://pantip.com/topic/${topic.topic_id}`}
      key={topic.topic_id}
      className="flex flex-row gap-4 rounded-lg border p-4 hover:bg-gray-50"
    >
      <div className="relative flex size-24 items-center justify-center">
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
          {topic.tags.map((tag) => (
            <span
              key={tag.name}
              className="mx-1 rounded-md bg-gray-200 p-1 text-sm"
            >
              {tag.name}
            </span>
          ))}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {topic.author.name} |{' '}
            <span>{formatDateToThai(topic.created_time)}</span>
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500">
            <MessageCircleMore size="16" />
            <span>{topic.comments_count || 0}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
