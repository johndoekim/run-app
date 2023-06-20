import React, { useState, useEffect } from 'react';
import axios from 'axios';


const GetWeather = () => {
//환경변수
  const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;
  const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL;

//날짜 설정
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}${month}${day}`;
//

  const [weather, setWeather] = useState([]);


 useEffect(() => {
    axios.get(`${WEATHER_API_URL}=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${formattedDate}&base_time=0500&nx=60&ny=125`)
    .then(res => {
      setWeather(res.data.response.body.items.item);
    }
      )
      
    .catch(err => console.log(err));
  }, [])





  return (<>

  <h1>날씨</h1>

{/* 
  {weather.map(w => (
  <li>
    <span>{w.category}</span>
    <span>{w.fcstValue}</span>
  </li>
))} */}

<ul>
{
weather.filter(w2 => w2.fcstDate === formattedDate && (w2.category === 'POP' || w2.category === 'PTY' ||
 w2.category === 'REH' || w2.category === 'TMP' || w2.category === 'SKY' ))
.map((w2, idx) => {
  let categoryLabel = '';
  let skyLabel = '';
  
  if (w2.category === 'POP') {
    categoryLabel = '강수확률';
  } else if (w2.category === 'PTY') {
    categoryLabel = '강수형태';
  } else if (w2.category === 'REH') {
    categoryLabel = '습도';
  } else if (w2.category === 'TMP') {
    categoryLabel = '기온';
  } else if (w2.category === 'SKY') {
    categoryLabel = '하늘상태'
    if(w2.fcstValue === '1'){
      skyLabel = '맑음'}
      else if(w2.fcstValue ==='3'){
        skyLabel ='구름많음'
      }
      else if(w2.fcstValue ==='4'){
        skyLabel = '흐림'
      }
    }



  return (
    <ul key={idx}>
      <li>시각: {w2.fcstTime}</li>
    <li>{categoryLabel}: {skyLabel !== '' ? skyLabel : w2.fcstValue}</li>
    </ul>
  );
})

}

</ul>
  


  
  </>);
};
export default GetWeather;
