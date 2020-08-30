import React, { useState } from 'react';
import axios from 'axios';

import { FaLocationArrow, FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";


export default function Body() {
    const [formData, setFormData] = useState({
        'location': ''
    });

    const [weatherData, setWeatherData] = useState({
        'name': '',
        'country': '',
        'temp': '',
        'humidity': '',
        'icon': ''
    });

    const [searchMessage, setSearchMessage] = useState(true);

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });
    }

    function convertToCelsius(temp) {
        const celsius = Math.floor(temp - 273.1);
        return celsius;
    }

    async function getWeatherData(e) {
        e.preventDefault();
        try {
            const res = await axios(`https://api.openweathermap.org/data/2.5/find?q=${formData.location}&appid=c0eda8c889c97193be3f172e8d015f5f`);
            setWeatherData({
                'name': res.data.list[0].name,
                'country': res.data.list[0].sys.country,
                'temp': convertToCelsius(res.data.list[0].main.temp),
                'humidity': res.data.list[0].main.humidity,
                'icon': res.data.list[0].weather[0].icon
            });
            setSearchMessage(false);
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <div className="App-body">
            <form onSubmit={getWeatherData}>
                <input
                    onChange={handleInputChange}
                    value={formData.location}
                    type="text"
                    id="location"
                    placeholder="Search..."
                />
                <button type="submit">Search</button>
            </form>
            {(searchMessage ?
                <h4>Please enter the name of the city!</h4>
                :
                <div>
                    <div className="App-weather-info">
                        <div className="App-weather-icons">
                            <p><FaLocationArrow className="App-weather-icon" />{weatherData.name}, {weatherData.country}</p>
                            <p><FaTemperatureLow className="App-weather-icon" />{weatherData.temp}&#8451;</p>
                            <p><WiHumidity className="App-weather-icon-humidity" />{weatherData.humidity}%</p>
                        </div>
                        <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt='Loading...' />
                    </div>
                </div>
            )}
        </div>
    )
}