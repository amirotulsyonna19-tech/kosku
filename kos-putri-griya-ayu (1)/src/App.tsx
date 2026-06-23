/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  MapPin, 
  Phone, 
  Instagram, 
  Check, 
  Shield, 
  Wifi, 
  Zap, 
  Menu, 
  X, 
  Sparkles, 
  MessageSquare, 
  Compass, 
  BookOpen, 
  Clock,
  AlertCircle,
  TrendingDown,
  ExternalLink,
  Lock,
  User,
  LogOut,
  Settings,
  Heart,
  Plus,
  Minus,
  CheckCircle,
  TrendingUp,
  XCircle,
  Bell,
  Trash2,
  FileText
} from 'lucide-react';

// Default static and initial state data
const KOS_INFO = {
  name: "Kos Putri Griya Ayu",
  tagline: "Hunian Putri Aman, Nyaman, dan Strategis dekat Kampus",
  description: "Kos Putri Griya Ayu adalah pilihan hunian eksklusif terbaik bagi mahasiswi dan karyawati di Kediri. Mengutamakan keamanan, kebersihan, dan kenyamanan lingkungan dengan fasilitas lengkap dan desain estetik bergaya modern-feminin.",
  location: {
    district: "Mojoroto",
    city: "Kediri",
    province: "Jawa Timur",
    full_address: "Jl. Jaksa Agung Suprapto, Gg. Griya Ayu No. 12, Mojoroto, Kota Kediri, Jawa Timur 64112",
    google_maps_url: "https://maps.google.com/?q=Mojoroto+Kediri+Jawa+Timur"
  },
  rooms: {
    total: 15,
    inclusions: [
      "Koneksi Internet Wi-Fi Cepat",
      "Sistem Air Bersih lancar",
      "Iuran Pengelolaan Sampah",
      "Keamanan & CCTV Area Bersama"
    ],
    note: "Biaya listrik menggunakan sistem token mandiri per kamar."
  },
  contact: {
    whatsapp: "+6281234567890",
    instagram: "kosputri_griyaayu",
    tiktok: "griyaayukos",
    whatsapp_formatted: "0812-3456-7890"
  }
};

const INITIAL_ROOM_TYPES = [
  {
    id: "tipe-non-ac",
    name: "Tipe Kamar 1 (Non-AC)",
    price_formatted: "Rp 700.000",
    price_val: 700000,
    image_url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
    facilities: [
      "Kasur Nyaman (Sprei & Bantal)",
      "Kipas Angin Dinding",
      "Kamar Mandi Dalam (Shower & Kloset)",
      "Rak Buku & Meja Belajar",
      "Lemari Pakaian Minimalis",
      "Ventilasi & Pencahayaan Alami"
    ],
    status: "Tersedia"
  },
  {
    id: "tipe-ac",
    name: "Tipe Kamar 2 (AC)",
    price_formatted: "Rp 800.000",
    price_val: 800000,
    image_url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
    facilities: [
      "Kasur Springbed Premium (Sprei & Bantal)",
      "Air Conditioner (AC) Hemat Energi",
      "Kamar Mandi Dalam (Shower, Kloset Duduk & Ember)",
      "Rak Buku, Meja Belajar & Kursi Kerja",
      "Lemari Pakaian 2 Pintu dengan Cermin",
      "Gorden Cantik & Jendela Menghadap Taman"
    ],
    status: "Tersedia - Terbatas"
  }
];

// Mock database for users
const MOCK_USERS = [
  { username: 'putri', pin: '1234', fullName: 'Putri Salsabila', role: 'tenant', email: 'putri.salsa@student.id' },
  { username: 'admin', pin: '9999', fullName: 'Ibu Hajah Ayu', role: 'admin', email: 'owner.griyaayu@gmail.com' }
];

