// ─── Re-export from separate files ───────────────────────────────────────────
export { CATEGORIES, getCategory }                        from './categories'
export { COMPANIES, getCompanies, getCompany }            from './companies'
export { DEVICES, getDevices, getRamOptions, getStorageOptions } from './devices'
export { STEPS }                                          from './steps'

// ─── Flat search index (built once at import time) ────────────────────────────
import { CATEGORIES } from './categories'
import { COMPANIES }  from './companies'
import { DEVICES }    from './devices'

export function buildSearchIndex() {
  const results = []
  for (const [key, modelList] of Object.entries(DEVICES)) {
    const [categoryId, companyId] = key.split('_')
    const category = CATEGORIES.find((c) => c.id === categoryId)
    const company  = COMPANIES.find((c) => c.categoryId === categoryId && c.id === companyId)
    if (!category || !company) continue
    for (const model of modelList) {
      for (const variant of model.variants) {
        results.push({
          variantName:    variant.name,
          variantBase:    variant.base,
          ramOptions:     variant.ramOptions,
          storageOptions: variant.storageOptions,
          modelId:        model.id,
          modelName:      model.name,
          companyId,
          companyName:    company.name,
          companyEmoji:   company.emoji,
          categoryId,
          categoryName:   category.name,
          categoryEmoji:  category.emoji,
          categoryColor:  category.color,
        })
      }
    }
  }
  return results
}

export const SEARCH_INDEX = buildSearchIndex()
