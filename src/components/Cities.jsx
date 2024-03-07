import React from 'react'
import { useState } from "react"
import { useStateContext } from "../Context"

const Cities = () => {
    const { savedCities, setPlace } = useStateContext();
    const handleCityClick = (city) => {
        setPlace(city);
    }

  return (
    <div>
      {savedCities.map((city) => (
        <div key={city} onClick={() => handleCityClick(city)} className='cursor-pointer'>{city}</div>
      ))}
    </div>
  )
}

export default Cities
