/**
 * Shared Framer Motion animation variants for EcoRecycle.
 * All durations are consistent (300-400ms) with ease-in-out easing.
 * GPU-accelerated: only transform + opacity are animated.
 */

// ── Page-level variants ────────────────────────────────────────────────────────
export const pageVariants = {
  initial:  { opacity: 0, y: 14 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.38, ease: [0.22, 0.68, 0, 1.1] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.22, ease: 'easeIn' } },
}

// ── Fade in (overlays, backdrops) ──────────────────────────────────────────────
export const fadeIn = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit:     { opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } },
}

// ── Scale + fade (modals, dropdowns) ──────────────────────────────────────────
export const scaleIn = {
  initial:  { opacity: 0, scale: 0.94, y: 8  },
  animate:  { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.3, ease: [0.22, 0.68, 0, 1.2] } },
  exit:     { opacity: 0, scale: 0.96, y: 4,  transition: { duration: 0.18, ease: 'easeIn' } },
}

// ── Slide up from bottom (mobile sheet modals) ─────────────────────────────────
export const slideUp = {
  initial:  { opacity: 0, y: 48  },
  animate:  { opacity: 1, y: 0,   transition: { duration: 0.35, ease: [0.22, 0.68, 0, 1.1] } },
  exit:     { opacity: 0, y: 32,  transition: { duration: 0.2,  ease: 'easeIn' } },
}

// ── Dropdown (navbar menus) ────────────────────────────────────────────────────
export const dropdownVariants = {
  initial:  { opacity: 0, scale: 0.96, y: -8 },
  animate:  { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.22, ease: [0.22, 0.68, 0, 1.2] } },
  exit:     { opacity: 0, scale: 0.97, y: -4, transition: { duration: 0.15, ease: 'easeIn' } },
}

// ── Stagger container (grid parents) ──────────────────────────────────────────
export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

// ── Child item in a stagger grid ──────────────────────────────────────────────
export const fadeUp = {
  initial:  { opacity: 0, y: 22 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.42, ease: [0.22, 0.68, 0, 1.1] } },
}

// ── Fade up for whileInView (viewport-triggered) ──────────────────────────────
export const inViewFadeUp = {
  initial:  { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1.1] },
}

// ── Mobile menu (height animation handled via motion.div + overflow hidden) ────
export const mobileMenuVariants = {
  initial:  { opacity: 0, height: 0 },
  animate:  { opacity: 1, height: 'auto', transition: { duration: 0.28, ease: [0.22, 0.68, 0, 1.1] } },
  exit:     { opacity: 0, height: 0,      transition: { duration: 0.2,  ease: 'easeIn' } },
}
