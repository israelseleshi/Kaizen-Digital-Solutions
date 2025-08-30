import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Route } from '../components/Router';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface AppState {
  currentRoute: Route;
  user: User | null;
  isAuthenticated: boolean;
  searchQuery: string;
  notifications: Notification[];
  preferences: {
    theme: 'light' | 'dark';
    reducedMotion: boolean;
    language: string;
  };
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

type AppAction =
  | { type: 'SET_ROUTE'; payload: Route }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp' | 'read'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_REDUCED_MOTION'; payload: boolean }
  | { type: 'SET_LANGUAGE'; payload: string };

const initialState: AppState = {
  currentRoute: 'home',
  user: null,
  isAuthenticated: false,
  searchQuery: '',
  notifications: [],
  preferences: {
    theme: 'light',
    reducedMotion: false,
    language: 'en'
  }
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ROUTE':
      return { ...state, currentRoute: action.payload };
    
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload 
      };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          {
            ...action.payload,
            id: Date.now().toString(),
            timestamp: new Date(),
            read: false
          },
          ...state.notifications
        ]
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      };
    
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    
    case 'SET_THEME':
      return {
        ...state,
        preferences: { ...state.preferences, theme: action.payload }
      };
    
    case 'SET_REDUCED_MOTION':
      return {
        ...state,
        preferences: { ...state.preferences, reducedMotion: action.payload }
      };
    
    case 'SET_LANGUAGE':
      return {
        ...state,
        preferences: { ...state.preferences, language: action.payload }
      };
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Convenience functions
  navigate: (route: Route) => void;
  setUser: (user: User | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const navigate = (route: Route) => {
    dispatch({ type: 'SET_ROUTE', payload: route });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  return (
    <AppContext.Provider 
      value={{ 
        state, 
        dispatch, 
        navigate, 
        setUser, 
        addNotification, 
        setSearchQuery 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}