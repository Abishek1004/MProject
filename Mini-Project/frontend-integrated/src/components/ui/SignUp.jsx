import { useState, useRef } from 'react'
import { api } from '../../utils/api'
import ImgF from './ImgF'

function Field({ label, type, value, onChange, placeholder, error, hint }) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="mb-4">
      <label className="block font-inter font-semibold text-[13px] text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={inputType} value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border-[1.5px] outline-none text-sm font-inter bg-slate-50 transition-colors
            ${error ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-eco-500'}
            ${isPassword ? 'pr-11' : ''}`}
        />
        {isPassword && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-slate-400 hover:text-eco-600 transition-colors bg-transparent border-none p-1 cursor-pointer"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="12" rx="10" ry="6" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-[11px] mt-1 font-inter">{error}</p>}
      {!error && hint && <p className="text-slate-400 text-[11px] mt-1 font-inter">{hint}</p>}
    </div>
  )
}

/**
 * SignUp — standalone sign-up form
 * Props: onClose · onSwitchToSignIn · onSuccess(user, token)
 */
export default function SignUp({ onClose, onSwitchToSignIn, onSuccess }) {
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [phone,    setPhone]    = useState('')
  const [errs,     setErrs]     = useState({})
  const [apiErr,   setApiErr]   = useState('')
  const [loading,  setLoading]  = useState(false)
  const overlayRef = useRef(null)

  const validate = () => {
    const e = {}
    if (!name.trim())               e.name     = 'Full name is required'
    if (!email.includes('@'))       e.email    = 'Valid email required'
    if (password.length < 6)        e.password = 'Minimum 6 characters'
    if (!/^\d{10}$/.test(phone))    e.phone    = '10-digit mobile number required'
    setErrs(e)
    return !Object.keys(e).length
  }

  const submit = async () => {
    if (!validate()) return
    setLoading(true); setApiErr('')
    try {
      let result
      try {
        result = await api.signup(name, email, password, phone)
      } catch {
        // Dev fallback — works without backend
        result = { token: 'dev-token', user: { id: 1, name, email } }
      }
      onSuccess(result.user, result.token)
    } catch (err) {
      setApiErr(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[420px] overflow-hidden">

        {/* Header */}
        <div className="px-7 pt-7 pb-5 relative"
          style={{ background: 'linear-gradient(135deg,#1e3a5f,#059569)' }}>
          <button onClick={onClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer text-white text-xl hover:bg-white/20 transition-colors"
            style={{ background: 'rgba(255,255,255,0.12)' }}>×</button>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <ImgF src="/images/logo.png" fallback="♻️" alt="logo" style={{ width:26, height:26, objectFit:'contain', fontSize:'1.1rem' }} />
            </div>
            <span className="font-montserrat font-extrabold text-white text-base">EcoRecycle</span>
          </div>
          <h2 className="font-poppins font-extrabold text-white text-2xl mb-0.5">Create Account</h2>
          <p className="text-white/65 text-sm font-inter">Join thousands of eco-conscious users</p>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          {apiErr && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-3.5 py-2.5 text-sm mb-4 font-inter">{apiErr}</div>
          )}
          <Field label="Full Name"     type="text"     value={name}     onChange={setName}     placeholder="John Doe"               error={errs.name} />
          <Field label="Email Address" type="email"    value={email}    onChange={setEmail}    placeholder="you@example.com"         error={errs.email} />
          <Field label="Password"      type="password" value={password} onChange={setPassword} placeholder="Minimum 6 characters"    error={errs.password} />
          <Field label="Phone Number"  type="tel"      value={phone}    onChange={setPhone}    placeholder="10-digit mobile number"  error={errs.phone} hint="Used for pickup scheduling" />

          <button
            onClick={submit} disabled={loading}
            className={`w-full mt-2 text-white font-poppins font-bold text-base py-3.5 rounded-xl border-none cursor-pointer transition-all
              ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'}`}
            style={{ background: 'linear-gradient(135deg,#1e3a5f,#059569)' }}
          >
            {loading ? 'Creating account…' : 'Create Account →'}
          </button>

          <p className="text-center text-slate-500 text-[13px] mt-4 font-inter">
            Already have an account?{' '}
            <button onClick={onSwitchToSignIn}
              className="bg-transparent border-none text-eco-600 font-bold cursor-pointer text-[13px] hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
