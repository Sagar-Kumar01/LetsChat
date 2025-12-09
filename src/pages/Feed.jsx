import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets';
import Loading from '../components/Loading';
import StoryBar from '../components/StoryBar';
import PostCard from '../components/PostCard';

const Feed = () => {
    const [feeds,setFeeds] = useState([]);
    const [loading,setLoading] = useState(true);

    const fetchFeeds = async () => {
        setFeeds(dummyPostsData);
        setLoading(false);
    }
    useEffect(() => {
        fetchFeeds();
    },[])

  return !loading ?(
    <div className='h-full overflow-y-scroll no -scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/*this is for story and post-list*/}
      <div>
        {/* Story Here */}
        <StoryBar />
        <div className="p-4 space-y-6">
            {feeds.map((post)=>(
              <PostCard key={post._id} post={post} />
            ))}
        </div>
      </div>
      {/* this is for right side */}
      <div>
        <div>
            <h1>Sponsored</h1>
        </div>
        <h1>Recent Messages</h1>
      </div>
    </div>
  ):<Loading/>
}

export default Feed
