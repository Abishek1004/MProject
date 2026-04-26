import { useState } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/ui/BackButton'
import { api } from '../utils/api'

export default function SchedulePickupPage({ nav, go, goBack, canGoBack }) {
  const d = nav || {}
  const price = d.price || 0
  const deviceVariant = d.variant || 'Device'
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const primaryGreen = '#4dbb91'
  const darkNavy = '#1a2233'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const user = JSON.parse(localStorage.getItem('ecoloop_user') || '{}')
    
    try {
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.postalCode}`;
      
      await api.createPickup({
        userEmail: user.email || 'guest@example.com',
        cartItemVariant: deviceVariant,
        finalPrice: price,
        address: fullAddress,
        scheduledDate: new Date().toISOString().split('T')[0], // Today
        timeSlot: '10:00 AM - 02:00 PM',
        status: 'PENDING'
      });

      setSuccess(true)
    } catch (err) {
      console.error('Failed to schedule pickup:', err)
      alert('Failed to schedule pickup. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 pt-32">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-md w-full border border-emerald-50"
        >
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-lg shadow-emerald-200">
            ✅
          </div>
          <h2 className="text-3xl font-poppins font-black text-slate-800 mb-4">Awesome!</h2>
          <p className="text-slate-500 font-inter mb-8 leading-relaxed">
            Your pickup for <span className="text-emerald-500 font-bold">{deviceVariant}</span> has been scheduled successfully. We'll contact you shortly.
          </p>
          <button 
            onClick={() => go('home')}
            className="w-full bg-slate-800 text-white font-black py-5 rounded-2xl hover:bg-slate-900 transition-all shadow-xl"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="mb-10">
        <BackButton goBack={goBack} canGoBack={canGoBack} label="Back to Estimate" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start justify-center pt-8">
        {/* Left Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 max-w-[800px] w-full bg-white rounded-[2rem] p-10 shadow-xl border border-slate-200"
        >
          <div className="flex items-center gap-4 mb-10">
             <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-lg shadow-md">
                1
             </div>
            <h2 className="font-poppins font-black text-slate-800 text-3xl tracking-tight">Pickup Address</h2>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-slate-600 text-xs font-black uppercase tracking-widest ml-1">First Name</label>
                <input 
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-800 font-inter focus:border-slate-800 outline-none transition-colors shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-600 text-xs font-black uppercase tracking-widest ml-1">Last Name</label>
                <input 
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-800 font-inter focus:border-slate-800 outline-none transition-colors shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-600 text-xs font-black uppercase tracking-widest ml-1">Address</label>
              <input 
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House No, Street Name"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-800 font-inter focus:border-slate-800 outline-none transition-colors shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-slate-600 text-xs font-black uppercase tracking-widest ml-1">City</label>
                <input 
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Chennai"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-800 font-inter focus:border-slate-800 outline-none transition-colors shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-600 text-xs font-black uppercase tracking-widest ml-1">Postal Code</label>
                <input 
                  required
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="600001"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-800 font-inter focus:border-slate-800 outline-none transition-colors shadow-sm"
                />
              </div>
            </div>
          </form>
        </motion.div>

        {/* Right Side: Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-[360px] bg-slate-900 rounded-[2rem] p-8 shadow-2xl text-white flex flex-col"
        >
          <h3 className="font-poppins font-black text-2xl mb-8 tracking-tight">Order Summary</h3>
          
          <div className="space-y-4 mb-8 text-sm text-slate-300 font-inter">
             <div className="flex justify-between items-center font-bold text-white">
                 <span>1x {deviceVariant}</span>
                 <span>₹{price.toLocaleString()}</span>
             </div>
             <div className="flex justify-between items-center">
                 <span>Subtotal</span>
                 <span>₹{price.toLocaleString()}</span>
             </div>
             <div className="flex justify-between items-center text-emerald-400 font-bold">
                 <span>Pickup Service</span>
                 <span className="uppercase text-sm tracking-widest">Free</span>
             </div>
             <div className="flex justify-between items-center">
                 <span>Processing Fee (0%)</span>
                 <span>₹0.00</span>
             </div>
          </div>
          
          <div className="h-px w-full bg-slate-700 mb-8" />

          <div className="flex justify-between items-end mb-8">
              <span className="font-black text-lg text-slate-400 uppercase tracking-widest">Total Value</span>
              <span className="text-3xl font-black text-emerald-400">₹{price.toLocaleString()}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-emerald-500 text-slate-900 font-poppins font-black py-4 rounded-xl shadow-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 disabled:opacity-70 uppercase tracking-widest text-sm"
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-slate-900/20 border-t-slate-900 rounded-full animate-spin" />
            ) : (
              "Confirm Pickup"
            )}
          </motion.button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-300 opacity-70">
              <span>🔒</span> SSL Secured 256-bit Encryption
          </div>
        </motion.div>
      </div>
    </div>
  )
}
