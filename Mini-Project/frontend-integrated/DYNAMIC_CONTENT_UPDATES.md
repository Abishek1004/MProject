# Dynamic Content Updates - Language Change Guide

## Overview

This guide explains how to make your website content update dynamically when users select a different language. The Google Translate integration will automatically translate DOM text, but you may want custom behavior for API responses, dynamic content, or specific components.

---

## ✅ Automatic Updates (No Code Needed)

Google Translate automatically translates:
- ✅ Static text in HTML/JSX
- ✅ Text nodes in the DOM
- ✅ Attributes (title, alt, placeholder)
- ✅ Form labels

**Example - This updates automatically:**
```jsx
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to EcoLoop</h1>
      <p>Sell your old devices for cash</p>
      <button>Get Quote</button>
    </div>
  )
}
```

When you select Tamil, these strings are automatically translated.

---

## 🔧 Custom Updates (With Code)

For dynamic content, API responses, or conditional rendering, use these hooks:

### 1. **useLanguageChange** - Detect When Language Changes

**File**: `src/hooks/useLanguageChange.js`

```jsx
import { useLanguageChange } from '@/hooks/useLanguageChange'

export default function MyComponent() {
  const { language, hasChanged, isUpdating } = useLanguageChange()

  useEffect(() => {
    if (hasChanged) {
      // Fetch new content when language changes
      fetchContentForLanguage(language)
    }
  }, [language, hasChanged])

  return (
    <div>
      {isUpdating && <Spinner />}
      <Content key={language} />
    </div>
  )
}
```

**Return Values:**
```jsx
{
  language,           // Current language code: 'en', 'ta', 'hi', etc.
  previousLanguage,   // Previous language code
  hasChanged,         // True when language just changed
  isUpdating,         // True during update process
  isChanging,         // True while Google Translate is translating
  languageChangeKey,  // Key for forcing re-renders
}
```

### 2. **useOnLanguageChange** - Subscribe to Changes

```jsx
import { useOnLanguageChange } from '@/hooks/useLanguageChange'

export default function NotificationBar() {
  useOnLanguageChange((newLang) => {
    console.log(`Language changed to ${newLang}`)
    // Update something specific
    updateNotification(newLang)
  })

  return <div>Notification Bar</div>
}
```

### 3. **useLanguageWithStatus** - Get Translation Status

```jsx
import { useLanguageWithStatus } from '@/hooks/useLanguageChange'

export default function LoadingIndicator() {
  const { language, isTranslating, isTranslated } = useLanguageWithStatus()

  return (
    <div>
      {isTranslating && <div>Translating...</div>}
      {isTranslated && <div>Translation complete</div>}
      <p>Language: {language}</p>
    </div>
  )
}
```

### 4. **useTranslationReady** - Wait for Translation

```jsx
import { useTranslationReady } from '@/hooks/useLanguageChange'

export default function ContentPage() {
  const isReady = useTranslationReady(1500) // Wait 1.5s for translation

  if (!isReady) {
    return <LoadingPlaceholder />
  }

  return <ActualContent />
}
```

---

## 📝 Common Patterns

### Pattern 1: Fetch Content From API

