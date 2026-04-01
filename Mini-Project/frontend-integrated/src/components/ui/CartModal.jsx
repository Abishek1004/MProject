import { useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeIn, slideUp } from '../../utils/motion'

export default function CartModal({ cart, onRemove, onClose }) {
  const overlayRef = useRef(null)
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <motion.div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-[500px] max-h-[88vh] flex flex-col overflow-hidden"
        variants={slideUp}
        initial="initial"
        animate="animate"
        exit="exit"
      >

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="font-poppins font-extrabold text-slate-800 text-xl">🛒 My Cart</h2>
            <p className="text-slate-400 text-xs mt-0.5">
              {cart.length} {cart.length === 1 ? 'device' : 'devices'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 border-none cursor-pointer flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors text-lg"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <div className="text-5xl mb-3">🛒</div>
              <p className="font-poppins font-semibold text-lg">Cart is empty</p>
              <p className="text-sm mt-1">Add a device to get started</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-3">
                <div className="flex justify-between items-start mb-2.5">
                  <div>
                    <p className="font-poppins font-bold text-slate-800 text-[0.95rem]">{item.variant}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{item.category} · {item.company}</p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="w-7 h-7 rounded-full bg-red-50 text-red-500 border-none cursor-pointer flex items-center justify-center text-sm flex-shrink-0 hover:bg-red-100 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {[
                    item.details.ram,
                    item.details.storage,
                    `Battery: ${item.details.batteryCondition}`,
                    item.details.physicalCondition,
                    item.details.isWorking === 'Yes' ? 'Working ✅' : 'Not Working ❌',
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="bg-white border border-slate-200 text-slate-500 text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-right">
                  <span className="font-poppins font-extrabold text-eco-600 text-lg">
                    ₹{item.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100">
            <div className="flex justify-between items-center mb-3.5">
              <span className="font-semibold text-slate-500">Total Estimated Value</span>
              <span className="font-poppins font-black text-eco-600 text-2xl">
                ₹{total.toLocaleString()}
              </span>
            </div>
            <button className="w-full bg-eco-600 hover:bg-eco-700 text-white font-poppins font-bold text-base py-3.5 rounded-2xl border-none cursor-pointer transition-colors shadow-lg shadow-eco-600/25">
              Schedule Pickup →
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
