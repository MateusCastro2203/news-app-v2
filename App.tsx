import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { useOnboardingStore } from "./src/store/onboarding";
import { AppNavigator } from "@/navigation/AppNavigator";
import { useToast } from "@/hooks/useToast";
import { Toast } from "@/components/Toast";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

// Componente separado que usa o hook useTheme
const AppContent = ({ isFirstTime, toastProps }) => {
  // Agora useTheme é seguro porque está dentro do ThemeProvider
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? "#111827" : "#f1f5f9",
      }}
    >
      <NavigationContainer>
        <StatusBar style={isDarkTheme ? "light" : "dark"} />
        {isFirstTime ? <OnboardingScreen /> : <AppNavigator />}
        {toastProps.isVisible && (
          <Toast
            message={toastProps.message}
            type={toastProps.type}
            onHide={toastProps.hideToast}
          />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default function App() {
  const isFirstTime = useOnboardingStore((state) => state.isFirstTime);
  const toastProps = useToast();

  return (
    <ThemeProvider>
      <AppContent isFirstTime={isFirstTime} toastProps={toastProps} />
    </ThemeProvider>
  );
}
