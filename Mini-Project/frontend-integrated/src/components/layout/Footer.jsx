import ImgF from '../ui/ImgF'
import logo from '../../assets/img/logo.png';
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white/40 py-9 px-5 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <img 
  src={logo} 
  alt="logo"
  style={{ width: "50px", height: "50px", objectFit: "contain", background: "transparent" ,margin: "2px 0 0 0", padding: "0" }}
/>
        <span className="font-montserrat font-extrabold text-white text-lg">
          <span className="text-eco-400">Eco</span>Loop
        </span>
      </div>
      <p className="text-xs">
        © 2026 EcoLoop. All rights reserved. Making e-waste recycling simple &amp; rewarding.
      </p>
    </footer>
  )
}
