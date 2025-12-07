import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { CoatHanger, Ear } from 'phosphor-react-native';
import { Situation, BackgroundColor } from '../../../shared/types';

interface SituationCardProps {
  situation: Situation | null;
  colors: BackgroundColor;
}

export const SituationCard: React.FC<SituationCardProps> = ({ situation, colors }) => {
  if (!situation) {
    return (
      <View style={styles.container}>
        <Text style={[styles.noDataText, { color: colors.text }]}>
          موردی یافت نشد
        </Text>
      </View>
    );
  }

  const getStyledSentence = () => {
    const words = situation.sentence_fa.split(' ');
    
    return (
      <View style={styles.sentenceContainer}>
        {words.map((word, index) => {
          const isSpecial = index === words.length - 1;
          
          return (
            <Text
              key={index}
              style={[
                styles.sentenceWord,
                {
                  color: isSpecial ? colors.textSpecial : colors.text,
                  fontFamily: 'YekanBakh-Bold',
                }
              ]}
            >
              {word}{index < words.length - 1 ? ' ' : ''}
            </Text>
          );
        })}
      </View>
    );
  };

  const primaryMusic = situation.music?.[0];
  const primaryClothing = situation.clothing?.[0];

  const handlePinterestSearch = () => {
    if (primaryClothing?.english_phrase) {
      const searchQuery = encodeURIComponent(primaryClothing.english_phrase);
      const pinterestUrl = `https://www.pinterest.com/search/pins/?q=${searchQuery}`;
      Linking.openURL(pinterestUrl);
    } else {
      // Fallback: search with Persian text (won't work well but better than nothing)
      const searchQuery = encodeURIComponent(primaryClothing?.description_fa || 'fashion outfit');
      const pinterestUrl = `https://www.pinterest.com/search/pins/?q=${searchQuery}`;
      Linking.openURL(pinterestUrl);
    }
  };

  return (
    <View style={styles.container}>
      {/* Weather Sentence */}
      {getStyledSentence()}
      
      <Text style={[styles.infoText, { color: colors.text }]}>
        برای اطلاعات بیشتر می‌توانی بیرون رو نگاه کنی.
      </Text>

      

      {/* Music Panel */}
      {primaryMusic && (
        <View style={styles.glassPanel}>
          <View style={styles.panelTitleRow}>
            <Text style={[styles.panelTitle, { color: colors.text }]}>
              موزیک روز
            </Text>
            <Ear size={32} color={colors.text} weight="regular" />
          </View>

          <TouchableOpacity
            style={styles.musicItem}
            onPress={() => Linking.openURL(primaryMusic.spotify_link)}
          >
            <View style={styles.musicCover}>
              {primaryMusic.cover_url ? (
                <Image
                  source={{ uri: primaryMusic.cover_url }}
                  style={styles.coverImage}
                />
              ) : (
                <Text style={styles.musicPlaceholder}>🎵</Text>
              )}
            </View>
            
            <View style={styles.musicInfo}>
              <Text style={[styles.musicTitle, { color: colors.text }]}>
                {primaryMusic.title}
              </Text>
              <View style={styles.artistRow}>
                <Text style={[styles.byText, { color: colors.text }]}>
                  از
                </Text>
                <Text style={[styles.artistName, { color: colors.text }]}>
                  {' '}{primaryMusic.artist}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Clothing Panel */}
      {primaryClothing && (
        <View style={styles.glassPanel}>
          <View style={styles.panelTitleRow}>
            <Text style={[styles.panelTitle, { color: colors.text }]}>
              لباس روز
            </Text>
            <CoatHanger size={32} color={colors.text} weight="regular" />
          </View>
          <Text style={[styles.panelText, { color: colors.text }]}>
            {primaryClothing.description_fa}
          </Text>
          
          {/* Pinterest Button */}
          {primaryClothing.english_phrase && (
            <TouchableOpacity
              style={[styles.pinterestButton, { borderColor: colors.text }]}
              onPress={handlePinterestSearch}
            >
              <Text style={[styles.pinterestButtonText, { color: colors.text }]}>
               جستجو در پینترست
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noDataText: {
    fontSize: 18,
    fontFamily: 'YekanBakh-Regular',
    textAlign: 'center',
    marginTop: 40,
  },
  sentenceContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  sentenceWord: {
    fontSize: 24,
    textAlign: 'right',
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'YekanBakh-Regular',
    opacity: 0.7,
    marginBottom: 24,
    textAlign: 'right',
  },
  glassPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  panelTitleRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  panelTitle: {
    fontSize: 16,
    fontFamily: 'YekanBakh-ExtraBold',
  },
  panelText: {
    fontSize: 14,
    fontFamily: 'YekanBakh-Regular',
    lineHeight: 22,
    textAlign: 'right',
    marginBottom: 12,
  },
  pinterestButton: {
    // borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#fff',
  },
  pinterestButtonText: {
    fontSize: 14,
    fontFamily: 'YekanBakh-Bold',
    color: '#000',
  },
  musicItem: {
    flexDirection: 'row-reverse',
    gap: 10,
  },
  musicCover: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  musicPlaceholder: {
    fontSize: 28,
  },
  musicInfo: {
    flex: 1,
    gap: 8,
    alignItems: 'flex-end',
  },
  musicTitle: {
    fontSize: 14,
    fontFamily: 'YekanBakh-ExtraBold',
    marginTop: 4,
    textAlign: 'right',
  },
  artistRow: {
    flexDirection: 'row-reverse',
    gap: 4,
  },
  byText: {
    fontSize: 12,
    fontFamily: 'YekanBakh-Regular',
    opacity: 0.7,
  },
  artistName: {
    fontSize: 12,
    fontFamily: 'YekanBakh-ExtraBold',
  },
});