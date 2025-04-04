// src/data/attendTestData.jsx

export const attendTestData = {
    default: {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      image: "images/girl2.jpeg", // Optional image
      questionNumber: 1,
      variant: "default",
    },
  
    selectable: [
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          image: null,
          questionNumber: 1,
          variant: "selectable",
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Earth", "Venus", "Mars", "Jupiter"],
          image: null,
          questionNumber: 2,
          variant: "selectable",
        },
        {
          question: "Who wrote 'Hamlet'?",
          options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
          image: null,
          questionNumber: 3,
          variant: "selectable",
        },
        {
          question: "What is the largest ocean on Earth?",
          options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
          image: null,
          questionNumber: 4,
          variant: "selectable",
        },
        {
          question: "Which element has the chemical symbol 'O'?",
          options: ["Oxygen", "Osmium", "Gold", "Silver"],
          image: null,
          questionNumber: 5,
          variant: "selectable",
        },
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            image: null,
            questionNumber: 6,
            variant: "selectable",
          },
          {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Venus", "Mars", "Jupiter"],
            image: null,
            questionNumber: 7,
            variant: "selectable",
          },
          {
            question: "Who wrote 'Hamlet'?",
            options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
            image: null,
            questionNumber: 8,
            variant: "selectable",
          },
          {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            image: null,
            questionNumber: 9,
            variant: "selectable",
          },
          {
            question: "Which element has the chemical symbol 'O'?",
            options: ["Oxygen", "Osmium", "Gold", "Silver"],
            image: null,
            questionNumber: 10,
            variant: "selectable",
          },
      ],
  
    highlighted: {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      image: null,
      questionNumber: 3,
      variant: "highlighted",
      correctOption: 2, // Correct option index
    },
  
    marked: {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      image: null,
      questionNumber: 4,
      variant: "marked",
      selectedOption: 2, // Selected option
      correctOption: 2,  // Correct option
    },
  
    markedIncorrect: {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      image: null,
      questionNumber: 5,
      variant: "marked",
      selectedOption: 1, // Incorrectly marked option
      correctOption: 2,  // Correct option
    },
  
    editable: {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      image: "images/girl2.jpeg",
      questionNumber: 6,
      variant: "editable",
      correctOption: 2, 
      onEdit: () => alert("Edit clicked!"),
      onDelete: () => alert("Delete clicked!"),
    },
  };
  