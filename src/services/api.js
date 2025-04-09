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
    const token = response.data.token;
    const role = response.data.role.toLowerCase();
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ role }));
    localStorage.setItem('userId', response.data.userId);
    console.log("Login response:", response.data);
 
    return {
      token,
      user: { role },
      userId: response.data.userId,
    };
  },
 
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }
};
 
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
  },
  getStudentById: async (studentId) => {
    try {
      const response = await api.get(`/users/${studentId}`);
      const student = response.data.responseBody;
      return {
        studentId: String(student.userId),
        firstName: student.name || "Unknown",
        email: student.email || "No Email",
        image: student.image,
        title: "Student",
        rank: "N/A",
        tableData: [],
        barGraphData: [],
        lineGraphData: []
      };
    } catch (error) {
      console.error(`Error fetching student with ID ${studentId}:`, error);
      throw new Error('Failed to load student. Please try again.');
    }
  },
};
 
export const testService = {
  getAllTests: async () => {
    const response = await api.get('/tests/upcoming');
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
  getMissedTests: async (userId) => {
    const response = await api.get(`/attempts/user/${userId}/missed`);
    return response.data;
  },
  getUserTestIds: async (userId) => {
    const response = await api.get(`/attempts/user/${userId}/attendance`);
    return response.data.responseBody || [];
  },
  getTestAttempt: async (testId, userId) => {
    const response = await api.get(`/attempts/${testId}/user/${userId}`);
    return response.data.responseBody;
  },
  getStudentsByTest: async (testId) => {
    const response = await api.get(`/attempts/test/${testId}/students`);
    return response.data.responseBody || [];
  },
  getAccuracyForTest: async (testId, userId) => {
    try {
      const response = await api.get(`/tests/${testId}/outcomes/accuracy`, {
        params: { userId }
      });
      return response.data.responseBody;
    } catch (error) {
      console.error(`Error fetching accuracy for test ${testId} and user ${userId}:`, error);
      return 0;
    }
  },
  getUserAttendance: async (userId) => {
    const response = await api.get(`/attempts/user/${userId}/attendance`);
    return response.data.responseBody || [];
  },
  addTeacherFeedback: async (testId, userId, feedbackText) => {
    try {
      const response = await api.put(
        `/attempts/feedback`,
        { feedback: feedbackText },
        {
          params: { testId, userId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting feedback:", error);
      throw error;
    }
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
    const { testId: _, questionText, answer, options } = questionData;
 
    const orderedQuestionData = {
      questionText,
      answer,
      options,
    };
 
    console.log("Sending JSON:", JSON.stringify(orderedQuestionData));
 
    const formData = new FormData();
    formData.append("question", JSON.stringify(orderedQuestionData));
 
    if (imageFile instanceof File) {
      formData.append("image", imageFile);
    }
 
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
 
export const createUser = async (user, imageFile) => {
  const formData = new FormData();
  formData.append("user", JSON.stringify(user));
  if (imageFile) {
    formData.append("image", imageFile);
  }
 
  try {
    const response = await api.post("/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
 
export const getUsersByRole = async (role) => {
  try {
    const response = await api.get("/users");
    const users = response.data.responseBody;
 
    const filtered = users.filter(
      (user) =>
        user.role &&
        user.role.toLowerCase() === role.toLowerCase() &&
        !user.deletedOn // Exclude soft-deleted users
    );
 
    return filtered.map((user) => ({
      id: user.userId || "-",
      name: user.name || "Unknown",
      email: user.email || "No Email",
      modifiedAt: user.modifiedAt || "N/A",
      image: user.image || null,
      role: user.role,
    }));
  } catch (error) {
    console.error(`Error fetching ${role}s:`, error);
    throw new Error(`Failed to fetch ${role}s`);
  }
};
 
 
export const updateUser = async (id, user, imageFile) => {
  const formData = new FormData();
 
  formData.append("user", JSON.stringify({
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role
  }));
 
  if (imageFile instanceof File) {
    formData.append("image", imageFile);
  }
 
  try {
    const response = await api.put(`/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update error details:", {
      config: error.config,
      response: error.response?.data
    });
    throw error;
  }
};
 
export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};
 
export default api;