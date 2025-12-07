import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { X } from 'phosphor-react-native';
import { Clothing } from '../../../shared/types';

interface ClothingFormProps {
  visible: boolean;
  clothing?: Clothing | null;
  onClose: () => void;
  onSave: (data: Partial<Clothing>) => Promise<void>;
}

export const ClothingForm: React.FC<ClothingFormProps> = ({
  visible,
  clothing,
  onClose,
  onSave,
}) => {
  const [descriptionFa, setDescriptionFa] = useState('');
  const [englishPhrase, setEnglishPhrase] = useState('');
  const [saving, setSaving] = useState(false);

  // Load data when clothing changes or modal opens
  useEffect(() => {
    if (visible && clothing) {
      setDescriptionFa(clothing.description_fa);
      setEnglishPhrase(clothing.english_phrase || '');
    } else if (visible && !clothing) {
      resetForm();
    }
  }, [visible, clothing]);

  const resetForm = () => {
    setDescriptionFa('');
    setEnglishPhrase('');
  };

  const handleSave = async () => {
    if (!descriptionFa.trim()) {
      alert('لطفا توضیحات را وارد کنید');
      return;
    }

    setSaving(true);
    try {
      await onSave({
        description_fa: descriptionFa,
        english_phrase: englishPhrase.trim() || undefined,
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
            {clothing ? 'ویرایش لباس' : 'لباس جدید'}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>توضیحات (فارسی) *</Text>
          <TextInput
            style={styles.textArea}
            value={descriptionFa}
            onChangeText={setDescriptionFa}
            placeholder="مثلا: یک ژاکت نازک و شلوار جین"
            multiline
            numberOfLines={4}
            textAlign="right"
          />

          <Text style={styles.label}>عبارت انگلیسی (برای جستجوی پینترست)</Text>
          <Text style={styles.hint}>
            این عبارت برای جستجو در پینترست استفاده می‌شود
          </Text>
          <TextInput
            style={styles.input}
            value={englishPhrase}
            onChangeText={setEnglishPhrase}
            placeholder="e.g., light jacket and jeans"
            textAlign="left"
            autoCapitalize="none"
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
  hint: {
    fontSize: 12,
    fontFamily: 'YekanBakh-Regular',
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'right',
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
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'YekanBakh-Regular',
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