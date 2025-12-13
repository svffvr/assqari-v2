import { NativeModules, Platform } from 'react-native';

const { WidgetModule } = NativeModules;

interface WidgetData {
  temperature: string;
  location: string;
  sentence: string;
  bgColor: string;
  textColor: string;
  weatherIcon: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy' | 'night';
}

export const WidgetUpdater = {
  updateWidget: async (data: WidgetData): Promise<void> => {
    if (Platform.OS !== 'android') {
      console.log('Widget update only available on Android');
      return;
    }

    try {
      if (WidgetModule && WidgetModule.updateWidget) {
        await WidgetModule.updateWidget(
          data.temperature,
          data.location,
          data.sentence,
          data.bgColor,
          data.textColor,
          data.weatherIcon
        );
        console.log('✅ Widget updated successfully');
      }
    } catch (error) {
      console.error('❌ Failed to update widget:', error);
    }
  },
};