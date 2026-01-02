import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const VistaTravel = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // === KONFIGURASI WHATSAPP ===
  const waNumber = "6282181963893"; // Ganti dengan nomor WA Anda (Format: 628xxx)

  const handleWhatsApp = (message) => {
    const text = encodeURIComponent(message || "Halo Admin Vista Travel, saya ingin tanya paket wisata.");
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  // Logic Scroll Navbar Background
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobileMenuOpen) {
        setIsScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Logic Lock Body Scroll (Saat menu mobile terbuka)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  // Logic Smooth Scroll ke Section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Beranda', id: 'home' },
    { name: 'Tentang Kami', id: 'about' },
    { name: 'Layanan', id: 'services' },
    { name: 'Paket Wisata', id: 'packages' },
  ];

  return (
    <div className="font-['Plus_Jakarta_Sans'] text-slate-800 bg-white selection:bg-cyan-200 selection:text-cyan-900">
      
      {/* ================= 1. NAVBAR ================= */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'bg-white shadow-none py-4' 
            : isScrolled 
              ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
              : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
          
          {/* Logo */}
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => scrollToSection('home')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 transition-colors duration-300 ${isMobileMenuOpen || isScrolled ? 'text-cyan-500' : 'text-white'}`}>
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
            <span className={`font-['Outfit'] text-2xl font-bold tracking-tight transition-colors duration-300 ${isMobileMenuOpen || isScrolled ? 'text-slate-800' : 'text-white'}`}>
              Vista Travel<span className="text-cyan-400">.</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex gap-8 font-medium text-sm tracking-wide ${isScrolled ? 'text-slate-600' : 'text-white'}`}>
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => scrollToSection(item.id)}
                className="hover:text-cyan-400 transition-colors duration-300 uppercase font-semibold relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button 
              onClick={() => handleWhatsApp("Halo, saya ingin tanya paket wisata.")}
              className={`px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-cyan-500/30 ${isScrolled ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'bg-white text-cyan-600 hover:bg-cyan-50'}`}
            >
              Hubungi Kami
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button className="md:hidden relative z-50 p-2 -mr-2 focus:outline-none transition-transform active:scale-95" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div className="relative w-8 h-8 flex items-center justify-center">
              <span className={`absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                <Menu size={32} className={isScrolled ? 'text-slate-800' : 'text-white'} />
              </span>
              <span className={`absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
                <X size={32} className="text-slate-800" />
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'}`} style={{ top: '0', height: '100vh' }}>
           <div className="flex flex-col items-center gap-6 w-full px-6">
             {navItems.map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => scrollToSection(item.id)} 
                  className="w-full text-center py-3 text-2xl font-bold font-['Outfit'] text-slate-800 hover:text-cyan-500 border-b border-slate-100"
                >
                  {item.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  handleWhatsApp("Halo, saya ingin tanya paket wisata.");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-4 py-4 rounded-xl bg-cyan-500 text-white font-bold text-lg shadow-lg"
              >
                Hubungi Kami
              </button>
           </div>
        </div>
      </nav>

      {/* ================= 2. HERO SECTION ================= */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=2000&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 via-black/40 to-black/30 z-0"></div>
        <div className="relative z-10 container mx-auto px-6 text-center mt-12">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-cyan-200 font-semibold tracking-wider text-xs md:text-sm uppercase">The Best Travel Agent in Bali</span>
          </div>
          <h1 className="font-['Outfit'] text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-white drop-shadow-2xl">
            Explore <span className="text-cyan-300">Bali</span> <br /> Beyond Limits
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow-md">
            Nikmati keindahan Pulau Dewata dengan kenyamanan dan pengalaman tak terlupakan bersama Vista Travel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => handleWhatsApp("Halo, saya ingin pesan paket wisata dari Website.")} 
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] transform hover:-translate-y-1 border border-transparent"
            >
              Pesan Sekarang
            </button>
            <button 
              onClick={() => scrollToSection('packages')} 
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm"
            >
              Lihat Paket Tour
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 w-full z-20">
            <svg className="w-full h-16 md:h-32 fill-white" viewBox="0 0 1440 320" preserveAspectRatio="none"><path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
      </section>

      {/* ================= 3. ABOUT US SECTION ================= */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 transform hover:scale-[1.02] transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop" alt="Pura Ulun Danu Bali" className="w-full h-auto object-cover"/>
              </div>
              <div className="absolute -bottom-10 -right-10 z-20 w-3/5 rounded-3xl overflow-hidden border-8 border-white shadow-xl">
                <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop" alt="Turis Menikmati Bali" className="w-full h-full object-cover"/>
              </div>
              <div className="absolute -top-8 -left-8 z-0">
                <div className="w-32 h-32 bg-cyan-100 rounded-full blur-2xl opacity-60"></div>
              </div>
            </div>
            <div className="md:pl-10 mt-16 md:mt-0">
              <span className="text-cyan-500 font-bold tracking-wider uppercase text-sm mb-2 block">Tentang Vista Travel</span>
              <h2 className="font-['Outfit'] text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Jelajahi Surga Bali dengan <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Rasa Nyaman & Aman</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Berdiri sejak 2020, Vista Travel hadir untuk menjadikan liburan Anda di Bali bukan sekadar perjalanan, tapi sebuah kenangan abadi. Kami mengutamakan pelayanan personal, armada bersih, dan itinerary fleksibel.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Layanan Terpercaya", desc: "Legalitas resmi dan tim profesional." },
                  { title: "Harga Transparan", desc: "Tanpa biaya tersembunyi, jelas di awal." },
                  { title: "Pengalaman Terbaik", desc: "Ribuan tamu puas dengan layanan kami." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                    <div><h3 className="font-['Outfit'] font-bold text-slate-800 text-lg">{item.title}</h3><p className="text-slate-500 text-sm">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. LAYANAN KAMI SECTION ================= */}
      <section id="services" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-500 font-bold tracking-wider uppercase text-sm mb-2 block">Layanan Kami</span>
            <h2 className="font-['Outfit'] text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
              Solusi Perjalanan <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Lengkap & Profesional</span>
            </h2>
            <p className="text-slate-600 text-lg">Kami menyediakan 6 layanan utama untuk memastikan pengalaman liburan terbaik Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", title: "Wisata Domestik", desc: "Jelajahi destinasi terbaik di Indonesia seperti Bali, Labuan Bajo, Sumba, dan Raja Ampat.", color: "text-cyan-500", bg: "bg-cyan-50", hover: "group-hover:bg-cyan-500" },
              { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Wisata Internasional", desc: "Paket tour luar negeri bebas repot ke Jepang, Thailand, Eropa, dan negara lainnya.", color: "text-blue-500", bg: "bg-blue-50", hover: "group-hover:bg-blue-500" },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: "Private & Open Trip", desc: "Pilih privasi maksimal bersama keluarga atau gabung Open Trip untuk hemat.", color: "text-orange-500", bg: "bg-orange-50", hover: "group-hover:bg-orange-500" },
              { icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", title: "Sewa Mobil & Bus", desc: "Sewa City Car, Hiace, hingga Bus Pariwisata. Unit bersih dan driver ramah.", color: "text-green-500", bg: "bg-green-50", hover: "group-hover:bg-green-500" },
              { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", title: "Voucher Hotel & Villa", desc: "Harga kontrak spesial untuk hotel bintang 3-5 dan Private Villa di Bali.", color: "text-purple-500", bg: "bg-purple-50", hover: "group-hover:bg-purple-500" },
              { icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Corporate Gathering", desc: "EO untuk acara kantor, Outbound, Meeting, atau Family Gathering perusahaan.", color: "text-yellow-600", bg: "bg-yellow-50", hover: "group-hover:bg-yellow-500" },
            ].map((s, i) => (
              <div key={i} className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-xl ${s.bg} flex items-center justify-center ${s.color} ${s.hover} group-hover:text-white transition-all duration-300 mb-6`}>
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.icon}></path></svg>
                </div>
                <h3 className={`font-['Outfit'] text-xl font-bold text-slate-800 mb-3 group-hover:text-cyan-600 transition-colors`}>{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. PAKET WISATA UNGGULAN ================= */}
      <section id="packages" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <span className="text-cyan-500 font-bold tracking-wider uppercase text-sm mb-2 block">Best Seller Packages</span>
             <h2 className="font-['Outfit'] text-4xl md:text-5xl font-bold text-slate-900">Destinasi Paling <span className="text-cyan-500">Favorit</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Bali */}
            <div className="group rounded-3xl overflow-hidden bg-white shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop" alt="Bali" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">4D3N</div>
              </div>
              <div className="p-8">
                <h3 className="font-['Outfit'] text-2xl font-bold text-slate-900 mb-2">Bali Explorer</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                  <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Nusa Penida, Ubud, Kintamani
                </div>
                <div className="space-y-2 mb-6">
                  {['Hotel Bintang 4', 'Transport Private', 'Tiket Wisata & Makan'].map((f,i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {f}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
                   <div>
                     <p className="text-xs text-slate-400">Mulai dari</p>
                     <p className="text-xl font-bold text-cyan-600">Rp 2.500.000</p>
                   </div>
                   <button 
                    onClick={() => handleWhatsApp("Halo, saya mau booking paket Bali Explorer 4D3N")} 
                    className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-cyan-500 transition-colors"
                   >
                    Pesan Sekarang
                   </button>
                </div>
              </div>
            </div>

            {/* Card 2: Labuan Bajo (LINK IMAGE BARU) */}
            <div className="group rounded-3xl overflow-hidden bg-white shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1596423736783-cd55ce857c24?q=80&w=1000&auto=format&fit=crop" alt="Labuan Bajo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">3D2N</div>
              </div>
              <div className="p-8">
                <h3 className="font-['Outfit'] text-2xl font-bold text-slate-900 mb-2">Labuan Bajo Sailing</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                  <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Padar Island, Komodo, Pink Beach
                </div>
                <div className="space-y-2 mb-6">
                  {['Phinisi AC Cabin', 'Full Meals & Snack', 'Dokumentasi Drone'].map((f,i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {f}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
                   <div>
                     <p className="text-xs text-slate-400">Mulai dari</p>
                     <p className="text-xl font-bold text-cyan-600">Rp 3.200.000</p>
                   </div>
                   <button 
                    onClick={() => handleWhatsApp("Halo, saya mau booking paket Labuan Bajo Sailing")} 
                    className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-cyan-500 transition-colors"
                   >
                    Pesan Sekarang
                   </button>
                </div>
              </div>
            </div>

            {/* Card 3: Thailand */}
            <div className="group rounded-3xl overflow-hidden bg-white shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800&auto=format&fit=crop" alt="Thailand" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">4D3N</div>
              </div>
              <div className="p-8">
                <h3 className="font-['Outfit'] text-2xl font-bold text-slate-900 mb-2">Bangkok Pattaya</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                  <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Wat Arun, Great Palace, Pattaya
                </div>
                <div className="space-y-2 mb-6">
                  {['Tiket Pesawat PP', 'Hotel Bintang 3', 'Indonesian Guide'].map((f,i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {f}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
                   <div>
                     <p className="text-xs text-slate-400">Mulai dari</p>
                     <p className="text-xl font-bold text-cyan-600">Rp 4.500.000</p>
                   </div>
                   <button 
                    onClick={() => handleWhatsApp("Halo, saya mau booking paket Bangkok Pattaya")} 
                    className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-cyan-500 transition-colors"
                   >
                    Pesan Sekarang
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. KEUNGGULAN (WHY CHOOSE US) ================= */}
      <section className="py-24 bg-cyan-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px"}}></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <span className="text-cyan-400 font-bold tracking-wider uppercase text-sm mb-2 block">Mengapa Kami?</span>
                <h2 className="font-['Outfit'] text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                  Liburan Tanpa Drama <br/> Bersama Partner Terpercaya
                </h2>
                <p className="text-cyan-100 text-lg mb-8 leading-relaxed">
                  Kami memastikan setiap detail perjalanan Anda terencana dengan sempurna, sehingga Anda bisa fokus menikmati momen berharga.
                </p>
                <button 
                  onClick={() => handleWhatsApp("Halo, saya ingin konsultasi liburan.")}
                  className="bg-cyan-500 text-white px-8 py-3 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/30"
                >
                  Hubungi Kami
                </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Tim Berpengalaman", desc: "Didukung oleh tim profesional & guide lokal ahli." },
                  { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Harga Transparan", desc: "Tidak ada biaya tersembunyi, semua jujur di awal." },
                  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Legal & Aman", desc: "Perusahaan resmi berizin dengan reputasi terpercaya." },
                  { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "24/7 Support", desc: "Layanan pelanggan responsif siap membantu kapan saja." }
                ].map((b, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                     <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={b.icon}></path></svg>
                     </div>
                     <h3 className="font-['Outfit'] font-bold text-white text-lg mb-1">{b.title}</h3>
                     <p className="text-cyan-100/80 text-sm">{b.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ================= 7. TESTIMONI SECTION ================= */}
      <section id="testimonial" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <span className="text-cyan-500 font-bold tracking-wider uppercase text-sm mb-2 block">Kata Mereka</span>
             <h2 className="font-['Outfit'] text-4xl md:text-5xl font-bold text-slate-900">Cerita Bahagia <span className="text-cyan-500">Wisatawan</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex text-yellow-400 mb-4">{[...Array(5)].map((_,i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}</div>
                <p className="text-slate-600 italic mb-6 leading-relaxed">"Baru pertama kali ke Nusa Penida, untung pakai Vista Travel. Guide-nya ramah banget dan fotonya bagus-bagus! Recomended!"</p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" alt="User" className="w-full h-full object-cover"/></div>
                   <div><h4 className="font-bold text-slate-900">Sarah Wijaya</h4><p className="text-xs text-slate-500">Jakarta, Indonesia</p></div>
                </div>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex text-yellow-400 mb-4">{[...Array(5)].map((_,i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}</div>
                <p className="text-slate-600 italic mb-6 leading-relaxed">"Perjalanan bisnis sekaligus liburan kantor yang sangat terorganisir. Busnya nyaman, hotelnya strategis. Terima kasih Vista!"</p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden"><img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" alt="User" className="w-full h-full object-cover"/></div>
                   <div><h4 className="font-bold text-slate-900">Budi Santoso</h4><p className="text-xs text-slate-500">Surabaya, Indonesia</p></div>
                </div>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex text-yellow-400 mb-4">{[...Array(5)].map((_,i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}</div>
                <p className="text-slate-600 italic mb-6 leading-relaxed">"Harganya sangat transparan, tidak ada biaya kaget saat di lokasi. Labuan Bajo trip-nya juara, makanannya enak semua."</p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden"><img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" alt="User" className="w-full h-full object-cover"/></div>
                   <div><h4 className="font-bold text-slate-900">Jessica Tan</h4><p className="text-xs text-slate-500">Medan, Indonesia</p></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ================= 8. FOOTER SECTION ================= */}
      <footer className="bg-slate-900 text-slate-300 py-16 font-['Plus_Jakarta_Sans']">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-cyan-500">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
                <span className="font-['Outfit'] text-2xl font-bold text-white">
                  Vista Travel<span className="text-cyan-500">.</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Partner perjalanan terbaik Anda untuk menjelajahi keindahan Bali dan dunia. Aman, Nyaman, dan Terpercaya.
              </p>
              <div className="flex gap-4">
                {['Instagram', 'TikTok', 'Facebook', 'Youtube'].map((social, i) => (
                  <button key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 font-['Outfit']">Menu Cepat</h4>
              <ul className="space-y-4">
                {navItems.map((link) => (
                  <li key={link.name}>
                    <button onClick={() => scrollToSection(link.id)} className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300"></span>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 font-['Outfit']">Layanan Populer</h4>
              <ul className="space-y-4">
                {['Paket Bali 4D3N', 'Sewa Mobil Lepas Kunci', 'Open Trip Labuan Bajo', 'Honeymoon Private Villa', 'Corporate Gathering'].map((item) => (
                  <li key={item} className="hover:text-cyan-400 cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 font-['Outfit']">Hubungi Kami</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-cyan-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
                  <p>Jl. Sunset Road No. 88, Kuta, Bali, Indonesia 80361</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-cyan-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                  <p>vistatravel@gmail.com</p>
                </div>
                <div className="flex items-center gap-4 cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => handleWhatsApp("Halo, saya mau tanya lokasi kantor.")}>
                  <div className="text-cyan-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div>
                  <p>+62 821 8196 3893</p>
                </div>
                <button onClick={() => handleWhatsApp("Halo Admin, saya mau konsultasi liburan.")} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.029.575 2.035.845 3.283.845 3.183 0 5.768-2.586 5.769-5.766.001-3.181-2.586-5.768-5.769-5.768zm0 1.905c2.13 0 3.861 1.732 3.862 3.862 0 2.129-1.732 3.862-3.862 3.862-2.129 0-3.861-1.732-3.861-3.862s1.732-3.862 3.861-3.862z"/></svg>
                  Chat WhatsApp Sekarang
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>&copy; 2024 Vista Travel. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default VistaTravel;