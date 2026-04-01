import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../utils/api'

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)       // { id, name, firstName, email, phone, … }
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true) // true while hydrating from storage

  // Hydrate from localStorage on first mount, then refresh firstName from server
  useEffect(() => {
    const run = async () => {
      try {
        const storedUser  = JSON.parse(localStorage.getItem('eco_user'))
        const storedToken = localStorage.getItem('eco_token')
        if (storedUser && storedToken) {
          // Immediately restore from localStorage so UI is not blank
          setUser(storedUser)
          setToken(storedToken)

          // Then fetch fresh firstName from the server in the background
          try {
            const data = await api.getUser(storedToken)   // { firstName: "Abi" }
            const refreshed = { ...storedUser, firstName: data.firstName }
            setUser(refreshed)
            localStorage.setItem('eco_user', JSON.stringify(refreshed))
          } catch {
            // Server unreachable — fall back to splitting the stored name
            if (!storedUser.firstName && storedUser.name) {
              const firstName = storedUser.name.trim().split(' ')[0]
              setUser({ ...storedUser, firstName })
            }
          }
        }
      } catch {
        // corrupted storage — ignore
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  /** Call after a successful login / sign-up API response */
  const login = useCallback((userData, authToken) => {
    // Derive firstName immediately from the full name returned by login
    const firstName = userData.firstName
      || (userData.name ? userData.name.trim().split(' ')[0] : '')
    const enriched = { ...userData, firstName }

    setUser(enriched)
    setToken(authToken)
    localStorage.setItem('eco_user', JSON.stringify(enriched))
    localStorage.setItem('eco_token', authToken)

    // Refresh firstName from server after login (non-blocking)
    api.getUser(authToken)
      .then((data) => {
        const latest = { ...enriched, firstName: data.firstName }
        setUser(latest)
        localStorage.setItem('eco_user', JSON.stringify(latest))
      })
      .catch(() => {}) // keep the locally-derived firstName on failure
  }, [])

  /** Clear auth state everywhere */
  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('eco_user')
    localStorage.removeItem('eco_token')
  }, [])

  /** First name only — for welcome messages & navbar pill */
  const firstName = user?.firstName || user?.name?.trim().split(' ')[0] || ''

  /** Full name exactly as entered during account creation */
  const displayName = user?.name?.trim() || ''

  /** Whether the visitor is authenticated */
  const isLoggedIn = Boolean(user && token)

  return (
    <AuthContext.Provider value={{ user, token, loading, isLoggedIn, firstName, displayName, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
