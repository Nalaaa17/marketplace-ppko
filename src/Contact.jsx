import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { MapPin, Mail, Phone, MessageCircle, Send, HelpCircle } from 'lucide-react';

const Contact = ({ onNavigate, session }) => {
  // State untuk form (agar terlihat interaktif)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Pendaftaran Penjual',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesan Anda telah terkirim! Admin kami akan segera menghubungi via WhatsApp.");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-slate-800">
     <Navbar onNavigate={onNavigate} session={session} cart={cart} hasNewOrder={hasNewOrder} />

      {/* --- HEADER --- */}
      <div className="bg-primary text-white py-16 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-accent text-lg max-w-2xl mx-auto">
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami untuk pendaftaran mitra UMKM atau pertanyaan lainnya.
          </p>
        </div>
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      {/* --- KONTEN UTAMA (Grid Layout) --- */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* KOLOM KIRI: Info Kontak */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-primary mb-6">Informasi Kontak</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-secondary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Alamat</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Balai Desa Sejahtera<br/>
                      Kecamatan Makmur, Kabupaten Maju<br/>
                      Jawa Timur, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-secondary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Email</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      halo@desamarket.id<br/>
                      admin@desamarket.id
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontak Cepat Buttons */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Kontak Cepat</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition shadow-md">
                  <MessageCircle size={20} /> WhatsApp Kami
                </button>
                <button className="w-full bg-secondary hover:bg-primary text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition shadow-md">
                  <Mail size={20} /> Email Kami
                </button>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Form Pesan */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-primary mb-6 border-l-4 border-sand pl-4">
              Kirim Pesan / Daftar Mitra
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
                    placeholder="Nama Anda"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
                    placeholder="email@anda.com"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon / WA</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
                    placeholder="0812..."
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subjek *</label>
                  <select 
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
                    onChange={handleChange}
                  >
                    <option value="Pendaftaran Penjual">Daftar Jadi Penjual</option>
                    <option value="Tanya Produk">Pertanyaan Produk</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan Anda *</label>
                <textarea 
                  name="message"
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
                  placeholder="Tuliskan detail pertanyaan atau jenis produk yang ingin Anda jual..."
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary transition flex items-center gap-2">
                <Send size={18} /> Kirim Pesan
              </button>
            </form>
          </div>

        </div>

        {/* --- LOKASI KAMI (Placeholder Map) --- */}
        <div className="mt-20">
            <h3 className="text-2xl font-bold text-center text-primary mb-8">Lokasi Kami</h3>
            <div className="w-full h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center relative group">
                {/* Ini simulasi Map, nanti bisa diganti iframe Google Maps asli */}
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-20 bg-cover bg-center"></div>
                <div className="text-center z-10">
                    <MapPin size={48} className="text-red-500 mx-auto mb-2 animate-bounce" />
                    <p className="text-gray-500 font-bold">Peta Google Maps akan dimuat di sini</p>
                    <p className="text-xs text-gray-400">Desa Sejahtera, Jawa Timur</p>
                </div>
            </div>
        </div>

        {/* --- FAQ SECTION (Sesuai Screenshot) --- */}
        <div className="mt-20">
            <h3 className="text-2xl font-bold text-center text-primary mb-10">Pertanyaan Yang Sering Diajukan</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
                {/* FAQ 1 */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h4 className="font-bold text-lg text-primary mb-2">Apakah layanan ini gratis?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Ya, semua layanan pembelajaran dan akses marketplace adalah gratis untuk semua pengguna dan warga desa yang ingin mendaftar.
                    </p>
                </div>

                {/* FAQ 2 */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h4 className="font-bold text-lg text-primary mb-2">Bagaimana cara bergabung menjadi penjual?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Hubungi kami melalui WhatsApp atau isi formulir di atas. Admin kami akan memandu proses verifikasi produk UMKM Anda.
                    </p>
                </div>

                {/* FAQ 3 */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h4 className="font-bold text-lg text-primary mb-2">Apakah ada program pelatihan offline?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Ya, kami mengadakan pelatihan digital marketing dan pengemasan produk secara rutin di Balai Desa setiap bulan.
                    </p>
                </div>

                {/* FAQ 4 */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h4 className="font-bold text-lg text-primary mb-2">Bagaimana sistem pembayaran produk?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Saat ini pembayaran dilakukan langsung dengan penjual melalui WhatsApp (Transfer Bank) atau COD (Cash on Delivery).
                    </p>
                </div>
            </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Contact;