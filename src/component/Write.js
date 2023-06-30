import { useState, useRef } from "react";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Write = () => {

    const DB_API_URL = process.env.REACT_APP_DB_API_URL;

    const history = useHistory();

    const inputFiles = useRef();

    const MAX_FILE_SIZE = 2 * 1024 * 1024;

    const MAX_FILE_COUNT = 1;

    const [title, setTitle] = useState('');

    const [content, setContent] = useState('');

    const [image, setImage] = useState([]);

    const invalidFile = msg => {
        alert(msg);
        inputFiles.current.value = '';
        setImage([]);
      };


    const handlerTtileChange = (e) =>
    {setTitle(e.target.value)}

    const handlerContentChange = (e) =>
    {setContent(e.target.value)}


    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && e.target.tagName.toLowerCase() !== 'textarea') {
        e.preventDefault();
      }
    };
  
  



    const handlerChangeFile = e => {
        const files = e.target.files;
    
        if (files.length > MAX_FILE_COUNT) {
          invalidFile("이미지는 1개 까지 업로드가 가능합니다.");
          return;
        } 
        for (let i = 0; i < files.length; i++) {
          if (!files[i].type.match("image/.*")) {
            invalidFile("이미지 파일만 업로드 가능합니다.");
            return;
          } else if (files[i].size > MAX_FILE_SIZE) {
            invalidFile("이미지 크기는 2MB를 초과할 수 없습니다.");
            return;
          } 
        }
    
        setImage(files[0]);
      };




    const config = {
        headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': sessionStorage.getItem('JWT-TOKEN'),
      }};

    const writeData = {
        'title' : title, 
        'content' : content,
        // 'Authorization': sessionStorage.getItem('JWT-TOKEN'),
        // "Content-Type": "multipart/form-data"
    };


    const formData = new FormData();
    // // formData.append('writeData', writeData)
    // formData.append('title', title)
    // formData.append('content', content)
    // formData.append('Authorization', sessionStorage.getItem('JWT-TOKEN'))
    // formData.append('writeData', new Blob([JSON.stringify(writeData)], {type : "application/json"}))
    formData.append('data', new Blob([JSON.stringify(writeData)], {type : "application/json"}));
    // Array.from(image).forEach(file => formData.append('files', file));
    formData.append('image', image)


    console.log(image)

    for (const key of formData.keys()) {
        console.log(key);}

        for (const value of formData.values()) {
            console.log(typeof value);
          }


    const handlerWriteSummit = (e) =>{
        e.preventDefault();


        axios.post(`${DB_API_URL}/posts`, formData, config)
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
            <input className="input-container-title" type="text" value={title} placeholder="제목을 입력해 주세요" onChange={handlerTtileChange} onKeyDown={handleKeyDown}></input>

            <textarea className="input-container-content" type="textarea" value ={content} placeholder="내용을 입력해 주세요" onChange={handlerContentChange}></textarea>



            <input type="file" ref={inputFiles} onChange={handlerChangeFile}></input>

            <hr/>

            <button type="submit"><FaPencil size={25}/></button>


        </form>

    
    
    
    </>)
}

export default Write;