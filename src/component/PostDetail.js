import axios from "axios";
import { useEffect, useState } from "react";

const PostDetail = () => {

  const DB_API_URL = process.env.REACT_APP_DB_API_URL;

  const post_idx = 3
  const [postsData, setPostsData] = useState([]);



  useEffect(() => {
    axios.get(`${DB_API_URL}/posts/${post_idx}`)
    .then(res => {
      const jsonPostsData = JSON.parse(res.data.body);
      setPostsData(jsonPostsData) 
    })
    .catch(err => {
      console.log(err);
    })
  },[])


  console.log(postsData)

  const {title, content, created_at, nickname} = postsData

 
  return (
    <>
    
    
    
    </>
  );
};

export default PostDetail;