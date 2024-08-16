import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Chess from 'chess.js';

const App = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handleSquarePress = (row, col) => {
    const square = getSquareFromCoordinates(row, col);
    if (selectedSquare) {
      const move = game.move({ from: selectedSquare, to: square, promotion: 'q' });
      if (move) {
        setFen(game.fen());
      }
      setSelectedSquare(null);
    } else {
      if (game.get(square)) {
        setSelectedSquare(square);
      }
    }
  };

  const getSquareFromCoordinates = (row, col) => {
    return String.fromCharCode(97 + col) + (8 - row);
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setSelectedSquare(null);
  };

  const renderSquare = (row, col) => {
    const square = getSquareFromCoordinates(row, col);
    const piece = game.get(square);
    const isSelected = selectedSquare === square;
    const isBlackSquare = (row + col) % 2 === 1;

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.square,
          { backgroundColor: isSelected ? 'yellow' : isBlackSquare ? 'gray' : 'white' },
        ]}
        onPress={() => handleSquarePress(row, col)}
      >
        <Text style={styles.piece}>{piece ? piece.type.toUpperCase() : ''}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {[...Array(8)].map((_, row) =>
          <View key={row} style={styles.row}>
            {[...Array(8)].map((_, col) => renderSquare(row, col))}
          </View>
        )}
      </View>
      <Button title="Reiniciar Jogo" onPress={resetGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  board: {
    width: 320,
    height: 320,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  square: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  piece: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
