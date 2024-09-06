import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Pega as dimensões da tela
const CIRCLE_SIZE = 80; // Tamanho do círculo

export default function JogoCirculo() {
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 }); // Posição do círculo
  const [score, setScore] = useState(0); // Pontuação do jogador
  const [timeRemaining, setTimeRemaining] = useState(30); // Tempo restante
  const [isPlaying, setIsPlaying] = useState(false); // Controle de jogo em andamento

  // Função para iniciar o jogo
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeRemaining(30); // Jogo dura 30 segundos
    moveCircle(); // Move o círculo para a primeira posição aleatória
  };

  // Movimenta o círculo para uma nova posição aleatória na tela
  const moveCircle = () => {
    const x = Math.random() * (width - CIRCLE_SIZE);
    const y = Math.random() * (height - CIRCLE_SIZE - 100); // Menos 100 para não ficar muito no final da tela
    setCirclePosition({ x, y });
  };

  // Função chamada quando o jogador toca no círculo
  const handleCirclePress = () => {
    setScore(score + 1); // Aumenta a pontuação
    moveCircle(); // Move o círculo para uma nova posição
  };

  // Função para contar o tempo decrescente
  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeRemaining === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeRemaining]);

  return (
    <View style={styles.container}>
      {isPlaying ? (
        <>
          <Text style={styles.score}>Pontuação: {score}</Text>
          <Text style={styles.timer}>Tempo restante: {timeRemaining}</Text>
          <TouchableOpacity
            onPress={handleCirclePress}
            style={[styles.circle, { left: circlePosition.x, top: circlePosition.y }]}
          />
        </>
      ) : (
        <View>
          <Text style={styles.title}>Tap the Circle</Text>
          <TouchableOpacity onPress={startGame} style={styles.startButton}>
            <Text style={styles.startButtonText}>Iniciar Jogo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
  },
  score: {
    fontSize: 24,
    color: '#fff',
    position: 'absolute',
    top: 50,
  },
  timer: {
    fontSize: 20,
    color: '#fff',
    position: 'absolute',
    top: 90,
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'red',
  },
  startButton: {
    backgroundColor: '#61dafb',
    padding: 20,
    borderRadius: 10,
  },
  startButtonText: {
    color: '#282c34',
    fontSize: 18,
  },
});
