import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Alert, Text, TextInput, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Cadastro() {
  const [avatar, setAvatar] = useState(null);
  const translateY = useRef(new Animated.Value(50)).current; // Valor inicial abaixo da tela

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
        source={require('../images/fundo.png')} 
        style={styles.background} 
        
      >
      <View style={styles.viewCds}>
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
    flex: 1, // Use flex to make sure the background covers the whole view
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
    backgroundColor: '#4B0082',
    color: 'white', // Added color to make text visible on dark background
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
    color: 'white', // Ensure button text is visible
    fontSize: 16,
  },

  viewCds: {
   height: '75%',
   width: '90%',
   marginBottom: 120,
   backgroundColor: 'white',
   borderRadius: 10,
   alignItems: 'center',
   justifyContent: 'center',
  },

});
