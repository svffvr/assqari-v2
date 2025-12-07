import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { openWeatherService } from '../../../shared/services/openWeatherService';
import { weatherMapper } from '../utils/weatherMapper';
import { CategorizedWeather } from '../../../shared/types';

export const useWeather = () => {
  const [weather, setWeather] = useState<CategorizedWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('دسترسی به موقعیت مکانی رد شد');
        setLoading(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Fetch weather data
      const rawWeather = await openWeatherService.getCurrentWeather(
        location.coords.latitude,
        location.coords.longitude
      );

      console.log('📍 OpenWeather API Response:', JSON.stringify(rawWeather, null, 2));

      // Categorize weather
      const categorized = weatherMapper.categorizeWeather(rawWeather);
      console.log('🌤️ Categorized Weather:', categorized);
      
      setWeather(categorized);
    } catch (err: any) {
      console.error('Error fetching weather:', err);
      setError(err.message || 'خطا در دریافت اطلاعات آب و هوا');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const refetch = () => {
    fetchWeather();
  };

  return {
    weather,
    loading,
    error,
    refetch,
  };
};