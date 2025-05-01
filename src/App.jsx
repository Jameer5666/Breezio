import React, { useEffect, useState } from 'react'
import './App.css'
function App(){
  const [temp,setTemp]=useState(false)
  const [weather,setweather]=useState([])
  const [city,setCity]=useState('');
  const [weather1, setWeather1] = useState(null);
  // const [day,setDay]=useState([])

  useEffect(()=>{
     const url = "https://api.weatherapi.com/v1/forecast.json"
    const api_key="e36846d03c354b11842132913252804"
  fetch(`${url}?key=${api_key}&q=Ahmadpur, maharashtra`)
    .then(Response=>Response.json())
    .then((data)=>{
      console.log(data)
      setweather(data)
      setTemp(true)
    })
  },[])

  const searchWeather=()=>{
     const url = "https://api.weatherapi.com/v1/forecast.json"
    const api_key="e36846d03c354b11842132913252804"
  fetch(`${url}?key=${api_key}&q=${city.trimEnd()}`)
    .then(Response=>{
      if(!Response.ok){
        alert("Location Not Found!")
      }
      else{
        Response.json()
        .then(data=>setweather(data))
        setCity('')
      }
    })

      const url1="https://api.weatherapi.com/v1/alerts.json"

      fetch(`${url1}?key=${api_key}&q=${city.trimEnd()}`)

        .then((response) => response.json())
        .then((data1) => {

          setWeather1(data1);
        })
        .catch((error) => {
          console.error('Error fetching weather alerts:', error);
        });
  }

  
  useEffect(() => {
    if (weather && weather.current) {
      const isDay = weather.current.is_day;
      const main = document.getElementById('main');
      if (main) {
        main.className = isDay === 1 ? "day" : "night";
      }
    }
  }, [weather]);


  
  useEffect(() => {
    const url='https://api.weatherapi.com/v1/alerts.json';
    const api_key='e36846d03c354b11842132913252804';
    fetch(`${url}?key=${api_key}&q=Ahmadpur, maharashtra`)
      .then((response) => response.json())
      .then((data) => {

        setWeather1(data);
      })
      .catch((error) => {
        console.error('Error fetching weather alerts:', error);
      });
  }, []);



  return (
    <>
    {/* api key e36846d03c354b11842132913252804 */}
    {/* base url:   http://api.weatherapi.com/v1 */}
    <div id='main'>
    <div className='nav'>
      <img src='../public/logo3.png' className='heading'/>
      <div className='whether_dashhbord'>
        <input type='text' id='inp' placeholder="Let's Visit..." autoFocus spellCheck  value={city} onChange={(event)=>{setCity(event.target.value)}}/>
        <button id='btn' autoFocus  onClick={searchWeather}>Search</button>
      </div>
    </div>
      
      {
        temp && <>
          <div className='child2'>
          <div id='icn-tm'>
          <img src={weather.current.condition.icon}/>
            <h1 id='ltime'>{weather.location.localtime.slice(10,16)}</h1>
          </div>
            <h1 id="tempc">{weather.current.temp_c}°C</h1>
            <h1 id="place">{weather.location.name}</h1>
            <h1 id='region'>{weather.location.region}</h1>
            <h3 id='reg'>{weather.location.country}</h3>
          </div>
          <div className='child4'>
              <div className='forecast'>
              <div id='astro'>
              <div>
              <img src={weather.forecast.forecastday[0].day.condition.icon}/>
              <h5>{weather.forecast.forecastday[0].date}</h5>
              </div>
              <div id='astro-child'>
                <p><strong>sun-rise</strong><br/> {weather.forecast.forecastday[0].astro.sunrise}</p>
                <p><strong>sun-set</strong><br/>{weather.forecast.forecastday[0].astro.sunset}</p>
                <p><strong>moon-rise</strong><br/>{weather.forecast.forecastday[0].astro.moonrise}</p>  
                <p><strong>moon-set</strong><br/> {weather.forecast.forecastday[0].astro.moonset}</p>
              </div>
              </div>
              <div id='astro-parent'>
              <div id='astro-child2'>
              <p><strong>weather</strong><br/>{weather.forecast.forecastday[0].day.condition.text}</p>
              <p><strong>Wind Speed</strong><br/>{weather.current.wind_kph}kph</p>
              <p><strong>Max-Temp</strong><br/>{weather.forecast.forecastday[0].day.maxtemp_c}°C</p>
            </div>
            <div id='astro-child2' className='astro-child2'>
              <div id='region'>
              <h6>{weather.location.name}</h6>
              <h6>{weather.location.region}</h6>
              <h6>{weather.location.country}</h6>
              </div>


              <div id="alert">
              <h2>ALERTS:</h2>
              {weather1?.alerts?.alert?.length > 0 ? (
              weather1.alerts.alert.map((alert, index) => (
              <li key={index}>{alert.headline}</li>
              ))
              ) : (
                <p>No alerts available</p>
              )}
            </div>
              {/* <div id='alert'>
                <h2>ALERT:{weather.alerts && weather.alerts.alert && weather.alerts.alert.length > 0
      ? weather.alerts.alert[0].headline
      : "No alerts available"}</h2>
              </div> */}


              {/* <h4><strong>Alert </strong><br/>{weather.alerts.alert[1].headline}</h4> */}
              {/* <p><strong>Areas </strong><br/>{weather.alerts.alert[0].areas}</p>
              <p><strong>Desc </strong><br/>{weather.alerts.alert[0].desc}</p>
              <p><strong>effective </strong><br/>{weather.alerts.alert[0].effective}</p>
              <p><strong>expires </strong><br/>{weather.alerts.alert[0].expires}</p> */}
            </div>
            </div>
            </div> 
          </div>
          <div className='child3'>
            {/* <div className='forecast'>
              <img src={weather.forecast.forecastday[0].day.condition.icon}/>
              <p>{weather.forecast.forecastday[0].date}</p>
              <h6>weather {weather.forecast.forecastday[0].day.condition.text}</h6>
              <h6>Wind Speed {weather.current.wind_kph}kph</h6>
              <h6>Max-Temp {weather.forecast.forecastday[0].day.maxtemp_c}°C</h6>
            </div> */}

            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[0].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[0].time.slice(10,16)}</p>
              <h6>weather {weather.forecast.forecastday[0].hour[0].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[0].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[0].wind_kph}kph</h6>
            </div>
            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[2].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[2].time.slice(10,16)}</p>
            <h6>weather {weather.forecast.forecastday[0].hour[2].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[2].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[2].wind_kph}kph</h6>
            </div>
            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[4].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[4].time.slice(10,16)}</p>
            <h6>weather {weather.forecast.forecastday[0].hour[4].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[4].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[4].wind_kph}kph</h6>
            </div>
            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[6].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[6].time.slice(10,16)}</p>
            <h6>weather {weather.forecast.forecastday[0].hour[6].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[6].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[6].wind_kph}kph</h6>
            </div>
            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[8].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[8].time.slice(10,16)}</p>
            <h6>weather {weather.forecast.forecastday[0].hour[8].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[8].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[8].wind_kph}kph</h6>
            </div>
            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[10].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[10].time.slice(10,16)}</p>
            <h6>weather {weather.forecast.forecastday[0].hour[10].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[10].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[10].wind_kph}kph</h6>
            </div>
            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[12].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[12].time.slice(10,16)}</p>
            <h6>weather {weather.forecast.forecastday[0].hour[12].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[12].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[12].wind_kph}kph</h6>
            </div>
            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[14].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[14].time.slice(10,16)}</p>
            <h6>weather {weather.forecast.forecastday[0].hour[14].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[14].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[14].wind_kph}kph</h6>
            </div>
            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[16].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[16].time.slice(10,16)}</p>
            <h6>weather {weather.forecast.forecastday[0].hour[16].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[16].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[16].wind_kph}kph</h6>
            </div>
            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[18].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[18].time.slice(10,16)}</p>
            <h6>weather {weather.forecast.forecastday[0].hour[18].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[18].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[18].wind_kph}kph</h6>
            </div>
            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[20].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[20].time.slice(10,16)}</p>
            <h6>weather {weather.forecast.forecastday[0].hour[20].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[20].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[20].wind_kph}kph</h6>
            </div>
            <div className='Tforecast'>
            <img src={weather.forecast.forecastday[0].hour[22].condition.icon}/>
            <p>{weather.forecast.forecastday[0].hour[22].time.slice(10,16)}</p>
            <h6>weather {weather.forecast.forecastday[0].hour[22].condition.text}</h6>
              <h6>Temp {weather.forecast.forecastday[0].hour[22].temp_c}°C</h6>
              <h6>Wind Speed {weather.forecast.forecastday[0].hour[22].wind_kph}kph</h6>
            </div>
            
          </div>
        </>
      }
    </div>
    </>
  )
}

export default App