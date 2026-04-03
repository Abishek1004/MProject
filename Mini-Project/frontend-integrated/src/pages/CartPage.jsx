import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../utils/motion'
import BackButton from '../components/ui/BackButton'
import Footer from '../components/layout/Footer'

export default function CartPage({ cart, onRemove, go, goBack, canGoBack }) {
  const [walletBalance, setWalletBalance] = useState(0) // Initial balance is 0 as requested
  const [useWallet, setUseWallet] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)
  const [status, setStatus] = useState('Pending')
  
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart])
  const walletDeduction = useWallet ? Math.min(subtotal, walletBalance) : 0
  const total = subtotal - walletDeduction

  const handleSchedulePickup = () => {
    setIsScheduled(true)
    setStatus('Pickup Scheduled')
    // In a real app, cart would be cleared or moved to 'orders'
    // Here we'll just show the status for the user
  }

  const handleAddMoney = () => {
    // Mock functionality to add money for testing
    const amount = prompt("Enter amount to add to wallet:", "1000")
    if (amount && !isNaN(amount)) {
      setWalletBalance(prev => prev + parseInt(amount))
    }
  }

  const steps = [
    { name: 'Request Received', completed: true },
    { name: 'Pickup Scheduled', completed: isScheduled },
    { name: 'Device Inspection', completed: false },
    { name: 'Payment Released', completed: false },
  ]

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300 font-inter">
      <div className="max-w-[1000px] mx-auto px-5 pt-10 pb-28">
        <div className="flex items-center justify-between mb-8">
          <BackButton goBack={goBack} canGoBack={canGoBack} label="Home" />
          <h1 className="font-poppins font-black text-3xl text-slate-800 dark:text-slate-100">🛒 My Cart</h1>
        </div>

        {isScheduled && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-500/30 rounded-3xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#037252] animate-pulse" />
                  <span className="text-[#037252] dark:text-[#037252] font-bold uppercase text-[10px] tracking-widest">Active Order</span>
                </div>
                <h3 className="font-poppins font-bold text-xl text-slate-800 dark:text-slate-100">Status: {status}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Our agent will call you within 2 hours to confirm the pickup time.</p>
              </div>
              
              <div className="flex gap-2 sm:gap-4 w-full md:w-auto overflow-x-auto pb-2 no-scrollbar justify-center md:justify-end">
                {steps.map((step, i) => (
                  <div key={step.name} className="flex flex-col items-center min-w-[70px] sm:min-w-[90px] max-w-[110px]">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors flex-shrink-0 ${step.completed ? 'bg-[#037252] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                      {step.completed ? '✓' : i + 1}
                    </div>
                    <span className={`text-[8px] sm:text-[10px] font-bold text-center leading-tight uppercase tracking-tighter sm:tracking-normal ${step.completed ? 'text-[#037252] dark:text-[#037252]' : 'text-slate-400'}`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

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
                      {!isScheduled && (
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-xs font-bold text-red-400 hover:text-red-500 transition-colors uppercase tracking-widest border-none bg-transparent cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sidebar / Wallet & Summary */}
          <div className="flex flex-col gap-6">
            {/* Wallet Card */}
            <motion.div 
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-900/20 text-white relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Eco Wallet</p>
                    <h3 className="font-poppins font-black text-3xl">₹{walletBalance.toLocaleString()}</h3>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">💳</div>
                </div>
                
                <div 
                  onClick={() => !isScheduled && walletBalance > 0 && setUseWallet(!useWallet)}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-all border-2 ${useWallet ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-white/5 border-white/5'} ${walletBalance === 0 || isScheduled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${useWallet ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                    {useWallet && <span className="text-[10px] text-white">✓</span>}
                  </div>
                  <span className="text-xs font-bold font-inter tracking-wide">Use wallet balance</span>
                </div>

                {!isScheduled && (
                  <button 
                    onClick={handleAddMoney}
                    className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold py-2 rounded-xl border-none cursor-pointer transition-all uppercase tracking-widest"
                  >
                    + Add Money (Mock)
                  </button>
                )}
              </div>
            </motion.div>

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
                  <span className="font-bold text-slate-800 dark:text-slate-100">₹{subtotal.toLocaleString()}</span>
                </div>
                {useWallet && (
                  <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                    <span>Wallet Deduction</span>
                    <span className="font-bold">-₹{walletDeduction.toLocaleString()}</span>
                  </div>
                )}
                <div className="h-px bg-slate-100 dark:bg-slate-700 my-1" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-100">Total Payable</span>
                  <span className="font-poppins font-black text-2xl text-slate-800 dark:text-slate-100">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {!isScheduled ? (
                <button 
                  onClick={handleSchedulePickup}
                  disabled={cart.length === 0}
                  className={`w-full font-poppins font-bold py-4 rounded-2xl border-none shadow-lg transition-all ${cart.length > 0 ? 'bg-[#037252] hover:bg-[#025c42] text-white shadow-[#037252]/25 cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  Schedule Pickup →
                </button>
              ) : (
                <div className="w-full font-poppins font-bold py-4 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-500 text-center border border-slate-200 dark:border-slate-600">
                  Scheduled ✅
                </div>
              )}
              
              <p className="text-[10px] text-slate-400 text-center mt-4 uppercase tracking-widest font-bold">Secure Checkout Powered by EcoRecycle</p>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
