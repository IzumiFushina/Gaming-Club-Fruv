import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, PanResponder } from 'react-native';

const GG_ALL_GAME_CONFIG = {
  gridSize: 10, 
  words: ['ADVENTURE', 'MYSTERY', 'JOURNEY', 'QUEST', 'EXPLORE', 'DISCOVER', 'WONDER', 'MAGIC'], 
  directions: [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, 1],
  ], 
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  congratsMessage: 'Parabéns! Você completou a Word Search Adventure!',
  gameTime: 5 * 60 * 1000, 
  timeoutMessage: 'O tempo acabou! Tente novamente.', 
};

const WordSearch = () => {
  const [grid, setGrid] = useState([]);
  const [wordPositions, setWordPositions] = useState({});
  const [foundWords, setFoundWords] = useState(new Set());
  const [selectedCells, setSelectedCells] = useState([]);
  const [timer, setTimer] = useState(GG_ALL_GAME_CONFIG.gameTime);
  const [isGameOver, setIsGameOver] = useState(false);
  const timerRef = useRef(null);
  const cellRefs = useRef([]);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(timerRef.current);
      showTimeoutMessage();
    }
  }, [timer]);

  const initializeGame = () => {
    const emptyGrid = createEmptyGrid();
    const newWordPositions = {};
    const gridWithWords = placeWords(emptyGrid, newWordPositions);
    const filledGrid = fillEmptyCells(gridWithWords);

    setGrid(filledGrid);
    setWordPositions(newWordPositions);
    setFoundWords(new Set());
    setSelectedCells([]);
    setIsGameOver(false);
    startTimer();
  };

  const createEmptyGrid = () => {
    return Array(GG_ALL_GAME_CONFIG.gridSize)
      .fill(null)
      .map(() => Array(GG_ALL_GAME_CONFIG.gridSize).fill(''));
  };

  const startTimer = () => {
    setTimer(GG_ALL_GAME_CONFIG.gameTime);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev - 1000);
    }, 1000);
  };

  const showTimeoutMessage = () => {
    setIsGameOver(true);
    Alert.alert(GG_ALL_GAME_CONFIG.timeoutMessage, '', [
      { text: 'Tentar novamente', onPress: initializeGame },
    ]);
  };

  const formatTime = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const placeWords = (grid, wordPositions) => {
    const newGrid = [...grid];
    for (let word of GG_ALL_GAME_CONFIG.words) {
      let placed = false;
      while (!placed) {
        let direction = GG_ALL_GAME_CONFIG.directions[Math.floor(Math.random() * GG_ALL_GAME_CONFIG.directions.length)];
        let startX = Math.floor(Math.random() * GG_ALL_GAME_CONFIG.gridSize);
        let startY = Math.floor(Math.random() * GG_ALL_GAME_CONFIG.gridSize);
        if (canPlaceWord(word, startX, startY, direction, newGrid)) {
          placeWord(word, startX, startY, direction, newGrid, wordPositions);
          placed = true;
        }
      }
    }
    return newGrid;
  };

  const canPlaceWord = (word, startX, startY, direction, grid) => {
    for (let i = 0; i < word.length; i++) {
      let x = startX + i * direction[0];
      let y = startY + i * direction[1];
      if (x < 0 || x >= GG_ALL_GAME_CONFIG.gridSize || y < 0 || y >= GG_ALL_GAME_CONFIG.gridSize || (grid[y][x] && grid[y][x] !== word[i])) {
        return false;
      }
    }
    return true;
  };

  const placeWord = (word, startX, startY, direction, grid, wordPositions) => {
    wordPositions[word] = [];
    for (let i = 0; i < word.length; i++) {
      let x = startX + i * direction[0];
      let y = startY + i * direction[1];
      grid[y][x] = word[i];
      wordPositions[word].push([x, y]);
    }
  };

  const fillEmptyCells = grid => {
    const newGrid = [...grid];
    for (let y = 0; y < GG_ALL_GAME_CONFIG.gridSize; y++) {
      for (let x = 0; x < GG_ALL_GAME_CONFIG.gridSize; x++) {
        if (!newGrid[y][x]) {
          newGrid[y][x] =
            GG_ALL_GAME_CONFIG.alphabet[
              Math.floor(Math.random() * GG_ALL_GAME_CONFIG.alphabet.length)
            ];
        }
      }
    }
    return newGrid;
  };

  const handlePanResponderMove = (evt, gestureState) => {
    const { locationX, locationY } = evt.nativeEvent;

    // Localize a célula correspondente à posição do toque
    const col = Math.floor(locationX / 30);
    const row = Math.floor(locationY / 30);

    // Se a célula for válida e não estiver selecionada, adicione-a à seleção
    if (
      row >= 0 &&
      row < GG_ALL_GAME_CONFIG.gridSize &&
      col >= 0 &&
      col < GG_ALL_GAME_CONFIG.gridSize &&
      !selectedCells.some(cell => cell[0] === col && cell[1] === row)
    ) {
      setSelectedCells(prev => [...prev, [col, row]]);
    }
  };

  const handlePanResponderRelease = () => {
    checkSelectedWord();
    setSelectedCells([]);
  };

  const checkSelectedWord = () => {
    const selectedWord = selectedCells.map(([x, y]) => grid[y][x]).join('');
    const reversedWord = selectedWord.split('').reverse().join('');

    if (GG_ALL_GAME_CONFIG.words.includes(selectedWord) || GG_ALL_GAME_CONFIG.words.includes(reversedWord)) {
      setFoundWords(prev => new Set(prev).add(selectedWord).add(reversedWord));
      if (foundWords.size === GG_ALL_GAME_CONFIG.words.length - 1) {
        setIsGameOver(true);
        showCongratsMessage();
      }
    }
  };

  const showCongratsMessage = () => {
    Alert.alert(GG_ALL_GAME_CONFIG.congratsMessage);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderRelease,
    })
  ).current;

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => (
          <View
            key={colIndex}
            style={[
              styles.cell,
              selectedCells.some(([x, y]) => x === colIndex && y === rowIndex) &&
                styles.selectedCell,
            ]}
            ref={ref => {
              cellRefs.current[rowIndex * GG_ALL_GAME_CONFIG.gridSize + colIndex] = ref;
            }}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </View>
        ))}
      </View>
    ));
  };

  const renderWordList = () => {
    return GG_ALL_GAME_CONFIG.words.map((word, index) => (
      <Text
        key={index}
        style={[
          styles.word,
          foundWords.has(word) && styles.wordFound,
        ]}
      >
        {word}
      </Text>
    ));
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.title}>Word Search Adventure</Text>
      <View style={styles.gameContainer}>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        <View style={styles.grid}>{renderGrid()}</View>
        <View style={styles.wordList}>{renderWordList()}</View>
        <TouchableOpacity style={styles.newGameButton} onPress={initializeGame}>
          <Text style={styles.newGameButtonText}>Novo Jogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gameContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    alignItems: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontWeight: 'bold',
  },
  selectedCell: {
    backgroundColor: '#d3d3d3',
  },
  wordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  word: {
    padding: 5,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
  },
  wordFound: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  newGameButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  newGameButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WordSearch;
