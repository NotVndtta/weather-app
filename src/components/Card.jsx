import React, { useEffect, useState } from 'react'

import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloudy.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import overcast from '../assets/icons/overcast.png'

const Card = ({time, temp, iconString}) => {
    const [icon, setIcon] = useState()
    const [weatherCondition, setWeatherCondition] = useState('')
    useEffect(() => {
      console.log('iconString:', iconString);
      if (iconString) {
        if (iconString.toLowerCase().includes('cloud')) {
          setIcon(cloud)
          setWeatherCondition('Облачно') // обновляем состояние
        } else if (iconString.toLowerCase().includes('rain')) {
          setIcon(rain)
          setWeatherCondition('Дождь')
        } else if (iconString.toLowerCase().includes('clear')) {
          setIcon(sun)
          setWeatherCondition('Ясно')
        } else if (iconString.toLowerCase().includes('overcast')) {
          setIcon(overcast)
          setWeatherCondition('Пасмурно')
        } else if (iconString.toLowerCase().includes('fog')) {
          setIcon(fog)
          setWeatherCondition('Туман')
        } else if (iconString.toLowerCase().includes('snow')) {
          setIcon(snow)
          setWeatherCondition('Снег')
        } else if (iconString.toLowerCase().includes('wind')) {
          setIcon(wind)
          setWeatherCondition('Ветрено')
        }
      }
    }, [iconString])
  return (
    <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col '>
        <p className="text-center ">
            {new Date(time).toLocaleTimeString('en',  { weekday: 'long' }).split(" ")[0]}
        </p>
        <hr />
        <div className="w-full flex justify-center items-center flex-1">
            <img src={icon} alt="weather" className='w-[4rem] h-[4rem]' />
            <p className="text-lg">{weatherCondition}</p> 
        </div>
        <p className="text-center font-bold">{temp}&deg;C</p>      
    </div>
  )
}

export default Card
