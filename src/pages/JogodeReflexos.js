import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function JogodeReflexos() {
  const [gameState, setGameState] = useState('waiting'); // Estados: 'waiting', 'ready', 'react'
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  // Função para iniciar o jogo
  const startGame = () => {
    setGameState('waiting');
    setReactionTime(null);

    const randomDelay = Math.floor(Math.random() * 5000) + 2000; // Tempo aleatório entre 2 e 7 segundos

    const id = setTimeout(() => {
      setGameState('ready');
      setStartTime(new Date().getTime());
    }, randomDelay);

    setTimeoutId(id);
  };

  // Função para detectar o toque na tela
  const handlePress = () => {
    if (gameState === 'waiting') {
      clearTimeout(timeoutId);
      Alert.alert('Muito cedo!', 'Espere a cor mudar.');
    } else if (gameState === 'ready') {
      const endTime = new Date().getTime();
      setReactionTime(endTime - startTime);
      setGameState('react');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.gameArea,
          { backgroundColor: gameState === 'ready' ? 'green' : 'red' }
        ]}
        onPress={handlePress}
      >
        {gameState === 'waiting' && <Text style={styles.text}>Aguarde...</Text>}
        {gameState === 'ready' && <Text style={styles.text}>Toque agora!</Text>}
        {reactionTime !== null && (
          <Text style={styles.reactionTime}>
            Seu tempo de reação: {reactionTime} ms
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={startGame}>
        <Text style={styles.buttonText}>Iniciar Jogo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  gameArea: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  reactionTime: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#8f7a66',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
