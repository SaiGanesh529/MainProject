import React, { useEffect, useState } from 'react';
import PostItem from './components/PostItem';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.log('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Welcome to Insta Share!</h2>
        <p className="text-gray-500 mt-2">Follow users to see their posts here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {posts.map((post) => (
        <PostItem key={post.post_id} post={post} />
      ))}
    </div>
  );
}

export default Posts;

