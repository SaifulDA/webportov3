import { useState, useEffect } from "react";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Search, Clock, Thermometer, Droplets, Wind, Globe, Languages, Settings } from "lucide-react";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";

const InternationalWeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");
  const [unit, setUnit] = useState("metric"); // metric or imperial

  // API key for OpenWeatherMap - in a real app, this would be stored securely
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; // Replace with your actual API key

  // Language translations
  const translations = {
    en: {
      title: "International Weather & Time",
      searchPlaceholder: "Enter city name...",
      feelsLike: "Feels Like",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      localTime: "Local Time",
      weatherIn: "Weather in",
      enterCity: "Enter a city name to see weather information",
      notFound: "City not found. Please try again.",
      networkError: "Network error. Please check your connection.",
      apiError: "Error fetching weather data. Please try again.",
      loading: "Loading...",
      settings: "Settings",
      language: "Language",
      units: "Units",
      metric: "Celsius (°C)",
      imperial: "Fahrenheit (°F)",
    },
    es: {
      title: "Clima y Hora Internacional",
      searchPlaceholder: "Ingrese nombre de ciudad...",
      feelsLike: "Sensación",
      humidity: "Humedad",
      windSpeed: "Velocidad del Viento",
      localTime: "Hora Local",
      weatherIn: "Clima en",
      enterCity: "Ingrese una ciudad para ver información meteorológica",
      notFound: "Ciudad no encontrada. Inténtelo de nuevo.",
      networkError: "Error de red. Por favor, compruebe su conexión.",
      apiError: "Error al obtener datos meteorológicos. Inténtelo de nuevo.",
      loading: "Cargando...",
      settings: "Ajustes",
      language: "Idioma",
      units: "Unidades",
      metric: "Celsius (°C)",
      imperial: "Fahrenheit (°F)",
    },
    fr: {
      title: "Météo et Heure Internationale",
      searchPlaceholder: "Entrez le nom de la ville...",
      feelsLike: "Ressenti",
      humidity: "Humidité",
      windSpeed: "Vitesse du Vent",
      localTime: "Heure Locale",
      weatherIn: "Météo à",
      enterCity: "Entrez une ville pour voir les informations météo",
      notFound: "Ville introuvable. Veuillez réessayer.",
      networkError: "Erreur réseau. Veuillez vérifier votre connexion.",
      apiError: "Erreur lors de la récupération des données météo. Veuillez réessayer.",
      loading: "Chargement...",
      settings: "Paramètres",
      language: "Langue",
      units: "Unités",
      metric: "Celsius (°C)",
      imperial: "Fahrenheit (°F)",
    },
    id: {
      title: "Cuaca & Waktu Internasional",
      searchPlaceholder: "Masukkan nama kota...",
      feelsLike: "Terasa Seperti",
      humidity: "Kelembaban",
      windSpeed: "Kecepatan Angin",
      localTime: "Waktu Lokal",
      weatherIn: "Cuaca di",
      enterCity: "Masukkan nama kota untuk melihat informasi cuaca",
      notFound: "Kota tidak ditemukan. Silakan coba lagi.",
      networkError: "Kesalahan jaringan. Silakan periksa koneksi Anda.",
      apiError: "Kesalahan mengambil data cuaca. Silakan coba lagi.",
      loading: "Memuat...",
      settings: "Pengaturan",
      language: "Bahasa",
      units: "Satuan",
      metric: "Celsius (°C)",
      imperial: "Fahrenheit (°F)",
    },
    zh: {
      title: "国际天气和时间",
      searchPlaceholder: "输入城市名称...",
      feelsLike: "体感温度",
      humidity: "湿度",
      windSpeed: "风速",
      localTime: "当地时间",
      weatherIn: "天气在",
      enterCity: "输入城市名称查看天气信息",
      notFound: "未找到城市。请重试。",
      networkError: "网络错误。请检查您的连接。",
      apiError: "获取天气数据时出错。请重试。",
      loading: "加载中...",
      settings: "设置",
      language: "语言",
      units: "单位",
      metric: "摄氏度 (°C)",
      imperial: "华氏度 (°F)",
    },
  };

  const weatherDescriptions = {
    en: {
      "clear sky": "Clear Sky",
      "few clouds": "Few Clouds",
      "scattered clouds": "Scattered Clouds",
      "broken clouds": "Broken Clouds",
      "shower rain": "Shower Rain",
      rain: "Rain",
      thunderstorm: "Thunderstorm",
      snow: "Snow",
      mist: "Mist",
    },
    es: {
      "clear sky": "Cielo Despejado",
      "few clouds": "Pocas Nubes",
      "scattered clouds": "Nubes Dispersas",
      "broken clouds": "Nubosidad Variable",
      "shower rain": "Aguacero",
      rain: "Lluvia",
      thunderstorm: "Tormenta",
      snow: "Nieve",
      mist: "Neblina",
    },
    fr: {
      "clear sky": "Ciel Dégagé",
      "few clouds": "Quelques Nuages",
      "scattered clouds": "Nuages Épars",
      "broken clouds": "Nuages Fragmentés",
      "shower rain": "Averses",
      rain: "Pluie",
      thunderstorm: "Orage",
      snow: "Neige",
      mist: "Brume",
    },
    id: {
      "clear sky": "Langit Cerah",
      "few clouds": "Berawan Sebagian",
      "scattered clouds": "Berawan Terpencar",
      "broken clouds": "Berawan Pecah",
      "shower rain": "Hujan Ringan",
      rain: "Hujan",
      thunderstorm: "Badai Petir",
      snow: "Salju",
      mist: "Berkabut",
    },
    zh: {
      "clear sky": "晴朗",
      "few clouds": "少云",
      "scattered clouds": "多云",
      "broken clouds": "阴天",
      "shower rain": "阵雨",
      rain: "雨",
      thunderstorm: "雷暴",
      snow: "雪",
      mist: "雾",
    },
  };

  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  // Translate weather description based on the current language
  const translateWeatherDescription = (description) => {
    const lowerDesc = description.toLowerCase();
    for (const [key, value] of Object.entries(weatherDescriptions[language] || weatherDescriptions.en)) {
      if (lowerDesc.includes(key)) {
        return value;
      }
    }
    return description;
  };

  // Real API call to OpenWeatherMap
  const fetchWeatherAndTime = async (cityName) => {
    setLoading(true);
    setError("");

    try {
      // Fetch weather data from OpenWeatherMap API
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=${unit}&appid=${API_KEY}&lang=${language}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("city-not-found");
        } else {
          throw new Error("api-error");
        }
      }

      const data = await response.json();

      // Process and set the weather data
      const weatherData = {
        name: data.name,
        sys: { country: data.sys.country },
        weather: [
          {
            description: data.weather[0].description,
            translatedDescription: translateWeatherDescription(data.weather[0].description),
          },
        ],
        main: {
          temp: data.main.temp.toFixed(1),
          feels_like: data.main.feels_like.toFixed(1),
          humidity: data.main.humidity,
        },
        wind: {
          speed: data.wind.speed.toFixed(1),
        },
        timezone: data.timezone,
      };

      setWeather(weatherData);
      updateLocalTime(data.timezone);
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error.message === "city-not-found") {
        setError(t("notFound"));
      } else if (error.message === "api-error") {
        setError(t("apiError"));
      } else {
        setError(t("networkError"));
      }

      setWeather(null);
      setTime(null);
    } finally {
      setLoading(false);
    }
  };

  const updateLocalTime = (timezoneOffset) => {
    // Calculate local time based on timezone offset from UTC
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + timezoneOffset * 1000);

    // Internationalized time format based on selected language
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: language === "en", // 12-hour format for English, 24-hour for others
    };

    setTime(localTime.toLocaleTimeString(language, options));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) fetchWeatherAndTime(input);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    if (weather && input) {
      // Re-fetch weather data with new unit setting
      fetchWeatherAndTime(input);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (weather && input) {
      // Re-fetch weather data with new language setting
      fetchWeatherAndTime(input);
    }
  };

  useEffect(() => {
    let interval;

    if (weather) {
      interval = setInterval(() => {
        updateLocalTime(weather.timezone);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [weather, language]);

  const getWeatherIcon = () => {
    if (!weather) return null;

    const description = weather.weather[0].description.toLowerCase();

    if (description.includes("clear")) {
      return <Sun size={64} className="text-yellow-400" />;
    } else if (description.includes("few clouds") || description.includes("scattered clouds")) {
      return <Cloud size={64} className="text-gray-400" />;
    } else if (description.includes("broken clouds") || description.includes("overcast")) {
      return <Cloud size={64} className="text-gray-500" />;
    } else if (description.includes("rain") || description.includes("drizzle")) {
      return <CloudRain size={64} className="text-blue-400" />;
    } else if (description.includes("thunderstorm")) {
      return <CloudLightning size={64} className="text-yellow-300" />;
    } else if (description.includes("snow")) {
      return <CloudSnow size={64} className="text-blue-100" />;
    } else if (description.includes("mist") || description.includes("fog")) {
      return <CloudFog size={64} className="text-gray-300" />;
    }

    return <Cloud size={64} className="text-gray-400" />;
  };

  // Format country name based on language
  const formatCountryName = (countryCode) => {
    try {
      return new Intl.DisplayNames([language], { type: "region" }).of(countryCode);
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return countryCode;
    }
  };

  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white dark:bg-black">
        <div>
          <Navbar />
          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-8 lg:pt-20 xl:pt-20">
              <h1 className="text-3xl font-bold font-kreon tracking-wider text-center bg-clip-text text-transparent bg-black dark:bg-white flex items-center">
                <Globe className="mr-2" size={24} />
                {t("title")}
              </h1>
              <button onClick={() => setShowSettings(!showSettings)} className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Settings size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {showSettings && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6 animate-fadeIn">
                <h3 className="font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-200">
                  <Languages size={18} className="mr-2" />
                  {t("language")}
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {Object.keys(translations).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-3 py-2 rounded text-sm ${language === lang ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                    >
                      {lang === "en" ? "English" : lang === "es" ? "Español" : lang === "fr" ? "Français" : lang === "id" ? "Indonesia" : lang === "zh" ? "中文" : lang}
                    </button>
                  ))}
                </div>

                <h3 className="font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-200">
                  <Thermometer size={18} className="mr-2" />
                  {t("units")}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUnitChange("metric")}
                    className={`px-3 py-2 rounded text-sm ${unit === "metric" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                  >
                    {t("metric")}
                  </button>
                  <button
                    onClick={() => handleUnitChange("imperial")}
                    className={`px-3 py-2 rounded text-sm ${unit === "imperial" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                  >
                    {t("imperial")}
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSearch} className="relative mb-8">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full p-4 pr-12 rounded-full shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-800 dark:text-white"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors" disabled={loading}>
                <Search size={20} />
              </button>
            </form>

            {loading && (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 dark:bg-red-900 dark:text-red-200 dark:border-red-700">
                <p>{error}</p>
              </div>
            )}

            {weather && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-6 transition-all hover:shadow-2xl">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {weather.name}, {formatCountryName(weather.sys.country)}
                    </h2>
                    <p className="text-white/90 capitalize flex items-center">
                      <Clock size={16} className="mr-1" />
                      {time || t("loading")}
                    </p>
                  </div>
                  {getWeatherIcon()}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-4xl font-bold dark:text-white">
                      {weather.main.temp}°{unit === "metric" ? "C" : "F"}
                    </p>
                    <p className="text-lg capitalize bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full text-blue-800 dark:text-blue-200">{weather.weather[0].translatedDescription || weather.weather[0].description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <Thermometer className="text-orange-500 mr-2" size={20} />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t("feelsLike")}</p>
                        <p className="font-medium dark:text-white">
                          {weather.main.feels_like}°{unit === "metric" ? "C" : "F"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <Droplets className="text-blue-500 mr-2" size={20} />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t("humidity")}</p>
                        <p className="font-medium dark:text-white">{weather.main.humidity}%</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <Wind className="text-teal-500 mr-2" size={20} />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t("windSpeed")}</p>
                        <p className="font-medium dark:text-white">
                          {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <Clock className="text-purple-500 mr-2" size={20} />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t("localTime")}</p>
                        <p className="font-medium dark:text-white">{time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!weather && !loading && !error && (
              <div className="flex flex-col items-center shadow-md justify-center p-10 bg-white/50 dark:bg-gray-800/50 rounded-3xl">
                <Globe className="text-black dark:text-white mb-4" size={64} />
                <p className="text-gray-500 dark:text-gray-400 text-center">{t("enterCity")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InternationalWeatherApp;
