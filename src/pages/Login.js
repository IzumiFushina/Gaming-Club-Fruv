import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Alert, Text, TextInput, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';


export default function Login() {
  const [avatar, setAvatar] = useState(null);
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0, 
      duration: 1000, 
      useNativeDriver: true,
    }).start();

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
        source={require('../images/foto12.png')} 
        style={styles.background} 
      >
        <Animated.View style={[styles.shadowCard, { transform: [{ translateY }] }]} />
        <Animated.View style={[styles.viewCds, { transform: [{ translateY }] }]}>
          <ImageBackground
              source={require('../images/foto10.png')} 
            style={styles.cardBackground}
          >
            <TouchableOpacity style={styles.closeIcon}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>

            <Image 
              source={avatar ? { uri: avatar } : require('../images/foto13.png')}
              style={styles.avatar} 
            />
         

            <Animated.View style={{ transform: [{ translateY }] }}>
            <Text>Nickname:</Text>
              <View style={styles.inputContainer}>
                <AntDesign name="user" size={24} color="black" style={styles.iconStyle} />
                <TextInput
                  style={styles.InputName}
                  placeholder="Nickname:"
                  placeholderTextColor="gray"
                />
              </View>
             
              <Text>Senha:</Text>
              <View style={styles.inputContainer}>
              <AntDesign name="staro" size={24} color="black" />
              <TextInput
                style={styles.InputName}
                placeholder="Senha:"
                secureTextEntry={true}
              />
              </View>
            

   {/* Ícones do Facebook alinhados lado a lado */}
   <View style={styles.iconRow}>
    <TouchableOpacity style={styles.facebookeInstaIcon}>
      <Entypo name="facebook-with-circle" size={27} color="black" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.facebookeInstaIcon}>
    <Entypo name="instagram-with-circle" size={27} color="black" />
    </TouchableOpacity>
  </View>

              <TouchableOpacity
                style={styles.BtnCadastro}
                onPress={() => Alert.alert('Cadastro Iniciado')}
              >
                <Text style={styles.cdsButtonText}>Login</Text>
            
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
    padding: 0,
    margin: 0,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',  
    marginVertical: 20, 
  },
  facebookeInstaIcon: {
    marginHorizontal: 10, 
  },
  
  
  closeIcon: {
    position: 'absolute',
    top: "1%",
    right: "5%",
    
  },
  avatar: {
    width: "24%",
    height: "20%",
    borderRadius: 90,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  avatarButton: {
    backgroundColor: '#fadb42',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    alignSelf: 'center',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 6,
    flexDirection: 'row',
    justifyContent: 'center',
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
    borderRadius: 25,
    overflow: 'hidden', 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  InputName: {
    width: 260,
    height: 35,
    color: 'black',
    paddingHorizontal: 12,
  },
  BtnCadastro: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 100,
    marginTop: 20,
    backgroundColor: "#fadb42",
    borderRadius: 8,
    shadowColor: "#000",
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

  },
  viewCds: {
    height: '60%',
    width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: 'absolute',
    top: "5%",
    left: "4%",
    borderWidth: 2.5,
    borderColor: 'black',
    borderRadius: 25,
    overflow: 'hidden',
  },
  shadowCard: {
    position: 'absolute',
    height: '60%',
    width: '90%',
    backgroundColor: '#ffed95',
    borderColor: "black",
    borderWidth: 2.5,
    top: "7%",
    left: "7%",
    borderRadius: 20,
  },
});
