import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import ecologo from "../assets/img/logo.png"
import ImgF from '../components/ui/ImgF';

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Total Revenue', value: '$245,450', change: '+14.9%', positive: true, icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> },
  { label: 'New Customers', value: '684', change: '-8.6%', positive: false, icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M15.57 7a4 4 0 0 1 0 7.75" /></svg> },
  { label: 'Repeat Rate', value: '75.12%', change: '+25.4%', positive: true, icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 12V7H5a2 2 0 0 1 0-4h14a2 2 0 0 1 2 2v2M3 5v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" /></svg> },
  { label: 'Conversion', value: '32.65%', change: '-12.4%', positive: false, icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg> },
];

const TOP_PRODUCTS = [
  { name: 'Snicker Vento', id: '2441310', sales: '128', img: <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 9.5a2.5 2.5 0 0 1 5 0V11m-5-1.5L2 19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5.5a2.5 2.5 0 0 0-5 0V8H4a2 2 0 0 0-2 1.5z" /></svg> },
  { name: 'Blue Backpack', id: '1241318', sales: '401', img: <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 20V10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10" /><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><circle cx="12" cy="13" r="3" /></svg> },
  { name: 'Water Bottle', id: '8441573', sales: '1K+', img: <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 7V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2" /><path d="M7 7h10l1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L7 7z" /></svg> },
];

const WEEKLY_CUSTOMERS = [
  { name: 'Marks Hoverson', orders: '25', img: 'MH' },
  { name: 'Michel Datta', orders: '15', img: 'MD' },
  { name: 'Jhony Peters', orders: '23', img: 'JP' },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const SidebarItem = ({ icon, label, active, onClick, count }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group
      ${active
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-bold text-sm flex-1 text-left">{label}</span>
    {count && (
      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${active ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
        {count}
      </span>
    )}
    {active && (
      <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full" />
    )}
  </button>
);

const LineGraph = () => (
  <div className="h-[320px] w-full flex items-end gap-3 px-2 relative">
    {/* Y-Axis Labels */}
    <div className="flex flex-col justify-between h-full pr-4 text-[10px] font-black text-slate-300 pb-8 uppercase">
      <span>10k</span><span>7k</span><span>5k</span><span>3k</span><span>0k</span>
    </div>

    <div className="flex-1 h-full relative border-l border-b border-slate-100 dark:border-slate-700">
      {/* Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-0.5 pointer-events-none opacity-50">
        {[1, 2, 3, 4].map(v => <div key={v} className="w-full border-t border-dashed border-slate-100 dark:border-slate-800" />)}
      </div>

      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 300">
        {/* Shadow/Glow Path for Green Line */}
        <defs>
          <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Path 1: Order (Blueish/Darker Green) */}
        <motion.path
          d="M0,200 C50,220 100,150 150,180 C200,210 250,250 300,220 C350,190 400,230 400,200"
          fill="none"
          stroke="#475569"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Path 2: Income Growth (Bright Green) */}
        <motion.path
          d="M0,150 C50,130 100,180 150,140 C200,100 250,160 300,130 C350,100 400,150 400,120"
          fill="url(#graphGradient)"
          stroke="#10b981"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Tooltip & Point Highlight for Sep 10 */}
        <g>
          <rect x="180" y="100" width="1" height="200" fill="#f1f5f9" opacity="0.5" />
          <circle cx="185" cy="115" r="5" fill="#10b981" stroke="white" strokeWidth="2" />
          <foreignObject x="160" y="70" width="60" height="35">
            <div className="bg-slate-900 text-white text-[9px] font-black rounded-lg px-2 py-1 flex flex-col items-center shadow-xl">
              <span>$4,300</span>
              <span className="text-[7px] text-slate-400">Sep 10</span>
            </div>
          </foreignObject>
        </g>
      </svg>

      {/* X-Axis Labels */}
      <div className="absolute -bottom-8 left-0 w-full flex justify-between px-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
        <span>Sep 07</span>
        <span>Sep 08</span>
        <span>Sep 09</span>
        <span className="text-slate-800 dark:text-white">Sep 10</span>
        <span>Sep 11</span>
        <span>Sep 12</span>
        <span>Sep 13</span>
      </div>
    </div>
  </div>
);

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function EcoloopAdmin({ go }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchUsers();
    const savedOrders = JSON.parse(localStorage.getItem('ecoloop_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
    } catch (err) {
      alert('Delete failed: ' + (err.message || 'Server error'));
    }
  };

  const handleCreateUser = async () => {
    const name = window.prompt('Enter User Name:');
    if (!name) return;
    const email = window.prompt('Enter User Email:');
    if (!email) return;

    try {
      const res = await api.createUser({ name, email, role: 'USER', status: 'ACTIVE' });
      alert(res.message);
      fetchUsers();
    } catch (err) {
      alert('Creation failed');
    }
  };

  const handleApproveOrder = (orderId) => {
    // Update Order Status only
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: 'Approved' } : o);
    setOrders(updatedOrders);
    localStorage.setItem('ecoloop_orders', JSON.stringify(updatedOrders));
    
    alert(`Order ${orderId} has been confirmed/approved.`);
  };

  const handleProcessPayment = (orderId, amount) => {
    // Update Eco Wallet
    const currentWallet = parseFloat(localStorage.getItem('ecoloop_wallet') || '0');
    localStorage.setItem('ecoloop_wallet', (currentWallet + amount).toString());
    
    // Update Payment Status
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, paymentStatus: 'Paid' } : o);
    setOrders(updatedOrders);
    localStorage.setItem('ecoloop_orders', JSON.stringify(updatedOrders));
    
    alert(`Successfully paid! ₹${amount.toLocaleString()} has been instantly added to the customer's Eco Wallet.`);
  };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-inter transition-colors duration-500">

      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 h-screen z-30 transition-all duration-500">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl overflow-hidden flex items-center justify-center shadow-xl shadow-emerald-500/10">
            <ImgF src={ecologo} className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic text-slate-800 dark:text-white">
            <span className="text-emerald-500">eco</span>loop
          </span>
          <button className="ml-auto text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        <div className="flex-1 px-6 space-y-8 overflow-y-auto pb-8">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-4">General</p>
            <div className="space-y-1">
              <SidebarItem label="Dashboard" icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>} active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
              <SidebarItem label="Manage Users" icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4-4v2" /></svg>} active={activeTab === 'Manage Users'} onClick={() => setActiveTab('Manage Users')} />
              <SidebarItem label="Manage Orders" icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><line x1="3" x2="21" y1="6" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>} active={activeTab === 'Manage Orders'} onClick={() => setActiveTab('Manage Orders')} />
              <SidebarItem label="Payment Status" icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" /><path d="M16 14h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /></svg>} active={activeTab === 'Payment Status'} onClick={() => setActiveTab('Payment Status')} />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <button onClick={() => go('home')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/10 transition-all duration-200 group">
            <span className="text-xl group-hover:scale-110 transition-transform">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
            </span>
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-500">

        {/* Header */}
        <header className="h-20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/20 px-10 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 rounded-2xl px-5 py-2.5 w-full max-w-md focus-within:ring-2 ring-emerald-500/20 transition-all">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-slate-400">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium w-full text-slate-600 dark:text-slate-300 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-slate-200 dark:border-slate-700 pr-6 uppercase text-[11px] font-black tracking-widest text-slate-400">
              <button className="hover:text-emerald-500 transition-colors">En</button>
              <button className="hover:text-emerald-500 transition-colors">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m0-12.728.707.707m11.314 11.314.707.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" /></svg>
              </button>
              <button className="hover:text-emerald-500 transition-colors relative">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
            </div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-xs font-black text-slate-800 dark:text-white leading-none">Mahfuzul!</p>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-sm border border-slate-200 dark:border-slate-700 group-hover:border-emerald-500 transition-colors">
                M
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Body */}
        <div className="p-10 space-y-10 overflow-x-hidden">

          {activeTab === 'Dashboard' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Welcome Back, Mahfuzul!</h2>
                  <p className="text-slate-500 font-medium text-sm mt-1">Here's what happening with your store today.</p>
                </div>
                <div className="flex gap-3">
                  <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-2.5 text-xs font-bold shadow-sm outline-none cursor-pointer">
                    <option>Previous Year</option>
                  </select>
                  <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-slate-900/20 active:scale-95 transition-all">
                    View All Time
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-slate-800 p-8 rounded-[36px] shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative z-10 flex flex-col gap-4">
                      <p className="text-sm font-bold text-slate-400">{stat.label}</p>
                      <h3 className="text-3xl font-black tracking-tighter text-slate-800 dark:text-white">{stat.value}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center gap-0.5 text-[10px] font-black px-2 py-1 rounded-full ${stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                          {stat.positive ? '↑' : '↓'} {stat.change}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">vs last week</span>
                      </div>
                    </div>
                    {/* Background blob */}
                    <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${stat.positive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  </motion.div>
                ))}
              </div>

              {/* Chart & Top Products */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Summary Chart Card */}
                <div className="lg:col-span-8 bg-white dark:bg-slate-800 p-10 rounded-[48px] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Summary</h3>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></div>
                        <span className="text-xs font-bold text-slate-500">Income</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                        <span className="text-xs font-bold text-slate-500">Order</span>
                      </div>
                      <select className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest cursor-pointer">
                        <option>Last 7 days</option>
                      </select>
                    </div>
                  </div>

                  <LineGraph />
                </div>

                {/* Most Selling Products */}
                <div className="lg:col-span-4 bg-white dark:bg-slate-800 p-10 rounded-[48px] shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-bold tracking-tight">Most Selling Products</h3>
                    <button className="text-slate-400 hover:text-slate-900 transition-colors">??</button>
                  </div>
                  <div className="space-y-8">
                    {TOP_PRODUCTS.map((prod, i) => (
                      <div key={i} className="flex items-center gap-5 group cursor-pointer">
                        <div className="w-16 h-16 rounded-[24px] bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-3xl transition-transform group-hover:scale-105">
                          {prod.img}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-sm truncate uppercase tracking-tight">{prod.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">ID: {prod.id}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-black text-slate-800 dark:text-white uppercase">{prod.sales}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Sales</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders & Weekly Top Customers */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10">

                {/* Recent Orders Table */}
                <div className="xl:col-span-8 bg-white dark:bg-slate-800 p-10 rounded-[48px] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-bold tracking-tight">Recent Orders</h3>
                    <button className="text-emerald-500 font-extrabold text-xs uppercase tracking-widest hover:underline transition-all">View All</button>
                  </div>
                  <div className="overflow-x-auto -mx-2">
                    <table className="w-full text-left min-w-[500px]">
                      <thead>
                        <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                          <th className="px-3 pb-6">Product</th>
                          <th className="px-3 pb-6">Customer</th>
                          <th className="px-3 pb-6">Order ID</th>
                          <th className="px-3 pb-6">Date</th>
                          <th className="px-3 pb-6">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-bold divide-y divide-slate-100 dark:divide-slate-800">
                        {users.slice(0, 5).map((u, i) => (
                          <tr key={u.id || i} className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                            <td className="px-3 py-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-lg text-emerald-500 font-black">
                                  {u.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <span className="text-slate-600 dark:text-slate-300">Device Recycling</span>
                              </div>
                            </td>
                            <td className="px-3 py-6">
                              <span className="text-emerald-500">{u.name}</span>
                            </td>
                            <td className="px-3 py-6 text-slate-400">#{1000 + (u.id || i)}</td>
                            <td className="px-3 py-6 text-slate-400 font-medium">{u.date ? new Date(u.date).toLocaleDateString() : 'Recent'}</td>
                            <td className="px-3 py-6">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100/50 text-emerald-600`}>
                                <div className={`w-1.5 h-1.5 rounded-full bg-emerald-500`} />
                                {u.status || 'Active'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Weekly Top Customers */}
                <div className="xl:col-span-4 bg-white dark:bg-slate-800 p-10 rounded-[48px] shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-bold tracking-tight">Weekly Top Customers</h3>
                    <button className="text-slate-400 hover:text-slate-900 transition-colors">??</button>
                  </div>
                  <div className="space-y-8">
                    {WEEKLY_CUSTOMERS.map((cust, i) => (
                      <div key={i} className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-black text-emerald-500 shadow-sm border-2 border-slate-50 dark:border-slate-800">
                          {cust.img}
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-sm uppercase tracking-tight">{cust.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 tracking-wide">{cust.orders} Orders</p>
                        </div>
                        <button className="text-[10px] font-black uppercase text-emerald-500 hover:underline">View</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Manage Users' && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-800 rounded-[48px] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-all duration-500">
               <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-6 bg-slate-50/30 dark:bg-slate-900/10">
                  <div>
                     <h3 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">User Management</h3>
                     <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-[0.2em]">Manage your platform's user base</p>
                  </div>
                  <div className="flex gap-4">
                     <button 
                       onClick={handleCreateUser}
                       className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.15em] shadow-lg shadow-emerald-500/25 hover:translate-y-[-2px] active:scale-95 transition-all"
                     >
                       + Add New User
                     </button>
                  </div>
               </div>
               {loading ? (
                 <div className="p-24 text-center">
                   <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-6"></div>
                   <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Syncing with database...</p>
                 </div>
               ) : (
                 <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                     <thead>
                       <tr className="bg-slate-50/80 dark:bg-slate-900/80 text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                         <th className="px-10 py-6">Identity</th>
                         <th className="px-10 py-6">Mobile Number</th>
                         <th className="px-10 py-6">System Privileges</th>
                         <th className="px-10 py-6">Account Status</th>
                         <th className="px-10 py-6 text-right">Operations</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                       {filteredUsers.length === 0 ? (
                         <tr>
                           <td colSpan="5" className="px-10 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No records found in database</td>
                         </tr>
                       ) : (
                         filteredUsers.map((user, i) => (
                           <tr key={user.id || i} className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 transition-all duration-300">
                             <td className="px-10 py-8">
                               <div className="flex items-center gap-5">
                                 <div className="w-12 h-12 rounded-[20px] bg-slate-900 text-white flex items-center justify-center font-black shadow-lg shadow-slate-900/20 group-hover:bg-emerald-500 transition-colors">
                                   {user.name?.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() || 'U'}
                                 </div>
                                 <div>
                                   <p className="font-black text-sm uppercase tracking-tight text-slate-800 dark:text-white">{user.name || 'Anonymous'}</p>
                                   <p className="text-xs font-bold text-slate-400 mt-0.5">{user.email}</p>
                                 </div>
                               </div>
                             </td>
                             <td className="px-10 py-8">
                               <span className="font-bold text-sm text-slate-600 dark:text-slate-400 font-inter">
                                 {user.mobile_no || user.phone || '—'}
                               </span>
                             </td>
                             <td className="px-10 py-8">
                               <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-700/50 px-4 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                                 {user.role || 'USER'}
                               </span>
                             </td>
                             <td className="px-10 py-8">
                               <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase px-4 py-2 rounded-full ${user.status === 'INACTIVE' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                 <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'INACTIVE' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                                 {user.status || 'ACTIVE'}
                               </span>
                             </td>
                             <td className="px-10 py-8 text-right">
                                 <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                   <button className="p-3 rounded-2xl bg-white dark:bg-slate-700 text-slate-400 hover:text-emerald-500 transition-all hover:shadow-xl border border-slate-100 dark:border-slate-600">
                                     <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                   </button>
                                   <button 
                                     onClick={() => handleDeleteUser(user.id)}
                                     className="p-3 rounded-2xl bg-white dark:bg-slate-700 text-slate-400 hover:text-red-500 transition-all hover:shadow-xl border border-slate-100 dark:border-slate-600"
                                   >
                                     <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                   </button>
                                 </div>
                             </td>
                           </tr>
                         ))
                       )}
                     </tbody>
                   </table>
                 </div>
               )}
            </motion.div>
          )}

          {activeTab === 'Manage Orders' && (
             <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-800 rounded-[48px] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-all duration-500">
               <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-6 bg-slate-50/30 dark:bg-slate-900/10">
                  <div>
                     <h3 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Order Management</h3>
                     <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-[0.2em]">Approve pickups to instantly fund the Eco Wallet</p>
                  </div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-slate-50/80 dark:bg-slate-900/80 text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                       <th className="px-10 py-6">Order ID</th>
                       <th className="px-10 py-6">Customer</th>
                       <th className="px-10 py-6">Device</th>
                       <th className="px-10 py-6">Amount</th>
                       <th className="px-10 py-6">Status</th>
                       <th className="px-10 py-6 text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                     {orders.length === 0 ? (
                       <tr>
                         <td colSpan="6" className="px-10 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No pending orders found</td>
                       </tr>
                     ) : (
                       orders.map((o, i) => (
                         <tr key={o.id || i} className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 transition-all duration-300">
                           <td className="px-10 py-8 font-black text-sm text-slate-800 dark:text-white">{o.id}</td>
                           <td className="px-10 py-8 font-bold text-slate-600 dark:text-slate-300">{o.customer}</td>
                           <td className="px-10 py-8 font-bold text-slate-600 dark:text-slate-300">{o.device}</td>
                           <td className="px-10 py-8 font-black text-emerald-500">₹{o.amount?.toLocaleString()}</td>
                           <td className="px-10 py-8">
                             <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase px-4 py-2 rounded-full ${o.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                               <div className={`w-1.5 h-1.5 rounded-full ${o.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                               {o.status}
                             </span>
                           </td>
                           <td className="px-10 py-8 text-right">
                             {o.status === 'Pending' ? (
                               <button 
                                 onClick={() => handleApproveOrder(o.id)}
                                 className="bg-emerald-500 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                               >
                                 Approve
                               </button>
                             ) : (
                               <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Approved</span>
                             )}
                           </td>
                         </tr>
                       ))
                     )}
                   </tbody>
                 </table>
               </div>
             </motion.div>
          )}

          {activeTab === 'Payment Status' && (
             <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-800 rounded-[48px] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-all duration-500">
               <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-6 bg-slate-50/30 dark:bg-slate-900/10">
                  <div>
                     <h3 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Payment Management</h3>
                     <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-[0.2em]">Process payments to fund Eco Wallets</p>
                  </div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-slate-50/80 dark:bg-slate-900/80 text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                       <th className="px-10 py-6">Order ID</th>
                       <th className="px-10 py-6">Customer</th>
                       <th className="px-10 py-6">Amount</th>
                       <th className="px-10 py-6">Order Status</th>
                       <th className="px-10 py-6">Payment</th>
                       <th className="px-10 py-6 text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                     {orders.length === 0 ? (
                       <tr>
                         <td colSpan="6" className="px-10 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No orders available for payment</td>
                       </tr>
                     ) : (
                       orders.map((o, i) => {
                         const isPaid = o.paymentStatus === 'Paid';
                         const canPay = o.status === 'Approved' && !isPaid;
                         return (
                           <tr key={o.id || i} className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 transition-all duration-300">
                             <td className="px-10 py-8 font-black text-sm text-slate-800 dark:text-white">{o.id}</td>
                             <td className="px-10 py-8 font-bold text-slate-600 dark:text-slate-300">{o.customer}</td>
                             <td className="px-10 py-8 font-black text-emerald-500">₹{o.amount?.toLocaleString()}</td>
                             <td className="px-10 py-8">
                               <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase px-4 py-2 rounded-full ${o.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                 {o.status || 'Pending'}
                               </span>
                             </td>
                             <td className="px-10 py-8">
                               <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase px-4 py-2 rounded-full ${isPaid ? 'bg-indigo-100 text-indigo-600' : 'bg-amber-100 text-amber-600'}`}>
                                 <div className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-indigo-500' : 'bg-amber-500'}`} />
                                 {isPaid ? 'Paid' : 'Unpaid'}
                               </span>
                             </td>
                             <td className="px-10 py-8 text-right">
                               {isPaid ? (
                                 <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Paid ✅</span>
                               ) : canPay ? (
                                 <button 
                                   onClick={() => handleProcessPayment(o.id, o.amount)}
                                   className="bg-indigo-500 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20"
                                 >
                                   Pay Now
                                 </button>
                               ) : (
                                 <span className="text-slate-400 font-bold text-xs uppercase tracking-widest opacity-50">Wait for Approval</span>
                               )}
                             </td>
                           </tr>
                         )
                       })
                     )}
                   </tbody>
                 </table>
               </div>
             </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
