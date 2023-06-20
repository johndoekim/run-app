import logo from './logo.svg';
import './App.css';
import GetWeather from './component/GetWeather';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';


function App() {
  return (
  <>

<Route path="/getweather" component={GetWeather}/>

  <GetWeather/>
  
  </>
  );
}

export default App;
