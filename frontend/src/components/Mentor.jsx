import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'

const Mentor = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/api/products');
            console.log(response.data)
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
        fetchData();
      }, []);
       // useEffect(() => {
    //   const fetchPosts = async () => {
    //     try {
    //       const response = await axios.get('https://newdemodev.skillstone.in/wp-json/wp/v2/mentors');
    //       setPosts(response.data);
    //     } catch (error) {
    //       console.error('Error fetching posts:', error);
    //     }
    //   };
    //   fetchPosts();
    // }, []);
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {
          products.map(product=>(
            <li>{product.name}</li>
          ))
        }
        {/* {posts.map(post => (
          <li key={post.id}><p>{post.title}</p><img src={post.image}></img></li>
        ))} */}
      </ul> 
    </div>
  )
}

export default Mentor
