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
        email: response.data.sub,
        role: response.data.role.toLowerCase(),
        role_id: response.data.roleId // Assuming backend returns roleId
      }
    };
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

// User/Student Service

export const studentService = {
  getStudents: async () => {
    try {
      console.log("Fetching students from API...");
      const response = await api.get('/users');
  
      console.log("Full API response:", response);
  
      if (!response.data || !response.data.responseBody || !Array.isArray(response.data.responseBody)) {
        console.error("Unexpected response structure:", response.data);
        throw new Error("API returned unexpected data structure");
      }
  
      return response.data.responseBody.map(student => ({
        id: student.userId,
        studentId: student.userId,
        firstName: student.username || student.name,
        email: student.email,
        role_id: student.role?.id,
        image: student.image
      }));
    } catch (error) {
      console.error("Error fetching students:", error);
      throw new Error("Failed to load student data.");
    }
  }
};  
//   // Get student details
//   getStudentDetails: async (studentId) => {
//     const response = await api.get(`/users/${studentId}`);
//     return response.data.data || response.data; // Handle both response structures
//   },

//   // Create student (admin only)
//   createStudent: async (studentData) => {
//     const formData = new FormData();
//     formData.append('user', JSON.stringify({
//       username: studentData.username,
//       email: studentData.email,
//       password: studentData.password,
//       role: { id: 2 } // Set role_id to 2 for student
//     }));
    
//     if (studentData.image) {
//       formData.append('image', studentData.image);
//     }

//     const response = await api.post('/users', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data.data || response.data;
//   },

//   // Update student
//   updateStudent: async (id, studentData) => {
//     const formData = new FormData();
//     formData.append('user', JSON.stringify({
//       username: studentData.username,
//       email: studentData.email,
//       role: { id: 2 } // Ensure role remains student
//     }));
    
//     if (studentData.image) {
//       formData.append('image', studentData.image);
//     }

//     const response = await api.put(`/users/${id}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data.data || response.data;
//   },

//   // Delete student (soft delete)
//   deleteStudent: async (id) => {
//     const response = await api.delete(`/users/${id}`);
//     return response.data.data || response.data;
//   }
// };

export default api;