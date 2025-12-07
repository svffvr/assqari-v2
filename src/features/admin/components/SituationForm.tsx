import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { X } from 'phosphor-react-native';
import { Situation, WeatherCondition, Temperature, Humidity, Wind, TimeOfDay, Mood } from '../../../shared/types';
import { persianUtils } from '../../../shared/utils/persianUtils';

interface SituationFormProps {
  visible: boolean;
  situation?: Situation | null;
  onClose: () => void;
  onSave: (data: Partial<Situation>) => Promise<void>;
}

export const SituationForm: React.FC<SituationFormProps> = ({
  visible,
  situation,
  onClose,
  onSave,
}) => {
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [temperature, setTemperature] = useState<Temperature | null>(null);
  const [humidity, setHumidity] = useState<Humidity | null>(null);
  const [wind, setWind] = useState<Wind | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | null>(null);
  const [mood, setMood] = useState<Mood>(null);
  const [city, setCity] = useState('');
  const [sentenceFa, setSentenceFa] = useState('');
  const [saving, setSaving] = useState(false);

  // Load data when situation changes or modal opens
  useEffect(() => {
    if (visible && situation) {
      setWeather(situation.weather);
      setTemperature(situation.temperature);
      setHumidity(situation.humidity);
      setWind(situation.wind);
      setTimeOfDay(situation.time_of_day);
      setMood(situation.mood);
      setCity(situation.city || '');
      setSentenceFa(situation.sentence_fa);
    } else if (visible && !situation) {
      // Reset for new situation
      resetForm();
    }
  }, [visible, situation]);

  const resetForm = () => {
    setWeather(null);
    setTemperature(null);
    setHumidity(null);
    setWind(null);
    setTimeOfDay(null);
    setMood(null);
    setCity('');
    setSentenceFa('');
  };

  const handleSave = async () => {
    if (!sentenceFa.trim()) {
      alert('لطفا جمله را وارد کنید');
      return;
    }

    setSaving(true);
    try {
      await onSave({
        weather,
        temperature,
        humidity,
        wind,
        time_of_day: timeOfDay,
        mood,
        city: city || null,
        sentence_fa: sentenceFa,
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

  const SelectButton = ({ label, value, onPress, selected }: any) => (
    <TouchableOpacity
      style={[styles.selectButton, selected && styles.selectButtonActive]}
      onPress={onPress}
    >
      <Text style={[styles.selectButtonText, selected && styles.selectButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <X size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>
            {situation ? 'ویرایش موقعیت' : 'موقعیت جدید'}
          </Text>
        </View>

        <ScrollView style={styles.content}>
          {/* Weather */}
          <Text style={styles.label}>وضعیت آب و هوا</Text>
          <View style={styles.selectGroup}>
            <SelectButton
              label="همه"
              value={null}
              onPress={() => setWeather(null)}
              selected={weather === null}
            />
            {(['sunny', 'cloudy', 'rainy', 'snowy', 'stormy', 'foggy'] as WeatherCondition[]).map((w) => (
              <SelectButton
                key={w}
                label={persianUtils.getWeatherName(w)}
                value={w}
                onPress={() => setWeather(w)}
                selected={weather === w}
              />
            ))}
          </View>

          {/* Temperature */}
          <Text style={styles.label}>دما</Text>
          <View style={styles.selectGroup}>
            <SelectButton
              label="همه"
              value={null}
              onPress={() => setTemperature(null)}
              selected={temperature === null}
            />
            {(['cold', 'mild', 'hot'] as Temperature[]).map((t) => (
              <SelectButton
                key={t}
                label={persianUtils.getTemperatureName(t)}
                value={t}
                onPress={() => setTemperature(t)}
                selected={temperature === t}
              />
            ))}
          </View>

          {/* Time of Day */}
          <Text style={styles.label}>زمان روز</Text>
          <View style={styles.selectGroup}>
            <SelectButton
              label="همه"
              value={null}
              onPress={() => setTimeOfDay(null)}
              selected={timeOfDay === null}
            />
            {(['morning', 'noon', 'evening', 'night'] as TimeOfDay[]).map((t) => (
              <SelectButton
                key={t}
                label={t === 'morning' ? 'صبح' : t === 'noon' ? 'ظهر' : t === 'evening' ? 'عصر' : 'شب'}
                value={t}
                onPress={() => setTimeOfDay(t)}
                selected={timeOfDay === t}
              />
            ))}
          </View>

          {/* Sentence */}
          <Text style={styles.label}>جمله (فارسی) *</Text>
          <TextInput
            style={styles.textArea}
            value={sentenceFa}
            onChangeText={setSentenceFa}
            placeholder="جمله مناسب برای این وضعیت را وارد کنید"
            multiline
            numberOfLines={4}
            textAlign="right"
          />

          {/* City (optional) */}
          <Text style={styles.label}>شهر (اختیاری)</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="نام شهر"
            textAlign="right"
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

          <View style={{ height: 40 }} />
        </ScrollView>
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
  selectGroup: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectButtonActive: {
    backgroundColor: '#2E53B3',
    borderColor: '#2E53B3',
  },
  selectButtonText: {
    fontSize: 14,
    fontFamily: 'YekanBakh-Regular',
    color: '#6b7280',
  },
  selectButtonTextActive: {
    color: '#fff',
    fontFamily: 'YekanBakh-Bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'YekanBakh-Regular',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'YekanBakh-Regular',
    minHeight: 100,
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