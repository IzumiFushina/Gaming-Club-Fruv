import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';

const generateEquation = (level) => {
  const num1 = Math.floor(Math.random() * 10 * level);
  const num2 = Math.floor(Math.random() * 10 * level);
  const operators = ['+', '-', '*'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
  }

  return {
    equation: `${num1} ${operator} ${num2}`,
    answer: result
  };
};

export default function JogoMat() {
  const [level, setLevel] = useState(1); 
  const [equation, setEquation] = useState(generateEquation(level));
  const [userAnswer, setUserAnswer] = useState(''); 
  const [score, setScore] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    setEquation(generateEquation(level));
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [level]);

  const checkAnswer = () => {
    if (parseInt(userAnswer) === equation.answer) {
      setScore(score + 1);
      setLevel(level + 1);
      setUserAnswer('');
    } else {
      Alert.alert('Resposta Errada', `A resposta correta era: ${equation.answer}`);
      resetGame();
    }
  };

  const resetGame = () => {
    setLevel(1); 
    setScore(0); 
    setUserAnswer('');
    setEquation(generateEquation(1));
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Jogo de Matemática
      </Animated.Text>
      <Text style={styles.level}>Nível: {level}</Text>
      <Animated.Text style={[styles.equation, { opacity: fadeAnim }]}>
        {equation.equation}
      </Animated.Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={userAnswer}
        onChangeText={setUserAnswer}
        placeholder="Sua resposta"
      />

      <TouchableOpacity onPress={checkAnswer} style={styles.button}>
        <Text style={styles.buttonText}>Enviar Resposta</Text>
      </TouchableOpacity>

      <Text style={styles.score}>Pontuação: {score}</Text>

      <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d1e2',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fb6ba2',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    animation: 'fadeInDown 2s',
  },
  level: {
    fontSize: 24,
    color: '#ffcc00',
    marginBottom: 20,
  },
  equation: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    transform: [{ scale: 1.1 }],
  },
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 2,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    transform: [{ scale: 1.05 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  score: {
    fontSize: 20,
    color: '#ffcc00',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#e60000',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
