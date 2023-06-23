import { useState } from "react";
import { TbDoorEnter } from "react-icons/tb";





const SignIn = () => {



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