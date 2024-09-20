import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

const FlappyPixel = () => {
  const [bird, setBird] = useState({ x: 50, y: 240, velocity: 0 });
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameConfig = {
    birdColor: "#FFD700",
    pipeColor: "#00FF00",
    gravity: 1.0,
    jumpStrength: -8,
    pipeSpeed: 10,
    pipeGap: 150,
    pipeWidth: 60,
    spawnInterval: 1500,
  };

  // Função para atualizar o estado do pássaro (gravidade, etc.)
  const updateBird = () => {
    setBird(prev => {
      let newVelocity = prev.velocity + gameConfig.gravity;
      let newY = prev.y + newVelocity;

      if (newY + 20 > 480) {  // Checa se o pássaro colidiu com o chão
        setGameOver(true);
        newY = 480 - 20;  // Limita ao chão
      }

      return { ...prev, velocity: newVelocity, y: newY };
    });
  };

  // Função para atualizar os pipes
  const updatePipes = () => {
    setPipes(prev => {
      const updatedPipes = prev.map(pipe => ({ ...pipe, x: pipe.x - gameConfig.pipeSpeed }));
      if (updatedPipes.length && updatedPipes[0].x < -gameConfig.pipeWidth) {
        updatedPipes.shift();
        setScore(score + 1);
      }
      if (!updatedPipes.length || updatedPipes[updatedPipes.length - 1].x < 320- 200) {
        let topHeight = Math.random() * (480 - gameConfig.pipeGap);
        updatedPipes.push({ x: 320, top: topHeight, bottom: topHeight + gameConfig.pipeGap });
      }
      return updatedPipes;
    });
  };

  // Função de colisão
  const checkCollision = () => {
    pipes.forEach(pipe => {
      if (bird.x + 20 > pipe.x && bird.x - 20 < pipe.x + gameConfig.pipeWidth) {
        if (bird.y - 20 < pipe.top || bird.y + 20 > pipe.bottom) {
          setGameOver(true);
        }
      }
    });
  };

  // Loop principal do jogo
  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        updateBird();
        updatePipes();
        checkCollision();
      }, 20); // Aproximadamente 60 FPS

      return () => clearInterval(interval);
    }
  }, [bird, pipes, gameOver]);

  // Função para o pulo
  const jump = () => {
    if (gameOver) {
      setBird({ x: 40, y: 240, velocity: 0 });
      setPipes([]);
      setScore(0);
      setGameOver(false);
    } else {
      setBird(prev => ({ ...prev, velocity: gameConfig.jumpStrength }));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={jump} style={styles.touchable}>
        <Svg height="500" width="340" style={styles.canvas}>
          {/* Desenha o pássaro */}
          <Circle cx={bird.x} cy={bird.y} r="20" fill={gameConfig.birdColor} />
          
          {/* Desenha os pipes */}
          {pipes.map((pipe, index) => (
            <React.Fragment key={index}>
              <Rect x={pipe.x} y="0" width={gameConfig.pipeWidth} height={pipe.top} fill={gameConfig.pipeColor} />
              <Rect x={pipe.x} y={pipe.bottom} width={gameConfig.pipeWidth} height={480 - pipe.bottom} fill={gameConfig.pipeColor} />
            </React.Fragment>
          ))}
        </Svg>
        {gameOver && (
          <Text style={styles.gameOverText}>Game Over - Toque para reiniciar</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    borderColor: '#000',
    borderWidth: 2,
  },
  gameOverText: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  scoreText: {
    fontSize: 24,
    color: '#000',
    position: 'absolute',
    top: 50,
  },
  touchable: {
    flex: 1,
    width: '100%',
  },
});

export default FlappyPixel;
