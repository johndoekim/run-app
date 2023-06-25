import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Write = () => {

    const DB_API_URL = process.env.REACT_APP_DB_API_URL;

    const history = useHistory();



    const [title, setTitle] = useState('');

    const [content, setContent] = useState('');


    const handlerTtileChange = (e) =>
    {setTitle(e.target.value)}

    const handlerContentChange = (e) =>
    {setContent(e.target.value)}



    const uploadDate = {
        'title' : title,
        'content' : content,
        'Authorization': sessionStorage.getItem('JWT-TOKEN')
    }

    const config = {
        headers: {
        'Authorization': sessionStorage.getItem('JWT-TOKEN')
        }
      };



    const handlerWriteSummit = (e) =>{
        e.preventDefault();
        axios.post(`${DB_API_URL}/posts`, uploadDate, config)
        .then(
            res =>{ console.log(res)
                if (res.data.statusCode === 200){
                    alert('글 작성에 성공하였습니다')
                    history.push('/posts')
                }
                else {
                    alert('글 작성에 실패하였습니다')
            }
            })
        .catch(err => console.log(err))
    }




    return(<>

        <form className="card" onSubmit={handlerWriteSummit}>
            <input className="input-container-title" type="text" value={title} placeholder="제목을 입력해 주세요" onChange={handlerTtileChange}></input>

            <input className="input-container-content" type="text" value ={content} placeholder="내용을 입력해 주세요" onChange={handlerContentChange}></input>

            <button type="submit"><FaPencil size={25}/></button>

        </form>
    
    
    
    </>)
}

export default Write;