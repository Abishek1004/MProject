import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImgF from './ImgF'
import { fadeIn, scaleIn } from '../../utils/motion'

function AuthField({ label, type, value, onChange, placeholder, error }) {
  return (
    <div className="mb-5">
      <label className="block font-inter font-semibold text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full mt-1 px-2 pb-2 pt-1 bg-transparent outline-none border-0 border-b-2 text-sm font-inter
          text-slate-800 dark:text-slate-100
          placeholder:text-slate-300 dark:placeholder:text-slate-600
          transition-colors duration-200 focus:shadow-none
          ${error
            ? 'border-red-400 focus:border-red-500'
            : 'border-slate-200 dark:border-slate-600 focus:border-eco-500 dark:focus:border-eco-400'
          }`}
      />
      {error && <p className="text-red-500 text-[11px] mt-1.5 font-inter">{error}</p>}
    </div>
  )
}

export default function AuthModal({ mode, onClose, onSwitch, onSuccess }) {

  const API = "http://localhost:8081/api/auth"
  const OTP_API = "http://localhost:8081/api/otp"

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    otp: ''
  })

  const [step, setStep] = useState("form") // form or otp

  const [errs, setErrs] = useState({})
  const [apiErr, setApiErr] = useState('')
  const [loading, setLoading] = useState(false)

  // Track slide direction: +1 = sliding left (to signup), -1 = sliding right (to login)
  const directionRef = useRef(0)

  const overlayRef = useRef(null)

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setApiErr('')
  }

  const validate = () => {

    const e = {}

    if (mode === 'signup' && !form.name.trim()) e.name = 'Required'
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (form.password.length < 6) e.password = 'Min 6 characters'
    if (mode === 'signup' && !/^\d{10}$/.test(form.phone)) e.phone = '10-digit number required'

    setErrs(e)

    return !Object.keys(e).length
  }

  const handleSwitch = (to) => {
    directionRef.current = to === 'signup' ? 1 : -1
    setErrs({})
    setApiErr('')
    onSwitch(to)
  }

  const submit = async () => {

    if (!validate()) return

    setLoading(true)
    setApiErr('')

    try {

      if (mode === 'login') {

        const response = await fetch(`${API}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        })

        const data = await response.json().catch(() => ({}))

        if (!response.ok) throw new Error(data.message || 'Login failed')

        // Pass real JWT token and user info to parent
        onSuccess(data.user, data.token)

      }

      else {

        const response = await fetch(`${API}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            phone: form.phone
          })
        })

        const text = await response.text()

        if (!response.ok) throw new Error(text)
        setStep("otp")

      }

    }

    catch (err) {

      setApiErr(err.message)

    }

    finally {

      setLoading(false)

    }

  }

  const verifyOtp = async () => {

    if (form.otp.length !== 6) {
      setApiErr("Enter 6 digit OTP")
      return
    }

    setLoading(true)

    try {

      const response = await fetch(`${OTP_API}/verify?email=${form.email}&otp=${form.otp}`, {
        method: "POST"
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(data.message || 'OTP verification failed')

      setStep("form")
      directionRef.current = -1
      onSwitch("login")

    }

    catch (err) {

      setApiErr(err.message)

    }

    finally {

      setLoading(false)

    }

  }

  // Slide variants — direction controlled by directionRef
  const slideVariants = {
    initial: (dir) => ({ opacity: 0, x: dir * 52 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 0.68, 0, 1.05] } },
    exit: (dir) => ({ opacity: 0, x: dir * -52, transition: { duration: 0.22, ease: 'easeIn' } }),
  }

  const isLogin = mode === 'login'

  return (
    <motion.div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(7px)' }}
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-[500px] overflow-hidden"
        variants={scaleIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >

        {/* ── Header ──────────────────────────────────── */}
        <div
          className="px-7 pt-7 pb-6 relative"
          style={{ background: 'linear-gradient(135deg,#014f3a,#059569)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer text-white text-lg transition-colors hover:bg-white/20"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            ×
          </button>

          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <ImgF src="/images/logo.png" fallback="♻️" alt="logo" style={{ width: 28, height: 28 }} />
            </div>
            <span className="font-montserrat font-extrabold text-white text-lg">EcoRecycle</span>
          </div>

          {/* Animated title */}
          <AnimatePresence mode="wait" custom={directionRef.current}>
            <motion.div
              key={step === 'otp' ? 'otp' : mode}
              custom={directionRef.current}
              variants={{
                initial: (dir) => ({ opacity: 0, y: dir !== 0 ? 8 : 0 }),
                animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
                exit:    { opacity: 0, y: -6, transition: { duration: 0.18 } },
              }}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="font-poppins font-extrabold text-white text-2xl mb-1">
                {step === 'otp' ? 'Verify OTP' : isLogin ? 'Welcome back!' : 'Create Account'}
              </h2>
              <p className="text-white/70 text-sm">
                {step === 'otp'
                  ? 'Enter the 6-digit OTP sent to your email'
                  : isLogin
                    ? 'Sign in to continue your eco journey'
                    : 'Join thousands of eco-conscious users'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Mode tab pill ────────────────────────────── */}
        {step === 'form' && (
          <div className="mx-7 mt-5 mb-1 flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 relative gap-1">
            {/* animated sliding indicator */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-xl bg-white dark:bg-slate-700 shadow-sm"
              style={{ width: 'calc(50% - 4px)' }}
              animate={{ x: isLogin ? 0 : 'calc(100% + 8px)' }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            />
            <button
              onClick={() => handleSwitch('login')}
              className={`relative flex-1 py-2 text-sm font-poppins font-bold rounded-xl border-none cursor-pointer z-10 transition-colors duration-200
                ${isLogin ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'}`}
              style={{ background: 'transparent' }}
            >
              Sign In
            </button>
            <button
              onClick={() => handleSwitch('signup')}
              className={`relative flex-1 py-2 text-sm font-poppins font-bold rounded-xl border-none cursor-pointer z-10 transition-colors duration-200
                ${!isLogin ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'}`}
              style={{ background: 'transparent' }}
            >
              Create Account
            </button>
          </div>
        )}

        {/* ── Form body ────────────────────────────────── */}
        <div className="px-7 pb-6 pt-4 overflow-y-auto" style={{ maxHeight: '400px' }}>

          {apiErr && (
            <motion.div
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl px-3.5 py-2.5 text-sm mb-4"
            >
              {apiErr}
            </motion.div>
          )}

          <AnimatePresence mode="wait" custom={directionRef.current}>

            {step === 'otp' ? (
              <motion.div
                key="otp"
                custom={0}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <AuthField
                  label="Enter OTP"
                  type="text"
                  value={form.otp}
                  onChange={(v) => set('otp', v)}
                  placeholder="6-digit OTP"
                />
                <motion.button
                  onClick={verifyOtp}
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-1 bg-eco-600 hover:bg-eco-700 text-white font-poppins font-bold text-base py-3.5 rounded-xl border-none cursor-pointer transition-colors disabled:opacity-60"
                >
                  {loading ? 'Verifying…' : 'Verify OTP'}
                </motion.button>
              </motion.div>
            ) : isLogin ? (
              <motion.div
                key="login"
                custom={directionRef.current}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <button
                  type="button"
                  onClick={() => window.location.href = 'http://localhost:8081/oauth2/authorization/google'}
                  className="w-full flex items-center justify-center gap-3 py-2.5 px-5 rounded-full border border-slate-700 bg-[#131314] hover:bg-black transition-all mb-6 font-inter font-medium text-white shadow-sm active:scale-[0.98] group"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[15px]">Sign in with Google</span>
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-[1.5px] bg-slate-100" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">OR</span>
                  <div className="flex-1 h-[1.5px] bg-slate-100" />
                </div>

                <AuthField label="Email Address" type="email" value={form.email} onChange={(v) => set('email', v)} placeholder="you@example.com" error={errs.email} />
                <AuthField label="Password" type="password" value={form.password} onChange={(v) => set('password', v)} placeholder="Minimum 6 characters" error={errs.password} />

                <motion.button
                  onClick={submit}
                  disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(5,149,105,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-1 bg-eco-600 hover:bg-eco-700 text-white font-poppins font-bold text-base py-3.5 rounded-xl border-none cursor-pointer transition-colors disabled:opacity-60"
                >
                  {loading ? 'Signing in…' : 'Sign In →'}
                </motion.button>

                <p className="text-center text-slate-400 dark:text-slate-500 text-[12px] mt-4">
                  New to EcoRecycle?{' '}
                  <button onClick={() => handleSwitch('signup')} className="text-eco-600 font-bold hover:underline border-none bg-transparent cursor-pointer">
                    Create a free account
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                custom={directionRef.current}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <button
                  type="button"
                  onClick={() => window.location.href = 'http://localhost:8081/oauth2/authorization/google'}
                  className="w-full flex items-center justify-center gap-3 py-2.5 px-5 rounded-full border border-slate-700 bg-[#131314] hover:bg-black transition-all mb-6 font-inter font-medium text-white shadow-sm active:scale-[0.98] group"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[15px]">Sign in with Google</span>
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-[1.5px] bg-slate-100" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">OR</span>
                  <div className="flex-1 h-[1.5px] bg-slate-100" />
                </div>

                <AuthField label="Full Name" type="text" value={form.name} onChange={(v) => set('name', v)} placeholder="Your full name" error={errs.name} />
                <AuthField label="Email Address" type="email" value={form.email} onChange={(v) => set('email', v)} placeholder="you@example.com" error={errs.email} />
                <AuthField label="Password" type="password" value={form.password} onChange={(v) => set('password', v)} placeholder="Minimum 6 characters" error={errs.password} />
                <AuthField label="Phone Number" type="tel" value={form.phone} onChange={(v) => set('phone', v)} placeholder="10-digit mobile number" error={errs.phone} />

                <motion.button
                  onClick={submit}
                  disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(5,149,105,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-1 bg-eco-600 hover:bg-eco-700 text-white font-poppins font-bold text-base py-3.5 rounded-xl border-none cursor-pointer transition-colors disabled:opacity-60"
                >
                  {loading ? 'Creating account…' : 'Create Account →'}
                </motion.button>

                <p className="text-center text-slate-400 dark:text-slate-500 text-[12px] mt-4">
                  Already have an account?{' '}
                  <button onClick={() => handleSwitch('login')} className="text-eco-600 font-bold hover:underline border-none bg-transparent cursor-pointer">
                    Sign In
                  </button>
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}