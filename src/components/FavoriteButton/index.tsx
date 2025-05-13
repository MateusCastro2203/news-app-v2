import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavoriteStore } from "@/store/favoriteStore";
import { NewsResult } from "@/store/types/news.types";
import { styles } from "./styles";

interface FavoriteButtonProps {
  article: NewsResult;
  size?: number;
  style?: object;
}

export function FavoriteButton({
  article,
  size = 24,
  style,
}: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useFavoriteStore();
  const isFavorited = isFavorite(article.id);

  const toggleFavorite = () => {
    console.log("isFavorited", article.id, isFavorited);
    if (isFavorited) {
      removeFromFavorites(article.id);
    } else {
      addToFavorites(article);
    }
  };

  return (
    <TouchableOpacity onPress={toggleFavorite} style={[styles.button, style]}>
      <Ionicons
        name={isFavorited ? "heart-circle" : "heart-circle-outline"}
        size={size}
        color={isFavorited ? "#ef4444" : "#6b7280"}
      />
    </TouchableOpacity>
  );
}
