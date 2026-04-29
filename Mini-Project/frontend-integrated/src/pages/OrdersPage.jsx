import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/ui/BackButton'
import Footer from '../components/layout/Footer'
import { api } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function OrdersPage({ goBack, canGoBack }) {
  const { token, isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackedOrderId, setTrackedOrderId] = useState(null);

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, token]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await api.getMyPickups(token);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await api.cancelPickup(id, token);
      fetchOrders();
    } catch (err) {
      alert("Failed to cancel order: " + (err.error || err.message));
    }
  };

  const getStepProgress = (order) => {
    if (order.status === 'Cancelled') return -1;
    if (order.paymentStatus === 'Paid') return 3; // Payment Released
    if (order.status === 'Approved') return 1; // Pickup Scheduled
    return 0; // Request Received
  };

  const trackingSteps = [
    { name: 'Request Received' },
    { name: 'Pickup Scheduled' },
    { name: 'Device Inspection' },
    { name: 'Payment Released' }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-inter flex flex-col">
      <div className="max-w-[1100px] w-full mx-auto px-5 pt-10 pb-28 flex-1">
        <div className="flex items-center justify-between mb-10">
          <BackButton goBack={goBack} canGoBack={canGoBack} label="Home" />
          <h1 className="font-poppins font-black text-3xl text-slate-800">My Orders</h1>
        </div>

        {!isLoggedIn ? (
          <div className="text-center py-20 bg-white rounded-[2rem] shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">Please sign in to view your orders.</h2>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">No orders found.</h2>
            <p className="text-slate-500 mt-2">You haven't placed any pickup requests yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const currentStep = getStepProgress(order);
              const isCancelled = currentStep === -1;

              return (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 flex flex-col gap-6"
                >
                  {/* Order Details Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-xs font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">Order #{1000 + order.id}</p>
                        <p className="text-sm font-bold text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">{order.cartItemVariant || 'Device Recycling'}</h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Quote</p>
                      <h3 className="text-2xl font-black text-[#037252]">₹{order.finalPrice?.toLocaleString() || 0}</h3>
                    </div>
                  </div>

                  {/* Pickup Address */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pickup Information</p>
                      <p className="text-sm font-bold text-slate-700 leading-relaxed">{order.address}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 border-t border-slate-100">
                    <button 
                      onClick={() => setTrackedOrderId(trackedOrderId === order.id ? null : order.id)}
                      className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all ${trackedOrderId === order.id ? 'bg-slate-800 text-white' : 'bg-[#037252] text-white hover:bg-[#025c42]'} shadow-sm`}
                    >
                      {trackedOrderId === order.id ? 'Close Tracking' : 'Track Order 📍'}
                    </button>
                    
                    {!isCancelled && currentStep < 3 && (
                      <button 
                        onClick={() => handleCancel(order.id)}
                        className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-500 transition-colors w-full sm:w-auto py-2 text-center"
                      >
                        Cancel Order
                      </button>
                    )}
                    
                    {isCancelled && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                        Order Cancelled
                      </span>
                    )}
                  </div>

                  {/* Horizontal Tracking Area (Conditional) */}
                  <AnimatePresence>
                    {trackedOrderId === order.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-8 pb-4 mt-4 border-t-2 border-dashed border-slate-100">
                          {isCancelled ? (
                            <div className="flex flex-col items-center justify-center py-6 bg-red-50 rounded-2xl border border-red-100">
                              <span className="text-4xl mb-3">❌</span>
                              <p className="font-poppins font-black text-red-500 text-xl tracking-tight">Pickup Cancelled</p>
                              <p className="text-sm text-red-400 font-bold mt-1">This order is no longer active.</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <h4 className="font-poppins font-bold text-lg text-slate-800 mb-2">Status: {trackingSteps[Math.max(0, currentStep)].name}</h4>
                              <p className="text-slate-500 text-xs font-bold mb-10">Our agent will call you to coordinate the pickup.</p>
                              
                              <div className="flex w-full overflow-x-auto pb-4 no-scrollbar justify-between px-4 sm:px-10 relative">
                                {/* Connecting line */}
                                <div className="absolute top-5 left-12 right-12 h-1 bg-slate-100 z-0" />
                                
                                {trackingSteps.map((step, idx) => {
                                  const isCompleted = currentStep >= idx;
                                  return (
                                    <div key={idx} className="flex flex-col items-center min-w-[80px] z-10 relative">
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors duration-500 border-4 border-white ${isCompleted ? 'bg-[#037252] text-white shadow-md shadow-[#037252]/20' : 'bg-slate-200 text-slate-400'}`}>
                                        {isCompleted ? '✓' : idx + 1}
                                      </div>
                                      <span className={`text-[9px] sm:text-[10px] font-black text-center uppercase tracking-widest ${isCompleted ? 'text-[#037252]' : 'text-slate-400'}`}>
                                        {step.name}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
