import { useState } from "react"
import './App.css'
import search from './assets/icons/search.svg'
import { useStateContext } from "./Context"
import Background from "./components/Background"
import WeatherCard from "./components/WeatherCard"
import Card from "./components/Card"
import Cities from "./components/Cities"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Link } from 'react-router-dom';

export default function App() {

  const [input,setInput] = useState('')
  const {weather, thisLocation, values, place, setPlace,savedCities,setSavedCities} = useStateContext()
  const [isSaved, setIsSaved] = useState(false);
  

  const addCityToSaved = (city) => {
    if (!savedCities.includes(city)) {
      setSavedCities((prevCities) => [...prevCities, city]);
    }
  };

  const removeCityFromSaved = (cityToRemove) => {
    setSavedCities((prevCities) => prevCities.filter(city => city !== cityToRemove));
  };

  const submitCity = () =>
  {
    setPlace(input)
    setInput('')
  }
  const saveCity = () => {
    if (isSaved) {
    // Если город уже сохранен, удаляем его
    removeCityFromSaved(place);
  } else {
    // Если город еще не сохранен, добавляем его
    addCityToSaved(place);
  }
   // Переключаем состояние isSaved
    setIsSaved(!isSaved);
  }

 
  return (
    <BrowserRouter basename="/weather-app">
    <div className="w-full h-screen text-white">
      <nav className="w-full p-3 flex justify-between items-center">
        <Link to='/' className="font-bold tracking-wide text-3xl">Weather</Link>
        <Link to='/cities'>Cities</Link>
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
       
          <Routes>
        <Route path="/" element={
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard 
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
          saveCity={saveCity}
          isSaved={isSaved}
          savedCities={savedCities}
          setIsSaved={setIsSaved}
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
        </main>
          } />

          <Route path="/cities" element={
            <Cities /> } />
            </Routes>
    </div>
    </BrowserRouter>
  )
}