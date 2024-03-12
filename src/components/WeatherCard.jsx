import React, { useEffect, useState } from 'react'
import { useDate } from '../Utils/useDate'
import '../index.css'

import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloudy.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import overcast from '../assets/icons/overcast.png'
import location from '../assets/icons/location-point-white.svg'


 
const WeatherCard = ({
    temperature,
    windspeed,
    humidity,
    place,
    heatIndex,
    iconString,
    conditions,
    saveCity,
    isSaved,
    savedCities,
    fetchUserLocation
}) => {
    const [icon, setIcon] = useState()
    const {time} = useDate()
    const [showMenu, setShowMenu] = useState(false)
    const [showHeatIndex, setShowHeatIndex] = useState(false)
    const [tempShowHeatIndex, setTempShowHeatIndex] = useState(false)

    const handleCheckboxChange = (event) => {
      setTempShowHeatIndex(event.target.checked);
      if (!event.target.checked) {
        setShowHeatIndex(false);
      }
    };

    const handleDoneClick = () => {
      if(tempShowHeatIndex){
        setShowHeatIndex(tempShowHeatIndex);
      }
      setShowMenu(false);
    };

    useEffect(() => {
        if (iconString) {
          if (iconString.toLowerCase().includes('cloud')) {
            setIcon(cloud)
          } else if (iconString.toLowerCase().includes('rain')) {
            setIcon(rain)
          } else if (iconString.toLowerCase().includes('clear')) {
            setIcon(sun)
          } else if (iconString.toLowerCase().includes('overcast')) {
            setIcon(overcast)
          } else if (iconString.toLowerCase().includes('fog')) {
            setIcon(fog)
          } else if (iconString.toLowerCase().includes('snow')) {
            setIcon(snow)
          } else if (iconString.toLowerCase().includes('wind')) {
            setIcon(wind)
          }
        }
      }, [iconString])

      

  return (
    <div className='w-[22rem] min-w-[22rem]  glassCard p-4'>
      <div className="flex justify-between">
      <button onClick={saveCity} className="flex text-right border p-2 border-r-white rounded-lg
      transition-opacity duration-200 hover:opacity-90 transform active:scale-90">
        Add City
      </button>
      <button onClick={fetchUserLocation} className='transform active:scale-90'>
        <img src={location} alt="location-icon" className='w-9 h-9' />
      </button>
      </div>

      <div className="flex w-full justify-center items-center gap-4 mt-4 mb-4">
        <img src={icon} alt="weather-icon" className='w-[150px] h-[150px]' />
        <p className="font-bold text-5xl flex justify-center items-center ">{temperature} &deg;C</p>
      </div>
      <div className='font-bold text-center text-xl'>
        {place}
      </div>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
        <p className='flex-1 text-center p-2'>{time}</p>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind Speed <span className='font-normal'>{windspeed} km/h</span></p>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <span className='font-normal'>{humidity} gm/m&#179;</span></p>
      </div>
      <div className='w-full p-3 mt-4 flex justify-between items-center'>
        <button onClick={() => setShowMenu(!showMenu)}>More settings</button>
      </div>
      {showMenu && (
      <div className='p-3'>
        <input type="checkbox" id="heatIndex" name="heatIndex"
        checked={tempShowHeatIndex} onChange={handleCheckboxChange} />
        <label htmlFor="heatIndex">Show Heat index</label>
        <br />
        <button onClick={handleDoneClick}>Submit</button>
       
      </div>
    )}
    {showHeatIndex && (
      <div className='mt-1 p-3'>
        <p>Heat Index: {heatIndex ? heatIndex : 'N/A'}</p>
      </div>
    )}
      <hr className='bg-slate-600' />
      <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
        {conditions}
      </div>
    </div>
  )
}

export default WeatherCard
