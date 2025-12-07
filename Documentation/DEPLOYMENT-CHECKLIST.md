# چک‌لیست راه‌اندازی و استقرار

## قبل از شروع

- [ ] Node.js نسخه 18 یا بالاتر نصب شده
- [ ] Expo CLI نصب شده (`npm install -g expo-cli`)
- [ ] حساب OpenWeather API دارید
- [ ] حساب Supabase دارید
- [ ] Git نصب شده (اختیاری)

## مرحله 1: تنظیمات اولیه

- [ ] پروژه را دانلود یا کلون کردید
- [ ] `npm install` را اجرا کردید
- [ ] کلید OpenWeather API را دریافت کردید
- [ ] پروژه Supabase را ایجاد کردید
- [ ] فایل `src/shared/config/env.ts` را با کلیدهای خود پر کردید

## مرحله 2: دیتابیس

- [ ] SQL موجود در `supabaseService.ts` را در SQL Editor اجرا کردید
- [ ] جداول ایجاد شدند (situations, music, clothing, ...)
- [ ] داده‌های نمونه را اضافه کردید (اختیاری)
- [ ] RLS Policies را بررسی کردید

## مرحله 3: فونت‌ها و Asset‌ها

- [ ] فونت یکان‌باخ را دانلود کردید
- [ ] تمام وزن‌های فونت را در `assets/fonts/` قرار دادید
  - [ ] YekanBakh-Thin.ttf
  - [ ] YekanBakh-Light.ttf
  - [ ] YekanBakh-Regular.ttf
  - [ ] YekanBakh-SemiBold.ttf
  - [ ] YekanBakh-Bold.ttf
  - [ ] YekanBakh-ExtraBold.ttf
  - [ ] YekanBakh-Black.ttf

## مرحله 4: انیمیشن‌های Lottie

- [ ] انیمیشن‌های آب و هوا را دانلود کردید
- [ ] فایل‌های JSON را در `assets/lottie/` قرار دادید
  - [ ] clearday.json
  - [ ] clearnight.json
  - [ ] cloudy.json
  - [ ] cloudynight.json
  - [ ] rainy.json
  - [ ] snowy.json
  - [ ] thunder.json
  - [ ] foggy.json

## مرحله 5: تست

- [ ] `npm start` را اجرا کردید
- [ ] اپلیکیشن بدون خطا اجرا شد
- [ ] مجوز موقعیت مکانی را دادید
- [ ] اطلاعات آب و هوا نمایش داده شد
- [ ] جمله فارسی نمایش داده شد
- [ ] پنل مدیریت کار می‌کند
- [ ] موزیک و لباس نمایش داده می‌شود

## مرحله 6: پیکربندی تولید

- [ ] آیکون اپلیکیشن را در `assets/icon.png` قرار دادید
- [ ] Splash screen را در `assets/splash.png` قرار دادید
- [ ] فایل `app.json` را بررسی کردید
- [ ] Bundle Identifier/Package name را تنظیم کردید

## مرحله 7: ساخت (Build)

### برای iOS
- [ ] حساب Apple Developer دارید
- [ ] `eas build --platform ios` را اجرا کنید
- [ ] فایل IPA را دانلود کنید
- [ ] در TestFlight آپلود کنید

### برای Android
- [ ] Keystore ایجاد کردید
- [ ] `eas build --platform android` را اجرا کنید
- [ ] فایل APK/AAB را دانلود کنید
- [ ] در Google Play Console آپلود کنید

## مرحله 8: انتشار

- [ ] اپلیکیشن را تست کامل کردید
- [ ] اسکرین‌شات‌ها را آماده کردید
- [ ] توضیحات را نوشتید
- [ ] Privacy Policy را آماده کردید
- [ ] Terms of Service را آماده کردید
- [ ] در استور منتشر کردید

## نکات امنیتی

- [ ] کلیدهای API را در کد قرار ندادید
- [ ] `.env` را به `.gitignore` اضافه کردید
- [ ] RLS را در Supabase فعال کردید
- [ ] HTTPS را برای تمام درخواست‌ها استفاده می‌کنید

## بهینه‌سازی

- [ ] تصاویر را فشرده کردید
- [ ] انیمیشن‌ها را بهینه کردید
- [ ] Bundle size را کاهش دادید
- [ ] Performance را تست کردید

## پشتیبانی و نگهداری

- [ ] سیستم لاگ را راه‌اندازی کردید
- [ ] Error tracking (مثل Sentry) را اضافه کردید
- [ ] Analytics را پیاده‌سازی کردید
- [ ] سیستم بازخورد کاربران را ایجاد کردید

## منابع اضافی

- README.md - راهنمای کلی پروژه
- SETUP-GUIDE.md - راهنمای راه‌اندازی قدم به قدم
- API-DOCS.md - مستندات API
- database-sample-data.sql - داده‌های نمونه

---

**تاریخ آخرین بروزرسانی**: 2024
**نسخه**: 1.0.0