```jsx
import { useLanguageChange } from '@/hooks/useLanguageChange'

export default function ProductList() {
  const { language, hasChanged } = useLanguageChange()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    
    // Fetch products in selected language
    fetch(`/api/products?lang=${language}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [language, hasChanged])

  return (
    <div>
      {loading && <LoadingSpinner />}
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Pattern 2: Multi-Language Static Content

```jsx
import { useLanguage } from '@/context/LanguageContext'

const CONTENT = {
  en: {
    title: 'Sell Your Devices',
    description: 'Get instant quotes for your old gadgets',
  },
  ta: {
    title: 'உங்கள் சாதனங்களை விற்கவும்',
    description: 'உங்கள் பழைய கேஜெட்களுக்கு உடனடி மேற்கோள் பெறவும்',
  },
  hi: {
    title: 'अपने डिवाइस बेचें',
    description: 'अपने पुराने गैजेट्स के लिए तत्काल कोट्स प्राप्त करें',
  },
  // ... more languages
}

export default function Hero() {
  const { currentLanguage } = useLanguage()
  const content = CONTENT[currentLanguage] || CONTENT.en

  return (
    <section>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </section>
  )
}
```

### Pattern 3: Conditional Rendering by Language

```jsx
import { useLanguage } from '@/context/LanguageContext'

export default function Pricing() {
  const { currentLanguage } = useLanguage()

  return (
    <div>
      {['ta', 'hi', 'te', 'ml', 'kn'].includes(currentLanguage) ? (
        <PricingINR />  // Indian languages - show in INR
      ) : (
        <PricingUSD />  // Other languages - show in USD
      )}
    </div>
  )
}
```

### Pattern 4: Re-render When Language Changes

```jsx
import { useLanguageChange } from '@/hooks/useLanguageChange'

export default function CategoryGrid() {
  const { languageChangeKey } = useLanguageChange()
  
  // Force complete re-render on language change
  return <div key={languageChangeKey}>
    <Category1 />
    <Category2 />
    <Category3 />
  </div>
}
```

### Pattern 5: Delay Content Show Until Translation Complete

```jsx
import { useTranslationReady } from '@/hooks/useLanguageChange'

export default function MainContent() {
  const isReady = useTranslationReady(1500)

  return (
    <div>
      {!isReady ? (
        <SkeletonLoader />
      ) : (
        <ActualContent />
      )}
    </div>
  )
}
```

---

## 🎯 Use Cases

### Use Case 1: Update Page Title on Language Change

```jsx
import { useLanguageChange } from '@/hooks/useLanguageChange'

export default function Page() {
  const { language } = useLanguageChange()

  useEffect(() => {
    const titles = {
      en: 'Welcome - EcoLoop',
      ta: 'வரவேற்கிறோம் - EcoLoop',
      hi: 'स्वागत है - EcoLoop',
      // ...
    }
    document.title = titles[language]
  }, [language])

  return <div>Page content</div>
}
```

### Use Case 2: Update Meta Description

```jsx
import { useLanguageChange } from '@/hooks/useLanguageChange'

export default function Page() {
  const { language } = useLanguageChange()

  useEffect(() => {
    const descriptions = {
      en: 'Sell your old devices for cash',
      ta: 'உங்கள் பழைய சாதனங்களை பணத்திற்கு விற்கவும்',
      hi: 'आपने पुराने डिवाइस को नकद के लिए बेचें',
      // ...
    }
    
    let metaTag = document.querySelector('meta[name="description"]')
    if (!metaTag) {
      metaTag = document.createElement('meta')
      metaTag.name = 'description'
      document.head.appendChild(metaTag)
    }
    metaTag.content = descriptions[language]
  }, [language])

  return <div>Page content</div>
}
```

### Use Case 3: Currency-Specific Pricing

```jsx
import { useLanguageChange } from '@/hooks/useLanguageChange'

export default function PriceDisplay({ basePrice }) {
  const { language } = useLanguageChange()

  const getPriceInfo = () => {
    if (['ta', 'hi', 'te', 'ml', 'kn'].includes(language)) {
      return {
        currency: '₹',
        value: Math.round(basePrice * 83), // Example conversion
        symbol: 'INR',
      }
    }
    return {
      currency: '$',
      value: basePrice.toFixed(2),
      symbol: 'USD',
    }
  }

  const priceInfo = getPriceInfo()

  return (
    <div className="price">
      {priceInfo.currency} {priceInfo.value} {priceInfo.symbol}
    </div>
  )
}
```

### Use Case 4: Notification Messages

```jsx
import { useOnLanguageChange } from '@/hooks/useLanguageChange'

export default function NotificationManager() {
  useOnLanguageChange((newLang) => {
    const messages = {
      en: 'Language changed to English',
      ta: 'மொழி தமிழ்க்கு மாற்றப்பட்டது',
      hi: 'भाषा हिंदी में बदल दी गई है',
      // ...
    }
    
    showNotification(messages[newLang])
  })

  return null
}
```

---

## 🔄 Flow Diagram

```
User selects language
        ↓
LanguageSelector dispatches change
        ↓
LanguageContext updates state
        ↓
useLanguageChange hook detects change
        ↓
Components using hook re-render
        ↓
useEffect runs with new language dependency
        ↓
Fetch new content or trigger updates
        ↓
Google Translate translates DOM
        ↓
Page displays in new language
```

---

## 📋 Best Practices

### ✅ DO

```jsx
// ✅ Use hooks to detect language changes
const { language, hasChanged } = useLanguageChange()

// ✅ Use language in useEffect dependencies
useEffect(() => {
  updateContent(language)
}, [language])

// ✅ Wait for translation to complete
const isReady = useTranslationReady(1500)

// ✅ Show loading state during translation
{isUpdating && <LoadingSpinner />}
```

### ❌ DON'T

```jsx
// ❌ Don't ignore language changes
const content = getContentForLanguage(currentLanguage)  // Won't update

// ❌ Don't fetch immediately on language selection
// Wait for translation to start
const { language } = useLanguage()
fetch(`/api/content?lang=${language}`)  // Too fast

// ❌ Don't hide loading indicators
// Users need feedback that translation is happening
return <Content />  // No feedback
```

---

## 🧪 Testing Language Changes

### Manual Testing

```javascript
// In browser console:

// Test 1: Check current language
localStorage.getItem('selectedLanguage')

// Test 2: Change language programmatically
import { useLanguage } from '@/context/LanguageContext'
changeLanguage('ta')

// Test 3: Monitor updates
window.addEventListener('eco:languageChanged', (e) => {
  console.log('Language changed to:', e.detail.language)
})

// Test 4: Check translation status
document.documentElement.className
```

---

## 🐛 Troubleshooting

### Issue: Content not updating after language change

**Solution 1**: Add language to useEffect dependency
```jsx
// ❌ Wrong
useEffect(() => {
  fetchContent()
}, [])

// ✅ Correct
useEffect(() => {
  fetchContent()
}, [language])
```

**Solution 2**: Use useLanguageChange hook
```jsx
const { language, hasChanged } = useLanguageChange()

useEffect(() => {
  if (hasChanged) {
    fetchContent()
  }
}, [language, hasChanged])
```

### Issue: Translation happening too slowly

**Solution**: Ensure Google Translate is loaded
```jsx
import { waitForGoogleTranslate } from '@/utils/languageHelpers'

useEffect(() => {
  waitForGoogleTranslate().then(() => {
    console.log('Google Translate ready')
  })
}, [])
```

### Issue: Multiple updates happening

**Solution**: Use key prop to force single re-render
```jsx
const { languageChangeKey } = useLanguageChange()
return <Content key={languageChangeKey} />
```

---

## 📚 Example Components

### Example 1: Full Page Update

```jsx
import { useLanguageChange } from '@/hooks/useLanguageChange'

export default function HomePage() {
  const { language, hasChanged, isUpdating } = useLanguageChange()
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(null) // Clear old data
    
    // Simulate API call
    setTimeout(() => {
      setData({
        title: `Content in ${language}`,
        description: `Description for ${language}`,
      })
    }, 1000)
  }, [language, hasChanged])

  return (
    <div>
      {isUpdating ? (
        <div>Loading translated content...</div>
      ) : (
        <div>
          <h1>{data?.title}</h1>
          <p>{data?.description}</p>
        </div>
      )}
    </div>
  )
}
```

### Example 2: Specific Component Update

```jsx
import { useOnLanguageChange } from '@/hooks/useLanguageChange'

export default function SearchBar() {
  const [placeholder, setPlaceholder] = useState('Search...')

  useOnLanguageChange((lang) => {
    const placeholders = {
      en: 'Search devices...',
      ta: 'சாதனங்களைத் தேடுக...',
      hi: 'डिवाइस खोजें...',
      // ...
    }
    setPlaceholder(placeholders[lang])
  })

  return (
    <input
      type="text"
      placeholder={placeholder}
    />
  )
}
```

### Example 3: Lazy Load Translations

```jsx
import { useLanguageWithStatus } from '@/hooks/useLanguageChange'

export default function ProfilePage() {
  const { language, isTranslating, isTranslated } = useLanguageWithStatus()
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    if (isTranslated) {
      // Only load after translation is done
      loadProfile(language)
    }
  }, [language, isTranslated])

  return (
    <div>
      {isTranslating && <SkeletonLoader />}
      {profileData && <Profile data={profileData} />}
    </div>
  )
}
```

---

## 🎓 Summary

| Scenario | Hook/Tool | Example |
|----------|-----------|---------|
| Detect language change | `useLanguageChange` | `const { hasChanged } = useLanguageChange()` |
| Update on language change | `useEffect` + dependency | `useEffect(() => {...}, [language])` |
| Monitor translation status | `useLanguageWithStatus` | `const { isTranslating } = useLanguageWithStatus()` |
| Wait for translation done | `useTranslationReady` | `const isReady = useTranslationReady()` |
| Static multi-language content | Context | `const { currentLanguage } = useLanguage()` |
| Subscribe to changes | `useOnLanguageChange` | `useOnLanguageChange((lang) => {...})` |

---

## 🚀 Next Steps

1. Use `useLanguageChange` in your components
2. Add `hasChanged` to dependency arrays
3. Fetch fresh content when language changes
4. Test with different languages
5. Monitor console for language change events

Your app is now ready for truly dynamic, multilingual experiences! 🌍
