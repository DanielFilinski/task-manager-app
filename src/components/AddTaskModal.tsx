import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input } from './Input';
import { Button } from './Button';
import { useTheme } from '../context/ThemeContext';
import { TaskPriority } from '../types';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, description?: string, priority?: TaskPriority) => void;
}

const PRIORITIES: { value: TaskPriority; label: string; icon: string; color: string }[] = [
  { value: 'low', label: 'Low', icon: 'arrow-down-circle', color: '#34C759' },
  { value: 'medium', label: 'Medium', icon: 'remove-circle', color: '#007AFF' },
  { value: 'high', label: 'High', icon: 'arrow-up-circle', color: '#FF9500' },
  { value: 'urgent', label: 'Urgent', icon: 'alert-circle', color: '#FF3B30' },
];

export function AddTaskModal({ visible, onClose, onAdd }: AddTaskModalProps) {
  const { colors } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    onAdd(title.trim(), description.trim() || undefined, priority);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.overlay, { backgroundColor: colors.modalOverlay }]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <ScrollView
                style={[styles.content, { backgroundColor: colors.cardBackground }]}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                <Text style={[styles.title, { color: colors.textPrimary }]}>Add New Task</Text>

                <Input
                  label="Title *"
                  placeholder="Enter task title"
                  value={title}
                  onChangeText={(text) => {
                    setTitle(text);
                    setError('');
                  }}
                  error={error}
                  autoFocus
                />

                <Input
                  label="Description"
                  placeholder="Enter task description (optional)"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                  style={styles.textarea}
                />

                {/* Priority Selector */}
                <View style={styles.priorityContainer}>
                  <Text style={[styles.label, { color: colors.textPrimary }]}>Priority</Text>
                  <View style={styles.priorityGrid}>
                    {PRIORITIES.map((item) => (
                      <TouchableOpacity
                        key={item.value}
                        style={[
                          styles.priorityButton,
                          {
                            backgroundColor: colors.inputBackground,
                            borderColor: priority === item.value ? item.color : colors.border,
                            borderWidth: priority === item.value ? 2 : 1,
                          },
                        ]}
                        onPress={() => setPriority(item.value)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name={item.icon as any} size={24} color={item.color} />
                        <Text
                          style={[
                            styles.priorityLabel,
                            {
                              color: priority === item.value ? colors.textPrimary : colors.textSecondary,
                              fontWeight: priority === item.value ? '600' : '400',
                            },
                          ]}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.buttons}>
                  <Button
                    title="Cancel"
                    onPress={handleClose}
                    variant="secondary"
                    style={styles.button}
                  />
                  <Button
                    title="Add Task"
                    onPress={handleAdd}
                    variant="primary"
                    style={styles.button}
                  />
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    borderRadius: 16,
    maxHeight: '90%',
  },
  scrollContent: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  textarea: {
    height: 80,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    marginBottom: 16,
  },
  priorityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  priorityLabel: {
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
});
