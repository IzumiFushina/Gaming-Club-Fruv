import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Alert, Text, TextInput, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Login() {
  const [avatar, setAvatar] = useState(null);
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animação de subida ao carregar a página
    Animated.timing(translateY, {
      toValue: 0, 
      duration: 1000, 
      useNativeDriver: true,
    }).start();

    // Pedir permissão para acessar a galeria de fotos
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a galeria de fotos!');
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Houve um problema ao tentar acessar a galeria.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../images/foto.png')} 
        style={styles.background} 
      >
        
        {/* Card de Sombra */}
        
        <View style={styles.shadowCard}></View>
                {/* Card Principal */}
        <View style={styles.viewCds}>
           <Animated.View style={[styles.viewCds, { transform: [{ translateY }] }]}>
          <Image 
            source={avatar ? { uri: avatar } : require('../images/image.png')} 
            style={styles.avatar} 
          />
          <TouchableOpacity style={styles.avatarButton} onPress={pickImage}>
            <Text style={styles.avatarButtonText}>Trocar Avatar</Text>
          </TouchableOpacity>
          
          <TextInput
            style={styles.InputName}
            placeholder="Nickname"
          />
          <TextInput
            style={styles.InputName}
            placeholder="E-mail"
          />
          <TextInput
            style={styles.InputName}
            placeholder="Senha"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.InputName}
            placeholder="Repita sua senha"
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.BtnCadastro}
            onPress={() => Alert.alert('Cadastro Iniciado')}
          >
            <Text style={styles.cdsButtonText}>Get Started</Text>
          </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },

  avatarButton: {
    backgroundColor: '#652E79',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },

  avatarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },

  InputName: {
    width: 300,
    height: 50,
    margin: 5,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: '#fff',
    color: 'black',
    paddingHorizontal: 10,
  },

  BtnCadastro: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 280,
    marginTop: 30,
    backgroundColor: "#4B0082",
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: "black",
  },

  cdsButtonText: {
    color: 'white',
    fontSize: 16,
  },

  viewCds: {
    height: '80%',
    width: '90%',
    backgroundColor: 'yellow', // Cor sólida amarela
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2, // Card principal, na frente da sombra
    position: 'absolute', // Para sobrepor com o card de sombra
    top: 200, // Ajuste vertical
    left: 15, // Ajuste horizontal para sobrepor ligeiramente
  },

  shadowCard: {
    position: 'absolute',
    height: '80%',
    width: '90%',
    backgroundColor: 'black', // Cor de sombra preta
    borderRadius: 10,
    top: 210,  // Deslocamento para simular a sombra (mais abaixo)
    left: 25,  // Deslocamento lateral para simular a sombra (mais à direita)
    zIndex: 1,  // Fica atrás do card principal
    opacity: 0.5, // Transparência para efeito de sombra
  }
});
