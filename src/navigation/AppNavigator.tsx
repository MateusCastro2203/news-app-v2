import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { NewsDetailsScreen } from "../screens/NewsDetails/NewsDetailsScreen";
import { PreferencesComponent } from "../screens/Home/components";
import { NewsResult } from "@/store/types/news.types";
import { FavoritesScreen } from "@/screens/FavoritesNews/FavoritesScreen";
import { FilterNewsResultScreen } from "@/screens/FilterNewsResult/FilterNewsResultScreen";
import { OfflineContentScreen } from "@/screens/OfflineContent/OfflineContentScreen";
import { DrawerContent } from "@/components/DrawerContent";
import { useTheme } from "@/contexts/ThemeContext";

// Tipos para a navegação
export type RootStackParamList = {
  Voltar: undefined;
  NewsDetails: { article: NewsResult };
};

export type RootDrawerParamList = {
  Home: undefined;
  Favorites: undefined;
  Settings: undefined;
  OfflineContent: undefined;
  FilterNewsResult: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function DrawerNavigator() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: true,
        drawerType: "front",
        drawerStyle: {
          width: "75%",
          backgroundColor: isDarkTheme ? "#111827" : "#f1f5f9",
        },
        headerStyle: {
          backgroundColor: isDarkTheme ? "#111827" : "#f1f5f9",
        },
        headerTintColor: isDarkTheme ? "#f1f5f9" : "#000000",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "News App",
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="FilterNewsResult"
        component={FilterNewsResultScreen}
        options={{
          title: "Resultados da Pesquisa",
          headerTransparent: false,
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favoritos",
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={PreferencesComponent}
        options={{
          title: "Configurações",
        }}
      />
      {/* <Drawer.Screen
        name="OfflineContent"
        component={OfflineContentScreen}
        options={{
          title: "Notícias Baixadas",
        }}
      /> */}
    </Drawer.Navigator>
  );
}

export const AppNavigator = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkTheme ? "#111827" : "#f1f5f9",
        },
        headerTintColor: isDarkTheme ? "#f1f5f9" : "#000000",
      }}
    >
      <Stack.Screen
        name="Voltar"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={{
          title: "Detalhes",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
