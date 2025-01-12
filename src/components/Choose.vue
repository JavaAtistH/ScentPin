<template>
    <div class="quiz-container">
      <h2 v-if="!quizComplete">{{ questions[currentQuestionIndex].question }}</h2>
  
      <div v-if="!quizComplete" class="options">
        <button 
          v-for="(option, index) in questions[currentQuestionIndex].options" 
          :key="index" 
          @click="selectOption(option)">
          {{ option.text }}
        </button>
      </div>
  
      <div v-if="quizComplete" class="result">
        <h2>Thank you for completing the quiz!</h2>
        <p>Your selected answers:</p>
        <ul>
          <li v-for="(answer, index) in selectedAnswers" :key="index">
            {{ index + 1 }}. {{ answer.text }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentQuestionIndex: 0,
        quizComplete: false,
        selectedAnswers: [],
        questions: [
          {
            question: "What is your favorite scent type?",
            options: [
              { text: "Fresh", value: "fresh" },
              { text: "Woody", value: "woody" },
              { text: "Floral", value: "floral" },
              { text: "Oriental", value: "oriental" },
            ],
          },
          {
            question: "What mood are you aiming for?",
            options: [
              { text: "Relaxing", value: "relaxing" },
              { text: "Energizing", value: "energizing" },
              { text: "Romantic", value: "romantic" },
              { text: "Confident", value: "confident" },
            ],
          },
          {
            question: "What is your favorite season?",
            options: [
              { text: "Spring", value: "spring" },
              { text: "Summer", value: "summer" },
              { text: "Autumn", value: "autumn" },
              { text: "Winter", value: "winter" },
            ],
          },
        ],
      };
    },
    methods: {
      selectOption(option) {
        this.selectedAnswers.push(option);
  
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
        } else {
          this.quizComplete = true;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .quiz-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    font-family: Arial, sans-serif;
  }
  
  h2 {
    font-size: 1.5em;
    margin-bottom: 20px;
  }
  
  .options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    background-color: #f9f9f9;
  }
  
  button:hover {
    background-color: #e0e0e0;
  }
  
  .result {
    margin-top: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    text-align: left;
    font-size: 1em;
    margin: 5px 0;
  }
  </style>
  