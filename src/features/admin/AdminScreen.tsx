import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, Plus, Pencil, Trash, MusicNotes } from 'phosphor-react-native';
import { useAdmin } from '../admin/hooks/useAdmin';
import { SituationForm } from '../admin/components/SituationForm';
import { MusicForm } from '../admin/components/MusicForm';
import { ClothingForm } from '../admin/components/ClothingForm';
import { AssignmentManager } from '../admin/components/AssignmentManager';
import { Situation, Music, Clothing } from '../../shared/types/index';
import { persianUtils } from '../../shared/utils/persianUtils';

export default function AdminScreen() {
  const router = useRouter();
  const admin = useAdmin();

  const [activeTab, setActiveTab] = useState<'situations' | 'music' | 'clothing'>('situations');
  
  // Form modals
  const [situationFormVisible, setSituationFormVisible] = useState(false);
  const [musicFormVisible, setMusicFormVisible] = useState(false);
  const [clothingFormVisible, setClothingFormVisible] = useState(false);
  const [assignmentManagerVisible, setAssignmentManagerVisible] = useState(false);

  // Selected items for editing
  const [selectedSituation, setSelectedSituation] = useState<Situation | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<Clothing | null>(null);

  const handleCreateSituation = () => {
    setSelectedSituation(null);
    setSituationFormVisible(true);
  };

  const handleEditSituation = (situation: Situation) => {
    setSelectedSituation(situation);
    setSituationFormVisible(true);
  };

  const handleDeleteSituation = (id: string) => {
    Alert.alert(
      'حذف موقعیت',
      'آیا مطمئن هستید؟',
      [
        { text: 'لغو', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => admin.deleteSituation(id),
        },
      ]
    );
  };

  const handleManageAssignments = (situation: Situation) => {
    setSelectedSituation(situation);
    setAssignmentManagerVisible(true);
  };

  const handleSaveSituation = async (data: Partial<Situation>) => {
    if (selectedSituation) {
      await admin.updateSituation(selectedSituation.id, data);
    } else {
      await admin.createSituation(data);
    }
  };

  const handleCreateMusic = () => {
    setSelectedMusic(null);
    setMusicFormVisible(true);
  };

  const handleEditMusic = (music: Music) => {
    setSelectedMusic(music);
    setMusicFormVisible(true);
  };

  const handleDeleteMusic = (id: string) => {
    Alert.alert(
      'حذف موزیک',
      'آیا مطمئن هستید؟',
      [
        { text: 'لغو', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => admin.deleteMusic(id),
        },
      ]
    );
  };

  const handleSaveMusic = async (data: Partial<Music>) => {
    if (selectedMusic) {
      await admin.updateMusic(selectedMusic.id, data);
    } else {
      await admin.createMusic(data);
    }
  };

  const handleCreateClothing = () => {
    setSelectedClothing(null);
    setClothingFormVisible(true);
  };

  const handleEditClothing = (clothing: Clothing) => {
    setSelectedClothing(clothing);
    setClothingFormVisible(true);
  };

  const handleDeleteClothing = (id: string) => {
    Alert.alert(
      'حذف لباس',
      'آیا مطمئن هستید؟',
      [
        { text: 'لغو', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => admin.deleteClothing(id),
        },
      ]
    );
  };

  const handleSaveClothing = async (data: Partial<Clothing>) => {
    if (selectedClothing) {
      await admin.updateClothing(selectedClothing.id, data);
    } else {
      await admin.createClothing(data);
    }
  };

  if (admin.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#123285" />
        <Text style={styles.loadingText}>در حال بارگذاری...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowRight size={24} color="#000" weight="bold" />
        </TouchableOpacity>
        <Text style={styles.title}>پنل مدیریت</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'situations' && styles.tabActive]}
          onPress={() => setActiveTab('situations')}
        >
          <Text style={[styles.tabText, activeTab === 'situations' && styles.tabTextActive]}>
            موقعیت‌ها ({admin.situations.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'music' && styles.tabActive]}
          onPress={() => setActiveTab('music')}
        >
          <Text style={[styles.tabText, activeTab === 'music' && styles.tabTextActive]}>
            موزیک‌ها ({admin.music.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'clothing' && styles.tabActive]}
          onPress={() => setActiveTab('clothing')}
        >
          <Text style={[styles.tabText, activeTab === 'clothing' && styles.tabTextActive]}>
            لباس‌ها ({admin.clothing.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'situations' && (
          <View>
            {admin.situations.map((situation) => (
              <View key={situation.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTags}>
                    {situation.weather && (
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>
                          {persianUtils.getWeatherName(situation.weather)}
                        </Text>
                      </View>
                    )}
                    {situation.temperature && (
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>
                          {persianUtils.getTemperatureName(situation.temperature)}
                        </Text>
                      </View>
                    )}
                    {situation.time_of_day && (
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>
                          {situation.time_of_day === 'morning' ? 'صبح' : 
                           situation.time_of_day === 'noon' ? 'ظهر' :
                           situation.time_of_day === 'evening' ? 'عصر' : 'شب'}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <Text style={styles.cardText}>{situation.sentence_fa}</Text>
                <View style={styles.cardStats}>
                  <Text style={styles.cardStat}>
                    {situation.music?.length || 0} موزیک • {situation.clothing?.length || 0} لباس
                  </Text>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleManageAssignments(situation)}
                  >
                    <MusicNotes size={20} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditSituation(situation)}
                  >
                    <Pencil size={20} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteSituation(situation.id)}
                  >
                    <Trash size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {admin.situations.length === 0 && (
              <Text style={styles.emptyText}>موقعیتی وجود ندارد</Text>
            )}
          </View>
        )}

        {activeTab === 'music' && (
          <View>
            {admin.music.map((music) => (
              <View key={music.id} style={styles.card}>
                <Text style={styles.cardTitle}>{music.title}</Text>
                <Text style={styles.cardSubtitle}>{music.artist}</Text>
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditMusic(music)}
                  >
                    <Pencil size={20} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteMusic(music.id)}
                  >
                    <Trash size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {admin.music.length === 0 && (
              <Text style={styles.emptyText}>موزیکی وجود ندارد</Text>
            )}
          </View>
        )}

        {activeTab === 'clothing' && (
          <View>
            {admin.clothing.map((clothing) => (
              <View key={clothing.id} style={styles.card}>
                <Text style={styles.cardText}>{clothing.description_fa}</Text>
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditClothing(clothing)}
                  >
                    <Pencil size={20} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteClothing(clothing.id)}
                  >
                    <Trash size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {admin.clothing.length === 0 && (
              <Text style={styles.emptyText}>لباسی وجود ندارد</Text>
            )}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          if (activeTab === 'situations') handleCreateSituation();
          else if (activeTab === 'music') handleCreateMusic();
          else if (activeTab === 'clothing') handleCreateClothing();
        }}
      >
        <Plus size={28} color="#fff" weight="bold" />
      </TouchableOpacity>

      {/* Forms */}
      <SituationForm
        visible={situationFormVisible}
        situation={selectedSituation}
        onClose={() => setSituationFormVisible(false)}
        onSave={handleSaveSituation}
      />
      <MusicForm
        visible={musicFormVisible}
        music={selectedMusic}
        onClose={() => setMusicFormVisible(false)}
        onSave={handleSaveMusic}
      />
      <ClothingForm
        visible={clothingFormVisible}
        clothing={selectedClothing}
        onClose={() => setClothingFormVisible(false)}
        onSave={handleSaveClothing}
      />
      <AssignmentManager
        visible={assignmentManagerVisible}
        situation={selectedSituation}
        allMusic={admin.music}
        allClothing={admin.clothing}
        onClose={() => setAssignmentManagerVisible(false)}
        onAssignMusic={admin.assignMusic}
        onUnassignMusic={admin.unassignMusic}
        onAssignClothing={admin.assignClothing}
        onUnassignClothing={admin.unassignClothing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'YekanBakh-Regular',
  },
  header: {
    flexDirection: 'row-reverse',
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
  tabs: {
    flexDirection: 'row-reverse',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#123285',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'YekanBakh-Regular',
    color: '#6b7280',
  },
  tabTextActive: {
    fontFamily: 'YekanBakh-Bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTags: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#123285',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'YekanBakh-Bold',
    color: '#fff',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'YekanBakh-Bold',
    marginBottom: 4,
    textAlign: 'right',
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'YekanBakh-Regular',
    color: '#6b7280',
    marginBottom: 12,
    textAlign: 'right',
  },
  cardText: {
    fontSize: 14,
    fontFamily: 'YekanBakh-Regular',
    marginBottom: 12,
    textAlign: 'right',
    lineHeight: 22,
  },
  cardStats: {
    marginBottom: 12,
  },
  cardStat: {
    fontSize: 12,
    fontFamily: 'YekanBakh-Regular',
    color: '#6b7280',
    textAlign: 'right',
  },
  cardActions: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#123285',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'YekanBakh-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 40,
  },
});
