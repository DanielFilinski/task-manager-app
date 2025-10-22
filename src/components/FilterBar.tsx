import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { TaskFilter, TaskPriority } from '../types';

interface FilterBarProps {
  currentFilter: TaskFilter;
  currentPriorityFilter: TaskPriority | 'all';
  onFilterChange: (filter: TaskFilter) => void;
  onPriorityFilterChange: (priority: TaskPriority | 'all') => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const STATUS_FILTERS: { value: TaskFilter; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: 'list' },
  { value: 'active', label: 'Active', icon: 'radio-button-off' },
  { value: 'completed', label: 'Done', icon: 'checkmark-circle' },
];

const PRIORITY_FILTERS: { value: TaskPriority | 'all'; label: string; icon: string; color: string }[] = [
  { value: 'all', label: 'All', icon: 'apps', color: '#8E8E93' },
  { value: 'urgent', label: 'Urgent', icon: 'alert-circle', color: '#FF3B30' },
  { value: 'high', label: 'High', icon: 'arrow-up-circle', color: '#FF9500' },
  { value: 'medium', label: 'Medium', icon: 'remove-circle', color: '#007AFF' },
  { value: 'low', label: 'Low', icon: 'arrow-down-circle', color: '#34C759' },
];

export function FilterBar({
  currentFilter,
  currentPriorityFilter,
  onFilterChange,
  onPriorityFilterChange,
  taskCounts,
}: FilterBarProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Status Filters */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Status</Text>
        <View style={styles.filterRow}>
          {STATUS_FILTERS.map((filter) => {
            const isActive = currentFilter === filter.value;
            const count = taskCounts[filter.value];
            
            return (
              <TouchableOpacity
                key={filter.value}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: isActive ? colors.primary : colors.cardBackground,
                    borderColor: isActive ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => onFilterChange(filter.value)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={filter.icon as any}
                  size={18}
                  color={isActive ? '#FFFFFF' : colors.textPrimary}
                />
                <Text
                  style={[
                    styles.filterText,
                    { color: isActive ? '#FFFFFF' : colors.textPrimary },
                  ]}
                >
                  {filter.label}
                </Text>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: isActive ? 'rgba(255,255,255,0.3)' : colors.inputBackground,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      { color: isActive ? '#FFFFFF' : colors.textSecondary },
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Priority Filters */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Priority</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.priorityScrollContent}
        >
          {PRIORITY_FILTERS.map((filter) => {
            const isActive = currentPriorityFilter === filter.value;
            
            return (
              <TouchableOpacity
                key={filter.value}
                style={[
                  styles.priorityChip,
                  {
                    backgroundColor: isActive ? filter.color : colors.cardBackground,
                    borderColor: isActive ? filter.color : colors.border,
                  },
                ]}
                onPress={() => onPriorityFilterChange(filter.value)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={filter.icon as any}
                  size={16}
                  color={isActive ? '#FFFFFF' : filter.color}
                />
                <Text
                  style={[
                    styles.priorityText,
                    { color: isActive ? '#FFFFFF' : colors.textPrimary },
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 16,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  priorityScrollContent: {
    gap: 8,
  },
  priorityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

