import './App.css';
import GetWeather from './component/GetWeather';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import PostList from './component/PostList';
import PostDetail from './component/PostDetail';


function App() {
  return (
  <>

<Route path="/getweather" component={GetWeather}/>


<PostList/>


  
  
  </>
  );
}

export default App;
