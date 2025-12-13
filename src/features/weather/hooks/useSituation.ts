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

      // Build a single OR condition that matches all criteria
      const conditions = [];
      
      // Each condition checks if the field matches OR is null
      if (categorized.weather) {
        conditions.push(`and(weather.eq.${categorized.weather})`);
        conditions.push(`weather.is.null`);
      }
      if (categorized.temperature) {
        conditions.push(`and(temperature.eq.${categorized.temperature})`);
        conditions.push(`temperature.is.null`);
      }
      if (categorized.humidity) {
        conditions.push(`and(humidity.eq.${categorized.humidity})`);
        conditions.push(`humidity.is.null`);
      }
      if (categorized.wind) {
        conditions.push(`and(wind.eq.${categorized.wind})`);
        conditions.push(`wind.is.null`);
      }
      if (categorized.time_of_day) {
        conditions.push(`and(time_of_day.eq.${categorized.time_of_day})`);
        conditions.push(`time_of_day.is.null`);
      }

      // Single query with all filters
      const { data, error } = await supabase
        .from('situations')
        .select(`
          *,
          music:situation_music(music(*)),
          clothing:situation_clothing(clothing(*))
        `)
        .or(conditions.join(','))
        .limit(20);

      if (error) {
        console.error('Error fetching situation:', error);
        return;
      }

      if (data && data.length > 0) {
        console.log(`📝 Found ${data.length} matching situations from database`);
        
        // Score each situation based on matching criteria
        const scoredSituations = data.map((sit: any) => {
          let score = 0;
          let matchDetails: string[] = [];
          
          if (sit.weather === categorized.weather) {
            score += 5;
            matchDetails.push('weather');
          }
          if (sit.temperature === categorized.temperature) {
            score += 3;
            matchDetails.push('temperature');
          }
          if (sit.time_of_day === categorized.time_of_day) {
            score += 2;
            matchDetails.push('time_of_day');
          }
          if (sit.humidity === categorized.humidity) {
            score += 1;
            matchDetails.push('humidity');
          }
          if (sit.wind === categorized.wind) {
            score += 1;
            matchDetails.push('wind');
          }
          
          return { ...sit, score, matchDetails };
        });

        // Sort by score
        scoredSituations.sort((a, b) => b.score - a.score);
        
        console.log('🏆 Scored Situations:');
        scoredSituations.forEach((s, i) => {
          console.log(`  ${i + 1}. [Score: ${s.score}] (${s.matchDetails.join(', ')}) ${s.sentence_fa}`);
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
        console.log('❌ No matching situations found');
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