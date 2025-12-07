// Categorized weather variables
export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy';
export type Temperature = 'cold' | 'mild' | 'hot';
export type Humidity = 'dry' | 'normal' | 'humid';
export type Wind = 'calm' | 'breezy' | 'windy';
export type TimeOfDay = 'morning' | 'noon' | 'evening' | 'night';
export type Mood = 'happy' | 'sad' | 'energetic' | 'calm' | 'romantic' | null;

export interface CategorizedWeather {
  weather: WeatherCondition;
  temperature: Temperature;
  humidity: Humidity;
  wind: Wind;
  time_of_day: TimeOfDay;
  mood: Mood;
  city: string;
  temp_celsius: number;
  raw_humidity: number;
  raw_wind_speed: number;
}

export interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
  dt: number;
}

export interface Situation {
  id: string;
  weather: WeatherCondition | null;
  temperature: Temperature | null;
  humidity: Humidity | null;
  wind: Wind | null;
  time_of_day: TimeOfDay | null;
  mood: Mood;
  city: string | null;
  sentence_fa: string;
  created_at: string;
  music?: Music[];
  clothing?: Clothing[];
}

export interface Music {
  id: string;
  title: string;
  artist: string;
  spotify_link: string;
  created_at: string;
  cover_url?: string;
}

export interface Clothing {
  id: string;
  description_fa: string;
  english_phrase?: string;
  created_at: string;
}

export interface SituationMusic {
  situation_id: string;
  music_id: string;
}

export interface SituationClothing {
  situation_id: string;
  clothing_id: string;
}

export interface BackgroundColor {
  primary: string;
  text: string;
  textSpecial: string;
}
