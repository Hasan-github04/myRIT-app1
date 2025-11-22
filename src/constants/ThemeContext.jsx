/* eslint-disable react-refresh/only-export-components */
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import Colors from "./colors";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState("system");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("theme-mode").then((saved) => {
      if (saved) {
        setMode(saved);
      }
      setIsLoaded(true);
    });
  }, []);

  const setThemeMode = useCallback(async (newMode) => {
    setMode(newMode);
    await AsyncStorage.setItem("theme-mode", newMode);
  }, []);

  const activeTheme =
    mode === "system"
      ? systemColorScheme === "dark"
        ? "dark"
        : "light"
      : mode;

  const colors = Colors[activeTheme];

  const value = useMemo(
    () => ({
      mode,
      activeTheme,
      colors,
      setThemeMode,
      isLoaded,
    }),
    [mode, activeTheme, colors, setThemeMode, isLoaded],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}