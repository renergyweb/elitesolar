'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = () => {
    window.dispatchEvent(new CustomEvent('open-solar-modal'));
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <div className="relative w-56 h-16 md:w-72 md:h-20 transition-transform group-hover:scale-105">
            <Image 
              src={isScrolled ? 'https://i.postimg.cc/rpMwNQ22/renergy-logotipo-blanco.webp' : 'https://i.postimg.cc/bwFyc87p/renergy-logotipo.webp'} 
              alt="Renergy" 
              fill 
              className="object-contain object-left" 
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center gap-8 font-medium text-sm ${isScrolled ? 'text-emerald-50' : 'text-slate-600'}`}>
          <Link href="#servicios" className={`transition-colors ${isScrolled ? 'hover:text-white' : 'hover:text-emerald-600'}`}>Servicios</Link>
          <Link href="#beneficios" className={`transition-colors ${isScrolled ? 'hover:text-white' : 'hover:text-emerald-600'}`}>Beneficios</Link>
          <Link href="#como-funciona" className={`transition-colors ${isScrolled ? 'hover:text-white' : 'hover:text-emerald-600'}`}>Cómo Funciona</Link>
          <Link href="#testimonios" className={`transition-colors ${isScrolled ? 'hover:text-white' : 'hover:text-emerald-600'}`}>Testimonios</Link>
          <Link href="#faq" className={`transition-colors ${isScrolled ? 'hover:text-white' : 'hover:text-emerald-600'}`}>FAQ</Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer" className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm ${isScrolled ? 'bg-white text-emerald-700 hover:bg-emerald-50' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}>
            Cotizar 
          </a>
          <button className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-white hover:bg-white/20' : 'text-slate-600 hover:bg-slate-100'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg p-6 flex flex-col gap-4 font-medium text-slate-700">
          <Link href="#servicios" className="p-2 hover:bg-slate-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Servicios</Link>
          <Link href="#beneficios" className="p-2 hover:bg-slate-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Beneficios</Link>
          <Link href="#como-funciona" className="p-2 hover:bg-slate-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Cómo Funciona</Link>
          <Link href="#testimonios" className="p-2 hover:bg-slate-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Testimonios</Link>
          <Link href="#faq" className="p-2 hover:bg-slate-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
          <a href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3 rounded-lg font-medium mt-2 shadow-sm">
            Cotizar ahora
          </a>
        </div>
      )}
    </header>
  );
}
