import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');
const BIRD_SIZE = 50;
const PIPE_WIDTH = 80;
const PIPE_HEIGHT = 300;
const PIPE_GAP = 150;
const GRAVITY = 0.5;
const JUMP = -10;
const PIPE_SPEED = 4;
const PIPE_SPACING = 250;

const FlappyBird = () => {
  const [birdY, setBirdY] = useState(new Animated.Value(height / 2 - BIRD_SIZE / 2));
  const [pipeX, setPipeX] = useState(new Animated.Value(width));
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const birdRef = useRef(new Animated.Value(height / 2 - BIRD_SIZE / 2)).current;
  const pipeRef = useRef(new Animated.Value(width)).current;
  const fallAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isGameOver) {
      // Animation for falling
      Animated.loop(
        Animated.sequence([
          Animated.timing(fallAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(fallAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();

      const birdFall = Animated.loop(
        Animated.timing(birdRef, {
          toValue: birdRef._value + GRAVITY,
          duration: 30,
          useNativeDriver: true,
        })
      );

      birdFall.start();

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

      return () => {
        birdFall.stop();
        pipeAnimation.stop();
      };
    }
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) {
      birdRef.setValue(height / 2 - BIRD_SIZE / 2);
      pipeRef.setValue(width);
      setScore(0);
    }
  }, [isGameOver]);

  const jump = () => {
    if (!isGameOver) {
      Animated.timing(birdRef, {
        toValue: birdRef._value + JUMP,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

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

  const endGame = () => {
    setIsGameOver(true);
    Alert.alert('Game Over', `Your score: ${score}`);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bird,
          { transform: [{ translateY: birdRef }] },
        ]}
      />
      <Animated.View
        style={[
          styles.pipe,
          { transform: [{ translateX: pipeRef }] },
          { height: PIPE_HEIGHT },
        ]}
      />
      <TouchableOpacity style={styles.button} onPress={jump}>
        <Text style={styles.buttonText}>Jump</Text>
      </TouchableOpacity>
      <Text style={styles.score}>Score: {score}</Text>
    </View>
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
  button: {
    position: 'absolute',
    bottom: 50,
    padding: 10,
    backgroundColor: '#ff5722',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  score: {
    position: 'absolute',
    top: 50,
    fontSize: 30,
    color: '#fff',
  },
});

export default FlappyBird;
