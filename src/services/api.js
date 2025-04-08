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
    const token = response.data.token;
    const role = response.data.role.toLowerCase();

    // Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ role })); // Add other user info as needed

    return {
      token,
      user: {
        role
      }
    };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Optional: remove user info too
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
  },
  getStudentsByTest: async (testId) => {
    const response = await api.get(`/attempts/test/${testId}/students`);
    return response.data.responseBody || []; // Returns list of students
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
  }

};


export const subjectService = {
  getAllSubjects: async () => {
    const response = await api.get('/subjects');
    return response.data.responseBody || [];
  }
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

    // Normalize role and filter
    const filtered = users.filter(
      (user) => user.role && user.role.toLowerCase() === role.toLowerCase()
    );

    return filtered.map((user) => ({
      id: user.userId || "-", // Use userId from backend
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
  
  // 1. Stringify the user object exactly as backend expects
  formData.append("user", JSON.stringify({
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role // Should be the Role object with id
  }));
  
  // 2. Proper image handling
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