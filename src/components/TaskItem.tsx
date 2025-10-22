import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task, TaskPriority } from '../types';
import { useTheme } from '../context/ThemeContext';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_CONFIG: Record<TaskPriority, { color: string; icon: string; label: string }> = {
  low: { color: '#34C759', icon: 'arrow-down-circle', label: 'Low' },
  medium: { color: '#007AFF', icon: 'remove-circle', label: 'Medium' },
  high: { color: '#FF9500', icon: 'arrow-up-circle', label: 'High' },
  urgent: { color: '#FF3B30', icon: 'alert-circle', label: 'Urgent' },
};

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const { colors } = useTheme();
  const opacity = React.useRef(new Animated.Value(1)).current;
  const priorityConfig = PRIORITY_CONFIG[task.priority];

  const handleDelete = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onDelete(task.id));
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          borderLeftWidth: 4,
          borderLeftColor: priorityConfig.color,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            { borderColor: colors.primary },
            task.completed && { backgroundColor: colors.primary },
          ]}
        >
          {task.completed && (
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          )}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.title,
                { color: task.completed ? colors.textSecondary : colors.textPrimary },
                task.completed && styles.titleCompleted,
              ]}
            >
              {task.title}
            </Text>
            <View style={[styles.priorityBadge, { backgroundColor: `${priorityConfig.color}15` }]}>
              <Ionicons name={priorityConfig.icon as any} size={14} color={priorityConfig.color} />
            </View>
          </View>
          {task.description && (
            <Text
              style={[
                styles.description,
                { color: colors.textSecondary },
                task.completed && styles.descriptionCompleted,
              ]}
            >
              {task.description}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDelete}
        style={styles.deleteButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="trash-outline" size={20} color={colors.error} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 14,
    marginTop: 2,
  },
  descriptionCompleted: {
    textDecorationLine: 'line-through',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 12,
    padding: 4,
  },
});
