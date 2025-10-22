/**
 * Task Service - handles all task-related API calls
 * Using JSONPlaceholder API: https://jsonplaceholder.typicode.com
 */

import { api, ApiResponse } from './api';
import { Task } from '../types';

// JSONPlaceholder todo structure
interface TodoApiResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

/**
 * Transform API response to our Task type
 * Uses timestamp to ensure unique IDs across multiple API loads
 */
function transformTodoToTask(todo: TodoApiResponse, loadTimestamp: number): Task {
  // Assign random priority based on task id
  const priorities: ('low' | 'medium' | 'high' | 'urgent')[] = ['low', 'medium', 'high', 'urgent'];
  const priorityIndex = todo.id % priorities.length;
  
  return {
    id: `api-${loadTimestamp}-${todo.id}`, // Unique ID with timestamp
    title: todo.title,
    description: `Task from user ${todo.userId}`,
    completed: todo.completed,
    priority: priorities[priorityIndex],
    createdAt: new Date(),
  };
}

/**
 * Fetch all tasks from API
 * Limits to 20 tasks for better performance
 */
export async function fetchTasks(): Promise<ApiResponse<Task[]>> {
  const response = await api.get<TodoApiResponse[]>('/todos?_limit=20');
  
  if (response.error) {
    return { error: response.error };
  }
  
  if (response.data) {
    const loadTimestamp = Date.now(); // Unique timestamp for this load
    const tasks = response.data.map((todo) => transformTodoToTask(todo, loadTimestamp));
    return { data: tasks };
  }
  
  return { error: 'No data received' };
}

/**
 * Create a new task
 * Note: JSONPlaceholder will simulate creation but won't persist
 */
export async function createTask(
  title: string,
  description?: string
): Promise<ApiResponse<Task>> {
  const response = await api.post<TodoApiResponse>('/todos', {
    title,
    completed: false,
    userId: 1,
  });
  
  if (response.error) {
    return { error: response.error };
  }
  
  if (response.data) {
    const task: Task = {
      id: `api-${response.data.id}`, // Add prefix to avoid ID conflicts
      title,
      description,
      completed: false,
      priority: 'medium',
      createdAt: new Date(),
    };
    return { data: task };
  }
  
  return { error: 'Failed to create task' };
}

/**
 * Update task completion status
 */
export async function updateTask(
  id: string,
  completed: boolean
): Promise<ApiResponse<Task>> {
  const response = await api.put<TodoApiResponse>(`/todos/${id}`, {
    completed,
  });
  
  if (response.error) {
    return { error: response.error };
  }
  
  if (response.data) {
    const loadTimestamp = Date.now();
    const task = transformTodoToTask(response.data, loadTimestamp);
    return { data: task };
  }
  
  return { error: 'Failed to update task' };
}

/**
 * Delete a task
 */
export async function deleteTask(id: string): Promise<ApiResponse<void>> {
  const response = await api.delete<void>(`/todos/${id}`);
  return response;
}

