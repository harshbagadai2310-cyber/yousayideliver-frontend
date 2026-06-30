const API_BASE = import.meta.env.MODE === 'production'
  ? 'https://yousayideliver-backend.vercel.app/api'
  : '/api'; // Configured with Vite proxy in dev

// General request wrapper
const request = async (url, options = {}) => {
  const defaultHeaders = {};
  
  // Do not set Content-Type header if body is FormData (e.g., file uploads)
  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  options.headers = {
    ...defaultHeaders,
    ...options.headers
  };
  options.credentials = 'include'; // Essential to pass HttpOnly JWT cookies

  const response = await fetch(`${API_BASE}${url}`, options);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  // Return json or text
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
};

export const api = {
  // Auth API
  auth: {
    login: (username, password) => request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),
    logout: () => request('/auth/logout', { method: 'POST' }),
    me: () => request('/auth/me'),
    register: (username, password) => request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
  },

  // Services API
  services: {
    list: () => request('/services'),
    create: (data) => request('/services', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => request(`/services/${id}`, { method: 'DELETE' })
  },

  // Portfolio API
  portfolio: {
    list: () => request('/portfolio'),
    create: (data) => request('/portfolio', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => request(`/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => request(`/portfolio/${id}`, { method: 'DELETE' }),
    
    // Niches
    listNiches: () => request('/portfolio/niches'),
    createNiche: (name) => request('/portfolio/niches', {
      method: 'POST',
      body: JSON.stringify({ name })
    }),
    updateNiche: (id, name) => request(`/portfolio/niches/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name })
    }),
    deleteNiche: (id) => request(`/portfolio/niches/${id}`, { method: 'DELETE' }),

    // Categories
    listCategories: () => request('/portfolio/categories'),
    createCategory: (name) => request('/portfolio/categories', {
      method: 'POST',
      body: JSON.stringify({ name })
    }),
    updateCategory: (id, name) => request(`/portfolio/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name })
    }),
    deleteCategory: (id) => request(`/portfolio/categories/${id}`, { method: 'DELETE' })
  },

  // Bookings API
  bookings: {
    list: () => request('/bookings'),
    create: (data) => request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateStatus: (id, status) => request(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
    delete: (id) => request(`/bookings/${id}`, { method: 'DELETE' })
  },

  // Media (GridFS) API
  media: {
    list: () => request('/media/files'),
    upload: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return request('/media/upload', {
        method: 'POST',
        body: formData
      });
    },
    delete: (fileId) => request(`/media/${fileId}`, { method: 'DELETE' }),
    getStreamUrl: (fileId) => `${API_BASE}/media/${fileId}`
  },
  
  // Blogs API
  blogs: {
    list: () => request('/blogs'),
    listAll: () => request('/blogs/all'),
    getBySlug: (slug) => request(`/blogs/post/${slug}`),
    create: (data) => request('/blogs', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => request(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => request(`/blogs/${id}`, { method: 'DELETE' })
  },

  // Inquiries API
  inquiries: {
    list: () => request('/inquiries'),
    create: (data) => request('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateStatus: (id, status) => request(`/inquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
    delete: (id) => request(`/inquiries/${id}`, { method: 'DELETE' })
  }
};
