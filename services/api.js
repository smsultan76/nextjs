import api from '@/lib/api';

export const apiService = {
  // Example API calls - replace with your actual endpoints
  async getPosts() {
    const response = await api.get('/posts');
    return response.data;
  },

  async createPost(data) {
    const response = await api.post('/posts', data);
    return response.data;
  },

  async updatePost(id, data) {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id) {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  }
};