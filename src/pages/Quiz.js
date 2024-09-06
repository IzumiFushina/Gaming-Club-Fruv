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
      <Text style={styles.pergunta}>{perguntas[indiceAtual].pergunta}</Text>
      {perguntas[indiceAtual].respostas.map((resposta, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.botaoResposta,
            respostaSelecionada === resposta && {
              backgroundColor: resposta === perguntas[indiceAtual].respostaCorreta ? 'green' : 'red',
            },
          ]}
          onPress={() => handleAnswer(resposta)}
          disabled={respostaSelecionada !== null}
        >
          <Text style={styles.textoResposta}>{resposta}</Text>
        </TouchableOpacity>
      ))}

      {respostaSelecionada && (
        <TouchableOpacity style={styles.botaoProxima} onPress={proximaPergunta}>
          <Text style={styles.textoBotaoProxima}>Próxima Pergunta</Text>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  pergunta: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  botaoResposta: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  textoResposta: {
    fontSize: 16,
  },
  botaoProxima: {
    backgroundColor: '#008CBA',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  textoBotaoProxima: {
    color: '#fff',
    fontSize: 16,
  },
});
