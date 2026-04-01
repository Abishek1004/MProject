/**
 * Breadcrumb navigation bar
 * items: Array of { l: label, p: page (optional), nav: extra nav (optional) }
 */
export default function Breadcrumb({ items, go }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-7 text-sm text-slate-400">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-slate-300">/</span>}
          {item.p ? (
            <button
              onClick={() => go(item.p, item.nav || {})}
              className="text-eco-600 font-semibold hover:text-eco-700 transition-colors bg-transparent border-none cursor-pointer p-0 font-inter text-sm"
            >
              {item.l}
            </button>
          ) : (
            <span className="text-slate-700 font-semibold">{item.l}</span>
          )}
        </span>
      ))}
    </div>
  )
}
