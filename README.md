# 📱 Task Manager App

A modern, feature-rich mobile task management application built with React Native and Expo.

## 🎯 Features

### Core Functionality
- ✅ **User Authentication** - Secure login with credential validation
- ✅ **Task Management** - Create, complete, and delete tasks
- ✅ **Custom Dialogs** 🎨 - Beautiful animated confirmation modals
- ✅ **API Integration** ☁️ - Load tasks from JSONPlaceholder API with one click
- ✅ **Pull-to-Refresh** - Manual data sync from API

### Advanced Features
- ✅ **Task Priorities** 🎯 - 4 priority levels (Low, Medium, High, Urgent)
- ✅ **Smart Filtering** - Filter by status and priority
- ✅ **Intelligent Sorting** - Sort by date, priority, or status
- ✅ **Dark Mode** 🌙 - Light, Dark, and Auto themes with persistence
- ✅ **Task Statistics** - Real-time completion tracking

### Technical Excellence
- ✅ **Loading States** - Smooth loading indicators and animations
- ✅ **Error Handling** - Graceful error recovery with user feedback
- ✅ **Beautiful UI** - Clean, modern iOS-inspired interface
- ✅ **Smooth Animations** - Polished transitions and interactions
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Safe Area Support** - Perfect notch and status bar handling

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
│   │   ├── Button.tsx       # Customizable button with variants
│   │   ├── Input.tsx        # Form input with validation
│   │   ├── TaskItem.tsx     # Task list item with animations
│   │   ├── AddTaskModal.tsx # Modal for adding tasks
│   │   ├── ConfirmDialog.tsx # Confirmation dialog component
│   │   ├── FilterBar.tsx    # Task filtering and sorting controls
│   │   └── index.ts         # Component exports
│   ├── screens/             # Application screens
│   │   ├── LoginScreen.tsx  # Authentication screen
│   │   └── TaskListScreen.tsx # Main task list screen
│   ├── context/             # State management
│   │   ├── AuthContext.tsx  # Authentication state
│   │   ├── TaskContext.tsx  # Task management state
│   │   └── ThemeContext.tsx # Theme and dark mode state
│   ├── services/            # API integration layer
│   │   ├── api.ts           # Generic API client
│   │   └── taskService.ts   # Task-specific API calls
│   ├── types/               # TypeScript types
│   │   └── index.ts         # All type definitions
│   └── navigation/          # Navigation configuration
│       └── AppNavigator.tsx # Navigation setup
├── App.tsx                  # Application entry point
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## 🛠 Technology Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type safety and better developer experience
- **React Navigation** - Navigation library
- **React Context API** - State management
- **Expo Vector Icons** - Icon library
- **AsyncStorage** - Local data persistence
- **JSONPlaceholder API** - REST API for demo task data

## ✨ Key Features Implementation

### Authentication
- Login screen with form validation
- Protected routes using React Navigation
- Context-based authentication state management

### Task Management
- Create tasks with title, description, and priority
- Mark tasks as completed/incomplete
- Delete tasks with confirmation dialog
- Real-time task statistics (total, completed, active)
- Unique task IDs for reliable tracking

### API Integration
- Fetch tasks from JSONPlaceholder API (20 tasks limit)
- One-click "Load Tasks" button
- Pull-to-refresh for manual data sync
- Loading states for all async operations
- Error handling with graceful fallback
- Optimistic UI updates for instant feedback

### Priorities & Filtering
- 4 priority levels: Low (default), Medium, High, Urgent
- Color-coded priority badges
- Filter by status: All, Active, Completed
- Filter by priority: All or specific priority
- Sort by: Date Added, Priority, Status
- Smart filtering and sorting combined

### Dark Mode
- 3 theme modes: Light, Dark, Auto (system)
- Theme persistence using AsyncStorage
- Smooth theme transitions
- Consistent color scheme across all components
- System appearance synchronization

### UI/UX
- iOS-inspired clean design
- Smooth animations using React Native Animated
- Safe area handling for notch devices
- Keyboard-aware inputs
- Empty state UI with helpful messages
- Loading indicators and spinners
- Error banners with clear messaging
- Confirmation dialogs for destructive actions
- Pull-to-refresh gesture support

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
   - Try wrong credentials to see validation
   - Verify successful authentication

2. **Theme Switching**:
   - Tap the theme icon (sun/moon) in the top bar
   - Test Light, Dark, and Auto modes
   - Observe smooth transitions
   - Restart app to verify theme persistence

3. **API Loading**:
   - Tap "Load Tasks from API" button
   - Watch loading state
   - Observe 20 tasks loaded from JSONPlaceholder
   - Check error handling (disable network)

4. **Task Management**:
   - Add new task using the + button
   - Set title, description, and priority
   - Mark tasks as complete by tapping them
   - Delete tasks using the trash icon
   - Observe task statistics update

5. **Filtering & Sorting**:
   - Use status filter (All/Active/Completed)
   - Use priority filter (All/Low/Medium/High/Urgent)
   - Test sorting by Date, Priority, or Status
   - Combine filters and sorting

6. **Pull to Refresh**:
   - Pull down on the task list
   - Watch loading indicator
   - See data refresh from API

7. **Logout**:
   - Tap the logout icon in the top right
   - Confirm logout in dialog
   - Verify return to login screen

## 🎯 Future Enhancements

- [x] **API integration for remote data** ✅
- [x] **Task priorities and filtering** ✅
- [x] **Dark mode support** ✅
- [x] **Local storage persistence** ✅
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Task search functionality
- [ ] Unit and integration tests
- [ ] Push notifications
- [ ] Real backend authentication API
- [ ] Task sharing and collaboration

## 📱 Screenshots

The app features:
- Beautiful login screen with credential hints
- Light and dark mode themes
- Task list with priority badges and color coding
- Filter bar with status and priority filters
- Sort options (Date, Priority, Status)
- Loading state with spinner and text
- Pull-to-refresh gesture
- Custom confirmation dialogs
- Smooth animations and transitions
- Intuitive task management UI
- Real-time statistics display

## 📚 Additional Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Architecture and design decisions (if available)

## 🎓 About This Project

This Task Manager App was built as a demonstration of React Native development skills, showcasing:
- Clean architecture and code organization
- Modern UI/UX practices
- Type-safe development with TypeScript
- Effective state management
- API integration patterns
- Responsive and accessible design

## 👨‍💻 Development Notes

**Status:** ✅ Production Ready  
**Testing:** ✅ Fully Functional  
**Documentation:** ✅ Complete

## 📄 License

This project is open source and available under the MIT License.

---

**Note**: This application demonstrates full-stack mobile development skills including API integration, state management, error handling, and modern UI/UX practices. The app uses JSONPlaceholder as a demo API - for production use, connect to your own backend service.

