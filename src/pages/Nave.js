import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SPACESHIP_SIZE = 50;
const ENEMY_SIZE = 50;
const BULLET_SIZE = 10;
const MOVEMENT_SPEED = 10;
const BULLET_SPEED = 5;

export default function Nave() {
  const [spaceshipPosition, setSpaceshipPosition] = useState(width / 2 - SPACESHIP_SIZE / 2);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Movimento da nave com botões esquerda/direita
  const moveSpaceship = (direction) => {
    if (direction === 'left' && spaceshipPosition > 0) {
      setSpaceshipPosition(spaceshipPosition - MOVEMENT_SPEED);
    } else if (direction === 'right' && spaceshipPosition < width - SPACESHIP_SIZE) {
      setSpaceshipPosition(spaceshipPosition + MOVEMENT_SPEED);
    }
  };

  // Atira (adiciona uma bala)
  const shootBullet = () => {
    setBullets([...bullets, { x: spaceshipPosition + SPACESHIP_SIZE / 2 - BULLET_SIZE / 2, y: height - SPACESHIP_SIZE - 20 }]);
  };

  // Atualiza a posição das balas
  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((prevBullets) =>
        prevBullets
          .map((bullet) => ({ ...bullet, y: bullet.y - BULLET_SPEED }))
          .filter((bullet) => bullet.y > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Gera inimigos aleatórios
  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies((prevEnemies) => [
        ...prevEnemies,
        { x: Math.random() * (width - ENEMY_SIZE), y: 0 },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Atualiza a posição dos inimigos
  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies((prevEnemies) =>
        prevEnemies
          .map((enemy) => ({ ...enemy, y: enemy.y + MOVEMENT_SPEED }))
          .filter((enemy) => enemy.y < height)
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Verifica colisões e atualiza a pontuação
  useEffect(() => {
    const checkCollisions = () => {
      bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
          if (
            bullet.x < enemy.x + ENEMY_SIZE &&
            bullet.x + BULLET_SIZE > enemy.x &&
            bullet.y < enemy.y + ENEMY_SIZE &&
            bullet.y + BULLET_SIZE > enemy.y
          ) {
            // Remove bala e inimigo atingido
            setBullets((prevBullets) => prevBullets.filter((_, i) => i !== bulletIndex));
            setEnemies((prevEnemies) => prevEnemies.filter((_, i) => i !== enemyIndex));
            setScore((prevScore) => prevScore + 1); // Aumenta a pontuação
          }
        });
      });
    };
    checkCollisions();
  }, [bullets, enemies]);

  // Verifica se algum inimigo colidiu com a nave
  useEffect(() => {
    enemies.forEach((enemy) => {
      if (
        enemy.x < spaceshipPosition + SPACESHIP_SIZE &&
        enemy.x + ENEMY_SIZE > spaceshipPosition &&
        enemy.y + ENEMY_SIZE > height - SPACESHIP_SIZE - 20
      ) {
        setGameOver(true);
      }
    });
  }, [enemies, spaceshipPosition]);

  // Reiniciar jogo
  const restartGame = () => {
    setSpaceshipPosition(width / 2 - SPACESHIP_SIZE / 2);
    setBullets([]);
    setEnemies([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      {gameOver ? (
        <View style={styles.gameOver}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <TouchableOpacity onPress={restartGame} style={styles.restartButton}>
            <Text style={styles.buttonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.score}>Pontuação: {score}</Text>

          {/* Nave */}
          <View style={[styles.spaceship, { left: spaceshipPosition }]} />

          {/* Balas */}
          {bullets.map((bullet, index) => (
            <View key={index} style={[styles.bullet, { left: bullet.x, top: bullet.y }]} />
          ))}

          {/* Inimigos */}
          {enemies.map((enemy, index) => (
            <View key={index} style={[styles.enemy, { left: enemy.x, top: enemy.y }]} />
          ))}

          {/* Controles de movimento */}
          <View style={styles.controls}>
            <TouchableOpacity onPress={() => moveSpaceship('left')} style={styles.controlButton}>
              <Text style={styles.buttonText}>Esquerda</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={shootBullet} style={styles.controlButton}>
              <Text style={styles.buttonText}>Atirar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => moveSpaceship('right')} style={styles.controlButton}>
              <Text style={styles.buttonText}>Direita</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  spaceship: {
    position: 'absolute',
    bottom: 20,
    width: SPACESHIP_SIZE,
    height: SPACESHIP_SIZE,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  bullet: {
    position: 'absolute',
    width: BULLET_SIZE,
    height: BULLET_SIZE,
    backgroundColor: 'yellow',
  },
  enemy: {
    position: 'absolute',
    width: ENEMY_SIZE,
    height: ENEMY_SIZE,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
  },
  controlButton: {
    backgroundColor: '#008',
    backgroundColor: '#008CBA',
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  score: {
    position: 'absolute',
    top: 50,
    fontSize: 24,
    color: '#fff',
  },
  gameOver: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 48,
    color: 'red',
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#008CBA',
    padding: 20,
    borderRadius: 5,
  },
});
