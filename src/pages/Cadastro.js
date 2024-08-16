import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Alert, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
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
      <Animated.View style={[styles.innerContainer, { transform: [{ translateY }] }]}>
        <Image 
          source={avatar ? { uri: avatar } : require('../images/tic-tac-toe.png')} 
          style={styles.avatar} 
        />
        <TouchableOpacity style={styles.avatarButton} onPress={pickImage}>
          <Text style={styles.avatarButtonText}>Trocar Avatar</Text>
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Nickname</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          keyboardType="default"
          placeholderTextColor="#888"
        />
        <Text style={styles.inputLabel}>E-mail adress</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          secureTextEntry={true}
          placeholderTextColor="#888"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          placeholderTextColor="#888"
        />

        <TouchableOpacity
          style={styles.cdsButton}
          onPress={() => Alert.alert('Cadastro Iniciado')}
        >
          <Text style={styles.cdsButtonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6447D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  innerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    alignItems: 'center', // Centraliza os itens dentro da View
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },

  avatarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    marginLeft: 10,
  },

  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 15,
  },

  cdsButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    marginTop: 20,
  },

  cdsButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
