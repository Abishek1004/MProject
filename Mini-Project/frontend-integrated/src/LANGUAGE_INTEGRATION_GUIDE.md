# Google Translate Integration Guide

## Overview
This document describes the production-ready Google Translate integration for EcoLoop with a custom dropdown language selector in the navbar.

## Features Implemented

### ✅ Core Features
- **Google Translate Integration**: Programmatic language switching without page reload
- **Custom Dropdown UI**: Beautiful, accessible language selector with 8 languages
- **Hidden Google Banner**: Google Translate banner and widget are completely hidden
- **Persistent Language**: Selected language is saved to localStorage and restored on page load
- **Smooth UX**: Instant language switching with loading states
- **Dark Mode Support**: Full Tailwind dark mode compatibility
- **Theme Color**: Uses #059569 (eco green) throughout
- **Accessibility**: Full ARIA labels and proper semantic HTML

### 📋 Supported Languages

| Code | Language    | Flag  |
|------|-------------|-------|
| en   | English     | 🇬🇧   |
| ta   | Tamil       | 🇮🇳   |
| hi   | Hindi       | 🇮🇳   |
| te   | Telugu      | 🇮🇳   |
| ml   | Malayalam   | 🇮🇳   |
| kn   | Kannada     | 🇮🇳   |
| fr   | French      | 🇫🇷   |
| es   | Spanish     | 🇪🇸   |

## Files Modified/Created

### 1. **LanguageSelector Component**
   - **File**: `src/components/ui/LanguageSelector.jsx`
   - **Features**:
     - Programmatic Google Translate widget initialization
     - Language change without page reload
     - Loading state indicator (spinning globe icon)
     - Accessible dropdown with ARIA labels
     - Visual feedback for selected language (checkmark)
     - Smooth dropdown animation (fadeInDown)
     - Responsive design (hides language name on mobile)

### 2. **Language Context**
   - **File**: `src/context/LanguageContext.jsx`
   - **Features**:
     - Global language state management
     - Change notification across app
     - Language metadata (name, code, flag)
     - Safe useLanguage hook with error handling

### 3. **Index HTML**
   - **File**: `index.html`
   - **Changes**:
     - Google Translate styles to hide banner/widget
     - Fallback initialization callback
     - Proper styling to prevent layout shift

### 4. **Main Entry Point**
   - **File**: `src/main.jsx`
   - **Changes**:
     - Added LanguageProvider wrapper
     - Placed as outermost provider for app-wide access

## Usage

### Basic Usage in Components

```jsx
import { useLanguage } from '../context/LanguageContext'

export default function MyComponent() {
  const { currentLanguage, changeLanguage, languages } = useLanguage()

  return (
    <div>
      <p>Current language: {currentLanguage}</p>
      <button onClick={() => changeLanguage('es')}>
        Switch to Spanish
      </button>
    </div>
  )
}
```

### LanguageContext API

```jsx
const {
  currentLanguage,      // Current language code: 'en' | 'ta' | 'hi' | etc.
  changeLanguage,       // Function to change language: (code) => void
  isChanging,           // Boolean: true while switching
  languages,            // Array of all available languages
  getLanguageInfo,      // Function to get language metadata: (code) => { name, code, flag }
} = useLanguage()
```

## How It Works

### Language Selection Flow

1. **User clicks language in dropdown**
   - Component state updates immediately
   - Loading spinner appears

2. **Language is saved to localStorage**
   - Key: `selectedLanguage`
   - Value: language code (e.g., 'ta')

3. **Google Translate widget is triggered**
   - `.goog-te-combo` select element is updated
   - Change event is dispatched
   - Translation happens asynchronously

4. **Dropdown closes, complete**
   - Loading spinner disappears
   - Page content is now in selected language

### Language Persistence

1. **First visit**: Default language is English (en)
2. **User selection**: Language code saved to localStorage
3. **Page reload**: Saved language is restored automatically
4. **Widget loads**: Google Translate initializes with saved language
5. **After 1.5 seconds**: Restoration happens to ensure widget is ready

## Google Translate Banner Hiding

The Google Translate banner is hidden via:

1. **CSS in index.html**:
   ```css
   .goog-te-banner-frame {
     display: none !important;
     visibility: hidden !important;
   }
   ```

2. **CSS in LanguageSelector.jsx**:
   ```css
   .goog-te-banner-frame {
     display: none !important;
   }
   ```

3. **Widget container**:
   - `<div id="google_translate_element" className="hidden"></div>`
   - Hidden from UI but Google Translate still initializes in it

## Customization

### Change Supported Languages

Edit `src/components/ui/LanguageSelector.jsx`:

```jsx
const LANGUAGES = [
  { code: 'en', label: '🇬🇧 English', displayName: 'English' },
  { code: 'de', label: '🇩🇪 German', displayName: 'German' },
  // Add more...
]
```

Then update `index.html`:

```html
<script>
  const supported = 'en,es,fr,de'; // Add your languages
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      includedLanguages: supported,
      autoDisplay: false,
    },
    'google_translate_element'
  )
</script>
```

### Custom Theme Color

The theme uses eco-600 (#059569). To change:

1. In Tailwind config (if applicable)
2. Update SVG stroke colors:
   ```jsx
   stroke="#059569" // Change this hex
   ```

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

1. **Google Translate script** loads asynchronously
2. **No page reload** required for language changes
3. **Lazy initialization** - script loads only when needed
4. **Local storage** prevents repeated initialization
5. **1.5s delay** before restoration ensures widget readiness

## Known Limitations

1. Google Translate API is external - depends on internet connectivity
2. Translation quality varies by language pair
3. Some UI text may not translate (hardcoded React content)
4. First translation may take 1-2 seconds

## Troubleshooting

### Language not changing?
- Check browser console for errors
- Ensure Google Translate script loaded: `window.google.translate` exists
- Check localStorage: `localStorage.getItem('selectedLanguage')`

### Banner still showing?
- Clear browser cache
- Verify CSS rules are in index.html
- Check for browser extensions affecting page

### Text not translating?
- Some content is in React, Google Translate only works on DOM text
- For API responses, implement backend translation
- Static text in components won't auto-translate

## Future Enhancements

1. Backend language preference storage
2. API response translation
3. Language-specific content routing
4. RTL language support (Arabic, Hebrew)
5. Custom translation memory for consistency
6. Language detection based on browser locale

## Testing

Test the language selector:

```jsx
// In browser console:
localStorage.getItem('selectedLanguage')        // Check saved language
document.querySelector('.goog-te-combo').value  // Check Google widget language
window.google.translate                         // Check API loaded
```

## Support

For issues or questions:
1. Check browser console for errors
2. Verify Google Translate loads: https://translate.google.com/translate_a/element.js
3. Test in incognito/private mode (bypasses cache issues)
4. Check network tab for failed requests