export default function App() {
  // Mobile UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Authentication States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [currentUser, setCurrentUser] = useState<typeof MOCK_USERS[0] | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register state helper
  const [isRegistering, setIsRegistering] = useState(false);
  const [regUsername, setRegUsername] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regPin, setRegPin] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState<typeof MOCK_USERS>(MOCK_USERS);

  // Dynamic state governed by simulated state (Admin & Tenant Control)
  const [roomsAvailable, setRoomsAvailable] = useState(3);
  const [roomTypes, setRoomTypes] = useState(INITIAL_ROOM_TYPES);
  const [announcement, setAnnouncement] = useState("Diskon khusus Rp 50.000 untuk pembayaran langsung 3 bulan pertama!");
  
  // Simulated Tenant / Admin Actions log
  const [activityLogs, setActivityLogs] = useState<Array<{id: string, text: string, time: string}>>([
    { id: "1", text: "Putri Salsabila melakukan simulasi pesan kamar Tipe 2 (AC)", time: "10:15 WIB" },
    { id: "2", text: "Sistem meng-update kapasitas kamar kosong otomatis", time: "08:00 WIB" }
  ]);

  // Tenant Interactive States
  const [favorites, setFavorites] = useState<string[]>(["tipe-ac"]);
  const [tenantNote, setTenantNote] = useState("");
  const [bookingStatus, setBookingStatus] = useState<"belum" | "proses" | "disetujui">("proses");
  const [selectedBookingRoom, setSelectedBookingRoom] = useState("Tipe Kamar 2 (AC)");

  // Handle Dynamic Toast notifications
  const triggerToast = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => {
      setShowNotification(null);
    }, 4500);
  };

  // Run initial state load for demo notes
  useEffect(() => {
    // Populate simple note
    setTenantNote("Ingin survey hari Sabtu jam 10 pagi bersama orang tua untuk melihat sirkulasi udara kamar.");
  }, []);

  // Professional Alert/Notification Helper
  const triggerAppAlert = (title: string, message: string, onConfirm?: () => void) => {
    const hasConfirmed = window.confirm(`🌸 ${title} 🌸\n\n${message}`);
    if (hasConfirmed && onConfirm) {
      onConfirm();
    }
  };

  // Perform Simulated Auth check
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    // Check primary static list + dynamically registered users
    const foundUser = registeredUsers.find(
      u => u.username.toLowerCase() === loginUsername.toLowerCase() && u.pin === loginPin
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setIsLoginModalOpen(false);
      setLoginUsername('');
      setLoginPin('');
      triggerToast(`Selamat datang kembali, ${foundUser.fullName}! ✨`);
      // Log event
      setActivityLogs(prev => [
        { id: Date.now().toString(), text: `${foundUser.fullName} masuk ke sistem sebagai ${foundUser.role === 'admin' ? 'Pemilik' : 'Pencari Kos'}`, time: "Baru saja" },
        ...prev
      ]);
    } else {
      setLoginError("ID Pengguna atau PIN salah. Silakan coba lagi.");
    }
  };

  // Perform Simulated Account Registration
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUsername || !regFullName || !regPin) {
      setLoginError("Semua kolom registrasi wajib diisi.");
      return;
    }

    const exists = registeredUsers.some(u => u.username.toLowerCase() === regUsername.toLowerCase());
    if (exists) {
      setLoginError("Username sudah terdaftar.");
      return;
    }

    const newUser = {
      username: regUsername.toLowerCase(),
      pin: regPin,
      fullName: regFullName,
      role: 'tenant' as const,
      email: `${regUsername}@student.id`
    };

    setRegisteredUsers(prev => [...prev, newUser]);
    setIsRegistering(false);
    setLoginUsername(newUser.username);
    setLoginPin(newUser.pin);
    setLoginError(null);
    triggerToast("Registrasi sukses! Silakan klik tombol Masuk.");
  };

  const handleLogout = () => {
    if (currentUser) {
      setActivityLogs(prev => [
        { id: Date.now().toString(), text: `${currentUser.fullName} keluar dari sistem`, time: "Baru saja" },
        ...prev
      ]);
      triggerToast(`Sampai jumpa kembali, ${currentUser.fullName}! 👋`);
      setCurrentUser(null);
    }
  };

  // Live booking link builder
  const handleBookingClick = (roomName: string, price: string) => {
    const waText = encodeURIComponent(`Halo Ibu Pengelola, saya tertarik untuk memesan ${roomName} (Harga: ${price}/bulan) di Kos Putri Griya Ayu. Apakah masih ada kamar kosong yang tersedia untuk survei?`);
    const confirmMessage = `Kamar: ${roomName}\nHarga: ${price}/bulan\n\nSistem terintegrasi akan menghubungkan langsung ke WhatsApp Pemilik (${KOS_INFO.contact.whatsapp_formatted}) untuk konfirmasi. Lanjutkan?`;
    
    // Add transaction to Log
    setActivityLogs(prev => [
      { id: Date.now().toString(), text: `Pengunjung mengklik 'Pesan Sekarang' untuk ${roomName}`, time: "Baru saja" },
      ...prev
    ]);

    triggerAppAlert("Konfirmasi Reservasi Instan", confirmMessage, () => {
      window.open(`https://wa.me/${KOS_INFO.contact.whatsapp.replace('+', '')}?text=${waText}`, '_blank');
    });
  };

  const handleSocialClick = (platform: string, handle: string, url: string) => {
    triggerAppAlert(
      `Hubungi Via ${platform}`,
      `Membuka profil resmi kami di @${handle}. Silakan follow untuk update ketersediaan kamar harian!`,
      () => {
        window.open(url, '_blank');
      }
    );
  };

  const openGoogleMaps = () => {
    triggerAppAlert(
      "Arahkan Rute Lokasi",
      `Alamat Kos Putri Griya Ayu:\n${KOS_INFO.location.full_address}\n\nApakah anda ingin membuka Google Maps untuk petunjuk arah langsung?`,
      () => {
        window.open(KOS_INFO.location.google_maps_url, '_blank');
      }
    );
  };

  // Toggle favorite room
  const toggleFavorite = (roomId: string) => {
    setFavorites(prev => 
      prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
    );
    triggerToast(favorites.includes(roomId) ? "Dihapus dari wishlist" : "Ditambahkan ke wishlist kamar ❤️");
  };

  // ADMIN CONTROLS: Change variables
  const changeAvailableRooms = (amount: number) => {
    setRoomsAvailable(prev => {
      const next = prev + amount;
      if (next < 0 || next > KOS_INFO.rooms.total) return prev;
      triggerToast(`Kamar tersedia berhasil diubah menjadi ${next} unit!`);
      return next;
    });
    // Log
    setActivityLogs(prev => [
      { id: Date.now().toString(), text: `Ibu Hajah Ayu (Admin) mengubah kamar kosong tersedia menjadi ${roomsAvailable + amount} unit.`, time: "Baru saja" },
      ...prev
    ]);
  };

  const changeRoomPrice = (id: string, rateChange: number) => {
    setRoomTypes(prev => prev.map(room => {
      if (room.id === id) {
        const nextVal = room.price_val + rateChange;
        const formatted = "Rp " + nextVal.toLocaleString('id-ID');
        triggerToast(`Tarif sewa ${room.name} berhasil disesuaikan!`);
        return {
          ...room,
          price_val: nextVal,
          price_formatted: formatted
        };
      }
      return room;
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F8FA] text-[#2D2627] flex flex-col font-sans selection:bg-[#FFD1DC] selection:text-[#9E5661]">
      
      {/* GLOBAL TOAST BANNER */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#9E5661] text-white px-6 py-3.5 rounded-full shadow-[0_10px_25px_rgba(158,86,97,0.25)] flex items-center gap-3 border border-[#F3C5C5] text-sm font-semibold text-center"
          >
            <span>🌸</span>
            <span>{showNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP ANNOUNCEMENT BROADCAST BANNER */}
      <div className="bg-[#9E5661] text-[#FFF3F5] text-xs sm:text-sm font-semibold py-2.5 px-4 text-center border-b border-[#FFD1DC]/20 flex items-center justify-center gap-2 relative">
        <Bell size={14} className="animate-bounce" />
        <span className="truncate">{announcement}</span>
        {currentUser?.role === 'admin' && (
          <button 
            onClick={() => {
              const newAnn = prompt("Masukkan pengumuman baru untuk penghuni:", announcement);
              if (newAnn) {
                setAnnouncement(newAnn);
                triggerToast("Broadcast pengumuman berhasil diperbarui!");
              }
            }}
            className="ml-3 bg-white/20 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold hover:bg-white/30"
          >
            Edit Banner ✏️
          </button>
        )}
      </div>

      {/* 1. STICKY HEADER & NAVBAR */}
      <header className="sticky top-0 bg-white z-40 border-b-2 border-[#FFD1DC] shadow-[0_4px_15px_rgba(183,110,121,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-[#9E5661]">
            <span className="text-2xl">🌸</span>
            <span>{KOS_INFO.name}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#dashboard" className="font-semibold text-sm hover:text-[#B76E79] transition-colors">Dashboard</a>
            <a href="#fasilitas-harga" className="font-semibold text-sm hover:text-[#B76E79] transition-colors">Fasilitas &amp; Harga</a>
            <a href="#narahubung" className="font-semibold text-sm hover:text-[#B76E79] transition-colors">Narahubung</a>
            
            {currentUser && (
              <a href="#member-portal" className="font-bold text-sm text-[#B76E79] hover:text-[#9E5661] flex items-center gap-1 bg-[#FFF3F5] px-3.5 py-1.5 rounded-full border border-[#FFD1DC]">
                👤 Portal {currentUser.role === 'admin' ? 'Ibu Kos' : 'Pencari'}
              </a>
            )}

            {/* Authentication Action Button */}
            {!currentUser ? (
              <button 
                onClick={() => {
                  setIsRegistering(false);
                  setIsLoginModalOpen(true);
                  setLoginError(null);
                }}
                className="bg-[#B76E79] hover:bg-[#9E5661] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-md shadow-pink-100 flex items-center gap-1.5"
              >
                <Lock size={14} /> Portal Login
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#2D2627]/70 hidden lg:inline">
                  {currentUser.fullName}
                </span>
                <button 
                  onClick={handleLogout}
                  className="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 p-2.5 rounded-full transition-colors"
                  title="Logout Akun"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            {currentUser && (
              <span className="text-[11px] font-bold bg-[#FFD1DC] text-[#9E5661] px-2.5 py-1 rounded-full">
                👤 {currentUser.username}
              </span>
            )}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#9E5661] p-2 rounded-lg hover:bg-[#FFF3F5] transition-colors"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-[#FFD1DC] absolute w-full left-0 shadow-lg px-6 py-6 flex flex-col gap-4 z-50"
            >
              <a 
                href="#dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-[#2D2627] hover:text-[#B76E79] py-2 border-b border-gray-100"
              >
                Dashboard
              </a>
              <a 
                href="#fasilitas-harga" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-[#2D2627] hover:text-[#B76E79] py-2 border-b border-gray-100"
              >
                Fasilitas &amp; Harga
              </a>
              <a 
                href="#narahubung" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-[#2D2627] hover:text-[#B76E79] py-2 border-b border-gray-100"
              >
                Narahubung
              </a>
              
              {currentUser ? (
                <>
                  <a 
                    href="#member-portal" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-semibold text-[#B76E79] py-2 border-b border-gray-100 flex items-center gap-1.5"
                  >
                    👤 Portal {currentUser.role === 'admin' ? 'Ibu Kos' : 'Pencari'}
                  </a>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full bg-red-50 text-red-600 py-3 rounded-xl text-center font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} /> Keluar Akun ({currentUser.fullName})
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsRegistering(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="bg-[#B76E79] text-white py-3 rounded-xl text-center font-bold hover:bg-[#9E5661] transition-colors flex items-center justify-center gap-2"
                >
                  <Lock size={16} /> Portal Login Anggota
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. INSTANT LOGIN SYSTEM INFO / INSTRUCTION BOX FOR TESTING */}
      <div className="bg-[#FFFEEF] border-b border-[#EBE39B] py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-xs">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertCircle size={15} className="shrink-0 text-amber-600" />
            <p>
              <strong>SISTEM LOGIN AKTIF:</strong> Klik tombol &apos;Portal Login&apos; di kanan atas. Kami menyediakan 2 akun demo demi kemudahan eksperimen Anda:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-1 rounded">
              🔑 <strong>Admin:</strong> admin / PIN: 9999
            </span>
            <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-1 rounded">
              🔑 <strong>Pencari:</strong> putri / PIN: 1234
            </span>
          </div>
        </div>
      </div>

      {/* 3. HERO / INTRODUCTION SECTION */}
      <section id="dashboard" className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#FFF3F5] py-12 lg:py-20 border-b-4 border-[#FFD1DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FFF3F5] border border-[#F3C5C5] text-[#9E5661] text-xs font-bold uppercase tracking-wider rounded-full w-fit mb-5 shadow-sm">
              <Sparkles size={12} /> Khusus Mahasiswi &amp; Karyawati
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#9E5661] tracking-tight leading-tight mb-4">
              Hunian Putri Nyaman &amp; Aman di Mojoroto Kediri
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-[#2D2627]/85 mb-5">
              {KOS_INFO.tagline}
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-2xl">
              {KOS_INFO.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#fasilitas-harga" 
                className="bg-[#B76E79] hover:bg-[#9E5661] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-pink-200/50 hover:translate-y-[-2px]"
              >
                Lihat Tipe Kamar
              </a>
              <a 
                href="#narahubung" 
                className="bg-white hover:bg-[#FFF3F5] text-[#B76E79] border-2 border-[#B76E79] px-8 py-3.5 rounded-xl font-bold transition-all hover:translate-y-[-2px]"
              >
                Tanya Ketersediaan
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(183,110,121,0.15)] border-4 border-white bg-white">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800" 
                alt="Kos Putri Griya Ayu Interior" 
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#9E5661] text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-md">
                ✨ Desain Estetik &amp; Tenang
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. STATISTICS INDICATOR BAR */}
      <section className="relative px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 z-20 mb-12">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-[0_12px_30px_rgba(183,110,121,0.08)] border border-[#FFD1DC] p-6 sm:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Total Rooms */}
            <div className="flex items-start gap-4 p-2">
              <div className="bg-[#FFF3F5] border border-[#F3C5C5] p-3 rounded-xl flex items-center justify-center text-2xl">
                🔑
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#9E5661]">{KOS_INFO.rooms.total} Kamar</h3>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-0.5">Kapasitas Maksimal</p>
                <p className="text-xs text-gray-400 mt-0.5">Bangunan 2 Lantai Eksklusif</p>
              </div>
            </div>

            {/* Dynamic Interactive Available Indicator */}
            <div className="flex items-start gap-4 p-2 border-t md:border-t-0 md:border-x border-gray-100 md:px-6">
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-center text-2xl text-emerald-600">
                🟢
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-emerald-600">{roomsAvailable} Tersedia</h3>
                  {currentUser?.role === 'admin' ? (
                    <div className="flex gap-1">
                      <button 
                        onClick={() => changeAvailableRooms(1)}
                        className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                        title="Tambah kamar kosong"
                      >
                        <Plus size={12} />
                      </button>
                      <button 
                        onClick={() => changeAvailableRooms(-1)}
                        className="bg-red-100 text-red-700 hover:bg-red-200 w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                        title="Kurangi kamar kosong"
                      >
                        <Minus size={12} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setRoomsAvailable(prev => prev > 1 ? prev - 1 : 4)}
                      className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded hover:bg-emerald-200 active:scale-95 transition-all font-semibold"
                      title="Eksperimen Ubah Angka Kamar"
                    >
                      Ubah Simulasi 🔄
                    </button>
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-0.5">Status Kamar Kosong</p>
                <p className="text-[11px] text-emerald-500 font-medium flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Ter-update hari ini
                </p>
              </div>
            </div>

            {/* Safety Indicator */}
            <div className="flex items-start gap-4 p-2 border-t md:border-t-0 border-gray-100">
              <div className="bg-[#FFF3F5] border border-[#F3C5C5] p-3 rounded-xl flex items-center justify-center text-2xl">
                🛡️
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#9E5661]">Aman &amp; Tenang</h3>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-0.5">Penjagaan CCTV 24H</p>
                <p className="text-xs text-gray-400 mt-0.5">Hanya mahasiswi &amp; tamu perempuan</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE PORTAL SECTION (SISTEM LOGIN ROLE PLAY) */}
      <AnimatePresence>
        {currentUser && (
          <motion.section 
            id="member-portal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16"
          >
            <div className="bg-white rounded-3xl border-2 border-[#FFD1DC] overflow-hidden shadow-lg">
              
              {/* Header Tab Info */}
              <div className="bg-gradient-to-r from-[#9E5661] to-[#B76E79] px-6 py-5 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                    🌸 Portal Anggota {currentUser.role === 'admin' ? '- Ibu Kos (Admin)' : '- Calon Pencari Kos'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold mt-1.5 flex items-center gap-2">
                    <User size={22} /> Selamat Datang, {currentUser.fullName}!
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-white text-[#9E5661] px-3 py-1.5 rounded-lg font-bold">
                    Email: {currentUser.email}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="bg-black/20 hover:bg-black/30 text-white text-xs px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1"
                  >
                    <LogOut size={13} /> Keluar
                  </button>
                </div>
              </div>

              {/* Portal Modules based on Role */}
              <div className="p-6 sm:p-8 bg-gray-50/50">
                
                {/* ROLE: PROSPECTIVE TENANT / PENCARI KOS */}
                {currentUser.role === 'tenant' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Notes & Survei Area */}
                    <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#FFD1DC] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-gray-800 flex items-center gap-1.5">
                            <FileText size={18} className="text-[#B76E79]" /> Catatan Jadwal Survei / Rencana Booking
                          </h3>
                          <span className="text-xs bg-pink-100 text-[#9E5661] font-bold px-2 py-0.5 rounded">
                            Pribadi 🔒
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          Simpan kelengkapan jadwal survei, rencana kedatangan, atau pertanyaan untuk Ibu Kos disini agar selalu teringat secara instan.
                        </p>
                        <textarea 
                          rows={4}
                          value={tenantNote}
                          onChange={(e) => setTenantNote(e.target.value)}
                          className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
                          placeholder="Contoh: Tolong siapkan kunci kamar dan kasur dibersihkan untuk survei hari Sabtu."
                        />
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[11px] text-gray-400">
                          Disimpan aman otomatis di peramban lokal Anda.
                        </span>
                        <button 
                          onClick={() => {
                            triggerToast("Catatan survei Anda berhasil diperbarui di server lokal!");
                            // Log
                            setActivityLogs(prev => [
                              { id: Date.now().toString(), text: `${currentUser.fullName} memperbarui lembar catatan survei mandiri.`, time: "Baru saja" },
                              ...prev
                            ]);
                          }}
                          className="text-xs bg-[#B76E79] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#9E5661]"
                        >
                          Simpan Catatan
                        </button>
                      </div>
                    </div>

                    {/* Booking Status & Selection */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                      
                      {/* Booking Tracker Module */}
                      <div className="bg-white p-5 rounded-2xl border border-[#FFD1DC] shadow-sm">
                        <h3 className="font-bold text-gray-800 text-sm mb-3">Status Pengajuan Survei &amp; Booking</h3>
                        
                        <div className="flex flex-col gap-3">
                          <div className="bg-pink-50/50 p-3 rounded-xl border border-[#FFD1DC]">
                            <p className="text-xs text-gray-400">Pilihan Tipe Kamar:</p>
                            <select 
                              value={selectedBookingRoom}
                              onChange={(e) => {
                                setSelectedBookingRoom(e.target.value);
                                triggerToast(`Sasaran pemesanan kamar diganti ke ${e.target.value}`);
                              }}
                              className="text-sm font-bold text-[#9E5661] bg-transparent outline-none w-full"
                            >
                              <option value="Tipe Kamar 1 (Non-AC)">Tipe Kamar 1 (Non-AC) - Rp 700.000</option>
                              <option value="Tipe Kamar 2 (AC)">Tipe Kamar 2 (AC) - Rp 800.000</option>
                            </select>
                          </div>

                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-xs text-gray-500">Status Pengajuan:</span>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                              bookingStatus === 'belum' ? 'bg-gray-100 text-gray-600' :
                              bookingStatus === 'proses' ? 'bg-amber-100 text-amber-700 animate-pulse' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                              🟢 {bookingStatus === 'belum' ? 'Survei Belum Diajukan' :
                                  bookingStatus === 'proses' ? 'Menunggu Konfirmasi Survei' :
                                  'Survei Disetujui (Silakan Datang)'}
                            </span>
                          </div>

                          <div className="flex gap-2 mt-2">
                            {bookingStatus === 'belum' && (
                              <button 
                                onClick={() => {
                                  setBookingStatus('proses');
                                  triggerToast("Pengajuan survei berhasil dikirim! Silakan hubungi pengelola via WA.");
                                }}
                                className="w-full bg-[#B76E79] text-white text-xs py-2.5 rounded-lg font-bold"
                              >
                                Ajukan Survei Sekarang
                              </button>
                            )}

                            {bookingStatus === 'proses' && (
                              <div className="flex gap-2 w-full">
                                <button 
                                  onClick={() => {
                                    setBookingStatus('disetujui');
                                    triggerToast(`Survei disetujui! Anda dijadwalkan melihat ${selectedBookingRoom}.`);
                                    setActivityLogs(prev => [
                                      { id: Date.now().toString(), text: `Ibu Ayu memberi persetujuan survei kamar untuk Putri Salsabila`, time: "Baru saja" },
                                      ...prev
                                    ]);
                                  }}
                                  className="w-1/2 bg-emerald-600 text-white text-xs py-2 rounded-lg font-bold hover:bg-emerald-700"
                                >
                                  Simulasi Setujui
                                </button>
                                <button 
                                  onClick={() => {
                                    setBookingStatus('belum');
                                    triggerToast("Pengajuan survei kamar dibatalkan.");
                                  }}
                                  className="w-1/2 bg-gray-150 text-gray-600 text-xs py-2 rounded-lg font-bold border hover:bg-gray-200"
                                >
                                  Batalkan Pengajuan
                                </button>
                              </div>
                            )}

                            {bookingStatus === 'disetujui' && (
                              <button 
                                onClick={() => {
                                  const contactText = encodeURIComponent(`Halo Ibu Kos, survei saya untuk ${selectedBookingRoom} telah disetujui di aplikasi. Saya akan datang membawa kartu identitas pada hari Sabtu ini.`);
                                  window.open(`https://wa.me/${KOS_INFO.contact.whatsapp.replace('+', '')}?text=${contactText}`, '_blank');
                                }}
                                className="w-full bg-emerald-600 text-white text-xs py-2.5 rounded-lg font-bold hover:bg-emerald-700 flex items-center justify-center gap-1.5"
                              >
                                <MessageSquare size={13} /> Hubungi WhatsApp Pengelola
                              </button>
                            )}
                          </div>

                        </div>
                      </div>

                      {/* Loved Listings Wishlist */}
                      <div className="bg-white p-5 rounded-2xl border border-[#FFD1DC] shadow-sm flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-400">Wishlist Kamar Anda:</p>
                          <p className="text-sm font-bold text-gray-700 mt-1">
                            {favorites.length === 0 ? "Tidak ada kamar difavoritkan" : `${favorites.length} Kamar Pilihan`}
                          </p>
                        </div>
                        <div className="flex gap-1.5">
                          {roomTypes.map(r => (
                            <button 
                              key={r.id} 
                              onClick={() => toggleFavorite(r.id)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs ${
                                favorites.includes(r.id) ? 'bg-red-50 text-red-500 border-red-200' : 'bg-gray-50 text-gray-400'
                              }`}
                              title={r.name}
                            >
                              ❤️
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* ROLE: ADMINISTRATIVE OWNER / IBU KOS */}
                {currentUser.role === 'admin' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Admin Adjustment Pricing & Stock controls */}
                    <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#FFD1DC] shadow-sm">
                      <h3 className="font-bold text-gray-800 flex items-center gap-1.5 mb-2">
                        <Settings size={18} className="text-[#B76E79]" /> Panel Kontrol Ibu Kos - Sesuaikan Tarif &amp; Data
                      </h3>
                      <p className="text-xs text-gray-500 mb-6">
                        Ubah data sewa bulanan dan kapasitas kamar secara real-time. Perubahan ini akan segera memodifikasi harga dan info di UI secara instan!
                      </p>

                      <div className="space-y-4">
                        {roomTypes.map(room => (
                          <div 
                            key={room.id}
                            className="bg-gray-50 p-4 rounded-xl border border-gray-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div>
                              <span className="text-[11px] bg-gray-200 text-gray-700 font-bold px-2 py-0.5 rounded-full block w-fit">
                                {room.id.toUpperCase()}
                              </span>
                              <h4 className="font-bold text-sm text-[#9E5661] mt-1">{room.name}</h4>
                              <p className="text-xs text-semibold mt-0.5 text-gray-650">Sewa: <strong className="text-gray-800">{room.price_formatted}</strong> / bulan</p>
                            </div>
                            
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-gray-400 mr-1.5 font-medium">Ubah Tarif:</span>
                              <button 
                                onClick={() => changeRoomPrice(room.id, 10000)}
                                className="bg-white border text-xs font-bold text-emerald-600 px-3 py-1.5 rounded-lg shadow-sm hover:bg-emerald-50 active:scale-95"
                                title="Tambah Rp 10.000 sewa bulanan"
                              >
                                +10rb 📈
                              </button>
                              <button 
                                onClick={() => changeRoomPrice(room.id, -10000)}
                                className="bg-white border text-xs font-bold text-red-500 px-3 py-1.5 rounded-lg shadow-sm hover:bg-red-50 active:scale-95"
                                title="Kurangi Rp 10.000 sewa bulanan"
                              >
                                -10rb 📉
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-amber-800">Manajemen Kamar Kosong:</p>
                          <p className="text-[11px] text-amber-700 mt-1">Saat ini ter-setting {roomsAvailable} dari maksimal 15 kamar.</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => changeAvailableRooms(1)}
                            className="bg-[#B76E79] text-white hover:bg-[#9E5661] text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1"
                          >
                            <Plus size={13} /> Tambah 1 Unit Kosong
                          </button>
                          <button 
                            onClick={() => changeAvailableRooms(-1)}
                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1"
                          >
                            <Minus size={13} /> Kurangi 1 Unit Kosong
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Simulated Database Transactions Log activity */}
                    <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#FFD1DC] shadow-sm flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800 flex items-center gap-1.5 text-sm mb-1">
                          <Clock size={16} className="text-[#B76E79]" /> Log Aktivitas Kos Terbaru (Simulasi Database)
                        </h3>
                        <p className="text-[11px] text-gray-400 mb-4">
                          Riwayat transaksi pengunjung dan simulasi admin secara real-time.
                        </p>

                        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                          {activityLogs.map((log) => (
                            <div key={log.id} className="text-xs bg-gray-50 p-2.5 rounded-lg border-l-2 border-[#B76E79]">
                              <div className="flex justify-between font-semibold text-gray-800 mb-0.5">
                                <span>Aksi Sistem</span>
                                <span className="text-[10px] text-gray-400 font-normal">{log.time}</span>
                              </div>
                              <p className="text-[11px] text-gray-600 leading-snug">{log.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between">
                        <button 
                          onClick={() => {
                            setActivityLogs([
                              { id: Date.now().toString(), text: `Database log dibersihkan oleh Hajah Ayu`, time: "Baru saja" }
                            ]);
                            triggerToast("Riwayat aktivitas log dikosongkan.");
                          }}
                          className="text-[11px] text-red-500 hover:underline font-semibold"
                        >
                          Kosongkan Riwayat Log
                        </button>
                        <span className="text-[10px] text-gray-400 font-medium">Running on Simulated Cloud</span>
                      </div>
                    </div>

                  </div>
                )}

              </div>

            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 6. COZY INCLUSIONS & MAP DIRECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        
        {/* Left Address Box */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#9E5661] tracking-tight mb-2">
              Lokasi Kos Premium
            </h2>
            <div className="h-1 w-16 bg-[#B76E79] rounded-full mb-6"></div>
            
            <div className="bg-[#FFF3F5] border border-[#FFD1DC] p-6 rounded-2xl mb-6">
              <p className="flex items-center gap-2 text-sm font-bold text-[#9E5661] mb-2">
                <MapPin size={18} /> Alamat Kos Lengkap:
              </p>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                {KOS_INFO.location.full_address}
              </p>
              <p className="text-xs text-gray-500 mt-3 italic">
                Lokasi strategis di daerah Mojoroto, Kediri. Sangat dekat dengan kampus kesehatan, gedung kuliah negeri, kafetaria mahasiswa, warung sate, jasa fotokopi, mini market, laundromat dan apotek utama.
              </p>
            </div>
          </div>

          <div 
            onClick={openGoogleMaps}
            className="group relative h-64 bg-gray-50 border-2 border-dashed border-[#F3C5C5] hover:border-[#B76E79] rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-[#FFF3F5] transition-all"
          >
            <div className="text-4xl mb-3 animate-bounce">🗺️</div>
            <p className="text-sm font-bold text-[#9E5661] group-hover:underline">Buka Aplikasi Google Maps</p>
            <p className="text-xs text-gray-400 mt-1 max-w-xs">Mengatur peta penunjuk jalan instan ke Jl. Jaksa Agung Suprapto, Mojoroto, Kediri</p>
            <div className="absolute bottom-3 right-3 bg-[#B76E79] text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={14} />
            </div>
          </div>
        </div>

        {/* Right Cost-Inclusion Info */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#9E5661] tracking-tight mb-2">
            Inklusi Biaya Bulanan
          </h2>
          <div className="h-1 w-16 bg-[#B76E79] rounded-full mb-6"></div>

          <p className="text-sm text-gray-650 leading-relaxed mb-6">
            Seluruh tarif sewa bulanan yang tercantum sudah dibundel bersih tanpa ada biaya siluman tambahan lainnya. Sangat hemat ramah kantong mahasiswa!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {KOS_INFO.rooms.inclusions.map((inc, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 bg-white p-4 rounded-xl border-l-4 border-[#B76E79]"
              >
                <div className="text-[#9E5661] bg-[#FFF3F5] p-1.5 rounded-lg flex items-center justify-center">
                  <Check size={16} className="stroke-[3]" />
                </div>
                <span className="text-xs font-semibold text-gray-700">{inc}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
            <div className="text-amber-550 text-2xl pt-1">⚡</div>
            <div>
              <h4 className="text-sm font-bold text-amber-800 mb-1">Informasi Penggunaan Listrik</h4>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                Setiap kamar dilindungi dengan meteran <strong>Token Listrik (PLN Mandiri)</strong>. Kuota kwh listrik diisi dan dikendalikan oleh penghuni masing-masing secara efisien. Memudahkan pengaturan anggaran masing-masing anak kos.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* 7. ROOMS & CARDS WITH HEART FAVORITES */}
      <section className="bg-[#FFF3F5] border-y border-[#FFD1DC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#9E5661]">Pilihan Tipe Kamar &amp; Fasilitas</h2>
            <p className="text-sm text-gray-500 mt-2">
              Sewa kamar putri terbaik yang diurus tulus demi ketentraman istirahat dan masa perkuliahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {roomTypes.map((room) => (
              <div 
                key={room.id}
                className="bg-white rounded-3xl border border-[#FFD1DC] overflow-hidden flex flex-col justify-between transition-all hover:shadow-lg relative"
              >
                {/* Image & Wishlist Button */}
                <div className="h-64 relative">
                  <img src={room.image_url} alt={room.name} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#9E5661] text-xs font-bold px-3.5 py-1 rounded-full shadow">
                    🌸 {room.status}
                  </span>
                  
                  {/* Loved List Button */}
                  <button 
                    onClick={() => toggleFavorite(room.id)}
                    className="absolute top-4 right-4 bg-white hover:bg-red-50 text-red-500 p-2.5 rounded-full shadow transition-all active:scale-95"
                    title="Favoritkan Kamar"
                  >
                    <Heart size={18} fill={favorites.includes(room.id) ? '#EF4444' : 'none'} className="text-red-500" />
                  </button>
                </div>

                {/* Content info */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#9E5661] mb-2">{room.name}</h3>
                    
                    <div className="bg-[#FFF3F5] border border-[#FFD1DC] px-4 py-2.5 rounded-xl flex items-baseline gap-1.5 w-fit mb-6">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#9E5661]">{room.price_formatted}</span>
                      <span className="text-xs text-gray-500 font-medium">/ bulan</span>
                    </div>

                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Fasilitas Kamar:</h4>
                    <ul className="space-y-2 mb-6">
                      {room.facilities.map((fac, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-650">
                          <span>🌸</span> {fac}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => handleBookingClick(room.name, room.price_formatted)}
                    className="w-full bg-[#B76E79] hover:bg-[#9E5661] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={16} /> Pesan Sekarang 💬
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. AUTHENTICATION LOGIN OVERLAY MODAL */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-[#FFD1DC]"
            >
              
              {/* Header */}
              <div className="bg-[#9E5661] p-6 text-white text-center relative">
                <button 
                  onClick={() => setIsLoginModalOpen(false)}
                  className="absolute right-4 top-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full"
                >
                  <X size={18} />
                </button>
                
                <p className="text-2xl">🌸</p>
                <h3 className="text-lg font-bold mt-2">
                  {isRegistering ? 'Daftar Akun Baru Pencari' : 'Portal Login Anggota'}
                </h3>
                <p className="text-xs text-pink-100/70 mt-1">
                  {isRegistering 
                    ? 'Lengkapi form di bawah untuk registrasi instan' 
                    : 'Masuk ke sistem simulasi tenant & panel kontrol pemilik'}
                </p>
              </div>

              {/* Form Content body */}
              <div className="p-6">
                
                {/* Credentials reminder for easier demo review */}
                {!isRegistering && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3.5 mb-4 text-[11px] leading-relaxed">
                    <p className="font-semibold mb-1">💡 Uji Coba Cepat Tanpa Registrasi:</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>Akun Calon Anak Kos: <strong>putri</strong> / PIN: <strong>1234</strong></li>
                      <li>Akun Ibu Kos (Admin): <strong>admin</strong> / PIN: <strong>9999</strong></li>
                    </ul>
                  </div>
                )}

                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3 rounded-xl mb-4 flex items-center gap-1.5">
                    <AlertCircle size={15} />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* LOGIN FORM */}
                {!isRegistering ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Username / ID Pengguna:
                      </label>
                      <input 
                        type="text" 
                        required
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
                        placeholder="Masukkan username (contoh: putri)"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Masukkan PIN Rahasia (4 Angka):
                      </label>
                      <input 
                        type="password" 
                        required
                        maxLength={6}
                        value={loginPin}
                        onChange={(e) => setLoginPin(e.target.value)}
                        className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
                        placeholder="Contoh: 1234 atau 9999"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#9E5661] hover:bg-[#834751] text-white py-3.5 rounded-xl font-bold text-sm mt-4 transition-all"
                    >
                      Masuk ke Sistem 🚪
                    </button>
                  </form>
                ) : (
                  // REGISTRATION FORM
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Buat Username unik:
                      </label>
                      <input 
                        type="text" 
                        required
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value)}
                        className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
                        placeholder="Contoh: riska"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Nama Lengkap Calon Tenant:
                      </label>
                      <input 
                        type="text" 
                        required
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
                        placeholder="Contoh: Riska Amalia"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Buat PIN Unik:
                      </label>
                      <input 
                        type="password" 
                        required
                        maxLength={6}
                        value={regPin}
                        onChange={(e) => setRegPin(e.target.value)}
                        className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
                        placeholder="Contoh: 5678"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#B76E79] hover:bg-[#9E5661] text-white py-3.5 rounded-xl font-bold text-sm mt-4 transition-all"
                    >
                      Daftar Akun Baru 🌸
                    </button>
                  </form>
                )}

                {/* Footer Switcher options */}
                <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs">
                  {isRegistering ? (
                    <p className="text-gray-500">
                      Sudah memiliki akun?{' '}
                      <button 
                        onClick={() => {
                          setIsRegistering(false);
                          setLoginError(null);
                        }}
                        className="text-[#9E5661] font-bold hover:underline"
                      >
                        Masuk Disini
                      </button>
                    </p>
                  ) : (
                    <p className="text-gray-500">
                     Calon penghuni baru kos putri?{' '}
                      <button 
                        onClick={() => {
                          setIsRegistering(true);
                          setLoginError(null);
                        }}
                        className="text-[#9E5661] font-bold hover:underline"
                      >
                        Daftar Akun Gratis
                      </button>
                    </p>
                  )}
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. FOOTER MAPS LINK & PROFILE INFO */}
      <footer id="narahubung" className="bg-[#2D2627] text-white border-t-2 border-[#FFD1DC]/20 pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-[#FFD1DC] mb-4 flex items-center gap-2">
              <span>🌸</span>
              <span>{KOS_INFO.name}</span>
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xl mb-6">
              Menghadirkan pemukiman kos putri terbaik di Mojoroto, Kediri. Kami bersungguh-sungguh mengutamakan kebersihan interior kamar, kenyamanan belajar, ketenangan bersama, dan proteksi optimal.
            </p>
            <div className="space-y-2 text-xs text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-[#FFD1DC]" /> Alamat: {KOS_INFO.location.full_address}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[#FFD1DC]" /> WhatsApp: {KOS_INFO.contact.whatsapp_formatted}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1" />

          <div className="lg:col-span-4 flex flex-col justify-start">
            <h3 className="text-sm font-bold text-[#FFD1DC] tracking-wider uppercase mb-4">
              Narahubung &amp; Media Sosial
            </h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Hubungi pengelola kos untuk survei lokasi secara langsung melalui tautan media sosial di bawah:
            </p>

            <div className="flex flex-col gap-2.5">
              <button 
                onClick={() => handleBookingClick("Pertanyaan Survei", "Umum")}
                className="flex items-center justify-between bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold px-4 py-3 rounded-xl transition-all shadow active:scale-95 text-left"
              >
                <span className="flex items-center gap-2">💬 WhatsApp Pemilik</span>
                <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded uppercase">AKTIF</span>
              </button>

              <button 
                onClick={() => handleSocialClick("Instagram", KOS_INFO.contact.instagram, `https://instagram.com/${KOS_INFO.contact.instagram}`)}
                className="flex items-center justify-between bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 hover:opacity-90 text-white text-xs font-bold px-4 py-3 rounded-xl transition-all shadow active:scale-95 text-left"
              >
                <span className="flex items-center gap-2 flex-wrap">📸 Instagram @{KOS_INFO.contact.instagram}</span>
                <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded uppercase font-bold text-white">Ikuti</span>
              </button>

              <button 
                onClick={() => handleSocialClick("TikTok", KOS_INFO.contact.tiktok, `https://tiktok.com/@${KOS_INFO.contact.tiktok}`)}
                className="flex items-center justify-between bg-black text-white text-xs font-bold px-4 py-3 rounded-xl transition-all shadow active:scale-95 text-left border border-gray-800 hover:bg-gray-900"
              >
                <span className="flex items-center gap-1">🎵 TikTok @{KOS_INFO.contact.tiktok}</span>
                <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded">Tonton Video</span>
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 Kos Putri Griya Ayu Mojoroto, Kediri. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-4">
            <span className="text-[#FFD1DC]/40">Komersil Legal 🛡️</span>
            <span className="text-[#FFD1DC]/40">Kediri Nyaman 🏡</span>
          </div>
        </div>

      </footer>

    </div>
  );
}
