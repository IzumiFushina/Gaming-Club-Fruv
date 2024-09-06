import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//IMPORTANDO PÁGINAS
import Cadastro from "../pages/Cadastro";
import CampoMinado from "../pages/CampoMinado"
import JogodaCobrinha from "../pages/JogodaCobrinha"
import JogoDaMemoria from "../pages/JogoDaMemoria"
import Login from "../pages/Login"
import LoginScreen from "../pages/LoginScreen";
import Game2048 from "../pages/Game2048";
import JogodeReflexos from "../pages/JogodeReflexos";
import PingPong from "../pages/PingPong";
import FlappyBird from "../pages/flappybird";

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
        <Tab.Screen name="PingPong " component={PingPong} />
        <Tab.Screen name="JogodeReflexos " component={JogodeReflexos} />
        <Tab.Screen name="Game2048 " component={Game2048} />
        <Tab.Screen name="LoginScreen " component={LoginScreen} />
        <Tab.Screen name="FlappyBird " component={FlappyBird} />
      </Tab.Navigator>
      </NavigationContainer>
    
  );
}