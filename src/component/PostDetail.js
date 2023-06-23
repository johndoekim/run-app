<<<<<<< HEAD
import axios from "axios";
import { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";


const PostDetail = ({match, history}) => {

  const DB_API_URL = process.env.REACT_APP_DB_API_URL;

  const {post_idx} = match.params;
  const [postsData, setPostsData] = useState([]);



  useEffect(() => {
    axios.get(`${DB_API_URL}/posts/${post_idx}`)
    .then(res => {
      const jsonPostsData = JSON.parse(res.data.body);
      setPostsData(jsonPostsData) 
    })
    .catch(err => 
      console.log(err));
  }, []);


const handlerBackList = (e) => {
  e.preventDefault();
  history.push('/posts')
}


 
  return (
    <>
<div className="boardwrap">
  <div className="detailtitle">
    <h1>{postsData.title}</h1>
  </div>
  <div className="nickname">
    작성자: {postsData.nickname}
    <span className="date">작성일: {postsData.created_at}</span>
  </div>
  <div className="boardcontent">
    <p>{postsData.content}</p>
  </div>

  <button className="backbutton"onClick={handlerBackList}>
    <FaClipboardList size={25}/>
  </button>
</div>

    
    
    </>
  );
};

=======
import axios from "axios";
import { useEffect, useState } from "react";
import { FcList } from "react-icons/fc";

const PostDetail = ({match, history}) => {

  const DB_API_URL = process.env.REACT_APP_DB_API_URL;

  const {post_idx} = match.params;
  const [postsData, setPostsData] = useState([]);



  useEffect(() => {
    axios.get(`${DB_API_URL}/posts/${post_idx}`)
    .then(res => {
      const jsonPostsData = JSON.parse(res.data.body);
      setPostsData(jsonPostsData) 
    })
    .catch(err => 
      console.log(err));
  }, []);


const handlerBackList = (e) => {
  e.preventDefault();
  history.push('/posts')
}


 
  return (
    <>
<div className="boardwrap">
  <div className="detailtitle">
    <h1>{postsData.title}</h1>
  </div>
  <div className="nickname">
    작성자: {postsData.nickname}
    <span className="date">작성일: {postsData.created_at}</span>
  </div>
  <div className="boardcontent">
    <p>{postsData.content}</p>
  </div>

  <button className="backbutton"onClick={handlerBackList}>
    <FcList size={20}/>
  </button>
</div>

    
    
    </>
  );
};

>>>>>>> 5f9b5952c92666c06733084a62456c0a009a48e8
export default PostDetail;