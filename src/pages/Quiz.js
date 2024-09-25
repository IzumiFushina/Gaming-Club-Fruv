import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function App() {
  const niveis = [
    {
      nivel: 1,
      perguntas: [
        {
          pergunta: 'Qual é a capital do Brasil?',
          respostas: ['Rio de Janeiro', 'Brasília', 'São Paulo', 'Salvador'],
          respostaCorreta: 'Brasília',
        },
        {
          pergunta: 'Qual é o maior planeta do sistema solar?',
          respostas: ['Terra', 'Marte', 'Júpiter', 'Saturno'],
          respostaCorreta: 'Júpiter',
        },
        {
          pergunta: 'Quem pintou a Mona Lisa?',
          respostas: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
          respostaCorreta: 'Leonardo da Vinci',
        },
      ],
    },
    {
      nivel: 2,
      perguntas: [
        {
          pergunta: 'Em que ano o homem pisou na Lua pela primeira vez?',
          respostas: ['1959', '1969', '1979', '1989'],
          respostaCorreta: '1969',
        },
        {
          pergunta: 'Quem escreveu "Dom Quixote"?',
          respostas: ['William Shakespeare', 'Gabriel García Márquez', 'Miguel de Cervantes', 'Victor Hugo'],
          respostaCorreta: 'Miguel de Cervantes',
        },
        {
          pergunta: 'Qual é o maior oceano do mundo?',
          respostas: ['Oceano Atlântico', 'Oceano Índico', 'Oceano Pacífico', 'Oceano Ártico'],
          respostaCorreta: 'Oceano Pacífico',
        },
      ],
    },
    {
      nivel: 3,
      perguntas: [
        {
          pergunta: 'Qual é o elemento químico representado pela letra O?',
          respostas: ['Oxigênio', 'Ouro', 'Osso', 'Ósmio'],
          respostaCorreta: 'Oxigênio',
        },
        {
          pergunta: 'Quem escreveu "A Metamorfose"?',
          respostas: ['Franz Kafka', 'J.R.R. Tolkien', 'George Orwell', 'Ernest Hemingway'],
          respostaCorreta: 'Franz Kafka',
        },
        {
          pergunta: 'Qual é a montanha mais alta do mundo?',
          respostas: ['K2', 'Kangchenjunga', 'Everest', 'Lhotse'],
          respostaCorreta: 'Everest',
        },
      ],
    },
    {
      nivel: 4,
      perguntas: [
        {
          pergunta: 'Quem foi o primeiro matemático a provar o último teorema de Fermat?',
          respostas: ['Andrew Wiles', 'Pierre de Fermat', 'Leonhard Euler', 'Carl Gauss'],
          respostaCorreta: 'Andrew Wiles',
        },
        {
          pergunta: 'Em que ano começou a Revolução Francesa?',
          respostas: ['1776', '1789', '1804', '1815'],
          respostaCorreta: '1789',
        },
        {
          pergunta: 'Qual é a distância da Terra ao Sol, em média?',
          respostas: ['150 milhões de km', '120 milhões de km', '100 milhões de km', '200 milhões de km'],
          respostaCorreta: '150 milhões de km',
        },
      ],
    },
  ];

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [nivelAtual, setNivelAtual] = useState(0); // Controla o nível
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [pontuacao, setPontuacao] = useState(0);

  const handleAnswer = (resposta) => {
    setRespostaSelecionada(resposta);
    const perguntaAtual = niveis[nivelAtual].perguntas[indiceAtual];
    
    if (resposta === perguntaAtual.respostaCorreta) {
      setPontuacao(pontuacao + 1);
    } else {
      // Exibe o alerta quando a resposta estiver errada
      Alert.alert('Resposta Incorreta', `A resposta correta era: ${perguntaAtual.respostaCorreta}`);
    }
  };

  const proximaPergunta = () => {
    setRespostaSelecionada(null);
    if (indiceAtual < 2) { // Se ainda houver perguntas no nível atual
      setIndiceAtual(indiceAtual + 1);
    } else if (nivelAtual < niveis.length - 1) { // Se houver outro nível
      setIndiceAtual(0);
      setNivelAtual(nivelAtual + 1);
    } else {
      alert(`Quiz finalizado! Você acertou ${pontuacao} perguntas.`);
      setIndiceAtual(0);
      setNivelAtual(0);
      setPontuacao(0);
    }
  };

  return (
    <View style={styles.container}>
      {/* Banner do topo */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Nível {nivelAtual + 1}</Text>
      </View>

      {/* Pergunta */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {niveis[nivelAtual].perguntas[indiceAtual].pergunta}
        </Text>
      </View>

      {/* Respostas */}
      <View style={styles.answersContainer}>
        {niveis[nivelAtual].perguntas[indiceAtual].respostas.map((resposta, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              respostaSelecionada === resposta && {
                backgroundColor: resposta === niveis[nivelAtual].perguntas[indiceAtual].respostaCorreta ? '#4CAF50' : '#F44336',
              },
            ]}
            onPress={() => handleAnswer(resposta)}
            disabled={respostaSelecionada !== null}
          >
            <Text style={styles.answerText}>{resposta}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão Próxima */}
      {respostaSelecionada && (
        <TouchableOpacity style={styles.nextButton} onPress={proximaPergunta}>
          <Text style={styles.nextButtonText}>Próxima Pergunta</Text>
        </TouchableOpacity>
      )}
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
  banner: {
    backgroundColor: '#4fa3e3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  bannerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  questionText: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
  },
  answersContainer: {
    width: '100%',
    alignItems: 'center',
  },
  answerButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 8,
    width: '90%',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  answerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#4fa3e3',
    padding: 15,
    marginTop: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
