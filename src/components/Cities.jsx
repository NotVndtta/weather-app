import React from 'react'
import { useState, useEffect } from "react"
import { useStateContext } from "../Context"
import { useNavigate } from "react-router-dom";

const Cities = () => {
    const { savedCities, setSavedCities, setPlace } = useStateContext();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

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
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

    return (
        <div className="flex justify-center items-center my-10">
            <div className='w-[22rem] min-w-[22rem] glassCard p-4 '>
                <h1 className="font-bold text-5xl flex justify-center items-center">Cities</h1>
                <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search saved cities" 
                className='focus:outline-none text-black mt-5 mx-2 rounded-sm w-[50%] py-1 px-1'/>
                {savedCities.filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase())).map((city) => (
                    <div key={city.name} onClick={() => handleCityClick(city.name)} 
                    className='cursor-pointer w-full p-3 mt-4 flex justify-between items-center'>
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
