import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import { X } from 'phosphor-react-native';
import { Music } from '../../../shared/types';
import { spotifyService } from '../../../shared/services/spotifyService';

interface MusicFormProps {
  visible: boolean;
  music?: Music | null;
  onClose: () => void;
  onSave: (data: Partial<Music>) => Promise<void>;
}

export const MusicForm: React.FC<MusicFormProps> = ({
  visible,
  music,
  onClose,
  onSave,
}) => {
  const [spotifyLink, setSpotifyLink] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  // Load data when music changes or modal opens
  useEffect(() => {
    if (visible && music) {
      setSpotifyLink(music.spotify_link);
      setTitle(music.title);
      setArtist(music.artist);
      setCoverUrl(music.cover_url || '');
      setFetched(false);
    } else if (visible && !music) {
      resetForm();
    }
  }, [visible, music]);

  const resetForm = () => {
    setSpotifyLink('');
    setTitle('');
    setArtist('');
    setCoverUrl('');
    setFetched(false);
  };

  const handleFetchSpotifyData = async () => {
    if (!spotifyLink.trim()) {
      alert('لطفا لینک اسپاتیفای را وارد کنید');
      return;
    }

    if (!spotifyService.validateSpotifyUrl(spotifyLink)) {
      alert('لینک اسپاتیفای نامعتبر است. لینک باید از open.spotify.com باشد');
      return;
    }

    setLoading(true);
    try {
      const data = await spotifyService.getTrackInfo(spotifyLink);
      
      if (data) {
        setTitle(data.title);
        setArtist(data.artist);
        setCoverUrl(data.coverUrl);
        setFetched(true);
        console.log('✅ اطلاعات اسپاتیفای دریافت شد:', data);
      } else {
        alert('خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید');
      }
    } catch (error: any) {
      alert(error.message || 'خطا در دریافت اطلاعات از اسپاتیفای');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !artist.trim() || !spotifyLink.trim()) {
      alert('لطفا تمام فیلدها را پر کنید');
      return;
    }

    setSaving(true);
    try {
      await onSave({
        title,
        artist,
        spotify_link: spotifyLink,
        cover_url: coverUrl || undefined,
      });
      
      resetForm();
      onClose();
    } catch (error) {
      alert('خطا در ذخیره');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <X size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>
            {music ? 'ویرایش موزیک' : 'موزیک جدید'}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>لینک اسپاتیفای *</Text>
          <View style={styles.linkRow}>
            <TextInput
              style={[styles.input, styles.linkInput]}
              value={spotifyLink}
              onChangeText={setSpotifyLink}
              placeholder="https://open.spotify.com/track/..."
              textAlign="left"
              keyboardType="url"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={[styles.fetchButton, loading && styles.fetchButtonDisabled]}
              onPress={handleFetchSpotifyData}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Text style={styles.fetchButtonText}>دریافت</Text>
              )}
            </TouchableOpacity>
          </View>

          {fetched && (
            <View style={styles.previewCard}>
              <Text style={styles.previewTitle}>پیش‌نمایش</Text>
              
              {coverUrl ? (
                <Image
                  source={{ uri: coverUrl }}
                  style={styles.coverImage}
                />
              ) : null}
              
              <View style={styles.previewInfo}>
                <Text style={styles.previewLabel}>عنوان:</Text>
                <Text style={styles.previewValue}>{title}</Text>
              </View>
              
              <View style={styles.previewInfo}>
                <Text style={styles.previewLabel}>هنرمند:</Text>
                <Text style={styles.previewValue}>{artist}</Text>
              </View>
            </View>
          )}

          <Text style={styles.label}>عنوان *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="نام آهنگ یا پلی‌لیست"
            textAlign="right"
          />

          <Text style={styles.label}>هنرمند *</Text>
          <TextInput
            style={styles.input}
            value={artist}
            onChangeText={setArtist}
            placeholder="نام هنرمند"
            textAlign="right"
          />

          <Text style={styles.label}>لینک کاور (اختیاری)</Text>
          <TextInput
            style={styles.input}
            value={coverUrl}
            onChangeText={setCoverUrl}
            placeholder="https://..."
            textAlign="left"
            keyboardType="url"
          />

          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={styles.saveButtonText}>
              {saving ? 'در حال ذخیره...' : 'ذخیره'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontFamily: 'YekanBakh-Bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'YekanBakh-SemiBold',
    marginBottom: 8,
    marginTop: 16,
    textAlign: 'right',
  },
  linkRow: {
    flexDirection: 'row',
    gap: 8,
  },
  linkInput: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'YekanBakh-Regular',
  },
  fetchButton: {
    backgroundColor: '#123285',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    minWidth: 80,
  },
  fetchButtonDisabled: {
    opacity: 0.5,
  },
  fetchButtonText: {
    fontSize: 16,
    fontFamily: 'YekanBakh-Bold',
    color: '#fff',
    textAlign: 'center',
  },
  previewCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#123285',
  },
  previewTitle: {
    fontSize: 14,
    fontFamily: 'YekanBakh-Bold',
    marginBottom: 12,
    textAlign: 'right',
    color: '#123285',
  },
  coverImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: 'center',
  },
  previewInfo: {
    flexDirection: 'row-reverse',
    marginBottom: 8,
  },
  previewLabel:{
fontSize: 14,
fontFamily: 'YekanBakh-SemiBold',
marginLeft: 8,
},
previewValue: {
fontSize: 14,
fontFamily: 'YekanBakh-Regular',
flex: 1,
textAlign: 'right',
},
saveButton: {
backgroundColor: '#123285',
padding: 16,
borderRadius: 12,
alignItems: 'center',
marginTop: 24,
},
saveButtonDisabled: {
opacity: 0.5,
},
saveButtonText: {
fontSize: 16,
fontFamily: 'YekanBakh-Bold',
color: '#fff',
},
});