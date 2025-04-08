import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId);
    console.log("Login response:", response.data);

    return {
      token: response.data.token,
       userId: response.data.userId,
      user: {
        role: response.data.role.toLowerCase(),
       
      }
    };
    
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
};

// Student Service
export const studentService = {
  getStudents: async () => {
    try {
      const response = await api.get('/users'); // Fetch all users
      const users = response.data.responseBody;

      // Filter only users with role "STUDENT" (assuming role is case-insensitive)
      const students = users.filter(user => 
        user.role && user.role.toLowerCase() === "student"
      );

      return students.map(student => ({
        studentId: String(student.userId), // Convert userId to a string
        firstName: student.name || "Unknown", // Ensure a valid name
        email: student.email || "No Email",
        image: student.image ,
        title: "Student", 
        rank: "N/A",
        tableData: [],
        barGraphData: [],
        lineGraphData: []
      }));
      
    } catch (error) {
      console.error('Error fetching students:', error);
      throw new Error('Failed to load students. Please try again.');
    }
  }
};


export const testService = {
  getAllTests: async () => {
    const response = await api.get('/tests');
    return response.data.responseBody;
  },
  getCompletedTests: async () => {
    const response = await api.get('/tests/history');
    return response.data.responseBody || [];
  },

  createTest: async (testData) => {
    console.log("📡 POST /tests with data:", testData);
    const response = await api.post('/tests', testData);
    return response.data;
  },

  getAllTestData: async () => {
    const [all, completed] = await Promise.all([
      testService.getAllTests(),
      testService.getCompletedTests()
    ]);
    return { allTests: all, completedTests: completed };
  },
  
  getTestById: (testId) => api.get(`/tests/${testId}`),

  
getUpcomingTests: () => api.get('/tests/upcoming'),




};

export const testAttemptService = {

  getMissedTests: async (userId) =>
    {
      const response = await api.get(`/attempts/user/${userId}/missed`);
      return response.data; // ← return entire response, not just .data.responseBody
    },
  // Get list of test IDs for a user
  getUserTestIds: async (userId) => {
    const response = await api.get(`/attempts/user/${userId}/attendance`);
    return response.data.responseBody || []; // Returns array of test IDs
  },
  
  // Get details for a specific test attempt
  getTestAttempt: async (testId, userId) => {
    const response = await api.get(`/attempts/${testId}/user/${userId}`);
    return response.data.responseBody; // Returns full attempt details
  },

  getUserAttendance: async (userId) => {
    const response = await api.get(`/attempts/user/${userId}/attendance`);
    return response.data.responseBody || []; // returns array of test IDs
  },
  

};

export const subjectService = {
  getAllSubjects: async () => {
    const response = await api.get('/subjects');
    return response.data.responseBody || [];
  },
  getSubjectById: (subjectId) => api.get(`/subjects/${subjectId}`),

};

export const questionService = {
  addQuestion: async (testId, questionData, imageFile) => {
    // ✅ Destructure out testId (if it exists accidentally)
    const { testId: _, questionText, answer, options} = questionData;

   
const orderedQuestionData = {
  questionText,
  answer,
  options,
};



    // ✅ Log what’s being sent
    console.log("Sending JSON:", JSON.stringify(orderedQuestionData));

    // ✅ Prepare FormData
    const formData = new FormData();
    formData.append("question", JSON.stringify(orderedQuestionData));

    // ✅ Conditionally add image
    if (imageFile instanceof File) {
      formData.append("image", imageFile);
    }

    // ✅ Axios POST with multipart/form-data
    const response = await api.post(`/tests/${testId}/questions`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  getQuestionsByTestId: async (testId) => {
    try {
      const response = await api.get(`/tests/${testId}/questions`);
      return response.data;
    } catch (error) {
      console.error("Error fetching questions by test ID:", error.response?.data || error.message);
      throw error;
    }
  },
};



export default api;