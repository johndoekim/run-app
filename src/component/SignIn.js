import axios from "axios";
import { useState } from "react";
import { TbDoorEnter } from "react-icons/tb";






const SignIn = () => {

    const DB_API_URL = process.env.REACT_APP_DB_API_URL;




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
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }


    return(<>

    <form onSubmit={handlerFormSubmit}>


        <input type="text" value={username} placeholder="ID" onChange={handlerUsernameChange}></input>

        <input type="password" value={password} placeholder="비밀번호" onChange={handlerPasswordChange}></input>

    
        <button type="submit"><TbDoorEnter size={25}/></button>


    </form>




    
    
    </>)
}

export default SignIn;