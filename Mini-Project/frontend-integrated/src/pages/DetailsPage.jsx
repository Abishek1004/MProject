import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES, getCompany } from '../data'
import BackButton from '../components/ui/BackButton'
import box from '../assets/img/original_box.svg'
import charger from '../assets/img/charger.svg'
import { api } from '../utils/api'
import { staggerContainer, fadeUp } from '../utils/motion'
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
          { label: 'Working', },
          { label: 'Not Working', },
        ],
      },
      {
        id: 2, title: 'System Configuration', subtitle: 'Configure your laptop specifications',
        type: 'systemConfig', key: 'config', defaultImage: '/images/charger.svg',
        options: [],
      },
      {
        id: 3, title: 'Accessories', subtitle: 'Select all included accessories',
        type: 'checkbox', key: 'accessories', defaultImage: '/images/charger.svg',
        options: [
          { label: 'Original Charger', image: charger },
          { label: 'Valid Bill with Serial Number', image: bill },
        ],
      },
      {
        id: 4, title: 'Display Condition', subtitle: 'Select display condition',
        type: 'radio', key: 'displayCondition', defaultImage: '/images/display-ok.svg',
        options: [
          { label: 'No Defect', image: ld1 },
          { label: 'Minor Scratches', image: ld2 },
          { label: 'Major Scratches', image: ld3 },
          { label: 'Minor Spots', image: ld4 },
          { label: 'Major Spots', image: ld5 },
          { label: 'Display Lines', image: ld6 },
        ],
      },
      {
        id: 5, title: 'Body Condition', subtitle: 'Select body condition',
        type: 'radio', key: 'bodyCondition', defaultImage: '/images/body-ok.svg',
        options: [
          { label: 'No Defect', image: lb1 },
          { label: 'Minor Scratches', image: lb2 },
          { label: 'Major Scratches or Dents', image: lb3 },
          { label: 'Major Dents or Cracked', image: lb4 },
        ],
      },
      {
        id: 6, title: 'Faults', subtitle: 'Select all faults present',
        type: 'checkbox', key: 'faults', defaultImage: '/images/speaker.svg',
        options: [
          { label: 'Camera Faulty', image: lf1 },
          { label: 'Speaker Faulty', image: lf2 },
          { label: 'Mic Faulty', image: lf3 },
          { label: 'WiFi Faulty', image: lf4 },
          { label: 'Bluetooth Faulty', image: lf5 },
          { label: 'Battery Faulty', image: lf6 },
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
          { label: 'Working', image: '/images/working.svg' },
          { label: 'Not Working', image: '/images/not-working.svg' },
        ],
      },
      {
        id: 2, title: 'System Configuration', subtitle: 'Configure your tablet specifications',
        type: 'systemConfig', key: 'config', defaultImage: '/images/box.svg',
        options: [],
      },
      {
        id: 3, title: 'Accessories', subtitle: 'Select all included accessories',
        type: 'checkbox', key: 'accessories', defaultImage: '/images/box.svg',
        options: [
          { label: 'Original Box', image: box },
          { label: 'Original Charger', image: charger },
        ],
      },
      {
        id: 4, title: 'Glass Defects', subtitle: 'Select glass condition',
        type: 'radio', key: 'glassDefects', defaultImage: '/images/no-damage.svg',
        options: [
          { label: 'No Defect', image: tg1 },
          { label: 'Minor Scratches', image: tg2 },
          { label: 'Major Scratches', image: tg3 },
          { label: 'Front Glass Broken or Cracked', image: tg4 },

        ],
      },
      {
        id: 5, title: 'Display Defects', subtitle: 'Select display condition',
        type: 'radio', key: 'displayDefects', defaultImage: '/images/display-ok.svg',
        options: [
          { label: 'No Defect', image: td1 },
          { label: 'Minor Spots', image: td2 },
          { label: 'Major Spots', image: td3 },
          { label: 'Display Lines', image: td4 },
          { label: 'Touch Faulty', image: td5 },
          { label: 'Display Faulty', image: td6 },
        ],
      },
      {
        id: 6, title: 'Body Defects', subtitle: 'Select body condition',
        type: 'radio', key: 'bodyDefects', defaultImage: '/images/body-ok.svg',
        options: [
          { label: 'No Defect', image: tb1 },
          { label: 'Minor Scratches', image: tb2 },
          { label: 'Major Scratches or Dents', image: tb3 },
          { label: 'Major Dents or Cracked', image: tb4 },
        ],
      },
      {
        id: 7, title: 'Faults', subtitle: 'Select all faults present',
        type: 'checkbox', key: 'faults', defaultImage: '/images/speaker.svg',
        options: [
          { label: 'Front Camera Faulty', image: tf1 },
          { label: 'Back Camera Faulty', image: tf9 },
          { label: 'Speaker Faulty', image: tf2 },
          { label: 'Mic Faulty', image: tf3 },
          { label: 'WiFi Faulty', image: tf4 },
          { label: 'Bluetooth Faulty', image: tf5 },
          { label: 'Charging Faulty', image: tf6 },
          { label: 'Battery Faulty', image: tf7 },
          { label: 'Buttons Faulty', image: tf8 },
        ],
      },
      {
        id: 8, title: 'Upload Device Image', subtitle: 'Upload a clear photo of your tablet',
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
        { label: 'Working', image: '/images/working.svg' },
        { label: 'Not Working', image: '/images/not-working.svg' },
      ],
    },
    {
      id: 2, title: 'System Configuration', subtitle: 'Configure your mobile specifications',
      type: 'systemConfig', key: 'config', defaultImage: '/images/box.svg',
      options: [],
    },
    {
      id: 3, title: 'Accessories', subtitle: 'Select all included accessories',
      type: 'checkbox', key: 'accessories', defaultImage: '/images/box.svg',
      options: [
        { label: 'Original Box with same IMEI', image: box },
        { label: 'Original Charger', image: charger },
      ],
    },
    {
      id: 4, title: 'Glass Defects', subtitle: 'Select glass condition',
      type: 'radio', key: 'glassDefects', defaultImage: '/images/no-damage.svg',
      options: [
        { label: 'No Defect', image: i1 },
        { label: 'Minor Scratches', image: i2 },
        { label: 'Major Scratches', image: i3 },
        { label: 'Front Glass Broken', image: i4 },
        { label: 'Back Glass Broken', image: i5 },
        { label: 'Both Broken', image: i6 },
      ],
    },
    {
      id: 5, title: 'Display Defects', subtitle: 'Select display condition',
      type: 'radio', key: 'displayDefects', defaultImage: '/images/display-ok.svg',
      options: [
        { label: 'No Defect', image: d1 },
        { label: 'Minor Spots', image: d2 },
        { label: 'Major Spots', image: d3 },
        { label: 'Display Lines', image: d4 },
        { label: 'Display Changed', image: d5 },
        { label: 'Touch Faulty', image: d6 },
        { label: 'Display Faulty', image: d7 },
      ],
    },
    {
      id: 6, title: 'Body Defects', subtitle: 'Select body condition',
      type: 'radio', key: 'bodyDefects', defaultImage: '/images/body-ok.svg',
      options: [
        { label: 'No Defect', image: b1 },
        { label: 'Minor Scratches', image: b2 },
        { label: 'Major Scratches or Dents', image: b3 },
        { label: 'Major Dents or Cracked', image: b4 },
        { label: 'Body Bend', image: b5 },
        { label: 'Body Deform', image: b6 },
      ],
    },
    {
      id: 7, title: 'Faults', subtitle: 'Select all faults present',
      type: 'checkbox', key: 'faults', defaultImage: '/images/speaker.svg',
      options: [
        { label: 'Front Camera Faulty', image: f1 },
        { label: 'Back Camera Faulty', image: f2 },
        { label: 'Speaker Faulty', image: f5 },
        { label: 'Mic Faulty', image: f6 },
        { label: 'WiFi Faulty', image: f8 },
        { label: 'Bluetooth Faulty', image: f9 },
        { label: 'Charging Faulty', image: f11 },
        { label: 'Battery Faulty', image: f12 },
        { label: 'Buttons Faulty', image: f13 },
      ],
    },
    {
      id: 8, title: 'Upload Device Image', subtitle: 'Upload a clear photo of your mobile phone',
      type: 'upload', key: 'deviceImage', defaultImage: '/images/box.svg',
      options: [],
    },
  ]
}

