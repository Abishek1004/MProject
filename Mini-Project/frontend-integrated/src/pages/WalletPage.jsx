import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/ui/BackButton'
import Footer from '../components/layout/Footer'
import { api } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function WalletPage({ goBack, canGoBack }) {
  const { token, isLoggedIn } = useAuth();

  const [walletBalance, setWalletBalance] = useState(0);
  
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [method, setMethod] = useState('bank'); // 'bank' or 'upi'
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3500);
  };
  
  // Form fields
  const [accNumber, setAccNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [upiId, setUpiId] = useState('');

  const [history, setHistory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (isLoggedIn && token) {
      api.getWalletBalance(token).then(data => {
        setWalletBalance(data.balance || 0);
      }).catch(err => console.error("Failed to fetch balance", err));
      
      api.getWalletHistory(token).then(data => {
        setHistory(data || []);
      }).catch(err => console.error("Failed to fetch history", err));

      setLoadingOrders(true);
      api.getMyPickups(token).then(data => {
        setOrders(Array.isArray(data) ? data : []);
        if (data && data.length > 0) setActiveOrderId(data[0].id);
      }).catch(err => console.error("Failed to fetch orders", err))
        .finally(() => setLoadingOrders(false));
    } else {
      setWalletBalance(0);
      setHistory([]);
      setOrders([]);
    }
  }, [isLoggedIn, token]);

  const activeOrder = orders.find(o => o.id === activeOrderId);

  const getStatusProgress = (order) => {
    if (order.status === 'Cancelled') return -1;
    if (order.paymentStatus === 'Paid') return 3;
    if (order.status === 'Approved') return 1;
    if (order.status === 'In Progress') return 2;
    return 0;
  };

  const steps = [
    { label: 'Request Placed', desc: 'We have received your pickup request.', icon: '📝' },
    { label: 'Pickup Scheduled', desc: 'Agent assigned and scheduled for pickup.', icon: '🚚' },
    { label: 'Device Inspected', desc: 'Device quality check and verification complete.', icon: '🔍' },
    { label: 'Payment Released', desc: 'Funds added to your Eco Wallet.', icon: '💰' }
  ];

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || isNaN(amount) || amount <= 0) {
      showToast("Please enter a valid amount.");
      return;
    }
    if (amount > walletBalance) {
      showToast("Insufficient balance.");
      return;
    }
    
    if (method === 'bank' && (!accNumber || !ifsc)) {
       showToast("Please enter Bank Details.");
       return;
    }
    if (method === 'upi' && !upiId) {
       showToast("Please enter UPI ID.");
       return;
    }

    if (!isLoggedIn || !token) {
      showToast("Please sign in to withdraw.");
      return;
    }

    try {
      const data = await api.withdrawWallet(amount, method, token);
      setWalletBalance(data.balance);
      
      // Refresh history
      const histData = await api.getWalletHistory(token);
      setHistory(histData || []);
      
      setWithdrawAmount('');
      setAccNumber('');
      setIfsc('');
      setUpiId('');
      showToast(`Successfully withdrawn ₹${amount.toLocaleString()} to your ${method === 'bank' ? 'Bank Account' : 'UPI ID'}.`, 'success');
    } catch (err) {
      showToast(err.error || "Failed to process withdrawal");
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen transition-colors duration-300 font-inter">
      <div className="max-w-[1100px] mx-auto px-5 pt-10 pb-28">
        <div className="flex items-center justify-between mb-10">
          <BackButton goBack={goBack} canGoBack={canGoBack} label="Home" />
          <h1 className="font-poppins font-black text-3xl text-slate-800">Eco Wallet</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center pt-8">
          
          {/* Left Side: Methods & Inputs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 max-w-[800px] w-full bg-white rounded-[2rem] p-10 shadow-xl border border-slate-200"
          >
            <div className="flex items-center gap-4 mb-10">
               <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-lg shadow-md">
                  1
               </div>
              <h2 className="font-poppins font-black text-slate-800 text-3xl tracking-tight">Withdrawal Method</h2>
            </div>

            <div className="space-y-4 mb-10">
              {/* Method: Bank */}
              <div 
                onClick={() => setMethod('bank')}
                className={`cursor-pointer border-2 rounded-2xl p-5 flex items-center gap-4 transition-all shadow-sm ${method === 'bank' ? 'border-slate-800 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                  <div className="text-2xl text-slate-600">🏦</div>
                  <div>
                      <p className="font-bold text-slate-800 text-sm">Bank Transfer</p>
                      <p className="text-slate-500 text-xs font-medium">All major banks supported (NEFT/IMPS)</p>
                  </div>
              </div>

              {/* Method: UPI */}
              <div 
                onClick={() => setMethod('upi')}
                className={`cursor-pointer border-2 rounded-2xl p-5 flex items-center gap-4 transition-all shadow-sm ${method === 'upi' ? 'border-slate-800 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                  <div className="text-2xl text-slate-600">📱</div>
                  <div>
                      <p className="font-bold text-slate-800 text-sm">UPI</p>
                      <p className="text-slate-500 text-xs font-medium">Fast and secure transfer via UPI</p>
                  </div>
              </div>
            </div>

            {/* Dynamic Form */}
            <div className="space-y-6">
               {method === 'bank' ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-slate-600 text-xs font-black uppercase tracking-widest ml-1">Account Number</label>
                     <input 
                       value={accNumber}
                       onChange={(e) => setAccNumber(e.target.value)}
                       placeholder="XXXX XXXX XXXX"
                       className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-800 font-inter focus:border-slate-800 outline-none transition-colors shadow-sm"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-slate-600 text-xs font-black uppercase tracking-widest ml-1">IFSC Code</label>
                     <input 
                       value={ifsc}
                       onChange={(e) => setIfsc(e.target.value)}
                       placeholder="SBIN0001234"
                       className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-800 font-inter focus:border-slate-800 outline-none transition-colors shadow-sm"
                     />
                   </div>
                 </div>
               ) : (
                 <div className="space-y-2">
                   <label className="text-slate-600 text-xs font-black uppercase tracking-widest ml-1">UPI ID</label>
                   <input 
                     value={upiId}
                     onChange={(e) => setUpiId(e.target.value)}
                     placeholder="username@bank"
                     className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-800 font-inter focus:border-slate-800 outline-none transition-colors shadow-sm"
                   />
                 </div>
               )}

               <div className="space-y-2 pt-4">
                 <label className="text-slate-600 text-xs font-black uppercase tracking-widest ml-1">Amount to Withdraw (₹)</label>
                 <input 
                   type="number"
                   value={withdrawAmount}
                   onChange={(e) => setWithdrawAmount(e.target.value)}
                   placeholder="Enter Amount"
                   className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-800 font-inter focus:border-slate-800 outline-none transition-colors shadow-sm text-lg font-bold"
                 />
               </div>
            </div>
          </motion.div>

          {/* Right Side: Wallet Summary & History Button */}
          <div className="flex flex-col gap-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-[360px] bg-slate-900 rounded-[2rem] p-8 shadow-2xl text-white flex flex-col h-fit"
            >
            <h3 className="font-poppins font-black text-2xl mb-8 tracking-tight">Wallet Summary</h3>
            
            <div className="space-y-4 mb-8 text-sm text-slate-300 font-inter">
               <div className="flex justify-between items-center font-bold text-white">
                   <span>Available Balance</span>
                   <span>₹{walletBalance.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center">
                   <span>Withdrawal Amount</span>
                   <span className="text-red-400 font-bold">-{withdrawAmount ? `₹${parseFloat(withdrawAmount).toLocaleString()}` : '₹0'}</span>
               </div>
               <div className="flex justify-between items-center">
                   <span>Processing Fee</span>
                   <span className="uppercase text-xs tracking-wider font-bold">Free</span>
               </div>
            </div>
            
            <div className="h-px w-full bg-slate-700 mb-8" />

            <div className="flex justify-between items-end mb-8">
                <span className="font-black text-lg text-slate-400 uppercase tracking-widest">Remaining</span>
                <span className="text-3xl font-black text-emerald-400">
                  ₹{Math.max(0, walletBalance - (parseFloat(withdrawAmount) || 0)).toLocaleString()}
                </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWithdraw}
              className="w-full bg-emerald-500 text-slate-900 font-poppins font-black py-4 rounded-xl shadow-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              Complete Withdrawal
            </motion.button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-300 opacity-70">
              <span>🔒</span> SSL Secured 256-bit Encryption
            </div>

            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsHistoryOpen(true)}
              className="w-full lg:w-[360px] bg-white border-2 border-slate-200 text-slate-800 font-poppins font-black py-4 rounded-xl shadow-sm hover:border-slate-800 hover:shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              📄 View Transaction History
            </motion.button>
          </div>
        </div>

        {/* NEW: Order Tracking Section */}
        {isLoggedIn && orders.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 pt-10 border-t border-slate-200"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="font-poppins font-black text-4xl text-slate-800 tracking-tight">Track Your Requests</h2>
                <p className="text-slate-500 font-bold mt-2 uppercase tracking-[0.2em] text-xs">Real-time status of your recycling pickups</p>
              </div>
              <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
                {orders.map(order => (
                  <button
                    key={order.id}
                    onClick={() => setActiveOrderId(order.id)}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap
                      ${activeOrderId === order.id 
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
                  >
                    {order.trackingId || `Order #${order.id}`}
                  </button>
                ))}
              </div>
            </div>

            {activeOrder && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Device Info Card */}
                <div className="lg:col-span-4">
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 h-full relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors" />
                    
                    <div className="relative">
                      <div className="flex justify-between items-start mb-10">
                        <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-3xl shadow-inner">
                          📱
                        </div>
                        <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest border border-emerald-100">
                          Active Request
                        </span>
                      </div>

                      <h3 className="font-poppins font-black text-2xl text-slate-800 leading-tight mb-2">
                        {activeOrder.cartItemVariant}
                      </h3>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">
                        Tracking ID: <span className="text-slate-800">{activeOrder.trackingId || 'ELOOP-NEW'}</span>
                      </p>

                      <div className="space-y-6">
                        <div className="flex justify-between items-center py-4 border-b border-slate-50">
                          <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Expected Value</span>
                          <span className="font-black text-xl text-emerald-500">₹{activeOrder.finalPrice?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-slate-50">
                          <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Scheduled Date</span>
                          <span className="font-black text-sm text-slate-700">{activeOrder.scheduledDate || 'TBD'}</span>
                        </div>
                        <div className="flex justify-between items-center py-4">
                          <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Location</span>
                          <span className="font-black text-sm text-slate-700 truncate max-w-[150px]">{activeOrder.address || 'Saved Address'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Vertical Timeline */}
                <div className="lg:col-span-8">
                  <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 h-full">
                    <div className="flex items-center gap-4 mb-12">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      </div>
                      <h3 className="font-poppins font-black text-2xl text-slate-800 tracking-tight">Lifecycle Progress</h3>
                    </div>

                    <div className="space-y-0 relative pl-4">
                      {/* Vertical line connector */}
                      <div className="absolute left-[35px] top-4 bottom-12 w-0.5 bg-slate-100" />
                      
                      {steps.map((step, idx) => {
                        const progress = getStatusProgress(activeOrder);
                        const isCompleted = progress >= idx;
                        const isCurrent = progress === idx - 1 || (progress === 0 && idx === 0);
                        const isUpcoming = progress < idx;

                        return (
                          <div key={idx} className="relative flex gap-8 pb-12 last:pb-0 group">
                            {/* Marker */}
                            <div className={`relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center text-lg transition-all duration-500 shadow-md
                              ${isCompleted 
                                ? 'bg-emerald-500 text-white ring-4 ring-emerald-50' 
                                : isCurrent 
                                  ? 'bg-white text-slate-400 ring-4 ring-slate-50 border-2 border-emerald-500 animate-pulse'
                                  : 'bg-white text-slate-300 border-2 border-slate-100'}`}
                            >
                              {isCompleted ? '✓' : step.icon}
                            </div>

                            <div className="pt-1">
                              <h4 className={`font-poppins font-black text-sm uppercase tracking-widest transition-colors
                                ${isCompleted ? 'text-slate-800' : isCurrent ? 'text-emerald-600' : 'text-slate-300'}`}>
                                {step.label}
                              </h4>
                              <p className={`text-xs font-bold mt-1 transition-colors ${isCompleted || isCurrent ? 'text-slate-500' : 'text-slate-300'}`}>
                                {step.desc}
                              </p>
                              {isCurrent && (
                                <motion.div 
                                  initial={{ opacity: 0, x: -10 }} 
                                  animate={{ opacity: 1, x: 0 }}
                                  className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-[10px] font-black text-emerald-600 uppercase tracking-widest"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                  Current Stage
                                </motion.div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
      
      <AnimatePresence>
        {isHistoryOpen && (
          <motion.div 
            key="history-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32 p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-[500px] overflow-hidden flex flex-col"
            >
               <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-poppins font-black text-xl text-slate-800 tracking-tight">Transaction History</h3>
                  <button onClick={() => setIsHistoryOpen(false)} className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors font-bold">✕</button>
               </div>
               
               <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4 font-inter">
                  {history.length === 0 ? (
                    <p className="text-center text-slate-500 py-8 font-medium">No recent transactions found.</p>
                  ) : (
                    history.map((txn, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm ${txn.type === 'DEBIT' ? 'bg-red-100 text-red-500' : 'bg-emerald-100 text-emerald-500'}`}>
                            {txn.type === 'DEBIT' ? '↗' : '↙'}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{txn.type}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {new Date(txn.createdAt).toLocaleDateString()} at {new Date(txn.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>
                        <p className={`font-black ${txn.type === 'DEBIT' ? 'text-red-500' : 'text-emerald-500'}`}>
                          {txn.type === 'DEBIT' ? '-' : '+'}₹{txn.amount.toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast.show && (
          <motion.div
            key="toast-modal"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-2xl shadow-2xl font-bold font-inter text-sm flex items-center gap-3 border ${
              toast.type === 'success' 
                ? 'bg-emerald-500 text-white border-emerald-400' 
                : 'bg-red-50 text-red-600 border-red-200 shadow-red-900/10'
            }`}
          >
            <span className="text-xl">{toast.type === 'success' ? '✅' : '⚠️'}</span>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
