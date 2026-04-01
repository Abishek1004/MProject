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
    color: '#059569',
    light: '#ecfdf5',
    badge: 'Most Popular',
  },
  {
    id:    'laptop',
    name:  'Laptop',
    img:   laptoplogo,
    emoji: '💻',
    sub:   'Notebooks & ultrabooks',
    count: '1,800+ models',
    color: '#0891b2',
    light: '#ecfeff',
    badge: 'High Value',
  },
  {
    id:    'tablet',
    name:  'Tablet',
    img:   tabletlogo,
    emoji: '📟',
    sub:   'Tablets & e-readers',
    count: '900+ models',
    color: '#65a30d',
    light: '#f7fee7',
    badge: 'Quick Quote',
  },
]

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id) ?? null
