import './App.css';
import GetWeather from './component/GetWeather';
import { Route, Link, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import PostList from './component/PostList';
import PostDetail from './component/PostDetail';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Write from './component/Write';
import { useEffect, useState } from 'react';
import { SlLogin, SlLogout, SlNote, SlBookOpen} from "react-icons/sl";
import { FaPlus } from "react-icons/fa";
import PostEdit from './component/PostEdit';
import PrivateRoute from './component/PrivateRoute';



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
      <div className="user-menu">
        <span className="user-menu-item" onClick={handlerLogout}>
          <SlLogout size={25} />
          <span>로그아웃</span>
        </span>
        <span className="user-menu-item">
          <Link to="/write">
            <SlNote size={25} />
            <span>글쓰기</span>
          </Link>
        </span>
        <span>{showNickname}님 접속중입니다.</span>
      </div>
    ) : (
      <div className="user-menu">
        <span className="user-menu-item">
          <Link to="/signin">
            <SlLogin size={25} />
            <span>로그인</span>
          </Link>
        </span>
        <span className="user-menu-item">
          <Link to="/signup">
            <FaPlus size={25} />
            <span>회원가입</span>
          </Link>
        </span>
      </div>
    )
    }
    
<span className="user-menu-item">
          <Link to="/posts">
            <SlBookOpen size={25} />
            <span>글 목록</span>
          </Link>
        </span>

<Route path="/getweather" component={GetWeather}/>

<Route path="/posts/:post_idx" component={PostDetail} exact={true}/>

<Route path="/posts" component={PostList} exact={true}/>

<Route path="/signin" component={SignIn}/>

<Route path="/signup" component={SignUp}/>

<PrivateRoute path="/write" component={Write}/>

<PrivateRoute path="/posts/:post_idx/edit" component={PostEdit}/>



<GetWeather/>


  </>
  );
}

export default withRouter(App);
