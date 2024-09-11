import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, Image } from "react-native";

// IMPORTANDO PÁGINAS
import Cadastro from "../pages/Cadastro";
import CampoMinado from "../pages/CampoMinado";
import JogodaCobrinha from "../pages/JogodaCobrinha";
import JogoDaMemoria from "../pages/JogoDaMemoria";
import Login from "../pages/Login";
import Game2048 from "../pages/Game2048";
import JogodeReflexos from "../pages/JogodeReflexos";
import FlappyBird from "../pages/flappybird";
import Quiz from "../pages/Quiz";
import CaçaTesouros from "../pages/CaçaTesouros";
import Labirinto from "../pages/Labirinto";
import JogoMat from "../pages/JogoMat";
import GradientPage from "../pages/Catalogo";

const Drawer = createDrawerNavigator();

// Função de conteúdo personalizado do Drawer
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, alignItems: 'center' }}>
      <Image
          source={require("../images/avatar.png")}
          style={{ width: 65, height: 65 }}
        />
        <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 16 }}>Nome do Usuário</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Index() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Login" component={Login} />       
        <Drawer.Screen name="Cadastro" component={Cadastro} /> 
        <Drawer.Screen name="CampoMinado" component={CampoMinado} /> 
        <Drawer.Screen name="Gradiente" component={GradientPage} /> 
        <Drawer.Screen name="JogodaCobrinha" component={JogodaCobrinha} />
        <Drawer.Screen name="JogoDaMemoria" component={JogoDaMemoria} />
        <Drawer.Screen name="Game2048" component={Game2048} />
        <Drawer.Screen name="JogodeReflexos" component={JogodeReflexos} />
        <Drawer.Screen name="FlappyBird" component={FlappyBird} />
        <Drawer.Screen name="Quiz" component={Quiz} />
        <Drawer.Screen name="CaçaTesouros" component={CaçaTesouros} />
        <Drawer.Screen name="Labirinto" component={Labirinto} />
        <Drawer.Screen name="JogoMat" component={JogoMat} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
