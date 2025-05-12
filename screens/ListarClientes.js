// ListarClientes.js
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function ListarClientes({ route }) {
  const { clientes } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>Cédula: {item.nuevacedula}</Text>
      <Text style={styles.text}>Nombres: {item.nuevosnombres}</Text>
      <Text style={styles.text}>Apellidos: {item.nuevosapellidos}</Text>
      <Text style={styles.text}>Fecha de Nacimiento: {item.nuevafechanac}</Text>
      <Text style={styles.text}>Sexo: {item.nuevosexo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f3e3",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#c6e8c6",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 15,
    marginBottom: 4,
  },
});
