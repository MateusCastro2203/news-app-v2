import React from "react";
import { TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavoriteStore } from "@/store/favoriteStore"; // Ajuste o caminho conforme necessário

export const ResetFavoritesButton = () => {
  // Assume que você tem uma função clearFavorites no store
  const { clearFavorites } = useFavoriteStore();

  const handleResetFavorites = () => {
    Alert.alert(
      "Limpar favoritos",
      "Tem certeza que deseja remover todas as notícias dos favoritos?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Limpar",
          onPress: () => {
            clearFavorites();
            // Opcional: adicione um feedback para o usuário
            Alert.alert("Sucesso", "Todos os favoritos foram removidos");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleResetFavorites}>
      <Ionicons name="trash-outline" size={18} color="#fff" />
      <Text style={styles.buttonText}>Limpar Favoritos</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e74c3c",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
