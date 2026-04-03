# Language Selector - Styling Guide & Customization

Complete reference for styling, colors, animations, and customization options.

## 🎨 Color Palette

### Primary Colors

| Usage | Color | Hex | Tailwind Class | Location |
|-------|-------|-----|---------------|----|
| Theme | Eco Green | #059569 | eco-600 | Various |
| Theme Light | Eco Light | #e0f8f4 | eco-50 | Hover states |
| Theme Dark | Eco Dark | #043d2d | eco-900 | Dark mode |
| Accent | Eco 400 | varies | eco-400 | Borders |

### Neutral Colors (Tailwind Slate)

| Usage | Color | Hex | Tailwind Class |
|-------|-------|-----|-----------------|
| Text Light | #64748b | slate-500 | text-slate-500 |
| Text Medium | #475569 | slate-600 | text-slate-600 |
| Text Dark | #1e293b | slate-800 | text-slate-800 |
| BG Light | #f1f5f9 | slate-100 | bg-slate-100 |
| BG Medium | #e2e8f0 | slate-200 | bg-slate-200 |
| Border | #cbd5e1 | slate-300 | border-slate-300 |
| Dark BG | #1e293b | slate-900 | dark:bg-slate-900 |
| Dark Text | #e2e8f0 | slate-200 | dark:text-slate-200 |

## 🔧 Component Styling Breakdown

### Language Selector Button

**File**: `src/components/ui/LanguageSelector.jsx` (Line 79-98)

```jsx
className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 
           dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer 
           transition-all duration-200 hover:border-eco-400 hover:bg-eco-50 
           dark:hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed"
```

**Breakdown**:
- `flex items-center gap-1.5` - Flexbox layout with gaps
- `px-2.5 py-2` - Padding (10px horizontal, 8px vertical)
- `rounded-xl` - Border radius (12px)
- `border border-slate-200` - Light gray border
- `bg-slate-50` - Very light gray background
- `hover:border-eco-400` - Green border on hover
- `hover:bg-eco-50` - Light green background on hover
- `dark:border-slate-700` - Dark mode border
- `dark:bg-slate-800` - Dark mode background
- `dark:hover:bg-slate-700` - Dark mode hover
- `transition-all duration-200` - 200ms smooth transition
- `disabled:opacity-60` - Faded when loading

### Globe Icon

**File**: `src/components/ui/LanguageSelector.jsx` (Line 100-108)

```jsx
<svg
  width="16"
  height="16"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#059569"          // Eco green color
  strokeWidth="2"
  className={isLoading ? 'animate-spin' : ''}  // Spin when loading
>
```

