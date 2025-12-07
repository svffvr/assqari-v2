import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env';

export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey
);

// Database initialization SQL (run this in Supabase SQL editor)
/*
-- Create situations table
CREATE TABLE situations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  weather TEXT CHECK (weather IN ('sunny', 'cloudy', 'rainy', 'snowy', 'stormy', 'foggy')),
  temperature TEXT CHECK (temperature IN ('cold', 'mild', 'hot')),
  humidity TEXT CHECK (humidity IN ('dry', 'normal', 'humid')),
  wind TEXT CHECK (wind IN ('calm', 'breezy', 'windy')),
  time_of_day TEXT CHECK (time_of_day IN ('morning', 'noon', 'evening', 'night')),
  mood TEXT CHECK (mood IN ('happy', 'sad', 'energetic', 'calm', 'romantic')),
  city TEXT,
  sentence_fa TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create music table
CREATE TABLE music (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  spotify_link TEXT NOT NULL,
  cover_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clothing table
CREATE TABLE clothing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  description_fa TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create situation_music junction table
CREATE TABLE situation_music (
  situation_id UUID REFERENCES situations(id) ON DELETE CASCADE,
  music_id UUID REFERENCES music(id) ON DELETE CASCADE,
  PRIMARY KEY (situation_id, music_id)
);

-- Create situation_clothing junction table
CREATE TABLE situation_clothing (
  situation_id UUID REFERENCES situations(id) ON DELETE CASCADE,
  clothing_id UUID REFERENCES clothing(id) ON DELETE CASCADE,
  PRIMARY KEY (situation_id, clothing_id)
);

-- Create indexes
CREATE INDEX idx_situations_weather ON situations(weather);
CREATE INDEX idx_situations_temperature ON situations(temperature);
CREATE INDEX idx_situations_time_of_day ON situations(time_of_day);
CREATE INDEX idx_situation_music_situation ON situation_music(situation_id);
CREATE INDEX idx_situation_clothing_situation ON situation_clothing(situation_id);
*/
