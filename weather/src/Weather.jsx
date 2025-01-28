import React, { useEffect, useState } from 'react';
import './Weather.css';

const clear_icon = '/resources/clear.png';
const cloud_icon = '/resources/cloud.png';
const drizzle_icon = '/resources/drizzle.png';
const rain_icon = '/resources/rain.png';
const snow_icon = '/resources/snow.png';
const searchIcon = '/resources/search.ico';
const humidityIcon = '/resources/humidity.png';
const windIcon = '/resources/wind.png';

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Almaty');

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const search = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fe791605ed0fac457380342087f3359b`;
            const response = await fetch(url);
            const data = await response.json();
    
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: allIcons[data.weather[0].icon] || clear_icon
            });
        } catch (error) {
            setWeatherData(false)
            console.error(error);
        }
    };

    useEffect(() => {
        search();
    }, []);

    return (
        <div className='body'>
            <div className='search'>
                <input 
                    type="text" placeholder='Search' value={city} onChange={(e) => setCity(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && search()}
                />
                <img src={searchIcon} alt="search" onClick={search} />
            </div>

            <img src={weatherData?.icon || clear_icon} alt="weather" />
            <p className='temp'>{weatherData?.temperature ?? '16'}°C</p>
            <p className='Location'>{weatherData?.location || 'London'}</p>
            
            <div className='weather-data'>
                <div className='col'>
                    <img src={humidityIcon} alt="humidity" />
                    <div>
                        <p>{weatherData?.humidity ?? '69'}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={windIcon} alt="wind" />
                    <div>
                        <p>{weatherData?.windSpeed ?? '3.6'} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
