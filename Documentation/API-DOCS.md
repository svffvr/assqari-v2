# مستندات API

## نمای کلی

این اپلیکیشن از دو API اصلی استفاده می‌کند:

1. **OpenWeather API** - برای دریافت اطلاعات آب و هوا
2. **Supabase** - برای ذخیره و مدیریت داده‌ها

## OpenWeather API

### دریافت آب و هوای فعلی

**Endpoint:**
```
GET https://api.openweathermap.org/data/2.5/weather
```

**پارامترها:**
- `lat` (number) - عرض جغرافیایی
- `lon` (number) - طول جغرافیایی
- `appid` (string) - کلید API
- `units` (string) - واحد دما ('metric' برای سانتیگراد)
- `lang` (string) - زبان ('fa' برای فارسی)

**پاسخ نمونه:**
```json
{
  "main": {
    "temp": 25.5,
    "humidity": 60
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "آسمان صاف"
    }
  ],
  "wind": {
    "speed": 3.5
  },
  "name": "Tehran",
  "dt": 1234567890
}
```

### کدهای وضعیت آب و هوا

| کد | دسته | توضیح |
|----|------|-------|
| 200-232 | طوفان رعد و برق | Thunderstorm |
| 300-321 | نم‌نم باران | Drizzle |
| 500-531 | باران | Rain |
| 600-622 | برف | Snow |
| 701-781 | اتمسفر | Fog, Mist, etc. |
| 800 | آسمان صاف | Clear |
| 801-804 | ابری | Clouds |

## Supabase API

### Situations (موقعیت‌ها)

#### دریافت تمام موقعیت‌ها
```typescript
const { data, error } = await supabase
  .from('situations')
  .select(`
    *,
    music:situation_music(music(*)),
    clothing:situation_clothing(clothing(*))
  `)
  .order('created_at', { ascending: false });
```

#### ایجاد موقعیت جدید
```typescript
const { data, error } = await supabase
  .from('situations')
  .insert([{
    weather: 'sunny',
    temperature: 'hot',
    time_of_day: 'noon',
    sentence_fa: 'امروز آفتابی است'
  }])
  .select()
  .single();
```

#### ویرایش موقعیت
```typescript
const { error } = await supabase
  .from('situations')
  .update({ sentence_fa: 'جمله جدید' })
  .eq('id', situationId);
```

#### حذف موقعیت
```typescript
const { error } = await supabase
  .from('situations')
  .delete()
  .eq('id', situationId);
```

### Music (موزیک‌ها)

#### دریافت تمام موزیک‌ها
```typescript
const { data, error } = await supabase
  .from('music')
  .select('*')
  .order('created_at', { ascending: false });
```

#### ایجاد موزیک جدید
```typescript
const { data, error } = await supabase
  .from('music')
  .insert([{
    title: 'عنوان',
    artist: 'هنرمند',
    spotify_link: 'https://open.spotify.com/...'
  }])
  .select()
  .single();
```

### Clothing (لباس‌ها)

#### دریافت تمام لباس‌ها
```typescript
const { data, error } = await supabase
  .from('clothing')
  .select('*')
  .order('created_at', { ascending: false });
```

#### ایجاد لباس جدید
```typescript
const { data, error } = await supabase
  .from('clothing')
  .insert([{
    description_fa: 'توضیحات لباس'
  }])
  .select()
  .single();
```

### Assignments (اختصاص‌ها)

#### اختصاص موزیک به موقعیت
```typescript
const { error } = await supabase
  .from('situation_music')
  .insert([{
    situation_id: 'uuid-situation',
    music_id: 'uuid-music'
  }]);
```

#### حذف اختصاص موزیک
```typescript
const { error } = await supabase
  .from('situation_music')
  .delete()
  .eq('situation_id', situationId)
  .eq('music_id', musicId);
```

#### اختصاص لباس به موقعیت
```typescript
const { error } = await supabase
  .from('situation_clothing')
  .insert([{
    situation_id: 'uuid-situation',
    clothing_id: 'uuid-clothing'
  }]);
```

## الگوریتم انطباق موقعیت

```typescript
// نمره‌دهی به موقعیت‌ها بر اساس تطابق
function scoreSituation(situation, weather) {
  let score = 0;
  
  // تطابق کامل = امتیاز بیشتر
  if (situation.weather === weather.weather) score += 5;
  if (situation.temperature === weather.temperature) score += 3;
  if (situation.time_of_day === weather.time_of_day) score += 2;
  if (situation.humidity === weather.humidity) score += 1;
  if (situation.wind === weather.wind) score += 1;
  
  return score;
}

// انتخاب بهترین تطابق
const bestMatch = situations
  .map(s => ({ ...s, score: scoreSituation(s, weather) }))
  .sort((a, b) => b.score - a.score)[0];
```

## محدودیت‌ها و نکات

### OpenWeather API
- **Plan رایگان**: 60 درخواست در دقیقه
- **تاخیر داده‌ها**: حدود 10 دقیقه
- **دقت مکانی**: 2.5 کیلومتر

### Supabase
- **Plan رایگان**: 500MB دیتابیس، 1GB پهنای باند
- **RLS**: فعال‌سازی Row Level Security برای امنیت
- **Realtime**: می‌توان برای آپدیت لحظه‌ای استفاده کرد

## نمونه کد کامل

### دریافت و نمایش آب و هوا

```typescript
// 1. دریافت موقعیت مکانی
const location = await Location.getCurrentPositionAsync();

// 2. دریافت آب و هوا از OpenWeather
const weather = await openWeatherService.getCurrentWeather(
  location.coords.latitude,
  location.coords.longitude
);

// 3. دسته‌بندی داده‌ها
const categorized = weatherMapper.categorizeWeather(weather);

// 4. جستجوی موقعیت منطبق
const situations = await supabase
  .from('situations')
  .select('*')
  .or(`weather.eq.${categorized.weather},weather.is.null`)
  .or(`temperature.eq.${categorized.temperature},temperature.is.null`);

// 5. انتخاب بهترین تطابق
const bestMatch = findBestMatch(situations.data, categorized);

// 6. نمایش به کاربر
console.log(bestMatch.sentence_fa);
```

## خطاها و رفع مشکل

### خطای Authentication
```
Error: Invalid API key
```
**راه حل**: کلید API را در env.ts بررسی کنید

### خطای Location Permission
```
Error: Location permission denied
```
**راه حل**: مجوز دسترسی به موقعیت مکانی را بدهید

### خطای Network
```
Error: Network request failed
```
**راه حل**: اتصال اینترنت را بررسی کنید

### خطای Database
```
Error: relation "situations" does not exist
```
**راه حل**: جداول را در Supabase ایجاد کنید
