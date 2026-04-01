import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES, getCompany } from '../data'
import { calcPrice, getConditionLabel } from '../utils/pricing'
import { api } from '../utils/api'
import BackButton from '../components/ui/BackButton'
import PaymentModal from '../components/ui/PaymentModal'
import { staggerContainer, fadeUp } from '../utils/motion'

export default function EstimatePage({ nav, go, goBack, canGoBack, addToCart }) {
  const d     = nav.deviceDetails
  const detailsForCart = useMemo(() => {
    const copy = { ...(d || {}) }
    // Uploaded image is base64; do not send to cart backend.
    delete copy.deviceImage
    return copy
  }, [d])

  const basePrice = calcPrice(nav.variantBase || 10000, d)
  const [mlLoading, setMlLoading] = useState(false)
  const [mlError, setMlError] = useState(null)
  const [mlPrice, setMlPrice] = useState(null)
  const [added, setAdded] = useState(false)
  const [payOpen, setPayOpen] = useState(false)

  const cat   = CATEGORIES.find((c) => c.id === nav.category)
  const brand = getCompany(nav.category, nav.company)
  const cond  = getConditionLabel(d)
  const catColor = cat?.color || '#059569'
  const price = mlPrice ?? basePrice

  const predictPayload = useMemo(() => {
    if (nav.category !== 'mobile') return null

    const brandName = brand?.name || ''
    const ram_gb = parseInt((d?.ram || '').toString().replace(/[^0-9]/g, ''), 10) || 0
    const storage_gb = parseInt((d?.storage || '').toString().replace(/[^0-9]/g, ''), 10) || 0

    const ramClamp = [4, 6, 8, 12]
    const storageClamp = [64, 128, 256]
    const nearest = (val, opts, fallback) => (opts.includes(val) ? val : fallback ?? opts[0])
    const ram_gb_clamped = nearest(ram_gb, ramClamp, 12)
    const storage_gb_clamped = nearest(storage_gb, storageClamp, 256)

    const battery_power =
      d?.batteryCondition === 'Good' ? 5250 :
      d?.batteryCondition === 'Average' ? 4500 :
      d?.batteryCondition === 'Poor' ? 3500 :
      4500

    const accessories = Array.isArray(d?.accessories) ? d.accessories : []
    const original_box = accessories.includes('Original Box with same IMEI') ? 1 : 0
    const original_charger = accessories.includes('Original Charger') ? 1 : 0

    const glass = d?.glassDefects || 'No Defect'
    let front_glass_status = 'no defect'
    let back_glass_status = 'no defect'
    if (glass === 'Minor Scratches') {
      front_glass_status = 'minor scratches'
      back_glass_status = 'minor scratches'
    } else if (glass === 'Major Scratches') {
      front_glass_status = 'major scratches'
      back_glass_status = 'major scratches'
    } else if (glass === 'Front Glass Broken') {
      front_glass_status = 'broken/cracked'
    } else if (glass === 'Back Glass Broken') {
      back_glass_status = 'broken/cracked'
    } else if (glass === 'Both Broken') {
      front_glass_status = 'broken/cracked'
      back_glass_status = 'broken/cracked'
    }

    const displayMap = {
      'No Defect': 'no defect',
      'Minor Spots': 'minor spots',
      'Major Spots': 'major spots',
      'Display Lines': 'display lines',
      'Touch Faulty': 'touch faulty',
      'Display Changed': 'display changes',
      'Display Faulty': 'display faulty',
    }
    const display_defect = displayMap[d?.displayDefects] || 'no defect'

    const bodyMap = {
      'No Defect': 'no defect',
      'Minor Scratches': 'minor scratches',
      'Major Scratches or Dents': 'major scratches',
      'Major Dents or Cracked': 'major dents',
      'Body Bend': 'body bend',
      'Body Deform': 'body damage',
    }
    const body_defect = bodyMap[d?.bodyDefects] || 'no defect'

    const faultMap = {
      'Battery Faulty': 'battery faulty',
      'Charging Faulty': 'charging faulty',
      'WiFi Faulty': 'wifi faulty',
      'Bluetooth Faulty': 'bluetooth faulty',
      'Front Camera Faulty': 'front camera faulty',
      'Back Camera Faulty': 'back camera faulty',
      'Speaker Faulty': 'loud speaker faulty',
      'Mic Faulty': 'mic faulty',
      'Buttons Faulty': 'buttons faulty',
    }
    const faultPriority = [
      'Battery Faulty',
      'Charging Faulty',
      'WiFi Faulty',
      'Bluetooth Faulty',
      'Front Camera Faulty',
      'Back Camera Faulty',
      'Speaker Faulty',
      'Mic Faulty',
      'Buttons Faulty',
    ]
    const selectedFaults = Array.isArray(d?.faults) ? d.faults : []
    const matchedFaultKey = faultPriority.find((k) => selectedFaults.includes(k))
    const faults = matchedFaultKey ? faultMap[matchedFaultKey] : 'none'

    // UI does not currently collect these fields, so we assume defaults.
    const age_years = 2

    return {
      brand: brandName,
      age_years,
      ram_gb: ram_gb_clamped,
      storage_gb: storage_gb_clamped,
      battery_power,
      original_box,
      original_charger,
      front_glass_status,
      back_glass_status,
      display_defect,
      body_defect,
      faults,
    }
  }, [nav.category, brand?.name, d])

  useEffect(() => {
    if (!predictPayload) return
    setMlLoading(true)
    setMlError(null)

    api.predictMobilePrice(predictPayload)
      .then((res) => {
        const val = res?.predicted_price
        const num = typeof val === 'number' ? val : parseInt(val, 10)
        if (Number.isFinite(num)) setMlPrice(num)
        else setMlPrice(null)
      })
      .catch((e) => {
        setMlPrice(null)
        setMlError(e?.message || 'Prediction failed')
      })
      .finally(() => setMlLoading(false))
  }, [predictPayload])

  return (
    <>
    <div className="max-w-[640px] mx-auto px-5 pt-10 pb-20">
      <BackButton goBack={goBack} canGoBack={canGoBack} label="Device Details" />

      {/* Price hero card */}
      <motion.div
        className="rounded-2xl px-8 py-11 text-center mb-5 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${catColor}ee, ${catColor}99)`,
          boxShadow: `0 8px 32px ${catColor}40`,
        }}
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 0.68, 0, 1.2] }}
      >
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: '#fff', opacity: 0.08, filter: 'blur(30px)' }}
        />
        <div className="text-6xl mb-2 relative">💰</div>
        <p className="text-white/75 text-sm mb-1 relative">Estimated Recycle Value for</p>
        <p className="font-poppins font-bold text-white text-xl mb-4 relative">{nav.variant}</p>
        <motion.div
          className="font-poppins font-black text-white leading-none mb-2.5 relative"
          style={{ fontSize: '3.5rem' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.18, duration: 0.45, ease: [0.22, 0.68, 0, 1.2] }}
        >
          ₹{price.toLocaleString()}
        </motion.div>
        <p className="text-white/65 text-sm relative">Free pickup · Payment within 24 hours</p>
      </motion.div>

      {/* Device summary */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-4 transition-colors duration-300"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.38 }}
      >
        <h3 className="font-poppins font-bold text-slate-800 dark:text-slate-100 mb-4">Device Summary</h3>
        <motion.div
          className="grid grid-cols-2 gap-2.5"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {[
            ['Device',       nav.variant],
            ['Brand',        brand?.name || '—'],
            ['RAM',          d.ram],
            ['Storage',      d.storage],
            ['Battery',      d.batteryCondition],
            ['Physical',     d.physicalCondition],
            ['Working',      d.isWorking === 'Yes' ? '✅ Yes' : '❌ No'],
            ['Overall',
              <span key="cond" className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background: cond.bg, color: cond.c, border: `1px solid ${cond.bd}` }}>
                {cond.l}
              </span>
            ],
          ].map(([k, v], i) => (
            <motion.div key={i} className="bg-slate-50 dark:bg-slate-700/60 rounded-xl p-3 transition-colors duration-300" variants={fadeUp}>
              <p className="text-slate-400 dark:text-slate-400 text-[11px] mb-1 font-inter">{k}</p>
              <div className="font-semibold text-sm text-slate-800 dark:text-slate-100 font-inter">{v}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Actions */}
      <AnimatePresence mode="wait">
        {!added ? (
          <motion.button
            key="add"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            whileHover={{ scale: 1.02, opacity: 0.92 }}
            whileTap={{ scale: 0.97 }}
            onClick={async () => {
              const ok = await addToCart({
                category: cat?.name,
                company:  brand?.name,
                variant:  nav.variant,
                details:  detailsForCart,
                price,
                modelId:  nav.modelId,
              })
              if (ok) setAdded(true)
            }}
            className="w-full text-white font-poppins font-bold text-[1.05rem] py-4 rounded-2xl border-none cursor-pointer flex items-center justify-center gap-3 mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: catColor, boxShadow: `0 4px 16px ${catColor}40` }}
            disabled={nav.category === 'mobile' && mlLoading}
          >
            <span>🛒 Add to Cart</span>
            <span className="text-sm font-inter bg-white/15 px-3 py-1.5 rounded-full">
              ₹{price.toLocaleString()}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="added"
            className="w-full rounded-2xl p-4 text-center font-poppins font-bold text-[1.05rem] mb-3 border-2"
            style={{ background: `${catColor}10`, borderColor: `${catColor}40`, color: catColor }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 0.68, 0, 1.2] }}
          >
            ✅ Added to Cart!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Pickup button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.3 }}
        whileHover={{ scale: 1.02, opacity: 0.93 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setPayOpen(true)}
        disabled={nav.category === 'mobile' && mlLoading}
        className="w-full text-white font-poppins font-bold text-[1.05rem] py-4 rounded-2xl border-none cursor-pointer flex items-center justify-center gap-3 mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: `linear-gradient(135deg, #1e293b, #0f172a)`,
          boxShadow: `0 4px 16px rgba(0,0,0,0.3)`,
          border: `1.5px solid ${catColor}60`,
        }}
      >
        <span>🚛 Schedule Pickup</span>
        <span
          className="text-sm font-inter px-3 py-1.5 rounded-full"
          style={{ background: `${catColor}25`, color: catColor }}
        >
          Free · ₹{price.toLocaleString()}
        </span>
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => go('home')}
        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 rounded-2xl py-3.5 text-slate-500 dark:text-slate-300 font-semibold text-[0.95rem] cursor-pointer font-inter transition-colors"
      >
        Sell Another Device
      </motion.button>
    </div>

    {/* Payment Modal — full-viewport, rendered as sibling of the main div */}
    <AnimatePresence>
      {payOpen && (
        <PaymentModal
          price={price}
          deviceVariant={nav.variant}
          catColor={catColor}
          onClose={() => setPayOpen(false)}
        />
      )}
    </AnimatePresence>
    </>
  )
}
