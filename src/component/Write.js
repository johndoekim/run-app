import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";


const Write = () => {

    const DB_API_URL = process.env.REACT_APP_DB_API_URL;


    const [title, setTitle] = useState('');

    const [content, setContent] = useState('');


    const handlerTtileChange = (e) =>
    {setTitle(e.target.value)}

    const handlerContentChange = (e) =>
    {setContent(e.target.value)}



    const uploadDate = {
        'title' : title,
        'content' : content,
        'user_idx' : 1
    }



    const handlerWriteSummit = (e) =>{
        e.preventDefault();
        axios.post(`${DB_API_URL}/posts`, uploadDate)
        .then(response => console.log(response))
        .catch(err => console.log(err))

    }




    return(<>

        <form onSubmit={handlerWriteSummit}>
            <input type="text" value={title} placeholder="제목을 입력해 주세요" onChange={handlerTtileChange}></input>

            <input type="text" value ={content} placeholder="내용을 입력해 주세요" onChange={handlerContentChange}></input>

            <button type="submit"><FaPencil size={25}/></button>

        </form>
    
    
    
    </>)
}

export default Write;