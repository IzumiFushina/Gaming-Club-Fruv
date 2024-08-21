import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importa as páginas do aplicativo
import Login from "./src/pages/Login";
import Cadastro from "./src/pages/Cadastro";

// Importa a função useFonts da biblioteca expo-font para carregar fontes personalizadas
import { useFonts } from "expo-font";

// Cria uma instância do Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {

const [fontsLoaded] = useFonts({
    Font1: require("./src/assets/Fonts/DMSerifDisplay-Regular.ttf"),
    Font2: require("./src/assets/Fonts/AlfaSlabOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
  
    <NavigationContainer>
      <Drawer.Navigator>
        {/* Define a tela "Login" no drawer */}
        <Drawer.Screen name="Login" component={Login} />
        {/* Define a tela "Cadastro" no drawer */}
        <Drawer.Screen name="Cadastro" component={Cadastro} />
        {/* Define a tela "Carrinho" no drawer */}
      </Drawer.Navigator>
    </NavigationContainer>


  );
}