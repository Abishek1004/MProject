import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES, getCompany } from '../data'
import BackButton from '../components/ui/BackButton'
import box from '../assets/img/original_box.svg'
import charger from '../assets/img/charger.svg'
import { api } from '../utils/api'
import { staggerContainer, fadeUp } from '../utils/motion'
import Footer from '../components/layout/Footer'
import bill from '../assets/img/validbill.svg'
import i1 from '../assets/img/glass/i1.svg';
import i2 from '../assets/img/glass/i2.svg';
import i3 from '../assets/img/glass/i3.svg';
import i4 from '../assets/img/glass/i4.svg';
import i5 from '../assets/img/glass/i5.svg';
import i6 from '../assets/img/glass/i6.svg';
import d1 from '../assets/img/display/d1.svg'
import d2 from '../assets/img/display/d2.svg'
import d3 from '../assets/img/display/d3.svg'
import d4 from '../assets/img/display/d4.svg'
import d5 from '../assets/img/display/d5.svg'
import d6 from '../assets/img/display/d6.svg'
import d7 from '../assets/img/display/d7.svg'
import b1 from '../assets/img/body/b1.svg'
import b2 from '../assets/img/body/b2.svg'
import b3 from '../assets/img/body/b3.svg'
import b4 from '../assets/img/body/b4.svg'
import b5 from '../assets/img/body/b5.svg'
import b6 from '../assets/img/body/b6.svg'
import f1 from '../assets/img/fault/f1.svg'
import f2 from '../assets/img/fault/f2.svg'
import f5 from '../assets/img/fault/f5.svg'
import f6 from '../assets/img/fault/f6.svg'
import f8 from '../assets/img/fault/f8.svg'
import f9 from '../assets/img/fault/f9.svg'
import f11 from '../assets/img/fault/f11.svg'
import f12 from '../assets/img/fault/f12.svg'
import f13 from '../assets/img/fault/f13.svg'
import ld1 from '../assets/img/display/ld1.svg'
import ld2 from '../assets/img/display/ld2.svg'
import ld3 from '../assets/img/display/ld3.svg'
import ld4 from '../assets/img/display/ld4.svg'
import ld5 from '../assets/img/display/ld5.svg'
import ld6 from '../assets/img/display/ld6.svg'
import lb1 from '../assets/img/body/lb1.svg'
import lb2 from '../assets/img/body/lb2.svg'
import lb3 from '../assets/img/body/lb3.svg'
import lb4 from '../assets/img/body/lb4.svg'
import lf1 from '../assets/img/fault/lf1.svg'
import lf2 from '../assets/img/fault/lf2.svg'
import lf3 from '../assets/img/fault/lf3.svg'
import lf4 from '../assets/img/fault/lf4.svg'
import lf5 from '../assets/img/fault/lf5.svg'
import lf6 from '../assets/img/fault/lf6.svg'
import lf7 from '../assets/img/fault/lf7.svg'
import lf8 from '../assets/img/fault/lf8.svg'
import lf9 from '../assets/img/fault/lf9.svg'
import tg1 from '../assets/img/glass/tg1.svg'
import tg2 from '../assets/img/glass/tg2.svg'
import tg3 from '../assets/img/glass/tg3.svg'
import tg4 from '../assets/img/glass/tg4.svg'
import td1 from '../assets/img/display/td1.svg'
import td2 from '../assets/img/display/td2.svg'
import td3 from '../assets/img/display/td3.svg'
import td4 from '../assets/img/display/td4.svg'
import td5 from '../assets/img/display/td5.svg'
import td6 from '../assets/img/display/td6.svg'
import tb1 from '../assets/img/body/tb1.svg'
import tb2 from '../assets/img/body/tb2.svg'
import tb3 from '../assets/img/body/tb3.svg'
import tb4 from '../assets/img/body/tb4.svg'
import tf1 from '../assets/img/fault/tf1.svg'
import tf2 from '../assets/img/fault/tf2.svg'
import tf3 from '../assets/img/fault/tf3.svg'
import tf4 from '../assets/img/fault/tf4.svg'
import tf5 from '../assets/img/fault/tf5.svg'
import tf6 from '../assets/img/fault/tf6.svg'
import tf7 from '../assets/img/fault/tf7.svg'
import tf8 from '../assets/img/fault/tf8.svg'
import tf9 from '../assets/img/fault/tf9.svg'

const ACCENTS = [
  { a: '#037252', b: '#025c42' },
  { a: '#037252', b: '#025c42' },
  { a: '#037252', b: '#025c42' },
  { a: '#037252', b: '#025c42' },
  { a: '#037252', b: '#025c42' },
  { a: '#037252', b: '#025c42' },
]

