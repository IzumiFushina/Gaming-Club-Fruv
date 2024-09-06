import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&category=9&type=multiple');
      const formattedQuestions = response.data.results.map((q) => ({
        question: q.question,
        correct_answer: q.correct_answer,
        answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      }));
      setQuestions(formattedQuestions);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz finalizado! Você acertou ${score} de ${questions.length} perguntas.`);
      setCurrentQuestionIndex(0);
      setScore(0);
      fetchQuestions(); // Para resetar as perguntas
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando perguntas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      {questions[currentQuestionIndex].answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerButton,
            selectedAnswer === answer && {
              backgroundColor: answer === questions[currentQuestionIndex].correct_answer ? 'green' : 'red',
            },
          ]}
          onPress={() => handleAnswer(answer)}
          disabled={selectedAnswer !== null}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}

      {selectedAnswer && (
        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#008CBA',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
