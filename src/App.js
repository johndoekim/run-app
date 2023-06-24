import './App.css';
import GetWeather from './component/GetWeather';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import PostList from './component/PostList';
import PostDetail from './component/PostDetail';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Write from './component/Write';

function App() {
  return (
  <>

<Route path="/getweather" component={GetWeather}/>

<Route path="/posts/:post_idx" component={PostDetail}/>

<Route path="/posts" component={PostList} exact={true}/>

<Route path="/Signin" component={SignIn}/>

<Route path="/Signup" component={SignUp}/>


<SignUp/>

<SignIn/>

  </>
  );
}

export default App;
