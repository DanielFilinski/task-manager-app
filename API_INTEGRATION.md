# API Integration Documentation

## Overview

The Task Manager App now includes full API integration using the JSONPlaceholder public API as a demonstration endpoint. This integration includes proper loading states, error handling, and optimistic updates for better user experience.

## API Configuration

### Base URL
```
https://jsonplaceholder.typicode.com
```

### Endpoints Used
- `GET /todos?_limit=20` - Fetch tasks
- `POST /todos` - Create new task
- `PUT /todos/:id` - Update task
- `DELETE /todos/:id` - Delete task

## Architecture

### Service Layer (`src/services/`)

#### `api.ts`
Core API client with generic request handler:
- Handles all HTTP methods (GET, POST, PUT, DELETE)
- Automatic error handling
- JSON serialization/deserialization
- Type-safe responses with `ApiResponse<T>` interface

#### `taskService.ts`
Task-specific API operations:
- `fetchTasks()` - Retrieves up to 20 tasks from API
- `createTask(title, description)` - Creates a new task
- `updateTask(id, completed)` - Updates task completion status
- `deleteTask(id)` - Deletes a task
- Transforms API responses to match app's Task type

### Context Updates (`src/context/TaskContext.tsx`)

Enhanced with API integration:
- **State Management**: 
  - `tasks` - Current task list
  - `loading` - Loading state indicator
  - `error` - Error message if any
  
- **Async Operations**:
  - All CRUD operations are now async
  - Optimistic updates for better UX
  - Automatic error recovery with local fallback
  
- **Auto-loading**: Fetches tasks automatically on mount

### Type Updates (`src/types/index.ts`)

Updated `TaskContextType` interface:
```typescript
interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (title: string, description?: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
}
```

## UI Features

### Loading States
- Initial loading spinner with "Loading tasks from API..." message
- Pull-to-refresh functionality in task list
- "Adding..." button state during task creation

### Error Handling
- Red error banner at top of screen showing API errors
- Automatic fallback to local mock data if API fails
- Graceful error recovery without app crashes

### Optimistic Updates
- Task completion toggles update immediately
- Changes revert if API call fails
- Maintains smooth user experience

## How It Works

### Initial Load
1. User logs in
2. `TaskProvider` mounts
3. `useEffect` triggers `loadTasks()`
4. Loading state set to true
5. API request to `/todos?_limit=20`
6. Tasks displayed when loaded
7. If error: fallback mock data shown

### Adding a Task
1. User fills form and clicks "Add Task"
2. Modal shows "Adding..." state
3. API POST request to `/todos`
4. New task prepended to list
5. Modal closes on success
6. If error: task still added locally with error banner

### Toggling Task
1. User taps task checkbox
2. Task immediately toggles (optimistic)
3. API PUT request to `/todos/:id`
4. If error: task reverts to original state

### Deleting Task
1. User confirms deletion
2. Task immediately removed (optimistic)
3. API DELETE request to `/todos/:id`
4. If error: task restored with error banner

### Pull to Refresh
1. User pulls down on task list
2. Loading indicator shows
3. Fresh data fetched from API
4. List updates with new data

## Notes on JSONPlaceholder

JSONPlaceholder is a fake API for testing:
- POST/PUT/DELETE requests are simulated
- Changes are not actually persisted
- Always returns success responses
- Real implementation would use actual backend

## Migration to Real API

To integrate with a real backend:

1. Update `API_BASE_URL` in `src/services/api.ts`
2. Add authentication headers if needed
3. Update endpoint paths in `taskService.ts`
4. Adjust API response transformation if schema differs
5. Add proper error handling for specific error codes
6. Consider adding retry logic for failed requests

## Benefits

✅ **Full API Integration** - All CRUD operations connected to API  
✅ **Optimistic Updates** - Instant UI feedback  
✅ **Error Handling** - Graceful degradation on errors  
✅ **Loading States** - Clear feedback during operations  
✅ **Type Safety** - Full TypeScript coverage  
✅ **Modular Architecture** - Easy to swap APIs  
✅ **Pull to Refresh** - Manual data synchronization  
✅ **Fallback Support** - Works offline with mock data  

## Testing

To test the API integration:

1. Run the app: `npm start`
2. Log in (admin/1234)
3. Observe initial loading state
4. Wait for tasks to load from API
5. Try adding a new task
6. Toggle task completion
7. Delete a task
8. Pull down to refresh
9. Test with network disabled to see error handling

## Performance

- Limits to 20 tasks for optimal performance
- Uses React's built-in optimizations
- No unnecessary re-renders
- Efficient state management

