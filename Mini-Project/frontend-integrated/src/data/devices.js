// ═══════════════════════════════════════════════════════════════════════════
// ARRAY 3 — DEVICES  (models + variants with DYNAMIC ram & storage)
//
// Structure:
//   DEVICES[`${categoryId}_${companyId}`] = [
//     {
//       id, name, base,
//       variants: [
//         { name, base, ramOptions: string[], storageOptions: string[] }
//       ]
//     }
//   ]
//
// ramOptions / storageOptions are fully dynamic per variant.
// To add or change RAM/storage for any model, only edit those arrays here.
// ═══════════════════════════════════════════════════════════════════════════
export const DEVICES = {

  // ── MOBILE / APPLE ──────────────────────────────────────────────────────
  mobile_apple: [
    { id:'ip15', name:'iPhone 15 Series', base:22000, variants:[
      { name:'iPhone 15',         base:22000, ramOptions:['6GB'],              storageOptions:['128GB','256GB','512GB'] },
      { name:'iPhone 15 Plus',    base:25000, ramOptions:['6GB'],              storageOptions:['128GB','256GB','512GB'] },
      { name:'iPhone 15 Pro',     base:32000, ramOptions:['8GB'],              storageOptions:['128GB','256GB','512GB','1TB'] },
      { name:'iPhone 15 Pro Max', base:38000, ramOptions:['8GB'],              storageOptions:['256GB','512GB','1TB'] },
    ]},
    { id:'ip14', name:'iPhone 14 Series', base:14000, variants:[
      { name:'iPhone 14',         base:14000, ramOptions:['6GB'],              storageOptions:['128GB','256GB','512GB'] },
      { name:'iPhone 14 Plus',    base:16000, ramOptions:['6GB'],              storageOptions:['128GB','256GB','512GB'] },
      { name:'iPhone 14 Pro',     base:22000, ramOptions:['6GB'],              storageOptions:['128GB','256GB','512GB','1TB'] },
      { name:'iPhone 14 Pro Max', base:26000, ramOptions:['6GB'],              storageOptions:['128GB','256GB','512GB','1TB'] },
    ]},
    { id:'ip13', name:'iPhone 13 Series', base:10000, variants:[
      { name:'iPhone 13',         base:10000, ramOptions:['4GB'],              storageOptions:['128GB','256GB','512GB'] },
      { name:'iPhone 13 Mini',    base:8500,  ramOptions:['4GB'],              storageOptions:['128GB','256GB','512GB'] },
      { name:'iPhone 13 Pro',     base:14000, ramOptions:['6GB'],              storageOptions:['128GB','256GB','512GB','1TB'] },
      { name:'iPhone 13 Pro Max', base:16000, ramOptions:['6GB'],              storageOptions:['128GB','256GB','512GB','1TB'] },
    ]},
    { id:'ip12', name:'iPhone 12 Series', base:7000, variants:[
      { name:'iPhone 12',         base:7000,  ramOptions:['4GB'],              storageOptions:['64GB','128GB','256GB'] },
      { name:'iPhone 12 Mini',    base:6000,  ramOptions:['4GB'],              storageOptions:['64GB','128GB','256GB'] },
      { name:'iPhone 12 Pro',     base:9500,  ramOptions:['6GB'],              storageOptions:['128GB','256GB','512GB'] },
    ]},
  ],

  // ── MOBILE / SAMSUNG ────────────────────────────────────────────────────
  mobile_samsung: [
    { id:'s24', name:'Galaxy S24 Series', base:28000, variants:[
      { name:'Galaxy S24',        base:28000, ramOptions:['8GB'],              storageOptions:['128GB','256GB'] },
      { name:'Galaxy S24+',       base:35000, ramOptions:['12GB'],             storageOptions:['256GB','512GB'] },
      { name:'Galaxy S24 Ultra',  base:45000, ramOptions:['12GB'],             storageOptions:['256GB','512GB','1TB'] },
    ]},
    { id:'s23', name:'Galaxy S23 Series', base:18000, variants:[
      { name:'Galaxy S23',        base:18000, ramOptions:['8GB'],              storageOptions:['128GB','256GB'] },
      { name:'Galaxy S23+',       base:24000, ramOptions:['8GB'],              storageOptions:['256GB','512GB'] },
      { name:'Galaxy S23 Ultra',  base:32000, ramOptions:['8GB','12GB'],       storageOptions:['256GB','512GB','1TB'] },
    ]},
    { id:'a54', name:'Galaxy A54 Series', base:9000, variants:[
      { name:'Galaxy A54 5G',     base:9000,  ramOptions:['8GB'],              storageOptions:['128GB','256GB'] },
      { name:'Galaxy A34 5G',     base:7000,  ramOptions:['8GB'],              storageOptions:['128GB'] },
      { name:'Galaxy A14 5G',     base:5000,  ramOptions:['4GB','6GB'],        storageOptions:['64GB','128GB'] },
    ]},
  ],

  // ── MOBILE / REALME ─────────────────────────────────────────────────────
  mobile_realme: [
    { id:'r12', name:'Realme 12 Series', base:7000, variants:[
      { name:'Realme 12',         base:7000,  ramOptions:['8GB'],              storageOptions:['128GB','256GB'] },
      { name:'Realme 12 Pro',     base:9000,  ramOptions:['8GB','12GB'],       storageOptions:['128GB','256GB'] },
      { name:'Realme 12 Pro+',    base:11000, ramOptions:['12GB'],             storageOptions:['256GB','512GB'] },
    ]},
    { id:'r11', name:'Realme 11 Series', base:5500, variants:[
      { name:'Realme 11',         base:5500,  ramOptions:['8GB'],              storageOptions:['128GB','256GB'] },
      { name:'Realme 11 Pro',     base:7500,  ramOptions:['8GB'],              storageOptions:['128GB','256GB'] },
      { name:'Realme 11 Pro+',    base:9500,  ramOptions:['8GB','12GB'],       storageOptions:['256GB'] },
    ]},
  ],

  // ── MOBILE / XIAOMI ─────────────────────────────────────────────────────
  mobile_xiaomi: [
    { id:'x14', name:'Xiaomi 14 Series', base:22000, variants:[
      { name:'Xiaomi 14',         base:22000, ramOptions:['8GB','12GB'],       storageOptions:['256GB','512GB'] },
      { name:'Xiaomi 14 Pro',     base:30000, ramOptions:['12GB','16GB'],      storageOptions:['256GB','512GB','1TB'] },
      { name:'Xiaomi 14 Ultra',   base:40000, ramOptions:['16GB'],             storageOptions:['512GB','1TB'] },
    ]},
    { id:'rn13', name:'Redmi Note 13 Series', base:7000, variants:[
      { name:'Redmi Note 13',     base:7000,  ramOptions:['6GB','8GB'],        storageOptions:['128GB','256GB'] },
      { name:'Redmi Note 13 Pro', base:9000,  ramOptions:['8GB','12GB'],       storageOptions:['128GB','256GB'] },
      { name:'Redmi Note 13 Pro+',base:12000, ramOptions:['8GB','12GB'],       storageOptions:['256GB','512GB'] },
    ]},
    { id:'poco', name:'POCO Series', base:8000, variants:[
      { name:'POCO F6',           base:8000,  ramOptions:['8GB','12GB'],       storageOptions:['256GB','512GB'] },
      { name:'POCO X6 Pro',       base:9500,  ramOptions:['8GB','12GB'],       storageOptions:['128GB','256GB'] },
      { name:'POCO M6 Pro',       base:6500,  ramOptions:['6GB','8GB'],        storageOptions:['128GB','256GB'] },
    ]},
  ],

  // ── MOBILE / ONEPLUS ────────────────────────────────────────────────────
  mobile_oneplus: [
    { id:'op12', name:'OnePlus 12 Series', base:24000, variants:[
      { name:'OnePlus 12',        base:24000, ramOptions:['12GB','16GB'],      storageOptions:['256GB','512GB'] },
      { name:'OnePlus 12R',       base:16000, ramOptions:['8GB','16GB'],       storageOptions:['128GB','256GB'] },
    ]},
    { id:'op11', name:'OnePlus 11 Series', base:16000, variants:[
      { name:'OnePlus 11',        base:16000, ramOptions:['8GB','16GB'],       storageOptions:['128GB','256GB'] },
      { name:'OnePlus 11R',       base:12000, ramOptions:['8GB'],              storageOptions:['128GB','256GB'] },
    ]},
    { id:'nord', name:'Nord Series', base:9000, variants:[
      { name:'Nord 3',            base:9000,  ramOptions:['8GB','16GB'],       storageOptions:['128GB','256GB'] },
      { name:'Nord CE 3',         base:7000,  ramOptions:['8GB'],              storageOptions:['128GB','256GB'] },
      { name:'Nord CE 3 Lite',    base:5500,  ramOptions:['8GB'],              storageOptions:['128GB'] },
    ]},
  ],

  // ── MOBILE / VIVO ───────────────────────────────────────────────────────
  mobile_vivo: [
    { id:'v30',  name:'Vivo V30 Series',  base:12000, variants:[
      { name:'Vivo V30',          base:12000, ramOptions:['8GB','12GB'],       storageOptions:['128GB','256GB'] },
      { name:'Vivo V30 Pro',      base:16000, ramOptions:['8GB','12GB'],       storageOptions:['256GB','512GB'] },
    ]},
    { id:'x100', name:'Vivo X100 Series', base:28000, variants:[
      { name:'Vivo X100',         base:28000, ramOptions:['12GB','16GB'],      storageOptions:['256GB','512GB'] },
      { name:'Vivo X100 Pro',     base:36000, ramOptions:['16GB'],             storageOptions:['256GB','512GB','1TB'] },
    ]},
  ],

  // ── MOBILE / OPPO ───────────────────────────────────────────────────────
  mobile_oppo: [
    { id:'rn11', name:'Reno 11 Series', base:14000, variants:[
      { name:'Reno 11',           base:14000, ramOptions:['8GB','12GB'],       storageOptions:['128GB','256GB'] },
      { name:'Reno 11 Pro',       base:18000, ramOptions:['12GB'],             storageOptions:['256GB','512GB'] },
      { name:'Reno 11 F',         base:10000, ramOptions:['8GB'],              storageOptions:['128GB','256GB'] },
    ]},
    { id:'fx7', name:'Find X7 Series', base:30000, variants:[
      { name:'Find X7',           base:30000, ramOptions:['12GB','16GB'],      storageOptions:['256GB','512GB'] },
      { name:'Find X7 Pro',       base:40000, ramOptions:['16GB'],             storageOptions:['512GB','1TB'] },
    ]},
  ],

  // ── MOBILE / NOKIA ──────────────────────────────────────────────────────
  mobile_nokia: [
    { id:'g42', name:'Nokia G Series', base:5000, variants:[
      { name:'Nokia G42 5G',      base:5000,  ramOptions:['6GB'],              storageOptions:['128GB','256GB'] },
      { name:'Nokia G21',         base:4000,  ramOptions:['4GB','6GB'],        storageOptions:['64GB','128GB'] },
      { name:'Nokia G11',         base:3000,  ramOptions:['3GB'],              storageOptions:['32GB','64GB'] },
    ]},
    { id:'c32', name:'Nokia C Series', base:3500, variants:[
      { name:'Nokia C32',         base:3500,  ramOptions:['4GB'],              storageOptions:['64GB','128GB'] },
      { name:'Nokia C22',         base:2800,  ramOptions:['2GB','3GB'],        storageOptions:['32GB','64GB'] },
    ]},
  ],

  // ── LAPTOP / APPLE ──────────────────────────────────────────────────────
  laptop_apple: [
    { id:'mbp3', name:'MacBook Pro M3', base:65000, variants:[
      { name:'MacBook Pro 14" M3',     base:65000,  ramOptions:['8GB','16GB'],          storageOptions:['512GB SSD','1TB SSD'] },
      { name:'MacBook Pro 14" M3 Pro', base:85000,  ramOptions:['18GB','36GB'],          storageOptions:['512GB SSD','1TB SSD'] },
      { name:'MacBook Pro 16" M3 Max', base:120000, ramOptions:['36GB','48GB','64GB'],   storageOptions:['1TB SSD'] },
    ]},
    { id:'mba3', name:'MacBook Air M3', base:42000, variants:[
      { name:'MacBook Air 13" M3',     base:42000,  ramOptions:['8GB','16GB'],          storageOptions:['256GB SSD','512GB SSD','1TB SSD'] },
      { name:'MacBook Air 15" M3',     base:50000,  ramOptions:['8GB','16GB'],          storageOptions:['256GB SSD','512GB SSD','1TB SSD'] },
    ]},
  ],

  // ── LAPTOP / DELL ───────────────────────────────────────────────────────
  laptop_dell: [
    { id:'xps', name:'XPS Series', base:45000, variants:[
      { name:'XPS 13',            base:45000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
      { name:'XPS 15',            base:65000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
      { name:'XPS 17',            base:80000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
    ]},
    { id:'ins', name:'Inspiron Series', base:18000, variants:[
      { name:'Inspiron 14',       base:18000, ramOptions:['8GB','16GB'],        storageOptions:['256GB SSD','512GB SSD'] },
      { name:'Inspiron 15',       base:22000, ramOptions:['8GB','16GB'],        storageOptions:['256GB SSD','512GB SSD','1TB SSD'] },
      { name:'Inspiron 16',       base:28000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
    ]},
  ],

  // ── LAPTOP / HP ─────────────────────────────────────────────────────────
  laptop_hp: [
    { id:'sp',  name:'Spectre Series', base:50000, variants:[
      { name:'Spectre x360 13.5"',base:50000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
      { name:'Spectre x360 14"',  base:60000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
    ]},
    { id:'env', name:'Envy Series', base:32000, variants:[
      { name:'Envy x360 13"',     base:32000, ramOptions:['8GB','16GB'],        storageOptions:['256GB SSD','512GB SSD'] },
      { name:'Envy 16',           base:42000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
    ]},
  ],

  // ── LAPTOP / LENOVO ─────────────────────────────────────────────────────
  laptop_lenovo: [
    { id:'tp', name:'ThinkPad Series', base:40000, variants:[
      { name:'ThinkPad X1 Carbon', base:40000, ramOptions:['16GB','32GB'],      storageOptions:['512GB SSD','1TB SSD'] },
      { name:'ThinkPad T14s',      base:30000, ramOptions:['8GB','16GB'],       storageOptions:['256GB SSD','512GB SSD'] },
      { name:'ThinkPad E14',       base:22000, ramOptions:['8GB','16GB'],       storageOptions:['256GB SSD','512GB SSD'] },
    ]},
    { id:'yg', name:'Yoga Series', base:38000, variants:[
      { name:'Yoga 9i',            base:38000, ramOptions:['16GB','32GB'],      storageOptions:['512GB SSD','1TB SSD'] },
      { name:'Yoga 7i',            base:30000, ramOptions:['16GB'],             storageOptions:['512GB SSD'] },
      { name:'Yoga Slim 6i',       base:25000, ramOptions:['8GB','16GB'],       storageOptions:['256GB SSD','512GB SSD'] },
    ]},
  ],

  // ── LAPTOP / ASUS ───────────────────────────────────────────────────────
  laptop_asus: [
    { id:'zb',  name:'ZenBook Series', base:35000, variants:[
      { name:'ZenBook 14 OLED',   base:35000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
      { name:'ZenBook Pro 16X',   base:60000, ramOptions:['16GB','32GB'],       storageOptions:['1TB SSD'] },
    ]},
    { id:'rog', name:'ROG Series', base:55000, variants:[
      { name:'ROG Zephyrus G14',  base:55000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
      { name:'ROG Strix G16',     base:65000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
    ]},
  ],

  // ── LAPTOP / ACER ───────────────────────────────────────────────────────
  laptop_acer: [
    { id:'sw', name:'Swift Series', base:28000, variants:[
      { name:'Swift 5',           base:28000, ramOptions:['8GB','16GB'],        storageOptions:['256GB SSD','512GB SSD'] },
      { name:'Swift 3 OLED',      base:32000, ramOptions:['8GB','16GB'],        storageOptions:['256GB SSD','512GB SSD','1TB SSD'] },
    ]},
    { id:'as', name:'Aspire Series', base:20000, variants:[
      { name:'Aspire 7',          base:20000, ramOptions:['8GB','16GB'],        storageOptions:['256GB SSD','512GB SSD'] },
      { name:'Aspire 5',          base:16000, ramOptions:['8GB'],               storageOptions:['256GB SSD','512GB SSD'] },
    ]},
  ],

  // ── LAPTOP / MSI ────────────────────────────────────────────────────────
  laptop_msi: [
    { id:'st', name:'Stealth Series', base:55000, variants:[
      { name:'Stealth 16 AI',     base:55000, ramOptions:['16GB','32GB'],       storageOptions:['1TB SSD'] },
      { name:'Stealth 14 AI',     base:48000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
    ]},
  ],

  // ── LAPTOP / SAMSUNG ────────────────────────────────────────────────────
  laptop_samsung: [
    { id:'gb4', name:'Galaxy Book4 Series', base:45000, variants:[
      { name:'Galaxy Book4 Pro',      base:45000, ramOptions:['16GB','32GB'],   storageOptions:['512GB SSD','1TB SSD'] },
      { name:'Galaxy Book4 Pro 360',  base:55000, ramOptions:['16GB','32GB'],   storageOptions:['512GB SSD','1TB SSD'] },
      { name:'Galaxy Book4',          base:32000, ramOptions:['8GB','16GB'],    storageOptions:['256GB SSD','512GB SSD'] },
    ]},
  ],

  // ── TABLET / APPLE ──────────────────────────────────────────────────────
  tablet_apple: [
    { id:'ipadpro', name:'iPad Pro', base:38000, variants:[
      { name:'iPad Pro 11" M4',   base:38000, ramOptions:['8GB','16GB'],        storageOptions:['256GB','512GB','1TB'] },
      { name:'iPad Pro 13" M4',   base:52000, ramOptions:['8GB','16GB'],        storageOptions:['256GB','512GB','1TB'] },
    ]},
    { id:'ipadair', name:'iPad Air', base:24000, variants:[
      { name:'iPad Air 11" M2',   base:24000, ramOptions:['8GB'],               storageOptions:['128GB','256GB','512GB'] },
      { name:'iPad Air 13" M2',   base:32000, ramOptions:['8GB'],               storageOptions:['128GB','256GB','512GB','1TB'] },
    ]},
    { id:'ipad', name:'iPad', base:14000, variants:[
      { name:'iPad (10th gen)',    base:14000, ramOptions:['4GB'],               storageOptions:['64GB','256GB'] },
      { name:'iPad (9th gen)',     base:11000, ramOptions:['3GB'],               storageOptions:['64GB','256GB'] },
    ]},
  ],

  // ── TABLET / SAMSUNG ────────────────────────────────────────────────────
  tablet_samsung: [
    { id:'ts9', name:'Galaxy Tab S9 Series', base:38000, variants:[
      { name:'Galaxy Tab S9',        base:38000, ramOptions:['8GB','12GB'],     storageOptions:['128GB','256GB'] },
      { name:'Galaxy Tab S9+',       base:48000, ramOptions:['12GB'],           storageOptions:['256GB','512GB'] },
      { name:'Galaxy Tab S9 Ultra',  base:60000, ramOptions:['12GB','16GB'],    storageOptions:['256GB','512GB','1TB'] },
    ]},
    { id:'ta9', name:'Galaxy Tab A9 Series', base:12000, variants:[
      { name:'Galaxy Tab A9',        base:12000, ramOptions:['4GB','8GB'],      storageOptions:['64GB','128GB'] },
      { name:'Galaxy Tab A9+',       base:16000, ramOptions:['4GB','8GB'],      storageOptions:['64GB','128GB','256GB'] },
    ]},
  ],

  // ── TABLET / LENOVO ─────────────────────────────────────────────────────
  tablet_lenovo: [
    { id:'p12', name:'Tab P Series', base:18000, variants:[
      { name:'Tab P12 Pro',       base:18000, ramOptions:['6GB','8GB'],         storageOptions:['128GB','256GB'] },
      { name:'Tab P12',           base:14000, ramOptions:['4GB','6GB'],         storageOptions:['64GB','128GB'] },
      { name:'Tab P11 Pro',       base:12000, ramOptions:['6GB'],               storageOptions:['128GB','256GB'] },
    ]},
  ],

  // ── TABLET / XIAOMI ─────────────────────────────────────────────────────
  tablet_xiaomi: [
    { id:'pad6', name:'Mi Pad 6 Series', base:20000, variants:[
      { name:'Xiaomi Pad 6',      base:20000, ramOptions:['6GB','8GB'],         storageOptions:['128GB','256GB'] },
      { name:'Xiaomi Pad 6 Pro',  base:26000, ramOptions:['8GB','12GB'],        storageOptions:['256GB','512GB'] },
    ]},
  ],

  // ── TABLET / REALME ─────────────────────────────────────────────────────
  tablet_realme: [
    { id:'rp2', name:'Realme Pad', base:10000, variants:[
      { name:'Realme Pad 2',      base:10000, ramOptions:['4GB','6GB'],         storageOptions:['64GB','128GB'] },
      { name:'Realme Pad Mini 2', base:7500,  ramOptions:['3GB','4GB'],         storageOptions:['32GB','64GB'] },
    ]},
  ],

  // ── TABLET / ASUS ───────────────────────────────────────────────────────
  tablet_asus: [
    { id:'rogz', name:'ROG Flow / ZenPad', base:22000, variants:[
      { name:'ROG Flow Z13',      base:22000, ramOptions:['16GB','32GB'],       storageOptions:['512GB SSD','1TB SSD'] },
      { name:'ZenPad 3S 10',      base:8000,  ramOptions:['4GB'],               storageOptions:['32GB','64GB'] },
    ]},
  ],

  // ── TABLET / AMAZON ─────────────────────────────────────────────────────
  tablet_amazon: [
    { id:'fire', name:'Fire Series', base:6000, variants:[
      { name:'Fire HD 10 (2023)', base:6000,  ramOptions:['3GB'],               storageOptions:['32GB','64GB'] },
      { name:'Fire HD 8 Plus',    base:4500,  ramOptions:['3GB'],               storageOptions:['32GB','64GB'] },
      { name:'Fire 7',            base:3000,  ramOptions:['2GB'],               storageOptions:['16GB','32GB'] },
    ]},
  ],

  // ── TABLET / HUAWEI ─────────────────────────────────────────────────────
  tablet_huawei: [
    { id:'mp', name:'MatePad Series', base:18000, variants:[
      { name:'MatePad Pro 13.2"', base:18000, ramOptions:['8GB','12GB'],        storageOptions:['128GB','256GB','512GB'] },
      { name:'MatePad 11.5"',     base:12000, ramOptions:['6GB','8GB'],         storageOptions:['128GB','256GB'] },
    ]},
  ],
}

/** All model-series for a category+company */
export const getDevices = (categoryId, companyId) =>
  DEVICES[`${categoryId}_${companyId}`] ?? []

/** Dynamic RAM options for a specific variant (looked up by name) */
export function getRamOptions(categoryId, companyId, variantName) {
  const models = getDevices(categoryId, companyId)
  for (const m of models) {
    const v = m.variants.find((v) => v.name === variantName)
    if (v) return v.ramOptions
  }
  return ['4GB','6GB','8GB','12GB','16GB']
}

/** Dynamic storage options for a specific variant */
export function getStorageOptions(categoryId, companyId, variantName) {
  const models = getDevices(categoryId, companyId)
  for (const m of models) {
    const v = m.variants.find((v) => v.name === variantName)
    if (v) return v.storageOptions
  }
  return ['64GB','128GB','256GB','512GB']
}
