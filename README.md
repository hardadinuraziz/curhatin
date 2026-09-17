# Curhati — Shine Journey Platform

> Platform Konseling Psikologis, Teman Cerita & Asesmen Mandiri Terpercaya di Indonesia.  
> Sesuai Dokumen **CURHATI — FULLSTACK SYSTEM BLUEPRINT (Phase 1 UI Prototype)**.

---

## 🌟 Fitur Utama

- **Frontend Publik Bergaya Halodoc**:
  - Halaman Beranda modern dengan palet warna asli Shine Journey.
  - Logo & Favicon resmi Shine Journey (*"Teman Dalam Perjalananmu, Bersama Menuju Diri Yang Lebih Baik"*).
  - Alur Pemesanan Konseling Mandiri (Teman Cerita, Psikolog Umum, Psikolog Klinis) dengan jaminan *Anti Double-Booking*.
  - Modul **Asesmen Mandiri Independen** (DASS-21 / Burnout Check) yang terpisah dari rekam medis konseling, dilengkapi disclaimer etis dan protokol darurat krisis (*Hotline Sejiwa 119 ext 8*).
  - Ruang Chat 1-to-1 terenkripsi antara klien dan konselor.
  - Unduh dokumen laporan resmi hasil sesi konseling.

- **Backend & Admin Management Portal (`/admin`)**:
  - Gerbang Keamanan Login Khusus Staf & Admin (Password: `curhatin2026`).
  - Sistem Multi-Role RBAC:
    1. **Admin**: Kelola master pengguna, layanan, dan *Security Audit Logs*.
    2. **Assessment Staff**: Review antrean submission asesmen, scoring, dan rekomendasi layanan secara eksplisit.
    3. **Psikolog Klinis & Teman Cerita**: Mulai sesi, catat *Private Clinical Notes*, selesaikan sesi, dan unggah laporan PDF untuk klien.
    4. **Finance**: Monitor transaksi gateway (Midtrans/Xendit/Stripe), invoice, dan omzet terverifikasi.
    5. **Owner**: Ringkasan performa bisnis agregat dengan kebijakan *Least-Privilege* (terproteksi dari catatan medis/klinis pasien).

---

## 🚀 Cara Menjalankan

Server ini dilengkapi dengan **Clean URL Routing** sehingga dapat diakses tanpa ekstensi file `.html`:

```bash
# Menjalankan server lokal (Clean URL)
python3 server.py
```

Buka di browser:
- **Frontend Klien**: `http://localhost:3000/`
- **Backend / Admin Portal**: `http://localhost:3000/admin` (Password: `curhatin2026`)

---

## 📁 Struktur Berkas

```text
├── index.html          # Frontend utama (Landing page, booking, asesmen, chat, laporan)
├── admin.html          # Backend / Admin Portal dengan gerbang login
├── style.css           # Styling utama landing page Shine Journey
├── curhati.css         # Desain sistem SaaS modern Curhati
├── halodoc.css         # Desain sistem khas Halodoc
├── curhati-data.js     # Mock Data Store reaktif & LocalStorage persistence
├── curhati-app.js      # Controller aplikasi, alur booking, dan state router
├── server.py           # Clean URL server lokal (Python HTTP Server)
├── logo-icon.png       # Emblem resmi Shine Journey
├── logo.png            # Logo lengkap transparan
└── favicon.png         # Ikon tab browser
```

---

## 📄 Lisensi & Hak Cipta
Hak Cipta © 2026 Shine Journey / Curhati Indonesia. Seluruh hak cipta dilindungi undang-undang.
