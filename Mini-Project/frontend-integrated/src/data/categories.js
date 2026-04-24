// ═══════════════════════════════════════════════════════════════════════════
// ARRAY 1 — CATEGORIES
// Fields: id · name · img · emoji · sub · count · color · light · badge
// ═══════════════════════════════════════════════════════════════════════════
import mobilelogo from '../assets/img/mobilelogo.svg';
import laptoplogo from '../assets/img/laptoplogo.svg';
import tabletlogo from '../assets/img/tabletlogo.svg';
export const CATEGORIES = [
  {
    id:    'mobile',
    name:  'Mobile',
    img:   mobilelogo,
    emoji: '📱',
    sub:   'Smartphones & feature phones',
    count: '2,400+ models',
    color: '#059669', // Green
    light: '#f0fdf4',
    badge: 'Most Popular',
  },
  {
    id:    'laptop',
    name:  'Laptop',
    img:   laptoplogo,
    emoji: '💻',
    sub:   'Notebooks & ultrabooks',
    count: '1,800+ models',
    color: '#2563eb', // Blue
    light: '#eff6ff',
    badge: 'High Value',
  },
  {
    id:    'tablet',
    name:  'Tablet',
    img:   tabletlogo,
    emoji: '📟',
    sub:   'Tablets & e-readers',
    count: '900+ models',
    color: '#eab308', // Yellow
    light: '#fefce8',
    badge: 'Quick Quote',
  },
]

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id) ?? null
