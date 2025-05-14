import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrarCliente from "./screens/RegistrarCliente";
import ListarClientes from "./screens/ListarClientes";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListarClientes">
        <Stack.Screen name="ListarClientes" component={ListarClientes} />
        <Stack.Screen name="RegistrarCliente" component={RegistrarCliente} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
