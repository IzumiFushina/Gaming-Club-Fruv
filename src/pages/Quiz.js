import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const perguntas = [
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
    {
      pergunta: 'Em que ano o homem pisou na Lua pela primeira vez?',
      respostas: ['1959', '1969', '1979', '1989'],
      respostaCorreta: '1969',
    },
    {
      pergunta: 'Qual é o elemento químico representado pela letra O?',
      respostas: ['Oxigênio', 'Ouro', 'Osso', 'Ósmio'],
      respostaCorreta: 'Oxigênio',
    },
  ];

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [pontuacao, setPontuacao] = useState(0);

  const handleAnswer = (resposta) => {
    setRespostaSelecionada(resposta);
    if (resposta === perguntas[indiceAtual].respostaCorreta) {
      setPontuacao(pontuacao + 1);
    }
  };

  const proximaPergunta = () => {
    setRespostaSelecionada(null);
    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      alert(`Quiz finalizado! Você acertou ${pontuacao} de ${perguntas.length} perguntas.`);
      setIndiceAtual(0);
      setPontuacao(0);
    }
  };

  return (
    <View style={styles.container}>
      {/* Banner do topo */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>NÍbel  - {indiceAtual + 1}</Text>
      </View>

      {/* Pergunta */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{perguntas[indiceAtual].pergunta}</Text>
      </View>

      {/* Respostas */}
      <View style={styles.answersContainer}>
        {perguntas[indiceAtual].respostas.map((resposta, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              respostaSelecionada === resposta && {
                backgroundColor: resposta === perguntas[indiceAtual].respostaCorreta ? '#4CAF50' : '#F44336',
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
    backgroundColor: 'linear-gradient(180deg, #ff9a9e, #fad0c4)',
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