function getConditionSteps(categoryId) {
  // Matches the exact step lists provided by you
  if (categoryId === 'laptop') {
    return [
      {
        id: 1, title: 'Working Status', subtitle: 'Is your laptop working?',
        type: 'radio', key: 'workingStatus', defaultImage: '/images/working.svg',
        options: [
          { label: 'Working',      },
          { label: 'Not Working',  },
        ],
      },
      {
        id: 2, title: 'Accessories', subtitle: 'Select all included accessories',
        type: 'checkbox', key: 'accessories', defaultImage: '/images/charger.svg',
        options: [
          { label: 'Original Charger',               image: charger },
          { label: 'Valid Bill with Serial Number',  image: bill },
        ],
      },
      {
        id: 3, title: 'Display Condition', subtitle: 'Select display condition',
        type: 'radio', key: 'displayCondition', defaultImage: '/images/display-ok.svg',
        options: [
          { label: 'No Defect',       image: ld1 },
          { label: 'Minor Scratches', image: ld2 },
          { label: 'Major Scratches', image: ld3},
          { label: 'Minor Spots',     image: ld4 },
          { label: 'Major Spots',     image: ld5 },
          { label: 'Display Lines',   image: ld6 },
        ],
      },
      {
        id: 4, title: 'Body Condition', subtitle: 'Select body condition',
        type: 'radio', key: 'bodyCondition', defaultImage: '/images/body-ok.svg',
        options: [
          { label: 'No Defect',                image: lb1 },
          { label: 'Minor Scratches',          image: lb2 },
          { label: 'Major Scratches or Dents', image: lb3},
          { label: 'Major Dents or Cracked',   image: lb4},
        ],
      },
      {
        id: 5, title: 'Faults', subtitle: 'Select all faults present',
        type: 'checkbox', key: 'faults', defaultImage: '/images/speaker.svg',
        options: [
          { label: 'Camera Faulty',   image: lf1},
          { label: 'Speaker Faulty',  image: lf2 },
          { label: 'Mic Faulty',      image: lf3 },
          { label: 'WiFi Faulty',     image: lf4 },
          { label: 'Bluetooth Faulty',image: lf5 },
          { label: 'Battery Faulty',  image: lf6 },
          { label: 'Charging Faulty', image: lf7 },
          { label: 'Keyboard Faulty', image: lf8 },
          { label: 'Trackpad Faulty', image: lf9 },
        ],
      },
    ]
  }

  if (categoryId === 'tablet') {
    return [
      {
        id: 1, title: 'Working Status', subtitle: 'Is your tablet working?',
        type: 'radio', key: 'workingStatus', defaultImage: '/images/working.svg',
        options: [
          { label: 'Working',     image: '/images/working.svg' },
          { label: 'Not Working', image: '/images/not-working.svg' },
        ],
      },
      {
        id: 2, title: 'Accessories', subtitle: 'Select all included accessories',
        type: 'checkbox', key: 'accessories', defaultImage: '/images/box.svg',
        options: [
          { label: 'Original Box',     image: box },
          { label: 'Original Charger', image: charger },
        ],
      },
      {
        id: 3, title: 'Glass Defects', subtitle: 'Select glass condition',
        type: 'radio', key: 'glassDefects', defaultImage: '/images/no-damage.svg',
        options: [
          { label: 'No Defect',          image: tg1 },
          { label: 'Minor Scratches',    image: tg2 },
          { label: 'Major Scratches',    image: tg3 },
          { label: 'Front Glass Broken or Cracked', image: tg4 },
          
        ],
      },
      {
        id: 4, title: 'Display Defects', subtitle: 'Select display condition',
        type: 'radio', key: 'displayDefects', defaultImage: '/images/display-ok.svg',
        options: [
          { label: 'No Defect',      image: td1 },
          { label: 'Minor Spots',    image: td2 },
          { label: 'Major Spots',    image: td3 },
          { label: 'Display Lines',  image: td4 },
          { label: 'Touch Faulty',   image: td5 },
          { label: 'Display Faulty', image: td6 },
        ],
      },
      {
        id: 5, title: 'Body Defects', subtitle: 'Select body condition',
        type: 'radio', key: 'bodyDefects', defaultImage: '/images/body-ok.svg',
        options: [
          { label: 'No Defect',                image: tb1 },
          { label: 'Minor Scratches',          image: tb2 },
          { label: 'Major Scratches or Dents', image: tb3 },
          { label: 'Major Dents or Cracked',   image: tb4 },
        ],
      },
      {
        id: 6, title: 'Faults', subtitle: 'Select all faults present',
        type: 'checkbox', key: 'faults', defaultImage: '/images/speaker.svg',
        options: [
          { label: 'Front Camera Faulty',    image: tf1 },
          { label: 'Back Camera Faulty',    image: tf9 },
          { label: 'Speaker Faulty',   image: tf2 },
          { label: 'Mic Faulty',       image: tf3 },
          { label: 'WiFi Faulty',      image: tf4},
          { label: 'Bluetooth Faulty', image: tf5 },
          { label: 'Charging Faulty',  image: tf6 },
          { label: 'Battery Faulty',   image: tf7},
          { label: 'Buttons Faulty',   image: tf8 },
        ],
      },
      {
        id: 7, title: 'Upload Device Image', subtitle: 'Upload a clear photo of your tablet',
        type: 'upload', key: 'deviceImage', defaultImage: '/images/box.svg',
        options: [],
      },
    ]
  }

  // default: mobile
  return [
    {
      id: 1, title: 'Working Status', subtitle: 'Is your mobile working?',
      type: 'radio', key: 'workingStatus', defaultImage: '/images/working.svg',
      options: [
        { label: 'Working',     image: '/images/working.svg' },
        { label: 'Not Working', image: '/images/not-working.svg' },
      ],
    },
    {
      id: 2, title: 'Accessories', subtitle: 'Select all included accessories',
      type: 'checkbox', key: 'accessories', defaultImage: '/images/box.svg',
      options: [
        { label: 'Original Box with same IMEI', image: box },
        { label: 'Original Charger',            image: charger},
      ],
    },
    {
      id: 3, title: 'Glass Defects', subtitle: 'Select glass condition',
      type: 'radio', key: 'glassDefects', defaultImage: '/images/no-damage.svg',
      options: [
      { label: 'No Defect',           image: i1 },
  { label: 'Minor Scratches',     image: i2 },
  { label: 'Major Scratches',     image: i3 },
  { label: 'Front Glass Broken',  image: i4 },
  { label: 'Back Glass Broken',   image: i5 },
  { label: 'Both Broken',         image: i6 },
      ],
    },
    {
      id: 4, title: 'Display Defects', subtitle: 'Select display condition',
      type: 'radio', key: 'displayDefects', defaultImage: '/images/display-ok.svg',
      options: [
        { label: 'No Defect',       image: d1 },
        { label: 'Minor Spots',     image: d2 },
        { label: 'Major Spots',     image: d3 },
        { label: 'Display Lines',   image: d4 },
        { label: 'Display Changed', image: d5 },
        { label: 'Touch Faulty',    image: d6 },
        { label: 'Display Faulty',  image: d7 },
      ],
    },
    {
      id: 5, title: 'Body Defects', subtitle: 'Select body condition',
      type: 'radio', key: 'bodyDefects', defaultImage: '/images/body-ok.svg',
      options: [
        { label: 'No Defect',                image: b1 },
        { label: 'Minor Scratches',          image: b2},
        { label: 'Major Scratches or Dents', image: b3 },
        { label: 'Major Dents or Cracked',   image: b4 },
        { label: 'Body Bend',                image: b5 },
        { label: 'Body Deform',              image: b6 },
      ],
    },
    {
      id: 6, title: 'Faults', subtitle: 'Select all faults present',
      type: 'checkbox', key: 'faults', defaultImage: '/images/speaker.svg',
      options: [
        { label: 'Front Camera Faulty', image: f1 },
        { label: 'Back Camera Faulty',  image: f2 },
        { label: 'Speaker Faulty',      image: f5 },
        { label: 'Mic Faulty',          image: f6 },
        { label: 'WiFi Faulty',         image: f8 },
        { label: 'Bluetooth Faulty',    image: f9  },
        { label: 'Charging Faulty',     image: f11 },
        { label: 'Battery Faulty',      image: f12 },
        { label: 'Buttons Faulty',      image: f13},
      ],
    },
    {
      id: 7, title: 'Upload Device Image', subtitle: 'Upload a clear photo of your mobile phone',
      type: 'upload', key: 'deviceImage', defaultImage: '/images/box.svg',
      options: [],
    },
  ]
}

