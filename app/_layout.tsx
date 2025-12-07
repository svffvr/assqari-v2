import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'YekanBakh-Thin': require('../assets/fonts/YekanBakh-Thin.otf'),
    'YekanBakh-Light': require('../assets/fonts/YekanBakh-Light.otf'),
    'YekanBakh-Regular': require('../assets/fonts/YekanBakh-Regular.otf'),
    'YekanBakh-SemiBold': require('../assets/fonts/YekanBakh-SemiBold.otf'),
    'YekanBakh-Bold': require('../assets/fonts/YekanBakh-Bold.otf'),
    'YekanBakh-ExtraBold': require('../assets/fonts/YekanBakh-ExtraBold.otf'),
    'YekanBakh-Black': require('../assets/fonts/YekanBakh-Black.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />;
}
