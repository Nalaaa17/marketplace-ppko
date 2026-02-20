import React, { useState } from 'react';
import { Menu, X, User, ShoppingCart } from 'lucide-react';

// Perhatikan kita menambahkan prop 'cart' di sini
const Navbar = ({ onNavigate, session, cart, hasNewOrder }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State untuk buka/tutup keranjang

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
            <div>
              <h1 className="text-xl font-bold text-primary leading-none">DESA<span className="text-secondary">MARKET</span></h1>
              <p className="text-xs text-sand font-semibold tracking-wider">KARYA ASLI DESA</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-primary font-medium">Beranda</button>
            <button onClick={() => onNavigate('marketplace')} className="text-gray-600 hover:text-primary font-medium">Marketplace</button>
            <button onClick={() => onNavigate('education')} className="text-gray-600 hover:text-primary font-medium">Edukasi</button>
            <button onClick={() => onNavigate('about')} className="text-gray-600 hover:text-primary font-medium">Tentang Kami</button>
            
            {session ? (
              <div className="flex items-center gap-6">
                
                {/* --- IKON KERANJANG DI SINI --- */}
                <div className="relative">
                  <button onClick={() => setIsCartOpen(!isCartOpen)} className="text-primary hover:text-secondary relative transition mt-2">
                    <ShoppingCart size={26} />
                    {/* Lingkaran merah penanda jumlah barang */}
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                        {cart.length}
                      </span>
                    )}
                  </button>

                  {/* --- POPUP KERANJANG SAAT DIKLIK --- */}
                  {isCartOpen && (
                    <div className="absolute right-0 mt-4 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50">
                      <h3 className="font-bold text-primary mb-3 border-b pb-2">Keranjang Belanja</h3>
                      {cart.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-4">Keranjang masih kosong</p>
                      ) : (
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                          {cart.map((item, idx) => (
                            <div key={idx} className="flex gap-3 items-center border-b border-gray-50 pb-2">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</p>
                                <p className="text-xs text-secondary font-bold">Rp {item.price}</p>
                              </div>
                            </div>
                          ))}
                          <button onClick={() => { setIsCartOpen(false); onNavigate('profile'); }} className="w-full bg-secondary text-white py-2.5 rounded-lg text-sm font-bold mt-2 hover:bg-primary transition shadow-md">
                            Lihat Semua & Checkout
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Tombol Profil */}
                <button 
                  onClick={() => onNavigate('profile')} 
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition relative"
                >
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {session.user.user_metadata.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden md:block font-bold text-sm mr-2 text-primary">Profil</span>

                  {/* TITIK MERAH NOTIFIKASI */}
                  {hasNewOrder && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <button onClick={() => onNavigate('auth')} className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-secondary transition shadow-md">
                Masuk
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
             {session && (
               <button onClick={() => onNavigate('profile')} className="text-primary relative">
                 <ShoppingCart size={24} />
                 {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">{cart.length}</span>}
               </button>
             )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;