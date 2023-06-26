import axios from "axios";
import { useState } from "react";
import { TbDoorEnter } from "react-icons/tb";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";






const SignIn = () => {

    const DB_API_URL = process.env.REACT_APP_DB_API_URL;

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handlerUsernameChange = (e) =>{
        setUsername(e.target.value);
    }

    const handlerPasswordChange = (e) => {
        setPassword(e.target.value);
    }


    const loginData = 
    {
    username : `${username}`,
    password : `${password}`
    }

    const handlerFormSubmit = (e) =>
    {
        e.preventDefault();
        axios.post(`${DB_API_URL}/login`, loginData)
        .then(res => {
    
            if (res.data.success === true){
            sessionStorage.setItem("JWT-TOKEN", res.data.body)
            sessionStorage.setItem("user_idx", res.data.idx)
            sessionStorage.setItem("nickname", res.data.nickname)
            alert('로그인 성공');
            history.push('/')
            console.log(res)}

            else if (res.data.success === false){
                alert('로그인이 실패하였습니다')}

    })
        .catch(err => console.log(err))
    }


    return(<>

    <form className="sign-card" onSubmit={handlerFormSubmit}>


        <input type="text" value={username} placeholder="ID" onChange={handlerUsernameChange}></input>

        <input type="password" value={password} placeholder="비밀번호" onChange={handlerPasswordChange}></input>

    
        <button type="submit"><TbDoorEnter size={25}/></button>


    </form>




    
    
    </>)
}

export default SignIn;