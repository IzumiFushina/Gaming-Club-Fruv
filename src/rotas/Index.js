import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login " component={Login} />
        <Tab.Screen name="Cadastro" component={Cadastro} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}