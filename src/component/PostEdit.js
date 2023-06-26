import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { MdEditDocument } from "react-icons/md";



const PostEdit = () => {

    const DB_API_URL = process.env.REACT_APP_DB_API_URL;

    const history = useHistory();

    const {post_idx} = useParams();

    const [title, setTitle] = useState('');

    const [content, setContent] = useState('');

    const [postsData, setPostsData] = useState([]);

    const [isOwned, setIsOwned] = useState();
  
  //기존 글 데이터 가져오기
    useEffect(() => {
      axios.get(`${DB_API_URL}/posts/${post_idx}`)
      .then(res => {
        console.log(res);
        const jsonPostsData = JSON.parse(res.data.body);
        setPostsData(jsonPostsData)
      })
      .catch(err => 
        console.log(err));
    },[]);
  
  
    useEffect(() => {
      if (postsData.user_idx === Number(sessionStorage.getItem('user_idx'))) {
        setIsOwned(true);
      } else {
        setIsOwned(false);
      }
    }, [postsData]);


    
  useEffect(() => {
    if (postsData.title && postsData.content) {
      setTitle(postsData.title);
      setContent(postsData.content);
    }
  }, [postsData]);



  

  const handlerTtileChange = (e) =>
  {setTitle(e.target.value)}

  const handlerContentChange = (e) =>
  {setContent(e.target.value)}





    const uploadDate = {
        'title' : title,
        'content' : content,
        'Authorization': sessionStorage.getItem('JWT-TOKEN'),
        'post_idx' : `${post_idx}`
    }

    const config = {
        headers: {
        'Authorization': sessionStorage.getItem('JWT-TOKEN')
        }
      };



    const handlerEditSummit = (e) =>{
        e.preventDefault();
        axios.put(`${DB_API_URL}/posts/${post_idx}`, uploadDate, config)
        .then(
            res =>{ console.log(res.data.body)
                if (res.data.statusCode === 200 && res.data.body.includes('edit success')){
                    alert('글 수정에 성공하였습니다')
                    history.push('/posts')
                }
                else {
                    alert('글 수정에 실패하였습니다')
            }
            })
        .catch(err => console.log(err))
    }


console.log(postsData.title);

    return(<>

        <form className="card" onSubmit={handlerEditSummit}>
            <input className="input-container-title" type="text" value={title} placeholder="제목을 입력해 주세요" onChange={handlerTtileChange}></input>

            <input className="input-container-content" type="text" value ={content} placeholder="내용을 입력해 주세요" onChange={handlerContentChange}></input>

            <button type="submit"><MdEditDocument size={25} /></button>

        </form>
    
    
    
    </>)
}

export default PostEdit;