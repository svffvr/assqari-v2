import { useState, useEffect } from 'react';
import { supabase } from '../../../shared/services/supabaseService';
import { Situation, CategorizedWeather } from '../../../shared/types';

export const useSituation = (weather: CategorizedWeather | null) => {
  const [situation, setSituation] = useState<Situation | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (weather) {
      findMatchingSituation(weather);
    }
  }, [weather]);

  const findMatchingSituation = async (categorized: CategorizedWeather) => {
    try {
      setLoading(true);

      // Build query with flexible matching
      let query = supabase
        .from('situations')
        .select(`
          *,
          music:situation_music(music(*)),
          clothing:situation_clothing(clothing(*))
        `);

      // Add filters - null means "matches any"
      if (categorized.weather) {
        query = query.or(`weather.eq.${categorized.weather},weather.is.null`);
      }
      if (categorized.temperature) {
        query = query.or(`temperature.eq.${categorized.temperature},temperature.is.null`);
      }
      if (categorized.humidity) {
        query = query.or(`humidity.eq.${categorized.humidity},humidity.is.null`);
      }
      if (categorized.wind) {
        query = query.or(`wind.eq.${categorized.wind},wind.is.null`);
      }
      if (categorized.time_of_day) {
        query = query.or(`time_of_day.eq.${categorized.time_of_day},time_of_day.is.null`);
      }

      const { data, error } = await query.limit(20);

      if (error) {
        console.error('Error fetching situation:', error);
        return;
      }

      if (data && data.length > 0) {
        console.log(`📝 Found ${data.length} matching situations from database`);
        
        // Score each situation based on matching criteria
        const scoredSituations = data.map((sit: any) => {
          let score = 0;
          
          if (sit.weather === categorized.weather) score += 5;
          if (sit.temperature === categorized.temperature) score += 3;
          if (sit.time_of_day === categorized.time_of_day) score += 2;
          if (sit.humidity === categorized.humidity) score += 1;
          if (sit.wind === categorized.wind) score += 1;
          
          return { ...sit, score };
        });

        // Sort by score
        scoredSituations.sort((a, b) => b.score - a.score);
        
        console.log('🏆 Scored Situations:');
        scoredSituations.forEach((s, i) => {
          console.log(`  ${i + 1}. [Score: ${s.score}] ${s.sentence_fa}`);
        });
        
        // Get all situations with the highest score
        const highestScore = scoredSituations[0].score;
        const topMatches = scoredSituations.filter(s => s.score === highestScore);
        
        console.log(`✨ Top ${topMatches.length} match(es) with score ${highestScore}:`);
        topMatches.forEach((s, i) => {
          console.log(`  ${i + 1}. ${s.sentence_fa}`);
        });
        
        // Randomly select one from the top matches
        const randomIndex = Math.floor(Math.random() * topMatches.length);
        const selectedMatch = topMatches[randomIndex];
        
        console.log(`🎯 Selected (random): "${selectedMatch.sentence_fa}"`);
        
        // Transform the nested data structure
        const transformedSituation: Situation = {
          ...selectedMatch,
          music: selectedMatch.music?.map((sm: any) => sm.music).filter(Boolean) || [],
          clothing: selectedMatch.clothing?.map((sc: any) => sc.clothing).filter(Boolean) || [],
        };

        setSituation(transformedSituation);
      } else {
        // No match found - could set a default situation
        setSituation(null);
      }
    } catch (err) {
      console.error('Error finding situation:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    situation,
    loading,
    refetch: () => weather && findMatchingSituation(weather),
  };
};