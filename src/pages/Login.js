import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Alert, Text, TextInput, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';

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
        source={require('../images/foto4.png')} 
        style={styles.background} 
      >
        {/* Card de Sombra */}
        <Animated.View style={[styles.shadowCard, { transform: [{ translateY }] }]} />
        
        {/* Card Principal */}
        <Animated.View style={[styles.viewCds, { transform: [{ translateY }] }]}>
          {/* Fundo da imagem dentro do card */}
          <ImageBackground
            source={avatar ? { uri: avatar } : require('../images/foto10.png')} 
            style={styles.cardBackground}
          >
            {/* Ícone no canto superior direito */}
            <TouchableOpacity style={styles.closeIcon}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
  
            {/* Inputs e Botões na frente da imagem */}
            <Image 
              source={require('../images/foto3.png')} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.avatarButton} onPress={pickImage}>
              <Text style={styles.avatarButtonText}>Trocar Avatar</Text>
            </TouchableOpacity>
            
            {/* Inputs animados */}
            <Animated.View style={{ transform: [{ translateY }] }}>
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
          </ImageBackground>
        </Animated.View>
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
  closeIcon: {
    position: 'absolute',
    top: 10,   
    right: 10, 
    zIndex: 3, 
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#000',
  },

  avatarButton: {
    backgroundColor: '#fadb42', // Cor mais elegante
    paddingVertical: 12, // Aumentando um pouco o tamanho vertical
    paddingHorizontal: 20,
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 8, // Leve arredondamento
    shadowColor: "#000", // Sombra mais suave
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 6,
    flexDirection: 'row', // Para alinhar o texto com ícones se adicionados
    justifyContent: 'center', // Centralizando o conteúdo
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

  cardBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 50,
    width: "70%",
    marginTop: 20,
    backgroundColor: "#fadb42", // Cor elegante do botão com gradiente

    borderRadius: 8, // Leve arredondamento
    shadowColor: "#000", // Sombra suave
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 6,
  },

  cdsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1, // Adicionando espaçamento entre as letras
  },

  viewCds: {
    height: '65%',
    width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Para permitir que a imagem de fundo seja visível
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2, 
    position: 'absolute', 
    top: 200, 
    left: 15,
    borderWidth: 2, 
    borderColor: 'black', 
  },

  shadowCard: {
    position: 'absolute',
    height: '65%',
    width: '90%',
    backgroundColor: '#ffed95',
    borderColor: "black",
    borderWidth: 2,
    top: 210,  
    left: 25,
    zIndex: 1,
  }
});
