import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
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
    return {
      token: response.data.token,
      user: {
        role: response.data.role.toLowerCase(),
       
      }
    };
  },
  logout: () => {
    localStorage.removeItem('token');
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
  }
};

export const testAttemptService = {
  // Get list of test IDs for a user
  getUserTestIds: async (userId) => {
    const response = await api.get(`/attempts/user/${userId}/attendance`);
    return response.data.responseBody || []; // Returns array of test IDs
  },
  
  // Get details for a specific test attempt
  getTestAttempt: async (testId, userId) => {
    const response = await api.get(`/attempts/${testId}/user/${userId}`);
    return response.data.responseBody; // Returns full attempt details
  }
};

export const subjectService = {
  getAllSubjects: async () => {
    const response = await api.get('/subjects');
    return response.data.responseBody || [];
  }
};
export default api;