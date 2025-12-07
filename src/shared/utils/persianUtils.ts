export const persianUtils = {
  // Convert English numbers to Persian
  toPersianNumber(num: number | string): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  },

  // City name translations
  translateCity(city: string): string {
    const translations: { [key: string]: string } = {
      'Tehran': 'تهران',
      'Isfahan': 'اصفهان',
      'Shiraz': 'شیراز',
      'Mashhad': 'مشهد',
      'Tabriz': 'تبریز',
      'Karaj': 'کرج',
      'Ahvaz': 'اهواز',
      'Qom': 'قم',
      'Kermanshah': 'کرمانشاه',
      'Rasht': 'رشت',
      'Kerman': 'کرمان',
      'Urmia': 'ارومیه',
      'Zahedan': 'زاهدان',
      'Hamadan': 'همدان',
      'Yazd': 'یزد',
      'Ardabil': 'اردبیل',
      'Bandar Abbas': 'بندرعباس',
      'Arak': 'اراک',
      'Eslamshahr': 'اسلامشهر',
      'Zanjan': 'زنجان',
    };

    return translations[city] || city;
  },

  // Weather condition names in Persian
  getWeatherName(condition: string): string {
    const names: { [key: string]: string } = {
      'sunny': 'آفتابی',
      'cloudy': 'ابری',
      'rainy': 'بارانی',
      'snowy': 'برفی',
      'stormy': 'طوفانی',
      'foggy': 'مه‌آلود',
    };
    return names[condition] || condition;
  },

  // Temperature category names
  getTemperatureName(temp: string): string {
    const names: { [key: string]: string } = {
      'cold': 'سرد',
      'mild': 'معتدل',
      'hot': 'گرم',
    };
    return names[temp] || temp;
  },

  // Mood names
  getMoodName(mood: string): string {
    const names: { [key: string]: string } = {
      'happy': 'شاد',
      'sad': 'غمگین',
      'energetic': 'پرانرژی',
      'calm': 'آرام',
      'romantic': 'رمانتیک',
    };
    return names[mood] || mood;
  },
};
