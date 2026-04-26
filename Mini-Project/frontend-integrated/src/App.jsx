import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { pageVariants } from './utils/motion'
import { api } from './utils/api'
import { useAuth } from './context/AuthContext'

import Navbar from './components/layout/Navbar'
import CartModal from './components/ui/CartModal'
import AuthModal from './components/ui/AuthModal'
import Chatbot from './components/ui/Chatbot'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProcessPage from './pages/ProcessPage'
import SearchPage from './pages/SearchPage'
import CategoryPage from './pages/CategoryPage'
import ModelsPage from './pages/ModelsPage'
import VariantsPage from './pages/VariantsPage'
import DetailsPage from './pages/DetailsPage'
import SystemConfigPage from './pages/SystemConfigPage'
import EstimatePage from './pages/EstimatePage'
import CartPage from './pages/CartPage'
import EcoloopAdmin from './pages/EcoloopAdmin'
import SchedulePickupPage from './pages/SchedulePickupPage'
import WalletPage from './pages/WalletPage'

// ─── ROUTE MAP ───────────────────────────────────────────────────────────────
const ROUTES = {
  '/': 'home',
  '/about': 'about',
  '/process': 'process',
  '/search': 'search',
  '/login': 'signin',
  '/signup': 'signup',
  '/mobile': 'category',
  '/laptop': 'category',
  '/tablet': 'category',
  '/models': 'models',
  '/variants': 'variants',
  '/details': 'details',
  '/sysconfig': 'sysconfig',
  '/estimate': 'estimate',
  '/cart': 'cart',
  '/admin': 'ecoloopadmin',
  '/schedule-pickup': 'schedulepickup',
  '/wallet': 'wallet',
}

function pageToPath(page, nav = {}) {
  if (page === 'category') return `/${nav.category || 'mobile'}`
  const map = {
    home: '/', about: '/about', process: '/process', search: '/search',
    signin: '/login', signup: '/signup', models: '/models',
    variants: '/variants', details: '/details', sysconfig: '/sysconfig', estimate: '/estimate',
    cart: '/cart', ecoloopadmin: '/admin', schedulepickup: '/schedule-pickup',
    wallet: '/wallet',
  }
  return map[page] || '/'
}

