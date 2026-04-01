import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

// ─── PaymentModal — Pickup Scheduling Confirmation ───────────────────────────
// Razorpay has been removed. This modal now confirms a free pickup booking.
export default function PaymentModal({ price, deviceVariant, catColor, onClose }) {
  const { user } = useAuth()

  const [step, setStep] = useState('form')   // form | success
  const [name,    setName]    = useState(user?.name    || '')
  const [email,   setEmail]   = useState(user?.email   || '')
  const [contact, setContact] = useState(user?.mobileNo || '')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [refId,   setRefId]   = useState('')

  const accent = catColor || '#059669'

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleConfirm = async () => {
    if (!name.trim() || !email.trim() || !contact.trim() || !address.trim()) return
    setLoading(true)
    // Simulate brief processing delay
    await new Promise((r) => setTimeout(r, 1000))
    // Generate a simple reference ID
    setRefId('ECO-' + Math.random().toString(36).substring(2, 8).toUpperCase())
    setLoading(false)
    setStep('success')
  }

  const isFormValid = name.trim() && email.trim() && contact.trim() && address.trim()

  const fields = [
    { label: 'Your Name',      value: name,    setValue: setName,    type: 'text',  placeholder: 'Full Name' },
    { label: 'Email Address',  value: email,   setValue: setEmail,   type: 'email', placeholder: 'email@example.com' },
    { label: 'Mobile Number',  value: contact, setValue: setContact, type: 'tel',   placeholder: '+91 99999 99999' },
    { label: 'Pickup Address', value: address, setValue: setAddress, type: 'text',  placeholder: 'Street, City, PIN code' },
  ]

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.65)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        {/* Card */}
        <motion.div
          className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: '#0f172a', border: `1px solid ${accent}30` }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        >
          {/* Header accent strip */}
          <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}66)` }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all text-lg"
            aria-label="Close"
          >✕</button>

          <div className="p-7">

            {/* ── FORM VIEW ────────────────────────────────────────── */}
            {step === 'form' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header */}
                <div className="text-center mb-5">
                  <div className="text-4xl mb-2">📦</div>
                  <h2 className="text-white font-poppins font-bold text-xl mb-1">Schedule Free Pickup</h2>
                  <p className="text-slate-400 text-sm font-inter">We'll collect your device & pay you within 24 hrs</p>
                </div>

                {/* Price summary card */}
                <div
                  className="rounded-2xl p-4 mb-5 text-center"
                  style={{ background: `${accent}12`, border: `1px solid ${accent}28` }}
                >
                  <p className="text-slate-400 text-xs font-inter mb-0.5">Device</p>
                  <p className="text-white font-semibold text-sm font-poppins mb-2">{deviceVariant}</p>
                  <div className="text-3xl font-black font-poppins" style={{ color: accent }}>
                    ₹{price?.toLocaleString()}
                  </div>
                  <p className="text-slate-500 text-xs mt-1 font-inter">Recycle Value · Free Pickup · Paid within 24 hrs</p>
                </div>

                {/* Contact fields */}
                <div className="space-y-3 mb-5">
                  {fields.map(({ label, value, setValue, type, placeholder }) => (
                    <div key={label}>
                      <label className="block text-slate-400 text-xs mb-1.5 font-inter">{label}</label>
                      <input
                        type={type}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 outline-none transition-all font-inter"
                        onFocus={(e)  => { e.target.style.borderColor = `${accent}80` }}
                        onBlur={(e)   => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Confirm button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConfirm}
                  disabled={!isFormValid || loading}
                  className="w-full py-4 rounded-2xl text-white font-poppins font-bold text-base cursor-pointer border-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
                    boxShadow: `0 6px 24px ${accent}38`,
                  }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Scheduling…</span>
                    </>
                  ) : (
                    <>
                      <span>🚛</span>
                      <span>Confirm Pickup</span>
                    </>
                  )}
                </motion.button>

                <p className="text-center text-slate-500 text-xs mt-3 font-inter">
                  Free service · No hidden charges
                </p>
              </motion.div>
            )}

            {/* ── SUCCESS VIEW ─────────────────────────────────────── */}
            {step === 'success' && (
              <motion.div
                className="text-center py-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Animated checkmark */}
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                >✅</motion.div>

                <h2 className="text-white font-poppins font-bold text-xl mb-2">Pickup Scheduled! 🎉</h2>
                <p className="text-slate-400 text-sm mb-5 font-inter">
                  We'll contact you at <span className="text-white font-semibold">{contact}</span> to confirm the pickup time.
                </p>

                {/* Confirmation details card */}
                <div
                  className="rounded-xl p-4 mb-6 text-left"
                  style={{ background: '#10b98112', border: '1px solid #10b98128' }}
                >
                  <p className="text-slate-400 text-xs font-inter mb-3 font-semibold uppercase tracking-wide">Booking Summary</p>
                  {[
                    ['Device',    deviceVariant],
                    ['Value',     `₹${price?.toLocaleString()}`],
                    ['Contact',   contact],
                    ['Reference', refId],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center mb-2">
                      <span className="text-slate-400 text-xs font-inter">{k}</span>
                      <span className={`text-xs font-semibold font-inter ${k === 'Value' ? 'text-emerald-400' : 'text-white'}`}>{v}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="w-full py-3.5 rounded-2xl text-white font-poppins font-bold text-sm cursor-pointer border-none"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 16px #10b98140' }}
                >
                  Done ✓
                </motion.button>
              </motion.div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
