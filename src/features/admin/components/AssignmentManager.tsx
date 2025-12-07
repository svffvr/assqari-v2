import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { X, Check } from 'phosphor-react-native';
import { Situation, Music, Clothing } from '../../../shared/types';

interface AssignmentManagerProps {
  visible: boolean;
  situation: Situation | null;
  allMusic: Music[];
  allClothing: Clothing[];
  onClose: () => void;
  onAssignMusic: (situationId: string, musicId: string) => Promise<boolean>;
  onUnassignMusic: (situationId: string, musicId: string) => Promise<boolean>;
  onAssignClothing: (situationId: string, clothingId: string) => Promise<boolean>;
  onUnassignClothing: (situationId: string, clothingId: string) => Promise<boolean>;
}

export const AssignmentManager: React.FC<AssignmentManagerProps> = ({
  visible,
  situation,
  allMusic,
  allClothing,
  onClose,
  onAssignMusic,
  onUnassignMusic,
  onAssignClothing,
  onUnassignClothing,
}) => {
  const [activeTab, setActiveTab] = useState<'music' | 'clothing'>('music');
  const [assignedMusicIds, setAssignedMusicIds] = useState<Set<string>>(new Set());
  const [assignedClothingIds, setAssignedClothingIds] = useState<Set<string>>(new Set());

  // Update assigned IDs when situation changes
  useEffect(() => {
    if (situation) {
      setAssignedMusicIds(new Set(situation.music?.map((m) => m.id) || []));
      setAssignedClothingIds(new Set(situation.clothing?.map((c) => c.id) || []));
    }
  }, [situation]);

  if (!situation) return null;

  const handleMusicToggle = async (musicId: string) => {
    const isAssigned = assignedMusicIds.has(musicId);
    
    if (isAssigned) {
      const success = await onUnassignMusic(situation.id, musicId);
      if (success) {
        setAssignedMusicIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(musicId);
          return newSet;
        });
      }
    } else {
      const success = await onAssignMusic(situation.id, musicId);
      if (success) {
        setAssignedMusicIds(prev => new Set(prev).add(musicId));
      }
    }
  };

  const handleClothingToggle = async (clothingId: string) => {
    const isAssigned = assignedClothingIds.has(clothingId);
    
    if (isAssigned) {
      const success = await onUnassignClothing(situation.id, clothingId);
      if (success) {
        setAssignedClothingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(clothingId);
          return newSet;
        });
      }
    } else {
      const success = await onAssignClothing(situation.id, clothingId);
      if (success) {
        setAssignedClothingIds(prev => new Set(prev).add(clothingId));
      }
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>مدیریت اختصاص</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'music' && styles.tabActive]}
            onPress={() => setActiveTab('music')}
          >
            <Text style={[styles.tabText, activeTab === 'music' && styles.tabTextActive]}>
              موزیک‌ها
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'clothing' && styles.tabActive]}
            onPress={() => setActiveTab('clothing')}
          >
            <Text style={[styles.tabText, activeTab === 'clothing' && styles.tabTextActive]}>
              لباس‌ها
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {activeTab === 'music' && (
            <View>
              {allMusic.map((music) => {
                const isAssigned = assignedMusicIds.has(music.id);
                return (
                  <TouchableOpacity
                    key={music.id}
                    style={[styles.item, isAssigned && styles.itemAssigned]}
                    onPress={() => handleMusicToggle(music.id)}
                  >
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>{music.title}</Text>
                      <Text style={styles.itemSubtitle}>{music.artist}</Text>
                    </View>
                    {isAssigned && (
                      <View style={styles.checkIcon}>
                        <Check size={20} color="#fff" weight="bold" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
              {allMusic.length === 0 && (
                <Text style={styles.emptyText}>موزیکی وجود ندارد</Text>
              )}
            </View>
          )}

          {activeTab === 'clothing' && (
            <View>
              {allClothing.map((clothing) => {
                const isAssigned = assignedClothingIds.has(clothing.id);
                return (
                  <TouchableOpacity
                    key={clothing.id}
                    style={[styles.item, isAssigned && styles.itemAssigned]}
                    onPress={() => handleClothingToggle(clothing.id)}
                  >
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>{clothing.description_fa}</Text>
                    </View>
                    {isAssigned && (
                      <View style={styles.checkIcon}>
                        <Check size={20} color="#fff" weight="bold" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
              {allClothing.length === 0 && (
                <Text style={styles.emptyText}>لباسی وجود ندارد</Text>
              )}
            </View>
          )}
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
    fontSize: 16,
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
  item: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  itemAssigned: {
    backgroundColor: '#E9EEFC',
    borderColor: '#3869E8',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'YekanBakh-SemiBold',
    textAlign: 'right',
  },
  itemSubtitle: {
    fontSize: 14,
    fontFamily: 'YekanBakh-Regular',
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'right',
  },
  checkIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E53B3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'YekanBakh-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 40,
  },
});