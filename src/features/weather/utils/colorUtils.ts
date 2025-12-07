import { WeatherCondition, TimeOfDay, BackgroundColor } from '../../../shared/types';

export const colorUtils = {
  getBackgroundColor(weather: WeatherCondition, timeOfDay: TimeOfDay, temp: number): BackgroundColor {
    // Night takes priority
    if (timeOfDay === 'night') {
      return {
        primary: '#000000',
        text: '#ffffff',
        textSpecial: '#2E53B3',
      };
    }

    // Weather-based colors
    switch (weather) {
      case 'rainy':
        return {
          primary: '#123285',
          text: '#ffffff',
          textSpecial: '#91DBE4',
        };

      case 'snowy':
        return {
          primary: '#91DBE4',
          text: '#000000',
          textSpecial: '#123285',
        };

      case 'stormy':
        return {
          primary: '#123285',
          text: '#ffffff',
          textSpecial: '#DCBA31',
        };

      case 'foggy':
        return {
          primary: '#CDDADE',
          text: '#000000',
          textSpecial: '#123285',
        };

      case 'cloudy':
        return {
          primary: '#CDDADE',
          text: '#000000',
          textSpecial: '#123285',
        };

      case 'sunny':
      default:
        // Hot weather
        if (temp > 30) {
          return {
            primary: '#C92700',
            text: '#ffffff',
            textSpecial: '#DCBA31',
          };
        }
        
        // Sunrise/sunset
        if (timeOfDay === 'morning' || timeOfDay === 'evening') {
          const hour = new Date().getHours();
          if ((hour >= 5 && hour <= 7) || (hour >= 17 && hour <= 19)) {
            return {
              primary: '#BC5256',
              text: '#ffffff',
              textSpecial: '#DCBA31',
            };
          }
        }

        // Default sunny
        return {
          primary: '#DCBA31',
          text: '#000000',
          textSpecial: '#BC5256',
        };
    }
  },

  // Map weather condition to Lottie animation
  getWeatherAnimation(weather: WeatherCondition, timeOfDay: TimeOfDay): string {
    if (timeOfDay === 'night') {
      if (weather === 'cloudy') {
        return 'cloudynight';
      }
      return 'clearnight';
    }

    switch (weather) {
      case 'stormy':
        return 'thunder';
      case 'rainy':
        return 'rainy';
      case 'snowy':
        return 'snowy';
      case 'foggy':
        return 'foggy';
      case 'cloudy':
        return 'cloudy';
      case 'sunny':
      default:
        return 'clearday';
    }
  },
};
