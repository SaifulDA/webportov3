import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const WeatherTimeApp = () => {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeatherAndTime = async (cityName) => {
    setLoading(true);
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setWeather(weatherRes.data);
      
      const timezoneOffset = weatherRes.data.timezone; // Offset dalam detik dari UTC
      const localTime = new Date(new Date().getTime() + timezoneOffset * 1000);
      setTime(localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setWeather(null);
      setTime(null);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input) fetchWeatherAndTime(input);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (weather) {
        const timezoneOffset = weather.timezone;
        const localTime = new Date(new Date().getTime() + timezoneOffset * 1000);
        setTime(localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [weather]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6`}>
      <motion.h1 
        className="text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Weather & Time App
      </motion.h1>
      
      <div className="flex justify-between items-center w-full max-w-md mb-6">
        <form onSubmit={handleSearch} className="flex gap-4 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter city name"
            className="w-full p-3 rounded-lg text-black focus:outline-none"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
       
      </div>
      
      {loading && <div className="text-lg font-semibold animate-pulse">Loading...</div>}
      
      {weather && (
        <motion.div 
          className="bg-white text-black p-6 rounded-2xl shadow-2xl w-80 text-center dark:bg-gray-800 dark:text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-lg capitalize">{weather.weather[0].description}</p>
          <p className="text-3xl font-semibold my-2">{weather.main.temp}°C</p>
          <p className="text-md">Humidity: {weather.main.humidity}%</p>
        </motion.div>
      )}
      
      {time && (
        <motion.div 
          className="mt-6 bg-white text-black p-5 rounded-2xl shadow-2xl w-80 text-center dark:bg-gray-800 dark:text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold">Local Time</h2>
          <p className="text-lg font-medium">{time}</p>
        </motion.div>
      )}
    </div>
  );
};

export default WeatherTimeApp;