import axios from 'axios';

const API_BASE_URL = '/api/students';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getStudents = async (search = '') => {
  try {
    const response = await api.get('', {
      params: search ? { search } : {},
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await api.post('', studentData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Helper function to extract user-friendly error messages from backend responses
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    if (data && data.errors) {
      // Return validation field errors object
      return {
        status,
        message: data.message || 'Validation error occurred',
        fieldErrors: data.errors,
      };
    }
    return {
      status,
      message: data.message || `Server error (${status})`,
      fieldErrors: null,
    };
  } else if (error.request) {
    return {
      status: 0,
      message: 'Backend server unavailable. Please check if Spring Boot is running on port 8080.',
      fieldErrors: null,
    };
  } else {
    return {
      status: -1,
      message: error.message || 'An unexpected error occurred.',
      fieldErrors: null,
    };
  }
};
