import React from 'react'

const Navbar = () => {
    const cities = [
        {
            id: 1,
            title: 'Moscow'
        },
        {
            id: 2,
            title: 'Sevastopol'
        },
        {
            id: 3,
            title: 'Kiev'
        },
        {
            id: 4,
            title: 'Avdeevka'
        },
        {
            id: 5,
            title: 'Leningrad'
        },

    ]

return (
    <div className='flex itmes-center justify-around my-6 '>
        {cities.map((city) => (
            <button key={city.id} className='text-white text-lg font-medium '> {city.title} </button>
        ) )}
    </div>
  )
}

export default Navbar
