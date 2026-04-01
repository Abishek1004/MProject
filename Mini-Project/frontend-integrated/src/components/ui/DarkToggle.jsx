import { useTheme } from '../../context/ThemeContext'

export default function DarkToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer transition-all duration-300 hover:border-eco-400 hover:bg-eco-50 dark:hover:bg-slate-700 flex-shrink-0"
      style={{ outline: 'none' }}
    >
      {/* Sun icon */}
      <span
        className="absolute transition-all duration-300"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'rotate(90deg) scale(0.5)' : 'rotate(0deg) scale(1)',
        }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </span>
      {/* Moon icon */}
      <span
        className="absolute transition-all duration-300"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.5)',
        }}
      >
        <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#818cf8" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </span>
    </button>
  )
}
