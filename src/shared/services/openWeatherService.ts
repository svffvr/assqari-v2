import axios from 'axios';
import { config } from '../config/env';
import { OpenWeatherResponse } from '../types';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const openWeatherService = {
  async getCurrentWeather(lat: number, lon: number): Promise<OpenWeatherResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: config.openWeatherApiKey,
          units: 'metric',
          lang: 'fa',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  },

  async getWeatherByCity(city: string): Promise<OpenWeatherResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: config.openWeatherApiKey,
          units: 'metric',
          lang: 'fa',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw error;
    }
  },
};
