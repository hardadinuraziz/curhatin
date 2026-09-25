/**
 * CURHATI - Mock Data & State Management Store
 * Sesuai Curhati Fullstack System Blueprint & Rekomendasi Multi-Role Akun
 */

const CURHATI_STORAGE_KEY = 'SHINEJOURNEY_STATE_V4';

// 15 Counselors (13 Real from Handbook + 2 Spare)
const SEED_COUNSELORS = [
  {
    id: 'csl-1',
    name: 'Wilda Nurbayani, S.Psi., M.Psi., Psikolog',
    title: 'Psikolog Klinis & Supervisi',
    serviceType: 'PSIKOLOG_KLINIS',
    avatar: 'team-wilda.jpg',
    email: 'wilda@curhatishinejourney.com',
    license: 'STR & SIPP Aktif (HIMPSI)',
    experienceYears: 7,
    topics: ['Kecemasan Akut', 'Trauma & PTSD', 'Burnout', 'Depresi Ringan-Sedang', 'Regulasi Emosi'],
    availableSlots: ['09:00 - 10:00', '13:00 - 14:00', '15:30 - 16:30', '19:00 - 20:00']
  },
  {
    id: 'csl-2',
    name: 'Haura Maulidianawati, S.Psi., Psikolog',
    title: 'Psikolog Klinis & Asesmen',
    serviceType: 'PSIKOLOG_KLINIS',
    avatar: 'team-haura.jpg',
    email: 'haura@curhatishinejourney.com',
    license: 'STR & SIPP Aktif (HIMPSI)',
    experienceYears: 6,
    topics: ['Stres Kerja', 'Quarter-Life Crisis', 'Dinamika Relasi', 'Burnout'],
    availableSlots: ['10:00 - 11:00', '14:00 - 15:00', '16:00 - 17:00']
  },
  {
    id: 'csl-3',
    name: 'Hanifa Putri Anggraini, S.Psi., Psikolog',
    title: 'Psikolog Umum',
    serviceType: 'PSIKOLOG_UMUM',
    avatar: 'team-hanifa.jpg',
    email: 'hanifa@curhatishinejourney.com',
    license: 'STR & SIPP Aktif (HIMPSI)',
    experienceYears: 5,
    topics: ['Stres Akademik', 'Kecemasan', 'Manajemen Waktu', 'Self-Esteem'],
    availableSlots: ['09:30 - 10:30', '13:30 - 14:30', '19:00 - 20:00']
  },
  {
    id: 'csl-4',
    name: 'Rasidia Nur Kinasti, S.Psi',
    title: 'Koordinator Teman Cerita (Lulusan S.Psi)',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-rasidia.jpg',
    email: 'rasidia@curhatishinejourney.com',
    license: 'Lulusan Sarjana Psikologi Terlatih (Shine Journey)',
    experienceYears: 3,
    topics: ['Teman Curhat', 'Kesepian', 'Overthinking', 'Stres Kuliah & Karir'],
    availableSlots: ['11:00 - 11:45', '13:30 - 14:15', '19:30 - 20:15', '20:30 - 21:15']
  },
  {
    id: 'csl-5',
    name: 'Putri Dyah Wahyupramesthi, S.Psi',
    title: 'Teman Cerita & Tim Edukasi',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-putri.jpg',
    email: 'putri@curhatishinejourney.com',
    license: 'Lulusan Sarjana Psikologi Terlatih (Shine Journey)',
    experienceYears: 2,
    topics: ['Hubungan Interpersonal', 'Quarter-Life Crisis', 'Self-Love', 'Stres Kerja'],
    availableSlots: ['14:00 - 14:45', '16:00 - 16:45', '20:00 - 20:45']
  },
  {
    id: 'csl-6',
    name: 'Anif Fatul Rohmah, S.Psi',
    title: 'Teman Cerita (Peer Support)',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-anif.jpg',
    email: 'anif@curhatishinejourney.com',
    license: 'Lulusan Sarjana Psikologi Terlatih (Shine Journey)',
    experienceYears: 2,
    topics: ['Prokrastinasi & Motivasi', 'Kesepian', 'Regulasi Emosi'],
    availableSlots: ['08:15 - 09:15', '13:00 - 14:00']
  },
  {
    id: 'csl-7',
    name: 'Shabrina Rihhadatul Aisy',
    title: 'Pendengar Aktif Sebaya',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-shabrina.jpg',
    email: 'shabrina@curhatishinejourney.com',
    license: 'Pendengar Aktif Terlatih (Shine Journey)',
    experienceYears: 2,
    topics: ['Relasi Interpersonal', 'Prokrastinasi', 'Kesepian', 'Self-Growth'],
    availableSlots: ['13:15 - 14:15', '15:45 - 16:45']
  },
  {
    id: 'csl-8',
    name: 'Theresa Adelya Setyawan, S.Psi',
    title: 'PIC Edukasi Konten & Teman Cerita',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-theresa.jpg',
    email: 'theresa@curhatishinejourney.com',
    license: 'Lulusan Sarjana Psikologi Terlatih (Shine Journey)',
    experienceYears: 2,
    topics: ['Stres Akademik', 'Relasi Keluarga & Pasangan', 'Overthinking'],
    availableSlots: ['19:30 - 20:30', '20:45 - 21:45']
  },
  {
    id: 'csl-9',
    name: 'Annisa, S.Psi',
    title: 'Teman Cerita (Peer Support)',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-annisa.jpg',
    email: 'annisa@curhatishinejourney.com',
    license: 'Lulusan Sarjana Psikologi Terlatih (Shine Journey)',
    experienceYears: 2,
    topics: ['Relasi Interpersonal', 'Kecemasan Ringan', 'Kesepian'],
    availableSlots: ['17:00 - 18:00']
  },
  {
    id: 'csl-10',
    name: 'Binti Nadhifah, S.Psi',
    title: 'Teman Cerita (Peer Support)',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-binti.jpg',
    email: 'binti@curhatishinejourney.com',
    license: 'Lulusan Sarjana Psikologi Terlatih (Shine Journey)',
    experienceYears: 2,
    topics: ['Relasi Interpersonal', 'Kesepian', 'Self-Esteem', 'Menghadapi Kegagalan'],
    availableSlots: ['09:30 - 10:30', '19:30 - 20:30']
  },
  {
    id: 'csl-11',
    name: 'Rizki Dwi Rahmadani Putri',
    title: 'Pendengar Aktif Sebaya',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-rizki.jpg',
    email: 'rizki@curhatishinejourney.com',
    license: 'Pendengar Aktif Terlatih (Shine Journey)',
    experienceYears: 2,
    topics: ['Stres Akademik', 'Relasi Interpersonal', 'Manajemen Waktu', 'Kesepian'],
    availableSlots: ['14:30 - 15:30', '17:00 - 18:00', '18:15 - 19:15']
  },
  {
    id: 'csl-12',
    name: 'Syifa Dyandri Kemaputri, S.Psi',
    title: 'Teman Cerita (Peer Support)',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-syifa.jpg',
    email: 'syifa@curhatishinejourney.com',
    license: 'Lulusan Sarjana Psikologi Terlatih (Shine Journey)',
    experienceYears: 3,
    topics: ['Distress', 'Relasi Interpersonal', 'Prokrastinasi', 'Overthinking'],
    availableSlots: ['18:15 - 19:15', '19:30 - 20:30', '20:45 - 21:45']
  },
  {
    id: 'csl-13',
    name: 'Siratia Katana, S.Psi',
    title: 'Teman Cerita (Peer Support)',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-siratia.jpg',
    email: 'siratia@curhatishinejourney.com',
    license: 'Lulusan Sarjana Psikologi Terlatih (Shine Journey)',
    experienceYears: 2,
    topics: ['Overthinking', 'Relasi Interpersonal', 'Kecemasan Ringan', 'Stres Akademik'],
    availableSlots: ['13:15 - 14:15']
  },
  {
    id: 'csl-14',
    name: 'Faiqotul Himmah, S.Psi',
    title: 'Teman Cerita (Konselor 14 - Cadangan)',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-faiqotul.jpg',
    email: 'faiqotul@curhatishinejourney.com',
    license: 'Lulusan Sarjana Psikologi Terlatih (Shine Journey)',
    experienceYears: 2,
    topics: ['Teman Cerita', 'Overthinking', 'Manajemen Emosi'],
    availableSlots: ['12:00 - 13:00']
  },
  {
    id: 'csl-15',
    name: 'Konselor Mitra 15',
    title: 'Teman Cerita (Konselor 15 - Cadangan Anggota Baru)',
    serviceType: 'TEMAN_CERITA',
    avatar: 'team-rasidia.jpg',
    email: 'konselor15@curhatishinejourney.com',
    license: 'Lulusan Sarjana Psikologi Terlatih (Shine Journey)',
    experienceYears: 1,
    topics: ['Teman Cerita', 'Pengembangan Diri'],
    availableSlots: ['15:00 - 16:00']
  }
];

