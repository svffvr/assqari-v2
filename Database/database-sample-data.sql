-- Sample Data for Weather Mood App
-- Run this in Supabase SQL Editor after creating the tables

-- Insert sample music
INSERT INTO music (title, artist, spotify_link) VALUES
('پلی‌لیست آرامش', 'اسپاتیفای', 'https://open.spotify.com/playlist/37i9dQZF1DWXe9gFZP0gtP'),
('موزیک شاد', 'اسپاتیفای', 'https://open.spotify.com/playlist/37i9dQZF1DX0UrRvztWcAU'),
('موزیک انرژی‌بخش', 'اسپاتیفای', 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP'),
('جاز برای روزهای بارانی', 'اسپاتیفای', 'https://open.spotify.com/playlist/37i9dQZF1DWV7EzJMK2FUI');

-- Insert sample clothing
INSERT INTO clothing (description_fa) VALUES
('یک کت ضخیم، شال گردن و کلاه. هوا سرده!'),
('یک ژاکت نازک یا پلیور روی تیشرت'),
('لباس‌های راحت و سبک. تیشرت و شلوار نازک'),
('بارانی و چتر رو فراموش نکن'),
('لباس‌های گرم زمستانی و بوت'),
('لباس‌های نخی و کلاه آفتابی');

-- Insert sample situations
WITH inserted_situation_1 AS (
  INSERT INTO situations (weather, temperature, time_of_day, sentence_fa)
  VALUES ('sunny', 'hot', 'noon', 'امروز آفتابی و گرم است. لذت ببر!')
  RETURNING id
),
inserted_situation_2 AS (
  INSERT INTO situations (weather, temperature, time_of_day, sentence_fa)
  VALUES ('rainy', 'cold', null, 'هوا بارونی و سرده. گرم بپوش!')
  RETURNING id
),
inserted_situation_3 AS (
  INSERT INTO situations (weather, temperature, time_of_day, sentence_fa)
  VALUES ('snowy', 'cold', null, 'برف می‌باره! زمستون زیباست')
  RETURNING id
),
inserted_situation_4 AS (
  INSERT INTO situations (weather, temperature, time_of_day, sentence_fa)
  VALUES ('cloudy', 'mild', null, 'هوا ابری و معتدله. روز آرومی داشته باش')
  RETURNING id
),
inserted_situation_5 AS (
  INSERT INTO situations (weather, temperature, null, sentence_fa)
  VALUES ('sunny', 'mild', 'morning', 'صبح آفتابی و دلپذیر. شروع خوبی برای روز')
  RETURNING id
),
inserted_situation_6 AS (
  INSERT INTO situations (weather, null, time_of_day, sentence_fa)
  VALUES (null, null, 'night', 'شب آرومی داشته باش. استراحت کن')
  RETURNING id
)
SELECT * FROM inserted_situation_1
UNION ALL SELECT * FROM inserted_situation_2
UNION ALL SELECT * FROM inserted_situation_3
UNION ALL SELECT * FROM inserted_situation_4
UNION ALL SELECT * FROM inserted_situation_5
UNION ALL SELECT * FROM inserted_situation_6;

-- Note: To assign music and clothing to situations, you'll need to:
-- 1. Get the IDs from the tables
-- 2. Use the admin panel in the app to make assignments
-- OR run manual INSERT statements like:
-- INSERT INTO situation_music (situation_id, music_id) 
-- VALUES ('situation-uuid-here', 'music-uuid-here');
