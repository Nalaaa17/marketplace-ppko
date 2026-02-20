
import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, ArrowRight, Star, Heart } from 'lucide-react';
// Pastikan file Marketplace.jsx yang kita buat sebelumnya ada di folder yang sama
import Marketplace from './Marketplace'; 
import Contact from './Contact';
import Education from './Education';
import About from './About';
import Auth from './Auth';
import { supabase } from './supabase';
import Profile from './Profile';

// 1. KITA UBAH KODEMU MENJADI KOMPONEN "HOME"
const Home = ({ onNavigate, session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Data Dummy 
  const products = [
    { id: 1, name: "Mie Jagung Premium", seller: "Bu Sari", category: "Makanan", price: "Rp 15.000", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=300&h=200" },
    { id: 2, name: "Keripik Singkong", seller: "Pak Budi", category: "Cemilan", price: "Rp 12.000", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=300&h=200" },
    { id: 3, name: "Tas Anyaman Rotan", seller: "Ibu Lestari", category: "Kerajinan", price: "Rp 150.000", image: "https://images.unsplash.com/photo-1590874103328-27cf2679d660?auto=format&fit=crop&q=80&w=300&h=200" },
    { id: 4, name: "Madu Hutan Murni", seller: "Kelompok Tani", category: "Kesehatan", price: "Rp 85.000", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=300&h=200" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-slate-800">
      
      {/* --- NAVBAR --- */}
      {/* --- NAVBAR DI DALAM HOME --- */}
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
              
              <button onClick={() => onNavigate('marketplace')} className="bg-primary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-secondary transition shadow-lg shadow-blue-900/20">
                Mulai Belanja
              </button>

              {/* INI LOGIKA LOGIN UNTUK DESKTOP */}
              {session ? (
                <button onClick={() => onNavigate('profile')} className="bg-sand text-primary px-5 py-2.5 rounded-full font-bold hover:bg-primary hover:text-white transition shadow-lg flex items-center gap-2">
                  <User size={18} /> Profil Saya
                </button>
              ) : (
                <button onClick={() => onNavigate('auth')} className="bg-primary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-secondary transition shadow-lg shadow-blue-900/20">
                  Masuk
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3 shadow-lg">
            <button onClick={() => onNavigate('home')} className="block w-full text-left text-gray-700 font-medium">Beranda</button>
            <button onClick={() => onNavigate('marketplace')} className="block w-full text-left text-gray-700 font-medium">Marketplace</button>
            <button onClick={() => onNavigate('education')} className="block w-full text-left text-gray-700 font-medium">Edukasi</button>
            <button onClick={() => onNavigate('about')} className="block w-full text-left text-gray-700 font-medium">Tentang Kami</button>
            
            {/* INI LOGIKA LOGIN UNTUK MOBILE */}
            {session ? (
              <button onClick={() => onNavigate('profile')} className="w-full bg-sand text-primary py-2 rounded mt-2 font-bold">Profil Saya</button>
            ) : (
              <button onClick={() => onNavigate('auth')} className="w-full bg-primary text-white py-2 rounded mt-2 font-bold">Masuk</button>
            )}
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-white space-y-6">
            <div className="inline-block bg-sand/20 px-4 py-1 rounded-full border border-sand/30 backdrop-blur-sm">
              <span className="text-sand font-bold text-sm tracking-wide">✨ INOVASI DESA DIGITAL</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Dari Desa Untuk <br/><span className="text-accent">Indonesia Maju</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              Transformasi ekonomi desa melalui platform digital. Temukan produk otentik, dukung pengrajin lokal, dan bangun kemandirian ekonomi bersama kami.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {/* MODIFIKASI: Tombol ini sekarang menuju Marketplace */}
              <button onClick={() => onNavigate('marketplace')} className="bg-sand text-primary px-8 py-3.5 rounded-lg font-bold hover:bg-white transition flex items-center gap-2">
                Jelajahi Produk <ArrowRight size={20}/>
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-white/10 transition">
                Pelajari Program
              </button>
            </div>
          </div>

          <div className="md:w-1/2 relative">
             <div className="bg-gradient-to-tr from-secondary to-sand rounded-2xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
               <img 
                 src="https://images.unsplash.com/photo-1523206485256-dc5852beaca9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                 alt="Produk Desa" 
                 className="rounded-xl w-full h-80 md:h-96 object-cover"
               />
             </div>
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce-slow">
               <div className="bg-green-100 p-3 rounded-full text-green-600 font-bold text-xl">98%</div>
               <div>
                 <p className="text-xs text-gray-500 font-bold uppercase">Kepuasan</p>
                 <p className="text-primary font-bold">Pelanggan Lokal</p>
               </div>
             </div>
          </div>
        </div>
      </header>

      {/* --- STATISTIK SECTION --- */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-xl shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 p-8 border-b-4 border-sand">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary">150+</h3>
            <p className="text-sm text-gray-500 font-medium">UMKM Terdaftar</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary">500+</h3>
            <p className="text-sm text-gray-500 font-medium">Produk Terjual</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary">12</h3>
            <p className="text-sm text-gray-500 font-medium">Desa Mitra</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary">24/7</h3>
            <p className="text-sm text-gray-500 font-medium">Support Center</p>
          </div>
        </div>
      </div>

      {/* --- PRODUK UNGGULAN --- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-secondary font-bold tracking-widest text-sm uppercase">Pilihan Terbaik</span>
          <h2 className="text-3xl font-bold text-primary mt-2">Produk Unggulan Desa</h2>
          <div className="w-24 h-1 bg-sand mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full z-10">
                  {item.category}
                </span>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"/>
                <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  {/* MODIFIKASI: Tombol menuju detail/marketplace */}
                  <button onClick={() => onNavigate('marketplace')} className="bg-white text-primary px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                    Lihat Detail
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-sand rounded-full flex items-center justify-center text-xs text-white">
                    <User size={12}/>
                  </div>
                  <p className="text-xs text-gray-500">Oleh: <span className="text-secondary font-semibold">{item.seller}</span></p>
                </div>

                <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-secondary transition">{item.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-secondary">{item.price}</span>
                  <button className="bg-background p-2 rounded-full text-primary hover:bg-primary hover:text-white transition">
                    <ShoppingCart size={18}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          {/* MODIFIKASI: Tombol menuju marketplace */}
          <button onClick={() => onNavigate('marketplace')} className="border-2 border-primary text-primary px-10 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition">
            Lihat Semua Produk
          </button>
        </div>
      </section>

      {/* --- MENGAPA KAMI? --- */}
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition">
              <div className="w-14 h-14 bg-sand rounded-xl flex items-center justify-center mb-6 text-primary text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-3">Inovasi Berkelanjutan</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Mengubah potensi desa menjadi produk bernilai tinggi dengan teknologi yang ramah lingkungan.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition">
              <div className="w-14 h-14 bg-sand rounded-xl flex items-center justify-center mb-6 text-primary text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-3">Pemberdayaan Warga</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Setiap pembelian Anda berkontribusi langsung pada kesejahteraan pengrajin dan petani lokal.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition">
              <div className="w-14 h-14 bg-sand rounded-xl flex items-center justify-center mb-6 text-primary text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-3">Kualitas Terjamin</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Seluruh produk telah melalui proses kurasi ketat untuk memastikan standar kualitas terbaik.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-secondary text-white pt-16 pb-8 border-t-8 border-sand">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">DESA<span className="text-sand">MARKET</span></h2>
            <p className="text-gray-300 max-w-sm">Platform digital untuk kemajuan ekonomi desa. Mari bersinergi membangun negeri dari pinggiran.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-sand">Menu Cepat</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white">Katalog Produk</button></li>
              <li><a href="#" className="hover:text-white">Blog Desa</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-sand">Hubungi Kami</h4>
            <p className="text-gray-300 text-sm mb-2">📍 Balai Desa Sejahtera, Jl. Merdeka No. 45</p>
            <p className="text-gray-300 text-sm mb-2">✉️ halo@desamarket.id</p>
            <p className="text-gray-300 text-sm">📞 +62 812 3456 7890</p>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm pt-8 border-t border-white/10">
          © 2026 DesaMarket Project. Dibuat dengan React & Tailwind.
        </div>
      </footer>
    </div>
  );
};


function App() {
  const [activePage, setActivePage] = useState('home');
  const [session, setSession] = useState(null);
  const [cart, setCart] = useState([]); 
  const [hasNewOrder, setHasNewOrder] = useState(false);
  
  const checkNewOrders = async (userId) => {
    const { count, error } = await supabase
      .from('pesanan')
      .select('*', { count: 'exact', head: true })
      .eq('seller_id', userId)
      .eq('status', 'menunggu_dikirim');
    
    if (!error) setHasNewOrder(count > 0);
  };

  const fetchCart = async (userId) => {
    const { data } = await supabase.from('keranjang').select('*').eq('user_id', userId); 
    if (data) setCart(data); 
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchCart(session.user.id);
        checkNewOrders(session.user.id); // Jalankan radar
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchCart(session.user.id);
        checkNewOrders(session.user.id);
      } else {
        setCart([]);
        setHasNewOrder(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchCart(session.user.id); 
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchCart(session.user.id);
      else setCart([]); 
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- FUNGSI BARU: ADD TO CART ---
  const addToCart = async (product, quantity = 1) => {
    if (!session) {
      alert("Silakan Masuk/Login terlebih dahulu untuk berbelanja!");
      setActivePage('auth');
      return;
    }

    // 1. CEK: Apakah penjual mencoba membeli barangnya sendiri?
    if (product.user_id === session.user.id) {
      alert("Oops! Kamu tidak bisa memasukkan barang jualanmu sendiri ke keranjang.");
      return;
    }

    // 2. CEK: Ambil stok terbaru langsung dari database
    const { data: realProduct } = await supabase.from('produk').select('stock').eq('id', product.id).single();
    
    if (!realProduct || realProduct.stock < quantity) {
      alert("Maaf, stok barang ini sudah habis atau tidak mencukupi jumlah yang kamu minta.");
      return;
    }

    const itemKeranjang = {
      user_id: session.user.id,
      product_id: product.id, // Menyimpan ID Produk agar tahu stok mana yang harus dikembalikan
      name: product.name,
      price: product.price,
      image: product.image,
      seller: product.seller,
      quantity: quantity
    };

    const { error } = await supabase.from('keranjang').insert([itemKeranjang]);

    if (error) {
      alert("Gagal menambahkan ke keranjang: " + error.message);
    } else {
      // 3. SUKSES MASUK KERANJANG -> KURANGI STOK TOKO
      await supabase.from('produk').update({ stock: realProduct.stock - quantity }).eq('id', product.id);
      
      alert(`${quantity}x ${product.name} berhasil diamankan di keranjangmu!`);
      fetchCart(session.user.id); 
    }
  }; 

  // --- FUNGSI BARU: REMOVE FROM CART ---
  const removeFromCart = async (itemId) => {
    const isConfirm = window.confirm("Hapus barang ini dari keranjang?");
    if (!isConfirm) return;

    // 1. Cari tahu dulu barang apa yang mau dihapus (untuk mengambil product_id dan quantity-nya)
    const { data: cartItem } = await supabase.from('keranjang').select('*').eq('id', itemId).single();

    // 2. Hapus dari keranjang
    const { error } = await supabase.from('keranjang').delete().eq('id', itemId);
    
    if (!error) {
      // 3. JIKA BERHASIL DIHAPUS -> KEMBALIKAN STOK KE TOKO
      if (cartItem && cartItem.product_id) {
        const { data: prodData } = await supabase.from('produk').select('stock').eq('id', cartItem.product_id).single();
        if (prodData) {
          await supabase.from('produk').update({ stock: prodData.stock + cartItem.quantity }).eq('id', cartItem.product_id);
        }
      }
      fetchCart(session.user.id);
    }
  }; 

  return (
    <>
      {activePage === 'home' && <Home onNavigate={setActivePage} session={session} cart={cart} hasNewOrder={hasNewOrder} />}
      {activePage === 'marketplace' && <Marketplace onNavigate={setActivePage} session={session} cart={cart} addToCart={addToCart} />}
      {activePage === 'education' && <Education onNavigate={setActivePage} session={session} cart={cart} />}
      {activePage === 'contact' && <Contact onNavigate={setActivePage} session={session} cart={cart} />}
      {activePage === 'about' && <About onNavigate={setActivePage} session={session} cart={cart} />}
      {activePage === 'auth' && <Auth onNavigate={setActivePage} />}
      {activePage === 'profile' && <Profile onNavigate={setActivePage} session={session} cart={cart} removeFromCart={removeFromCart} fetchCart={fetchCart} hasNewOrder={hasNewOrder} checkNewOrders={checkNewOrders} />}
    </>
  );
}

export default App;