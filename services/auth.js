import api from '@/lib/api';

export const authService = {
  // Get CSRF cookie
  async getCsrfToken() {
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
      withCredentials: true
    });
  },

  // Login
  async login(email, password) {
    await this.getCsrfToken();
    const response = await api.post('/login', { email, password });
    
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response.data;
  },

  // Logout
  async logout() {
    await api.post('/logout');
    localStorage.removeItem('auth_token');
  },

  // Get user data
  async getUser() {
    const response = await api.get('/user');
    return response.data;
  }
};