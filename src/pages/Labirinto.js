import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Tamanho do labirinto
const MAZE_SIZE = 5;

// Representação do labirinto: 1 é parede, 0 é caminho, S é início e E é saída
const MAZE = [
  ['S', 0, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0],
  [1, 1, 1, 1, 'E']
];

// Posição inicial do jogador
const START_POSITION = { row: 0, col: 0 };
// Posição da saída
const END_POSITION = { row: 4, col: 4 };

export default function Labirinto() {
  const [playerPos, setPlayerPos] = useState(START_POSITION);

  const movePlayer = (direction) => {
    let newRow = playerPos.row;
    let newCol = playerPos.col;

    switch (direction) {
      case 'up':
        if (newRow > 0) newRow--;
        break;
      case 'down':
        if (newRow < MAZE_SIZE - 1) newRow++;
        break;
      case 'left':
        if (newCol > 0) newCol--;
        break;
      case 'right':
        if (newCol < MAZE_SIZE - 1) newCol++;
        break;
    }

    // Verifica se a nova posição é um caminho (0) ou a saída ('E')
    if (MAZE[newRow][newCol] === 0 || MAZE[newRow][newCol] === 'E') {
      setPlayerPos({ row: newRow, col: newCol });
    }

    // Se o jogador alcançar a saída
    if (newRow === END_POSITION.row && newCol === END_POSITION.col) {
      Alert.alert('Parabéns!', 'Você encontrou a saída!');
      resetGame();
    }
  };

  const resetGame = () => {
    setPlayerPos(START_POSITION); // Reseta a posição do jogador
  };

  const renderMaze = () => {
    return MAZE.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => (
          <View
            key={colIndex}
            style={[
              styles.cell,
              playerPos.row === rowIndex && playerPos.col === colIndex && styles.playerCell,
              MAZE[rowIndex][colIndex] === 1 && styles.wallCell,
              MAZE[rowIndex][colIndex] === 'E' && styles.exitCell
            ]}
          >
            {playerPos.row === rowIndex && playerPos.col === colIndex ? (
              <Text style={styles.playerText}>P</Text>
            ) : null}
          </View>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo do Labirinto</Text>

      {/* Renderiza o labirinto */}
      <View style={styles.maze}>{renderMaze()}</View>

      {/* Controles de movimento */}
      <View style={styles.controls}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => movePlayer('up')} style={styles.controlButton}>
            <Text style={styles.controlText}>Cima</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => movePlayer('left')} style={styles.controlButton}>
            <Text style={styles.controlText}>Esquerda</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => movePlayer('down')} style={styles.controlButton}>
            <Text style={styles.controlText}>Baixo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => movePlayer('right')} style={styles.controlButton}>
            <Text style={styles.controlText}>Direita</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',  // Cor de fundo clara
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    color: '#6a5acd', // Cor roxa suave
  },
  maze: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerCell: {
    backgroundColor: '#ffcccb',  // Rosa claro para o jogador
  },
  wallCell: {
    backgroundColor: '#b0c4de',  // Azul pastel para as paredes
  },
  exitCell: {
    backgroundColor: '#98fb98',  // Verde pastel para a saída
  },
  playerText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  controls: {
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#87cefa',  // Azul pastel para os botões
    padding: 12,
    margin: 5,
    borderRadius: 10,
  },
  controlText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
