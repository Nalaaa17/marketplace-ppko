import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { supabase } from './supabase';
import { ShoppingBag, BookOpen, Store, LogOut, User, Trash2, Plus, X, Package, Upload, Settings, Camera, CheckCircle, Truck, DollarSign, MapPin, Phone } from 'lucide-react';

const Profile = ({ onNavigate, session, cart = [], removeFromCart, fetchCart, hasNewOrder, checkNewOrders }) => {
  const [activeTab, setActiveTab] = useState('pesanan'); 
  
  const userData = session?.user?.user_metadata || {};
  const userEmail = session?.user?.email || "";
  const displayName = userData.username || userEmail.split('@')[0];
  const displayAvatar = userData.avatar_url || null;

  const [myProducts, setMyProducts] = useState([]);
  const [myOrders, setMyOrders] = useState([]); 
  const [incomingOrders, setIncomingOrders] = useState([]); 

  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); 
  const [formData, setFormData] = useState({ name: '', category: 'Makanan', price: '', stock: '', description: '' });
  
  const [profileData, setProfileData] = useState({ username: userData.username || '', phone: userData.phone || '', address: userData.address || '' });
  const [avatarFile, setAvatarFile] = useState(null);

  // STATE BARU KHUSUS UNTUK CHECKOUT
  const [checkoutPhone, setCheckoutPhone] = useState(userData.phone || '');
  const [checkoutAddress, setCheckoutAddress] = useState(userData.address || '');

  const fetchData = async () => {
    if (!session) return;
    const { data: prods } = await supabase.from('produk').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
    if (prods) setMyProducts(prods);

    const { data: orders } = await supabase.from('pesanan').select('*').eq('buyer_id', session.user.id).order('created_at', { ascending: false });
    if (orders) setMyOrders(orders);

    const { data: incOrders } = await supabase.from('pesanan').select('*').eq('seller_id', session.user.id).order('created_at', { ascending: false });
    if (incOrders) setIncomingOrders(incOrders);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, session]);
  const [userSaldo, setUserSaldo] = useState(0);

  // Tambahkan fungsi ambil saldo di dalam fetchData
  const fetchUserSaldo = async () => {
  if (!session) return;
  
  // Menggunakan maybeSingle agar tidak error 406 jika data belum ada
  const { data, error } = await supabase
    .from('profil')
    .select('saldo')
    .eq('id', session.user.id)
    .maybeSingle();

  if (error) {
    console.error("Error ambil saldo:", error.message);
    return;
  }

  // Jika data ada, pasang saldonya. Jika tidak ada, pasang 0.
  setUserSaldo(data ? data.saldo : 0);
};

