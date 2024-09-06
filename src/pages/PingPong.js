import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const BALL_SIZE = 20;
const PADDLE_SPEED = 15;
const BALL_SPEED = 5;

export default function PingPong() {
  const [ballPos, setBallPos] = useState({ x: width / 2 - BALL_SIZE / 2, y: height / 2 - BALL_SIZE / 2 });
  const [ballDir, setBallDir] = useState({ x: BALL_SPEED, y: BALL_SPEED });
  const [playerPaddlePos, setPlayerPaddlePos] = useState(width / 2 - PADDLE_WIDTH / 2);
  const [aiPaddlePos, setAiPaddlePos] = useState(width / 2 - PADDLE_WIDTH / 2);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  const gameLoopRef = useRef(null);

  useEffect(() => {
    startGame();

    return () => {
      clearInterval(gameLoopRef.current);
    };
  }, []);

  const startGame = () => {
    gameLoopRef.current = setInterval(gameLoop, 16);
  };

  const gameLoop = () => {
    moveBall();
    moveAiPaddle();
    checkCollisions();
  };

  const moveBall = () => {
    setBallPos(prevPos => ({
      x: prevPos.x + ballDir.x,
      y: prevPos.y + ballDir.y,
    }));
  };

  const moveAiPaddle = () => {
    if (ballPos.x > aiPaddlePos + PADDLE_WIDTH / 2) {
      setAiPaddlePos(prevPos => Math.min(prevPos + PADDLE_SPEED, width - PADDLE_WIDTH));
    } else if (ballPos.x < aiPaddlePos + PADDLE_WIDTH / 2) {
      setAiPaddlePos(prevPos => Math.max(prevPos - PADDLE_SPEED, 0));
    }
  };

  const checkCollisions = () => {
    // Colisão com as paredes laterais
    if (ballPos.x <= 0 || ballPos.x + BALL_SIZE >= width) {
      setBallDir(prevDir => ({ ...prevDir, x: -prevDir.x }));
    }

    // Colisão com o player paddle
    if (
      ballPos.y + BALL_SIZE >= height - PADDLE_HEIGHT &&
      ballPos.x + BALL_SIZE >= playerPaddlePos &&
      ballPos.x <= playerPaddlePos + PADDLE_WIDTH
    ) {
      setBallDir(prevDir => ({ ...prevDir, y: -BALL_SPEED }));
    }

    // Colisão com o AI paddle
    if (
      ballPos.y <= PADDLE_HEIGHT &&
      ballPos.x + BALL_SIZE >= aiPaddlePos &&
      ballPos.x <= aiPaddlePos + PADDLE_WIDTH
    ) {
      setBallDir(prevDir => ({ ...prevDir, y: BALL_SPEED }));
    }

    // Pontuação
    if (ballPos.y <= 0) {
      setPlayerScore(prevScore => prevScore + 1);
      resetBall();
    } else if (ballPos.y + BALL_SIZE >= height) {
      setAiScore(prevScore => prevScore + 1);
      resetBall();
    }
  };

  const resetBall = () => {
    setBallPos({ x: width / 2 - BALL_SIZE / 2, y: height / 2 - BALL_SIZE / 2 });
    setBallDir({ x: BALL_SPEED, y: BALL_SPEED });
  };

  const movePlayerPaddle = (direction) => {
    if (direction === 'left') {
      setPlayerPaddlePos(prevPos => Math.max(prevPos - PADDLE_SPEED, 0));
    } else if (direction === 'right') {
      setPlayerPaddlePos(prevPos => Math.min(prevPos + PADDLE_SPEED, width - PADDLE_WIDTH));
    }
  };

  return (
    <View style={styles.container}>
      {/* Placar */}
      <Text style={styles.score}>
        Player: {playerScore} - AI: {aiScore}
      </Text>

      {/* Bola */}
      <View
        style={[
          styles.ball,
          {
            top: ballPos.y,
            left: ballPos.x,
          },
        ]}
      />

      {/* Barra do jogador */}
      <View
        style={[
          styles.paddle,
          {
            bottom: 0,
            left: playerPaddlePos,
          },
        ]}
      />

      {/* Barra da IA */}
      <View
        style={[
          styles.paddle,
          {
            top: 0,
            left: aiPaddlePos,
          },
        ]}
      />

      {/* Controles */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => movePlayerPaddle('left')} style={styles.controlButton}>
          <Text>Esquerda</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => movePlayerPaddle('right')} style={styles.controlButton}>
          <Text>Direita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    position: 'absolute',
    width: BALL_SIZE,
    height: BALL_SIZE,
    backgroundColor: '#fff',
    borderRadius: BALL_SIZE / 2,
  },
  paddle: {
    position: 'absolute',
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    backgroundColor: '#fff',
  },
  score: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  controlButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});
