import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');
const CELL_SIZE = 20;
const BOARD_SIZE = width - 40;

const getRandomPosition = () => {
  const maxPosition = Math.floor(BOARD_SIZE / CELL_SIZE) - 1;
  const x = Math.floor(Math.random() * maxPosition) * CELL_SIZE;
  const y = Math.floor(Math.random() * maxPosition) * CELL_SIZE;
  return { x, y };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState({ x: CELL_SIZE, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => moveSnake(), 200);
    return () => clearInterval(interval);
  }, [snake]);

  const moveSnake = () => {
    if (gameOver) return;

    const newHead = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    if (checkCollision(newHead)) {
      setGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(getRandomPosition());
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const checkCollision = (position) => {
    if (
      position.x < 0 ||
      position.y < 0 ||
      position.x >= BOARD_SIZE ||
      position.y >= BOARD_SIZE
    ) {
      return true;
    }
    return snake.some(segment => segment.x === position.x && segment.y === position.y);
  };

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <View style={styles.board}>
        {snake.map((segment, index) => (
          <View
            key={index}
            style={[styles.snake, { left: segment.x, top: segment.y }]}
          />
        ))}
        <View style={[styles.food, { left: food.x, top: food.y }]} />
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={() => handleDirectionChange({ x: 0, y: -CELL_SIZE })}>
          <Text style={styles.controlText}>Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => handleDirectionChange({ x: -CELL_SIZE, y: 0 })}>
          <Text style={styles.controlText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => handleDirectionChange({ x: CELL_SIZE, y: 0 })}>
          <Text style={styles.controlText}>Right</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => handleDirectionChange({ x: 0, y: CELL_SIZE })}>
          <Text style={styles.controlText}>Down</Text>
        </TouchableOpacity>
      </View>
      {gameOver && <Text style={styles.gameOver}>Game Over</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: '#333',
    position: 'relative',
    borderColor: '#555',
    borderWidth: 5,
  },
  snake: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#0f0',
    position: 'absolute',
    borderRadius: 4,
  },
  food: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#f00',
    position: 'absolute',
    borderRadius: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 8,
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
  },
  gameOver: {
    fontSize: 32,
    color: '#ff4d4d',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default SnakeGame;
