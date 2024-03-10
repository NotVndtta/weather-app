import { useState, useEffect } from "react"
import './App.css'

import { useStateContext } from "./Context"
import Background from "./components/Background"
import WeatherCard from "./components/WeatherCard"
import Card from "./components/Card"
import Cities from "./components/Cities"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import NavBar from "./components/NavBar"

export default function App() {

  const [input,setInput] = useState('')
  const {weather, thisLocation, values, place, setPlace,savedCities,setSavedCities,fetchUserLocation} = useStateContext()
  const [isSaved, setIsSaved] = useState(false);
  
  

  const addCityToSaved = (city) => {
    if (!savedCities.some(savedCity => savedCity.name === city)) {
      const updatedCities = [...savedCities, { name: city, isSaved: true }];
      setSavedCities(updatedCities);
      localStorage.setItem("savedCities", JSON.stringify(updatedCities));
    }
  };

  const removeCityFromSaved = (cityToRemove) => {
    const updatedCities = savedCities.filter(city => city.name !== cityToRemove);
    setSavedCities(updatedCities);
    localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  };
  useEffect(() => {
    const savedCitiesFromStorage = localStorage.getItem("savedCities");
    if (savedCitiesFromStorage) {
      setSavedCities(JSON.parse(savedCitiesFromStorage));
    }
  }, []);

  const submitCity = () =>
  {
    setPlace(input)
    setInput('')
  }
  const saveCity = () => {
    if (!isSaved) {
    // Если город еще не сохранен, добавляем его
    addCityToSaved(place);
  }
   // Переключаем состояние isSaved
    setIsSaved(!isSaved);
  }

 
  return (
    <BrowserRouter basename="/weather-app/">
    <div className="w-full h-screen text-white">
      <NavBar
      input={input} 
      setInput={setInput} 
      submitCity={submitCity} />
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
          fetchUserLocation={fetchUserLocation}
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