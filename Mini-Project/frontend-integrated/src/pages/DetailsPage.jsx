import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES, getCompany } from '../data'
import BackButton from '../components/ui/BackButton'
import box from '../assets/img/original_box.svg'
import { api } from '../utils/api'
import { staggerContainer, fadeUp } from '../utils/motion'

const ACCENTS = [
  { a: '#38bdf8', b: '#0284c7' },
  { a: '#34d399', b: '#059569' },
  { a: '#f87171', b: '#dc2626' },
  { a: '#818cf8', b: '#4f46e5' },
  { a: '#fbbf24', b: '#d97706' },
  { a: '#f472b6', b: '#db2777' },
]

function getConditionSteps(categoryId) {
  // Matches the exact step lists provided by you
  if (categoryId === 'laptop') {
    return [
      {
        id: 1, title: 'Working Status', subtitle: 'Is your laptop working?',
        type: 'radio', key: 'workingStatus', defaultImage: '/images/working.svg',
        options: [
          { label: 'Working',     image: '/images/working.svg' },
          { label: 'Not Working', image: '/images/not-working.svg' },
        ],
      },
      {
        id: 2, title: 'Accessories', subtitle: 'Select all included accessories',
        type: 'checkbox', key: 'accessories', defaultImage: '/images/charger.svg',
        options: [
          { label: 'Original Charger',               image: '/images/charger.svg' },
          { label: 'Valid Bill with Serial Number',  image: box },
        ],
      },
      {
        id: 3, title: 'Display Condition', subtitle: 'Select display condition',
        type: 'radio', key: 'displayCondition', defaultImage: '/images/display-ok.svg',
        options: [
          { label: 'No Defect',       image: '/images/display-ok.svg' },
          { label: 'Minor Scratches', image: '/images/minor-scratch.svg' },
          { label: 'Major Scratches', image: '/images/major-scratch.svg' },
          { label: 'Minor Spots',     image: '/images/minor-spot.svg' },
          { label: 'Major Spots',     image: '/images/major-spot.svg' },
          { label: 'Display Lines',   image: '/images/lines.svg' },
        ],
      },
      {
        id: 4, title: 'Body Condition', subtitle: 'Select body condition',
        type: 'radio', key: 'bodyCondition', defaultImage: '/images/body-ok.svg',
        options: [
          { label: 'No Defect',                image: '/images/body-ok.svg' },
          { label: 'Minor Scratches',          image: '/images/body-minor.svg' },
          { label: 'Major Scratches or Dents', image: '/images/body-major.svg' },
          { label: 'Major Dents or Cracked',   image: '/images/dent.svg' },
        ],
      },
      {
        id: 5, title: 'Faults', subtitle: 'Select all faults present',
        type: 'checkbox', key: 'faults', defaultImage: '/images/speaker.svg',
        options: [
          { label: 'Camera Faulty',   image: '/images/front-camera.svg' },
          { label: 'Speaker Faulty',  image: '/images/speaker.svg' },
          { label: 'Mic Faulty',      image: '/images/mic.svg' },
          { label: 'WiFi Faulty',     image: '/images/wifi.svg' },
          { label: 'Bluetooth Faulty',image: '/images/bluetooth.svg' },
          { label: 'Battery Faulty',  image: '/images/battery.svg' },
          { label: 'Charging Faulty', image: '/images/charging.svg' },
          { label: 'Keyboard Faulty', image: '/images/button.svg' },
          { label: 'Trackpad Faulty', image: '/images/button.svg' },
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
          { label: 'Original Box',     image: '/images/box.svg' },
          { label: 'Original Charger', image: '/images/charger.svg' },
        ],
      },
      {
        id: 3, title: 'Glass Defects', subtitle: 'Select glass condition',
        type: 'radio', key: 'glassDefects', defaultImage: '/images/no-damage.svg',
        options: [
          { label: 'No Defect',          image: '/images/no-damage.svg' },
          { label: 'Minor Scratches',    image: '/images/minor-scratch.svg' },
          { label: 'Major Scratches',    image: '/images/major-scratch.svg' },
          { label: 'Front Glass Broken', image: '/images/front-crack.svg' },
          { label: 'Back Glass Broken',  image: '/images/back-crack.svg' },
        ],
      },
      {
        id: 4, title: 'Display Defects', subtitle: 'Select display condition',
        type: 'radio', key: 'displayDefects', defaultImage: '/images/display-ok.svg',
        options: [
          { label: 'No Defect',      image: '/images/display-ok.svg' },
          { label: 'Minor Spots',    image: '/images/minor-spot.svg' },
          { label: 'Major Spots',    image: '/images/major-spot.svg' },
          { label: 'Display Lines',  image: '/images/lines.svg' },
          { label: 'Touch Faulty',   image: '/images/touch.svg' },
          { label: 'Display Faulty', image: '/images/display-fault.svg' },
        ],
      },
      {
        id: 5, title: 'Body Defects', subtitle: 'Select body condition',
        type: 'radio', key: 'bodyDefects', defaultImage: '/images/body-ok.svg',
        options: [
          { label: 'No Defect',                image: '/images/body-ok.svg' },
          { label: 'Minor Scratches',          image: '/images/body-minor.svg' },
          { label: 'Major Scratches or Dents', image: '/images/body-major.svg' },
          { label: 'Major Dents or Cracked',   image: '/images/dent.svg' },
        ],
      },
      {
        id: 6, title: 'Faults', subtitle: 'Select all faults present',
        type: 'checkbox', key: 'faults', defaultImage: '/images/speaker.svg',
        options: [
          { label: 'Camera Faulty',    image: '/images/front-camera.svg' },
          { label: 'Speaker Faulty',   image: '/images/speaker.svg' },
          { label: 'Mic Faulty',       image: '/images/mic.svg' },
          { label: 'WiFi Faulty',      image: '/images/wifi.svg' },
          { label: 'Bluetooth Faulty', image: '/images/bluetooth.svg' },
          { label: 'Charging Faulty',  image: '/images/charging.svg' },
          { label: 'Battery Faulty',   image: '/images/battery.svg' },
          { label: 'Buttons Faulty',   image: '/images/button.svg' },
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
        { label: 'Original Charger',            image: '/images/charger.svg' },
      ],
    },
    {
      id: 3, title: 'Glass Defects', subtitle: 'Select glass condition',
      type: 'radio', key: 'glassDefects', defaultImage: '/images/no-damage.svg',
      options: [
        { label: 'No Defect',          image: '/images/no-damage.svg' },
        { label: 'Minor Scratches',    image: '/images/minor-scratch.svg' },
        { label: 'Major Scratches',    image: '/images/major-scratch.svg' },
        { label: 'Front Glass Broken', image: '/images/front-crack.svg' },
        { label: 'Back Glass Broken',  image: '/images/back-crack.svg' },
        { label: 'Both Broken',        image: '/images/full-damage.svg' },
      ],
    },
    {
      id: 4, title: 'Display Defects', subtitle: 'Select display condition',
      type: 'radio', key: 'displayDefects', defaultImage: '/images/display-ok.svg',
      options: [
        { label: 'No Defect',       image: '/images/display-ok.svg' },
        { label: 'Minor Spots',     image: '/images/minor-spot.svg' },
        { label: 'Major Spots',     image: '/images/major-spot.svg' },
        { label: 'Display Lines',   image: '/images/lines.svg' },
        { label: 'Display Changed', image: '/images/display-change.svg' },
        { label: 'Touch Faulty',    image: '/images/touch.svg' },
        { label: 'Display Faulty',  image: '/images/display-fault.svg' },
      ],
    },
    {
      id: 5, title: 'Body Defects', subtitle: 'Select body condition',
      type: 'radio', key: 'bodyDefects', defaultImage: '/images/body-ok.svg',
      options: [
        { label: 'No Defect',                image: '/images/body-ok.svg' },
        { label: 'Minor Scratches',          image: '/images/body-minor.svg' },
        { label: 'Major Scratches or Dents', image: '/images/body-major.svg' },
        { label: 'Major Dents or Cracked',   image: '/images/dent.svg' },
        { label: 'Body Bend',                image: '/images/bend.svg' },
        { label: 'Body Deform',              image: '/images/deform.svg' },
      ],
    },
    {
      id: 6, title: 'Faults', subtitle: 'Select all faults present',
      type: 'checkbox', key: 'faults', defaultImage: '/images/speaker.svg',
      options: [
        { label: 'Front Camera Faulty', image: '/images/front-camera.svg' },
        { label: 'Back Camera Faulty',  image: '/images/back-camera.svg' },
        { label: 'Speaker Faulty',      image: '/images/speaker.svg' },
        { label: 'Mic Faulty',          image: '/images/mic.svg' },
        { label: 'WiFi Faulty',         image: '/images/wifi.svg' },
        { label: 'Bluetooth Faulty',    image: '/images/bluetooth.svg' },
        { label: 'Charging Faulty',     image: '/images/charging.svg' },
        { label: 'Battery Faulty',      image: '/images/battery.svg' },
        { label: 'Buttons Faulty',      image: '/images/button.svg' },
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
function OptionRow({ opt, selected, onTap, isRadio, accent, setPreview }) {
  return (
    <button
      onClick={() => { onTap(opt.label); setPreview(opt.image) }}
      onMouseEnter={() => setPreview(opt.image)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 14px', borderRadius: 14, textAlign: 'left',
        background: selected ? `${accent}12` : '#f8fafc',
        border: `1.5px solid ${selected ? accent + '80' : '#e2e8f0'}`,
        cursor: 'pointer', transition: 'all 0.17s ease',
        WebkitTapHighlightColor: 'transparent', outline: 'none',
      }}
    >
      {/* thumb */}
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: selected ? `${accent}20` : '#fff',
        border: `1px solid ${selected ? accent + '55' : '#e2e8f0'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img src={opt.image} alt={opt.label} style={{ width: 22, height: 22, objectFit: 'contain' }}
          onError={e => { e.currentTarget.style.opacity = '0.15' }} />
      </div>
      {/* label */}
      <span style={{
        flex: 1, fontSize: 13.5, fontWeight: 500, lineHeight: 1.4,
        color: selected ? '#1e293b' : '#64748b', fontFamily: "'Inter',sans-serif",
      }}>{opt.label}</span>
      {/* indicator */}
      <div style={{
        width: 20, height: 20, flexShrink: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        borderRadius: isRadio ? '50%' : 6,
        background: selected ? accent : 'transparent',
        border: selected ? 'none' : '2px solid #cbd5e1',
        transition: 'all 0.17s ease',
      }}>
        {selected && (
          <svg viewBox="0 0 12 12" width={12} height={12} fill="none">
            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
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
    <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #e2e8f0', overflow: 'hidden' }}>
      <style>{`
        @keyframes condPopIn { from{opacity:0;transform:scale(0.65)} to{opacity:1;transform:scale(1)} }
        @keyframes condFadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .cond-fade-up { animation: condFadeUp 0.28s ease both; }
      `}</style>

      {/* header */}
      <div style={{ padding: '20px 20px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        {/* progress bars */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              flex: i === step ? 2.5 : 1, height: 4, borderRadius: 8,
              background: i < step ? ac.a : i === step ? ac.a : '#e2e8f0',
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>

        {/* back + badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <button onClick={goBack} disabled={step === 0} style={{
            width: 34, height: 34, borderRadius: 10, border: '1.5px solid #e2e8f0',
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.3 : 1,
          }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
            padding: '4px 12px', borderRadius: 20,
            background: `${ac.a}18`, color: ac.a,
            border: `1px solid ${ac.a}44`, fontFamily: "'Inter',sans-serif",
          }}>STEP {step + 1} / {steps.length}</span>
          <div style={{ width: 34 }} />
        </div>

        {/* preview image */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <PreviewImage src={preview} accent={ac.a} />
        </div>

        {/* title */}
        <div key={`t${animKey}`} className="cond-fade-up" style={{ textAlign: 'center', paddingBottom: 16 }}>
          <p style={{
            fontFamily: "'Poppins',sans-serif", fontSize: 17, fontWeight: 700,
            color: '#0f172a', margin: 0, letterSpacing: '-0.01em',
          }}>{cur.title}</p>
          <p style={{ fontSize: 12, color: ac.a, marginTop: 3, fontWeight: 500, fontFamily: "'Inter',sans-serif" }}>
            {cur.subtitle}
          </p>
        </div>
      </div>

      {/* options */}
      {isUpload ? (
        <div
          key={`o${animKey}`}
          className="cond-fade-up"
          style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 340, overflowY: 'auto' }}
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

                // Validate that the uploaded image really contains a phone.
                setImgCheckStatus('checking')
                setImgCheckError(null)
                setImgCheckConfidence(null)
                setImgCheckMethod(null)
                const res = await api.validatePhoneImage(file)
                const isPhone = Boolean(res?.is_phone)
                const conf = typeof res?.confidence === 'number' ? res.confidence : null
                setImgCheckConfidence(conf)
                setImgCheckMethod(typeof res?.method === 'string' ? res.method : null)

                if (imgValidStorageKey) localStorage.setItem(imgValidStorageKey, isPhone ? 'true' : 'false')

                if (isPhone) {
                  setImgCheckStatus('valid')
                } else {
                  setImgCheckStatus('invalid')
                  setImgCheckError('Phone not detected. Please upload a clear mobile/tablet photo.')
                }
              } catch (err) {
                setImgCheckStatus('error')
                const details = err?.message
                  ? err.message
                  : typeof err === 'string'
                    ? err
                    : JSON.stringify(err ?? {})
                setImgCheckError(`Image validation failed. Please try again.${details ? ` (${details})` : ''}`)
              }
            }}
          />

          <label
            htmlFor="wizard-device-image"
            style={{
              border: '2px dashed #cbd5e1',
              borderRadius: 18,
              padding: '18px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              background: answers[cur.key] ? `${ac.a}10` : '#f8fafc',
              borderColor: answers[cur.key] ? `${ac.a}80` : '#cbd5e1',
              display: 'block',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>📷</div>
            <div style={{ fontWeight: 700, fontFamily: "'Inter',sans-serif", color: '#0f172a', fontSize: 13.5 }}>
              {answers[cur.key] ? 'Change uploaded image' : 'Click to upload device image'}
            </div>
            <div style={{ fontSize: 11, marginTop: 4, color: '#64748b', fontFamily: "'Inter',sans-serif" }}>
              Make sure the entire device is visible and well-lit.
            </div>
          </label>

          {answers[cur.key] && (
            <div style={{ marginTop: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>
                Preview
              </div>
              <img
                src={answers[cur.key]}
                alt="Device preview"
                style={{ width: '100%', borderRadius: 14, border: '1px solid #e2e8f0', maxHeight: 220, objectFit: 'contain', background: '#fff' }}
              />
            </div>
          )}

          {imgCheckStatus === 'checking' && (
            <p style={{ fontSize: 11, color: '#64748b', fontFamily: "'Inter',sans-serif", marginTop: 10 }}>
              Checking if this is a real device photo…
            </p>
          )}

          {imgCheckStatus === 'valid' && (
            <p style={{ fontSize: 11, color: '#059569', fontFamily: "'Inter',sans-serif", marginTop: 10, fontWeight: 700 }}>
              Phone detected ✓
              {typeof imgCheckConfidence === 'number' && (
                <span style={{ fontWeight: 600, color: '#059569', marginLeft: 6 }}>
                  (conf: {imgCheckConfidence.toFixed(2)})
                </span>
              )}
              {imgCheckMethod && (
                <span style={{ fontWeight: 600, color: '#059569', marginLeft: 6 }}>
                  (via: {imgCheckMethod})
                </span>
              )}
            </p>
          )}

          {imgCheckStatus === 'invalid' && (
            <p style={{ fontSize: 11, color: '#b91c1c', fontFamily: "'Inter',sans-serif", marginTop: 10 }}>
              {imgCheckError || 'Phone not detected. Please try again.'}
              {typeof imgCheckConfidence === 'number' && (
                <span style={{ fontWeight: 600, color: '#b91c1c', marginLeft: 6 }}>
                  (conf: {imgCheckConfidence.toFixed(2)})
                </span>
              )}
              {imgCheckMethod && (
                <span style={{ fontWeight: 600, color: '#b91c1c', marginLeft: 6 }}>
                  (via: {imgCheckMethod})
                </span>
              )}
            </p>
          )}

          {imgCheckStatus === 'error' && (
            <div style={{ marginTop: 10, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 12px' }}>
              <p style={{ fontSize: 11, color: '#b91c1c', fontFamily: "'Inter',sans-serif", fontWeight: 700, marginBottom: 4 }}>
                ⚠️ Server Unavailable
              </p>
              <p style={{ fontSize: 10.5, color: '#b91c1c', fontFamily: "'Inter',sans-serif", lineHeight: 1.5, marginBottom: 6 }}>
                {imgCheckError || 'Image validation failed.'}
              </p>
              <p style={{ fontSize: 10.5, color: '#92400e', fontFamily: "'Inter',sans-serif", lineHeight: 1.5 }}>
                You can still continue — validation will be skipped.
              </p>
            </div>
          )}

        </div>
      ) : (
        <div key={`o${animKey}`} className="cond-fade-up"
          style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 340, overflowY: 'auto' }}>
          {cur.options.map(opt => {
            const selected = isRadio
              ? answers[cur.key] === opt.label
              : answers[cur.key].includes(opt.label)
            return (
              <OptionRow key={opt.label} opt={opt} selected={selected} isRadio={isRadio}
                accent={ac.a} setPreview={setPreview}
                onTap={label => isRadio ? handleRadio(cur.key, label) : handleCheckbox(cur.key, label)} />
            )
          })}
        </div>
      )}

      {/* next button */}
      <div style={{ padding: '8px 16px 18px' }}>
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
        <button onClick={goNext} disabled={!canProceed} style={{
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

  const ramOptions     = nav.ramOptions     || ['4GB','6GB','8GB','12GB','16GB']
  const storageOptions = nav.storageOptions || ['64GB','128GB','256GB','512GB']

  const [form, setForm]           = useState({ processor: '', ram: '', storage: '' })
  const [errs, setErrs]           = useState({})
  const [conditionDone, setConditionDone] = useState(false)
  const [conditionData, setConditionData] = useState(null)
  const [specQuery, setSpecQuery] = useState('')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const validate = () => {
    const e = {}
    if (nav.category === 'laptop' && !form.processor) e.processor = 'Select processor'
    if (!form.ram)     e.ram     = 'Select RAM'
    if (!form.storage) e.storage = 'Select storage'
    setErrs(e); return !Object.keys(e).length
  }

  const handleConditionComplete = (answers) => {
    setConditionData(normalizeConditionForPricing(nav.category, answers))
    setConditionDone(true)
  }

  const handleSubmit = () => {
    if (!validate()) return
    if (!conditionDone) {
      alert('Please complete the condition assessment first.')
      return
    }
    go('estimate', {
      deviceDetails: {
        processor: form.processor,
        ram: form.ram,
        storage: form.storage,
        ...conditionData,
      }
    })
  }

  const cc = cat?.color || '#059569'

  const specOptions = useMemo(() => {
    const combos = []
    for (const r of ramOptions) {
      for (const s of storageOptions) combos.push({ ram: r, storage: s, label: `${r} / ${s}` })
    }
    const q = specQuery.trim().toLowerCase()
    if (!q) return combos
    return combos.filter((c) => c.label.toLowerCase().includes(q))
  }, [ramOptions, storageOptions, specQuery])

  const processorOptions = useMemo(() => ([
    'Intel i3', 'Intel i5', 'Intel i7', 'Intel i9',
    'Ryzen 3', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9',
    'Apple M1', 'Apple M2', 'Apple M3',
    'Other',
  ]), [])

  return (
    <div className="max-w-[720px] mx-auto px-4 pt-8 pb-20">
      <BackButton goBack={goBack} canGoBack={canGoBack} label="Variants" />

      {/* Device summary card */}
      <motion.div
        className="rounded-2xl p-5 my-5 flex items-center gap-4"
        style={{ background: cat?.light || '#ecfdf5', border: `1.5px solid ${cc}30` }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, ease: 'easeOut' }}
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${cc}20` }}>{cat?.emoji}</div>
        <div className="min-w-0">
          <p className="text-slate-500 text-xs font-inter">Selected Device</p>
          <p className="font-poppins font-bold text-slate-800 text-lg truncate">{nav.variant}</p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs font-inter font-semibold" style={{ color: cc }}>
              {company?.name} · {cat?.name}
            </span>
            <span className="text-xs text-slate-400 font-inter">Base ₹{(nav.variantBase || 0).toLocaleString()}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.32 }}
      >
        <p className="text-slate-400 dark:text-slate-500 text-xs font-inter font-semibold uppercase tracking-widest mb-1">Device Details</p>
        <h1 className="font-poppins font-extrabold text-slate-800 dark:text-slate-100 text-2xl mb-1">Tell Us About Your Device</h1>
        <p className="text-slate-500 dark:text-slate-400 font-inter text-sm">These details determine your accurate recycle value.</p>
      </motion.div>

      {/* ── System configuration ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.36 }}
      >
      {nav.category === 'laptop' ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm mb-5 transition-colors duration-300">
          <p className="text-slate-400 dark:text-slate-500 text-xs font-inter font-semibold uppercase tracking-widest mb-4">System Configuration</p>

          <FieldLabel label="Processor" error={errs.processor} />
          <select
            value={form.processor}
            onChange={(e) => set('processor', e.target.value)}
            className="w-full mb-5 px-4 py-3.5 rounded-xl border-2 outline-none text-sm font-inter bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
            style={{ borderColor: errs.processor ? '#fca5a5' : '#e2e8f0' }}
          >
            <option value="">Select processor</option>
            {processorOptions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>

          <FieldLabel label="RAM" error={errs.ram} />
          <select
            value={form.ram}
            onChange={(e) => set('ram', e.target.value)}
            className="w-full mb-5 px-4 py-3.5 rounded-xl border-2 outline-none text-sm font-inter bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
            style={{ borderColor: errs.ram ? '#fca5a5' : '#e2e8f0' }}
          >
            <option value="">Select RAM</option>
            {ramOptions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>

          <FieldLabel label="Storage" error={errs.storage} />
          <select
            value={form.storage}
            onChange={(e) => set('storage', e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border-2 outline-none text-sm font-inter bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
            style={{ borderColor: errs.storage ? '#fca5a5' : '#e2e8f0' }}
          >
            <option value="">Select storage</option>
            {storageOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm mb-5 transition-colors duration-300">
          <FieldLabel label="RAM / Storage" error={errs.ram || errs.storage} />

          <div className="relative mb-4">
            <div
              className="flex items-center gap-2 bg-slate-50 border-2 rounded-xl px-3 py-2.5 transition-colors"
              style={{ borderColor: specQuery ? cc : '#e2e8f0' }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={specQuery ? cc : '#94a3b8'} strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
              </svg>
              <input
                value={specQuery}
                onChange={(e) => setSpecQuery(e.target.value)}
                placeholder="Search RAM / storage (e.g. 4GB, 128GB)…"
                className="flex-1 bg-transparent outline-none text-sm font-inter text-slate-800 placeholder-slate-400"
              />
              {specQuery && (
                <button
                  onClick={() => setSpecQuery('')}
                  className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 text-sm flex items-center justify-center border-none cursor-pointer hover:bg-slate-300"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {specOptions.map((opt) => {
              const selected = form.ram === opt.ram && form.storage === opt.storage
              return (
                <button
                  key={opt.label}
                  onClick={() => { set('ram', opt.ram); set('storage', opt.storage) }}
                  className="w-full text-left rounded-xl border bg-white px-4 py-3 flex items-center gap-3 transition-all"
                  style={{
                    borderColor: selected ? cc : '#e2e8f0',
                    boxShadow: selected ? `0 8px 18px ${cc}18` : 'none',
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: selected ? cc : '#e2e8f0', boxShadow: selected ? `0 0 0 4px ${cc}20` : 'none' }}
                  />
                  <span className="font-inter font-semibold text-sm text-slate-800">{opt.label}</span>
                </button>
              )
            })}
          </div>

          {specOptions.length === 0 && (
            <div className="text-center text-sm font-inter text-slate-400 py-8">
              No matching options for <strong>"{specQuery}"</strong>
            </div>
          )}
        </div>
      )}
      </motion.div>

      {/* ── Condition Wizard ── */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.36 }}
      >
        <p className="text-slate-400 text-xs font-inter font-semibold uppercase tracking-widest mb-2">Device Condition</p>

        {conditionDone ? (
          /* ── summary card after completion ── */
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: '#10b98120', border: '1px solid #10b98155' }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-poppins font-bold text-slate-800 text-sm">Condition Recorded</span>
              </div>
              <button onClick={() => setConditionDone(false)}
                className="text-xs font-inter font-semibold px-3 py-1.5 rounded-lg"
                style={{ background: `${cc}12`, color: cc, border: `1px solid ${cc}30` }}>
                Edit
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(conditionData).map(([key, val]) => {
                const step = steps.find(s => s.key === key)
                if (!step) return null
                const display = Array.isArray(val) ? (val.length ? val.join(', ') : 'None') : val || '—'
                return (
                  <div key={key} className="rounded-xl p-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <p className="text-[10px] font-inter font-semibold text-slate-400 uppercase tracking-widest mb-1">{step.title}</p>
                    <p className="text-xs font-inter font-semibold text-slate-700 leading-snug">{display}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <ConditionWizard cc={cc} steps={steps} persistKey={imagePersistKey} onComplete={handleConditionComplete} />
        )}
      </motion.div>

      {/* ── Submit ── */}
      <motion.button
        onClick={handleSubmit}
        className="w-full text-white font-poppins font-bold text-[1.05rem] py-4 rounded-2xl border-none cursor-pointer transition-all"
        style={{
          background: conditionDone ? cc : '#94a3b8',
          boxShadow: conditionDone ? `0 4px 16px ${cc}40` : 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28 }}
        whileHover={{ scale: conditionDone ? 1.02 : 1, y: conditionDone ? -2 : 0 }}
        whileTap={{ scale: conditionDone ? 0.97 : 1 }}
      >
        Get My Price Estimate →
      </motion.button>
      {!conditionDone && (
        <p className="text-center text-xs font-inter text-slate-400 mt-2">Complete the condition steps above to continue</p>
      )}
    </div>
  )
}
