import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../utils/motion'
import BackButton from '../components/ui/BackButton'
import Footer from '../components/layout/Footer'
import { api } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function CartPage({ cart, onRemove, go, goBack, canGoBack }) {
  const { user } = useAuth()
  
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart])

  const handleSchedulePickup = () => {
    if (!user) {
      alert("Please sign in to schedule a pickup.")
      return
    }
    go('schedulepickup')
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300 font-inter">
      <div className="max-w-[1000px] mx-auto px-5 pt-10 pb-28">
        <div className="flex items-center justify-between mb-8">
          <BackButton goBack={goBack} canGoBack={canGoBack} label="Home" />
          <h1 className="font-poppins font-black text-3xl text-slate-800 dark:text-slate-100">🛒 My Cart</h1>
        </div>



        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Cart Items */}
          <div className="lg:col-span-2">
            {cart.length === 0 ? (
              <motion.div 
                className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center shadow-sm border border-slate-100 dark:border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-7xl mb-4">🛒</div>
                <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100 mb-2">Your cart is empty</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Add internal devices to get an instant recycle quote!</p>
                <button 
                  onClick={() => go('home')}
                  className="bg-[#037252] hover:bg-[#025c42] text-white font-poppins font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-[#037252]/20"
                >
                  Start Recycling →
                </button>
              </motion.div>
            ) : (
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex flex-col gap-4"
              >
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    variants={fadeUp}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-3xl flex-shrink-0">
                      {item.category === 'phone' ? '📱' : item.category === 'laptop' ? '💻' : '📟'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-poppins font-bold text-slate-800 dark:text-slate-100 text-lg truncate">{item.variant}</h3>
                      <p className="text-slate-400 text-xs font-inter mb-2 uppercase tracking-wide font-semibold">{item.company} · {item.category}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {[item.details?.ram, item.details?.storage, item.details?.physicalCondition].filter(Boolean).map((tag, i) => (
                          <span key={i} className="bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                      <span className="font-poppins font-black text-[#037252] dark:text-[#037252] text-xl">₹{item.price.toLocaleString()}</span>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-xs font-bold text-red-400 hover:text-red-500 transition-colors uppercase tracking-widest border-none bg-transparent cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sidebar / Summary */}
          <div className="flex flex-col gap-6">

            {/* Summary Card */}
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-poppins font-bold text-slate-800 dark:text-slate-100 mb-5">Order Summary</h3>
              
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">₹{total.toLocaleString()}</span>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-700 my-1" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-100">Total Payable</span>
                  <span className="font-poppins font-black text-2xl text-slate-800 dark:text-slate-100">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleSchedulePickup}
                disabled={cart.length === 0}
                className={`w-full font-poppins font-bold py-4 rounded-2xl border-none shadow-lg transition-all ${cart.length > 0 ? 'bg-[#037252] hover:bg-[#025c42] text-white shadow-[#037252]/25 cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                Schedule Pickup →
              </button>
              
              <p className="text-[10px] text-slate-400 text-center mt-4 uppercase tracking-widest font-bold">Secure Checkout Powered by EcoRecycle</p>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
