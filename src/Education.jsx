import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { PlayCircle, Clock, Users, BookOpen, Star, Award, ChevronRight, BarChart } from 'lucide-react';

const Education = ({ onNavigate, session }) => {
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Data Dummy Modul Pembelajaran (Sesuai Referensi)
  const courses = [
    { 
      id: 1, 
      title: "Memulai Usaha dari Nol", 
      category: "Bisnis Dasar", 
      level: "Pemula", 
      duration: "45 Menit", 
      modules: 8, 
      students: 150, 
      rating: 4.8, 
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400&h=250" 
    },
    { 
      id: 2, 
      title: "Digital Marketing UMKM", 
      category: "Digital Marketing", 
      level: "Menengah", 
      duration: "60 Menit", 
      modules: 10, 
      students: 120, 
      rating: 4.9, 
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=400&h=250" 
    },
    { 
      id: 3, 
      title: "Fotografi Produk dengan HP", 
      category: "Produksi", 
      level: "Pemula", 
      duration: "30 Menit", 
      modules: 5, 
      students: 200, 
      rating: 4.7, 
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400&h=250" 
    },
    { 
      id: 4, 
      title: "Manajemen Keuangan Sederhana", 
      category: "Keuangan", 
      level: "Lanjutan", 
      duration: "90 Menit", 
      modules: 12, 
      students: 85, 
      rating: 4.9, 
      image: "https://images.unsplash.com/photo-1554224155-98406858d0cb?auto=format&fit=crop&q=80&w=400&h=250" 
    },
    { 
      id: 5, 
      title: "Optimasi WhatsApp Business", 
      category: "Digital Marketing", 
      level: "Pemula", 
      duration: "40 Menit", 
      modules: 6, 
      students: 300, 
      rating: 4.8, 
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400&h=250" 
    },
    { 
      id: 6, 
      title: "Pengemasan (Packaging) Menarik", 
      category: "Produksi", 
      level: "Menengah", 
      duration: "50 Menit", 
      modules: 7, 
      students: 95, 
      rating: 4.6, 
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400&h=250" 
    }
  ];

  const categories = ["Semua", "Bisnis Dasar", "Digital Marketing", "Keuangan", "Produksi"];

  const filteredCourses = activeCategory === "Semua" 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  return (
    <div className="min-h-screen bg-background font-sans text-slate-800">
      <Navbar onNavigate={onNavigate} session={session} cart={cart} hasNewOrder={hasNewOrder} />

      {/* --- HERO SECTION (Desain Baru: Split Layout) --- */}
      <div className="bg-primary relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 skew-x-12 transform origin-top translate-x-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-3/5 text-white space-y-6">
            <div className="flex items-center gap-2 text-sand font-bold tracking-wider uppercase text-sm">
              <BookOpen size={18} /> Akademi Desa Digital
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Tingkatkan Omset UMKM dengan <span className="text-sand underline decoration-4 underline-offset-4">Ilmu Praktis</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl">
              Platform pembelajaran gratis untuk warga desa. Pelajari cara memulai bisnis, pemasaran digital, hingga manajemen keuangan langsung dari ahlinya.
            </p>
            
            {/* Statistik Mini di Header */}
            <div className="flex gap-8 pt-4 border-t border-white/20 mt-4">
              <div>
                <p className="text-3xl font-bold text-sand">25+</p>
                <p className="text-xs text-gray-400">Modul Gratis</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sand">500+</p>
                <p className="text-xs text-gray-400">Warga Belajar</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sand">100%</p>
                <p className="text-xs text-gray-400">Gratis Akses</p>
              </div>
            </div>
          </div>
          
          {/* Card Hero Image */}
          <div className="md:w-2/5 relative">
            <div className="bg-white p-2 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition duration-500">
                <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600" 
                    alt="Belajar" 
                    className="rounded-xl w-full object-cover h-64 md:h-80"
                />
                <div className="absolute -bottom-5 -left-5 bg-secondary text-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                    <div className="bg-sand p-2 rounded-full text-primary">
                        <PlayCircle size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold opacity-80">Sedang Populer</p>
                        <p className="font-bold">Digital Marketing</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- KATEGORI & KONTEN --- */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Filter Tabs (Desain Pil/Capsule) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Award className="text-secondary" /> Katalog Modul
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition ${
                  activeCategory === cat 
                  ? "bg-secondary text-white shadow-lg shadow-blue-900/20" 
                  : "bg-white text-gray-500 border border-gray-200 hover:border-secondary hover:text-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300 group flex flex-col h-full">
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-3 left-3 z-10">
                    <span className={`px-3 py-1 rounded text-xs font-bold text-white ${
                        course.level === "Pemula" ? "bg-green-500" : 
                        course.level === "Menengah" ? "bg-yellow-500" : "bg-red-500"
                    }`}>
                        {course.level}
                    </span>
                </div>
                <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <button className="bg-white text-primary rounded-full p-3 hover:scale-110 transition">
                        <PlayCircle size={32} />
                    </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">{course.category}</span>
                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                        <Star size={14} fill="currentColor"/> {course.rating}
                    </div>
                </div>
                
                <h3 className="text-lg font-bold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition">
                    {course.title}
                </h3>

                {/* Meta Info */}
                <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Clock size={16} /> {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                            <BookOpen size={16} /> {course.modules} Modul
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users size={16} /> {course.students} Peserta
                    </div>
                </div>

                <button className="w-full mt-4 bg-background text-primary border border-primary font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition flex items-center justify-center gap-2">
                    Mulai Belajar <ChevronRight size={16}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- CTA SECTION (Berbeda dari Marketplace) --- */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
  <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
    
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>

    <div className="relative z-10">
      <h2 className="text-3xl font-bold mb-4">Siap Mengembangkan Usaha Anda?</h2>
      <p className="text-accent max-w-2xl mx-auto mb-8">
        Bergabunglah dengan ribuan pelaku UMKM lainnya yang telah merasakan manfaat dari pembelajaran berkualitas. Gratis selamanya.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {/* Tombol 1: Style Solid */}
        <button className="bg-secondary px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition shadow-lg">
          Daftar Kelas Gratis Sekarang
        </button>
        
        {/* Tombol 2: Style Outline (Agar layout sama persis dengan SS) */}
        <button className="border border-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition">
          Hubungi Admin
        </button>
      </div>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default Education;