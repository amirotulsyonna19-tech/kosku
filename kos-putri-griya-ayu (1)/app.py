# -*- coding: utf-8 -*-
"""
KOS PUTRI GRIYA AYU - Main Flask Application
Developed as a Backend-Driven UI Architecture.
All details, styling specifications, and scripts are controlled from this Python file.
"""

from flask import Flask, render_template, Response, request

app = Flask(__name__)

# ==========================================
# DATA CONFIGURATION (Python Backend State)
# ==========================================
KOS_INFO = {
    "name": "Kos Putri Griya Ayu",
    "tagline": "Hunian Putri Aman, Nyaman, dan Strategis dekat Kampus",
    "description": "Kos Putri Griya Ayu adalah pilihan hunian eksklusif terbaik bagi mahasiswi dan karyawati di Kediri. Mengutamakan keamanan, kebersihan, dan kenyamanan lingkungan dengan fasilitas lengkap dan desain estetik bergaya modern-feminin.",
    "location": {
        "district": "Mojoroto",
        "city": "Kediri",
        "province": "Jawa Timur",
        "full_address": "Jl. Jaksa Agung Suprapto, Gg. Griya Ayu No. 12, Mojoroto, Kota Kediri, Jawa Timur 64112",
        "google_maps_url": "https://maps.google.com/?q=Mojoroto+Kediri+Jawa+Timur"  # Placeholder Google Maps Link
    },
    "rooms": {
        "total": 15,
        "available": 3,  # Dynamic Room Counter
        "inclusions": [
            "Koneksi Internet Wi-Fi Cepat",
            "Sistem Air Bersih lancar",
            "Iuran Pengelolaan Sampah",
            "Keamanan & CCTV Area Bersama"
        ],
        "note": "Biaya listrik menggunakan sistem token mandiri per kamar."
    },
    "contact": {
        "whatsapp": "+6281234567890",  # Ganti dengan nomor WhatsApp pemilik asli
        "instagram": "kosputri_griyaayu",
        "tiktok": "griyaayukos",
        "whatsapp_formatted": "0812-3456-7890"
    }
}

# Room Type Packages
ROOM_TYPES = [
    {
        "id": "tipe-non-ac",
        "name": "Tipe Kamar 1 (Non-AC)",
        "price_formatted": "Rp 700.000",
        "price_raw": 700000,
        "image_url": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800", # High quality Unsplash cozy room interior
        "facilities": [
            "Kasur Nyaman (Sprei & Bantal)",
            "Kipas Angin Dinding",
            "Kamar Mandi Dalam (Shower & Kloset)",
            "Rak Buku & Meja Belajar",
            "Lemari Pakaian Minimalis",
            "Ventilasi & Pencahayaan Alami"
        ],
        "status": "Tersedia"
    },
    {
        "id": "tipe-ac",
        "name": "Tipe Kamar 2 (AC)",
        "price_formatted": "Rp 800.000",
        "price_raw": 800000,
        "image_url": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800", # High quality cozy AC room interior
        "facilities": [
            "Kasur Springbed Premium (Sprei & Bantal)",
            "Air Conditioner (AC) Hemat Energi",
            "Kamar Mandi Dalam (Shower, Kloset Duduk & Ember)",
            "Rak Buku, Meja Belajar & Kursi Kerja",
            "Lemari Pakaian 2 Pintu dengan Cermin",
            "Gorden Cantik & Jendela Menghadap Taman"
        ],
        "status": "Tersedia - Terbatas"
    }
]

# ==========================================
# STYLING CONFIGURATION (Rose Gold & Soft Pink Theme)
# ==========================================
THEME_COLORS = {
    "rose_gold": "#B76E79",       # Main primary tone
    "rose_gold_dark": "#9E5661",  # Darker for hovers/headers
    "soft_pink": "#FFD1DC",       # Gentle aesthetic background highlight
    "soft_pink_light": "#FFF3F5", # Section body backgrounds
    "accent_pink": "#F3C5C5",     # Border and interactive glows
    "charcoal_gray": "#2D2627",   # Text and high contrast layout elements
    "pastel_grey": "#F8F8FA",     # Soft grey background
    "white": "#FFFFFF"
}