// 10 Assessment Staff (8 Real from Sheet + 2 Spare)
const SEED_ASSESSMENT_STAFF = [
  { id: 'asm-1', name: 'Rasidia Nur Kinasti, S.Psi', role: 'Admin + Feedback', email: 'asesor.rasidia@curhatishinejourney.com', tests: ['16 PF', 'Big Five', 'MBTI', 'DISC', 'WPT', 'RMIB'] },
  { id: 'asm-2', name: 'Syifa Dyandri Kemaputri, S.Psi', role: 'Admin + Feedback', email: 'asesor.syifa@curhatishinejourney.com', tests: ['16 PF', 'MBTI', 'DISC', 'CFIT'] },
  { id: 'asm-3', name: 'Siratia Katana, S.Psi', role: 'Admin + Feedback', email: 'asesor.siratia@curhatishinejourney.com', tests: ['16 PF', 'Big Five', 'DISC', 'WPT'] },
  { id: 'asm-4', name: 'Anif Fatul Rohmah, S.Psi', role: 'Admin + Feedback', email: 'asesor.anif@curhatishinejourney.com', tests: ['16 PF', 'DISC', 'CFIT', 'RMIB'] },
  { id: 'asm-5', name: 'Rizki Dwi Rahmadani Putri', role: 'Admin + Feedback', email: 'asesor.rizki@curhatishinejourney.com', tests: ['16 PF', 'MBTI', 'WPT'] },
  { id: 'asm-6', name: 'Maulia Husna, S.Psi', role: 'Admin + Feedback', email: 'asesor.maulia@curhatishinejourney.com', tests: ['16 PF', 'Big Five', 'MBTI', 'DISC'] },
  { id: 'asm-7', name: 'Haura Maulidianawati, S.Psi., Psikolog', role: 'Interpretasi & Validasi', email: 'asesor.haura@curhatishinejourney.com', tests: ['Seluruh Alat Tes & Laporan Resmi'] },
  { id: 'asm-8', name: 'Hanifa Putri Anggraini, S.Psi., Psikolog', role: 'Interpretasi & Validasi', email: 'asesor.hanifa@curhatishinejourney.com', tests: ['Seluruh Alat Tes & Laporan Resmi'] },
  { id: 'asm-9', name: 'Faiqotul Himmah, S.Psi', role: 'Admin + Feedback (Asesor 9)', email: 'asesor.faiqotul@curhatishinejourney.com', tests: ['16 PF', 'Big Five', 'DISC'] },
  { id: 'asm-10', name: 'Asesor Mitra 10', role: 'Admin + Feedback (Asesor 10 - Cadangan)', email: 'asesor10@curhatishinejourney.com', tests: ['16 PF', 'CFIT', 'MBTI'] }
];

