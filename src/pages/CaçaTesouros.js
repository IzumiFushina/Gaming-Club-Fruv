import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Tamanho do mapa
const MAP_SIZE = 5;

// Gera o mapa inicial com posições vazias e tesouros
const generateMap = () => {
  let map = Array(MAP_SIZE).fill(null).map(() => Array(MAP_SIZE).fill(null));
  let treasures = 3; // Número de tesouros no mapa

  // Coloca tesouros em posições aleatórias
  while (treasures > 0) {
    let row = Math.floor(Math.random() * MAP_SIZE);
    let col = Math.floor(Math.random() * MAP_SIZE);

    if (!map[row][col]) {
      map[row][col] = 'T';
      treasures--;
    }
  }

  return map;
};

export default function CaçaTesouros() {
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 }); // Posição inicial do jogador
  const [map, setMap] = useState(generateMap()); // Gera o mapa com tesouros
  const [treasuresFound, setTreasuresFound] = useState(0); // Tesouros encontrados

  const movePlayer = (direction) => {
    let newRow = playerPos.row;
    let newCol = playerPos.col;

    // Movimento do jogador
    switch (direction) {
      case 'up':
        if (newRow > 0) newRow--;
        break;
      case 'down':
        if (newRow < MAP_SIZE - 1) newRow++;
        break;
      case 'left':
        if (newCol > 0) newCol--;
        break;
      case 'right':
        if (newCol < MAP_SIZE - 1) newCol++;
        break;
    }

    // Verifica se encontrou um tesouro
    if (map[newRow][newCol] === 'T') {
      setTreasuresFound(treasuresFound + 1);
      map[newRow][newCol] = null; // Remove o tesouro do mapa
    }

    setPlayerPos({ row: newRow, col: newCol });
  };

  const renderMap = () => {
    return map.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => (
          <View
            key={colIndex}
            style={[
              styles.cell,
              playerPos.row === rowIndex && playerPos.col === colIndex && styles.playerCell,
            ]}
          >
            {playerPos.row === rowIndex && playerPos.col === colIndex ? (
              <Text style={styles.playerText}>P</Text>
            ) : (
              <Text>{cell === 'T' ? '💎' : ''}</Text> // Apenas para visualização, você pode ocultar os tesouros até serem encontrados
            )}
          </View>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caça aos Tesouros</Text>
      <Text style={styles.score}>Tesouros Encontrados: {treasuresFound}</Text>

      {/* Renderiza o mapa */}
      <View style={styles.map}>{renderMap()}</View>

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

      {treasuresFound === 3 && (
        <Text style={styles.winMessage}>Parabéns! Você encontrou todos os tesouros!</Text>
      )}
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
    fontSize: 24,
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
  },
  map: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerCell: {
    backgroundColor: '#ffeb3b',
  },
  playerText: {
    fontWeight: 'bold',
  },
  controls: {
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#008CBA',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
  },
  winMessage: {
    fontSize: 20,
    marginTop: 20,
    color: 'green',
  },
});
