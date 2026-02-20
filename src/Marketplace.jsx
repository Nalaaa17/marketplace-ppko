import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Search, ShoppingCart, Filter, Loader, ArrowLeft, Package, Info, MapPin } from 'lucide-react';
import { supabase } from './supabase';

const Marketplace = ({ onNavigate, session, cart, addToCart }) => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [priceRange, setPriceRange] = useState(500000); 
  const [sortBy, setSortBy] = useState("terbaru");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1); // State untuk jumlah beli

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('produk')
        .select('*')
        .order('created_at', { ascending: false }); 
        
      if (!error) {
        setProducts(data || []);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []); 

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchCategory = selectedCategory === "Semua" || item.category === selectedCategory;
        const matchPrice = item.price <= priceRange;
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchPrice && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === "terrendah") return a.price - b.price;
        if (sortBy === "tertinggi") return b.price - a.price;
        if (sortBy === "nama") return a.name.localeCompare(b.name);
        return new Date(b.created_at) - new Date(a.created_at); 
      });
  }, [products, selectedCategory, priceRange, sortBy, searchQuery]);

  const categories = ["Semua", "Makanan", "Minuman", "Kerajinan", "Fashion", "Pertanian", "Bangunan"];

  return (
    <div className="min-h-screen bg-background font-sans text-slate-800">
      <Navbar onNavigate={onNavigate} session={session} cart={cart} />

      {/* HEADER MARKETPLACE (Hanya Tampil Jika Tidak Ada Produk Yang Diklik) */}
      {!selectedProduct && (
        <div className="bg-primary text-white py-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Marketplace <span className="text-sand">UMKM BERSINAR</span>
            </h1>
            <p className="text-accent text-lg mb-8">
              Dukung produk lokal berkualitas langsung dari pelaku UMKM desa yang inovatif.
            </p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-12">
        
        {/* ========================================== */}
        {/* TAMPILAN 1: HALAMAN DETAIL PRODUK          */}
        {/* ========================================== */}
        {selectedProduct ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="flex items-center gap-2 text-primary font-bold hover:text-secondary mb-8 transition"
            >
              <ArrowLeft size={20} /> Kembali ke Marketplace
            </button>

            <div className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-12">
              
              {/* KOLOM KIRI: GAMBAR */}
              <div className="w-full md:w-1/2">
                <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner h-[400px] md:h-[500px]">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-700" 
                  />
                </div>
              </div>

              {/* KOLOM KANAN: DETAIL & TOMBOL BELI */}
              <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
                
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-bold tracking-wide w-max mb-4">
                  {selectedProduct.category}
                </span>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 leading-tight">
                  {selectedProduct.name}
                </h1>
                
                <p className="text-gray-500 flex items-center gap-2 mb-6 text-lg">
                  <MapPin size={18} className="text-secondary" /> 
                  Dijual oleh: <span className="font-bold text-primary">{selectedProduct.seller}</span>
                </p>

                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-100 mb-6">
                  <div className="text-4xl font-bold text-[#10B981] mb-2">
                    Rp {selectedProduct.price.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Package size={16} /> 
                    Sisa Stok Tersedia: <span className="text-gray-800 font-bold">{selectedProduct.stock || 0} pcs</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-3">
                    <Info size={20} className="text-secondary" /> Deskripsi Produk
                  </h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {selectedProduct.description || "Tidak ada deskripsi."}
                  </p>
                </div>

                {/* AREA PILIH JUMLAH BELI & TOMBOL KERANJANG */}
                <div className="mt-auto">
                  
                  {selectedProduct.stock > 0 && (
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-bold text-gray-700">Jumlah Beli:</span>
                      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <button 
                          onClick={() => setBuyQuantity(q => Math.max(1, q - 1))} 
                          className="px-4 py-2 hover:bg-gray-200 font-bold transition text-xl"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 font-bold bg-white">{buyQuantity}</span>
                        <button 
                          onClick={() => setBuyQuantity(q => Math.min(selectedProduct.stock, q + 1))} 
                          className="px-4 py-2 hover:bg-gray-200 font-bold transition text-xl"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* INI TOMBOL YANG TADI TIDAK BISA DIKLIK, SEKARANG SUDAH DIPERBAIKI */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(selectedProduct, buyQuantity);
                    }}
                    disabled={selectedProduct.stock === 0}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition cursor-pointer ${
                      selectedProduct.stock === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-primary text-white hover:bg-secondary'
                    }`}
                  >
                    <ShoppingCart size={24} /> 
                    {selectedProduct.stock === 0 ? 'Stok Habis' : `Masukkan Keranjang (${buyQuantity} barang)`}
                  </button>
                  
                </div>

              </div>
            </div>
          </div>
        ) : (
          
          /* ========================================== */
          /* TAMPILAN 2: GRID MARKETPLACE NORMAL        */
          /* ========================================== */
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* SIDEBAR FILTER */}
            <aside className="w-full md:w-1/4 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
                
                <div className="flex items-center gap-2 mb-6">
                  <Filter size={20} className="text-secondary" />
                  <h3 className="font-bold text-lg text-primary">Filter</h3>
                </div>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button 
                        key={cat} 
                        onClick={() => setSelectedCategory(cat)} 
                        className={`px-3 py-1.5 text-sm rounded-full transition border ${
                          selectedCategory === cat 
                          ? "bg-secondary text-white border-secondary" 
                          : "bg-white text-gray-600 border-gray-200 hover:border-secondary"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

            {/* KONTEN PRODUK GRID */}
            <section className="w-full md:w-3/4">
              
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <p className="text-gray-500">
                  Menampilkan <span className="font-bold text-secondary">{filteredProducts.length}</span> produk
                </p>
                
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Cari produk..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary shadow-sm" 
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-20 text-secondary">
                  <Loader className="animate-spin" size={40} />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => { 
                        setSelectedProduct(item); 
                        setBuyQuantity(1); // Reset jumlah ke 1 saat buka produk baru
                      }} 
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition group flex flex-col cursor-pointer"
                    >
                      <div className="h-48 relative overflow-hidden bg-gray-100">
                        {item.stock === 0 ? (
                          <span className="absolute top-3 right-3 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold z-10">Habis</span>
                        ) : (
                          <span className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-bold text-green-600 shadow-sm z-10">Stok: {item.stock}</span>
                        )}
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                        />
                      </div>
                      
                      <div className="p-4 flex-1 flex flex-col">
                        <span className="text-xs font-semibold text-blue-500 mb-2">{item.category}</span>
                        <h3 className="font-bold text-gray-800 text-lg line-clamp-2 mb-1 group-hover:text-primary">{item.name}</h3>
                        <p className="text-xs text-gray-500 mb-3 mt-auto">📍 {item.seller}</p>
                        <div className="text-xl font-bold text-blue-600 mb-4">Rp {item.price.toLocaleString()}</div>
                        
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); // Mencegah klik masuk ke halaman detail
                            addToCart(item, 1); 
                          }} 
                          disabled={item.stock === 0} 
                          className={`w-full py-2.5 rounded-lg font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                            item.stock === 0 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-primary text-white hover:bg-secondary'
                          }`}
                        >
                          <ShoppingCart size={18} /> Tambah
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;