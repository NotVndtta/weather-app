import { useState } from "react"
import './App.css'
import search from './assets/icons/search.svg'
import { useStateContext } from "./Context"
import Background from "./components/Background"
import WeatherCard from "./components/WeatherCard"
import Card from "./components/Card"
import Cities from "./components/Cities"
export default function App() {

  const [input,setInput] = useState('')
  const {weather, thisLocation, values, place, setPlace,savedCities,setSavedCities} = useStateContext()
  

  const addCityToSaved = (city) => {
    setSavedCities((prevCities) => [...prevCities, city]);
  };

  const submitCity = () =>
  {
    setPlace(input)
    setInput('')
    addCityToSaved(input);
  }

 
  return (
    <div className="w-full h-screen text-white">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl">Weather</h1>
        <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
        <img src={search} alt="search icon" className='w-[1.5rem] h-[1.5rem]' />
        <input onKeyUp={(e) => {
            if (e.key === 'Enter') {
              // sumit the form
              submitCity()
            }
          }} type="text" placeholder='Search city' 
          className='focus:outline-none w-full text-[#212121] text-lg' 
          value={input} 
          onChange={e => setInput(e.target.value)} />
        
        </div>
      </nav>
      <Background />
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard 
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}

        />
      <div className="flex justify-center gap-8 flex-wrap w-[60%]">
        {
          
          values?.slice(1,7).map(curr => {
            return (
              
              <Card 
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
              />
              )
            })
          }
      </div>
          <Cities />
          </main>
    </div>
  )
}