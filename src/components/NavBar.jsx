import React from 'react'
import search from '../assets/icons/search.svg'
import { Link } from 'react-router-dom'
import '../index.css'

const NavBar = ({input,setInput, submitCity}) => {
  return (
    <nav className="w-full p-3 flex justify-between items-center glassCard">
        <Link to='' className="font-bold tracking-wide text-3xl">Weather</Link>
        <Link to='/cities' className="font-bold tracking-wide text-3xl hover:underline">Cities
        </Link>
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
  )
}

export default NavBar
