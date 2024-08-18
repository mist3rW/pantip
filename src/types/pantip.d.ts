

export type PantipRoomData = {
 id: number;
  name: string;
  room_icon_url: string;
  link_url: string;
  slug: string;
}

export type BloggangData = {
  id: number;
  name: string;
  title: string;
  url: string;
  thumbnail_url: string;
  group_name: string;
}

export type HighLightData = {
  name: string;
  post_url: string;
  image_url: string[];
}


export type PantipTopic ={
  topic_id: string;
    title: string;
    thumbnail_url?: string;
    tags: { name: string }[];
    author: { name: string };
    created_time: string;
    comments_count: number;
    
}

export type PantipTopicData = PantipTopic & {
  topics: PantipTopic[];
}


export type PantipTag = {
  slug: string;
  name: string;
  topic_count: number;
}

export type MarketData = {
  id: number;
  title: string;
  url: string;
  group_name: string;
  thumbnail_url: string;
  created_time: string;
}
  