// Seed Initial State
const initialCurhatiState = {
  currentRole: 'CLIENT',
  currentUser: {
    id: 'usr-client-01',
    name: 'Maya Pratama',
    email: 'maya.pratama@gmail.com',
    role: 'CLIENT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+62 812-3456-7890',
    authProvider: 'google'
  },
  roles: [
    // 1. Core Management & Multi-Access Roles
    { id: 'COORDINATOR', label: '👑 Koordinator Layanan (Akses Master)', badge: 'Koordinator', color: 'bg-purple-600' },
    { id: 'ADMIN', label: '🛡️ Admin Operasional (1 Akun Bersama - 5 User)', badge: 'Admin CS', color: 'bg-rose-600' },
    { id: 'AI_ADMIN', label: '🤖 Admin by AI (ShineBot Auto-Reply)', badge: 'AI Assistant', color: 'bg-teal-600' },
    { id: 'FINANCE', label: '💳 Finance & Billing (Siti Rahma)', badge: 'Finance', color: 'bg-sky-600' },
    { id: 'CLIENT', label: '👤 Client (Maya Pratama - Login Gmail)', badge: 'Klien', color: 'bg-emerald-600' },
    { id: 'ASSESSMENT_STAFF', label: '📋 Divisi Asesmen (10 Tim Asesor)', badge: 'Tim Asesor', color: 'bg-amber-600' },

    // 2. 15 Individual Counselor Personal Accounts
    { id: 'csl-1', label: '👩‍⚕️ Psikolog Klinis Wilda Nurbayani, M.Psi.', badge: 'Psikolog Klinis', color: 'bg-indigo-600' },
    { id: 'csl-2', label: '👩‍⚕️ Psikolog Klinis Haura Maulidianawati, S.Psi.', badge: 'Psikolog Klinis', color: 'bg-indigo-600' },
    { id: 'csl-3', label: '👩‍⚕️ Psikolog Umum Hanifa Putri Anggraini, S.Psi.', badge: 'Psikolog Umum', color: 'bg-sky-600' },
    { id: 'csl-4', label: '🤝 Teman Cerita Rasidia Nur Kinasti, S.Psi', badge: 'Peer Support', color: 'bg-amber-500' },
    { id: 'csl-5', label: '🤝 Teman Cerita Putri Dyah, S.Psi', badge: 'Peer Support', color: 'bg-pink-500' },
    { id: 'csl-6', label: '🤝 Teman Cerita Anif Fatul Rohmah, S.Psi', badge: 'Peer Support', color: 'bg-amber-500' },
    { id: 'csl-7', label: '🤝 Teman Cerita Shabrina Rihhadatul Aisy', badge: 'Peer Support', color: 'bg-emerald-500' },
    { id: 'csl-8', label: '🤝 Teman Cerita Theresa Adelya, S.Psi', badge: 'Peer Support', color: 'bg-purple-500' },
    { id: 'csl-9', label: '🤝 Teman Cerita Annisa, S.Psi', badge: 'Peer Support', color: 'bg-rose-500' },
    { id: 'csl-10', label: '🤝 Teman Cerita Binti Nadhifah, S.Psi', badge: 'Peer Support', color: 'bg-amber-500' },
    { id: 'csl-11', label: '🤝 Teman Cerita Rizki Dwi Rahmadani', badge: 'Peer Support', color: 'bg-teal-500' },
    { id: 'csl-12', label: '🤝 Teman Cerita Syifa Dyandri, S.Psi', badge: 'Peer Support', color: 'bg-green-600' },
    { id: 'csl-13', label: '🤝 Teman Cerita Siratia Katana, S.Psi', badge: 'Peer Support', color: 'bg-yellow-600' },
    { id: 'csl-14', label: '🤝 Teman Cerita Faiqotul Himmah, S.Psi (Konselor 14)', badge: 'Peer Support', color: 'bg-amber-500' },
    { id: 'csl-15', label: '🤝 Teman Cerita Konselor Mitra 15 (Cadangan)', badge: 'Peer Support', color: 'bg-gray-600' }
  ],
  services: [
    {
      id: 'srv-1',
      name: 'Teman Cerita',
      category: 'TEMAN_CERITA',
      description: 'Ruang aman untuk berbagi cerita sehari-hari, beban pikiran ringan, dan curhat tanpa penghakiman bersama konselor lulusan S.Psi terlatih.',
      durationMinutes: 45,
      price: 50000,
      badgeColor: 'amber',
      icon: 'heart-handshake'
    },
    {
      id: 'srv-2',
      name: 'Psikolog Klinis Dewasa',
      category: 'PSIKOLOG_KLINIS',
      description: 'Layanan psikologis komprehensif oleh psikolog klinis berlisensi (STR & SIPP aktif) untuk gangguan kecemasan, trauma, depresi, atau regulasi emosi.',
      durationMinutes: 60,
      price: 175000,
      badgeColor: 'indigo',
      icon: 'brain'
    },
    {
      id: 'srv-4',
      name: 'Konseling Psikolog Umum',
      category: 'PSIKOLOG_UMUM',
      description: 'Konseling profesional dengan Psikolog Umum berizin (STR & SIPP aktif) untuk stres akademik, bimbingan karir, manajemen waktu, dan pengembangan diri.',
      durationMinutes: 60,
      price: 135000,
      badgeColor: 'sky',
      icon: 'user-check'
    },
    {
      id: 'srv-3',
      name: 'Asesmen Psikologi Resmi',
      category: 'ASESMEN_PSIKOLOGI',
      description: 'Pemeriksaan psikologis terstandar (Minat Bakat, Kepribadian, Kesiapan Kerja, Kecerdasan) dengan laporan psikologis resmi dari tim psikolog berizin.',
      durationMinutes: 90,
      price: 200000,
      badgeColor: 'teal',
      icon: 'file-text'
    }
  ],
  counselors: SEED_COUNSELORS,
  assessmentStaff: SEED_ASSESSMENT_STAFF,
  reservations: [
    {
      id: 'RES-2026-081',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-1',
      counselorName: 'Wilda Nurbayani, S.Psi., M.Psi., Psikolog',
      serviceType: 'Psikolog Klinis',
      date: '2026-09-18',
      timeSlot: '13:00 - 14:00',
      price: 175000,
      paymentStatus: 'PAID',
      status: 'CONFIRMED',
      createdAt: '2026-09-16 10:15'
    },
    {
      id: 'RES-2026-079',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-4',
      counselorName: 'Rasidia Nur Kinasti, S.Psi',
      serviceType: 'Teman Cerita',
      date: '2026-09-14',
      timeSlot: '19:30 - 20:15',
      price: 50000,
      paymentStatus: 'PAID',
      status: 'COMPLETED',
      createdAt: '2026-09-13 14:00'
    }
  ],
  counselingSessions: [
    {
      id: 'SES-001',
      reservationId: 'RES-2026-081',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-1',
      counselorName: 'Wilda Nurbayani, S.Psi., M.Psi., Psikolog',
      serviceType: 'Psikolog Klinis',
      scheduledDate: '2026-09-18',
      timeSlot: '13:00 - 14:00',
      status: 'SCHEDULED',
      privateNotes: 'Riwayat kecemasan saat transisi pekerjaan baru. Klien melaporkan gangguan pola tidur.',
      hasReport: false,
      startedAt: null,
      endedAt: null
    },
    {
      id: 'SES-002',
      reservationId: 'RES-2026-079',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-4',
      counselorName: 'Rasidia Nur Kinasti, S.Psi',
      serviceType: 'Teman Cerita',
      scheduledDate: '2026-09-14',
      timeSlot: '19:30 - 20:15',
      status: 'COMPLETED',
      privateNotes: 'Sesi curhat berjalan hangat. Maya merasa lebih lega setelah mengurai unek-unek beban kantor.',
      hasReport: true,
      startedAt: '2026-09-14 19:30',
      endedAt: '2026-09-14 20:15'
    }
  ],
  assessments: [
    {
      id: 'ASM-2026-094',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      clientEmail: 'maya.pratama@gmail.com',
      instrument: 'DASS-21 Skrining Mandiri',
      submittedAt: '2026-09-16 08:45',
      scores: { depression: 12, anxiety: 16, stress: 18 },
      severity: { depression: 'Sedang', anxiety: 'Parah', stress: 'Sedang' },
      status: 'UNDER_REVIEW',
      assignedStaff: 'Rasidia Nur Kinasti, S.Psi',
      internalNotes: 'Perlu verifikasi kebutuhan rujukan profesional. Prioritas review hari ini.',
      recommendedService: 'Psikolog Klinis'
    }
  ],
  chatConversations: [
    {
      id: 'CONV-01',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-1',
      counselorName: 'Wilda Nurbayani, S.Psi., M.Psi., Psikolog',
      serviceType: 'Psikolog Klinis',
      unreadClient: 0,
      unreadCounselor: 0,
      lastMessage: 'Halo Mbak Maya, sebelum sesi konseling, silakan persiapkan tempat yang tenang ya.',
      lastMessageTime: '15:20',
      messages: [
        {
          id: 'm1',
          senderId: 'usr-client-01',
          senderRole: 'CLIENT',
          text: 'Halo Mbak Wilda, terima kasih sudah menerima jadwal saya.',
          time: '14:30',
          read: true
        },
        {
          id: 'm2',
          senderId: 'csl-1',
          senderRole: 'PSYCHOLOGIST',
          text: 'Sama-sama Mbak Maya. Selamat datang di Shine Journey. Nanti kita akan bahas apa yang terasa paling memberatkan ya.',
          time: '14:45',
          read: true
        },
        {
          id: 'm3',
          senderId: 'csl-1',
          senderRole: 'PSYCHOLOGIST',
          text: 'Halo Mbak Maya, sebelum sesi konseling, silakan persiapkan tempat yang tenang ya.',
          time: '15:20',
          read: true
        }
      ]
    }
  ],
  reports: [
    {
      id: 'REP-001',
      sessionId: 'SES-002',
      reservationId: 'RES-2026-079',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-4',
      counselorName: 'Rasidia Nur Kinasti, S.Psi',
      serviceType: 'Teman Cerita',
      fileName: 'Curhati_Refleksi_MayaPratama_14Sep2026.pdf',
      fileUrl: '#mock-signed-url-report',
      mimeType: 'application/pdf',
      fileSize: '420 KB',
      uploadedAt: '2026-09-14 20:30',
      sentAt: '2026-09-14 20:32',
      notesForClient: 'Catatan ringkas poin-poin refleksi dan latihan pernapasan mandiri saat menghadapi situasi stres di tempat kerja.'
    }
  ],
  invoices: [
    {
      id: 'INV-2026-081',
      reservationId: 'RES-2026-081',
      clientName: 'Maya Pratama',
      serviceName: 'Psikolog Klinis (60 mnt)',
      amount: 175000,
      paymentMethod: 'QRIS / GoPay',
      status: 'PAID',
      paidAt: '2026-09-16 10:20',
      createdAt: '2026-09-16 10:15'
    }
  ],
  auditLogs: [
    {
      id: 'AUD-101',
      timestamp: '2026-09-16 10:20:12',
      userId: 'usr-client-01',
      userName: 'Maya Pratama (CLIENT)',
      action: 'PAYMENT',
      resource: 'Reservation',
      resourceId: 'RES-2026-081',
      ipAddress: '180.252.164.21',
      metadata: 'Paid IDR 175,000 via Midtrans'
    }
  ],
  articles: [
    {
      id: 'art-1',
      title: '5 Cara Menenangkan Pikiran Saat Mengalami Overthinking Parah',
      slug: '5-cara-menenangkan-pikiran-overthinking',
      category: 'Kecemasan',
      author: 'Wilda Nurbayani, S.Psi., M.Psi., Psikolog',
      authorRole: 'Psikolog Klinis',
      readTime: '5 menit baca',
      summary: 'Pelajari teknik grounding 5-4-3-2-1 dan pernapasan diafragma yang terbukti efektif meredakan cemas dan mengembalikan fokus.',
      content: 'Overthinking sering kali dipicu oleh kekhawatiran berlebih terhadap masa depan yang belum tentu terjadi atau penyesalan atas masa lalu. Saat pikiran mulai berputar cepat dan tak terkendali, teknik grounding 5-4-3-2-1 dapat membantu menghubungkan panca indra dengan saat ini.',
      publishedAt: '2026-09-20',
      status: 'PUBLISHED',
      views: 342,
      coverGradient: 'linear-gradient(135deg, #667eea, #764ba2)'
    },
    {
      id: 'art-2',
      title: 'Mengenal Tanda Burnout dan Kapan Saatnya Anda Butuh Teman Cerita',
      slug: 'mengenal-tanda-burnout',
      category: 'Self-Care',
      author: 'Rasidia Nur Kinasti, S.Psi',
      authorRole: 'Teman Cerita (Lulusan S.Psi)',
      readTime: '6 menit baca',
      summary: 'Jangan tunggu hingga lelah fisik dan mental. Kenali sinyal kejenuhan sejak dini agar kesehatan jiwa tetap terjaga.',
      content: 'Burnout bukan sekadar rasa malas biasa. Ini adalah kondisi kelelahan emosional, fisik, dan mental yang berkepanjangan akibat stres kerja atau beban hidup yang tak tertangani. Berbagi cerita dengan pendamping yang aman dan terpercaya adalah langkah pertama pemulihan.',
      publishedAt: '2026-09-18',
      status: 'PUBLISHED',
      views: 289,
      coverGradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
    },
    {
      id: 'art-3',
      title: 'Kaitan Erat Antara Kualitas Tidur Malam dan Stabilitas Emosional',
      slug: 'tidur-malam-dan-stabilitas-emosional',
      category: 'Tidur & Relaksasi',
      author: 'Hanifa Putri Anggraini, S.Psi., Psikolog',
      authorRole: 'Psikolog Umum',
      readTime: '4 menit baca',
      summary: 'Sulit tidur seringkali menjadi alarm bahwa ada beban pikiran yang belum terurai. Temukan cara meredakannya sebelum istirahat.',
      content: 'Saat tidur malam terganggu, amigdala di otak menjadi 60% lebih reaktif terhadap stimulus emosional negatif. Menciptakan rutinitas relaksasi sebelum tidur dan mendokumentasikan uneg-uneg dapat membantu menenangkan saraf simpatik.',
      publishedAt: '2026-09-15',
      status: 'PUBLISHED',
      views: 215,
      coverGradient: 'linear-gradient(135deg, #43e97b, #38f9d7)'
    }
  ]
};

