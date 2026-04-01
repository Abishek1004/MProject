import { motion } from 'framer-motion'
import { CATEGORIES, getCompanies } from '../data'
import BackButton from '../components/ui/BackButton'
import ImgF from '../components/ui/ImgF'
import { staggerContainer, fadeUp } from '../utils/motion'

function CompanyCard({ company, catColor, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-5 flex flex-col items-center gap-2.5 cursor-pointer border-none"
      style={{ border: '2px solid #e2e8f0' }}
      variants={fadeUp}
      whileHover={{
        y: -5,
        borderColor: catColor,
        boxShadow: `0 10px 28px ${catColor}22`,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
        <ImgF src={company.logo} alt={company.name}
          style={{ width:48, height:48, objectFit:'contain' }}
          fallback={<span className="text-3xl">{company.emoji}</span>} />
      </div>
      <div className="text-center">
        <p className="font-poppins font-bold text-[0.95rem] text-slate-800">{company.name}</p>
        <p className="text-slate-400 text-[11px] mt-0.5 font-inter">{company.tagline}</p>
      </div>
    </motion.button>
  )
}

export default function CompaniesPage({ nav, go, goBack, canGoBack }) {
  const cat       = CATEGORIES.find((c) => c.id === nav.category)
  const companies = getCompanies(nav.category)

  return (
    <div>
      <motion.div
        className="px-5 py-12 relative overflow-hidden"
        style={{ background:`linear-gradient(135deg,${cat?.color}dd,${cat?.color}99)` }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
      >
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
          style={{ background:'#fff', opacity:0.06, filter:'blur(40px)' }} />
        <div className="max-w-[1200px] mx-auto relative flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl flex-shrink-0">{cat?.emoji}</div>
          <div>
            <p className="text-white/70 text-sm font-inter font-semibold mb-1 uppercase tracking-widest">Select Brand</p>
            <h1 className="font-poppins font-extrabold text-white text-3xl">{cat?.name} Brands</h1>
            <p className="text-white/70 font-inter text-sm mt-1">{cat?.count} available</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-5 pt-7 pb-20">
        <BackButton goBack={goBack} canGoBack={canGoBack} label={cat?.name || 'Back'} />
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} catColor={cat?.color}
              onClick={() => go('models', { company: company.id })} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
