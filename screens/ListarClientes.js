import { useEffect, useState, useCallback } from "react";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TextInput } from "react-native";

import {
  collection,
  getFirestore,
  query,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import appFirebase from "../BaseDatos/FireBase";
import { useFocusEffect } from "@react-navigation/native";

const db = getFirestore(appFirebase);

export default function ListarClientes({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  const buscarCliente = (texto) => {
    setSearchTerm(texto);
    if (texto.trim() === "") {
      setClientesFiltrados(clientes);
      return;
    }

    const resultados = clientes.filter(cliente => {
      const textoLower = texto.toLowerCase();
      return (
        cliente.cedula.toLowerCase().includes(textoLower) ||
        cliente.nombres.toLowerCase().includes(textoLower) ||
        cliente.apellidos.toLowerCase().includes(textoLower) ||
        cliente.fechaNacimiento.toLowerCase().includes(textoLower) ||
        cliente.sexo.toLowerCase().includes(textoLower)
      );
    });

    setClientesFiltrados(resultados);
  };

  const LeerDatos = async () => {
    const q = query(collection(db, "clientes"));
    const querySnapshot = await getDocs(q);
    const d = [];
    querySnapshot.forEach((doc) => {
      const datosBD = doc.data();
      d.push(datosBD);
    });
    setClientes(d);
  };
const cargarClientes = async () => {
      const q = query(collection(db, "clientes"));
      const querySnapshot = await getDocs(q);
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push(doc.data());
      });
      setClientes(lista);
      setClientesFiltrados(lista); 
    };
  useFocusEffect(
    useCallback(() => {
    cargarClientes();
    
  }, []));

  const guardarNuevo = async (nuevo) => {
    await setDoc(doc(db, "clientes", nuevo.cedula), nuevo);
    
  };
  const Eliminar = (cedula) => {
    Alert.alert(
      "Confirmar eliminacion",
      "Estas seguro que deseas eliminar el reguistro?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await deleteDoc(doc(db, "clientes", cedula));
            await cargarClientes();
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.cbotontitulo}>
        <Text style={styles.title}>Lista de Clientes</Text>
        <View>
          <TouchableOpacity
            style={styles.boton}
            onPress={() =>
              navigation.navigate("RegistrarCliente", { guardarNuevo })
            }
          >
            <AntDesign name="adduser" size={30} color="green" />
          </TouchableOpacity>
        </View>
        
      </View>
      <TextInput
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
            borderColor: "#ccc",
            borderWidth: 1,
            marginBottom: 15,
          }}
          inputMode="text"
          placeholder="Buscar por cédula, nombre, sexo, etc..."
          value={searchTerm}
          onChangeText={buscarCliente}
        />
      {clientes.length === 0 ? (
        <View style={styles.card}>
          <Text> No hay clientes registrados.</Text>
        </View>
      ) : (
        <ScrollView style={styles.lista}>
          {clientesFiltrados.map((i, index) => (
            <View key={index} style={styles.card}>
              <View>
                <Text style={styles.label}>
                  Cédula:<Text>{i.cedula}</Text>{" "}
                </Text>
                <Text style={styles.label}>
                  Nombres:<Text>{i.nombres}</Text>{" "}
                </Text>
                <Text style={styles.label}>
                  Apellidos:<Text>{i.apellidos}</Text>{" "}
                </Text>
                <Text style={styles.label}>
                  Fecha de nacimiento:<Text> {i.fechaNacimiento}</Text>
                </Text>
                <Text style={styles.label}>
                  Sexo:<Text>{i.sexo}</Text>{" "}
                </Text>
              </View>
              <View style={styles.botoneliminar}>
                <TouchableOpacity onPress={() => Eliminar(i.cedula)}>
                  <MaterialIcons name="delete" size={40} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("RegistrarCliente", {
                      guardarNuevo,
                      clienteEditar: i,
                    })
                  }
                >
                  <MaterialIcons name="edit" size={40} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f3e3",
    padding: 20,
  },
  card: {
    backgroundColor: "#b2fab4",
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    marginTop: 5,
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
  cbotontitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boton: {
    backgroundColor: "#ccffcc",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "green",
  },
  botoneliminar: {
    marginLeft: "auto",
    marginRight: 10,
    width: 50,
    height: 50,
  },
});
