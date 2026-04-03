import { useLanguage } from '../context/LanguageContext'
import { getLanguageName, getAllLanguages } from '../utils/languageHelpers'

/**
 * Example Language Settings Component
 * 
 * This component demonstrates how to:
 * 1. Use the useLanguage hook to access language context
 * 2. Display current language information
 * 3. Access all available languages
 * 4. Programmatically change language
 * 
 * This is a reference implementation - integrate similar patterns into your pages.
 */

export default function LanguageSettingsExample() {
  const { currentLanguage, changeLanguage, isChanging, languages } = useLanguage()

  const handleQuickLanguageSwitch = (code) => {
    changeLanguage(code)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-lg">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Language Settings
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Change your preferred language. Your selection will be saved automatically.
          </p>
        </div>

        {/* Current Language Display */}
        <div className="bg-eco-50 dark:bg-eco-900/20 rounded-xl p-4 mb-6 border border-eco-200 dark:border-eco-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Current Language</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-eco-600 dark:text-eco-400">
                {getLanguageName(currentLanguage)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                Language code: <code className="bg-white dark:bg-slate-700 px-2 py-1 rounded">{currentLanguage}</code>
              </p>
            </div>
            {isChanging && (
              <div className="flex items-center gap-2 text-eco-600">
                <div className="w-5 h-5 border-2 border-eco-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Translating...</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Language Switch */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Quick Switch
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleQuickLanguageSwitch(lang.code)}
                disabled={isChanging}
                className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium disabled:opacity-60 disabled:cursor-not-allowed
                  ${currentLanguage === lang.code
                    ? 'bg-eco-600 border-eco-600 text-white shadow-lg shadow-eco-600/30'
                    : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-eco-400 hover:bg-eco-50 dark:hover:bg-slate-600'
                  }`}
              >
                <div className="text-lg mb-1">{lang.flag}</div>
                <div className="text-xs">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Available Languages Table */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            All Available Languages
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 px-3 text-slate-700 dark:text-slate-300 font-semibold">Language</th>
                  <th className="text-left py-2 px-3 text-slate-700 dark:text-slate-300 font-semibold">Code</th>
                  <th className="text-left py-2 px-3 text-slate-700 dark:text-slate-300 font-semibold">Region</th>
                  <th className="text-center py-2 px-3 text-slate-700 dark:text-slate-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {languages.map((lang) => (
                  <tr
                    key={lang.code}
                    className={`border-b border-slate-100 dark:border-slate-700 transition-colors
                      ${currentLanguage === lang.code
                        ? 'bg-eco-50 dark:bg-eco-900/20'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                  >
                    <td className="py-3 px-3">
                      <span className="text-lg mr-2">{lang.flag}</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{lang.name}</span>
                    </td>
                    <td className="py-3 px-3">
                      <code className="bg-slate-100 dark:bg-slate-600 px-2 py-1 rounded text-slate-700 dark:text-slate-300 text-xs">
                        {lang.code}
                      </code>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{lang.region}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleQuickLanguageSwitch(lang.code)}
                        disabled={isChanging}
                        className={`text-xs font-semibold px-3 py-1 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                          ${currentLanguage === lang.code
                            ? 'bg-eco-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-eco-600 hover:text-white'
                          }`}
                      >
                        {currentLanguage === lang.code ? 'Active' : 'Select'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-300">
            <strong>💡 Tip:</strong> Your language preference is automatically saved and will be restored when you visit again.
          </p>
        </div>
      </div>

      {/* Demo Section */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-lg">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
          Translatable Content Demo
        </h3>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          This text will be automatically translated to your selected language. Try selecting different languages 
          above and watch this section update (may take 1-2 seconds for translation to complete).
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
          ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  )
}