class CurhatiStore {
  constructor() {
    this.storageKey = CURHATI_STORAGE_KEY;
    this.listeners = [];
    this.data = this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.counselors && parsed.counselors.length >= 13) {
          // Ensure articles exist
          if (!parsed.articles || !Array.isArray(parsed.articles)) {
            parsed.articles = JSON.parse(JSON.stringify(initialCurhatiState.articles));
          }
          // Ensure Hanifa is marked as PSIKOLOG_UMUM
          const hanifa = parsed.counselors.find(c => c.id === 'csl-3');
          if (hanifa) {
            hanifa.serviceType = 'PSIKOLOG_UMUM';
            hanifa.title = 'Psikolog Umum';
          }
          // Ensure srv-4 exists in services
          if (!parsed.services.some(s => s.id === 'srv-4')) {
            const srv4 = initialCurhatiState.services.find(s => s.id === 'srv-4');
            if (srv4) parsed.services.splice(2, 0, srv4);
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Storage read error, using initialCurhatiState', e);
    }
    this.saveState(initialCurhatiState);
    return JSON.parse(JSON.stringify(initialCurhatiState));
  }

  saveState(stateToSave) {
    const data = stateToSave || this.data;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.data));
  }

  setRole(roleId) {
    this.data.currentRole = roleId;

    if (roleId === 'CLIENT') {
      this.data.currentUser = {
        id: 'usr-client-01',
        name: 'Maya Pratama',
        email: 'maya.pratama@gmail.com',
        role: 'CLIENT',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        title: 'Klien (Login via Google)'
      };
    } else if (roleId === 'ADMIN') {
      this.data.currentUser = {
        id: 'adm-01',
        name: 'Admin Operasional (CS & Operasional)',
        email: 'admin@curhatishinejourney.com',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        title: '1 Akun Bersama (Multi-Login 5 User)'
      };
    } else if (roleId === 'COORDINATOR') {
      this.data.currentUser = {
        id: 'coord-01',
        name: 'Koordinator Layanan',
        email: 'koordinator@curhatishinejourney.com',
        role: 'COORDINATOR',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        title: 'Akses Master Keseluruhan Sistem'
      };
    } else if (roleId === 'AI_ADMIN') {
      this.data.currentUser = {
        id: 'ai-01',
        name: 'ShineBot AI Assistant',
        email: 'ai.admin@curhatishinejourney.com',
        role: 'AI_ADMIN',
        avatar: 'logo-icon.png',
        title: 'Admin AI (Auto-Reply & Triage)'
      };
    } else if (roleId === 'FINANCE') {
      this.data.currentUser = {
        id: 'fin-01',
        name: 'Siti Rahma, S.E',
        email: 'finance@curhatishinejourney.com',
        role: 'FINANCE',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        title: 'Head of Finance & Billing'
      };
    } else if (roleId === 'ASSESSMENT_STAFF') {
      this.data.currentUser = {
        id: 'asm-1',
        name: 'Divisi Asesmen (10 Asesor)',
        email: 'asesmen@curhatishinejourney.com',
        role: 'ASSESSMENT_STAFF',
        avatar: 'team-rasidia.jpg',
        title: 'Asesor Psikologi Resmi'
      };
    } else if (roleId.startsWith('csl-')) {
      // Individual counselor personal account
      const counselor = this.data.counselors.find(c => c.id === roleId) || this.data.counselors[0];
      this.data.currentUser = {
        id: counselor.id,
        name: counselor.name,
        email: counselor.email || `${counselor.id}@curhatishinejourney.com`,
        role: (counselor.serviceType === 'PSIKOLOG_KLINIS' || counselor.serviceType === 'PSIKOLOG_UMUM') ? 'PSYCHOLOGIST' : 'TEMAN_CERITA',
        counselorId: counselor.id,
        avatar: counselor.avatar,
        title: counselor.title
      };
    }

    this.addAuditLog('ROLE_SWITCH', 'UserSession', this.data.currentUser.id, `Switched view to ${roleId}`);
    this.saveState();
  }

  // Reservation Actions
  createReservation({ counselorId, date, timeSlot }) {
    const counselor = this.data.counselors.find(c => c.id === counselorId);
    if (!counselor) throw new Error('Konselor tidak ditemukan');

    const exists = this.data.reservations.some(
      r => r.counselorId === counselorId && r.date === date && r.timeSlot === timeSlot && r.status !== 'CANCELLED'
    );
    if (exists) {
      throw new Error(`Slot ${timeSlot} pada tanggal ${date} sudah dipesan orang lain. Silakan pilih slot lain.`);
    }

    const resId = `RES-2026-${Math.floor(100 + Math.random() * 900)}`;
    const service = this.data.services.find(s => s.category === counselor.serviceType) || this.data.services[0];
    
    const newReservation = {
      id: resId,
      clientId: this.data.currentUser.id,
      clientName: this.data.currentUser.name,
      counselorId: counselor.id,
      counselorName: counselor.name,
      serviceType: counselor.title,
      date,
      timeSlot,
      price: service.price,
      paymentStatus: 'PAID',
      status: 'CONFIRMED',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const newSession = {
      id: `SES-${Math.floor(100 + Math.random() * 900)}`,
      reservationId: resId,
      clientId: this.data.currentUser.id,
      clientName: this.data.currentUser.name,
      counselorId: counselor.id,
      counselorName: counselor.name,
      serviceType: counselor.title,
      scheduledDate: date,
      timeSlot,
      status: 'SCHEDULED',
      privateNotes: 'Sesi baru dijadwalkan dari reservasi web.',
      hasReport: false,
      startedAt: null,
      endedAt: null
    };

    this.data.reservations.unshift(newReservation);
    this.data.counselingSessions.unshift(newSession);

    this.addAuditLog('CREATE_RESERVATION', 'Reservation', resId, `Booked ${counselor.name} on ${date} ${timeSlot}`);
    this.saveState();
    return newReservation;
  }

  // Chat Actions
  sendMessage(convId, text) {
    const conv = this.data.chatConversations.find(c => c.id === convId);
    if (!conv) return;

    const newMsg = {
      id: `m_${Date.now()}`,
      senderId: this.data.currentUser.id,
      senderRole: this.data.currentUser.role || this.data.currentRole,
      text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    conv.messages.push(newMsg);
    conv.lastMessage = text;
    conv.lastMessageTime = newMsg.time;

    this.addAuditLog('SEND_CHAT_MESSAGE', 'Chat', convId, `User sent message in ${convId}`);
    this.saveState();
  }

  // AI Auto-Responder (Admin by AI) - Fallback saat staf/konselor belum membalas
  sendAiAutoReply(convId, userText) {
    const conv = this.data.chatConversations.find(c => c.id === convId);
    if (!conv) return;

    const lower = (userText || '').toLowerCase();
    let replyText = '';

    if (lower.includes('halo') || lower.includes('hai') || lower.includes('selamat') || lower.includes('pagi') || lower.includes('malam') || lower.includes('siang') || lower.includes('sore')) {
      replyText = `Halo! Salam hangat dari tim Curhati Shine Journey. 🌿\n\nPesan Anda telah masuk ke sistem kami. Konselor yang bertugas (${conv.counselorName}) dan admin sedang dihubungkan ke ruang chat ini. Sambil menunggu konselor masuk, ada hal penting atau uneg-uneg apa yang ingin Anda sampaikan terlebih dahulu?`;
    } else if (lower.includes('overthinking') || lower.includes('cemas') || lower.includes('stres') || lower.includes('panik') || lower.includes('takut') || lower.includes('lelah') || lower.includes('capek') || lower.includes('sedih')) {
      replyText = `Terima kasih sudah berani berbagi apa yang Anda rasakan. Merasa lelah, cemas, atau overthinking adalah hal yang sangat manusiawi, apalagi ketika beban terasa menumpuk. 🤍\n\nAnda tidak sendirian dan ruang chat ini 100% aman serta terenkripsi. Sambil menunggu konselor merespons langsung, cobalah tarik napas perlahan (4 detik), tahan sejenak (4 detik), dan hembuskan perlahan. Ceritakan saja apa yang paling mengganjal di hati Anda saat ini ya.`;
    } else if (lower.includes('harga') || lower.includes('biaya') || lower.includes('tarif') || lower.includes('paket') || lower.includes('daftar')) {
      replyText = `Layanan konseling kami tersedia dalam 2 pilihan utama:\n1. 🤝 **Teman Cerita (Peer Support)**: Rp 50.000 / sesi (45 menit bersama lulusan S.Psi terlatih).\n2. 👩‍⚕️ **Psikolog Klinis Dewasa**: Rp 175.000 / sesi (60 menit bersama psikolog berizin STR/SIPP).\n\nAdmin manusia kami akan segera memverifikasi ketersediaan jadwal terbaik untuk Anda sebentar lagi.`;
    } else if (lower.includes('jadwal') || lower.includes('jam') || lower.includes('piket') || lower.includes('kapan')) {
      replyText = `Jadwal sesi konseling kami aktif setiap hari Senin s.d. Minggu dari pukul 07.00 hingga 21.45 WIB (12 slot waktu). Konselor bertugas Anda saat ini adalah **${conv.counselorName}**. Mohon ditunggu sebentar ya, sistem sedang memanggil konselor Anda.`;
    } else {
      replyText = `Pesan Anda telah berhasil diterima oleh sistem Curhati. Konselor Anda (**${conv.counselorName}**) dan staf admin sedang memeriksa ruang chat ini dan akan segera membalas secara langsung.\n\nJika ada hal mendesak atau cerita tambahan yang ingin Anda tuangkan, silakan lanjutkan menulis di sini ya. Kami siap mendengar tanpa penghakiman. 🌿`;
    }

    const aiMsg = {
      id: `m_ai_${Date.now()}`,
      senderId: 'ai-admin-bot',
      senderRole: 'AI_ADMIN',
      text: `🤖 [Admin by AI - ShineBot]:\n${replyText}`,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    conv.messages.push(aiMsg);
    conv.lastMessage = aiMsg.text;
    conv.lastMessageTime = aiMsg.time;
    this.saveState();
  }

  markChatAsRead(convId) {
    const conv = this.data.chatConversations.find(c => c.id === convId);
    if (!conv) return;
    conv.messages.forEach(m => { m.read = true; });
    this.saveState();
  }

  // Session Actions
  startSession(sessionId) {
    const s = this.data.counselingSessions.find(x => x.id === sessionId);
    if (!s) return;
    s.status = 'ONGOING';
    s.startedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    this.addAuditLog('START_SESSION', 'CounselingSession', sessionId, 'Counselor started live session');
    this.saveState();
  }

  completeSession(sessionId, privateNotes) {
    const s = this.data.counselingSessions.find(x => x.id === sessionId);
    if (!s) return;
    s.status = 'COMPLETED';
    s.endedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    if (privateNotes) s.privateNotes = privateNotes;
    this.addAuditLog('COMPLETE_SESSION', 'CounselingSession', sessionId, 'Counselor finalized session');
    this.saveState();
  }

  uploadReport(sessionId, { fileName, notesForClient }) {
    const s = this.data.counselingSessions.find(x => x.id === sessionId);
    if (!s) return;

    const repId = `REP-${Math.floor(100 + Math.random() * 900)}`;
    const newReport = {
      id: repId,
      sessionId: s.id,
      reservationId: s.reservationId,
      clientId: s.clientId,
      clientName: s.clientName,
      counselorId: s.counselorId,
      counselorName: s.counselorName,
      serviceType: s.serviceType,
      fileName: fileName || `Curhati_Insight_${s.clientName.replace(/\s+/g, '')}.pdf`,
      fileUrl: '#mock-signed-url-report',
      mimeType: 'application/pdf',
      fileSize: '380 KB',
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      notesForClient: notesForClient || 'Catatan hasil evaluasi dan rekomendasi latihan refleksi mandiri.'
    };

    this.data.reports.unshift(newReport);
    s.hasReport = true;

    this.addAuditLog('UPLOAD_REPORT', 'Report', repId, `Uploaded clinical report for ${s.clientName}`);
    this.saveState();
    return newReport;
  }

  // Assessment Staff Actions
  reviewAssessment(asmId, { internalNotes, status, recommendedService }) {
    const asm = this.data.assessments.find(a => a.id === asmId);
    if (!asm) return;

    if (internalNotes) asm.internalNotes = internalNotes;
    if (status) asm.status = status;
    if (recommendedService) asm.recommendedService = recommendedService;

    this.addAuditLog('REVIEW_ASSESSMENT', 'Assessment', asmId, `Staff updated status to ${status}. Service rec: ${recommendedService || 'None'}`);
    this.saveState();
  }

  // Audit Log Helper
  addAuditLog(action, resource, resourceId, metadata) {
    const log = {
      id: `AUD-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: this.data.currentUser ? this.data.currentUser.id : 'system',
      userName: this.data.currentUser ? `${this.data.currentUser.name} (${this.data.currentRole})` : 'System Daemon',
      action,
      resource,
      resourceId,
      ipAddress: '127.0.0.1 (Local Verified Session)',
      metadata
    };
    this.data.auditLogs.unshift(log);
  }

  // Article Publishing Actions
  addArticle({ title, category, author, authorRole, readTime, summary, content, coverGradient, status = 'PUBLISHED' }) {
    if (!this.data.articles) this.data.articles = [];
    const id = `art-${Date.now()}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newArt = {
      id,
      title,
      slug,
      category: category || 'Edukasi',
      author: author || (this.data.currentUser ? this.data.currentUser.name : 'Tim Shine Journey'),
      authorRole: authorRole || (this.data.currentUser ? this.data.currentUser.title : 'Psikolog / Konselor'),
      readTime: readTime || '5 menit baca',
      summary,
      content,
      publishedAt: new Date().toISOString().split('T')[0],
      status: status || 'PUBLISHED',
      views: 1,
      coverGradient: coverGradient || 'linear-gradient(135deg, #4f46e5, #0d9488)'
    };
    this.data.articles.unshift(newArt);
    this.addAuditLog('PUBLISH_ARTICLE', 'Article', id, `Published article "${title}"`);
    this.saveState();
    return newArt;
  }

  updateArticle(id, updates) {
    if (!this.data.articles) return null;
    const art = this.data.articles.find(a => a.id === id);
    if (!art) return null;
    Object.assign(art, updates);
    this.addAuditLog('UPDATE_ARTICLE', 'Article', id, `Updated article "${art.title}"`);
    this.saveState();
    return art;
  }

  deleteArticle(id) {
    if (!this.data.articles) return false;
    const idx = this.data.articles.findIndex(a => a.id === id);
    if (idx === -1) return false;
    const removed = this.data.articles.splice(idx, 1)[0];
    this.addAuditLog('DELETE_ARTICLE', 'Article', id, `Deleted article "${removed ? removed.title : id}"`);
    this.saveState();
    return true;
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(initialCurhatiState));
    this.saveState();
  }
}

// Global Singleton Instance
window.curhatiStore = new CurhatiStore();
