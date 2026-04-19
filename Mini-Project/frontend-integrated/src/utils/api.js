const API_BASE = 'http://localhost:8081/api'

const request = async (url, options = {}) => {
  const res = await fetch(API_BASE + url, options)
  const data = await res.json().catch(() => ({ message: 'Request failed' }))
  if (!res.ok) return Promise.reject(data)
  return data
}

export const api = {
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),

  signup: (name, email, password, mobileNo) =>
    request('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, mobileNo }),
    }),

  verifyOtp: (email, otp) =>
    request(`/otp/verify?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`, {
      method: 'POST',
    }),

  getUser: (token) =>
    request('/user', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getCart: (token) =>
    request('/cart', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  addToCart: (item, token) =>
    request('/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(item),
    }),

  removeFromCart: (id, token) =>
    request(`/cart/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),

  predictMobilePrice: (payload) =>
    request('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),

  predictLaptopPrice: (payload) =>
    fetch('http://localhost:5002/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const data = await res.json().catch(() => ({ error: 'Invalid response' }))
      if (!res.ok) return Promise.reject(data)
      return data
    }),

  predictTabletPrice: (payload) =>
    fetch('http://localhost:5003/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const data = await res.json().catch(() => ({ error: 'Invalid response' }))
      if (!res.ok) return Promise.reject(data)
      return data
    }),



  analyzePhoneImage: (file) => {
    const form = new FormData()
    form.append('image', file)
    return request('/ai/phone-condition', {
      method: 'POST',
      body: form,
    })
  },

  validatePhoneImage: (file) => {
    // Posts directly to the Flask YOLO server (port 5000), not the Java backend.
    const form = new FormData()
    form.append('image', file)
    return fetch('http://localhost:5000/predict-image', {
      method: 'POST',
      body: form,
    }).then(async (res) => {
      const data = await res.json().catch(() => ({ error: 'Invalid JSON response from prediction server' }))
      if (!res.ok) return Promise.reject(data)
      return data
    }).catch((err) => {
      // Network error (server not running) → produce clear message
      if (err instanceof TypeError && err.message.includes('fetch')) {
        return Promise.reject(new Error('Image prediction server is not running (http://localhost:5000). Start "python app.py" in the Image_Prediction folder.'))
      }
      return Promise.reject(err)
    })
  },

  // ── Admin Endpoints (Node.js Backend - Port 3000) ──────────────────────────
  getAllUsers: () =>
    fetch('http://localhost:3000/api/users').then(res => res.json()),

  deleteUser: (id) =>
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),

  createUser: (userData) =>
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }).then(res => res.json()),
}

