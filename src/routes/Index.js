import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//IMPORTANDO PÁGINAS
import Cadastro from "../pages/Cadastro";
import CampoMinado from "../pages/CampoMinado"
import JogodaCobrinha from "../pages/JogodaCobrinha"
import JogoDaMemoria from "../pages/JogoDaMemoria"
import Login from "../pages/Login"
import LoginScreen from "../pages/LoginScreen";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Cadastro " component={Cadastro} />
        <Tab.Screen name="CampoMinado " component={CampoMinado} />
        <Tab.Screen name="JogodaCobrinha " component={JogodaCobrinha} />
        <Tab.Screen name="JogoDaMemoria " component={JogoDaMemoria} />
        <Tab.Screen name="Login " component={Login} />
        <Tab.Screen name="LoginScreen " component={LoginScreen} />
      </Tab.Navigator>
      </NavigationContainer>
    
  );
}