# ==========================================
# ROUTES
# ==========================================

@app.route("/")
def home():
    """Renders the main page. All data configuration is fed to the Jinja template."""
    return render_template(
        "index.html", 
        kos=KOS_INFO, 
        room_types=ROOM_TYPES,
        colors=THEME_COLORS
    )

@app.route("/static/style.css")
def dynamic_css():
    """Generates CSS dynamically based on the Python-defined color palette."""
    css_content = f"""/* 
   DYNAMIC STYLING - KOS PUTRI GRIYA AYU
   Generated directly from Python backend.
*/

:root {{
    --color-rose-gold: {THEME_COLORS["rose_gold"]};
    --color-rose-gold-dark: {THEME_COLORS["rose_gold_dark"]};
    --color-soft-pink: {THEME_COLORS["soft_pink"]};
    --color-soft-pink-light: {THEME_COLORS["soft_pink_light"]};
    --color-accent-pink: {THEME_COLORS["accent_pink"]};
    --color-charcoal: {THEME_COLORS["charcoal_gray"]};
    --color-pastel-grey: {THEME_COLORS["pastel_grey"]};
    --color-white: {THEME_COLORS["white"]};
}}

* {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    scroll-behavior: smooth;
}}

body {{
    background-color: var(--color-pastel-grey);
    color: var(--color-charcoal);
    line-height: 1.6;
}}

/* Navigation */
header {{
    background-color: var(--color-white);
    box-shadow: 0 4px 15px rgba(183, 110, 121, 0.08);
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 2px solid var(--color-soft-pink);
}}

.navbar {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.25rem 2rem;
}}

.nav-brand {{
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-rose-gold-dark);
    text-decoration: none;
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}}

.nav-brand::before {{
    content: "🌸";
    font-size: 1.4rem;
}}

.nav-links {{
    display: flex;
    list-style: none;
    gap: 2rem;
    align-items: center;
}}

.nav-links a {{
    text-decoration: none;
    color: var(--color-charcoal);
    font-weight: 500;
    transition: color 0.3s ease;
    font-size: 0.95rem;
}}

.nav-links a:hover {{
    color: var(--color-rose-gold);
}}

.nav-btn {{
    background-color: var(--color-rose-gold);
    color: var(--color-white) !important;
    padding: 0.6rem 1.25rem;
    border-radius: 999px;
    transition: all 0.3s ease !important;
}}

.nav-btn:hover {{
    background-color: var(--color-rose-gold-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(183, 110, 121, 0.2);
}}

.menu-toggle {{
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--color-rose-gold-dark);
    cursor: pointer;
}}

/* Hero Section */
.hero-section {{
    background: linear-gradient(135deg, var(--color-white) 0%, var(--color-soft-pink-light) 100%);
    padding: 5rem 2rem;
    border-bottom: 4px solid var(--color-soft-pink);
}}

.hero-container {{
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 4rem;
    align-items: center;
}}

.hero-text h1 {{
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    color: var(--color-rose-gold-dark);
    margin-bottom: 1rem;
}}

.hero-text .subtitle {{
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--color-charcoal);
    opacity: 0.85;
    margin-bottom: 1.5rem;
}}

.hero-text p {{
    font-size: 1.05rem;
    margin-bottom: 2rem;
    opacity: 0.75;
}}

.hero-cta {{
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}}

.btn {{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 1.75rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
}}

.btn-primary {{
    background-color: var(--color-rose-gold);
    color: var(--color-white);
    box-shadow: 0 4px 15px rgba(183, 110, 121, 0.3);
}}

.btn-primary:hover {{
    background-color: var(--color-rose-gold-dark);
    transform: translateY(-2px);
}}

.btn-secondary {{
    background-color: var(--color-white);
    color: var(--color-rose-gold);
    border: 2px solid var(--color-rose-gold);
}}

.btn-secondary:hover {{
    background-color: var(--color-soft-pink-light);
    transform: translateY(-2px);
}}

.hero-image {{
    display: flex;
    justify-content: center;
    position: relative;
}}

.hero-image img {{
    max-width: 100%;
    border-radius: 20px;
    box-shadow: 0 12px 30px rgba(183, 110, 121, 0.15);
    border: 6px solid var(--color-white);
}}

/* Quick Stats Grid */
.stats-section {{
    max-width: 1200px;
    margin: -3rem auto 4rem auto;
    padding: 0 2rem;
    position: relative;
    z-index: 10;
}}

.stats-grid {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    background-color: var(--color-white);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(183, 110, 121, 0.08);
    padding: 2.5rem;
    border: 1px solid var(--color-soft-pink);
}}

.stat-item {{
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1rem;
}}

.stat-item:not(:last-child) {{
    border-right: 1px solid var(--color-soft-pink);
}}

.stat-icon {{
    background-color: var(--color-soft-pink-light);
    border: 1px solid var(--color-accent-pink);
    border-radius: 12px;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}}

.stat-info .stat-val {{
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-rose-gold-dark);
    line-height: 1.12;
}}

.stat-info .stat-lbl {{
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-charcoal);
    opacity: 0.8;
    margin-top: 0.25rem;
}}

.stat-info .stat-desc {{
    font-size: 0.75rem;
    opacity: 0.6;
    margin-top: 0.125rem;
}}

/* Main Sections Layout */
.section {{
    padding: 5rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}}

.section-header {{
    text-align: center;
    margin-bottom: 3.5rem;
}}

.section-header h2 {{
    font-size: 2.25rem;
    font-weight: 800;
    color: var(--color-rose-gold-dark);
    margin-bottom: 0.75rem;
    position: relative;
    display: inline-block;
}}

.section-header h2::after {{
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    background-color: var(--color-rose-gold);
    border-radius: 2px;
    margin: 0.5rem auto 0 auto;
}}

.section-header p {{
    font-size: 1.05rem;
    opacity: 0.7;
    max-width: 600px;
    margin: 0 auto;
}}

/* Room Listing Pricing Cards */
.pricing-grid {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 3rem;
}}

.pricing-card {{
    background-color: var(--color-white);
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(183, 110, 121, 0.05);
    border: 1px solid rgba(183, 110, 121, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}}

.pricing-card:hover {{
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(183, 110, 121, 0.12);
    border-color: var(--color-accent-pink);
}}

.card-img-wrapper {{
    height: 240px;
    position: relative;
    overflow: hidden;
}}

.card-img-wrapper img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}}

.pricing-card:hover .card-img-wrapper img {{
    transform: scale(1.05);
}}

.card-tag {{
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: var(--color-rose-gold);
    color: var(--color-white);
    padding: 0.35rem 0.85rem;
    border-radius: 99px;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}}

.card-content {{
    padding: 2rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}}

.card-title {{
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-rose-gold-dark);
    margin-bottom: 0.5rem;
}}

.card-price {{
    display: flex;
    align-items: baseline;
    margin-bottom: 1.5rem;
    background-color: var(--color-soft-pink-light);
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--color-soft-pink);
}}

.card-price .amount {{
    font-size: 1.85rem;
    font-weight: 800;
    color: var(--color-rose-gold);
}}

.card-price .period {{
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.7;
    margin-left: 0.25rem;
}}

.card-facilities-title {{
    font-size: 0.9rem;
    font-weight: 750;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 1rem;
    color: var(--color-charcoal);
}}

.facility-list {{
    list-style: none;
    margin-bottom: 2rem;
    flex-grow: 1;
}}

.facility-list li {{
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.7rem;
    font-size: 0.95rem;
    opacity: 0.85;
}}

.facility-list li::before {{
    content: "🌸";
    font-size: 0.85rem;
}}

.card-btn {{
    width: 100%;
}}

/* Contact & Info Grid */
.info-section {{
    background-color: var(--color-white);
    border-top: 2px solid var(--color-soft-pink);
    border-bottom: 2px solid var(--color-soft-pink);
    padding: 5rem 2rem;
}}

.info-container {{
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.10fr 0.90fr;
    gap: 4rem;
}}

.address-box h3 {{
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-rose-gold-dark);
    margin-bottom: 1.25rem;
}}

.address-box .location-card {{
    background: var(--color-soft-pink-light);
    border: 1px solid var(--color-soft-pink);
    border-radius: 12px;
    padding: 1.75rem;
    margin-bottom: 1.5rem;
}}

.address-box p {{
    margin-bottom: 1.25rem;
    font-size: 1rem;
    opacity: 0.85;
}}

.gmaps-placeholder {{
    position: relative;
    height: 250px;
    background-color: var(--color-pastel-grey);
    border: 2px dashed var(--color-accent-pink);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
}}

.gmaps-placeholder:hover {{
    border-style: solid;
    background-color: var(--color-soft-pink-light);
}}

.gmaps-placeholder .map-icon {{
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    animation: bounce 2s infinite;
}}

.inclusions-box h3 {{
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-rose-gold-dark);
    margin-bottom: 1.25rem;
}}

.inclusion-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    margin-bottom: 1.5rem;
}}

.inc-card {{
    background-color: var(--color-pastel-grey);
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-left: 3px solid var(--color-rose-gold);
    font-weight: 500;
    font-size: 0.9rem;
}}

.note-card {{
    background-color: #FFFDEE;
    border: 1px solid #EBE39B;
    border-radius: 8px;
    padding: 1.25rem;
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    font-size: 0.9rem;
    opacity: 0.9;
}}

.note-card .note-icon {{
    font-size: 1.2rem;
}}

/* Footer */
footer {{
    background-color: var(--color-charcoal);
    color: var(--color-white);
    padding: 4rem 2rem 2rem 2rem;
}}

.footer-container {{
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255, 209, 220, 0.15);
}}

.footer-brand h3 {{
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-soft-pink);
    margin-bottom: 0.75rem;
}}

.footer-brand p {{
    font-size: 0.95rem;
    opacity: 0.7;
    max-width: 400px;
}}

.footer-socials {{
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-items: flex-start;
}}

.footer-socials h4 {{
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: var(--color-soft-pink);
}}

.social-links-grid {{
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}}

.social-btn {{
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.08);
    color: var(--color-white);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
}}

.social-btn:hover {{
    background-color: var(--color-rose-gold);
    color: var(--color-white);
    transform: translateY(-3px);
    border-color: var(--color-soft-pink);
}}

.social-btn.wa-btn:hover {{
    background-color: #25D366; /* Official WA color */
    border-color: #25D366;
}}

.copyright {{
    text-align: center;
    padding-top: 2rem;
    font-size: 0.85rem;
    opacity: 0.5;
}}

/* Keyframes */
@keyframes bounce {{
    0%, 20%, 50%, 80%, 100% {{transform: translateY(0);}}
    40% {{transform: translateY(-8px);}}
    60% {{transform: translateY(-4px);}}
}}

/* Mobile Responsive */
@media (max-width: 968px) {{
    .hero-container {{
        grid-template-columns: 1fr;
        gap: 3rem;
        text-align: center;
    }}
    .hero-cta {{
        justify-content: center;
    }}
    .hero-image {{
        order: -1;
    }}
    .hero-text h1 {{
        font-size: 2.25rem;
    }}
    .stats-section {{
        margin-top: -1rem;
    }}
    .stats-grid {{
        grid-template-columns: 1fr;
        padding: 1.5rem;
    }}
    .stat-item:not(:last-child) {{
        border-right: none;
        border-bottom: 1px solid var(--color-soft-pink);
        padding-bottom: 1.5rem;
    }}
    .info-container {{
        grid-template-columns: 1fr;
        gap: 3rem;
    }}
    .footer-container {{
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }}
    .footer-socials {{
        align-items: center;
    }}
    
    /* Responsive Menu */
    .menu-toggle {{
        display: block;
    }}
    .nav-links {{
        display: none; /* Controlled via script.js classes */
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--color-white);
        border-bottom: 2px solid var(--color-soft-pink);
        padding: 1.5rem;
        gap: 1.25rem;
        box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    }}
    .nav-links.active {{
        display: flex;
    }}
    .nav-links li {{
        width: 100%;
        text-align: center;
    }}
    .nav-btn {{
        display: inline-block;
        width: 80%;
    }}
}}
"""
    return Response(css_content, mimetype="text/css")