const processorOptions = [
  'Intel i3', 'Intel i5', 'Intel i7', 'Intel i9',
  'Ryzen 3', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9',
  'Apple M1', 'Apple M2', 'Apple M3',
  'Other',
]

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
        padding: hideImage ? '6px' : '8px 6px 6px', borderRadius: 10, textAlign: 'center',
        background: selected ? `${accent}08` : '#ffffff',
        border: `1.5px solid ${selected ? accent : '#f1f5f9'}`,
        boxShadow: selected ? `0 4px 10px ${accent}15` : '0 1px 2px rgba(0,0,0,0.01)',
        cursor: 'pointer', transition: 'all 0.15s ease',
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
        fontSize: isLargeText ? 14 : 10,
        fontWeight: isLargeText ? 700 : 600,
        lineHeight: 1.2,
        color: selected ? '#0f172a' : '#64748b',
        fontFamily: "'Inter',sans-serif",
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        overflow: 'hidden', height: isLargeText ? 'auto' : 24,
      }}>{opt.label}</span>
    </button>
  )
}

/* ─── condition wizard (embedded) ───────────────────────── */
function ConditionWizard({ cc, steps, persistKey, onComplete, nav }) {
  const EMPTY = useMemo(() => {
    const o = {}
    for (const s of steps) {
      if (s.type === 'systemConfig') o[s.key] = { processor: '', ram: '', storage: '' }
      else o[s.key] = s.type === 'checkbox' ? [] : ''
    }
    return o
  }, [steps])
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(() => {
    if (nav.conditionData?.answers) return nav.conditionData.answers
    return EMPTY
  })
  const [preview, setPreview] = useState(steps[0]?.defaultImage || '/images/working.svg')
  const [animKey, setAnimKey] = useState(0)
  const [specQuery, setSpecQuery] = useState('')

  const cur = steps[step]
  const ac = { a: cc, b: cc }
  const isRadio = cur.type === 'radio'
  const isUpload = cur.type === 'upload'
  const isConfig = cur.type === 'systemConfig'

  const ramOptions = nav.ramOptions || ['4GB', '6GB', '8GB', '12GB', '16GB']
  const storageOptions = nav.storageOptions || ['64GB', '128GB', '256GB', '512GB']

  const specOptions = useMemo(() => {
    const combos = []
    for (const r of ramOptions) {
      for (const s of storageOptions) combos.push({ ram: r, storage: s, label: `${r} / ${s}` })
    }
    const q = specQuery.trim().toLowerCase()
    if (!q) return combos
    return combos.filter((c) => c.label.toLowerCase().includes(q))
  }, [ramOptions, storageOptions, specQuery])

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
    } catch { }
  }, [uploadKey, persistKey, imgStorageKey, imgValidStorageKey])

  useEffect(() => {
    const val = answers[cur.key]
    if (isRadio && val) {
      const f = cur.options.find(o => o.label === val)
      setPreview(f ? f.image : cur.defaultImage)
    } else if (!isRadio && !isConfig && Array.isArray(val) && val.length) {
      const f = cur.options.find(o => o.label === val[val.length - 1])
      setPreview(f ? f.image : cur.defaultImage)
    } else {
      setPreview(cur.defaultImage)
    }
    setAnimKey(k => k + 1)
  }, [step])

  const handleRadio = (key, label) => setAnswers(p => ({ ...p, [key]: label }))
  const handleCheckbox = (key, label) => setAnswers(p => {
    const arr = p[key]
    return { ...p, [key]: arr.includes(label) ? arr.filter(v => v !== label) : [...arr, label] }
  })
  const handleConfig = (k, v) => setAnswers(p => ({ ...p, config: { ...p.config, [k]: v } }))

  // Allow proceeding if: image uploaded and valid, OR server error (let user skip)
  const canProceed = isUpload
    ? answers[cur.key] !== '' && (imgCheckStatus === 'valid' || imgCheckStatus === 'error')
    : isConfig
      ? (answers.config.ram && answers.config.storage && (nav.category !== 'laptop' || answers.config.processor))
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
      <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">

        {/* back button */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <button onClick={goBack} disabled={step === 0} style={{
            width: 28, height: 28, borderRadius: 6, border: '1.5px solid #e2e8f0',
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.3 : 1,
          }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* title */}
        <div key={`t${animKey}`} className="cond-fade-up" style={{ textAlign: 'center', paddingBottom: 12 }}>
          <p style={{
            fontFamily: "'Poppins',sans-serif", fontSize: 16, fontWeight: 800,
            color: '#0f172a', margin: 0, letterSpacing: '-0.02em',
          }}>{isUpload ? 'AI Visual Verification' : cur.title}</p>
          <p style={{ fontSize: 11, color: ac.a, marginTop: 2, fontWeight: 600, fontFamily: "'Inter',sans-serif", opacity: 0.8 }}>
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
                try { if (imgStorageKey) localStorage.setItem(imgStorageKey, dataUrl) } catch { }

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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
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
                    <polyline points="20 6 9 17 4 12" />
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
                    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
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
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
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
      ) : isConfig ? (
        <div key={`o${animKey}`} className="cond-fade-up p-4 space-y-4 max-h-[420px] overflow-y-auto">
          {nav.category === 'laptop' && (
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-400 mb-2">Processor Type</label>
              <select
                value={answers.config.processor}
                onChange={(e) => handleConfig('processor', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 text-sm font-bold outline-none focus:border-emerald-500/50 transition-all"
              >
                <option value="">Choose Processor</option>
                {processorOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-black uppercase text-slate-400 mb-2">Select Your Variant</label>
            <div className="relative mb-3">
              <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" /></svg>
                <input
                  value={specQuery}
                  onChange={(e) => setSpecQuery(e.target.value)}
                  placeholder="Search GB capacity..."
                  className="flex-1 bg-transparent outline-none text-sm font-bold text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {specOptions.map((opt) => {
                const selected = answers.config.ram === opt.ram && answers.config.storage === opt.storage
                return (
                  <button
                    key={opt.label}
                    onClick={() => { handleConfig('ram', opt.ram); handleConfig('storage', opt.storage) }}
                    className="w-full text-left rounded-xl border bg-white px-4 py-3 flex items-center gap-3 transition-all"
                    style={{ borderColor: selected ? ac.a : '#f1f5f9', background: selected ? `${ac.a}08` : '#fff' }}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border-2" style={{ borderColor: selected ? ac.a : '#cbd5e1', backgroundColor: selected ? ac.a : 'transparent' }} />
                    <span className={`font-bold text-xs ${selected ? 'text-slate-900' : 'text-slate-600'}`}>{opt.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <div key={`o${animKey}`} className="cond-fade-up p-3 sm:p-4 flex flex-row flex-wrap gap-2 sm:gap-3 max-h-[380px] overflow-y-auto justify-start content-start">
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
  const cat = CATEGORIES.find(c => c.id === nav.category)
  const company = getCompany(nav.category, nav.company)
  const steps = useMemo(() => getConditionSteps(nav.category), [nav.category])
  const imagePersistKey = useMemo(
    () => `eco_device_image_${nav.category}_${nav.company}_${nav.modelId || nav.variant || 'x'}`,
    [nav.category, nav.company, nav.modelId, nav.variant],
  )

  const [conditionDone, setConditionDone] = useState(!!nav.conditionData)
  const [conditionData, setConditionData] = useState(nav.conditionData || null)

  const handleConditionComplete = (answers) => {
    const normalized = normalizeConditionForPricing(nav.category, answers)
    normalized.answers = answers
    setConditionData(normalized)
    setConditionDone(true)
    
    // Automatically proceed to estimate for a smoother experience
    const finalData = {
      ...nav,
      conditionData: {
        ...normalized,
        processor: normalized.config?.processor,
        ram: normalized.config?.ram,
        storage: normalized.config?.storage,
      }
    }
    go('estimate', finalData)
  }

  const handleSubmit = () => {
    if (!conditionDone) {
      alert('Please complete the condition assessment first.')
      return
    }
    go('estimate', {
      ...nav,
      conditionData: {
        ...conditionData,
        processor: conditionData.config?.processor,
        ram: conditionData.config?.ram,
        storage: conditionData.config?.storage,
      }
    })
  }

  const cc = cat?.color || '#059669'
  const cl = cat?.light || '#f0fdf4'


  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: cl }}>
      <div className="max-w-[1200px] mx-auto px-4 pt-6 pb-12">

        <BackButton goBack={goBack} canGoBack={canGoBack} label="Variants" />

        <div className="flex flex-col lg:flex-row gap-16 mt-6 items-start">
          {/* ── Left Column: Interaction ── */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            {/* Phone Type Header Section */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] rounded-full" style={{ background: cc }}></span>
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-inter font-bold uppercase tracking-[0.2em]">
                  {company?.name} · {cat?.name}
                </p>
              </div>
              <h1 className="font-poppins font-black text-slate-800 dark:text-slate-100 text-3xl lg:text-4xl mb-2 leading-tight tracking-tight">
                {nav.variant || conditionData?.variant || 'Your Device'}
              </h1>
              <div className="h-1 w-16 rounded-full mb-6" style={{ background: `linear-gradient(90deg, ${cc}, ${cc}40)` }}></div>

              <h2 className="font-poppins font-extrabold text-slate-800 dark:text-slate-100 text-xl mb-1 mt-6">Tell Us About Your Device</h2>
              <p className="text-slate-500 dark:text-slate-400 font-inter text-xs max-w-md">These details determine your accurate recycle value. Please answer honestly.</p>
            </motion.div>

            {/* ── Condition Wizard ── */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-[11px] font-bold" style={{ color: cc, border: `1px solid ${cc}30` }}>1</div>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-inter font-bold uppercase tracking-wider">
                  Condition Assessment
                </p>
              </div>

              {conditionDone ? (
                /* ── summary card after completion ── */
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-lg shadow-slate-200/30 dark:shadow-none">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20">
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-poppins font-bold text-slate-800 dark:text-slate-100 text-sm block leading-none">Assessment Complete</span>
                      </div>
                    </div>
                    <button onClick={() => setConditionDone(false)}
                      className="text-[10px] font-inter font-bold px-3 py-1.5 rounded-lg transition-all active:scale-95 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(conditionData).map(([key, val]) => {
                      if (val && typeof val === 'object' && !Array.isArray(val)) return null
                      const step = steps.find(s => s.key === key)
                      if (!step) return null
                      const display = Array.isArray(val) ? (val.length ? val.join(', ') : 'None') : val || '—'
                      return (
                        <div key={key} className="rounded-xl p-2.5 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                          <p className="text-[9px] font-inter font-bold text-slate-400 uppercase tracking-tight mb-0.5">{step.title}</p>
                          <p className="text-[10px] font-inter font-bold text-slate-700 dark:text-slate-300 truncate">{display}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="shadow-2xl shadow-slate-200/40 dark:shadow-none rounded-3xl overflow-hidden">
                  <ConditionWizard cc={cc} steps={steps} persistKey={imagePersistKey} onComplete={handleConditionComplete} nav={nav} />
                </div>
              )}
            </motion.div>


            </div>

          {/* ── Right Column: Persistent Device Summary ── */}
          <div className="w-full lg:w-[320px] order-1 lg:order-2 mt-4 lg:mt-32">
            <div className="lg:sticky lg:top-48">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <motion.div
                  className="rounded-[2rem] p-6 overflow-hidden relative dark:text-white transition-colors duration-300"
                  style={{
                    backgroundColor: cl,
                    border: `1.5px solid ${cc}15`,
                    boxShadow: `0 35px 70px -15px ${cc}30`,
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Glass decorations */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-10" style={{ background: cc }}></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl opacity-5" style={{ background: cc }}></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl mb-4 shadow-sm bg-white"
                      style={{ color: cc }}>{cat?.emoji}</div>

                    <p className="text-slate-400 text-[9px] font-bold font-inter tracking-[0.2em] uppercase mb-1 opacity-70">Summary Details</p>
                    <h3 className="font-poppins font-black text-slate-800 text-xl mb-3 leading-tight">{nav.variant}</h3>

                    <div className="space-y-3 pt-3 border-t border-slate-900/5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-inter text-slate-500 font-medium">Brand</span>
                        <span className="text-xs font-inter text-slate-800 font-bold">{company?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-inter text-slate-500 font-medium">Category</span>
                        <span className="text-xs font-inter text-slate-800 font-bold uppercase tracking-wider text-[10px]">{cat?.name}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl mt-3">
                        <span className="text-xs font-inter text-slate-500 font-medium">Starting Value</span>
                        <span className="text-lg font-poppins text-slate-800 font-black" style={{ color: cc }}>
                          ₹{(nav.variantBase || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-[1.5rem] bg-white/70 border border-white backdrop-blur-md shadow-sm">
                      <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-[0.15em] mb-3 opacity-60">Health Check</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${conditionDone ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-200'}`}></div>
                          <span className={`text-[10px] font-bold font-inter transition-colors duration-500 ${conditionDone ? 'text-slate-800' : 'text-slate-400'}`}>
                            {conditionDone ? 'Evaluation Complete' : 'Awaiting Input'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                          <span className="text-[10px] font-bold font-inter text-slate-400">
                            Logic Pending
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
      </div>
    </div>
  )
}