**Styling**:
- `stroke="#059569"` - Eco green (#059569)
- `animate-spin` - Spins when `isLoading` true
- `strokeWidth="2"` - Line thickness

### Language Text Display

**File**: `src/components/ui/LanguageSelector.jsx` (Line 110-114)

```jsx
<span className="text-xs font-semibold font-inter text-slate-600 
                 dark:text-slate-300 hidden sm:block">
```

**Styling**:
- `text-xs` - 12px font size
- `font-semibold` - Font weight 600
- `font-inter` - Inter typeface
- `text-slate-600` - Dark gray text
- `dark:text-slate-300` - Light gray text in dark mode
- `hidden sm:block` - Hidden on mobile, visible on tablet+

### Dropdown Menu Container

**File**: `src/components/ui/LanguageSelector.jsx` (Line 130-138)

```jsx
<div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white 
                dark:bg-slate-800 rounded-2xl shadow-2xl border 
                border-slate-100 dark:border-slate-700 z-50 
                overflow-hidden py-1"
```

**Styling**:
- `absolute right-0` - Positioned to right of button
- `top-[calc(100%+8px)]` - 8px below button
- `w-56` - Width 224px
- `bg-white` - White background
- `dark:bg-slate-800` - Dark slate background in dark mode
- `rounded-2xl` - Large border radius (16px)
- `shadow-2xl` - Large shadow (0 25px 50px -12px rgba)
- `border border-slate-100` - Light border
- `dark:border-slate-700` - Dark mode border
- `z-50` - High z-index (overlay content)
- `overflow-hidden` - Clips content to rounded corners
- `py-1` - Vertical padding for spacing

### Language Options (Buttons)

**File**: `src/components/ui/LanguageSelector.jsx` (Line 152-172)

```jsx
className={`w-full text-left px-4 py-3 text-sm font-inter border-none 
            cursor-pointer transition-all duration-100 disabled:opacity-60 
            disabled:cursor-not-allowed
  ${selected === lang.code
    ? 'bg-eco-50 dark:bg-eco-900/30 text-eco-700 dark:text-eco-400 font-semibold'
    : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
  }`}
```

**Styling**:
- `w-full` - Full width of dropdown
- `text-left` - Left-aligned text
- `px-4 py-3` - Horizontal 16px, vertical 12px padding
- `text-sm` - 14px font size
- `font-inter` - Inter typeface
- `border-none` - No border
- `cursor-pointer` - Mouse cursor pointer
- `transition-all duration-100` - 100ms smooth transition
- **Selected State**:
  - `bg-eco-50` - Light green background
  - `text-eco-700` - Green text
  - `font-semibold` - Bold font
  - `dark:bg-eco-900/30` - Dark semi-transparent green
  - `dark:text-eco-400` - Light green text in dark mode
- **Unselected State**:
  - `bg-transparent` - No background
  - `text-slate-700` - Dark gray text
  - `hover:bg-slate-50` - Light gray on hover
  - `dark:text-slate-300` - Light gray text in dark mode
  - `dark:hover:bg-slate-700` - Dark hover in dark mode

### Checkmark Icon

**File**: `src/components/ui/LanguageSelector.jsx` (Line 170-176)

```jsx
{selected === lang.code && (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
)}
```

**Styling**:
- `fill="currentColor"` - Inherits parent text color
- `width="16" height="16"` - 16px checkmark
- Shows only when `selected === lang.code`

## 🎬 Animations

### Dropdown Open Animation

**File**: `src/components/ui/LanguageSelector.jsx` (Line 138)

```jsx
style={{
  animation: 'fadeInDown 0.2s cubic-bezier(0.22, 0.68, 0, 1.2) forwards',
}}
```

**CSS**:
```css
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- Duration: 200ms
- Easing: Bouncy cubic-bezier (springy feel)
- Starts: 8px above, transparent
- Ends: Normal position, opaque

### Arrow Rotation

**File**: `src/components/ui/LanguageSelector.jsx` (Line 116-124)

```jsx
style={{
  transition: 'transform 0.2s ease',
  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
}}
```

- Duration: 200ms
- Easing: `ease` (smooth acceleration/deceleration)
- Rotates 180° when dropdown opens
- Returns to 0° when closed

### Loading Spinner

**File**: `src/components/ui/LanguageSelector.jsx` (Line 103-107)

```jsx
className={isLoading ? 'animate-spin' : ''}
```

**Tailwind `animate-spin`**:
```css
animation: spin 1s linear infinite;

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

- Duration: 1 second
- Linear easing (constant speed)
- Infinite loop
- Applied to globe icon

### Smooth Transitions

**Throughout**:
```jsx
transition-all duration-200
transition-colors duration-100
transition-transform 0.2s ease
```

- All properties animate together
- Duration: 100-200ms depending on context
- Easing: ease, ease-out (Tailwind defaults)

## 🌓 Dark Mode Styling

All dark mode variants use `dark:` prefix:

```jsx
// Light mode / Dark mode
'bg-white dark:bg-slate-800'              // Background
'text-slate-700 dark:text-slate-300'      // Text
'border-slate-200 dark:border-slate-700'  // Borders
'hover:bg-eco-50 dark:hover:bg-slate-700' // Interactive
'bg-eco-50 dark:bg-eco-900/30'            // Highlights
```

**Trigger**: Add `dark` class to root element
**Location**: `src/context/ThemeContext.jsx` manages this

## 📱 Responsive Design

### Mobile-First Breakpoints

```jsx
// Hidden on mobile, shown on tablet+
'hidden sm:block'

// Mobile: show, Tablet+: hide (if needed)
'block sm:hidden'

// Full width on mobile, max-width on desktop
'w-full sm:max-w-[300px]'
```

**Tailwind Breakpoints**:
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up

### Language Selector Responsive

```jsx
// Text only shows on tablet and up
<span className="hidden sm:block">English</span>

// On mobile: just show globe icon
// On tablet+: show globe + language name
```

## 🎯 Customization Guide

### Change Primary Color

**Step 1**: Find all instances of `#059569`

Files:
- `src/components/ui/LanguageSelector.jsx` (3 occurrences)
- `index.html` (if needed)

**Step 2**: Replace with new color

```jsx
// Old
stroke="#059569"
// New
stroke="#FF6B6B"  // Your new color
```

**Step 3**: Update Tailwind classes if using custom theme

In `tailwind.config.js` (if exists):
```js
theme: {
  extend: {
    colors: {
      'eco': '#FF6B6B',  // Your color
    }
  }
}
```

### Change Button Size

```jsx
// Current
px-2.5 py-2        // Padding
text-xs             // Font size
width="16"          // Icon size

// Make larger
px-4 py-3           // More padding
text-sm             // Larger font
width="20"          // Larger icon
```

### Change Dropdown Width

```jsx
// Current
w-56                // 224px

// Make narrower
w-48                // 192px

// Make wider
w-64                // 256px
```

### Change Animation Speed

```jsx
// Slower dropdown
animation: 'fadeInDown 0.4s cubic-bezier(...)'  // Was 0.2s

// Faster arrow rotation
transition: 'transform 0.1s ease'  // Was 0.2s

// Slower loading spin
className={isLoading ? 'animate-spin' : ''}  // Built-in: 1s
// (To override, add custom CSS)
```

### Add Shadow Customization

```jsx
// Current
shadow-2xl

// Options
shadow-lg      // Smaller shadow
shadow-xl      // Medium shadow
shadow-2xl     // Large shadow (current)

// Or custom:
style={{ boxShadow: '0 0 20px rgba(5, 149, 105, 0.1)' }}
```

### Change Border Radius

```jsx
// Current
rounded-xl      // 12px
rounded-2xl     // 16px (dropdown)

// Options
rounded-lg      // 8px
rounded-xl      // 12px
rounded-2xl     // 16px
rounded-full    // 9999px (pill shape)
```

## 📐 Layout Spacing

### Padding Reference

```jsx
p-1   = 0.25rem = 4px
p-2   = 0.5rem  = 8px
p-3   = 0.75rem = 12px
px-4  = 1rem    = 16px (horizontal only)
py-2  = 0.5rem  = 8px (vertical only)
```

### Gap Reference

```jsx
gap-1   = 0.25rem = 4px
gap-1.5 = 0.375rem = 6px
gap-2   = 0.5rem = 8px
gap-3   = 0.75rem = 12px
```

## 🖼️ SVG Customization

### Globe Icon

```jsx
<svg width="16" height="16" fill="none" viewBox="0 0 24 24" 
     stroke="#059569" strokeWidth="2">
  <circle cx="12" cy="12" r="10" />
  <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 
        15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
</svg>
```

To customize:
- `stroke="#059569"` - Change line color
- `strokeWidth="2"` - Change line thickness
- `width="16" height="16"` - Change size

### Arrow Icon

```jsx
<svg width="10" height="10" fill="none" viewBox="0 0 24 24" 
     stroke="#94a3b8" strokeWidth="2.5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
</svg>
```

- `stroke="#94a3b8"` - Gray color (change for emphasis)
- `strokeWidth="2.5"` - Line thickness
- Rotates 180° when open

### Checkmark Icon

```jsx
<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
</svg>
```

- `fill="currentColor"` - Inherits parent color
- Auto-colors based on selected state

## 💾 CSS-in-JS Styles

**File**: `src/components/ui/LanguageSelector.jsx` (Line 176)

```jsx
<style>{`
  .goog-te-banner-frame {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  // ... more rules
`}</style>
```

These hide Google Translate UI elements.

## 🎨 Tailwind Integration Points

The component uses Tailwind classes extensively:

```jsx
// Color utilities
bg-white          // Background
text-slate-600    // Text color
border-slate-200  // Border color
hover:border-eco-400   // Interactive states

// Spacing
px-2.5 py-2       // Padding
gap-1.5           // Gaps

// Layout
flex items-center // Flexbox
absolute right-0  // Positioning
w-56              // Width

// Effects
shadow-2xl        // Shadow
rounded-2xl       // Border radius
opacity-60        // Transparency

// Responsive
hidden sm:block   // Responsive visibility

// Transitions
transition-all duration-200  // Animations

// Dark mode
dark:bg-slate-800  // Dark variants
dark:text-slate-300
```

## 📊 File Size Impact

| Asset | Size | Impact |
|-------|------|--------|
| Component | ~8KB | Minimal |
| Google Translate script | ~50KB | Async loaded |
| Total CSS | Tailwind | Included in build |
| Total JS | Compiled | Minimal impact |

## 🚀 Performance Tips

1. **Sprites**: Consider icon sprite sheet for smaller footprint
2. **CSS**: Purge unused Tailwind classes in production
3. **SVGs**: Optimize SVGs with SVGO for smaller size
4. **Lazy Load**: Google Translate script loads asynchronously
5. **Caching**: Browser caches Google Translate API responses

## ✅ Browser Rendering

The component renders efficiently:
- No CSS-in-JS runtime overhead (uses style tag)
- Minimal DOM nodes
- Efficient event handling (single handler for outside clicks)
- No unnecessary re-renders with proper state management

---

**Last Updated**: 2024
**Version**: 1.0
**Maintainer**: Your Team
