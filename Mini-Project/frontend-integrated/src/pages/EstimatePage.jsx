import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES, getCompany } from '../data'
import { calcPrice, getConditionLabel } from '../utils/pricing'
import { api } from '../utils/api'
import BackButton from '../components/ui/BackButton'
import PaymentModal from '../components/ui/PaymentModal'

export default function EstimatePage({ nav, go, goBack, canGoBack, addToCart }) {
  const n = nav || {}
  const d = n.conditionData || n.deviceDetails || {}
  
  const detailsForCart = useMemo(() => {
    const copy = { ...(d || {}) }
    delete copy.deviceImage
    delete copy.answers
    return copy
  }, [d])

  const basePrice = useMemo(() => {
    const b = n.variantBase || 12000
    const p = calcPrice(b, d)
    return Math.max(p, 1500)
  }, [n.variantBase, d])

  const [mlPrice, setMlPrice] = useState(null)
  const [payOpen, setPayOpen] = useState(false)

  const cat = CATEGORIES.find((c) => c.id === n.category) || CATEGORIES[0]
  const brand = getCompany(n.category || 'mobile', n.company || 'apple')
  const cond = getConditionLabel(d)
  
  const primaryGreen = '#4dbb91' 
  const lightMintBg = '#eff5e6' 
  const darkNavy = '#1a2233'
  const price = mlPrice || basePrice

  useEffect(() => {
    if (n.category !== 'mobile') return
    const brandName = brand?.name || ''
    const ram_gb = parseInt((d?.ram || '').toString().replace(/[^0-9]/g, ''), 10) || 4
    const storage_gb = parseInt((d?.storage || '').toString().replace(/[^0-9]/g, ''), 10) || 64
    const payload = {
      brand: brandName, age_years: 2, ram_gb: [4,6,8,12].includes(ram_gb)?ram_gb:8, 
      storage_gb: [64,128,256].includes(storage_gb)?storage_gb:128,
      battery_power: 4500, original_box: 1, original_charger: 1, 
      front_glass_status: 'no defect', back_glass_status: 'no defect',
      display_defect: 'no defect', body_defect: 'no defect', faults: 'none'
    }
    api.predictMobilePrice(payload).then((res) => {
        const num = parseInt(res?.predicted_price, 10)
        if (Number.isFinite(num)) setMlPrice(num)
    }).catch(() => {})
  }, [n.category, brand, d])

  return (
    <div className="min-h-screen" style={{ backgroundColor: lightMintBg }}>
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="mb-10">
          <BackButton goBack={goBack} canGoBack={canGoBack} label="Device Details" />
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-8">
          
          {/* Column 1: Device Summary */}
          <motion.div
            className="flex-1 bg-white rounded-[2.5rem] p-8 flex flex-col shadow-2xl border border-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-poppins font-black text-slate-800 text-2xl tracking-tighter">Device Summary</h3>
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl shadow-inner border border-slate-100">📱</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 flex-1 content-start">
              {[
                ['Device', n.variant || '—'],
                ['Brand', brand?.name || '—'],
                ['RAM', d.ram || '—'],
                ['Storage', d.storage || '—'],
                ['Battery', d.batteryCondition || 'Good'],
                ['Physical', d.physicalCondition || 'No Damage'],
                ['Working', <span key="w" className="flex items-center gap-1.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="4"><path d="M20 6L9 17L4 12"/></svg> Yes</span>],
                ['Overall',
                  <span key="cond" className="text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border-2"
                    style={{ background: cond.bg, color: cond.c, borderColor: cond.bd }}>
                    {cond.l}
                  </span>
                ],
              ].map(([k, v], i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ y: -5, backgroundColor: '#ffffff', boxShadow: '0 15px 30px rgba(0,0,0,0.05)' }}
                  className="bg-[#f8fafc] rounded-[1.5rem] p-4 border border-slate-50 transition-all group cursor-default"
                >
                  <p className="text-slate-400 text-[9px] mb-1 font-inter font-black uppercase tracking-[0.25em] transition-colors group-hover:text-emerald-500">{k}</p>
                  <div className="font-black text-[0.85rem] text-slate-800 font-inter">{v}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Actions */}
          <motion.div 
            className="w-full md:w-[420px] flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 h-full flex flex-col shadow-2xl">
              <h4 className="font-poppins font-black text-slate-800 text-lg mb-8 tracking-tight">Checkout Options</h4>
              
              <div className="flex flex-col gap-5 flex-1 justify-center">
                
                {/* Embedded Price Display since the big box was removed */}
                <motion.div 
                  className="text-center mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.3 }}
                >
                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Estimated Value</p>
                    <p className="text-4xl font-poppins font-black text-slate-800 tracking-tight">
                        <span className="text-xl text-emerald-500 mr-1">₹</span>
                        {(price || 0).toLocaleString()}
                    </p>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02, translateY: -4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={async () => {
                    await addToCart({
                      category: cat?.name, company: brand?.name, variant: n.variant,
                      details: detailsForCart, price, modelId: n.modelId,
                    })
                  }}
                  className="w-full text-white font-poppins font-black py-4 rounded-[1.5rem] border-none cursor-pointer flex flex-col items-center justify-center gap-1 shadow-2xl transition-all"
                  style={{ background: primaryGreen, boxShadow: `0 20px 40px ${primaryGreen}35` }}
                >
                  <span className="flex items-center gap-2.5 text-[0.95rem] uppercase tracking-[0.1em]">
                    <span className="text-sm">🛒</span> Add to Cart
                  </span>
                  <span className="text-[11px] font-inter opacity-85 font-bold">Secure · Final Price: ₹{(price || 0).toLocaleString()}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, translateY: -4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => go('schedulepickup', { price, variant: n.variant })}
                  className="w-full text-white font-poppins font-black py-4 rounded-[1.5rem] border-none cursor-pointer flex flex-col items-center justify-center gap-1 shadow-2xl transition-all"
                  style={{ background: darkNavy, boxShadow: '0 20px 40px rgba(26, 34, 51, 0.4)' }}
                >
                  <span className="flex items-center gap-2.5 text-[0.95rem] uppercase tracking-[0.1em]">
                    <span className="text-sm">🚛</span> Schedule Pickup
                  </span>
                  <span className="text-[11px] font-inter opacity-70 font-bold">Free Instant Home Pickup</span>
                </motion.button>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={() => go('home', {})}
                className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] py-3 mt-8 text-slate-400 font-black text-[0.75rem] uppercase tracking-[0.3em] cursor-pointer font-inter transition-all hover:bg-slate-50 hover:text-slate-600 hover:border-slate-200"
              >
                Sell Another Device
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {payOpen && (
          <PaymentModal
            price={price}
            deviceVariant={n.variant}
            catColor={primaryGreen}
            onClose={() => setPayOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
