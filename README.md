# 📱 Task Manager App

A modern, feature-rich mobile task management application built with React Native and Expo.

## 🎯 Features

- ✅ **User Authentication** - Secure login with credential validation
- ✅ **Task Management** - Create, complete, and delete tasks
- ✅ **Custom Dialogs** 🎨 - Beautiful animated confirmation modals
- ✅ **API Integration** ☁️ - Load tasks from JSONPlaceholder API with one click
- ✅ **Priorities & Filters** 🎯 - 4 priority levels, smart filtering & sorting
- ✅ **Dark Mode** 🌙 - Light, Dark, and Auto themes with persistence
- ✅ **Loading States** - Smooth loading indicators and animations
- ✅ **Error Handling** - Graceful error recovery with user feedback
- ✅ **Beautiful UI** - Clean, modern iOS-inspired interface
- ✅ **Animations** - Smooth transitions and interactions
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Type Safety** - Full TypeScript implementation

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your phone (optional, for testing on device)

### Installation

1. Navigate to the project directory:
```bash
cd task-manager-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
# or
npx expo start
```

4. Run on your preferred platform:
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go app

## 🔐 Login Credentials

For testing, use these credentials:
- **Username**: `admin`
- **Password**: `1234`

## 📁 Project Structure

```
task-manager-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── TaskItem.tsx
│   │   └── AddTaskModal.tsx
│   ├── screens/            # Application screens
│   │   ├── LoginScreen.tsx
│   │   └── TaskListScreen.tsx
│   ├── context/            # State management
│   │   ├── AuthContext.tsx
│   │   └── TaskContext.tsx
│   ├── services/           # API integration layer
│   │   ├── api.ts          # Generic API client
│   │   └── taskService.ts  # Task-specific API calls
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   └── navigation/         # Navigation configuration
│       └── AppNavigator.tsx
├── App.tsx                 # Application entry point
├── package.json
├── README.md
└── API_INTEGRATION.md     # API integration documentation
```

## 🛠 Technology Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Navigation library
- **React Context API** - State management
- **Expo Vector Icons** - Icon library
- **JSONPlaceholder API** - REST API for task data

## ✨ Key Features Implementation

### Authentication
- Login screen with validation
- Protected routes using React Navigation
- Context-based authentication state

### API Integration
- RESTful API integration with JSONPlaceholder
- Automatic data fetching on app load
- Optimistic UI updates for instant feedback
- Error handling with graceful fallback to local data
- Pull-to-refresh for manual data sync
- Loading states for all async operations

### Task Management
- Fetch tasks from remote API (20 tasks limit)
- Add new tasks with API persistence
- Mark tasks as completed/incomplete with server sync
- Delete tasks with confirmation and API call
- Real-time task statistics
- Offline fallback with mock data

### UI/UX
- iOS-inspired design system
- Smooth animations using React Native Animated
- Safe area handling for notch devices
- Keyboard-aware inputs
- Empty state UI
- Loading indicators and spinners
- Error banners with clear messaging
- Pull-to-refresh gesture support
- Error handling with user feedback

## 🎨 Design Principles

- **Clean Code** - Well-structured, readable code with TypeScript
- **Component Reusability** - Modular, reusable components
- **Separation of Concerns** - Clear separation between UI, logic, and state
- **Type Safety** - Full TypeScript coverage
- **Responsive Design** - Adapts to different screen sizes

## 📝 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## 🧪 Testing the App

1. **Login Flow**:
   - Launch the app
   - Enter credentials (admin/1234)
   - Verify successful authentication

2. **API Loading**:
   - Watch initial loading state
   - Observe tasks loading from JSONPlaceholder API
   - Check that 20 tasks are displayed

3. **Task Management**:
   - Add a new task using the + button
   - Verify "Adding..." loading state
   - Mark tasks as complete by tapping them
   - Delete tasks using the trash icon
   - Observe task statistics update

4. **Pull to Refresh**:
   - Pull down on the task list
   - Watch loading indicator
   - See data refresh from API

5. **Error Handling**:
   - Test with network disabled
   - Observe fallback to local mock data
   - Check error banner appears

6. **Logout**:
   - Tap the logout icon in the top right
   - Confirm logout
   - Verify return to login screen

## 🎯 Future Enhancements

- [ ] Local storage persistence (AsyncStorage)
- [x] **API integration for remote data** ✅
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Task search and filtering
- [ ] Dark mode support
- [ ] Unit and integration tests
- [ ] Push notifications
- [ ] Offline mode with sync
- [ ] Real backend authentication API

## 📱 Screenshots

The app features:
- Beautiful login screen with credential hints
- Task list with completion status
- Loading state with spinner and text
- Pull-to-refresh gesture
- Error banners for API failures
- Smooth animations and transitions
- Intuitive task management UI

## 📚 Documentation

- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Detailed API integration documentation
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Architecture and design decisions

## 👨‍💻 Author

Built as a demonstration of React Native development skills.

## 📄 License

This project is open source and available under the MIT License.

---

**Note**: This application demonstrates full-stack mobile development skills including API integration, state management, error handling, and modern UI/UX practices. The app uses JSONPlaceholder as a demo API - for production use, connect to your own backend service.

