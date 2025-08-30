import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      
      // Try to parse as JSON first
      try {
        return JSON.parse(item);
      } catch (parseError) {
        // If JSON parsing fails, check if it's a simple string value that matches our expected type
        if (typeof initialValue === 'string' && typeof item === 'string') {
          return item as T;
        }
        // For non-string types or unrecognized formats, return initial value
        console.warn(`Could not parse localStorage value for key "${key}", using initial value`);
        return initialValue;
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        // For simple string values, store as-is to maintain backward compatibility
        if (typeof valueToStore === 'string') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } else {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}