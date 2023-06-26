import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityData from './CityData';
import dayjs, { Dayjs } from 'dayjs';



const GetWeather = () => {



  //환경변수
  const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;
  const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL;


  //날짜 설정

  const nowToday = dayjs();
  const {$y, $M, $D , $H, $m} = nowToday;
  const formattedMonth = String($M + 1).padStart(2, '0');
  const apiFormattedToday = ($H < 2 || ($H === 2 && $m <=9)) ? `${$y}${formattedMonth}${$D -1}`
  : `${$y}${formattedMonth}${$D}`

  const formattedToday= `${$y}${formattedMonth}${$D}`



  const formattedTime = ($H) => {
    if ($H === 0) {
      return "0000";
    } else if ($H >= 1 && $H <= 9) {
      return `0${$H}00`;
    } else if ($H >= 10 && $H <= 23) {
      return `${$H}00`;
    }
  }

console.log(typeof formattedTime($H));

const [apiTime, setApiTime] = useState('');

const [time, setTime] = useState([]);

const [weather, setWeather] = useState([]);

const [location, setLocation] = useState([]);

const [selectedLocation, setSelectedLocation] = useState([]);

useEffect(() => {setTime(formattedTime($H))}, [])


const handlerLocationChange = (e) => {
    setSelectedLocation(location.filter(selectedL => selectedL.dong === e.target.value)[0]);
  }

// //baseTime 설정



  //데이터 받아오기

  useEffect(() => {
    setLocation(CityData)
      }, [])


  useEffect(() => {
      const {x, y} = selectedLocation;
      axios.get(`${WEATHER_API_URL}=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${apiFormattedToday}&base_time=${apiTime}&nx=${x}&ny=${y}`)
      .then(res => {
      console.log(res);
      apiFormattedToday !== formattedToday ? setApiTime('2300') : setApiTime('0500')
      setWeather(res.data.response.body.items.item);
      }
      )
        .catch(err => console.log(err));
      }, [selectedLocation])

      console.log(selectedLocation);

      
      
      






return (<>
<div className="weather-card">
  <select className="location-select" value={selectedLocation.dong} onChange={handlerLocationChange}>
    {location.map((selectLocation, idx) => {
      return (
        <option key={idx} value={selectLocation.dong}>
          {selectLocation.dong}
        </option>
      );
    })}
  </select>

  <ul>
    <li>지역: {selectedLocation.dong}</li>
    {weather
      .filter(
        (w2) =>
          w2.fcstDate === formattedToday &&
          (w2.fcstTime === time || w2.fcstTime === String(Number(time) + 100)) &&
          (w2.category === "POP" ||
            w2.category === "REH" ||
            w2.category === "TMP" ||
            w2.category === "SKY" ||
            w2.category === "PCP")
      )
      .map((w2, idx) => {
        let categoryLabel = "";
        let skyLabel = "";

        if (w2.category === "POP") {
          categoryLabel = "강수확률";
        } else if (w2.category === "REH") {
          categoryLabel = "습도";
        } else if (w2.category === "TMP") {
          categoryLabel = "기온";
        } else if (w2.category === "PCP") {
          categoryLabel = "강수량";
        } else if (w2.category === "SKY") {
          categoryLabel = "하늘상태";
          if (w2.fcstValue === "1") {
            skyLabel = "맑음";
          } else if (w2.fcstValue === "3") {
            skyLabel = "구름많음";
          } else if (w2.fcstValue === "4") {
            skyLabel = "흐림";
          }
        }

        return (
          <li key={idx}>
            <span className="category-label">{categoryLabel}: </span>
            {skyLabel !== "" ? (
              <span className={`sky-label ${skyLabel.toLowerCase()}`}>{skyLabel}</span>
            ) : (
              <span>{w2.fcstValue}</span>
            )}
          </li>
        );
      })}
  </ul>
</div>
  


  
  </>);
};
export default GetWeather;