useEffect(() => {
  fetchData();
  fetchUserSaldo(); // Panggil ini
}, [activeTab, session]);
  const updateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('pesanan').update({ status: newStatus }).eq('id', orderId);
      if (error) throw error;

      if (newStatus === 'dana_dicairkan') {
        const { data: order } = await supabase.from('pesanan').select('*').eq('id', orderId).maybeSingle();
        if (order) {
          const totalPemasukan = order.product_price * (order.quantity || 1);
          const { data: profil } = await supabase.from('profil').select('saldo').eq('id', session.user.id).maybeSingle();
          const saldoBaru = (profil ? profil.saldo : 0) + totalPemasukan;
          await supabase.from('profil').upsert({ id: session.user.id, saldo: saldoBaru, updated_at: new Date() });
          
          alert(`Rp ${totalPemasukan.toLocaleString()} Masuk ke Saldo!`);
          fetchUserSaldo();
        }
      } else {
        alert("Status pesanan berhasil diperbarui!");
      }
      
      // MENGAMBIL DATA TERBARU
      fetchData();
      
      // --- BARIS KUNCI: REFRESH RADAR TITIK MERAH SAAT ITU JUGA ---
      if (checkNewOrders) checkNewOrders(session.user.id); 

    } catch (err) { 
      alert(err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Keranjang kosong!");
    if (!checkoutAddress || !checkoutPhone) return alert("Mohon lengkapi Alamat dan Nomor Telepon untuk pengiriman!");
    
    setLoading(true);
    
    // HITUNG TOTAL (Harga * Jumlah)
    const totalBelanja = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const orderId = `ORDER-${Date.now()}`;
    
    const payload = {
      transaction_details: { order_id: orderId, gross_amount: totalBelanja },
      customer_details: { first_name: displayName, email: userEmail, phone: checkoutPhone }
    };

    const serverKey = import.meta.env.VITE_MIDTRANS_SERVER_KEY;
    const encodedKey = btoa(serverKey + ":");

    try {
      const response = await fetch('/api/midtrans/snap/v1/transactions', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Basic ${encodedKey}` },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: async function(result){
            alert("Pembayaran Berhasil! Pesananmu sedang diproses.");
            try {
              for (const item of cart) {
                const { data: prodData } = await supabase.from('produk').select('id, user_id').eq('name', item.name).maybeSingle();
                if (prodData) {
                  await supabase.from('pesanan').insert([{
                    buyer_id: session.user.id,
                    seller_id: prodData.user_id,
                    product_id: prodData.id,
                    product_name: item.name,
                    product_price: item.price,
                    product_image: item.image,
                    quantity: item.quantity || 1,
                    delivery_address: checkoutAddress,
                    buyer_phone: checkoutPhone,
                    status: 'menunggu_dikirim'
                  }]);
                }
              }

              // 1. Hapus isi keranjang di database
              await supabase.from('keranjang').delete().eq('user_id', session.user.id);
              
              // 2. Update angka keranjang di Navbar (tanpa refresh)
              if (fetchCart) fetchCart(session.user.id); 
              
              // 3. Ambil data pesanan terbaru agar status 'Menunggu' langsung muncul
              await fetchData(); 
              
              // 4. Reset loading
              setLoading(false);
            } catch(e) { 
              console.error("Error setelah bayar:", e);
              setLoading(false);
            }
          },
          onPending: function(result){ alert("Menunggu pembayaranmu..."); },
          onError: function(result){ alert("Pembayaran gagal."); },
          onClose: function(){ alert("Kamu menutup jendela kasir."); setLoading(false); }
        });
      } else {
        alert("Gagal memanggil kasir: " + JSON.stringify(data));
        setLoading(false);
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan.");
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let newAvatarUrl = displayAvatar;
      if (avatarFile) {
        const fileName = `${session.user.id}-avatar-${Date.now()}.${avatarFile.name.split('.').pop()}`;
        await supabase.storage.from('avatars').upload(fileName, avatarFile);
        newAvatarUrl = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl;
      }
      await supabase.auth.updateUser({ data: { username: profileData.username, phone: profileData.phone, address: profileData.address, avatar_url: newAvatarUrl } });
      alert("Profil berhasil diperbarui!");
      window.location.reload();
    } catch (error) { alert(error.message); } finally { setLoading(false); }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Pilih gambar produk!");
    setLoading(true);
    try {
      const fileName = `${session.user.id}-${Date.now()}.${imageFile.name.split('.').pop()}`;
      await supabase.storage.from('product-images').upload(fileName, imageFile);
      const publicUrl = supabase.storage.from('product-images').getPublicUrl(fileName).data.publicUrl;

      await supabase.from('produk').insert([{
        user_id: session.user.id, name: formData.name, category: formData.category, price: parseInt(formData.price), 
        stock: parseInt(formData.stock), description: formData.description, image: publicUrl, seller: displayName
      }]);
      alert("Produk ditambahkan!");
      setShowAddForm(false); setFormData({ name: '', category: 'Makanan', price: '', stock: '', description: '' }); setImageFile(null); fetchData();
    } catch (error) { alert(error.message); } finally { setLoading(false); }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Yakin hapus produk ini?")) {
      await supabase.from('produk').delete().eq('id', productId); fetchData();
    }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); onNavigate('home'); };

  return (
    <div className="min-h-screen bg-background font-sans text-slate-800">
      <Navbar onNavigate={onNavigate} session={session} cart={cart} hasNewOrder={hasNewOrder} />
      <main className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center sticky top-24">
            {displayAvatar ? ( <img src={displayAvatar} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gray-50 shadow-sm" />) : (<div className="w-24 h-24 bg-primary text-sand rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-bold">{displayName.charAt(0).toUpperCase()}</div>)}
            <h2 className="font-bold text-lg text-primary truncate">{displayName}</h2>
            <p className="text-xs text-gray-500 mb-2 truncate">{userEmail}</p>

            {/* Tampilan Saldo Toko */}
            <div className="bg-green-50 p-2 rounded-lg border border-green-100 mb-4">
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Saldo Toko</p>
              <p className="text-lg font-extrabold text-green-700">Rp {userSaldo.toLocaleString()}</p>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <button onClick={() => setActiveTab('pengaturan')} className={`p-3 rounded-lg font-semibold flex items-center gap-3 transition ${activeTab === 'pengaturan' ? 'bg-secondary text-white' : 'hover:bg-gray-50 text-gray-600'}`}><Settings size={18} /> Pengaturan Profil</button>
              <button onClick={() => setActiveTab('pesanan')} className={`p-3 rounded-lg font-semibold flex items-center gap-3 transition ${activeTab === 'pesanan' ? 'bg-secondary text-white' : 'hover:bg-gray-50 text-gray-600'}`}><ShoppingBag size={18} /> Pesanan Saya</button>
              <button 
                onClick={() => setActiveTab('toko')} 
                className={`p-3 rounded-lg font-semibold flex items-center gap-3 transition relative ${activeTab === 'toko' ? 'bg-secondary text-white' : 'text-gray-600'}`}
              >
                <Store size={18} /> 
                Toko Saya

                {/* TITIK MERAH DI TAB TOKO */}
                {hasNewOrder && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </button>
              <div className="border-t my-2"></div>
              <button onClick={handleLogout} className="p-3 rounded-lg font-semibold flex items-center gap-3 text-red-600 hover:bg-red-50 transition"><LogOut size={18} /> Keluar</button>
            </div>
          </div>
        </aside>

        {/* KONTEN UTAMA */}
        <section className="w-full md:w-3/4">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
            
            {/* 1. TAB PENGATURAN */}
            {activeTab === 'pengaturan' && (
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold text-primary mb-2">Pengaturan Profil</h3>
                <p className="text-gray-500 mb-8 pb-4 border-b">Lengkapi alamat pengiriman agar bisa Checkout.</p>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border">
                      {avatarFile ? <img src={URL.createObjectURL(avatarFile)} className="w-full h-full object-cover" /> : displayAvatar ? <img src={displayAvatar} className="w-full h-full object-cover" /> : <User className="w-full h-full p-4 text-gray-400" />}
                    </div>
                    <div><label className="cursor-pointer bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition flex items-center gap-2"><Camera size={16} /> Ubah Foto Profil<input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} className="hidden" /></label></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-semibold mb-1">Username Lengkap</label><input type="text" required value={profileData.username} onChange={(e) => setProfileData({...profileData, username: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-secondary" /></div>
                    <div><label className="block text-sm font-semibold mb-1">Nomor Telepon / WA</label><input type="tel" required value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-secondary" /></div>
                  </div>
                  <div><label className="block text-sm font-semibold mb-1">Email (Hanya Baca)</label><input type="email" value={userEmail} disabled className="w-full p-2.5 border bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed" /></div>
                  <div><label className="block text-sm font-semibold mb-1">Alamat Lengkap (Default)</label><textarea required rows="3" value={profileData.address} onChange={(e) => setProfileData({...profileData, address: e.target.value})} placeholder="Alamat rumah..." className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-secondary"></textarea></div>
                  <button type="submit" disabled={loading} className={`px-8 py-3 rounded-lg font-bold text-white ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-secondary'}`}>{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</button>
                </form>
              </div>
            )}

            {/* 2. TAB PESANAN (KERANJANG + INFO PENGIRIMAN) */}
            {activeTab === 'pesanan' && (
               <div>
                 <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-4">Keranjang Belanja</h3>
                 <div className="space-y-4 mb-8">
                   {cart.length === 0 ? (
                     <div className="text-center py-6 bg-gray-50 rounded-xl border-dashed border-2"><p className="text-gray-500">Keranjang kosong.</p></div>
                   ) : (
                     cart.map((item, idx) => (
                       <div key={idx} className="flex gap-4 border p-4 rounded-xl items-center bg-white shadow-sm">
                         <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-gray-100" />
                         <div className="flex-1">
                           <h4 className="font-bold text-lg text-gray-800">{item.name}</h4>
                           <p className="text-secondary font-bold">Rp {item.price.toLocaleString()} <span className="text-gray-400 font-medium text-sm ml-1">x {item.quantity || 1}</span></p>
                           <p className="text-sm font-bold mt-1 text-primary">Subtotal: Rp {(item.price * (item.quantity || 1)).toLocaleString()}</p>
                         </div>
                         <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><Trash2 size={20} /></button>
                       </div>
                     ))
                   )}
                 </div>

                 {cart.length > 0 && (
                   <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200 mb-12 shadow-inner">
                     <h4 className="font-bold text-lg text-primary mb-4 flex items-center gap-2"><MapPin size={20}/> Informasi Pengiriman</h4>
                     <div className="grid md:grid-cols-2 gap-4 mb-6">
                       <div>
                         <label className="block text-sm font-semibold text-gray-600 mb-1">Nomor Penerima (WA)</label>
                         <input type="tel" required value={checkoutPhone} onChange={(e) => setCheckoutPhone(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-secondary" placeholder="0812..." />
                       </div>
                       <div>
                         <label className="block text-sm font-semibold text-gray-600 mb-1">Alamat Tujuan Pengiriman</label>
                         <textarea required rows="2" value={checkoutAddress} onChange={(e) => setCheckoutAddress(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-secondary" placeholder="Ketik alamat lengkap pengiriman untuk pesanan ini..."></textarea>
                       </div>
                     </div>

                     <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200">
                       <div>
                         <p className="text-gray-500 text-sm font-semibold mb-1">Total Pembayaran</p>
                         <p className="text-3xl font-bold text-[#10B981]">Rp {cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toLocaleString()}</p>
                       </div>
                       <button onClick={handleCheckout} disabled={loading} className={`px-8 py-4 rounded-xl font-bold text-white shadow-lg ${loading ? 'bg-gray-400' : 'bg-[#10B981] hover:bg-[#059669]'}`}>{loading ? 'Memproses...' : 'Bayar Sekarang (Midtrans)'}</button>
                     </div>
                   </div>
                 )}

                 {/* Riwayat Pembelian Buyer */}
                 <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-4 mt-8">Status Pesanan Saya</h3>
                 <div className="space-y-4">
                   {myOrders.length === 0 ? ( <p className="text-gray-500 text-center py-4">Belum ada pesanan.</p> ) : (
                     myOrders.map(order => (
                       <div key={order.id} className="border p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-center bg-white shadow-sm">
                         <img src={order.product_image} alt={order.product_name} className="w-20 h-20 object-cover rounded-lg" />
                         <div className="flex-1 w-full">
                           <h4 className="font-bold text-lg text-gray-800">{order.product_name} <span className="text-sm font-medium text-gray-500">(x{order.quantity || 1})</span></h4>
                           <p className="text-secondary font-bold mb-2">Total: Rp {(order.product_price * (order.quantity || 1)).toLocaleString()}</p>
                           {order.status === 'menunggu_dikirim' && <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full"><Package size={14}/> Menunggu Penjual Mengirim</span>}
                           {order.status === 'sedang_dikirim' && <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full"><Truck size={14}/> Sedang Dalam Perjalanan</span>}
                           {(order.status === 'selesai' || order.status === 'dana_dicairkan') && <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full"><CheckCircle size={14}/> Pesanan Selesai</span>}
                         </div>
                         {order.status === 'sedang_dikirim' && (
                           <button onClick={() => updateOrderStatus(order.id, 'selesai')} disabled={loading} className="w-full sm:w-auto bg-[#10B981] text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-[#059669]">Barang Diterima</button>
                         )}
                       </div>
                     ))
                   )}
                 </div>
               </div>
            )}

            {/* 3. TAB TOKO SAYA (MUNCULKAN ALAMAT PEMBELI DI SINI) */}
            {activeTab === 'toko' && (
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-4">Pesanan Masuk (Toko)</h3>
                <div className="space-y-4 mb-12">
                   {incomingOrders.length === 0 ? (
                     <div className="text-center py-6 bg-gray-50 rounded-xl border-dashed border-2"><p className="text-gray-500">Belum ada pesanan masuk.</p></div>
                   ) : (
                     incomingOrders.map(order => (
                       <div key={order.id} className="border p-5 rounded-xl flex flex-col sm:flex-row gap-4 bg-[#F8FAFC] shadow-sm">
                         <img src={order.product_image} alt={order.product_name} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                         <div className="flex-1 w-full">
                           <h4 className="font-bold text-lg text-gray-800">{order.product_name} <span className="text-sm font-medium text-white bg-secondary px-2 py-0.5 rounded-full ml-1">x{order.quantity || 1}</span></h4>
                           <p className="text-secondary font-bold mb-2">Pendapatan: Rp {(order.product_price * (order.quantity || 1)).toLocaleString()}</p>
                           
                           {/* INFORMASI PENGIRIMAN PEMBELI TAMPIL DI SINI */}
                           <div className="bg-white p-3 rounded-lg border border-gray-200 mb-3 text-sm">
                             <p className="text-gray-800 font-bold mb-1 flex items-center gap-1"><MapPin size={14} className="text-primary"/> Tujuan Pengiriman:</p>
                             <p className="text-gray-600 leading-snug">{order.delivery_address || '-'}</p>
                             <p className="text-gray-600 mt-1 font-semibold flex items-center gap-1"><Phone size={14}/> {order.buyer_phone || '-'}</p>
                           </div>

                           {order.status === 'menunggu_dikirim' && <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full"><Package size={14}/> Perlu Dikirim</span>}
                           {order.status === 'sedang_dikirim' && <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full"><Truck size={14}/> Sedang Dikirim ke Pembeli</span>}
                           {order.status === 'selesai' && <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full"><CheckCircle size={14}/> Pembeli Telah Menerima</span>}
                           {order.status === 'dana_dicairkan' && <span className="inline-flex items-center gap-1 bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full"><DollarSign size={14}/> Dana Telah Masuk Saldo</span>}
                         </div>

                         <div className="flex flex-col justify-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                           {order.status === 'menunggu_dikirim' && ( <button onClick={() => updateOrderStatus(order.id, 'sedang_dikirim')} disabled={loading} className="bg-primary text-white px-4 py-3 rounded-lg text-sm font-bold shadow hover:bg-secondary">Kirim Barang</button> )}
                           {order.status === 'selesai' && ( <button onClick={() => updateOrderStatus(order.id, 'dana_dicairkan')} disabled={loading} className="bg-sand text-primary px-4 py-3 rounded-lg text-sm font-bold shadow hover:bg-primary hover:text-white">Cairkan Dana</button> )}
                         </div>
                       </div>
                     ))
                   )}
                </div>

                {/* ETALASE TOKO TETAP SAMA SEPERTI SEBELUMNYA */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h3 className="text-2xl font-bold text-primary">Etalase Toko Saya</h3>
                  <button onClick={() => setShowAddForm(!showAddForm)} className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-2 ${showAddForm ? 'bg-red-100 text-red-600' : 'bg-secondary text-white'}`}>
                    {showAddForm ? <><X size={18}/> Batal</> : <><Plus size={18}/> Tambah Produk</>}
                  </button>
                </div>

                {showAddForm && (
                  <div className="bg-[#F8FAFC] p-6 rounded-xl border border-gray-200 mb-8 shadow-inner">
                    <form onSubmit={handleAddProduct} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-semibold mb-1">Nama Produk</label><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2" /></div>
                        <div><label className="block text-sm font-semibold mb-1">Kategori</label><select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-2.5 border rounded-lg bg-white focus:ring-2"><option value="Makanan">Makanan</option><option value="Minuman">Minuman</option><option value="Kerajinan">Kerajinan</option></select></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-semibold mb-1">Harga (Rp)</label><input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2" /></div>
                        <div><label className="block text-sm font-semibold mb-1">Stok Barang</label><input type="number" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2" /></div>
                      </div>
                      <div><label className="block text-sm font-semibold mb-1">Deskripsi Lengkap</label><textarea required rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2"></textarea></div>
                      <div className="mt-2"><label className="block text-sm font-semibold mb-1">Foto Produk</label><div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center bg-white relative">{imageFile ? <span className="text-green-600 font-bold">✓ {imageFile.name} siap!</span> : <><Upload className="text-gray-400 mb-2" size={28} /><span className="text-sm text-gray-500">Pilih gambar</span></>}<input type="file" accept="image/*" required onChange={(e) => setImageFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /></div></div>
                      <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-bold text-white bg-primary hover:bg-secondary mt-6">{loading ? 'Mengunggah...' : 'Upload Produk'}</button>
                    </form>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {myProducts.map(item => (
                    <div key={item.id} className="border p-4 rounded-xl flex gap-4 items-center bg-white">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1"><span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{item.category}</span><button onClick={() => handleDeleteProduct(item.id)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={18} /></button></div>
                        <h4 className="font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                        <p className="text-secondary font-bold">Rp {item.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 mt-2 flex items-center gap-1"><Package size={14} className="text-gray-400" /> Stok: {item.stock || 0} pcs</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;