import axios from "axios";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";


const SignUp = () => {

    //환경변수
    const SIGNUP_API_URL = process.env.REACT_APP_SIGNUP_API_URL;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');


    const handlerUsernameChange = (e) =>{
        setUsername(e.target.value);
    }

    const handlerPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlerEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlerNicknameChange = (e) =>{
        setNickname(e.target.value);
    }
    


    const signUpData = {
            username : `${username}`,
            password : `${password}`,
            email : `${email}`,
            nickname : `${nickname}`
    }

    const handlerSignUpSummit = (e) =>
    {       e.preventDefault()
            axios.post(`${SIGNUP_API_URL}/signup`, signUpData) 
            .then((response) => console.log(response))
            .catch(err => console.log(err))
    }





    return(
        <>
        <form onSubmit={handlerSignUpSummit}>
            <input type="text" value={username} placeholder="ID" onChange={handlerUsernameChange}></input>

            <input type="password" value = {password} placeholder="비밀번호" onChange={handlerPasswordChange}></input>

            <input type="text" value = {email} placeholder="janedoe@gmail.com" onChange={handlerEmailChange}></input>

            <input type="text" value = {nickname} placeholder="nickname" onChange={handlerNicknameChange}></input>

            <button type="submit"><FaPlus size={25}/></button>

        </form>

        
        
        
        
        </>


  );
}


    

    
export default SignUp;