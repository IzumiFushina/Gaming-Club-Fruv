import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Alert, TouchableWithoutFeedback } from 'react-native';

const { width, height } = Dimensions.get('window');
const BIRD_SIZE = 50;
const PIPE_WIDTH = 80;
const PIPE_HEIGHT = 300;
const PIPE_GAP = 150;
const GRAVITY = 0.5;
const FLY_SPEED = -8;
const PIPE_SPEED = 4;

const FlappyBird = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  const birdRef = useRef(new Animated.Value(height / 2 - BIRD_SIZE / 2)).current;
  const pipeRef = useRef(new Animated.Value(width)).current;

  // Gravidade e movimento do pássaro
  useEffect(() => {
    let animation;
    if (!isGameOver) {
      animation = setInterval(() => {
        if (isFlying) {
          // Quando o usuário está tocando na tela (subindo)
          Animated.timing(birdRef, {
            toValue: birdRef._value + FLY_SPEED,
            duration: 30,
            useNativeDriver: true,
          }).start();
        } else {
          // Quando o usuário solta (gravidade age)
          Animated.timing(birdRef, {
            toValue: birdRef._value + GRAVITY,
            duration: 30,
            useNativeDriver: true,
          }).start();
        }
      }, 30);
    }

    return () => clearInterval(animation);
  }, [isFlying, isGameOver]);

  // Movimento dos canos
  useEffect(() => {
    if (!isGameOver) {
      const pipeAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pipeRef, {
            toValue: -PIPE_WIDTH,
            duration: PIPE_SPEED * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pipeRef, {
            toValue: width,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
      pipeAnimation.start();

      return () => pipeAnimation.stop();
    }
  }, [isGameOver]);

  // Detecção de colisão e pontuação
  useEffect(() => {
    const interval = setInterval(() => {
      const birdPos = birdRef._value;
      const pipePos = pipeRef._value;

      if (pipePos < BIRD_SIZE && pipePos > -PIPE_WIDTH) {
        if (birdPos < 0 || birdPos + BIRD_SIZE > height) {
          endGame();
        }
        if (pipePos < width / 2 + PIPE_WIDTH / 2 && pipePos > width / 2 - PIPE_WIDTH / 2) {
          setScore((prevScore) => prevScore + 1);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [birdRef, pipeRef, isGameOver]);

  // Reiniciar o jogo após Game Over
  const endGame = () => {
    setIsGameOver(true);
    Alert.alert('Game Over', `Your score: ${score}`, [
      {
        text: 'Restart',
        onPress: () => {
          setIsGameOver(false);
          birdRef.setValue(height / 2 - BIRD_SIZE / 2);
          pipeRef.setValue(width);
          setScore(0);
        },
      },
    ]);
  };

  // Eventos de toque para voar
  const handlePressIn = () => {
    setIsFlying(true);
  };

  const handlePressOut = () => {
    setIsFlying(false);
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View style={styles.container}>
        {/* Pássaro */}
        <Animated.View
          style={[
            styles.bird,
            { transform: [{ translateY: birdRef }] },
          ]}
        />

        {/* Cano */}
        <Animated.View
          style={[
            styles.pipe,
            { transform: [{ translateX: pipeRef }] },
            { height: PIPE_HEIGHT },
          ]}
        />

        {/* Pontuação */}
        <Text style={styles.score}>Score: {score}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bird: {
    width: BIRD_SIZE,
    height: BIRD_SIZE,
    backgroundColor: '#FFD700',
    borderRadius: BIRD_SIZE / 2,
  },
  pipe: {
    width: PIPE_WIDTH,
    backgroundColor: '#228B22',
    position: 'absolute',
    bottom: 0,
  },
  score: {
    position: 'absolute',
    top: 50,
    fontSize: 30,
    color: '#fff',
  },
});

export default FlappyBird;
