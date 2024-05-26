import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios'
const Dashboard = () => {
  const [posts, setPosts]=useState([]);
  useEffect(()=>{
    const fetchPosts = async()=>{
      try{
        const ourPosts= await axios.get('https://newdemodev.skillstone.in/wp-json/wp/v2/mentors');
        setPosts(ourPosts.data);
      }
      catch(error){
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts()
  },[])
  return (
    <div>
      {
        <ul>
        {posts.map(post => (
          <li key={post.id}><p>{post.title}</p><img src={post.image}></img></li>
        ))}
      </ul>
      }
      
    </div>
  )
}

export default Dashboard