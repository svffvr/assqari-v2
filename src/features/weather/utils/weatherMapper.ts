import {
  CategorizedWeather,
  OpenWeatherResponse,
  WeatherCondition,
  Temperature,
  Humidity,
  Wind,
  TimeOfDay,
} from '../types';

export const weatherMapper = {
  categorizeWeather(rawData: OpenWeatherResponse): CategorizedWeather {
    const temp = rawData.main.temp;
    const humidity = rawData.main.humidity;
    const windSpeed = rawData.wind.speed * 3.6; // Convert m/s to km/h
    const weatherId = rawData.weather[0]?.id || 800;
    const weatherMain = rawData.weather[0]?.main?.toLowerCase() || '';

    return {
      weather: this.getWeatherCondition(weatherId, weatherMain),
      temperature: this.getTemperature(temp),
      humidity: this.getHumidity(humidity),
      wind: this.getWind(windSpeed),
      time_of_day: this.getTimeOfDay(),
      mood: null,
      city: rawData.name,
      temp_celsius: Math.round(temp),
      raw_humidity: humidity,
      raw_wind_speed: windSpeed,
    };
  },

  getWeatherCondition(id: number, main: string): WeatherCondition {
    // Thunderstorm
    if (id >= 200 && id < 300) return 'stormy';
    
    // Drizzle or Rain
    if (id >= 300 && id < 600) return 'rainy';
    
    // Snow
    if (id >= 600 && id < 700) return 'snowy';
    
    // Atmosphere (fog, mist, haze, etc.)
    if (id >= 700 && id < 800) return 'foggy';
    
    // Clear
    if (id === 800) return 'sunny';
    
    // Clouds
    if (id > 800 && id < 900) {
      // 801: few clouds, 802: scattered clouds
      if (id <= 802) return 'cloudy';
      // 803-804: broken/overcast clouds
      return 'cloudy';
    }
    
    return 'sunny';
  },

  getTemperature(temp: number): Temperature {
    if (temp < 10) return 'cold';
    if (temp <= 25) return 'mild';
    return 'hot';
  },

  getHumidity(humidity: number): Humidity {
    if (humidity < 30) return 'dry';
    if (humidity <= 70) return 'normal';
    return 'humid';
  },

  getWind(speed: number): Wind {
    if (speed < 10) return 'calm';
    if (speed <= 30) return 'breezy';
    return 'windy';
  },

  getTimeOfDay(): TimeOfDay {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'noon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  },
};
