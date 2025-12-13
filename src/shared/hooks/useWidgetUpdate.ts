import { useEffect } from 'react';
import { WidgetUpdater } from '../services/WidgetUpdateModule';
import { CategorizedWeather } from '../types';
import { Situation } from '../types';
import { colorUtils } from '../../features/weather/utils/colorUtils';
import { persianUtils } from '../utils/persianUtils';

export const useWidgetUpdate = (
  weather: CategorizedWeather | null,
  situation: Situation | null
) => {
  useEffect(() => {
    if (weather && situation) {
      updateWidget(weather, situation);
    }
  }, [weather, situation]);


  const updateWidget = async (
    weather: CategorizedWeather,
    situation: Situation
  ) => {
    try {
      const colors = colorUtils.getBackgroundColor(
        weather.weather,
        weather.time_of_day,
        weather.temp_celsius
      );

      const weatherIconMap: { [key: string]: any } = {
        'sunny': 'sunny',
        'cloudy': 'cloudy',
        'rainy': 'rainy',
        'snowy': 'snowy',
        'stormy': 'stormy',
        'foggy': 'foggy',
      };

      const isNight = weather.time_of_day === 'night';
      const weatherIcon = isNight ? 'night' : weatherIconMap[weather.weather] || 'sunny';

      await WidgetUpdater.updateWidget({
        temperature: persianUtils.toPersianNumber(weather.temp_celsius),
        location: persianUtils.translateCity(weather.city),
        sentence: situation.sentence_fa,
        bgColor: colors.primary,
        textColor: colors.text,
        weatherIcon: weatherIcon,
      });

      console.log('🔄 Widget updated with latest data');
    } catch (error) {
      console.error('Failed to update widget:', error);
    }
  };
};