import { useState } from 'react'
import { api } from '../utils/api'
import ImgF from '../components/ui/ImgF'

function Field({ label, type, value, onChange, placeholder, error, hint }) {
  return (
    <div className="mb-4">
      <label className="block font-inter font-semibold text-[13px] text-slate-700 mb-1.5">{label}</label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3.5 rounded-xl border-[1.5px] outline-none text-sm font-inter bg-white transition-colors
          ${error ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-eco-500'}`}
      />
      {error && <p className="text-red-500 text-[11px] mt-1 font-inter">{error}</p>}
      {!error && hint && <p className="text-slate-400 text-[11px] mt-1 font-inter">{hint}</p>}
    </div>
  )
}

export default function SignUpPage({ go, goBack, onSuccess }) {
  // Step 1: registration form | Step 2: OTP verification
  const [step,     setStep]     = useState(1)
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [otp,      setOtp]      = useState('')
  const [errs,     setErrs]     = useState({})
  const [apiErr,   setApiErr]   = useState('')
  const [loading,  setLoading]  = useState(false)

  const validate = () => {
    const e = {}
    if (!name.trim())             e.name     = 'Full name is required'
    if (!email.includes('@'))     e.email    = 'Enter a valid email address'
    if (password.length < 6)      e.password = 'Password must be at least 6 characters'
    if (!/^\d{10}$/.test(mobileNo)) e.mobileNo = '10-digit mobile number required'
    setErrs(e)
    return !Object.keys(e).length
  }

  const submitRegister = async () => {
    if (!validate()) return
    setLoading(true); setApiErr('')
    try {
      await api.signup(name, email, password, mobileNo)
      setStep(2)
    } catch (err) {
      setApiErr(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const submitOtp = async () => {
    if (!otp.trim()) { setErrs({ otp: 'Enter the OTP sent to your email' }); return }
    setLoading(true); setApiErr('')
    try {
      const result = await api.verifyOtp(email, otp)
      onSuccess(result.user, result.token)
    } catch (err) {
      setApiErr(err.message || 'Invalid or expired OTP.')
    } finally {
      setLoading(false)
    }
  }

  const stepLabels = ['Personal Info', 'Contact', 'Verify OTP']

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-5 py-4 flex items-center gap-3">
        <button onClick={() => go('home')}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-eco-50 border border-eco-200 flex items-center justify-center overflow-hidden">
            <ImgF src="/images/logo.png" fallback="♻️" alt="logo"
              style={{ width:24, height:24, objectFit:'contain', fontSize:'1rem' }} />
          </div>
          <span className="font-montserrat font-extrabold text-lg">
            <span className="text-eco-600">Eco</span><span className="text-slate-800">Recycle</span>
          </span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-[500px]">

          {/* Header */}
          <div className="text-center mb-7">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#1e3a5f,#059569)' }}>
              {step === 1 ? (
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              ) : (
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <h1 className="font-poppins font-extrabold text-slate-800 text-3xl mb-2">
              {step === 1 ? 'Create Account' : 'Verify Email'}
            </h1>
            <p className="text-slate-500 font-inter text-sm">
              {step === 1 ? 'Join thousands of eco-conscious users' : `We sent a 6-digit OTP to ${email}`}
            </p>
          </div>

          {/* Progress pills */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {stepLabels.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-inter font-semibold transition-colors
                  ${i < step ? 'bg-eco-100 text-eco-700' : 'bg-slate-100 text-slate-400'}`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold
                    ${i < step ? 'bg-eco-600 text-white' : 'bg-slate-300 text-white'}`}>
                    {i + 1}
                  </span>
                  {s}
                </div>
                {i < 2 && <span className="text-slate-200 text-xs">›</span>}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg shadow-slate-100 p-8 overflow-y-auto" style={{ maxHeight: '450px' }}>
            {step === 1 && (
              <>
                <button
                  onClick={() => window.location.href = 'http://localhost:8081/oauth2/authorization/google'}
                  className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-full border border-slate-700 bg-[#131314] hover:bg-black transition-all mb-6 font-inter font-medium text-white shadow-sm active:scale-[0.98] group"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[15px]">Sign in with Google</span>
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">OR</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
              </>
            )}

            {apiErr && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5 font-inter">{apiErr}</div>
            )}

            {step === 1 ? (
              <>
                <Field label="Full Name"     type="text"     value={name}     onChange={setName}
                       placeholder="John Doe"             error={errs.name} />
                <Field label="Email Address" type="email"    value={email}    onChange={setEmail}
                       placeholder="you@example.com"     error={errs.email} />
                <Field label="Password"      type="password" value={password} onChange={setPassword}
                       placeholder="Create a strong password" error={errs.password}
                       hint="Minimum 6 characters" />
                <Field label="Phone Number"  type="tel"      value={mobileNo} onChange={setMobileNo}
                       placeholder="10-digit mobile number"  error={errs.mobileNo}
                       hint="Used for pickup scheduling only" />
                <button onClick={submitRegister} disabled={loading}
                  className={`w-full text-white font-poppins font-bold text-base py-4 rounded-xl border-none cursor-pointer transition-all mt-3
                    ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90 active:scale-[0.99]'}`}
                  style={{ background:'linear-gradient(135deg,#1e3a5f,#059669)', boxShadow:'0 4px 16px #05966930' }}>
                  {loading ? 'Sending OTP…' : 'Continue →'}
                </button>
              </>
            ) : (
              <>
                <div className="bg-eco-50 border border-eco-200 rounded-xl px-4 py-3 text-sm mb-5 font-inter text-eco-800">
                  ✉️ Check your inbox at <strong>{email}</strong> for the 6-digit OTP.
                </div>
                <Field label="Enter OTP" type="text" value={otp} onChange={setOtp}
                       placeholder="e.g. 847291" error={errs.otp} />
                <button onClick={submitOtp} disabled={loading}
                  className={`w-full text-white font-poppins font-bold text-base py-4 rounded-xl border-none cursor-pointer transition-all mt-1
                    ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90 active:scale-[0.99]'}`}
                  style={{ background:'linear-gradient(135deg,#014f3a,#059569)', boxShadow:'0 4px 16px #05956930' }}>
                  {loading ? 'Verifying…' : 'Verify & Sign In →'}
                </button>
                <button onClick={() => { setStep(1); setOtp(''); setApiErr('') }}
                  className="w-full mt-3 py-3 rounded-xl border-2 border-slate-200 bg-transparent text-slate-600 font-inter text-sm cursor-pointer hover:border-slate-300 transition-colors">
                  ← Change email / resend
                </button>
              </>
            )}

            {step === 1 && (
              <>
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-slate-400 text-xs font-inter">Already have an account?</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
                <button onClick={() => go('signin')}
                  className="w-full py-3 rounded-xl border-2 border-slate-200 bg-transparent text-slate-700 font-poppins font-bold text-sm cursor-pointer hover:border-eco-300 hover:text-eco-700 transition-colors">
                  Sign In Instead
                </button>
              </>
            )}
          </div>

          <p className="text-center mt-5">
            <button onClick={goBack}
              className="bg-transparent border-none text-slate-400 text-sm font-inter cursor-pointer hover:text-slate-600 transition-colors flex items-center gap-1.5 mx-auto">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Go back
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
