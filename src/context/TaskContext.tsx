import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Task, TaskContextType, TaskFilter, TaskPriority } from '../types';
import * as taskService from '../services/taskService';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Priority order for sorting
const PRIORITY_ORDER: Record<TaskPriority, number> = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Welcome to Task Manager',
      description: 'This is a high priority task. Try marking it as complete!',
      completed: false,
      priority: 'high',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Add a new task',
      description: 'Click the + button to add your own task',
      completed: false,
      priority: 'medium',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Try the filters',
      description: 'Use the filter buttons to organize your tasks',
      completed: false,
      priority: 'low',
      createdAt: new Date(),
    },
    {
      id: '4',
      title: 'Load tasks from API',
      description: 'Tap the cloud button to load real tasks from JSONPlaceholder API',
      completed: false,
      priority: 'urgent',
      createdAt: new Date(),
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all');
  const [currentPriorityFilter, setCurrentPriorityFilter] = useState<TaskPriority | 'all'>('all');

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Apply completion filter
    if (currentFilter === 'active') {
      result = result.filter((task) => !task.completed);
    } else if (currentFilter === 'completed') {
      result = result.filter((task) => task.completed);
    }

    // Apply priority filter
    if (currentPriorityFilter !== 'all') {
      result = result.filter((task) => task.priority === currentPriorityFilter);
    }

    // Sort by priority (urgent first) then by date
    result.sort((a, b) => {
      const priorityDiff = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [tasks, currentFilter, currentPriorityFilter]);

  const addTask = async (title: string, description?: string, priority: TaskPriority = 'medium') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      priority,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = async (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = async (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const refreshTasks = async () => {
    // Placeholder for API refresh
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
  };

  const loadFromAPI = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await taskService.fetchTasks();

      if (response.error) {
        setError('Failed to load tasks from API. Please try again.');
        setLoading(false);
        return;
      }

      if (response.data) {
        // Add API tasks to existing tasks
        setTasks((prevTasks) => [...response.data!, ...prevTasks]);
        setError(null);
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const setFilter = (filter: TaskFilter) => {
    setCurrentFilter(filter);
  };

  const setPriorityFilter = (priority: TaskPriority | 'all') => {
    setCurrentPriorityFilter(priority);
  };

  const updateTaskPriority = (id: string, priority: TaskPriority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        currentFilter,
        currentPriorityFilter,
        loading,
        error,
        addTask,
        toggleTask,
        deleteTask,
        refreshTasks,
        loadFromAPI,
        setFilter,
        setPriorityFilter,
        updateTaskPriority,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
