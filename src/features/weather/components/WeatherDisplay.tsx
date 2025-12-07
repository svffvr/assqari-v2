import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin } from 'phosphor-react-native';
import LottieView from 'lottie-react-native';
import { CategorizedWeather, BackgroundColor } from '../../../shared/types';
import { persianUtils } from '../../../shared/utils/persianUtils';
import { shamsiDateService } from '../../../shared/services/shamsiDateService';
import { colorUtils } from '../utils/colorUtils';

interface WeatherDisplayProps {
  weather: CategorizedWeather;
  colors: BackgroundColor;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather, colors }) => {
  const getWeatherAnimation = () => {
    const animName = colorUtils.getWeatherAnimation(weather.weather, weather.time_of_day);
    
    // Map to actual animation files
    const animations: { [key: string]: any } = {
      'clearday': require('../../../../assets/lottie/clearday.json'),
      'clearnight': require('../../../../assets/lottie/clearnight.json'),
      'cloudy': require('../../../../assets/lottie/cloudy.json'),
      'cloudynight': require('../../../../assets/lottie/cloudynight.json'),
      'rainy': require('../../../../assets/lottie/rainy.json'),
      'snowy': require('../../../../assets/lottie/snowy.json'),
      'thunder': require('../../../../assets/lottie/thunder.json'),
      'foggy': require('../../../../assets/lottie/foggy.json'),
    };

    return animations[animName] || animations['clearday'];
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.locationDate}>
          <View style={styles.location}>
            <MapPin size={24} color={colors.text} weight="regular" />
            <Text style={[styles.locationText, { color: colors.text }]}>
              {persianUtils.translateCity(weather.city)}
            </Text>
          </View>
          <View style={styles.datePreview}>
            <Text style={[styles.dateText, { color: colors.text }]}>
              {shamsiDateService.getCurrentShamsiDate()}
            </Text>
          </View>
        </View>
        
        <View style={styles.iconContainer}>
          <LottieView
            source={getWeatherAnimation()}
            autoPlay
            loop
            style={styles.weatherIcon}
          />
        </View>
      </View>

      <View style={styles.temperatureSection}>
        <Text style={[styles.temperature, { color: colors.text }]}>
          {persianUtils.toPersianNumber(weather.temp_celsius)}°
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  topSection: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -60,
  },
  locationDate: {
    flexDirection: 'column',
  },
  location: {
    flexDirection: 'row-reverse',
    gap: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: 32,
    fontFamily: 'YekanBakh-SemiBold',
    textAlign: 'right',
  },
  datePreview: {
    paddingLeft: 4,
  },
  dateText: {
    fontSize: 24,
    fontFamily: 'YekanBakh-Light',
    textAlign: 'right',
  },
  iconContainer: {
    // marginTop: 15,
  },
  weatherIcon: {
    width: 140,
    height: 140,
    // backgroundColor: '#fff',
    // marginTop: -40,
  },
  temperatureSection: {
    // marginBottom: 24,
    marginTop: -40,
  },
  temperature: {
    fontSize: 160,
    fontFamily: 'YekanBakh-ExtraBold',
    textAlign: 'left',
  },
});
