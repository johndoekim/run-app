import axios from "axios";
import { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";
import { SlBookOpen } from "react-icons/sl";
import NewlineText from "./NewlineText";




const PostDetail = ({match, history}) => {

  const DB_API_URL = process.env.REACT_APP_DB_API_URL;

  const {post_idx} = match.params;
  const [postsData, setPostsData] = useState([]);

  const [isOwned, setIsOwned] = useState();


  useEffect(() => {
    axios.get(`${DB_API_URL}/posts/${post_idx}`,{headers : {Authorization : sessionStorage.getItem('JWT-TOKEN')}})
    .then(res => {
      console.log(res);
      const jsonPostsData = JSON.parse(res.data.body);
      setPostsData(jsonPostsData)
    })
    .catch(err => 
      console.log(err))
  },[]);

  console.log(postsData);


  useEffect(() => {
    if (postsData.user_idx === Number(sessionStorage.getItem('user_idx'))) {
      setIsOwned(true);
    } else {
      setIsOwned(false);
    }
  }, [postsData]);




const handlerBackList = (e) => {
  e.preventDefault();
  history.push('/posts')
}


const config = {
  headers: {
    'Authorization': sessionStorage.getItem('JWT-TOKEN')
  }
};

const deleteData = {
  'Authorization': sessionStorage.getItem('JWT-TOKEN'),
  'post_idx' : `${post_idx}`
};

const handlerDeletePost = (e) => {
  e.preventDefault();
  axios.delete(`${DB_API_URL}/posts/${post_idx}`, {
    headers: config.headers, 
    data: deleteData
  }, config)
    .then(res => {
      console.log(res);
      if (res.data.statusCode === 200) {
        alert('글 삭제에 성공하였습니다');
        history.push('/posts');
      } else {
        alert('글 삭제에 실패하였습니다');
      }
    })
    .catch(err => console.log(err));
};


const handlerEditPost = (e) => {
  e.preventDefault();
  history.push(`${post_idx}/edit`);  
}





 
  return (
    <>
<div className="boardwrap">
  <div className="detailtitle">
    <h1>{postsData.title}</h1>
  </div>
  <div className="nickname">
    작성자: {postsData.nickname}
    <span className="date">작성일:{postsData.created_at}</span>
  </div>
  <div className="boardcontent">

  <NewlineText text={postsData.content} />

  </div>

  <button onClick={handlerBackList}>
    <SlBookOpen size={25}/>
  </button>

  {isOwned && (
  <>
    <button onClick={handlerEditPost}>
      <MdEditDocument size={25} />
    </button>

    <button onClick={handlerDeletePost}>
      <MdDeleteForever size={25} />
    </button>
  </>
)}

</div>

    
    
    </>
  );
};

export default PostDetail;