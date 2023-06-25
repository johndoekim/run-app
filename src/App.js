import './App.css';
import GetWeather from './component/GetWeather';
import { Route, Link, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import PostList from './component/PostList';
import PostDetail from './component/PostDetail';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Write from './component/Write';
import { useEffect, useState } from 'react';

function App({history}) {


  const [isLogin, setIsLogin] = useState(false);
  const [showNickname, setShowNickname] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem("JWT-TOKEN")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });


  useEffect(() => {
    if (sessionStorage.getItem("nickname")){
      setShowNickname(sessionStorage.getItem("nickname"))
    }
  },[isLogin])


const handlerLogout = e => {
  sessionStorage.clear();
  setIsLogin(false);
  history.push('/login')
};




  return (
  <>

{isLogin ? (
  <span onClick={handlerLogout}>로그아웃   {showNickname}님 접속중입니다.</span> 
) : (
  <>
    <Link to="/signin">로그인</Link>
    <Link to="/signup">회원가입</Link>
  </>
)}

<Route path="/getweather" component={GetWeather}/>

<Route path="/posts/:post_idx" component={PostDetail}/>

<Route path="/posts" component={PostList} exact={true}/>

<Route path="/signin" component={SignIn}/>

<Route path="/signup" component={SignUp}/>

<Route path="/write" component={Write}/>



<PostList/>
<GetWeather/>


  </>
  );
}

export default withRouter(App);
