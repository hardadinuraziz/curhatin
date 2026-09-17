# Curhati — Shine Journey Platform

> Platform Konseling Psikologis, Teman Cerita & Asesmen Mandiri Terpercaya di Indonesia.  
> Sesuai Dokumen **CURHATI — FULLSTACK SYSTEM BLUEPRINT**.

---

## 🌟 Fitur Utama

- **Frontend Publik Bergaya Halodoc**:
  - Halaman Beranda modern dengan palet warna asli Shine Journey (*Indigo `#4F46E5`, `#3B3373`, Emerald `#10B981`, Coral `#E6736A`, Gold `#F59E0B`*).
  - Logo & Favicon resmi Shine Journey (*"Teman Dalam Perjalananmu, Bersama Menuju Diri Yang Lebih Baik"*).
  - Alur Pemesanan Konseling Mandiri (Teman Cerita, Psikolog Umum, Psikolog Klinis) dengan jaminan *Anti Double-Booking* (Database-level transactional locks).
  - Modul **Asesmen Mandiri Independen** (DASS-21 / Burnout Check) yang terpisah dari rekam medis konseling, dilengkapi disclaimer etis dan protokol darurat krisis (*Hotline Sejiwa 119 ext 8*).
  - Ruang Chat 1-to-1 terenkripsi antara klien dan konselor (WebSocket Socket.io).
  - Unduh dokumen laporan resmi hasil sesi konseling.
  - Kontak Resmi: **081313078216 an. Hardadi Nur Aziz** ([WhatsApp Langsung](https://wa.me/6281313078216)).

- **Backend & Admin Management Portal (`/admin`)**:
  - Gerbang Keamanan Login Khusus Staf & Admin (Password: `curhatin2026`).
  - Sistem Multi-Role RBAC (8 Peran: `SUPER_ADMIN`, `ADMIN_OPERASIONAL`, `PSIKOLOG`, `TEMAN_CERITA`, `ASSESSMENT_STAFF`, `FINANCE`, `OWNER`, `CLIENT`).
  - **Prinsip Least-Privilege & Etika Klinis**: Catatan medis (*Clinical Notes*) terisolasi secara ketat dan hanya dapat diakses oleh Psikolog/Konselor yang bertugas dan Super Admin (terproteksi dari peran Client dan Owner).
  - **Anti Double-Booking Engine**: Transaksi basis data atomik dengan unique constraint `counselor_date_slot`.

---

## 🚀 Cara Menjalankan

### 1. Menjalankan Frontend & Portal Admin (Clean URL)

Server bawaan ini memetakan URL bersih tanpa ekstensi file `.html`:

```bash
python3 server.py
```

Buka di peramban:
- **Frontend Klien**: `http://localhost:3000/`
- **Backend / Admin Portal**: `http://localhost:3000/admin` (Password Akses: `curhatin2026`)

---

### 2. Menjalankan NestJS Production Backend API & Database

Backend dibangun dengan arsitektur modular NestJS, Prisma ORM, PostgreSQL, Redis, dan Socket.io:

```bash
# 1. Masuk ke direktori backend
cd backend

# 2. Jalankan PostgreSQL 16 & Redis 7 via Docker Compose
docker compose up -d

# 3. Salin environment variables
cp .env.example .env

# 4. Pasang dependencies
npm install

# 5. Jalankan migrasi basis data Prisma
npx prisma migrate dev --name init

# 6. Jalankan server backend (mode pengembangan)
npm run start:dev
```

Endpoint Backend:
- **API Base URL**: `http://localhost:4000/api/v1`
- **Swagger Documentation**: `http://localhost:4000/api/docs`
- **WebSocket Chat**: `ws://localhost:4000/chat`

---

## 📁 Struktur Berkas Proyek

```text
├── index.html              # Frontend utama Halodoc-style (Landing, Booking, Asesmen, Chat)
├── admin.html              # Backend / Admin Portal dengan login gate (curhatin2026)
├── style.css               # Styling landing page Shine Journey
├── curhati.css             # Desain sistem SaaS modern Curhati
├── halodoc.css             # Desain sistem khas Halodoc
├── curhati-data.js         # Mock Data Store reaktif & LocalStorage persistence
├── curhati-app.js          # Controller aplikasi, alur booking, dan state router
├── server.py               # Clean URL server lokal (Python HTTP Server)
├── logo-icon.png           # Emblem resmi Shine Journey
├── logo.png                # Logo lengkap transparan
├── favicon.png             # Ikon tab browser
└── backend/                # Arsitektur Backend NestJS Production
    ├── docker-compose.yml  # PostgreSQL 16 & Redis 7 stack
    ├── package.json        # NestJS 10, Prisma, Socket.io, BullMQ, Helmet
    ├── tsconfig.json       # TypeScript compiler configuration
    ├── .env.example        # Environment variable template
    ├── prisma/
    │   └── schema.prisma   # PostgreSQL Schema (8 Roles, Isolation, Constraints)
    └── src/
        ├── auth/           # Otentikasi JWT, Refresh Token, Password Hashing
        ├── users/          # Manajemen Profil, Psikolog, dan Verifikasi Akun
        ├── reservations/   # Engine Booking Anti Tabrakan Jadwal (Transactions)
        ├── assessment/     # Modul Skrining DASS-21 Independen & Crisis Referral
        ├── counseling/     # Lifecycle Sesi Konseling & Isolasi Catatan Klinis Privat
        ├── payments/       # Webhook Payment Gateway (Midtrans/Xendit) & Konfirmasi
        ├── chat/           # WebSocket Gateway Real-Time Messaging & Typing Indicator
        ├── reports/        # Dashboard Eksekutif, Omzet & Analitik Konselor
        ├── audit-log/      # Security Trail & Compliance Logging
        ├── common/         # Custom Decorators (@Roles, @CurrentUser) & Guards
        ├── app.module.ts   # Root Module
        └── main.ts         # Server Bootstrap (Helmet, CORS, Validation, Swagger)
```

---

## 📞 Kontak & Dukungan
- **Pengelola**: Hardadi Nur Aziz
- **WhatsApp**: [081313078216](https://wa.me/6281313078216)
- **Repository**: [github.com/hardadinuraziz/curhatin](https://github.com/hardadinuraziz/curhatin)

---

## 📄 Lisensi & Hak Cipta
Hak Cipta © 2026 Shine Journey / Curhati Indonesia. Seluruh hak cipta dilindungi undang-undang.

