import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { X, ShareNetwork } from 'phosphor-react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useWeather } from './hooks/useWeather';
import { useSituation } from './hooks/useSituation';
import { colorUtils } from './utils/colorUtils';
import { WeatherDisplay } from './components/WeatherDisplay';
import { SituationCard } from './components/SituationCard';

// Simple admin credentials (change these!)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '1234';

export default function WeatherScreen() {
  const router = useRouter();
  const { weather, loading: weatherLoading, error, refetch } = useWeather();
  const { situation, loading: situationLoading } = useSituation(weather);
  const [refreshing, setRefreshing] = useState(false);
  const shareViewRef = useRef<View>(null);
  
  // Admin auth state
  const [tapCount, setTapCount] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleSentenceTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    
    if (newCount >= 7) {
      setShowAuthModal(true);
      setTapCount(0);
    }
    
    setTimeout(() => {
      setTapCount(0);
    }, 2000);
  };

  const handleAdminLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setShowAuthModal(false);
      setUsername('');
      setPassword('');
      setAuthError('');
      router.push('/admin');
    } else {
      setAuthError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
    setUsername('');
    setPassword('');
    setAuthError('');
  };

  const handleShare = async () => {
    try {
      if (shareViewRef.current) {
        const uri = await captureRef(shareViewRef, {
          format: 'png',
          quality: 1,
          width: 1080,
          height: 1920,
        });

        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(uri);
        } else {
          alert('اشتراک‌گذاری در این دستگاه پشتیبانی نمی‌شود');
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('خطا در اشتراک‌گذاری');
    }
  };

  if (weatherLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#123285" />
        <Text style={styles.loadingText}>در حال بارگذاری...</Text>
      </View>
    );
  }

  if (error || !weather) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>
          {error || 'خطا در دریافت اطلاعات'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>تلاش مجدد</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const colors = colorUtils.getBackgroundColor(
    weather.weather,
    weather.time_of_day,
    weather.temp_celsius
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text}
          />
        }
      >
        <View style={styles.contentContainer}>
          {/* Header with Share Button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleShare}>
              <ShareNetwork size={24} color={colors.text} weight="bold" />
            </TouchableOpacity>
          </View>

          {/* Shareable View */}
          <View 
            ref={shareViewRef}
            collapsable={false}
            style={[styles.shareableView, { backgroundColor: colors.primary }]}
          >
            <WeatherDisplay weather={weather} colors={colors} />

            <TouchableOpacity 
              activeOpacity={1} 
              onPress={handleSentenceTap}
            >
              {situationLoading ? (
                <ActivityIndicator size="small" color={colors.text} />
              ) : (
                <SituationCard situation={situation} colors={colors} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* Admin Auth Modal */}
      <Modal
        visible={showAuthModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseAuth}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleCloseAuth}>
                <X size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>ورود به پنل مدیریت</Text>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.label}>نام کاربری</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="نام کاربری را وارد کنید"
                textAlign="right"
                autoCapitalize="none"
              />

              <Text style={styles.label}>رمز عبور</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="رمز عبور را وارد کنید"
                textAlign="right"
                secureTextEntry
              />

              {authError ? (
                <Text style={styles.errorMessage}>{authError}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleAdminLogin}
              >
                <Text style={styles.loginButtonText}>ورود</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    // padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 40,
    paddingRight: 20,
  },
  shareableView: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'YekanBakh-Regular',
    color: '#6b7280',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'YekanBakh-Regular',
    color: '#ef4444',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#123285',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    fontFamily: 'YekanBakh-Bold',
    color: '#fff',
    fontSize: 16,
  },
  bottomSpacer: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'YekanBakh-Bold',
  },
  modalBody: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'YekanBakh-SemiBold',
    marginBottom: 8,
    marginTop: 16,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'YekanBakh-Regular',
  },
  errorMessage: {
    color: '#ef4444',
    fontSize: 14,
    fontFamily: 'YekanBakh-Regular',
    textAlign: 'right',
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: '#123285',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'YekanBakh-Bold',
    color: '#fff',
  },
});