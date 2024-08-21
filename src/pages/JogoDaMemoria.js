import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const generateCards = () => {
  const cards = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍒', '🍑', '🍍'];
  const duplicatedCards = [...cards, ...cards];
  return duplicatedCards.sort(() => 0.5 - Math.random());
};

const App = () => {
  const [cards, setCards] = useState(generateCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstIndex, secondIndex] = selectedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setSelectedCards([]);
        if (matchedCards.length + 2 === cards.length) {
          Alert.alert('Parabéns!', 'Você encontrou todos os pares!');
        }
      } else {
        setTimeout(() => setSelectedCards([]), 1000);
      }
    }
  }, [selectedCards]);

  const handleCardPress = (index) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(index)) {
      setSelectedCards([...selectedCards, index]);
    }
  };

  const resetGame = () => {
    setCards(generateCards());
    setSelectedCards([]);
    setMatchedCards([]);
  };

  const renderCard = (item, index) => {
    const isFlipped = selectedCards.includes(index) || matchedCards.includes(index);
    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => handleCardPress(index)}
      >
        <Text style={styles.cardText}>{isFlipped ? item : '❓'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {cards.map((item, index) => renderCard(item, index))}
      </View>
      <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 320,
  },
  card: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  cardText: {
    fontSize: 36,
    color: '#red',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