function normalizeConditionForPricing(categoryId, answers) {
  const isWorking = answers.workingStatus === 'Not Working' ? 'No' : 'Yes'

  const damageLabel =
    answers.bodyDefects ||
    answers.bodyCondition ||
    answers.glassDefects ||
    answers.displayDefects ||
    answers.displayCondition ||
    ''

  let physicalCondition = 'Good'
  if (/Minor/i.test(damageLabel)) physicalCondition = 'Slight Damage'
  if (/Major|Broken|Cracked|Bend|Deform|Lines|Changed|Faulty/i.test(damageLabel)) physicalCondition = 'Heavy Damage'

  const faults = Array.isArray(answers.faults) ? answers.faults : []
  let batteryCondition = 'Good'
  if (faults.includes('Battery Faulty')) batteryCondition = 'Poor'
  else if (faults.length >= 2) batteryCondition = 'Average'

  return { ...answers, isWorking, physicalCondition, batteryCondition, categoryId }
}

/* ─── animated preview image ─────────────────────────────── */
function PreviewImage({ src, accent }) {
  const [imgKey, setImgKey] = useState(0)
  const prev = useRef(src)
  useEffect(() => {
    if (src !== prev.current) { prev.current = src; setImgKey(k => k + 1) }
  }, [src])
  return (
    <div style={{
      width: 120, height: 120, borderRadius: 24, margin: '0 auto',
      background: `radial-gradient(circle at 38% 38%, ${accent}26 0%, #f8fafc 70%)`,
      border: `1.5px solid ${accent}50`,
      boxShadow: `0 0 28px ${accent}28`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      <img key={imgKey} src={src} alt="" style={{
        width: 68, height: 68, objectFit: 'contain',
        animation: 'condPopIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both',
      }} onError={e => { e.currentTarget.style.opacity = '0.15' }} />
    </div>
  )
}

/* ─── single option row ──────────────────────────────────── */
function OptionRow({ opt, selected, onTap, isRadio, accent, setPreview, hideImage, isLargeText }) {
  return (
    <button
      onClick={() => { onTap(opt.label); if (setPreview) setPreview(opt.image) }}
      className="group"
      style={{
        flex: hideImage ? '1 1 120px' : '1 1 calc(50% - 8px)', 
        maxWidth: hideImage ? 'none' : '48%',
        minWidth: 100, 
        height: hideImage ? 65 : 105, 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: hideImage ? '8px' : '10px 8px 8px', borderRadius: 12, textAlign: 'center',
        background: selected ? `${accent}08` : '#ffffff',
        border: `1.5px solid ${selected ? accent : '#eef2f6'}`,
        boxShadow: selected ? `0 4px 12px ${accent}20` : '0 2px 4px rgba(0,0,0,0.02)',
        cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative', overflow: 'hidden',
        WebkitTapHighlightColor: 'transparent', outline: 'none',
      }}
    >
      {/* indicator dot/check in top-left */}
      <div style={{
        position: 'absolute', top: 8, left: 8,
        width: 16, height: 16, borderRadius: isRadio ? '50%' : 4,
        background: selected ? accent : '#f1f5f9',
        border: selected ? 'none' : '1.5px solid #cbd5e1',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s ease',
      }}>
        {selected && (
          <svg viewBox="0 0 12 12" width={10} height={10} fill="none">
            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Center Image */}
      {!hideImage && (
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 8, width: '100%',
        }}>
          <img src={opt.image} alt={opt.label} 
            style={{ 
              width: 44, height: 44, objectFit: 'contain', 
              opacity: selected ? 1 : 0.85,
              transform: selected ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.2s ease',
            }}
            onError={e => { e.currentTarget.style.opacity = '0.15' }} />
        </div>
      )}

      {/* label below */}
      <span style={{
        fontSize: isLargeText ? 15 : 10.5, 
        fontWeight: isLargeText ? 800 : 700, 
        lineHeight: 1.25,
        color: selected ? '#0f172a' : '#64748b', 
        fontFamily: isLargeText ? "'Poppins',sans-serif" : "'Inter',sans-serif",
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        overflow: 'hidden', height: isLargeText ? 'auto' : 24,
      }}>{opt.label}</span>
    </button>
  )
}

/* ─── condition wizard (embedded) ───────────────────────── */
function ConditionWizard({ cc, steps, persistKey, onComplete }) {
  const EMPTY = useMemo(() => {
    const o = {}
    for (const s of steps) o[s.key] = s.type === 'checkbox' ? [] : ''
    return o
  }, [steps])
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState(EMPTY)
  const [preview, setPreview] = useState(steps[0]?.defaultImage || '/images/working.svg')
  const [animKey, setAnimKey] = useState(0)

  const cur     = steps[step]
  const ac      = ACCENTS[step % ACCENTS.length]
  const isRadio = cur.type === 'radio'
  const isUpload = cur.type === 'upload'

  const uploadStep = useMemo(() => steps.find(s => s.type === 'upload'), [steps])
  const uploadKey = uploadStep?.key

  const imgStorageKey = uploadKey && persistKey ? `${persistKey}_${uploadKey}_img` : null
  const imgValidStorageKey = uploadKey && persistKey ? `${persistKey}_${uploadKey}_img_valid` : null

  const [imgCheckStatus, setImgCheckStatus] = useState('idle') // idle | checking | valid | invalid | error
  const [imgCheckError, setImgCheckError] = useState(null)
  const [imgCheckConfidence, setImgCheckConfidence] = useState(null)
  const [imgCheckMethod, setImgCheckMethod] = useState(null) // yolo | heuristic | none

  useEffect(() => {
    if (!uploadKey || !persistKey) return
    try {
      const savedImg = localStorage.getItem(imgStorageKey)
      if (savedImg) setAnswers(p => ({ ...p, [uploadKey]: savedImg }))

      if (imgValidStorageKey) {
        const savedValid = localStorage.getItem(imgValidStorageKey)
        if (savedValid === 'true') setImgCheckStatus('valid')
        else if (savedValid === 'false') setImgCheckStatus('invalid')
      }
    } catch {}
  }, [uploadKey, persistKey, imgStorageKey, imgValidStorageKey])

  useEffect(() => {
    const val = answers[cur.key]
    if (isRadio && val) {
      const f = cur.options.find(o => o.label === val)
      setPreview(f ? f.image : cur.defaultImage)
    } else if (!isRadio && Array.isArray(val) && val.length) {
      const f = cur.options.find(o => o.label === val[val.length - 1])
      setPreview(f ? f.image : cur.defaultImage)
    } else {
      setPreview(cur.defaultImage)
    }
    setAnimKey(k => k + 1)
  }, [step])

  const handleRadio    = (key, label) => setAnswers(p => ({ ...p, [key]: label }))
  const handleCheckbox = (key, label) => setAnswers(p => {
    const arr = p[key]
    return { ...p, [key]: arr.includes(label) ? arr.filter(v => v !== label) : [...arr, label] }
  })

  // Allow proceeding if: image uploaded and valid, OR server error (let user skip)
  const canProceed = isUpload
    ? answers[cur.key] !== '' && (imgCheckStatus === 'valid' || imgCheckStatus === 'error')
    : isRadio
      ? answers[cur.key] !== ''
      : true

  const goNext = () => {
    if (!canProceed) return
    if (step < steps.length - 1) setStep(step + 1)
    else onComplete(answers)
  }
  const goBack = () => { if (step > 0) setStep(step - 1) }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xl shadow-slate-200/40 dark:shadow-none transition-colors duration-300">
      <style>{`
        @keyframes condPopIn { from{opacity:0;transform:scale(0.65)} to{opacity:1;transform:scale(1)} }
        @keyframes condFadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .cond-fade-up { animation: condFadeUp 0.28s ease both; }
      `}</style>

      {/* header */}
      <div className="p-5 pt-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">

        {/* back button */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={goBack} disabled={step === 0} style={{
            width: 30, height: 30, borderRadius: 8, border: '1.5px solid #e2e8f0',
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.3 : 1,
          }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* title */}
        <div key={`t${animKey}`} className="cond-fade-up" style={{ textAlign: 'center', paddingBottom: 20 }}>
          <p style={{
            fontFamily: "'Poppins',sans-serif", fontSize: 18, fontWeight: 800,
            color: '#0f172a', margin: 0, letterSpacing: '-0.02em',
          }}>{isUpload ? 'AI Visual Verification' : cur.title}</p>
          <p style={{ fontSize: 12, color: ac.a, marginTop: 4, fontWeight: 600, fontFamily: "'Inter',sans-serif", opacity: 0.8 }}>
            {isUpload ? 'Scanning for device authenticity' : cur.subtitle}
          </p>
        </div>
      </div>

      {/* options */}
      {isUpload ? (
        <div
          key={`o${animKey}`}
          className="cond-fade-up"
          style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 500, overflowY: 'auto' }}
        >
          <input
            type="file"
            accept="image/*"
            id="wizard-device-image"
            style={{ display: 'none' }}
            onChange={async (e) => {
              const file = e.target.files?.[0] || null
              if (!file) return

              try {
                const dataUrl = await new Promise((resolve, reject) => {
                  const r = new FileReader()
                  r.onload = () => resolve(r.result)
                  r.onerror = () => reject(new Error('Failed to read image'))
                  r.readAsDataURL(file)
                })
                setAnswers(p => ({ ...p, [cur.key]: dataUrl }))
                try { if (imgStorageKey) localStorage.setItem(imgStorageKey, dataUrl) } catch {}

                setImgCheckStatus('checking')
                setImgCheckError(null)
                setImgCheckConfidence(null)
                setImgCheckMethod(null)
                const res = await api.validatePhoneImage(file)
                const isPhone = Boolean(res?.is_phone)
                const conf = typeof res?.confidence === 'number' ? res.confidence * 100 : null
                setImgCheckConfidence(conf)
                setImgCheckMethod(typeof res?.method === 'string' ? res.method : null)

                if (imgValidStorageKey) localStorage.setItem(imgValidStorageKey, isPhone ? 'true' : 'false')

                if (isPhone) {
                  setImgCheckStatus('valid')
                } else {
                  setImgCheckStatus('invalid')
                  setImgCheckError('Device not clearly detected. Please ensure the device is centered and well-lit.')
                }
              } catch (err) {
                setImgCheckStatus('error')
                setImgCheckError('Validation server busy. You can still proceed with manual verification.')
              }
            }}
          />

          <label
            htmlFor="wizard-device-image"
            style={{
              border: `2px dashed ${answers[cur.key] ? ac.a : '#e2e8f0'}`,
              borderRadius: 20,
              padding: '40px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              background: answers[cur.key] ? `${ac.a}05` : '#fcfdfe',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
            className="hover:bg-slate-50 group"
          >
            <div style={{ 
              width: 56, height: 56, borderRadius: '50%', 
              background: `${ac.a}15`, display: 'flex', 
              alignItems: 'center', justifyContent: 'center',
              marginBottom: 4,
              transition: 'transform 0.3s ease'
            }} className="group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ac.a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontFamily: "'Poppins',sans-serif", color: '#1e293b', fontSize: 16 }}>
                {answers[cur.key] ? 'Replace Photo' : 'Upload Device Image'}
              </div>
              <div style={{ fontSize: 12, marginTop: 4, color: '#64748b', fontFamily: "'Inter',sans-serif", fontWeight: 500 }}>
                Supports JPG, PNG (Max 5MB)
              </div>
            </div>
          </label>

          {answers[cur.key] && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: `2px solid ${ac.a}20`, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
            >
              <img
                src={answers[cur.key]}
                alt="Device captured"
                style={{ width: '100%', display: 'block', maxHeight: 350, objectFit: 'cover' }}
              />
              
              {imgCheckStatus === 'checking' && (
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ 
                    position: 'absolute', left: 0, right: 0, height: '2px', 
                    background: `linear-gradient(90deg, transparent, ${ac.a}, transparent)`,
                    boxShadow: `0 0 15px ${ac.a}`,
                    zIndex: 20
                  }}
                />
              )}

              <div style={{ 
                position: 'absolute', top: 16, right: 16, 
                padding: '8px 14px', borderRadius: 40, 
                background: 'rgba(15, 23, 42, 0.7)', color: '#fff',
                fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em',
                backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {imgCheckStatus === 'checking' ? 'Analyzing...' : 'Identity Confirmed'}
              </div>
            </motion.div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {imgCheckStatus === 'checking' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div className="animate-spin" style={{ width: 14, height: 14, border: `2px solid ${ac.a}40`, borderTopColor: ac.a, borderRadius: '50%' }}></div>
                <span style={{ fontSize: 12, color: '#475569', fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>Analyzing image with AI...</span>
              </div>
            )}

            {imgCheckStatus === 'valid' && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 16px', background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{ fontSize: 13, color: '#166534', fontWeight: 700, fontFamily: "'Poppins',sans-serif" }}>AI Verification Successful</span>
                </div>
                <p style={{ fontSize: 11, color: '#15803d', margin: 0, opacity: 0.8, fontWeight: 500 }}>
                  Device detected with {imgCheckConfidence?.toFixed(1)}% confidence via {imgCheckMethod === 'yolo' ? 'Vision API' : 'Neural Scan'}.
                </p>
              </motion.div>
            )}

            {imgCheckStatus === 'invalid' && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 16px', background: '#fff1f1', borderRadius: 12, border: '1px solid #fecaca' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span style={{ fontSize: 13, color: '#991b1b', fontWeight: 700, fontFamily: "'Poppins',sans-serif" }}>Device Not Detected</span>
                </div>
                <p style={{ fontSize: 11, color: '#b91c1c', margin: 0, opacity: 0.8, fontWeight: 500 }}>{imgCheckError}</p>
              </motion.div>
            )}

            {imgCheckStatus === 'error' && (
              <div style={{ padding: '14px 16px', background: '#fff7ed', borderRadius: 12, border: '1px solid #ffedd5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a3412" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span style={{ fontSize: 13, color: '#9a3412', fontWeight: 700, fontFamily: "'Poppins',sans-serif" }}>AI Validation Offline</span>
                </div>
                <p style={{ fontSize: 11, color: '#c2410c', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                  {imgCheckError}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div key={`o${animKey}`} className="cond-fade-up p-3 sm:p-5 flex flex-row flex-wrap gap-2.5 sm:gap-4 max-h-[440px] overflow-y-auto justify-start content-start">
          {cur.options.map(opt => {
            const selected = isRadio
              ? answers[cur.key] === opt.label
              : answers[cur.key].includes(opt.label)
            const hideImage = cur.key === 'workingStatus'
            const isLargeText = cur.key === 'workingStatus'
            return (
              <OptionRow key={opt.label} opt={opt} selected={selected} isRadio={isRadio}
                accent={ac.a} setPreview={setPreview}
                hideImage={hideImage} isLargeText={isLargeText}
                onTap={label => isRadio ? handleRadio(cur.key, label) : handleCheckbox(cur.key, label)} />
            )
          })}
        </div>
      )}

      {/* next button */}
      <div style={{ padding: '6px 12px 14px' }}>
        {(isRadio && !answers[cur.key]) && (
          <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>
            Select an option to continue
          </p>
        )}
        {isUpload && !answers[cur.key] && (
          <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>
            Upload an image to continue
          </p>
        )}
        {isUpload && answers[cur.key] && imgCheckStatus === 'invalid' && (
          <p style={{ textAlign: 'center', fontSize: 11, color: '#b91c1c', marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>
            Please upload a clear photo of your device to continue
          </p>
        )}
        <button onClick={goNext} disabled={!canProceed} 
          className={!canProceed ? "dark:bg-slate-800 dark:text-slate-500 transition-colors" : "transition-colors"}
          style={{
            width: '100%', padding: '14px', borderRadius: 16, border: 'none',
            background: canProceed ? `linear-gradient(135deg, ${ac.a}, ${ac.b})` : '#f1f5f9',
            color: canProceed ? '#fff' : '#94a3b8',
            fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 700,
          letterSpacing: '0.04em', cursor: canProceed ? 'pointer' : 'default',
          boxShadow: canProceed ? `0 6px 20px ${ac.a}38` : 'none',
          transition: 'all 0.2s ease',
        }}>
          {step === steps.length - 1 ? 'Done — Get My Price →' : 'Next  →'}
        </button>
      </div>
    </div>
  )
}

/* ─── DetailsPage ────────────────────────────────────────── */
function FieldLabel({ label, error }) {
  return (
    <div className="flex justify-between items-center mb-2">
      <label className="font-poppins font-semibold text-slate-800 dark:text-slate-100 text-[0.95rem]">{label}</label>
      {error && <span className="text-red-500 text-xs font-inter">{error}</span>}
    </div>
  )
}

export default function DetailsPage({ nav, go, goBack, canGoBack }) {
  const cat     = CATEGORIES.find(c => c.id === nav.category)
  const company = getCompany(nav.category, nav.company)
  const steps = useMemo(() => getConditionSteps(nav.category), [nav.category])
  const imagePersistKey = useMemo(
    () => `eco_device_image_${nav.category}_${nav.company}_${nav.modelId || nav.variant || 'x'}`,
    [nav.category, nav.company, nav.modelId, nav.variant],
  )

  const [conditionDone, setConditionDone] = useState(false)
  const [conditionData, setConditionData] = useState(null)

  const handleConditionComplete = (answers) => {
    setConditionData(normalizeConditionForPricing(nav.category, answers))
    setConditionDone(true)
  }

  const handleSubmit = () => {
    if (!conditionDone) {
      alert('Please complete the condition assessment first.')
      return
    }
    go('sysconfig', { conditionData })
  }

  const cc = '#037252'


  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-4 pt-8 pb-20">

      <BackButton goBack={goBack} canGoBack={canGoBack} label="Variants" />

      <div className="flex flex-col lg:flex-row gap-10 mt-8 items-start">
        {/* ── Left Column: Interaction ── */}
        <div className="flex-1 min-w-0 order-2 lg:order-1">
          {/* Phone Type Header Section */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] rounded-full" style={{ background: cc }}></span>
              <p className="text-slate-400 dark:text-slate-500 text-xs font-inter font-bold uppercase tracking-[0.2em]">
                {company?.name} · {cat?.name}
              </p>
            </div>
            <h1 className="font-poppins font-black text-slate-800 dark:text-slate-100 text-4xl lg:text-5xl mb-3 leading-tight tracking-tight">
              {nav.variant}
            </h1>
            <div className="h-1.5 w-20 rounded-full mb-8" style={{ background: `linear-gradient(90deg, ${cc}, ${cc}40)` }}></div>
            
            <h2 className="font-poppins font-extrabold text-slate-800 dark:text-slate-100 text-2xl mb-1 mt-10">Tell Us About Your Device</h2>
            <p className="text-slate-500 dark:text-slate-400 font-inter text-sm max-w-lg">These details determine your accurate recycle value. Please answer honestly for the best price.</p>
          </motion.div>

          {/* ── Condition Wizard (Working Status First) ── */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <p className="text-slate-400 text-[11px] font-inter font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]" style={{ color: cc }}>1</span>
              Device Condition Assessment
            </p>

            {conditionDone ? (
              /* ── summary card after completion ── */
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ background: '#10b98120', border: '1.5px solid #10b98133' }}>
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-poppins font-bold text-slate-800 dark:text-slate-100 text-base block">Conditions Recorded</span>
                      <span className="text-slate-500 text-[10px] font-medium uppercase font-inter tracking-wider">Verification Complete</span>
                    </div>
                  </div>
                  <button onClick={() => setConditionDone(false)}
                    className="text-xs font-inter font-bold px-4 py-2 rounded-xl transition-all active:scale-95"
                    style={{ background: `${cc}12`, color: cc, border: `1.5px solid ${cc}25` }}>
                    Edit Assessment
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(conditionData).map(([key, val]) => {
                    const step = steps.find(s => s.key === key)
                    if (!step) return null
                    const display = Array.isArray(val) ? (val.length ? val.join(', ') : 'None') : val || '—'
                    return (
                      <div key={key} className="rounded-2xl p-4 transition-colors" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <p className="text-[10px] font-inter font-bold text-slate-400 uppercase tracking-widest mb-1">{step.title}</p>
                        <p className="text-xs font-inter font-bold text-slate-700 leading-snug">{display}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="shadow-2xl shadow-slate-200/40 dark:shadow-none rounded-3xl overflow-hidden">
                <ConditionWizard cc={cc} steps={steps} persistKey={imagePersistKey} onComplete={handleConditionComplete} />
              </div>
            )}
          </motion.div>


          {/* ── Submit Button ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <motion.button
              onClick={handleSubmit}
              className="w-full text-white font-poppins font-black text-xl py-6 rounded-[2rem] border-none cursor-pointer shadow-2xl transition-all"
              style={{
                background: conditionDone 
                  ? `linear-gradient(135deg, ${cc}, #059669)` 
                  : `linear-gradient(135deg, #e2e8f0, #cbd5e1)`,
                boxShadow: conditionDone ? `0 20px 40px ${cc}30` : 'none',
                color: conditionDone ? '#fff' : '#94a3b8'
              }}
              whileHover={{ scale: conditionDone ? 1.02 : 1, y: conditionDone ? -3 : 0 }}
              whileTap={{ scale: conditionDone ? 0.98 : 1 }}
            >
              {conditionDone ? 'Proceed to Final Quote →' : 'Complete Assessment First'}
            </motion.button>
            {!conditionDone && (
              <p className="text-center text-xs font-inter font-medium text-slate-400 mt-4 flex items-center justify-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                </svg>
                Complete all assessment steps to unlock pricing
              </p>
            )}
          </motion.div>
        </div>

        {/* ── Right Column: Persistent Device Summary ── */}
        <div className="w-full lg:w-[360px] order-1 lg:order-2">
          <div className="sticky top-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.div
                className="rounded-[2.5rem] p-8 overflow-hidden relative dark:text-white bg-emerald-50 dark:bg-slate-800/80 transition-colors duration-300"
                style={{ 
                  border: `2px solid ${cc}15`,
                  boxShadow: `0 30px 60px -15px ${cc}15`,
                }}
                animate={{ y: [0, -12, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
              {/* Glass decorations */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: cc }}></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-10" style={{ background: cc }}></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg bg-white"
                  style={{ color: cc }}>{cat?.emoji}</div>
                
                <p className="text-slate-500 text-[10px] font-bold font-inter tracking-[0.2em] uppercase mb-1 opacity-70">Summary Details</p>
                <h3 className="font-poppins font-black text-slate-800 text-2xl mb-4 leading-tight">{nav.variant}</h3>
                
                <div className="space-y-4 pt-4 border-t border-slate-900/5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-inter text-slate-500 font-medium">Brand</span>
                    <span className="text-sm font-inter text-slate-800 font-bold">{company?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-inter text-slate-500 font-medium">Category</span>
                    <span className="text-sm font-inter text-slate-800 font-bold uppercase tracking-wider text-[11px]">{cat?.name}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl mt-4">
                    <span className="text-sm font-inter text-slate-500 font-medium">Starting Value</span>
                    <span className="text-xl font-poppins text-slate-800 font-black" style={{ color: cc }}>
                      ₹{(nav.variantBase || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-[2rem] bg-white/70 border border-white backdrop-blur-md shadow-sm">
                   <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-[0.15em] mb-4 opacity-60">System Health Check</p>
                   <div className="space-y-4">
                      <div className="flex items-center gap-4">
                         <div className={`w-3 h-3 rounded-full transition-all duration-500 ${conditionDone ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-slate-200'}`}></div>
                         <span className={`text-xs font-bold font-inter transition-colors duration-500 ${conditionDone ? 'text-slate-800' : 'text-slate-400'}`}>
                           {conditionDone ? 'Physical Evaluation Complete' : 'Awaiting Condition Input'}
                         </span>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                         <span className="text-xs font-bold font-inter text-slate-400">
                           Specifications Logic Pending
                         </span>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</div>
  )
}
