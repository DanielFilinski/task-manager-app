import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TaskItem } from '../components/TaskItem';
import { AddTaskModal } from '../components/AddTaskModal';
import { FilterBar } from '../components/FilterBar';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

type DialogState = {
  visible: boolean;
  type: 'delete' | 'logout' | 'loadAPI' | 'success' | null;
  taskId?: string;
};

export function TaskListScreen() {
  const { colors, theme, setTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogState, setDialogState] = useState<DialogState>({
    visible: false,
    type: null,
  });

  const {
    tasks,
    filteredTasks,
    currentFilter,
    currentPriorityFilter,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    loadFromAPI,
    setFilter,
    setPriorityFilter,
  } = useTasks();
  const { user, logout } = useAuth();

  const handleAddTask = (title: string, description?: string, priority?: any) => {
    addTask(title, description, priority);
    setModalVisible(false);
  };

  const handleDeleteTask = (id: string) => {
    setDialogState({ visible: true, type: 'delete', taskId: id });
  };

  const confirmDelete = () => {
    if (dialogState.taskId) {
      deleteTask(dialogState.taskId);
    }
  };

  const handleLoadFromAPI = () => {
    setDialogState({ visible: true, type: 'loadAPI' });
  };

  const confirmLoadAPI = async () => {
    await loadFromAPI();
    if (!error) {
      setDialogState({ visible: true, type: 'success' });
    }
  };

  const handleLogout = () => {
    setDialogState({ visible: true, type: 'logout' });
  };

  const confirmLogout = () => {
    logout();
  };

  const closeDialog = () => {
    setDialogState({ visible: false, type: null, taskId: undefined });
  };

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('auto');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'light') return 'sunny';
    if (theme === 'dark') return 'moon';
    return 'phone-portrait-outline';
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const activeCount = totalCount - completedCount;

  const taskCounts = {
    all: totalCount,
    active: activeCount,
    completed: completedCount,
  };

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['top', 'bottom']}
    >
      {/* Header */}
      <View style={[styles.header, { 
        backgroundColor: colors.headerBackground,
        borderBottomColor: colors.border,
      }]}>
        <View>
          <Text style={[styles.greeting, { color: colors.textPrimary }]}>
            Hello, {user?.username}!
          </Text>
          <Text style={[styles.stats, { color: colors.textSecondary }]}>
            {completedCount} of {totalCount} tasks completed
          </Text>
        </View>
        <View style={styles.headerActions}>
          {/* API Load Button */}
          <TouchableOpacity 
            onPress={handleLoadFromAPI}
            style={styles.apiButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Ionicons 
                name="cloud-download-outline" 
                size={24} 
                color={colors.primary} 
              />
            )}
          </TouchableOpacity>
          {/* Theme Toggle */}
          <TouchableOpacity 
            onPress={cycleTheme} 
            style={styles.themeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons 
              name={getThemeIcon()} 
              size={24} 
              color={colors.primary} 
            />
          </TouchableOpacity>
          {/* Logout Button */}
          <TouchableOpacity 
            onPress={handleLogout} 
            style={styles.logoutButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="log-out-outline" size={24} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Error Banner */}
      {error && (
        <View style={[styles.errorBanner, { backgroundColor: `${colors.error}15` }]}>
          <Ionicons name="alert-circle" size={20} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
        </View>
      )}

      {/* Filters */}
      <FilterBar
        currentFilter={currentFilter}
        currentPriorityFilter={currentPriorityFilter}
        onFilterChange={setFilter}
        onPriorityFilterChange={setPriorityFilter}
        taskCounts={taskCounts}
      />

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={[styles.emptyIconContainer, { backgroundColor: colors.inputBackground }]}>
            <Ionicons 
              name={currentFilter === 'completed' ? 'checkmark-done' : 'list-outline'}
              size={64} 
              color={colors.textTertiary} 
            />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
            {currentFilter === 'completed' ? 'No completed tasks' :
             currentFilter === 'active' ? 'No active tasks' :
             'No tasks yet'}
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            {currentFilter === 'all' ? 'Tap the + button to add your first task or load from API' :
             'Try changing the filter to see other tasks'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={toggleTask}
              onDelete={handleDeleteTask}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add Task Modal */}
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddTask}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={dialogState.visible && dialogState.type === 'delete'}
        type="danger"
        icon="trash"
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={closeDialog}
      />

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        visible={dialogState.visible && dialogState.type === 'logout'}
        type="warning"
        icon="log-out"
        title="Logout"
        message="Are you sure you want to logout? You'll need to sign in again."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={closeDialog}
      />

      {/* Load API Confirmation Dialog */}
      <ConfirmDialog
        visible={dialogState.visible && dialogState.type === 'loadAPI'}
        type="info"
        icon="cloud-download"
        title="Load Tasks from API"
        message="This will load 20 tasks from JSONPlaceholder API with random priorities. Ready?"
        confirmText="Load"
        cancelText="Cancel"
        onConfirm={confirmLoadAPI}
        onCancel={closeDialog}
      />

      {/* Success Dialog */}
      <ConfirmDialog
        visible={dialogState.visible && dialogState.type === 'success'}
        type="success"
        icon="checkmark-circle"
        title="Success!"
        message="Tasks loaded successfully! 🎉 You can now organize them with filters."
        confirmText="Great"
        cancelText=""
        onConfirm={closeDialog}
        onCancel={closeDialog}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
  },
  stats: {
    fontSize: 14,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  apiButton: {
    padding: 8,
  },
  themeButton: {
    padding: 8,
  },
  logoutButton: {
    padding: 8,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
  },
  listContent: {
    padding: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
