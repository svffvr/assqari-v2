# راهنمای راه‌اندازی کامل

## مرحله ۱: دریافت کلیدهای API

### OpenWeather API
1. به سایت https://openweathermap.org بروید
2. ثبت‌نام کنید یا وارد شوید
3. به بخش API Keys بروید
4. کلید API خود را کپی کنید

### Supabase
1. به سایت https://supabase.com بروید
2. پروژه جدید ایجاد کنید
3. از منوی تنظیمات، به بخش API بروید
4. `URL` و `anon public` key را کپی کنید

## مرحله ۲: تنظیم پروژه

1. فایل `src/shared/config/env.ts` را باز کنید
2. کلیدهای خود را جایگزین کنید:

```typescript
export const config = {
  openWeatherApiKey: 'کلید-openweather-خود',
  supabase: {
    url: 'url-supabase-خود',
    anonKey: 'anon-key-supabase-خود',
  },
};
```

## مرحله ۳: ایجاد جداول در Supabase

1. در داشبورد Supabase، به SQL Editor بروید
2. کد SQL موجود در `src/shared/services/supabaseService.ts` را کپی کنید
3. در SQL Editor اجرا کنید
4. جداول ایجاد خواهند شد

## مرحله ۴: اضافه کردن فونت‌ها

1. فونت یکان‌باخ را دانلود کنید
2. فایل‌های TTF را در پوشه `assets/fonts/` قرار دهید
3. مطمئن شوید تمام وزن‌ها موجود هستند:
   - YekanBakh-Thin.ttf
   - YekanBakh-Light.ttf
   - YekanBakh-Regular.ttf
   - YekanBakh-SemiBold.ttf
   - YekanBakh-Bold.ttf
   - YekanBakh-ExtraBold.ttf
   - YekanBakh-Black.ttf

## مرحله ۵: اضافه کردن انیمیشن‌های Lottie

1. از سایت https://lottiefiles.com انیمیشن‌های آب و هوا را دانلود کنید
2. فایل‌های JSON را در پوشه `assets/lottie/` قرار دهید
3. انیمیشن‌های مورد نیاز:
   - clearday.json - آفتابی روز
   - clearnight.json - آسمان صاف شب
   - cloudy.json - ابری
   - cloudynight.json - ابری شب
   - rainy.json - بارانی
   - snowy.json - برفی
   - thunder.json - طوفانی
   - foggy.json - مه‌آلود

## مرحله ۶: اضافه کردن داده‌های نمونه

1. فایل `database-sample-data.sql` را باز کنید
2. در SQL Editor سوپابیس اجرا کنید
3. داده‌های نمونه اضافه می‌شوند

## مرحله ۷: نصب وابستگی‌ها

```bash
npm install
```

## مرحله ۸: اجرای برنامه

```bash
# شروع Expo
npm start

# یا برای iOS
npm run ios

# یا برای Android
npm run android
```

## نکات مهم

### مجوزهای مورد نیاز
- اپلیکیشن نیاز به دسترسی به موقعیت مکانی دارد
- در اولین بار باید مجوز را بدهید

### تست در دستگاه واقعی
- برای تست بهتر، از دستگاه واقعی استفاده کنید
- Expo Go را از استور نصب کنید
- QR Code را اسکن کنید

### مشکلات رایج

**خطای فونت:**
- مطمئن شوید تمام فایل‌های فونت در مسیر صحیح هستند
- نام فایل‌ها باید دقیقاً مطابق باشد

**خطای API:**
- کلیدهای API را چک کنید
- مطمئن شوید اتصال اینترنت دارید
- در OpenWeather، Plan رایگان محدودیت دارد (60 درخواست در دقیقه)

**خطای دیتابیس:**
- RLS (Row Level Security) را در Supabase بررسی کنید
- ممکن است نیاز باشد Policy‌ها را تنظیم کنید

## کار با پنل ادمین

1. در صفحه اصلی، روی آیکون منو کلیک کنید
2. وارد پنل مدیریت شوید
3. تب موقعیت‌ها را باز کنید
4. روی + کلیک کنید تا موقعیت جدید اضافه کنید
5. موزیک و لباس را به موقعیت‌ها اختصاص دهید

## پشتیبانی

در صورت بروز مشکل:
1. لاگ‌های کنسول را بررسی کنید
2. مطمئن شوید تمام وابستگی‌ها نصب شده‌اند
3. نسخه Node.js را چک کنید (باید 18 یا بالاتر باشد)
