import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft, LogIn, UserPlus, User, Phone } from 'lucide-react';
import { supabase } from './supabase'; 

const Auth = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Tambahan state untuk Register
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' }); 

    try {
      if (isLogin) {
        // --- PROSES LOGIN ---
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        setMessage({ type: 'success', text: 'Login berhasil! Mengalihkan...' });
        setTimeout(() => onNavigate('home'), 1500); 

      } else {
        // --- PROSES REGISTER DENGAN DATA LENGKAP ---
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { 
              username: username, 
              phone: phone,
              address: '', // Dikosongkan dulu, diisi nanti di Profil
              avatar_url: '' 
            }
          }
        });
        if (error) throw error;
        
        setMessage({ type: 'success', text: 'Pendaftaran berhasil! Silakan masuk.' });
        setIsLogin(true); 
        setPassword(''); 
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      
      {/* KOLOM KIRI (DESKTOP) */}
      <div className="hidden md:flex md:w-1/2 bg-primary text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 hover:text-sand transition mb-12">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </button>
          <div className="w-12 h-12 bg-sand rounded-xl flex items-center justify-center text-primary font-bold text-2xl mb-6">D</div>
          <h1 className="text-4xl font-bold mb-4">Selamat Datang di <br/><span className="text-sand">DesaMarket</span></h1>
          <p className="text-accent text-lg max-w-md">Platform pemberdayaan UMKM lokal. Belanja produk desa, dukung ekonomi warga, dan ciptakan dampak nyata.</p>
        </div>
        <div className="relative z-10 text-sm text-gray-400">© 2026 DesaMarket. Hak Cipta Dilindungi.</div>
      </div>

      {/* KOLOM KANAN: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 relative overflow-y-auto max-h-screen">
        <button onClick={() => onNavigate('home')} className="md:hidden absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-primary transition"><ArrowLeft size={20} /></button>

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 my-8">
          <h2 className="text-3xl font-bold text-primary mb-2">{isLogin ? 'Masuk ke Akun' : 'Daftar Akun Baru'}</h2>
          <p className="text-gray-500 mb-8">{isLogin ? 'Silakan masukkan email dan password Anda.' : 'Isi data di bawah untuk mulai berbelanja.'}</p>

          {message.text && (
            <div className={`p-4 mb-6 rounded-lg text-sm font-semibold ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            
            {/* TAMPILKAN USERNAME & PHONE HANYA SAAT REGISTER */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Username Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3 text-gray-400" size={18} />
                    <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-1 outline-none transition" placeholder="Cth: Budi Santoso" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Telepon / WA</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3 text-gray-400" size={18} />
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-1 outline-none transition" placeholder="08123456789" />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3 text-gray-400" size={18} />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-1 outline-none transition" placeholder="nama@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3 text-gray-400" size={18} />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-1 outline-none transition" placeholder="Minimal 6 karakter" />
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg font-bold text-white transition flex justify-center items-center gap-2 mt-2 ${loading ? 'bg-gray-400' : 'bg-secondary hover:bg-primary shadow-lg'}`}>
              {loading ? 'Memproses...' : (isLogin ? <><LogIn size={18}/> Masuk</> : <><UserPlus size={18}/> Daftar Sekarang</>)}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-secondary font-bold hover:underline">
              {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;