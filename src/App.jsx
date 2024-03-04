import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Temperature from "./components/Temperature";
import TimeAndLocation from "./components/TimeAndLocation";

export default function App() {
  return (
    <div className="mx-auto max-w-screen-md nt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 
    h-fit shadow-xl shadow-gray-400">
      <Navbar />
      <Search />
      <TimeAndLocation />
      <Temperature />
    </div>
  )
}