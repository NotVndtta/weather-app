import React from 'react'
import { useState, useEffect } from "react"
import { useStateContext } from "../Context"
import { useNavigate } from "react-router-dom";

const Cities = () => {
    const { savedCities, setSavedCities, setPlace } = useStateContext();
    const navigate = useNavigate();

    // Загрузить сохраненные города из Local Storage при инициализации
    useEffect(() => {
        const loadedCities = localStorage.getItem("savedCities");
        if (loadedCities) {
            setSavedCities(JSON.parse(loadedCities));
        }
    }, []);

    const handleCityClick = (city) => {
        setPlace(city);
        navigate('/');
    }

    const handleDeleteCity = (event, city) => {
      event.stopPropagation();
      const newSavedCities = savedCities.filter(savedCity => savedCity.name !== city);
      setSavedCities(newSavedCities);
      localStorage.setItem("savedCities", JSON.stringify(newSavedCities));
  }

    return (
        <div className="flex justify-center items-center my-10">
            <div className='w-[22rem] min-w-[22rem] glassCard p-4 '>
                <h1 className="font-bold text-5xl flex justify-center items-center">Cities</h1>
                {savedCities.map((city) => (
                    <div key={city.name} onClick={() => handleCityClick(city.name)} className='cursor-pointer w-full p-3 mt-4 flex justify-between items-center'>
                        <p className='font-semibold text-lg'>{city.name}</p>
                        <button onClick={(event) => handleDeleteCity(event, city.name)}>Delete</button>
                    </div>
                ))}
                <hr className='bg-slate-600' />
            </div>
        </div>
    )
}

export default Cities
