import './App.css';
import GetWeather from './component/GetWeather';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import PostList from './component/PostList';
import PostDetail from './component/PostDetail';

function App() {
  return (
  <>

<Route path="/getweather" component={GetWeather}/>
<Route path="/posts/:post_idx" component={PostDetail}/>
<Route path="/posts" component={PostList} exact={true}/>




<PostList/>

  
  
  </>
  );
}

export default App;
