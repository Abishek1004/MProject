import React from 'react';
import logo from '../../assets/img/logo.png';

export default function Footer() {
  const socialLinks = [
    {
      name: 'Facebook',
      url: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
      hoverColor: 'hover:text-[#1877F2]'
    },
    {
      name: 'X',
      url: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
        </svg>
      ),
      hoverColor: 'hover:text-white hover:bg-black p-1 rounded-sm'
    },
    {
      name: 'Instagram',
      url: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      hoverColor: 'hover:text-[#E4405F]'
    }
  ];

  const footerSections = [
    {
      title: 'Get to Know Us',
      links: ['About EcoLoop', 'Careers', 'Press Releases', 'EcoLoop Science']
    },
    {
      title: 'Connect with Us',
      type: 'social'
    },
    {
      title: 'Make Money with Us',
      links: [
        'Sell on EcoLoop',
        'Partner Program',
        'Build Your Brand',
        'EcoLoop Global Selling'
      ]
    },
    {
      title: 'Let Us Help You',
      links: ['Your Account', 'Returns Centre', 'Recycling Guide', 'Help']
    }
  ];

  return (
    <footer className="bg-[#131921] text-white pt-16 pb-8 px-6 md:px-20 font-sans tracking-tight relative z-10">
      {/* Top Multi-column Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-gray-700 pb-12">
        {footerSections.map((section, idx) => (
          <div key={idx} className="flex flex-col space-y-4">
            <h3 className="font-bold text-lg mb-2">{section.title}</h3>
            {section.type === 'social' ? (
              <div className="flex flex-col space-y-4">
                {socialLinks.map((social, sIdx) => (
                  <a
                    key={sIdx}
                    href={social.url}
                    className={`flex items-center gap-3 text-slate-400 transition-all duration-300 transform hover:scale-105 ${social.hoverColor}`}
                  >
                    {social.icon}
                    <span className="text-sm font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            ) : (
              <ul className="flex flex-col space-y-2">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white hover:underline text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Brand & Identity Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="EcoLoop Logo"
            className="w-12 h-12 object-contain brightness-110"
          />
          <span className="font-montserrat font-black text-2xl tracking-tighter">
            <span className="text-emerald-500">Eco</span>
            <span className="text-white">Loop</span>
          </span>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-2">
          <p className="text-xs text-slate-500 text-center md:text-right max-w-md italic">
            "Making e-waste recycling simple & rewarding for a greener tomorrow."
          </p>
          <div className="flex gap-6 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy Notice</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Cookies Policy</a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="mt-12 text-center border-t border-gray-800 pt-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">
          © 2026 EcoLoop Inc. All rights reserved. | Designed for a Sustainable Future
        </p>
      </div>
    </footer>
  );
}
