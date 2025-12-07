# راهنمای شروع سریع

## نصب در 5 دقیقه

### 1. نصب وابستگی‌ها
```bash
cd weather-mood-app
npm install
```

### 2. تنظیم کلیدها

فایل `src/shared/config/env.ts` را ویرایش کنید:

```typescript
export const config = {
  openWeatherApiKey: 'YOUR_KEY_HERE',
  supabase: {
    url: 'YOUR_SUPABASE_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY',
  },
};
```

### 3. راه‌اندازی دیتابیس

در Supabase SQL Editor کد زیر را اجرا کنید:

```sql
-- کد SQL موجود در src/shared/services/supabaseService.ts
```

### 4. اضافه کردن فونت‌ها

فونت‌های یکان‌باخ را در `assets/fonts/` قرار دهید.

### 5. اضافه کردن انیمیشن‌ها

انیمیشن‌های Lottie را در `assets/lottie/` قرار دهید.

### 6. اجرا

```bash
npm start
```

## نیاز به کمک؟

- 📖 [راهنمای کامل راه‌اندازی](SETUP-GUIDE.md)
- 📚 [مستندات API](API-DOCS.md)
- ✅ [چک‌لیست استقرار](DEPLOYMENT-CHECKLIST.md)

## دریافت کلیدهای API

### OpenWeather (رایگان)
1. ثبت‌نام در https://openweathermap.org
2. API key خود را از داشبورد دریافت کنید

### Supabase (رایگان)
1. ثبت‌نام در https://supabase.com
2. پروژه جدید ایجاد کنید
3. از Settings > API، کلیدها را کپی کنید

## دانلود فونت‌ها

فونت یکان‌باخ را از منابع زیر دانلود کنید:
- https://github.com/rastikerdar/yekan-bakh-font
- یا از سایت‌های فونت فارسی

## دانلود انیمیشن‌ها

از LottieFiles:
- https://lottiefiles.com/search?q=weather&category=animations

جستجوی پیشنهادی:
- "sunny weather"
- "rainy weather"
- "cloudy weather"
- "snowy weather"
- "thunder storm"
- "fog mist"

---

**نکته**: برای تست سریع، می‌توانید از انیمیشن‌های موجود در پروژه استفاده کنید (اگر قبلاً دانلود شده باشند).
