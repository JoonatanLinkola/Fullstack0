import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ capital }) => {
  const weartherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
  const [city, setCity] = useState()
  console.log(api_key)
  console.log(weartherUrl)

  useEffect(() => {
    axios.get(weartherUrl).then(response => {
      setCity(response.data)
    })
  }, [weartherUrl])
  console.log(city)
  return (
    <div>
      <h2>Weather in {capital}</h2>
      {city
        ? <>
          <div>
            Temperature {city.main.temp} °C
          </div>
          <div>
            <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}/>
          </div>
          <div>
            Wind {city.wind.speed} m/s
          </div>
        </>
        : <div>eipä ollu</div>
      }
    </div>
  )
}

export default Weather