# حال و هوا - Weather Mood App

یک اپلیکیشن هوشمند هواشناسی که بر اساس شرایط جوی، موزیک و لباس مناسب را پیشنهاد می‌دهد.

## ویژگی‌ها

- ✅ رابط کاربری کاملاً فارسی با فونت یکان‌باخ
- ✅ ادغام با OpenWeather API برای دریافت اطلاعات آب و هوا
- ✅ نمایش تاریخ شمسی
- ✅ رنگ‌های پس‌زمینه جامد (بدون گرادیانت)
- ✅ پنل مدیریت برای مدیریت موقعیت‌ها، موزیک‌ها و لباس‌ها
- ✅ انیمیشن‌های Lottie برای وضعیت آب و هوا
- ✅ معماری مبتنی بر Feature

## نصب و راه‌اندازی

### 1. پیش‌نیازها

- Node.js (v18 یا بالاتر)
- npm یا yarn
- Expo CLI: `npm install -g expo-cli`

### 2. کلون کردن و نصب وابستگی‌ها

```bash
cd weather-mood-app
npm install
```

### 3. تنظیم متغیرهای محیطی

فایل `src/shared/config/env.ts` را ویرایش کنید و کلیدهای API خود را وارد کنید:

```typescript
export const config = {
  openWeatherApiKey: 'YOUR_OPENWEATHER_API_KEY',
  supabase: {
    url: 'YOUR_SUPABASE_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY',
  },
};
```

### 4. راه‌اندازی دیتابیس Supabase

1. یک پروژه جدید در [Supabase](https://supabase.com) ایجاد کنید
2. SQL موجود در `src/shared/services/supabaseService.ts` را در SQL Editor اجرا کنید
3. URL و Anon Key را در فایل env.ts قرار دهید

### 5. اضافه کردن فونت‌ها

فایل‌های فونت یکان‌باخ را در مسیر زیر قرار دهید:
```
assets/fonts/
├── YekanBakh-Thin.ttf
├── YekanBakh-Light.ttf
├── YekanBakh-Regular.ttf
├── YekanBakh-SemiBold.ttf
├── YekanBakh-Bold.ttf
├── YekanBakh-ExtraBold.ttf
└── YekanBakh-Black.ttf
```

### 6. اضافه کردن انیمیشن‌های Lottie

انیمیشن‌های JSON را در مسیر زیر قرار دهید:
```
assets/lottie/
├── clearday.json
├── clearnight.json
├── cloudy.json
├── cloudynight.json
├── rainy.json
├── snowy.json
├── thunder.json
└── foggy.json
```

### 7. اجرای برنامه

```bash
# برای iOS
npm run ios

# برای Android
npm run android

# برای Web
npm run web

# یا فقط شروع Expo
npm start
```

## ساختار پروژه

```
weather-mood-app/
├── app/                          # Expo Router screens
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Home (Weather screen)
│   └── admin.tsx                # Admin panel
├── src/
│   ├── features/                # Feature-based modules
│   │   ├── weather/
│   │   │   ├── components/     # WeatherDisplay, SituationCard
│   │   │   ├── hooks/          # useWeather, useSituation
│   │   │   ├── utils/          # weatherMapper, colorUtils
│   │   │   └── WeatherScreen.tsx
│   │   └── admin/
│   │       ├── components/     # Forms and Assignment Manager
│   │       ├── hooks/          # useAdmin
│   │       └── AdminScreen.tsx
│   └── shared/
│       ├── config/             # Environment configuration
│       ├── services/           # API services
│       ├── types/              # TypeScript types
│       └── utils/              # Shared utilities
├── assets/
│   ├── fonts/                  # Yekan Bakh fonts
│   ├── lottie/                 # Weather animations
│   └── images/                 # App icons
└── package.json
```

## نقشه داده‌ها

### جداول

**situations**
- شامل موقعیت‌های آب و هوایی با جمله فارسی

**music**
- شامل لیست موزیک‌ها با لینک اسپاتیفای

**clothing**
- شامل توضیحات لباس‌های پیشنهادی

**situation_music** (many-to-many)
- ارتباط بین موقعیت‌ها و موزیک‌ها

**situation_clothing** (many-to-many)
- ارتباط بین موقعیت‌ها و لباس‌ها

## نحوه استفاده

### برای کاربر عادی

1. اپلیکیشن به صورت خودکار موقعیت شما را شناسایی می‌کند
2. اطلاعات آب و هوا را دریافت می‌کند
3. بهترین موقعیت منطبق را پیدا می‌کند
4. جمله، موزیک و لباس مناسب را نمایش می‌دهد

### برای ادمین

1. روی آیکون منو در صفحه اصلی کلیک کنید
2. وارد پنل مدیریت شوید
3. موقعیت‌ها، موزیک‌ها و لباس‌ها را مدیریت کنید
4. موزیک و لباس را به موقعیت‌ها اختصاص دهید

## نقشه رنگی

| وضعیت | رنگ پس‌زمینه |
|-------|--------------|
| آفتابی | `#DCBA31` |
| بارانی | `#123285` |
| ابری | `#CDDADE` |
| برفی | `#91DBE4` |
| شب | `#000000` |
| مه‌آلود | `#CDDADE` |
| گرم | `#C92700` |

## دسته‌بندی داده‌های آب و هوا

اپلیکیشن داده‌های خام OpenWeather را به متغیرهای زیر تبدیل می‌کند:

- **weather**: sunny, cloudy, rainy, snowy, stormy, foggy
- **temperature**: cold (<10°C), mild (10-25°C), hot (>25°C)
- **humidity**: dry (<30%), normal (30-70%), humid (>70%)
- **wind**: calm (<10 km/h), breezy (10-30 km/h), windy (>30 km/h)
- **time_of_day**: morning (5-12), noon (12-17), evening (17-21), night (21-5)

## لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## توسعه‌دهنده

ساخته شده با ❤️ برای هواشناسی بهتر
