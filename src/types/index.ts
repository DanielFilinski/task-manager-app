// Task priority levels
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

// Task filter types
export type TaskFilter = 'all' | 'active' | 'completed';

// Task interface
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: Date;
}

// User interface
export interface User {
  username: string;
  isAuthenticated: boolean;
}

// Auth credentials
export interface LoginCredentials {
  username: string;
  password: string;
}

// Task context type
export interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  currentFilter: TaskFilter;
  currentPriorityFilter: TaskPriority | 'all';
  loading: boolean;
  error: string | null;
  addTask: (title: string, description?: string, priority?: TaskPriority) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
  loadFromAPI: () => Promise<void>;
  setFilter: (filter: TaskFilter) => void;
  setPriorityFilter: (priority: TaskPriority | 'all') => void;
  updateTaskPriority: (id: string, priority: TaskPriority) => void;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => boolean;
  logout: () => void;
}

