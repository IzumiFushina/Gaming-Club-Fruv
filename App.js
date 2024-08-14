import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, Alert, Text, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Cadastro() {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
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
      <Image 
        source={avatar ? { uri: avatar } : require('./src/images/hangman.png')} 
        style={styles.avatar} 
      />
      <TouchableOpacity style={styles.avatarButton} onPress={pickImage}>
        <Text style={styles.avatarButtonText}>Trocar Avatar</Text>
      </TouchableOpacity>

      <Text style={styles.inputLabel}>E-mail Address</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        placeholderTextColor="#888"
      />

      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 30,
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
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
