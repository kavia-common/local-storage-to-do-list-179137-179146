import { useEffect, useState, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * useLocalStorage - React hook to persist and sync state with localStorage
 * This hook safely handles JSON serialization/deserialization and supports an optional debounce interval.
 *
 * @param {string} key - The localStorage key to use.
 * @param {any} initialValue - Initial value if nothing is stored.
 * @param {number} debounceMs - Optional debounce in ms for writes (default 0 means immediate).
 * @returns {[any, Function, Function]} - [value, setValue, clearValue]
 */
export function useLocalStorage(key, initialValue, debounceMs = 0) {
  // Initialize from localStorage once
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item != null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Track mounted to avoid writing before first paint unnecessarily
  const mountedRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Persist changes to localStorage
  useEffect(() => {
    if (!mountedRef.current) return;

    const write = () => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Swallow write errors to avoid breaking the app (e.g., storage full)
      }
    };

    if (debounceMs > 0) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(write, debounceMs);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    } else {
      write();
    }
  }, [key, value, debounceMs]);

  // PUBLIC_INTERFACE
  const clearValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setValue(initialValue);
  };

  return [value, setValue, clearValue];
}
