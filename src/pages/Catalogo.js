import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

const GradientPage = () => {
  // Array de estilos personalizados para cada cubo
  const cubes = [
    { id: 1, image: require('../images/cacaotesouro.jpeg') },
    { id: 2, image: require('../images/campominado.jpeg') },
    { id: 3, image: require('../images/2048.png') },
    { id: 4, image: require('../images/circulo.png') },
    { id: 5, image: require('../images/cores.jpeg') },
    { id: 6, image: require('../images/labirinto.png') },
    { id: 7, image: require('../images/memoria.jpeg') },
    { id: 8, image: require('../images/snake.jpeg') },
  ];

  return (
    <LinearGradient
      colors={['#edeb77', '#ffb8fe', '#f26363']}
      style={styles.gradient}>
      <View style={styles.content}>
        <Text style={styles.text}>GamingClub</Text>
      </View>
      <Text style={styles.subtitle}>Catálogo</Text>

      {/* Adicionando os cubos com ScrollView */}
      <ScrollView contentContainerStyle={styles.cubeWrapper}>
        <View style={styles.leftColumn}>
          {cubes.slice(0, 4).map((cube) => (
            <ImageBackground key={cube.id} source={cube.image} style={styles.cube} />
          ))}
        </View>
        <View style={styles.rightColumn}>
          {cubes.slice(4, 8).map((cube) => (
            <ImageBackground key={cube.id} source={cube.image} style={styles.cube} />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 13,
    backgroundColor: 'rgba(255, 211, 54, 0.5)',
    borderRadius: 90,
    marginTop: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 20,
    padding: 10,
    color: '#000',
  },
  cubeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  leftColumn: {
    flex: 1,
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'center',
  },
  cube: {
    width: 200,
    height: 200,
    margin: 20,
  },
});

export default GradientPage;
