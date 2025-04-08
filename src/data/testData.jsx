

const defaultTestData = [
    {
      testName: "Measurements",
      subjectName: "Physics",
      totalQuestions: 3,
      totalMarks: 30,
      duration: 15,
      variant: "default",
      questions: [
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          image: "images/girl2.jpeg",
          correctOption: null,
          selectedOption: null,
        },
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          image: "images/girl2.jpeg",
          correctOption: null,
          selectedOption: null,
        },
      ],
    },
    {
      testName: "Organic",
      subjectName: "Chemistry",
      totalQuestions: 2,
      totalMarks: 20,
      duration: 10,
      variant: "default",
      questions: [
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "O2", "CO2", "NaCl"],
          image: null,
          correctOption: null,
          selectedOption: null,
        },
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "O2", "CO2", "NaCl"],
          image: null,
          correctOption: null,
          selectedOption: null,
        },
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "O2", "CO2", "NaCl"],
          image: null,
          correctOption: null,
          selectedOption: null,
        },
      ],
    },
  ];
  
  const editableTestData = [
    {
      testName: "Measurements",
      subjectName: "Physics",
      totalQuestions: 3,
      totalMarks: 30,
      duration: 15,
      variant: "editable",
      questions: [
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          image: null,
          correctOption: 2,
          selectedOption: null,
        },
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          image: null,
          correctOption: 1,
          selectedOption: null,
        },
      ],
    },
    {
      testName: "Organic",
      subjectName: "Chemistry",
      totalQuestions: 2,
      totalMarks: 20,
      duration: 10,
      variant: "editable",
      questions: [
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "O2", "CO2", "NaCl"],
          image: null,
          correctOption: 0,
          selectedOption: null,
        },
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "O2", "CO2", "NaCl"],
          image: null,
          correctOption: 0,
          selectedOption: null,
        },
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "O2", "CO2", "NaCl"],
          image: null,
          correctOption: 0,
          selectedOption: null,
        },
      ],
    },
  ];
  
  const evaluatedTestData = [
    {
      testName: "Measurements",
      subjectName: "Physics",
      totalQuestions: 3,
      totalMarks: 30,
      duration: 15,
      variant: "evaluated",
      studentName: "Swetha",
      questions: [
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          image: "images/girl2.jpeg",
          correctOption: 2,
          selectedOption: 1,
        },
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          image: "images/girl2.jpeg",
          correctOption: 2,
          selectedOption: 2,
        },
      ],
    },
    {
      testName: "Organic",
      subjectName: "Chemistry",
      totalQuestions: 2,
      totalMarks: 20,
      duration: 10,
      variant: "evaluated",
      studentName:"John Doe",
      questions: [
        {
          question: "What is the main gas found in the air we breathe?",
          options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
          image: null,
          correctOption: 1,
          selectedOption: 1,
        },
        {
          question: "What is the main gas found in the air we breathe?",
          options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
          image: null,
          correctOption: 1,
          selectedOption: 2,
        },
        {
          question: "What is the main gas found in the air we breathe?",
          options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
          image: null,
          correctOption: 1,
          selectedOption: 0,
        },
      ],
    },
  ];
  
  export { defaultTestData, editableTestData, evaluatedTestData };
  