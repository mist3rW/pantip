import type {  PantipTopic } from '@/types/pantip';
import TopicCard from './TopicCard';

type RecommendProps = {
  data: PantipTopic[];
}

export default function Recommend({data}: RecommendProps) {
  if (!data || data.length === 0) {
    return <p>No topics available.</p>; 
  }
  return (
    <div className="space-y-6">     
      {data.map((topic) => (
        <TopicCard topic={topic} key={topic.topic_id}/>
      ))}

    </div>
  );
}
