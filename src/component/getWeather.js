import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityData from './CityData';


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


//todo
//1. 로케이션 선택시 렌더링 이후 값이 저장되지 않음

const [weather, setWeather] = useState([]);

const [location, setLocation] = useState([]);

const [selectedLocation, setSelectedLocation] = useState([]);

const handlerLocationChange = (e) => {
    setSelectedLocation(location.find(dl => dl.dong === e.target.value));
  }

const {x, y} = selectedLocation



  


//데이터 받아오기

useEffect(() => {
  setLocation(CityData)
}, [])


 useEffect(() => {
    axios.get(`${WEATHER_API_URL}=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${formattedDate}&base_time=0500&nx=${x}&ny=${y}`)
    .then(res => {
      setWeather(res.data.response.body.items.item);
    }
      )
      
    .catch(err => console.log(err));
  }, [])





  return (<>

<select value={selectedLocation} onChange={handlerLocationChange}>
                    {location.map(dl => { return (
                        <option>{dl.dong}</option>
                    )})}
                </select>



  <h1>날씨</h1>

<ul>
{
weather.filter(w2 => w2.fcstDate === formattedDate && (w2.category === 'POP' || 
 w2.category === 'REH' || w2.category === 'TMP' || w2.category === 'SKY' ))
.map((w2, idx) => {
  let categoryLabel = '';
  let skyLabel = '';
  
  if (w2.category === 'POP') {
    categoryLabel = '강수확률';
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
    <li>{categoryLabel}: {skyLabel !== '' ? skyLabel : w2.fcstValue} </li>
    </ul>
  );
})

}

</ul>
  


  
  </>);
};
export default GetWeather;
