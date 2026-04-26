// ─── API Base URLs — read from environment variables for deployment ────────────
// On Render/Netlify, set VITE_API_BASE_URL and VITE_NODE_API_URL in environment settings
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api'

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

  predictLaptopPrice: (payload) => {
    const laptopUrl = import.meta.env.VITE_LAPTOP_PREDICT_URL || 'http://localhost:5002/predict'
    return fetch(laptopUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const data = await res.json().catch(() => ({ error: 'Invalid response' }))
      if (!res.ok) return Promise.reject(data)
      return data
    })
  },

  predictTabletPrice: (payload) => {
    const tabletUrl = import.meta.env.VITE_TABLET_PREDICT_URL || 'http://localhost:5003/predict'
    return fetch(tabletUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const data = await res.json().catch(() => ({ error: 'Invalid response' }))
      if (!res.ok) return Promise.reject(data)
      return data
    })
  },

  analyzePhoneImage: (file) => {
    const form = new FormData()
    form.append('image', file)
    return request('/ai/phone-condition', {
      method: 'POST',
      body: form,
    })
  },

  validatePhoneImage: (file) => {
    const yoloUrl = import.meta.env.VITE_YOLO_URL || 'http://localhost:5000/predict-image'
    const form = new FormData()
    form.append('image', file)
    return fetch(yoloUrl, {
      method: 'POST',
      body: form,
    }).then(async (res) => {
      const data = await res.json().catch(() => ({ error: 'Invalid JSON response from prediction server' }))
      if (!res.ok) return Promise.reject(data)
      return data
    }).catch((err) => {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        return Promise.reject(new Error('Image prediction server is not running. Start "python app.py" in the Image_Prediction folder.'))
      }
      return Promise.reject(err)
    })
  },

  // ── Admin Endpoints (Spring Boot Backend) ─────────────────────────────────────
  getAllUsers: () =>
    request('/users', { method: 'GET' }),

  deleteUser: (id) =>
    request(`/users/${id}`, { method: 'DELETE' }),

  createUser: (userData) =>
    request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }),

  // ── Pickup Request Endpoints ──────────────────────────────────────────
  getAllPickups: () =>
    request('/pickups', { method: 'GET' }),

  createPickup: (pickupData) =>
    request('/pickups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pickupData),
    }),

  updatePickupStatus: (id, status, paymentStatus) =>
    request(`/pickups/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, paymentStatus }),
    }),
}
