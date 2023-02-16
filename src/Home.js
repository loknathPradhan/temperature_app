import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import { GoLocation } from 'react-icons/go';
import { FaTemperatureHigh } from "react-icons/fa";
import Box from './components/Box';
import axios from 'axios';

export default function Home() {

  const [location, setLocation] = useState();
  const [data, setData] = useState(null);
  let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const current = new Date();
  const date = `${current.getDate()} ${month[current.getMonth()]} ${current.getFullYear()}`;


  function getPlace(place) {
    setLocation(place)
  }
  useEffect(() => {
    setLocation("pune")
  }, [])



  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b7a9846f64429a309d06a135f7dfc688`).then((res) => {
      setData(res.data)
    }).catch(() => {
      
      console.error();
    })
  }, [location]);


  
  return (
    <div className='container'>{
      data === null ? null : <> <header>
        <div className="location">
          <h1 className='loc'>{data.name} <span className='cont'>{data.sys.country}</span> <GoLocation style={{ "fontSize": "0.8em" }} /></h1>

          <p className='date'>{date}</p>
        </div>
        <Search getPlace={getPlace} />
      </header>

        <main>
          <div className="weather">
            <FaTemperatureHigh style={{ "fontSize": "10em" }} />
            <div className="temp">
              <p className='temp_des'>{data.weather[0].description}</p>
              <h1>{data.main.temp.toString().split(".")[0]} <span className='degree'>&ordm;</span></h1>
            </div>
          </div>

          <div className="favPlace">
            <h2 onClick={() => {
              setLocation("kolkata")
            }}>Kolkata</h2>
            <h2 onClick={() => {
              setLocation("pune")
            }}>Pune</h2>
            <h2 onClick={() => {
              setLocation("delhi")
            }}>Delhi</h2>
          </div>
          <div className="detail">
            <Box val={"High (C)"} data={data.main.temp_max.toString().split(".")[0]} />
            <Box val={"Low (C)"} data={data.main.temp_min.toString().split(".")[0]} />
            <Box val={"Feels_like (C)"} data={data.main.feels_like.toString().split(".")[0]} />
            <Box val={"Wind (km/h)"} data={data.wind.speed} />
            <Box val={"pressure (atm)"} data={data.main.pressure} />
            <Box val={"Humidity (%)"} data={data.main.humidity} />
          </div>
        </main>
      </>
    }
    </div>
  )

}
