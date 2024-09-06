import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const COLORS = ['red', 'green', 'blue', 'yellow']; // Cores do jogo
const SEQUENCE_DELAY = 500; // Tempo entre as cores da sequência

export default function JogoCores() {
  const [sequence, setSequence] = useState([]); // Sequência de cores
  const [playerSequence, setPlayerSequence] = useState([]); // Sequência do jogador
  const [round, setRound] = useState(0); // Rodadas do jogo
  const [isPlayerTurn, setIsPlayerTurn] = useState(false); // Controle de turno
  const [highlightedColor, setHighlightedColor] = useState(null); // Cor realçada

  // Inicia o jogo
  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setRound(1);
    nextRound();
  };

  // Adiciona uma nova cor à sequência e inicia o turno da máquina
  const nextRound = () => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setSequence((prevSequence) => [...prevSequence, randomColor]);
    setPlayerSequence([]);
    setIsPlayerTurn(false);
    showSequence([...sequence, randomColor]);
  };

  // Mostra a sequência de cores ao jogador
  const showSequence = (sequenceToShow) => {
    sequenceToShow.forEach((color, index) => {
      setTimeout(() => {
        setHighlightedColor(color);
      }, SEQUENCE_DELAY * index);

      setTimeout(() => {
        setHighlightedColor(null);
        if (index === sequenceToShow.length - 1) {
          setTimeout(() => {
            setIsPlayerTurn(true);
          }, SEQUENCE_DELAY);
        }
      }, SEQUENCE_DELAY * (index + 0.5));
    });
  };

  // Verifica a jogada do jogador
  const handlePlayerInput = (color) => {
    if (!isPlayerTurn) return;

    const updatedPlayerSequence = [...playerSequence, color];
    setPlayerSequence(updatedPlayerSequence);

    const currentStep = updatedPlayerSequence.length - 1;
    if (updatedPlayerSequence[currentStep] !== sequence[currentStep]) {
      // Se o jogador errou
      Alert.alert('Você errou!', `A sequência era: ${sequence.join(', ')}`, [
        { text: 'Tentar Novamente', onPress: startGame },
      ]);
      return;
    }

    if (updatedPlayerSequence.length === sequence.length) {
      // Se o jogador completou a sequência
      setRound((prevRound) => prevRound + 1);
      setTimeout(nextRound, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simon Says</Text>
      <Text style={styles.round}>Rodada: {round}</Text>

      <View style={styles.gameBoard}>
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              { backgroundColor: highlightedColor === color ? 'white' : color },
            ]}
            onPress={() => handlePlayerInput(color)}
          />
        ))}
      </View>

      <TouchableOpacity onPress={startGame} style={styles.startButton}>
        <Text style={styles.startButtonText}>Iniciar Jogo</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  round: {
    fontSize: 24,
    marginBottom: 20,
  },
  gameBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    justifyContent: 'center',
  },
  colorButton: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  startButton: {
    marginTop: 40,
    backgroundColor: '#008CBA',
    padding: 20,
    borderRadius: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
