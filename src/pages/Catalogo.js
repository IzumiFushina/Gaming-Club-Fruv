import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

const GradientPage = () => {
  // Array de estilos personalizados para cada cubo
  const cubes = [
    { id: 1, image: require('../images/matematica.png') },
    { id: 2, image: require('../images/memoria.png') },
    { id: 3, image: require('../images/quiz.png') },
    { id: 4, image: require('../images/caçaaotesouro.png') },
    { id: 5, image: require('../images/cobrinha.png') },
    { id: 6, image: require('../images/campominado.png') },
    { id: 7, image: require('../images/jogo2048.png') },
  ];

  return (
    <LinearGradient
      colors={['#edeb77', '#ffb8fe', '#f26363']}
      style={styles.gradient}>
      <View style={styles.content}>
        <Text style={styles.text}>GamingClub</Text>
      </View>
      <Text style={styles.subtitle}>Catálogo</Text>

      {/* Adicionando os cubos com ScrollView horizontal */}
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.cubeWrapper}
        showsHorizontalScrollIndicator={false}
      >
        {cubes.map((cube) => (
          <ImageBackground key={cube.id} source={cube.image} style={styles.cube} />
        ))}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  cube: {
    width: 350,
    height: 350,
    marginHorizontal: 10,
  },
});

export default GradientPage;
