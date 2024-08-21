import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Cadastro() {
  const translateY = useRef(new Animated.Value(50)).current; // Valor inicial abaixo da tela

  useEffect(() => {
    // Animação de subida ao carregar a página
    Animated.timing(translateY, {
      toValue: 0, 
      duration: 1000, 
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e0059', '#5c1d99']}
        style={styles.background1}
      />
      
      <Animated.View style={[styles.innerContainer, { transform: [{ translateY }] }]}>
        <Text style={styles.headerText}>Login</Text>
        <View style={styles.card}>
          <LinearGradient
            colors={['#ff5858', '#ff1e56']}
            style={styles.cardBackground}
          >
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#fff"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#fff"
              secureTextEntry
            />
          </LinearGradient>
        </View>

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
    backgroundColor: '#1c003a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  background1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },

  innerContainer: {
    width: '90%',
    backgroundColor: '#2b0064',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },

  headerText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },

  card: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff1e56',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  cdsButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#ff1e56',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 20,
  },

  cdsButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
