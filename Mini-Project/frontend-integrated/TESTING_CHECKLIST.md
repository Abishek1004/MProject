# Google Translate Integration - Testing Checklist

Use this checklist to verify all features are working correctly.

## ✅ Pre-Deployment Testing

### Basic Functionality

- [ ] **Language Selector Visible**
  - [ ] Globe icon appears in navbar (top right area)
  - [ ] Icon is eco-green (#059569)
  - [ ] Icon is interactive (clickable)

- [ ] **Dropdown Opens/Closes**
  - [ ] Click globe opens language dropdown
  - [ ] Dropdown appears below icon
  - [ ] Click outside closes dropdown
  - [ ] Arrow rotates 180° when open
  - [ ] Smooth animation on open/close

- [ ] **Language List Displays**
  - [ ] All 8 languages visible: English, Tamil, Hindi, Telugu, Malayalam, Kannada, French, Spanish
  - [ ] Each language shows flag emoji
  - [ ] Selected language is highlighted in eco-green
  - [ ] Checkmark visible on selected language
  - [ ] Hover effect on non-selected languages

### Language Switching

- [ ] **English to Tamil**
  - [ ] Click Tamil option
  - [ ] Loading spinner appears on globe
  - [ ] Page content translates (takes 1-2 seconds)
  - [ ] Dropdown closes automatically
  - [ ] Spinner disappears when done

- [ ] **Tamil to Hindi**
  - [ ] Language changes correctly
  - [ ] Content retranslates to Hindi
  - [ ] Checkmark moves to Hindi

- [ ] **Round-trip Translation**
  - [ ] English → Spanish → French → English
  - [ ] Each transition works smoothly
  - [ ] No page reload occurs

- [ ] **Quick Switch Test**
  - [ ] Rapidly click different languages
  - [ ] App handles it without crashing
  - [ ] Only latest selection applies

### Language Persistence

- [ ] **localStorage Saving**
  - [ ] Open DevTools (F12)
  - [ ] Go to Application → localStorage
  - [ ] Select language and verify entry: `selectedLanguage: "ta"` (or your selection)

- [ ] **Page Reload Persistence**
  - [ ] Select Tamil
  - [ ] Refresh page (F5)
  - [ ] Language remains Tamil
  - [ ] NO page reload during translation

- [ ] **Browser Close Persistence**
  - [ ] Select Spanish
  - [ ] Close browser completely
  - [ ] Reopen to same URL
  - [ ] Spanish is still selected

- [ ] **Second Visit Persistence**
  - [ ] Select Hindi
  - [ ] Close tab
  - [ ] Open same website in new tab
  - [ ] Hindi is selected

### Google Translate Integration

- [ ] **Widget Initialization**
  - [ ] Open DevTools Console
  - [ ] Type: `window.google.translate`
  - [ ] Should return object (API loaded)

- [ ] **Element Exists**
  - [ ] In DevTools Console:
  - [ ] Type: `document.querySelector('.goog-te-combo')`
  - [ ] Should return select element (not null)

- [ ] **Hidden Banner**
  - [ ] No Google Translate banner appears at top of page
  - [ ] No floating translate button visible
  - [ ] No layout shift from Google elements

- [ ] **Hidden Widget**
  - [ ] No dropdown labeled "Google Translate" visible
  - [ ] Page layout unchanged from integration

### Dark Mode Compatibility

- [ ] **Light Mode Appearance**
  - [ ] Navbar background: white/light
  - [ ] Language button: light gray background
  - [ ] Language button border: light gray
  - [ ] Text: dark gray

- [ ] **Dark Mode Appearance**
  - [ ] Toggle dark mode
  - [ ] Navbar background: dark slate
  - [ ] Language button: dark slate background
  - [ ] Language button border: darker slate
  - [ ] Text: light gray/white
  - [ ] Dropdown background: dark slate
  - [ ] Proper contrast maintained

- [ ] **Dark Mode Switching While Dropdown Open**
  - [ ] Open language dropdown
  - [ ] Toggle dark mode
  - [ ] Colors adjust correctly
  - [ ] Dropdown remains functional

### Mobile Responsiveness

- [ ] **Mobile View (<768px)**
  - [ ] Open in mobile browser or resize to <768px
  - [ ] Globe icon visible
  - [ ] Language name text hidden (saves space)
  - [ ] Dropdown still accessible
  - [ ] Touch-friendly button size
  - [ ] Dropdown positions correctly

- [ ] **Tablet View (768px-1024px)**
  - [ ] Resize browser to tablet size
  - [ ] Globe icon visible
  - [ ] Language name visible
  - [ ] Dropdown accessible and positioned correctly

- [ ] **Desktop View (>1024px)**
  - [ ] Full button with icon, language name, and arrow
  - [ ] Dropdown properly positioned
  - [ ] All features visible

### Accessibility

- [ ] **Keyboard Navigation**
  - [ ] Tab to language selector button
  - [ ] Press Enter to open dropdown
  - [ ] Arrow keys navigate languages (if implemented)
  - [ ] Escape key to close

- [ ] **Screen Reader (use browser's built-in reader)**
  - [ ] Reads "Select language" label
  - [ ] Reads current language name
  - [ ] Reads all language options
  - [ ] Reads "active" or selected state

- [ ] **ARIA Labels Present**
  - [ ] Button has `aria-label="Select language"`
  - [ ] Button has `aria-haspopup="listbox"`
  - [ ] Button has `aria-expanded={open}`
  - [ ] Options have `role="option"`
  - [ ] Container has `role="listbox"`

### Context Integration

- [ ] **Global Language State**
  - [ ] In DevTools Console:
  - [ ] Navigate to a page
  - [ ] Type: `localStorage.getItem('selectedLanguage')`
  - [ ] Check current value matches selection

- [ ] **Multiple Component Support**
  - [ ] If you have multiple pages/components using `useLanguage()`
  - [ ] Change language on one page
  - [ ] Navigate to another page
  - [ ] Language is still applied globally

### Error Handling

- [ ] **Offline Translation Attempt**
  - [ ] Disconnect internet
  - [ ] Try to change language
  - [ ] App doesn't crash
  - [ ] Graceful error handling (if any)

- [ ] **Rapid Clicking Prevention**
  - [ ] Rapidly click multiple languages
  - [ ] Only one translation occurs
  - [ ] `isChanging` state prevents conflicts

- [ ] **Invalid Language Code**
  - [ ] In console, try: `localStorage.setItem('selectedLanguage', 'xx')`
  - [ ] Reload page
  - [ ] Falls back to English
  - [ ] No errors in console

### Styling & Theme

- [ ] **Theme Color Application**
  - [ ] Globe icon stroke: #059569 (eco-green)
  - [ ] Hover state border: eco-400 (lighter green)
  - [ ] Hover state background: eco-50 (very light green)
  - [ ] Selected language: eco-600 background, eco-700 text
  - [ ] Dark mode variants applied

- [ ] **Icon Animations**
  - [ ] Globe rotates when loading
  - [ ] Arrow rotates 180° on open/close (smooth 0.2s)
  - [ ] Dropdowns fade in smoothly

- [ ] **Disabled State During Translation**
  - [ ] During translation, button should appear slightly faded
  - [ ] Click is disabled (no multiple triggers)
  - [ ] Visual feedback that something is happening

### Performance

- [ ] **Script Load Time**
  - [ ] Open DevTools Network tab
  - [ ] Reload page
  - [ ] Google Translate script loads asynchronously
  - [ ] Doesn't block page rendering
  - [ ] Page is interactive before translation script loads

- [ ] **Translation Speed**
  - [ ] First language change: 1-2 seconds (normal)
  - [ ] Subsequent changes within same session: faster (cached)
  - [ ] No lag in UI (dropdown closes immediately)
  - [ ] Translation happens in background

- [ ] **Memory Usage**
  - [ ] Open DevTools Performance/Memory
  - [ ] Monitor while switching languages
  - [ ] No significant memory leaks
  - [ ] Smooth performance after multiple switches

### Browser Compatibility

- [ ] **Chrome/Edge 90+**
  - [ ] All features working
  - [ ] No console errors
  - [ ] Translation working

- [ ] **Firefox 88+**
  - [ ] All features working
  - [ ] No console errors
  - [ ] Translation working

- [ ] **Safari 14+**
  - [ ] All features working
  - [ ] No console errors
  - [ ] Translation working

- [ ] **Mobile Chrome**
  - [ ] Language selector visible
  - [ ] Touch interactions work
  - [ ] Translation works

- [ ] **Mobile Safari**
  - [ ] Language selector visible
  - [ ] Touch interactions work
  - [ ] Translation works

## 🧪 Advanced Testing

### Development Console Testing

```javascript
// Test 1: Check language context
localStorage.getItem('selectedLanguage')  // Should show current language

// Test 2: Check Google Translate API
window.google.translate  // Should return object with TranslateElement

// Test 3: Get widget dropdown
document.querySelector('.goog-te-combo')  // Should return select element

// Test 4: Check current translation language
document.querySelector('.goog-te-combo').value  // Should return language code

// Test 5: Get all supported languages
const selector = document.querySelector('.goog-te-combo')
Array.from(selector.options).map(opt => opt.value)  // Show all supported codes

// Test 6: Debug info
import { getLanguageDebugInfo } from './utils/languageHelpers'
console.log(getLanguageDebugInfo())  // Comprehensive debug output

// Test 7: Manual language change
const select = document.querySelector('.goog-te-combo')
select.value = 'es'  // Change to Spanish
select.dispatchEvent(new Event('change', { bubbles: true }))
```

### Network Testing

In DevTools Network tab:

- [ ] **Google Translate Script**
  - [ ] URL: `https://translate.google.com/translate_a/element.js`
  - [ ] Status: 200 (successful)
  - [ ] Type: script
  - [ ] Size: ~50KB
  - [ ] Loaded asynchronously

- [ ] **Translation Requests**
  - [ ] When language changes, look for POST requests to Google
  - [ ] Verify translation API endpoint is called
  - [ ] Check response contains translated text

### Console Error Testing

- [ ] **No JavaScript Errors**
  - [ ] Open DevTools Console (F12)
  - [ ] Use app normally
  - [ ] No red error messages
  - [ ] No warnings about undefined items

- [ ] **No Network Errors**
  - [ ] Google Translate endpoint responds 200
  - [ ] No 404 or 500 errors
  - [ ] No CORS errors

- [ ] **No Memory Leaks**
  - [ ] DevTools Memory tab
  - [ ] Take heap snapshot
  - [ ] Switch languages 10 times
  - [ ] Take another snapshot
  - [ ] Compare - should be similar or slightly lower

## 📋 User Acceptance Testing

- [ ] **First-time User**
  - [ ] New user finds language selector easily
  - [ ] Understands it's for language change
  - [ ] Completes language switch successfully
  - [ ] Understands language was saved

- [ ] **Returning User**
  - [ ] Language selection is remembered
  - [ ] No need to re-select language
  - [ ] Seamless experience

- [ ] **Language Learner**
  - [ ] Can learn by reading in different languages
  - [ ] Translation quality is acceptable
  - [ ] Easy to switch between languages for comparison

- [ ] **Accessibility User**
  - [ ] Can operate with keyboard only
  - [ ] Screen reader provides adequate information
  - [ ] No accessibility barriers found

## 🎯 Final Checklist

Before marking as complete:

- [ ] All 8 languages tested
- [ ] Light and dark modes tested
- [ ] Mobile, tablet, and desktop tested
- [ ] At least 2 browsers tested
- [ ] localStorage persistence works
- [ ] Google banner is hidden
- [ ] Performance is acceptable
- [ ] No console errors
- [ ] Accessibility requirements met
- [ ] Documentation is clear

## 🚀 Sign-Off

| Item | Status | Date | Notes |
|------|--------|------|-------|
| Functionality Testing | ✅ / ❌ | | |
| Browser Compatibility | ✅ / ❌ | | |
| Mobile Responsiveness | ✅ / ❌ | | |
| Accessibility | ✅ / ❌ | | |
| Performance | ✅ / ❌ | | |
| Error Handling | ✅ / ❌ | | |
| Documentation | ✅ / ❌ | | |
| **READY FOR PRODUCTION** | ✅ / ❌ | | |

---

**Test Date**: ________________
**Tested By**: ________________
**Sign-Off**: ________________
