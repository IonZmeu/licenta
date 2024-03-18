import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import GoogleMapsComponent from './GoogleMapsComponent' // You would need to create this yourself or find a suitable library


const Jobs = () => {

  type Post = {
    email?: string;
    name: string;
    id: number | string;
    lat_coordinate: number;
    long_coordinate: number;
  };

  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await axios.get('http://localhost:4123/job');
        setPosts(postsRes.data);
        console.log(postsRes.data);
       } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div>
      <h6>My Posts</h6>
      {posts && posts.map(post => (
      <div key={post.id}>
        <h3>{post.name}</h3>
        <p>Email: {post.email}</p>
        <p>Id: {post.id}</p>
        <p>Long numbers: {post.lat_coordinate}, {post.long_coordinate}</p>
      </div>
      ))}
      
    </div>
  );
};

export default Jobs;