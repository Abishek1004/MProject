import { useState, useRef, useEffect } from 'react'

// ── Rule-based responses ─────────────────────────────────────────────────────
const BOT_RESPONSES = [
  {
    patterns: ['what is', 'about', 'ecoloop', 'ecorecycle', 'this app', 'this website', 'this platform'],
    response: '♻️ EcoLoop is an e-waste recycling platform where you can sell your old mobiles, laptops, and tablets. We give you instant price quotes, arrange free pickup, and ensure certified eco-friendly recycling!',
  },
  {
    patterns: ['how to use', 'how does', 'get started', 'how it works', 'steps', 'process'],
    response: '🚀 It\'s easy! (1) Browse or search for your device category. (2) Select your brand, model, and variant. (3) Answer a few condition questions. (4) Get an instant price estimate. (5) Add it to cart, sign up, and we\'ll arrange free pickup!',
  },
  {
    patterns: ['contact', 'support', 'help', 'email', 'phone', 'reach', 'talk'],
    response: '📞 You can reach our support team at:\n📧 support@ecoloop.in\n📱 +91-9876543210\n⏰ Mon–Sat, 9 AM – 6 PM IST\nWe\'re happy to help!',
  },
  {
    patterns: ['price', 'estimate', 'value', 'worth', 'cost', 'quote', 'money', 'pay'],
    response: '💰 To get a price estimate, navigate to your device category (Mobile, Laptop, or Tablet), select your brand and model, choose the variant, then answer simple condition questions. You\'ll get an instant quote!',
  },
  {
    patterns: ['device', 'mobile', 'phone', 'laptop', 'tablet', 'category', 'brand', 'model'],
    response: '📱 We currently support:\n• 📱 Mobile Phones (all major brands)\n• 💻 Laptops\n• 📊 Tablets\nMore categories coming soon! Use the nav bar or Search to find your device.',
  },
  {
    patterns: ['recycle', 'environment', 'green', 'eco', 'sustainable', 'safe'],
    response: '🌱 We partner with certified e-waste recyclers to ensure your devices are disposed of safely and sustainably — no landfills! Every device recycled through us helps reduce e-waste.',
  },
  {
    patterns: ['pickup', 'collect', 'deliver', 'shipping', 'courier', 'collect'],
    response: '🚚 We offer FREE doorstep pickup! Once you confirm your order, our team will schedule a convenient pickup time. No need to visit any store.',
  },
  {
    patterns: ['account', 'sign in', 'sign up', 'login', 'register', 'profile'],
    response: '👤 Click "Sign In" in the top-right of the navbar to login or create an account. An account lets you track your items, manage your cart, and confirm pickups.',
  },
  {
    patterns: ['cart', 'order', 'checkout', 'added'],
    response: '🛒 Once you get a price estimate you like, click "Add to Cart". Then sign in (if not already) to confirm your order and schedule a free pickup!',
  },
  {
    patterns: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    response: '👋 Hello! I\'m EcoBot, your EcoLoop assistant. Ask me anything about this app, how to use it, or our recycling process!',
  },
  {
    patterns: ['thanks', 'thank you', 'great', 'awesome', 'nice', 'good', 'ok'],
    response: '😊 You\'re welcome! Is there anything else I can help you with?',
  },
  {
    patterns: ['bye', 'goodbye', 'see you', 'exit'],
    response: '👋 Goodbye! Happy recycling! 🌱',
  },
]

const FALLBACK = "🤔 I'm not sure about that. You can ask me about:\n• What this app does\n• How to use EcoLoop\n• Price estimates\n• Our recycling process\n• Contact & support"

const QUICK_REPLIES = [
  { label: '🌿 What is this app?', query: 'what is this app' },
  { label: '🚀 How to use?', query: 'how to use' },
  { label: '💰 Get price estimate', query: 'price estimate' },
  { label: '📞 Contact support', query: 'contact support' },
]

function getBotResponse(input) {
  const lower = input.toLowerCase()
  for (const item of BOT_RESPONSES) {
    if (item.patterns.some(p => lower.includes(p))) return item.response
  }
  return FALLBACK
}

// ── Component ────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "👋 Hi! I'm **EcoBot**, your EcoLoop assistant!\n\nHow can I help you today? You can type a question or use the quick replies below." }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    setMessages(prev => [...prev, { from: 'user', text: trimmed }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { from: 'bot', text: getBotResponse(trimmed) }])
    }, 800)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const formatText = (text) =>
    text.split('\n').map((line, i) => (
      <span key={i}>
        {line.replace(/\*\*(.*?)\*\*/g, (_, b) => `<strong>${b}</strong>`).split(/(<strong>.*?<\/strong>)/g).map((chunk, j) =>
          chunk.startsWith('<strong>') ? <strong key={j}>{chunk.replace(/<\/?strong>/g, '')}</strong> : chunk
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ))

  return (
    <>
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes chatSlideDown {
          from { opacity: 1; transform: translateY(0)   scale(1); }
          to   { opacity: 0; transform: translateY(24px) scale(0.96); }
        }
        @keyframes botPulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        @keyframes typingBounce {
          0%,80%,100% { transform: scale(0); }
          40%          { transform: scale(1); }
        }
        .chat-open  { animation: chatSlideUp 0.28s cubic-bezier(.22,.68,0,1.2) forwards; }
        .typing-dot { animation: typingBounce 1.2s infinite ease-in-out; display: inline-block; width:7px; height:7px; border-radius:50%; background:#059569; margin:0 2px; }
        .typing-dot:nth-child(2) { animation-delay:0.2s; }
        .typing-dot:nth-child(3) { animation-delay:0.4s; }
      `}</style>

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Open chatbot"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full border-none cursor-pointer flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #059569, #014f3a)',
          boxShadow: '0 8px 32px #05956950',
          animation: 'botPulse 3s ease-in-out infinite',
        }}
      >
        {open ? (
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {/* Notification dot */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="chat-open fixed bottom-24 right-6 z-50 flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          style={{
            width: 'min(360px, calc(100vw - 24px))',
            height: '500px',
            maxHeight: 'calc(100vh - 120px)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #059569, #014f3a)' }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-lg">
              🤖
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-white font-poppins">EcoBot</p>
              <p className="text-[11px] text-green-200 font-inter flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block" />
                Always here to help
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 border-none cursor-pointer flex items-center justify-center transition-colors"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-slate-50 dark:bg-slate-900">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {msg.from === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-eco-600 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">🤖</div>
                )}
                {/* Bubble */}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm font-inter leading-relaxed
                    ${msg.from === 'user'
                      ? 'bg-eco-600 text-white rounded-tr-md'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-md shadow-sm border border-slate-100 dark:border-slate-700'
                    }`}
                  style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}
                >
                  {formatText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-eco-600 flex items-center justify-center text-sm flex-shrink-0">🤖</div>
                <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-md shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-1">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-1.5 flex-wrap">
              {QUICK_REPLIES.map((qr, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(qr.query)}
                  className="text-xs font-inter font-medium px-2.5 py-1.5 rounded-full border border-eco-300 dark:border-eco-700 text-eco-700 dark:text-eco-400 bg-eco-50 dark:bg-eco-900/30 hover:bg-eco-100 dark:hover:bg-eco-900/50 cursor-pointer transition-colors border-none"
                  style={{ border: '1px solid #6ee7b7' }}
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              className="flex-1 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-inter text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-eco-400 transition-colors"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center border-none cursor-pointer transition-all duration-150 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #059569, #014f3a)' }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
