import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Função para gerar uma equação aleatória
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
  const [level, setLevel] = useState(1); // Nível de dificuldade
  const [equation, setEquation] = useState(generateEquation(level)); // Equação atual
  const [userAnswer, setUserAnswer] = useState(''); // Resposta do jogador
  const [score, setScore] = useState(0); // Pontuação

  // Atualiza a equação quando o nível ou a resposta do usuário muda
  useEffect(() => {
    setEquation(generateEquation(level));
  }, [level]);

  const checkAnswer = () => {
    if (parseInt(userAnswer) === equation.answer) {
      setScore(score + 1);
      setLevel(level + 1); // Aumenta o nível conforme o jogador acerta
      setUserAnswer(''); // Limpa o campo de resposta
    } else {
      Alert.alert('Resposta Errada', `A resposta correta era: ${equation.answer}`);
      resetGame();
    }
  };

  const resetGame = () => {
    setLevel(1); // Reinicia o nível
    setScore(0); // Zera a pontuação
    setUserAnswer(''); // Limpa a resposta
    setEquation(generateEquation(1)); // Gera uma nova equação
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Matemática</Text>
      <Text style={styles.level}>Nível: {level}</Text>
      <Text style={styles.equation}>{equation.equation}</Text>

      {/* Input da resposta */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={userAnswer}
        onChangeText={setUserAnswer}
        placeholder="Sua resposta"
      />

      {/* Botão para verificar a resposta */}
      <TouchableOpacity onPress={checkAnswer} style={styles.button}>
        <Text style={styles.buttonText}>Enviar Resposta</Text>
      </TouchableOpacity>

      <Text style={styles.score}>Pontuação: {score}</Text>

      {/* Botão para reiniciar o jogo */}
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
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  level: {
    fontSize: 18,
    marginBottom: 20,
  },
  equation: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
