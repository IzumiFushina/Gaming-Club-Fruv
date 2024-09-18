import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Peças iniciais do tabuleiro e suas representações
const initialBoard = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];

const pieces = {
  '♜': 'bR',
  '♞': 'bN',
  '♝': 'bB',
  '♛': 'bQ',
  '♚': 'bK',
  '♟': 'bP',
  '♖': 'wR',
  '♘': 'wN',
  '♗': 'wB',
  '♕': 'wQ',
  '♔': 'wK',
  '♙': 'wP',
};

export default function ChessGame() {
  const [board, setBoard] = useState(initialBoard);
  const [currentTurn, setCurrentTurn] = useState('w'); // Turno atual
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);

  // Renderizar o tabuleiro
  const renderBoard = () => {
    return board.map((row, rowIndex) => {
      return row.map((square, colIndex) => {
        let squareStyle = (rowIndex + colIndex) % 2 === 0 ? styles.white : styles.black;
        if (selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex) {
          squareStyle = { ...squareStyle, ...styles.selected };
        }
        const isPossibleMove = possibleMoves.some(move => move.row === rowIndex && move.col === colIndex);
        if (isPossibleMove) {
          squareStyle = { ...squareStyle, ...styles.possibleMove };
        }

        return (
          <TouchableOpacity key={`${rowIndex}-${colIndex}`} style={[styles.square, squareStyle]} onPress={() => handleSquareClick(rowIndex, colIndex)}>
            <Text style={styles.piece}>{square}</Text>
          </TouchableOpacity>
        );
      });
    });
  };

  // Lidar com clique no quadrado
  const handleSquareClick = (row, col) => {
    const piece = board[row][col];
    if (selectedPiece) {
      const selectedRow = selectedPiece.row;
      const selectedCol = selectedPiece.col;
      if (isValidMove(selectedRow, selectedCol, row, col)) {
        movePiece(selectedRow, selectedCol, row, col);
        setSelectedPiece(null);
        setPossibleMoves([]);
        setCurrentTurn(currentTurn === 'w' ? 'b' : 'w');
      } else if (piece && pieces[piece][0] === currentTurn) {
        selectPiece(row, col);
      } else {
        setSelectedPiece(null);
        setPossibleMoves([]);
      }
    } else if (piece && pieces[piece][0] === currentTurn) {
      selectPiece(row, col);
    }
  };

  // Selecionar peça
  const selectPiece = (row, col) => {
    setSelectedPiece({ row, col });
    setPossibleMoves(calculatePossibleMoves(row, col));
  };

  // Validar se o movimento é válido
  const isValidMove = (fromRow, fromCol, toRow, toCol) => {
    return possibleMoves.some(move => move.row === toRow && move.col === toCol);
  };

  // Mover peça
  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = board.map(row => row.slice());
    newBoard[toRow][toCol] = board[fromRow][fromCol];
    newBoard[fromRow][fromCol] = '';
    setBoard(newBoard);
  };

  // Calcular movimentos possíveis
  const calculatePossibleMoves = (row, col) => {
    const piece = board[row][col];
    const pieceType = pieces[piece][1];
    const pieceColor = pieces[piece][0];
    let moves = [];
    switch (pieceType) {
      case 'P':
        moves = getPawnMoves(row, col, pieceColor);
        break;
      // Funções para outros tipos de peças podem ser adicionadas aqui
    }
    return moves;
  };

  // Calcular movimentos do peão
  const getPawnMoves = (row, col, color) => {
    const direction = color === 'w' ? -1 : 1;
    const moves = [];

    // Movimento para frente
    if (board[row + direction] && board[row + direction][col] === '') {
      moves.push({ row: row + direction, col: col });
    }

    // Captura diagonal
    if (board[row + direction] && board[row + direction][col - 1] && pieces[board[row + direction][col - 1]] && pieces[board[row + direction][col - 1]][0] !== color) {
      moves.push({ row: row + direction, col: col - 1 });
    }
    if (board[row + direction] && board[row + direction][col + 1] && pieces[board[row + direction][col + 1]] && pieces[board[row + direction][col + 1]][0] !== color) {
      moves.push({ row: row + direction, col: col + 1 });
    }

    // Movimento duplo no primeiro movimento
    if ((color === 'w' && row === 6) || (color === 'b' && row === 1)) {
      if (board[row + 2 * direction][col] === '' && board[row + direction][col] === '') {
        moves.push({ row: row + 2 * direction, col: col });
      }
    }

    return moves;
  };

  // Resetar o jogo
  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentTurn('w');
    setSelectedPiece(null);
    setPossibleMoves([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chessboard}>{renderBoard()}</View>
      <View style={styles.gameInfo}>
        <Text style={styles.heading}>Chess Game</Text>
        <Text>Current Turn: {currentTurn === 'w' ? 'White' : 'Black'}</Text>
        <TouchableOpacity style={styles.newGameButton} onPress={resetGame}>
          <Text style={styles.newGameButtonText}>New Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  chessboard: {
    width: 410,
    height: 410,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#769656',
    padding: 5,
    borderRadius: 5,
  },
  square: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    backgroundColor: '#eeeed2',
  },
  black: {
    backgroundColor: '#769656',
  },
  selected: {
    backgroundColor: '#baca44',
  },
  possibleMove: {
    backgroundColor: '#f7f769',
  },
  piece: {
    fontSize: 30,
  },
  gameInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    marginBottom: 10,
  },
  newGameButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  newGameButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
