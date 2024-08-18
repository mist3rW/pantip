import type { PantipTopic } from '@/types/pantip';
import TopicCard from './TopicCard';

type PopularProps = {
  data: PantipTopic[];
  
}

export default function Popular({data}: PopularProps) {
  
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
