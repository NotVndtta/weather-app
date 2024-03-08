import React from 'react'
import { useState } from "react"
import { useStateContext } from "../Context"
import { useNavigate } from "react-router-dom";

const Cities = () => {
    const { savedCities, setPlace } = useStateContext();
    const navigate = useNavigate();
    const handleCityClick = (city) => {
        setPlace(city);
        navigate('/');
    }

  return (
    <div>
      <h1>Cities</h1>
      {savedCities.map((city) => (
        <div key={city} onClick={() => handleCityClick(city)} className='cursor-pointer'>{city}</div>
      ))}
    </div>
  )
}

export default Cities