function pathToPage(path) {
  const catMap = { '/mobile': 'mobile', '/laptop': 'laptop', '/tablet': 'tablet' }
  if (catMap[path]) return { page: 'category', partialNav: { category: catMap[path] } }
  const page = ROUTES[path]
  if (page) return { page, partialNav: {} }
  return { page: 'home', partialNav: {} }
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const init = pathToPage(window.location.pathname)

  const [history, setHistory] = useState(() => {
    try {
      const saved = sessionStorage.getItem('ecoloop_nav_history')
      if (saved) return JSON.parse(saved)
    } catch (e) {}
    return [{ page: init.page, nav: init.partialNav }]
  })

  useEffect(() => {
    try {
      sessionStorage.setItem('ecoloop_nav_history', JSON.stringify(history))
    } catch (e) {
      console.warn('Storage quota exceeded, clearing old history...');
      if (history.length > 20) {
        setHistory(prev => prev.slice(prev.length - 20));
      } else {
        sessionStorage.removeItem('ecoloop_nav_history');
      }
    }
  }, [history])
  const [cartOpen, setCartOpen] = useState(false)
  const [pageKey, setPageKey] = useState(0)   // triggers transition
  const [visible, setVisible] = useState(true)
  const [authMode, setAuthMode] = useState(null) // 'signin' | 'signup' | null
  const [pendingCartItem, setPendingCartItem] = useState(null)

  // ── Auth from context (persisted via AuthContext → localStorage) ─────────────
  const { user, token, login, logout: authLogout } = useAuth()
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (token && cart.length === 0) {
      api.getCart(token).then(setCart).catch(() => { })
    }
  }, [token])

  const current = history[history.length - 1]
  const page = current.page
  const nav = current.nav
  const canGoBack = history.length > 1

  // Sync URL & title
  useEffect(() => {
    const url = pageToPath(page, nav)
    if (window.location.pathname !== url) window.history.pushState({ page, nav }, '', url)
    const titles = {
      home: 'EcoRecycle — Recycle Your Old Devices',
      about: 'About Us — EcoRecycle',
      process: 'How It Works — EcoRecycle',
      search: 'Search Devices — EcoRecycle',
      signin: 'Sign In — EcoRecycle',
      signup: 'Create Account — EcoRecycle',
      category: `${nav.category ? nav.category.charAt(0).toUpperCase() + nav.category.slice(1) : 'Category'} — EcoRecycle`,
      models: 'Models — EcoRecycle',
      variants: 'Variants — EcoRecycle',
      details: 'Device Condition — EcoRecycle',
      sysconfig: 'System Configuration — EcoRecycle',
      estimate: 'Price Estimate — EcoRecycle',
      cart: 'My Cart — EcoRecycle',
      ecoloopadmin: 'Admin Dashboard — EcoRecycle',
      wallet: 'My Wallet — EcoRecycle',
    }
    document.title = titles[page] || 'EcoRecycle'
  }, [page, nav])

  useEffect(() => {
    const handlePop = (e) => {
      setHistory((prev) => {
        let nextHistory;
        if (e.state?.page) nextHistory = [...prev, { page: e.state.page, nav: e.state.nav || {} }]
        else {
          const { page: p, partialNav } = pathToPage(window.location.pathname)
          nextHistory = [...prev, { page: p, nav: partialNav }]
        }
        if (nextHistory.length > 50) return nextHistory.slice(nextHistory.length - 50)
        return nextHistory
      })
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  // Handle Google Login redirect success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('token')
    if (t) {
      const u = {
        id: params.get('id'),
        name: params.get('name'),
        email: params.get('email')
      }
      onLoginSuccess(u, t)
      window.history.replaceState({}, '', '/')
    }
  }, [])


  const go = useCallback((p, extra = {}) => {
    setVisible(false)
    setTimeout(() => {
      setHistory((prev) => {
        const prevNav = prev[prev.length - 1].nav
        const newNav = { ...prevNav, ...extra }
        window.history.pushState({ page: p, nav: newNav }, '', '/') 
        const nextHistory = [...prev, { page: p, nav: newNav }]
        if (nextHistory.length > 50) return nextHistory.slice(nextHistory.length - 50)
        return nextHistory
      })
      setPageKey(k => k + 1)
      setVisible(true)
      window.scrollTo(0, 0)
    }, 120)
  }, [])

  const goBack = useCallback(() => {
    if (history.length <= 1) return
    setVisible(false)
    setTimeout(() => {
      setHistory((prev) => {
        const next = prev.slice(0, -1)
        const last = next[next.length - 1]
        window.history.pushState({ page: last.page, nav: last.nav }, '', pageToPath(last.page, last.nav))
        return next
      })
      setPageKey(k => k + 1)
      setVisible(true)
      window.scrollTo(0, 0)
    }, 120)
  }, [history])

  // ── Auth ────────────────────────────────────────────────────────────────────
  const onLoginSuccess = (u, t) => {
    login(u, t)                             // saves to context + localStorage
    api.getCart(t).then(setCart).catch(() => { })
    setAuthMode(null)
    if (pendingCartItem) {
      setCart((prev) => [...prev, { ...pendingCartItem, id: Date.now() }])
      setPendingCartItem(null)
      setCartOpen(true)
    }
  }

  const onLogout = () => {
    authLogout()                            // clears context + localStorage
    setCart([])
    setHistory([{ page: 'home', nav: {} }])
    window.history.pushState({}, '', '/')
  }

  // ── Cart ────────────────────────────────────────────────────────────────────
  const addToCart = async (item) => {
    if (!token) {
      setPendingCartItem(item)
      setAuthMode('signin')
      return false
    }
    try {
      const s = await api.addToCart(item, token)
      setCart((p) => [...p, s])
    } catch {
      setCart((p) => [...p, { ...item, id: Date.now() }])
    }
    setCartOpen(true)
    return true
  }

  const removeFromCart = async (id) => {
    if (token) { try { await api.removeFromCart(id, token) } catch { } }
    setCart((p) => p.filter((i) => i.id !== id))
  }

  const shared = { go, goBack, canGoBack, nav }
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: '#eff5e6' }}>
      {page !== 'ecoloopadmin' && (
        <Navbar
          cart={cart} page={page} nav={nav}
          go={go} goBack={goBack} canGoBack={canGoBack}
          onSignIn={() => setAuthMode('signin')}
          onLogout={onLogout}
          onCart={() => go('cart')}
          onSearch={(q) => go('search', { searchQuery: q || '' })}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={pageKey}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ willChange: 'transform, opacity' }}
        >
          {page === 'home' && <HomePage     {...shared} />}
          {page === 'about' && <AboutPage    {...shared} />}
          {page === 'process' && <ProcessPage  {...shared} />}
          {page === 'search' && <SearchPage   {...shared} />}
          {page === 'category' && <CategoryPage {...shared} />}
          {page === 'models' && <ModelsPage   {...shared} />}
          {page === 'variants' && <VariantsPage {...shared} />}
          {page === 'details' && <DetailsPage  {...shared} />}
          {page === 'sysconfig' && <SystemConfigPage {...shared} />}
          {page === 'estimate' && <EstimatePage {...shared} addToCart={addToCart} />}
          {page === 'cart' && <CartPage     {...shared} cart={cart} onRemove={removeFromCart} />}
          {page === 'ecoloopadmin' && <EcoloopAdmin {...shared} />}
          {page === 'schedulepickup' && <SchedulePickupPage {...shared} />}
          {page === 'wallet' && <WalletPage {...shared} />}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <CartModal cart={cart} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {authMode && (
          <AuthModal
            mode={authMode === 'signin' ? 'login' : 'signup'}
            onClose={() => { setAuthMode(null); setPendingCartItem(null) }}
            onSwitch={(m) => setAuthMode(m === 'login' ? 'signin' : 'signup')}
            onSuccess={onLoginSuccess}
          />
        )}
      </AnimatePresence>

      <Chatbot />
    </div>
  )
}
