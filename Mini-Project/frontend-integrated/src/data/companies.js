// ═══════════════════════════════════════════════════════════════════════════
// ARRAY 2 — COMPANIES
// Fields: id · categoryId · name · logo · emoji · tagline
//         details: { founded, origin, about }
// ═══════════════════════════════════════════════════════════════════════════
import apple from '../assets/img/applelogo.png'
import samsung from '../assets/img/samsunglogo.png'
import realme from '../assets/img/realmelogo.png'
import xiaomi from '../assets/img/xiaomilogo.png'
import oneplus from '../assets/img/onepluslogo.png'
import vivo from '../assets/img/vivologo.png'
import oppo from '../assets/img/oppologo.png'
import nokia from '../assets/img/nokialogo.png'
import lenovo from '../assets/img/lenovologo.png'
import hp from '../assets/img/hplogo.png'
import dell from '../assets/img/delllogo.png'
import asus from '../assets/img/asuslogo.png'
import acer from '../assets/img/acerlogo.png'
import msi from '../assets/img/msilogo.png'
export const COMPANIES = [
  // ── MOBILE ────────────────────────────────────────────────────────────────
  { id:'apple',   categoryId:'mobile', name:'Apple',
    logo:apple,   emoji:'', tagline:'Think Different',
    details:{ founded:'1976', origin:'USA',     about:'Apple designs iPhones known for iOS, premium build and the A-series chips.' }},
  { id:'samsung', categoryId:'mobile', name:'Samsung',
    logo:samsung, emoji:'📱', tagline:"Do What You Can't",
    details:{ founded:'1969', origin:'Korea',   about:'Samsung Galaxy spans flagship S-series down to affordable A-series phones.' }},
  { id:'realme',  categoryId:'mobile', name:'Realme',
    logo:realme,  emoji:'⚡', tagline:'Dare To Leap',
    details:{ founded:'2018', origin:'China',   about:'Realme delivers performance-first smartphones at highly competitive prices.' }},
  { id:'xiaomi',  categoryId:'mobile', name:'Xiaomi',
    logo:xiaomi,  emoji:'🧡', tagline:'Just For Fans',
    details:{ founded:'2010', origin:'China',   about:'Xiaomi offers Redmi, POCO, and flagship Xiaomi devices around the globe.' }},
  { id:'oneplus', categoryId:'mobile', name:'OnePlus',
    logo:oneplus, emoji:'🔴', tagline:'Never Settle',
    details:{ founded:'2013', origin:'China',   about:'OnePlus is known for fast charging, clean OxygenOS and flagship killers.' }},
  { id:'vivo',    categoryId:'mobile', name:'Vivo',
    logo:vivo,    emoji:'💙', tagline:'Joy of Photography',
    details:{ founded:'2009', origin:'China',   about:'Vivo focuses on camera innovation, slim designs and hi-fi audio quality.' }},
  { id:'oppo',    categoryId:'mobile', name:'OPPO',
    logo:oppo,    emoji:'💚', tagline:'Inspiration Ahead',
    details:{ founded:'2004', origin:'China',   about:'OPPO Reno and Find X series push photography and display technology.' }},
  { id:'nokia',   categoryId:'mobile', name:'Nokia',
    logo:nokia,   emoji:'🔵', tagline:'Connecting People',
    details:{ founded:'1865', origin:'Finland', about:'Nokia offers durable, clean-Android smartphones for everyday reliability.' }},

  // ── LAPTOP ────────────────────────────────────────────────────────────────
  { id:'apple',   categoryId:'laptop', name:'Apple',
    logo:apple,   emoji:'🍎', tagline:'Mac — Built for pros',
    details:{ founded:'1976', origin:'USA',     about:'MacBook lineup powered by Apple Silicon M-series for top performance and battery.' }},
  { id:'dell',    categoryId:'laptop', name:'Dell',
    logo:dell,    emoji:'🖥️', tagline:'The Power to Do More',
    details:{ founded:'1984', origin:'USA',     about:'Dell XPS and Inspiron cover premium and everyday laptop requirements.' }},
  { id:'hp',      categoryId:'laptop', name:'HP',
    logo:hp,      emoji:'🖨️', tagline:'Keep Reinventing',
    details:{ founded:'1939', origin:'USA',     about:'HP Spectre and Envy lines lead in design and display quality.' }},
  { id:'lenovo',  categoryId:'laptop', name:'Lenovo',
    logo:lenovo,  emoji:'⬛', tagline:'Smarter Technology',
    details:{ founded:'1984', origin:'China',   about:'Lenovo ThinkPad and Yoga are top-rated for business and creative work.' }},
  { id:'asus',    categoryId:'laptop', name:'Asus',
    logo:asus,    emoji:'🔺', tagline:'In Search of Incredible',
    details:{ founded:'1989', origin:'Taiwan',  about:'Asus ZenBook and ROG span daily productivity to high-end gaming.' }},
  { id:'acer',    categoryId:'laptop', name:'Acer',
    logo:acer,    emoji:'🟢', tagline:'Explore Beyond Limits',
    details:{ founded:'1976', origin:'Taiwan',  about:'Acer Swift and Aspire are reliable everyday and budget-friendly laptops.' }},
  { id:'msi',     categoryId:'laptop', name:'MSI',
    logo:msi,     emoji:'🐉', tagline:'Gaming First',
    details:{ founded:'1986', origin:'Taiwan',  about:'MSI Stealth and Titan lines are dedicated performance gaming laptops.' }},
  { id:'samsung', categoryId:'laptop', name:'Samsung',
    logo:samsung, emoji:'💻', tagline:'Galaxy Book Series',
    details:{ founded:'1969', origin:'Korea',   about:'Samsung Galaxy Book offers premium AMOLED displays with seamless Galaxy sync.' }},

  // ── TABLET ────────────────────────────────────────────────────────────────
  { id:'apple',   categoryId:'tablet', name:'Apple',
    logo:apple,   emoji:'🍎', tagline:'iPad — Your next computer',
    details:{ founded:'1976', origin:'USA',     about:'iPad Pro and Air are the most capable tablets powered by M-series chips.' }},
  { id:'samsung', categoryId:'tablet', name:'Samsung',
    logo:samsung, emoji:'📱', tagline:'Galaxy Tab Series',
    details:{ founded:'1969', origin:'Korea',   about:'Galaxy Tab S9 Ultra delivers the best Android tablet experience available.' }},
  { id:'lenovo',  categoryId:'tablet', name:'Lenovo',
    logo:lenovo,  emoji:'⬛', tagline:'Tab Series',
    details:{ founded:'1984', origin:'China',   about:'Lenovo Tab P series delivers excellent productivity-focused tablets.' }},
  { id:'xiaomi',  categoryId:'tablet', name:'Xiaomi',
    logo:xiaomi,  emoji:'🧡', tagline:'Mi Pad Series',
    details:{ founded:'2010', origin:'China',   about:'Xiaomi Pad 6 competes with premium tablets at affordable price points.' }},
  { id:'realme',  categoryId:'tablet', name:'Realme',
    logo:realme,  emoji:'⚡', tagline:'Realme Pad',
    details:{ founded:'2018', origin:'China',   about:'Realme Pad offers great value for budget-conscious tablet shoppers.' }},
  { id:'asus',    categoryId:'tablet', name:'Asus',
    logo:asus,    emoji:'🔺', tagline:'ZenPad Series',
    details:{ founded:'1989', origin:'Taiwan',  about:'Asus ROG Flow Z13 bridges the gap between gaming tablet and laptop.' }},
  { id:'amazon',  categoryId:'tablet', name:'Amazon',
    logo:'/images/brands/amazon.png',  emoji:'📦', tagline:'Fire Tablet Series',
    details:{ founded:'1994', origin:'USA',     about:'Amazon Fire tablets are affordable and ideal for media consumption.' }},
  { id:'huawei',  categoryId:'tablet', name:'Huawei',
    logo:'/images/brands/huawei.png',  emoji:'🌸', tagline:'MatePad Series',
    details:{ founded:'1987', origin:'China',   about:'Huawei MatePad Pro offers a premium experience running HarmonyOS.' }},
]

/** All companies for a given category */
export const getCompanies = (categoryId) =>
  COMPANIES.filter((c) => c.categoryId === categoryId)

/** Single company lookup */
export const getCompany = (categoryId, companyId) =>
  COMPANIES.find((c) => c.categoryId === categoryId && c.id === companyId) ?? null