@app.route("/static/script.js")
def dynamic_js():
    """Generates vanilla JS dynamically, injecting prompt confirmation states from Python strings."""
    whatsapp_num = KOS_INFO["contact"]["whatsapp"]
    whatsapp_formatted = KOS_INFO["contact"]["whatsapp_formatted"]
    
    js_content = f"""// DYNAMIC JAVASCRIPT - KOS PUTRI GRIYA AYU
// Generated directly from Python backend with complete interactive login features.

document.addEventListener('DOMContentLoaded', function() {{
    console.log("KOS PUTRI GRIYA AYU web app initialized.");

    // State Variables (stored in memory / sessionStorage for persistent demo experience)
    let loggedInUser = null;
    let roomCapacityAvail = {KOS_INFO["rooms"]["available"]};
    let nonAcPrice = 700000;
    let acPrice = 800000;
    let systemLogs = [
        "[READY] Database terhubung via SQLite/ORM simulation",
        "[OK] Sesi browser dimuat aman"
    ];

    // Load state from sessionStorage if exists
    if (sessionStorage.getItem('griyaayu_user')) {{
        try {{
            loggedInUser = JSON.parse(sessionStorage.getItem('griyaayu_user'));
        }} catch(e) {{
            loggedInUser = null;
        }}
    }}

    // Check localStorage for saved tenant notes
    if (localStorage.getItem('griyaayu_notes')) {{
        const savedNotes = localStorage.getItem('griyaayu_notes');
        const notesArea = document.getElementById('tenant-notes');
        if (notesArea) {{
            notesArea.value = savedNotes;
        }}
    }}

    // --- UI Update Helpers ---
    function updateUIState() {{
        const loginBtn = document.getElementById('login-nav-btn');
        const logoutNavItem = document.getElementById('logout-nav-item');
        const navPortalLink = document.getElementById('nav-portal-link');
        const portalSection = document.getElementById('member-portal');
        const tenantDashboard = document.getElementById('tenant-dashboard');
        const adminDashboard = document.getElementById('admin-dashboard');
        const adminBannerEdit = document.getElementById('admin-banner-edit-hint');
        
        // Update stats counters
        const availValText = document.getElementById('stat-avail-val');
        if (availValText) {{
            availValText.textContent = `${{roomCapacityAvail}} Tersedia`;
        }}

        // Update active pricing elements
        const priceLabel1 = document.getElementById('amount-tipe-non-ac');
        if (priceLabel1) {{
            priceLabel1.textContent = "Rp " + nonAcPrice.toLocaleString('id-ID');
        }}
        const priceLabel2 = document.getElementById('amount-tipe-ac');
        if (priceLabel2) {{
            priceLabel2.textContent = "Rp " + acPrice.toLocaleString('id-ID');
        }}

        // Edit button inside rates info
        const ad_rate1 = document.getElementById('adm-rate1-text');
        if (ad_rate1) ad_rate1.textContent = "Tarif saat ini: Rp " + nonAcPrice.toLocaleString('id-ID');
        const ad_rate2 = document.getElementById('adm-rate2-text');
        if (ad_rate2) ad_rate2.textContent = "Tarif saat ini: Rp " + acPrice.toLocaleString('id-ID');

        // Toggle user visibility
        if (loggedInUser) {{
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutNavItem) logoutNavItem.style.display = 'block';
            if (navPortalLink) navPortalLink.style.display = 'block';
            if (portalSection) portalSection.style.display = 'block';

            // Welcome Text
            const welcomeText = document.getElementById('portal-welcome-text');
            const emailText = document.getElementById('portal-email-text');
            const roleBadge = document.getElementById('portal-role-badge');
            
            if (welcomeText) welcomeText.textContent = `Selamat Datang, ${{loggedInUser.fullName}}!`;
            if (emailText) emailText.textContent = loggedInUser.email;

            if (loggedInUser.role === 'admin') {{
                if (roleBadge) roleBadge.textContent = 'IBU KOS (OWNER)';
                if (adminDashboard) adminDashboard.style.display = 'block';
                if (tenantDashboard) tenantDashboard.style.display = 'none';
                if (adminBannerEdit) adminBannerEdit.style.display = 'inline';
            }} else {{
                if (roleBadge) roleBadge.textContent = 'PROSPECTIVE TENANT';
                if (adminDashboard) adminDashboard.style.display = 'none';
                if (tenantDashboard) tenantDashboard.style.display = 'block';
                if (adminBannerEdit) adminBannerEdit.style.display = 'none';
            }}
        }} else {{
            if (loginBtn) loginBtn.style.display = 'block';
            if (logoutNavItem) logoutNavItem.style.display = 'none';
            if (navPortalLink) navPortalLink.style.display = 'none';
            if (portalSection) portalSection.style.display = 'none';
            if (adminBannerEdit) adminBannerEdit.style.display = 'none';
        }}

        // Render console logs
        renderSystemConsole();
    }}

    function renderSystemConsole() {{
        const consoleEl = document.getElementById('admin-log-console');
        if (consoleEl) {{
            consoleEl.innerHTML = systemLogs.map(log => `<div>${{log}}</div>`).join('');
            consoleEl.scrollTop = consoleEl.scrollHeight;
        }}
    }}

    function addLogMessage(msg) {{
        const timeNow = new Date().toLocaleTimeString('id-ID', {{ hour: '2-digit', minute: '2-digit' }}) + " WIB";
        systemLogs.unshift(`[\${{timeNow}}] \${{msg}}`);
        renderSystemConsole();
    }}

    // --- Authentication Event Handlers ---
    const loginNavBtn = document.getElementById('login-nav-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const portalLogoutBtn = document.getElementById('portal-logout-btn');

    if (loginNavBtn) {{
        loginNavBtn.addEventListener('click', () => {{
            if (loginModal) loginModal.style.display = 'flex';
            document.getElementById('login-error-alert').style.display = 'none';
        }});
    }}

    if (closeModalBtn) {{
        closeModalBtn.addEventListener('click', () => {{
            if (loginModal) loginModal.style.display = 'none';
        }});
    }}

    if (loginForm) {{
        loginForm.addEventListener('submit', function(e) {{
            e.preventDefault();
            const usernameInput = document.getElementById('login-username').value.trim().toLowerCase();
            const pinInput = document.getElementById('login-pin').value;
            const errorAlert = document.getElementById('login-error-alert');

            if (usernameInput === 'admin' && pinInput === '9999') {{
                loggedInUser = {{
                    username: 'admin',
                    fullName: 'Ibu Hajah Ayu',
                    role: 'admin',
                    email: 'owner.griyaayu@gmail.com'
                }};
                sessionStorage.setItem('griyaayu_user', JSON.stringify(loggedInUser));
                loginModal.style.display = 'none';
                addLogMessage("Admin Kos berhasil masuk ke Control Panel");
                alert("Login sukses sebagai Pemilik Kos! Panel Kontrol Admin berhasil dibuka. ✨");
                updateUIState();
            }} else if (usernameInput === 'putri' && pinInput === '1234') {{
                loggedInUser = {{
                    username: 'putri',
                    fullName: 'Putri Salsabila',
                    role: 'tenant',
                    email: 'putri.salsa@student.id'
                }};
                sessionStorage.setItem('griyaayu_user', JSON.stringify(loggedInUser));
                loginModal.style.display = 'none';
                addLogMessage("Putri Salsabila masuk ke sistem portal pencari");
                alert("Login sukses! Portal Rencana Survei Pencari Kos berhasil dibuka. 🌸");
                updateUIState();
            }} else {{
                if (errorAlert) errorAlert.style.display = 'block';
            }}
        }});
    }}

    function logoutUser() {{
        if (loggedInUser) {{
            addLogMessage(`\${{loggedInUser.fullName}} telah keluar dari sesi`);
            loggedInUser = null;
            sessionStorage.removeItem('griyaayu_user');
            updateUIState();
            alert("Sesi login ditutup dengan sukses!");
        }}
    }}

    if (logoutBtn) logoutBtn.addEventListener('click', logoutUser);
    if (portalLogoutBtn) portalLogoutBtn.addEventListener('click', logoutUser);

    // --- Interactive Map & Booking --
    const listAvailableButton = document.getElementById('sim-change-avail');
    if (listAvailableButton) {{
        listAvailableButton.addEventListener('click', function(e) {{
            e.stopPropagation();
            const next = roomCapacityAvail > 1 ? roomCapacityAvail - 1 : 4;
            roomCapacityAvail = next;
            addLogMessage(`Simulasi: Jumlah Kamar Terbuka Berubah menjadi \${{next}}`);
            updateUIState();
        }});
    }}

    // --- Admin Dashboard Modification controls ---
    const decRoomsOpt = document.getElementById('admin-dec-rooms');
    const incRoomsOpt = document.getElementById('admin-inc-rooms');
    
    if (decRoomsOpt) {{
        decRoomsOpt.addEventListener('click', () => {{
            if (roomCapacityAvail > 0) {{
                roomCapacityAvail--;
                addLogMessage(`Admin merubah kamar kosong tersedia menjadi \${{roomCapacityAvail}} unit`);
                updateUIState();
            }}
        }});
    }}
    if (incRoomsOpt) {{
        incRoomsOpt.addEventListener('click', () => {{
            if (roomCapacityAvail < 15) {{
                roomCapacityAvail++;
                addLogMessage(`Admin merubah kamar kosong tersedia menjadi \${{roomCapacityAvail}} unit`);
                updateUIState();
            }}
        }});
    }}

    // Admin rate adjustments
    const incPriceBtn1 = document.getElementById('adm-inc-price1');
    const decPriceBtn1 = document.getElementById('adm-dec-price1');
    const incPriceBtn2 = document.getElementById('adm-inc-price2');
    const decPriceBtn2 = document.getElementById('adm-dec-price2');

    if (incPriceBtn1) {{
        incPriceBtn1.addEventListener('click', () => {{
            nonAcPrice += 10000;
            addLogMessage(`Tarif Non-AC disesuaikan naik menjadi Rp \${{nonAcPrice.toLocaleString('id-ID')}}`);
            updateUIState();
        }});
    }}
    if (decPriceBtn1) {{
        decPriceBtn1.addEventListener('click', () => {{
            if (nonAcPrice > 200000) {{
                nonAcPrice -= 10000;
                addLogMessage(`Tarif Non-AC disesuaikan turun menjadi Rp \${{nonAcPrice.toLocaleString('id-ID')}}`);
                updateUIState();
            }}
        }});
    }}
    if (incPriceBtn2) {{
        incPriceBtn2.addEventListener('click', () => {{
            acPrice += 10000;
            addLogMessage(`Tarif AC disesuaikan naik menjadi Rp \${{acPrice.toLocaleString('id-ID')}}`);
            updateUIState();
        }});
    }}
    if (decPriceBtn2) {{
        decPriceBtn2.addEventListener('click', () => {{
            if (acPrice > 200000) {{
                acPrice -= 10000;
                addLogMessage(`Tarif AC disesuaikan turun menjadi Rp \${{acPrice.toLocaleString('id-ID')}}`);
                updateUIState();
            }}
        }});
    }}

    // --- Tenant Dashboard Actions ---
    const saveNotesBtn = document.getElementById('save-notes-btn');
    if (saveNotesBtn) {{
        saveNotesBtn.addEventListener('click', () => {{
            const notesVal = document.getElementById('tenant-notes').value;
            localStorage.setItem('griyaayu_notes', notesVal);
            addLogMessage("Pencari sukses menyimpan catatan rencana survei");
            alert("Rencana survei berhasil disimpan!");
        }});
    }}

    const simApproveSurveyBtn = document.getElementById('sim-approve-survey');
    if (simApproveSurveyBtn) {{
        simApproveSurveyBtn.addEventListener('click', () => {{
            const statusTag = document.getElementById('booking-status-tag');
            if (statusTag) {{
                statusTag.textContent = "Disetujui ✓ (Segera Datang)";
                statusTag.style.backgroundColor = "#d1fae5";
                statusTag.style.color = "#065f46";
            }}
            addLogMessage("Simulasi pengelola menyetujui survei Putri Salsabila");
            alert("Simulasi Berhasil: Status survei diubah menjadi 'Disetujui'!");
        }});
    }}

    const waHostBtn = document.getElementById('wa-host-direct');
    if (waHostBtn) {{
        waHostBtn.addEventListener('click', () => {{
            const targetRoomText = document.getElementById('target-room-text').textContent;
            const textWa = encodeURIComponent(`Halo Ibu Ayu, saya Putri Salsabila. Saya sudah mengisi rencana survei untuk \${{targetRoomText}} di portal Griya Ayu. Rencana ini sudah siap untuk dijadwalkan.`);
            window.open(`https://wa.me/{whatsapp_num}?text=\${{textWa}}`, '_blank');
        }});
    }}

    const adminBannerEditBtn = document.getElementById('admin-banner-edit-hint');
    if (adminBannerEditBtn) {{
        adminBannerEditBtn.addEventListener('click', () => {{
            const curText = document.getElementById('announcement-banner').textContent.trim().replace('🔔 ', '');
            const newAnn = prompt("Masukkan promo pengumuman broadcast baru:", curText);
            if (newAnn) {{
                document.getElementById('announcement-banner').innerHTML = `🔔 \${{newAnn}} <span id="admin-banner-edit-hint" style="display: inline; font-size: 0.75rem; text-decoration: underline; margin-left: 10px; cursor: pointer; color: white;">(Edit ✏️)</span>`;
                addLogMessage(`Pengumuman broadcast diupdate pelaku admin`);
                
                // Reinstall edit trigger handler
                const newEditBtn = document.getElementById('admin-banner-edit-hint');
                if (newEditBtn) {{
                    newEditBtn.addEventListener('click', () => {{
                        adminBannerEditBtn.click();
                    }});
                }}
            }}
        }});
    }}

    const clearAdminLogsBtn = document.getElementById('clear-admin-logs');
    if (clearAdminLogsBtn) {{
        clearAdminLogsBtn.addEventListener('click', () => {{
            systemLogs = ["[OK] Logs dikosongkan oleh Admin"];
            renderSystemConsole();
        }});
    }}

    // --- Existing Core Functional Code ---
    // Mobile menu active links controller
    const bookingTriggers = document.querySelectorAll('.booking-trigger');
    bookingTriggers.forEach(btn => {{
        btn.addEventListener('click', function(e) {{
            e.preventDefault();
            const roomType = this.getAttribute('data-type') || "Pertanyaan Umum";
            const price = this.getAttribute('data-price') || "Umum";
            const waText = encodeURIComponent(`Halo, saya tertarik untuk memesan ${{roomType}} (Harga: ${{price}}/bulan) di Kos Putri Griya Ayu. Apakah masih ada kamar kosong yang tersedia?`);
            
            const confirmMsg = `🌸 Konfirmasi Pemesanan 🌸\\n\\nKamar: \${{roomType}}\\nHarga: \${{price}}/bulan\\n\\nAnda akan diarahkan ke WhatsApp Pengelola (${whatsapp_formatted}) untuk melakukan pemesanan. Lanjutkan?`;
            
            if (confirm(confirmMsg)) {{
                addLogMessage(`Pengunjung melakukan pemesanan \${{roomType}} via WA`);
                window.open(`https://wa.me/{whatsapp_num}?text=\${{waText}}`, '_blank');
            }}
        }});
    }});

    const socialTriggers = document.querySelectorAll('.social-trigger');
    socialTriggers.forEach(btn => {{
        btn.addEventListener('click', function(e) {{
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            const handle = this.getAttribute('data-handle');
            const targetUrl = this.getAttribute('href');
            
            alert(`🌸 Menghubungi via \${{platform}} 🌸\\n\\nAnda akan diarahkan ke profil resmi kami di @\${{handle}}.`);
            window.open(targetUrl, '_blank');
        }});
    }});

    const mapBox = document.getElementById('map-simulator');
    if (mapBox) {{
        mapBox.addEventListener('click', function() {{
            const address = "{KOS_INFO["location"]["full_address"]}";
            const mapUrl = "{KOS_INFO["location"]["google_maps_url"]}";
            if (confirm(`🌸 Buka Google Maps 🌸\\n\\nAlamat Lengkap:\\n\${{address}}\\n\\nApakah Anda ingin membuka rute lokasi kos di Google Maps?`)) {{
                window.open(mapUrl, '_blank');
            }}
        }});
    }}

    // Initial load
    updateUIState();
}});
"""
    return Response(js_content, mimetype="text/javascript")

if __name__ == "__main__":
    # Bind to host 0.0.0.0 and port 3000 as per runtime guidelines
    app.run(host="0.0.0.0", port=3000, debug=True)
