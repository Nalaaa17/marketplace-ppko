import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Target, Lightbulb, MapPin, Users, Award, TrendingUp, CheckCircle } from 'lucide-react';

const About = ({ onNavigate, session }) => {
  
  const teamMembers = [
    { id: 1, name: "Budi Santoso", role: "Ketua Program", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 2, name: "Siti Aminah", role: "Koordinator UMKM", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 3, name: "Rudi Hartono", role: "Tim Digitalisasi", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 4, name: "Dewi Lestari", role: "Sekretaris", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-slate-800">
     <Navbar onNavigate={onNavigate} session={session} cart={cart} hasNewOrder={hasNewOrder} />

      {/* --- HEADER --- */}
      <div className="bg-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Tentang <span className="text-secondary">POJOK DESA DIGITAL</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Platform digital pemberdayaan UMKM untuk transformasi ekonomi kreatif warga desa menuju kemandirian yang berkelanjutan.
          </p>
        </div>
      </div>

      {/* --- VISI & MISI --- */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Visi */}
          <div className="bg-[#E6F4F1] p-8 rounded-2xl border border-[#bce3db]">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#00A99D] p-2 rounded-full text-white">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#006860]">Visi Kami</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Menjadi platform digital terdepan dalam pemberdayaan ekonomi desa melalui pengembangan UMKM yang <span className="font-bold text-[#00A99D]">berkelanjutan</span> dan <span className="font-bold text-[#00A99D]">inovatif</span>.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-[#FFF8E1] p-8 rounded-2xl border border-[#ffe082]">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#FFB300] p-2 rounded-full text-white">
                <Lightbulb size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#b37d00]">Misi Kami</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#FFB300] mt-1">➜</span> Memberikan platform marketplace untuk produk lokal.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFB300] mt-1">➜</span> Menyediakan pendidikan dan pelatihan keterampilan digital.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFB300] mt-1">➜</span> Membangun komunitas wirausaha yang saling mendukung.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- PROFIL DESA --- */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-secondary p-2 rounded-lg text-white">
                <MapPin size={24} />
              </div>
              <h2 className="text-2xl font-bold text-primary">Profil Desa Sejahtera</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Data Wilayah</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            <span className="font-semibold text-gray-600 w-32">Lokasi:</span>
                            <span>Kec. Makmur, Kab. Maju</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            <span className="font-semibold text-gray-600 w-32">Luas Wilayah:</span>
                            <span>15.5 km²</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            <span className="font-semibold text-gray-600 w-32">Penduduk:</span>
                            <span>± 4,200 Jiwa</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Potensi Unggulan</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-gray-700">
                            <Star className="text-yellow-500" size={18} fill="currentColor" /> Produksi Kopi Robusta & Arabika
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <Star className="text-yellow-500" size={18} fill="currentColor" /> Kerajinan Anyaman Bambu
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <Star className="text-yellow-500" size={18} fill="currentColor" /> Wisata Alam Air Terjun
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <Star className="text-yellow-500" size={18} fill="currentColor" /> Peternakan Madu Hutan
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* --- PROGRAM KERJA (Fase) --- */}
      <section className="bg-[#F0F9FF] py-16">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Program Pemberdayaan</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
                {/* Fase 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                    <div className="w-16 h-16 bg-[#00A99D] rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">1</div>
                    <h3 className="font-bold text-lg mb-2">Fase Inisiasi</h3>
                    <p className="text-sm text-gray-600">Identifikasi potensi desa & Pelatihan dasar kewirausahaan.</p>
                </div>
                {/* Fase 2 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                    <div className="w-16 h-16 bg-[#FFB300] rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">2</div>
                    <h3 className="font-bold text-lg mb-2">Fase Pengembangan</h3>
                    <p className="text-sm text-gray-600">Digitalisasi produk, branding, dan on-boarding ke marketplace.</p>
                </div>
                {/* Fase 3 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">3</div>
                    <h3 className="font-bold text-lg mb-2">Fase Kemandirian</h3>
                    <p className="text-sm text-gray-600">Perluasan pasar, ekspor, dan keberlanjutan bisnis.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- STATISTIK & TIM --- */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Statistik */}
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-10">Pencapaian Program</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <Users className="mx-auto text-secondary mb-3" size={40} />
                    <h3 className="text-4xl font-bold text-primary mb-1">85+</h3>
                    <p className="text-gray-500">UMKM Diberdayakan</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <Award className="mx-auto text-secondary mb-3" size={40} />
                    <h3 className="text-4xl font-bold text-primary mb-1">70+</h3>
                    <p className="text-gray-500">Pelatihan Terlaksana</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <TrendingUp className="mx-auto text-secondary mb-3" size={40} />
                    <h3 className="text-4xl font-bold text-primary mb-1">50%</h3>
                    <p className="text-gray-500">Kenaikan Pendapatan</p>
                </div>
            </div>
        </div>

        {/* Tim Kami */}
        <div>
            <h2 className="text-3xl font-bold text-center text-primary mb-10">Tim Kami</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member) => (
                    <div key={member.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition">
                        <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-background"
                        />
                        <h3 className="font-bold text-lg text-primary">{member.name}</h3>
                        <p className="text-sm text-secondary font-medium">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- CTA BOTTOM --- */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="bg-primary rounded-2xl p-10 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Tertarik Bergabung?</h2>
                <p className="text-accent max-w-2xl mx-auto mb-8">
                    Hubungi kami untuk informasi lebih lanjut tentang program pemberdayaan UMKM yang inovatif.
                </p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => onNavigate('contact')} className="bg-secondary px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition shadow-lg">
                        Hubungi Kami
                    </button>
                    <button onClick={() => onNavigate('marketplace')} className="border border-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition">
                        Lihat Produk UMKM
                    </button>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Komponen tambahan untuk ikon bintang (karena lucide-react Star tidak support fill di versi lama kadang-kadang)
const Star = ({ size, className, fill }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={fill || "none"} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

export default About;