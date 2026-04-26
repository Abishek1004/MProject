import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import ImgF from '../ui/ImgF'
import LanguageSelector from '../ui/LanguageSelector'
import ecologo from "../../assets/img/logo.png"
import { CATEGORIES } from '../../data/categories'
import { dropdownVariants, mobileMenuVariants } from '../../utils/motion';

export default function Navbar({ cart, page, nav, go, onSignIn, onLogout, onCart, onSearch, searchQuery }) {
  const cat = CATEGORIES.find(c => c.id === nav?.category)
  const cc = cat?.color || '#037252' // primary color
  const cl = cat?.light || '#effaf6' // light background

  const { user, firstName, displayName, isLoggedIn } = useAuth()
  const name = firstName || displayName || 'User'

  const [dropOpen, setDropOpen] = useState(false)
  const [mobOpen, setMobOpen] = useState(false)
  const [localQuery, setLocalQuery] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [scrollDir, setScrollDir] = useState('up')
  const [lastY, setLastY] = useState(0)

  const dropRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      if (y > lastY && y > 80) {
        setIsVisible(false)
        setScrollDir('down')
      } else {
        setIsVisible(true)
        setScrollDir('up')
      }
      setLastY(y)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY])

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  useEffect(() => {
    if (page === 'search') setLocalQuery(searchQuery || '')
  }, [page, searchQuery])

  const handleSearchSubmit = (q) => {
    onSearch(q.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit(localQuery)
  }

  const links = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Process', page: 'process' },
  ]

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
    : ''

  return (
    <>
      {/* Scroll Direction Indicator */}
      <div
        className="fixed top-[10px] left-[10px] z-[100] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm pointer-events-none"
        style={{
          backgroundColor: `${cc}15`,
          border: `1.5px solid ${cc}30`,
          color: cc,
          opacity: lastY > 50 ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : -20}px)`
        }}
      >
        <span className="text-lg font-bold">{scrollDir === 'up' ? '↑' : '↓'}</span>
      </div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none"
      >
        <nav
          className="relative pointer-events-auto w-full max-w-[1200px] backdrop-blur-md rounded-2xl shadow-lg border transition-all duration-500"
          style={{
            backgroundColor: cl.startsWith('#') ? `${cl}f2` : 'rgba(255,255,255,0.95)',
            borderColor: `${cc}20`,
            boxShadow: `0 10px 40px -10px ${cc}25`
          }}
        >
          <div className="px-4 flex items-center justify-between h-16 relative">

            {/* Left Section: Logo & Nav Links */}
            <div className="flex items-center gap-28">
              <button onClick={() => go('home')} className="flex items-center gap-2 bg-transparent border-none cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <ImgF src={ecologo} fallback="♻️" alt="logo" style={{ width: 30, height: 24, objectFit: 'contain' }} />
                </div>
                <span className="font-montserrat font-black text-xl tracking-tighter text-slate-900">
                  Eco<span className="text-emerald-500">Loop</span>
                </span>
              </button>

              <div className="hidden lg:flex items-center gap-1">
                {links.map(({ label, page: p }) => (
                  <button
                    key={p}
                    onClick={() => go(p)}
                    className={`px-4 py-2 rounded-xl border-none cursor-pointer font-inter font-bold transition-all duration-200
                      ${page === p ? 'shadow-md scale-105' : 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                    style={{
                      fontSize: '13px',
                      backgroundColor: page === p ? cc : 'transparent',
                      color: page === p ? '#ffffff' : undefined
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Actions (Pinned to end) */}
            <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3">

              {/* Desktop Search - Static */}
              <div className="hidden lg:flex items-center relative">
                <div
                  className="flex items-center bg-slate-100/50 border border-slate-200 rounded-2xl overflow-hidden transition-all focus-within:border-eco-500 focus-within:bg-white focus-within:shadow-md"
                  style={{ width: 240 }}
                >
                  <div className="pl-3.5 flex items-center pointer-events-none">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
                      <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <input
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search anything..."
                    className="flex-1 min-w-0 px-3 py-2 text-sm font-inter bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                  />
                  {localQuery && (
                    <button
                      onClick={() => handleSearchSubmit(localQuery)}
                      className="mr-1.5 px-3 py-1 rounded-xl bg-eco-600 text-white text-[10px] font-bold border-none cursor-pointer hover:bg-eco-700 transition-colors"
                    >
                      Go
                    </button>
                  )}
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200 hidden lg:block mx-1" />

              <LanguageSelector themeColor={cc} themeLight={cl} />

              <button onClick={() => go('wallet')} className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-all bg-transparent border-none cursor-pointer group active:scale-90" aria-label="Wallet">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth="2" className="group-hover:stroke-slate-900 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-9H5z" />
                </svg>
              </button>

              <button onClick={onCart} className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-all bg-transparent border-none cursor-pointer group active:scale-90" aria-label="Cart">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth="2" className="group-hover:stroke-slate-900 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-lg animate-bounce"
                    style={{ width: 20, height: 20, backgroundColor: cc }}>{cart.length}</span>
                )}
              </button>

              {isLoggedIn ? (
                <div className="relative" ref={dropRef}>
                  <button onClick={() => setDropOpen(v => !v)}
                    className="flex items-center gap-2 rounded-2xl py-1 pl-1 pr-4 cursor-pointer hover:bg-white/80 border border-transparent hover:border-slate-100 transition-all shadow-sm hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-inner"
                      style={{ background: `linear-gradient(135deg, ${cc}, #10b981)` }}>{initials || 'U'}</div>
                    <div className="hidden sm:block text-left leading-none">
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1" style={{ color: cc }}>Member</p>
                      <p className="font-bold text-sm text-slate-800 truncate max-w-[80px]">{name}</p>
                    </div>
                  </button>
                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        className="absolute right-0 top-[calc(100%+12px)] w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden py-2"
                        variants={dropdownVariants} initial="initial" animate="animate" exit="exit"
                      >
                        <div className="px-4 py-3 border-b border-slate-50 mb-1">
                          <p className="text-xs font-bold text-slate-400">SIGNED IN AS</p>
                          <p className="font-bold text-slate-900 truncate">{user?.email}</p>
                        </div>
                        <button onClick={() => { setDropOpen(false); onLogout() }}
                          className="w-full text-left px-4 py-3 bg-transparent border-none cursor-pointer text-sm font-bold text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors">
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button onClick={onSignIn}
                  className="text-white font-poppins font-black text-sm px-7 h-[44px] rounded-2xl border-none cursor-pointer hover:brightness-110 active:scale-95 transition-all shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: cc, boxShadow: `0 8px 20px -6px ${cc}80` }}>Sign In</button>
              )}

              <button onClick={() => setMobOpen(v => !v)} className="lg:hidden p-2.5 rounded-xl bg-slate-100 border-none cursor-pointer active:scale-90 transition-transform">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth="2.5">
                  {mobOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobOpen && (
              <motion.div
                className="lg:hidden absolute left-0 right-0 top-[calc(100%+12px)] px-4 py-4 flex flex-col gap-2 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20"
                variants={mobileMenuVariants} initial="initial" animate="animate" exit="exit"
              >
                {links.map(({ label, page: p }) => (
                  <button key={p} onClick={() => { go(p); setMobOpen(false) }}
                    className={`w-full text-left px-5 py-4 rounded-2xl border-none font-bold text-base transition-all
                    ${page === p ? 'bg-slate-50 text-slate-900 shadow-inner' : 'bg-transparent text-slate-600 active:bg-slate-50'}`}
                    style={{ color: page === p ? cc : undefined }}>{label}</button>
                ))}
                <div className="h-px bg-slate-100 my-1" />
                {isLoggedIn ? (
                  <button onClick={() => { setMobOpen(false); onLogout() }}
                    className="w-full text-left px-5 py-4 rounded-2xl border-none font-bold text-base text-red-500 hover:bg-red-50 mt-1">Sign Out</button>
                ) : (
                  <button onClick={() => { onSignIn(); setMobOpen(false) }}
                    className="w-full py-4 rounded-2xl border-none font-bold text-base text-white shadow-lg"
                    style={{ backgroundColor: cc }}>Sign In</button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.div>
    </>
  )
}
