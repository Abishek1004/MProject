import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import ImgF from '../ui/ImgF'
import DarkToggle from '../ui/DarkToggle'
import LanguageSelector from '../ui/LanguageSelector'
import ecologo from "../../assets/img/logo.png"
import { CATEGORIES } from '../../data/categories'
import { dropdownVariants, mobileMenuVariants, fadeUp } from '../../utils/motion';

export default function Navbar({ cart, page, nav, go, onSignIn, onLogout, onCart, onSearch, searchQuery }) {
  const cat = CATEGORIES.find(c => c.id === nav?.category)
  const cc = cat?.color || '#037252' // primary color
  const cl = cat?.light || '#effaf6' // light background

  // Pull auth state directly from context — no prop needed
  const { user, firstName, displayName, isLoggedIn } = useAuth()
  const name = firstName || displayName || 'User'

  const [dropOpen, setDropOpen] = useState(false)
  const [mobOpen, setMobOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [localQuery, setLocalQuery] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [scrollDir, setScrollDir] = useState('up')
  const [lastY, setLastY] = useState(0)

  const dropRef = useRef(null)
  const searchRef = useRef(null)
  const inputRef = useRef(null)

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
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false)
    }

    const keyHandler = (e) => {
      if (e.key === '/' && !searchOpen && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault()
        handleSearchOpen()
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [searchOpen])

  useEffect(() => {
    if (page === 'search') setLocalQuery(searchQuery || '')
  }, [page, searchQuery])

  const handleSearchOpen = () => {
    setSearchOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleSearchSubmit = (q) => {
    setSearchOpen(false)
    onSearch(q.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit(localQuery)
    if (e.key === 'Escape') setSearchOpen(false)
  }

  const links = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Process', page: 'process' },
  ]

  // Avatar initials — first letter of first & last name (from account creation)
  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
    : ''

  return (
    <>
      {/* Scroll Direction Indicator — Left Corner */}
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
        <span className="text-lg font-bold">
          {scrollDir === 'up' ? '↑' : '↓'}
        </span>
      </div>

      {/* Navbar — fixed so it floats OVER the hero, no white gap */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none"
      >
        <nav 
          className="relative pointer-events-auto w-full max-w-[1100px] backdrop-blur-md rounded-2xl shadow-lg transition-all duration-500"
          style={{
            backgroundColor: cl.startsWith('#') ? `${cl}e0` : 'rgba(255,255,255,0.9)',
            border: `1.5px solid ${cc}20`,
            boxShadow: `0 10px 30px -5px ${cc}15`
          }}
        >
          <div className="px-5 flex items-center justify-between h-14 gap-3">

            {/* Logo */}
            <button onClick={() => go('home')} className="flex items-center gap-1.5 sm:gap-2 bg-transparent border-none cursor-pointer flex-shrink-1 min-w-0 max-w-[180px] sm:max-w-[220px]">
              <ImgF src={ecologo} fallback="♻️" alt="logo" style={{ width: 32, height: 24, smWidth: 40, smHeight: 30, objectFit: 'contain', fontSize: '1.2rem', flexShrink: 0 }} />
              <span className="font-montserrat font-extrabold text-base sm:text-lg tracking-tight truncate">
                <span className="text-slate-900 dark:text-white">Eco</span><span className="text-emerald-500">Loop</span>
              </span>
            </button>

            {/* Centre nav */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-center px-1 min-w-0">
              {links.map(({ label, page: p }, i) => (
                <motion.button
                  key={p}
                  onClick={() => go(p)}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.28, ease: 'easeOut' }}
                  className={`px-2 py-1.5 rounded-xl border-none cursor-pointer font-inter font-bold transition-all duration-150 flex-shrink-1 min-w-0
                    ${page === p
                      ? 'shadow-sm'
                      : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  style={{
                    fontSize: 'var(--fs-nav)',
                    backgroundColor: page === p ? cl : 'transparent',
                    color: page === p ? cc : undefined
                  }}
                >
                  <span className="not-italic whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
                </motion.button>
              ))}
            </div>

            {/* Search bar — desktop */}
            <div ref={searchRef} className="hidden lg:flex items-center relative flex-shrink-1 min-w-[120px] max-w-[280px] w-full mx-2">
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center w-full bg-slate-100 dark:bg-slate-800 border-2 rounded-2xl overflow-hidden shadow-xl"
                    style={{ borderColor: cc, boxShadow: `0 10px 20px ${cc}20` }}
                  >
                    <svg className="ml-4 flex-shrink-0" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={cc} strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                    </svg>
                    <input ref={inputRef} value={localQuery} onChange={(e) => setLocalQuery(e.target.value)}
                      onKeyDown={handleKeyDown} placeholder="Search devices..."
                      className="flex-1 min-w-0 px-4 py-3 text-sm font-inter bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400" />
                    <button onClick={() => handleSearchSubmit(localQuery)}
                      className="rounded-xl text-white text-xs font-bold font-inter px-5 py-2.5 mr-1 border-none cursor-pointer flex-shrink-0 transition-all"
                      style={{ backgroundColor: cc }}>
                      Search
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleSearchOpen}
                    className="flex items-center gap-3 w-full px-5 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-slate-500 dark:text-slate-400 text-sm font-inter cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-all overflow-hidden"
                  >
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                    </svg>
                    <span className="text-xs truncate font-medium">Search devices...</span>
                    <span className="ml-auto flex-shrink-0 text-[11px] bg-slate-200/60 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-lg font-mono">/</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 flex-shrink-0">

              {/* Language Selector */}
              <LanguageSelector themeColor={cc} themeLight={cl} />

              {/* Dark Mode Toggle */}
              <DarkToggle />

              {/* Mobile search */}
              <button onClick={() => { go('search'); setMobOpen(false) }}
                className="md:hidden p-2 rounded-lg bg-transparent border-none cursor-pointer" aria-label="Search">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* Cart */}
              <button onClick={onCart} className="relative p-2 rounded-lg bg-transparent border-none cursor-pointer" aria-label="Open cart">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 text-white rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ width: 18, height: 18, backgroundColor: cc }}>
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Auth — signed in */}
              {isLoggedIn ? (
                <div className="relative" ref={dropRef}>
                  <button
                    onClick={() => setDropOpen(v => !v)}
                    className="flex items-center gap-3 rounded-2xl py-1 pl-1.5 pr-4 cursor-pointer transition-all duration-300 border border-transparent hover:bg-white/50"
                    style={{
                      backgroundColor: dropOpen ? '#f0fdf4' : 'transparent',
                      boxShadow: dropOpen ? '0 10px 20px rgba(0,0,0,0.05)' : 'none',
                    }}
                  >
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base font-poppins flex-shrink-0 select-none shadow-lg shadow-emerald-500/20"
                      style={{ background: 'linear-gradient(135deg,#059669,#10b981)' }}
                    >
                      {initials || 'U'}
                    </div>

                    {/* Welcome text */}
                    <div className="hidden sm:block text-left leading-tight">
                      <p className="text-[10px] font-inter font-bold uppercase tracking-widest" style={{ color: cc }}>
                        Welcome
                      </p>
                      <p className="font-bold text-sm font-poppins text-slate-800 max-w-[110px] truncate">
                        {name}
                      </p>
                    </div>

                    {/* Chevron */}
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"
                      stroke="#94a3b8" strokeWidth="3"
                      className={`transition-transform duration-300 ${dropOpen ? 'rotate-180' : 'rotate-0'}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown — animated */}
                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        className="absolute right-0 top-[calc(100%+10px)] w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden"
                        variants={dropdownVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >

                        {/* Profile header */}
                        <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-700"
                          style={{ background: `linear-gradient(to bottom right, ${cl}, #ffffff)` }}>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 font-poppins select-none"
                              style={{ background: `linear-gradient(135deg, ${cc}, ${cc}dd)`, boxShadow: `0 4px 12px ${cc}40` }}>
                              {initials}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate font-poppins">{user.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-inter mt-0.5">{user.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* User details */}
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 space-y-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-inter uppercase tracking-wide">Email</p>
                              <p className="text-xs text-slate-700 dark:text-slate-300 font-inter font-medium truncate">{user.email}</p>
                            </div>
                          </div>

                          {user.mobileNo && (
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-inter uppercase tracking-wide">Mobile</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 font-inter font-medium">{user.mobileNo}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Sign out */}
                        <button
                          onClick={() => { setDropOpen(false); onLogout() }}
                          className="w-full text-left px-4 py-3 bg-transparent border-none cursor-pointer text-sm font-semibold font-inter flex items-center gap-2.5 transition-colors duration-100 hover:bg-red-50 dark:hover:bg-red-900/20 group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/20 group-hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors">
                            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </div>
                          <span className="text-red-600">Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Auth — signed out */
                <button onClick={onSignIn}
                  className="text-white font-poppins font-bold text-[11px] xs:text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border-none cursor-pointer transition-all duration-150 hover:shadow-md whitespace-nowrap flex-shrink-0"
                  style={{ backgroundColor: cc }}>
                  Sign In
                </button>
              )}

              {/* Mobile hamburger */}
              <button onClick={() => setMobOpen(v => !v)} className="md:hidden p-2 rounded-lg bg-transparent border-none cursor-pointer">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth="2">
                  {mobOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu — floats below the navbar */}
          <AnimatePresence>
            {mobOpen && (
              <motion.div
                className="md:hidden absolute left-0 right-0 top-[calc(100%+8px)] px-4 py-3 flex flex-col gap-1 bg-slate-900 rounded-2xl shadow-xl border border-slate-700 overflow-hidden"
                variants={mobileMenuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {links.map(({ label, page: p }) => (
                  <button key={p} onClick={() => { go(p); setMobOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border-none cursor-pointer font-inter font-semibold text-sm transition-colors
                    ${page === p
                        ? 'shadow-sm'
                        : 'bg-transparent text-white hover:bg-slate-50/20 hover:text-white'}`}
                    style={{
                      backgroundColor: page === p ? `${cl}20` : 'transparent',
                      color: page === p ? cc : undefined
                    }}>
                    {label}
                  </button>
                ))}
                {/* Mobile Language Selector */}
                <div className="mt-2 pt-2 border-t border-slate-700 flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-inter font-medium">Language:</span>
                  <LanguageSelector themeColor={cc} themeLight={cl} />
                </div>
                {isLoggedIn && (
                  <button onClick={() => { setMobOpen(false); onLogout() }}
                    className="w-full text-left px-4 py-2.5 rounded-lg border-none cursor-pointer font-inter font-semibold text-sm text-red-400 hover:bg-red-900/20 transition-colors mt-1">
                    Sign Out
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.div>
    </>
  )
}
