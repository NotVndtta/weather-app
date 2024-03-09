import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({children}) => {
    const [weather, setWeather] = useState({})

    const [values, setValues] = useState([])

    const [place, setPlace] = useState('Sevastopol')

    const [thisLocation, setLocation] = useState('')

    const [savedCities, setSavedCities] = useState([]);

    

    const fetchUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setPlace(`${latitude},${longitude}`);
            }, (error) => {
                console.error(error);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    useEffect(() => {
        fetchUserLocation();
    }, []);

   
    const fetchWeather = async() => {
       
        
        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0
            },

            headers: {
                'X-RapidAPI-Key': '0f328ff339msh04450ff099848f1p1d2eecjsnf7ec2eb38af4',
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        }
    try{
        const response = await axios.request(options);
        console.log(response.data)
        const thisData = Object.values(response.data.locations)[0]
        if (place.includes(',')) {
            setLocation('Your location');
        } else {
            setLocation(thisData.address);
        }

        setValues(thisData.values)

        setWeather(thisData.values[0])
        

    } catch(e) {
        console.error(e);

        alert('Tjis place does not exist')
      }
 }

    useEffect(() => {
        fetchWeather()
    },[place])

    useEffect(() => {
        console.log(values)
    }, [values])

    return (
     <StateContext.Provider value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
        savedCities,
        setSavedCities,
        fetchUserLocation 
     }}>
        {children}
     </StateContext.Provider> 
    )
}

export const useStateContext = () => useContext(StateContext)