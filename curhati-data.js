/**
 * CURHATI - Mock Data & State Management Store
 * Sesuai Curhati Fullstack System Blueprint
 */

const CURHATI_STORAGE_KEY = 'CURHATI_STATE_V1';

// Seed Initial Data
const initialCurhatiState = {
  currentRole: 'CLIENT', // Default demo role: CLIENT | PSYCHOLOGIST | TEMAN_CERITA | ASSESSMENT_STAFF | ADMIN | FINANCE | OWNER
  currentUser: {
    id: 'usr-client-01',
    name: 'Maya Pratama',
    email: 'maya.pratama@example.com',
    role: 'CLIENT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+62 812-3456-7890'
  },
  roles: [
    { id: 'CLIENT', label: 'Client (Maya Pratama)', badge: 'Klien', color: 'bg-teal-500' },
    { id: 'PSYCHOLOGIST', label: 'Psikolog Klinis (drg. Sarah Amelia, M.Psi)', badge: 'Psikolog', color: 'bg-indigo-600' },
    { id: 'TEMAN_CERITA', label: 'Teman Cerita (Budi Santoso)', badge: 'Peer Counselor', color: 'bg-amber-500' },
    { id: 'ASSESSMENT_STAFF', label: 'Assessment Staff (Rian Hidayat)', badge: 'Asesor', color: 'bg-emerald-600' },
    { id: 'FINANCE', label: 'Finance (Siti Rahma)', badge: 'Finance', color: 'bg-sky-600' },
    { id: 'ADMIN', label: 'Administrator (Super Admin)', badge: 'Admin', color: 'bg-rose-600' },
    { id: 'OWNER', label: 'Owner / Executive (Hendro Wijaya)', badge: 'Owner', color: 'bg-purple-600' }
  ],
  services: [
    {
      id: 'srv-1',
      name: 'Teman Cerita',
      category: 'TEMAN_CERITA',
      description: 'Ruang aman untuk berbagi cerita sehari-hari, beban pikiran ringan, dan curhat tanpa penghakiman bersama konselor sebaya terlatih.',
      durationMinutes: 45,
      price: 65000,
      badgeColor: 'amber',
      icon: 'heart-handshake'
    },
    {
      id: 'srv-2',
      name: 'Psikolog Umum',
      category: 'PSIKOLOG_UMUM',
      description: 'Konseling mendalam mengenai pengembangan diri, dinamika relasi, stres kerja, kecemasan umum, dan manajemen emosi.',
      durationMinutes: 60,
      price: 175000,
      badgeColor: 'blue',
      icon: 'brain'
    },
    {
      id: 'srv-3',
      name: 'Psikolog Klinis',
      category: 'PSIKOLOG_KLINIS',
      description: 'Layanan psikologis komprehensif oleh psikolog klinis berlisensi (SIPP) untuk gangguan suasana hati, trauma, depresi, atau kecemasan berat.',
      durationMinutes: 60,
      price: 260000,
      badgeColor: 'indigo',
      icon: 'shield-alert'
    }
  ],
  counselors: [
    {
      id: 'csl-1',
      name: 'Sarah Amelia, M.Psi., Psikolog',
      title: 'Psikolog Klinis Dewasa',
      serviceType: 'PSIKOLOG_KLINIS',
      avatar: 'https://images.unsplash.com/photo-1594824813576-9321e14945d8?w=150&auto=format&fit=crop&q=80',
      license: 'SIPP: 1984-210-2021',
      experienceYears: 7,
      rating: 4.9,
      reviewCount: 142,
      topics: ['Kecemasan Akut', 'Trauma & PTSD', 'Burnout', 'Depresi Ringan-Sedang'],
      availableSlots: ['09:00 - 10:00', '13:00 - 14:00', '15:30 - 16:30', '19:00 - 20:00']
    },
    {
      id: 'csl-2',
      name: 'Dimas Wicaksono, M.Psi., Psikolog',
      title: 'Psikolog Umum & Karir',
      serviceType: 'PSIKOLOG_UMUM',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      license: 'SIPP: 2018-091-2022',
      experienceYears: 5,
      rating: 4.8,
      reviewCount: 98,
      topics: ['Karier & Pekerjaan', 'Quarter-Life Crisis', 'Komunikasi Interpersonal'],
      availableSlots: ['10:00 - 11:00', '14:00 - 15:00', '16:00 - 17:00']
    },
    {
      id: 'csl-3',
      name: 'Budi Santoso',
      title: 'Teman Cerita Senior & Peer Counselor',
      serviceType: 'TEMAN_CERITA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      license: 'Certified Active Listener (Curhati Academy)',
      experienceYears: 3,
      rating: 4.95,
      reviewCount: 220,
      topics: ['Teman Curhat', 'Kesepian', 'Overthinking', 'Stres Kuliah'],
      availableSlots: ['11:00 - 11:45', '13:30 - 14:15', '19:30 - 20:15', '20:30 - 21:15']
    }
  ],
  reservations: [
    {
      id: 'RES-2026-081',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-1',
      counselorName: 'Sarah Amelia, M.Psi., Psikolog',
      serviceType: 'Psikolog Klinis',
      date: '2026-09-18',
      timeSlot: '13:00 - 14:00',
      price: 260000,
      paymentStatus: 'PAID', // PENDING | PAID | FAILED | EXPIRED | REFUNDED
      status: 'CONFIRMED', // PENDING | CONFIRMED | CANCELLED | COMPLETED | NO_SHOW
      createdAt: '2026-09-16 10:15'
    },
    {
      id: 'RES-2026-079',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-3',
      counselorName: 'Budi Santoso',
      serviceType: 'Teman Cerita',
      date: '2026-09-14',
      timeSlot: '19:30 - 20:15',
      price: 65000,
      paymentStatus: 'PAID',
      status: 'COMPLETED',
      createdAt: '2026-09-13 14:00'
    },
    {
      id: 'RES-2026-082',
      clientId: 'usr-client-02',
      clientName: 'Reza Fahlevi',
      counselorId: 'csl-2',
      counselorName: 'Dimas Wicaksono, M.Psi., Psikolog',
      serviceType: 'Psikolog Umum',
      date: '2026-09-17',
      timeSlot: '14:00 - 15:00',
      price: 175000,
      paymentStatus: 'PAID',
      status: 'CONFIRMED',
      createdAt: '2026-09-15 08:30'
    }
  ],
  counselingSessions: [
    {
      id: 'SES-001',
      reservationId: 'RES-2026-081',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-1',
      counselorName: 'Sarah Amelia, M.Psi., Psikolog',
      serviceType: 'Psikolog Klinis',
      scheduledDate: '2026-09-18',
      timeSlot: '13:00 - 14:00',
      status: 'SCHEDULED', // SCHEDULED | ONGOING | COMPLETED | CANCELLED
      privateNotes: 'Riwayat kecemasan saat transisi pekerjaan baru. Klien melaporkan gangguan pola tidur 3 minggu terakhir.',
      hasReport: false,
      startedAt: null,
      endedAt: null
    },
    {
      id: 'SES-002',
      reservationId: 'RES-2026-079',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-3',
      counselorName: 'Budi Santoso',
      serviceType: 'Teman Cerita',
      scheduledDate: '2026-09-14',
      timeSlot: '19:30 - 20:15',
      status: 'COMPLETED',
      privateNotes: 'Sesi curhat berjalan hangat. Maya merasa lebih lega setelah mengurai unek-unek beban kantor.',
      hasReport: true,
      reportId: 'REP-001',
      startedAt: '2026-09-14 19:30',
      endedAt: '2026-09-14 20:15'
    }
  ],
  // Independent Assessment Module (Strict separation from Counseling!)
  assessments: [
    {
      id: 'ASM-2026-094',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      type: 'Skrining Kesejahteraan Psikologis (DASS-21)',
      submittedAt: '2026-09-16 08:45',
      status: 'NEW', // NEW | IN_PROGRESS | COMPLETED
      priority: 'HIGH', // LOW | MEDIUM | HIGH
      score: {
        anxiety: 14, // Sedang
        stress: 18, // Sedang
        depression: 8 // Normal
      },
      summary: 'Klien menunjukkan indikator kecemasan dan stres kerja pada tingkat sedang. Pola tidur terganggu.',
      answers: [
        { q: 'Merasa sulit untuk beristirahat/tenang', a: 'Sering' },
        { q: 'Mengalami kekhawatiran berlebih pada situasi wajar', a: 'Hampir selalu' },
        { q: 'Detak jantung terasa meningkat tanpa aktivitas fisik', a: 'Kadang-kadang' },
        { q: 'Pernah terpikir untuk menyakiti diri sendiri dalam 1 bulan terakhir', a: 'TIDAK PERNAH' }
      ],
      assignedStaff: 'Rian Hidayat',
      internalNotes: 'Perlu verifikasi kebutuhan rujukan profesional. Prioritas review hari ini.',
      recommendedService: null // Disarankan melalui tombol eksplisit di review staff
    },
    {
      id: 'ASM-2026-092',
      clientId: 'usr-client-03',
      clientName: 'Nadia Salsabila',
      type: 'Self-Check Burnout & Stres Kerja',
      submittedAt: '2026-09-15 14:20',
      status: 'COMPLETED',
      priority: 'MEDIUM',
      score: {
        exhaustion: 16,
        cynicism: 12,
        efficacy: 15
      },
      summary: 'Indikasi kelelahan emosional moderat karena beban lembur.',
      answers: [
        { q: 'Merasa terkuras secara emosional setelah bekerja', a: 'Sering' },
        { q: 'Kurang berminat dengan hobi akhir pekan', a: 'Kadang-kadang' }
      ],
      assignedStaff: 'Rian Hidayat',
      internalNotes: 'Klien direkomendasikan layanan Teman Cerita atau Psikolog Umum untuk work-life balance.',
      recommendedService: 'Psikolog Umum'
    }
  ],
  // Chat Module (1-to-1 conversation)
  chatConversations: [
    {
      id: 'CONV-01',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-1',
      counselorName: 'Sarah Amelia, M.Psi., Psikolog',
      serviceType: 'Psikolog Klinis',
      unreadClient: 1,
      unreadCounselor: 0,
      lastMessage: 'Halo Mbak Maya, sebelum sesi Jumat nanti, silakan luangkan 5 menit untuk relaksasi ya.',
      lastMessageTime: '15:20',
      messages: [
        {
          id: 'm1',
          senderId: 'usr-client-01',
          senderRole: 'CLIENT',
          text: 'Halo Bu Sarah, terima kasih sudah menerima jadwal saya.',
          time: '14:30',
          read: true
        },
        {
          id: 'm2',
          senderId: 'csl-1',
          senderRole: 'PSYCHOLOGIST',
          text: 'Sama-sama Mbak Maya. Selamat datang di Curhati. Nanti kita akan bahas apa yang terasa paling memberatkan ya.',
          time: '14:45',
          read: true
        },
        {
          id: 'm3',
          senderId: 'csl-1',
          senderRole: 'PSYCHOLOGIST',
          text: 'Halo Mbak Maya, sebelum sesi Jumat nanti, silakan luangkan 5 menit untuk relaksasi ya.',
          time: '15:20',
          read: false
        }
      ]
    },
    {
      id: 'CONV-02',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-3',
      counselorName: 'Budi Santoso',
      serviceType: 'Teman Cerita',
      unreadClient: 0,
      unreadCounselor: 0,
      lastMessage: 'Semangat terus ya Maya! Laporan insight sesi sudah saya upload juga.',
      lastMessageTime: 'Senin 20:20',
      messages: [
        {
          id: 'm4',
          senderId: 'csl-3',
          senderRole: 'TEMAN_CERITA',
          text: 'Terima kasih banyak sudah curhat dengan santai hari ini.',
          time: '20:18',
          read: true
        },
        {
          id: 'm5',
          senderId: 'csl-3',
          senderRole: 'TEMAN_CERITA',
          text: 'Semangat terus ya Maya! Laporan insight sesi sudah saya upload juga.',
          time: '20:20',
          read: true
        }
      ]
    }
  ],
  // Reports Module
  reports: [
    {
      id: 'REP-001',
      sessionId: 'SES-002',
      reservationId: 'RES-2026-079',
      clientId: 'usr-client-01',
      clientName: 'Maya Pratama',
      counselorId: 'csl-3',
      counselorName: 'Budi Santoso',
      serviceType: 'Teman Cerita',
      fileName: 'Curhati_Refleksi_MayaPratama_14Sep2026.pdf',
      fileUrl: '#mock-signed-url-rep-001',
      mimeType: 'application/pdf',
      fileSize: '420 KB',
      uploadedAt: '2026-09-14 20:30',
      sentAt: '2026-09-14 20:32',
      notesForClient: 'Catatan ringkas poin-poin refleksi dan latihan pernapasan mandiri saat menghadapi situasi stres di tempat kerja.'
    }
  ],
  // Finance Module
  invoices: [
    {
      id: 'INV-2026-081',
      reservationId: 'RES-2026-081',
      clientName: 'Maya Pratama',
      serviceName: 'Konseling Psikolog Klinis (60 Menit)',
      amount: 260000,
      paymentMethod: 'Midtrans QRIS / GoPay',
      status: 'PAID',
      paidAt: '2026-09-16 10:20',
      createdAt: '2026-09-16 10:15'
    },
    {
      id: 'INV-2026-079',
      reservationId: 'RES-2026-079',
      clientName: 'Maya Pratama',
      serviceName: 'Teman Cerita (45 Menit)',
      amount: 65000,
      paymentMethod: 'Xendit Virtual Account BCA',
      status: 'PAID',
      paidAt: '2026-09-13 14:05',
      createdAt: '2026-09-13 14:00'
    },
    {
      id: 'INV-2026-082',
      reservationId: 'RES-2026-082',
      clientName: 'Reza Fahlevi',
      serviceName: 'Psikolog Umum (60 Menit)',
      amount: 175000,
      paymentMethod: 'Stripe Credit Card',
      status: 'PAID',
      paidAt: '2026-09-15 08:35',
      createdAt: '2026-09-15 08:30'
    },
    {
      id: 'INV-2026-083',
      reservationId: 'RES-PENDING-99',
      clientName: 'Dina Kusuma',
      serviceName: 'Konseling Psikolog Klinis',
      amount: 260000,
      paymentMethod: 'Virtual Account Mandiri',
      status: 'PENDING',
      paidAt: null,
      createdAt: '2026-09-16 18:10'
    }
  ],
  // Audit Logs Module
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
      metadata: 'Paid IDR 260,000 via Midtrans'
    },
    {
      id: 'AUD-100',
      timestamp: '2026-09-16 10:15:02',
      userId: 'usr-client-01',
      userName: 'Maya Pratama (CLIENT)',
      action: 'CREATE_RESERVATION',
      resource: 'Reservation',
      resourceId: 'RES-2026-081',
      ipAddress: '180.252.164.21',
      metadata: 'Booked Sarah Amelia for 2026-09-18'
    },
    {
      id: 'AUD-099',
      timestamp: '2026-09-16 08:45:30',
      userId: 'usr-client-01',
      userName: 'Maya Pratama (CLIENT)',
      action: 'SUBMIT_ASSESSMENT',
      resource: 'Assessment',
      resourceId: 'ASM-2026-094',
      ipAddress: '180.252.164.21',
      metadata: 'Submitted DASS-21 Screening form'
    },
    {
      id: 'AUD-098',
      timestamp: '2026-09-14 20:32:00',
      userId: 'csl-3',
      userName: 'Budi Santoso (TEMAN_CERITA)',
      action: 'UPLOAD_REPORT',
      resource: 'Report',
      resourceId: 'REP-001',
      ipAddress: '103.28.112.45',
      metadata: 'Uploaded Curhati_Refleksi_MayaPratama_14Sep2026.pdf'
    },
    {
      id: 'AUD-097',
      timestamp: '2026-09-14 20:15:10',
      userId: 'csl-3',
      userName: 'Budi Santoso (TEMAN_CERITA)',
      action: 'COMPLETE_SESSION',
      resource: 'CounselingSession',
      resourceId: 'SES-002',
      ipAddress: '103.28.112.45',
      metadata: 'Completed session for Maya Pratama'
    },
    {
      id: 'AUD-096',
      timestamp: '2026-09-14 19:30:00',
      userId: 'csl-3',
      userName: 'Budi Santoso (TEMAN_CERITA)',
      action: 'START_SESSION',
      resource: 'CounselingSession',
      resourceId: 'SES-002',
      ipAddress: '103.28.112.45',
      metadata: 'Started session SES-002'
    }
  ]
};

// State Controller with LocalStorage Persistence
class CurhatiStore {
  constructor() {
    this.data = this.loadState();
    this.listeners = [];
  }

  loadState() {
    try {
      const saved = localStorage.getItem(CURHATI_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using initial mock data', e);
    }
    return JSON.parse(JSON.stringify(initialCurhatiState));
  }

  saveState() {
    try {
      localStorage.setItem(CURHATI_STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    this.notify();
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(initialCurhatiState));
    this.saveState();
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
    // Map avatar and name according to role
    if (roleId === 'CLIENT') {
      this.data.currentUser = {
        id: 'usr-client-01',
        name: 'Maya Pratama',
        email: 'maya.pratama@example.com',
        role: 'CLIENT',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        title: 'Klien Terverifikasi'
      };
    } else if (roleId === 'PSYCHOLOGIST') {
      this.data.currentUser = {
        id: 'csl-1',
        name: 'Sarah Amelia, M.Psi., Psikolog',
        email: 'sarah.amelia@curhati.id',
        role: 'PSYCHOLOGIST',
        avatar: 'https://images.unsplash.com/photo-1594824813576-9321e14945d8?w=150&auto=format&fit=crop&q=80',
        title: 'Psikolog Klinis Dewasa'
      };
    } else if (roleId === 'TEMAN_CERITA') {
      this.data.currentUser = {
        id: 'csl-3',
        name: 'Budi Santoso',
        email: 'budi.santoso@curhati.id',
        role: 'TEMAN_CERITA',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        title: 'Teman Cerita & Peer Counselor'
      };
    } else if (roleId === 'ASSESSMENT_STAFF') {
      this.data.currentUser = {
        id: 'staff-01',
        name: 'Rian Hidayat, S.Psi',
        email: 'rian.hidayat@curhati.id',
        role: 'ASSESSMENT_STAFF',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        title: 'Spesialis Asesmen & Skrining'
      };
    } else if (roleId === 'FINANCE') {
      this.data.currentUser = {
        id: 'fin-01',
        name: 'Siti Rahma, S.E',
        email: 'siti.rahma@curhati.id',
        role: 'FINANCE',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        title: 'Head of Finance & Billing'
      };
    } else if (roleId === 'ADMIN') {
      this.data.currentUser = {
        id: 'adm-01',
        name: 'Admin Utama (Super Admin)',
        email: 'superadmin@curhati.id',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        title: 'System Administrator'
      };
    } else if (roleId === 'OWNER') {
      this.data.currentUser = {
        id: 'own-01',
        name: 'Hendro Wijaya',
        email: 'hendro.wijaya@curhati.id',
        role: 'OWNER',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        title: 'Founder & Executive Board'
      };
    }

    this.addAuditLog('ROLE_SWITCH', 'UserSession', this.data.currentUser.id, `Switched view to ${roleId}`);
    this.saveState();
  }

  // Reservation Actions
  createReservation({ counselorId, date, timeSlot }) {
    const counselor = this.data.counselors.find(c => c.id === counselorId);
    if (!counselor) throw new Error('Konselor tidak ditemukan');

    // Prevent double booking on counselor + date + timeSlot
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
      paymentStatus: 'PAID', // Instant paid simulation
      status: 'CONFIRMED',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    this.data.reservations.unshift(newReservation);

    // Create counseling session automatically for confirmed reservation
    const sesId = `SES-${Math.floor(100 + Math.random() * 900)}`;
    const newSession = {
      id: sesId,
      reservationId: resId,
      clientId: newReservation.clientId,
      clientName: newReservation.clientName,
      counselorId: counselor.id,
      counselorName: counselor.name,
      serviceType: counselor.title,
      scheduledDate: date,
      timeSlot,
      status: 'SCHEDULED',
      privateNotes: '',
      hasReport: false,
      startedAt: null,
      endedAt: null
    };
    this.data.counselingSessions.unshift(newSession);

    // Create Invoice
    this.data.invoices.unshift({
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      reservationId: resId,
      clientName: newReservation.clientName,
      serviceName: `${counselor.title} (${timeSlot})`,
      amount: service.price,
      paymentMethod: 'Midtrans QRIS / GoPay (Auto Verified)',
      status: 'PAID',
      paidAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    });

    this.addAuditLog('CREATE_RESERVATION', 'Reservation', resId, `Booked ${counselor.name} for ${date} slot ${timeSlot}`);
    this.addAuditLog('PAYMENT', 'Payment', resId, `Simulated verified payment IDR ${service.price.toLocaleString('id-ID')}`);
    
    this.saveState();
    return newReservation;
  }

  cancelReservation(resId) {
    const res = this.data.reservations.find(r => r.id === resId);
    if (res) {
      res.status = 'CANCELLED';
      const session = this.data.counselingSessions.find(s => s.reservationId === resId);
      if (session) session.status = 'CANCELLED';
      this.addAuditLog('CANCEL_RESERVATION', 'Reservation', resId, `Reservation ${resId} cancelled`);
      this.saveState();
    }
  }

  // Counseling Session Actions (Counselor)
  startSession(sessionId) {
    const ses = this.data.counselingSessions.find(s => s.id === sessionId);
    if (ses) {
      ses.status = 'ONGOING';
      ses.startedAt = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      this.addAuditLog('START_SESSION', 'CounselingSession', sessionId, `Session started by counselor`);
      this.saveState();
    }
  }

  completeSession(sessionId, privateNotes) {
    const ses = this.data.counselingSessions.find(s => s.id === sessionId);
    if (ses) {
      ses.status = 'COMPLETED';
      ses.endedAt = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      if (privateNotes !== undefined) {
        ses.privateNotes = privateNotes;
      }
      // Update linked reservation
      const res = this.data.reservations.find(r => r.id === ses.reservationId);
      if (res) res.status = 'COMPLETED';

      this.addAuditLog('COMPLETE_SESSION', 'CounselingSession', sessionId, `Session marked completed. Confidential notes saved.`);
      this.saveState();
    }
  }

  saveSessionNotes(sessionId, notes) {
    const ses = this.data.counselingSessions.find(s => s.id === sessionId);
    if (ses) {
      ses.privateNotes = notes;
      this.saveState();
    }
  }

  // Report Upload & Delivery
  uploadReport({ sessionId, fileName, notesForClient }) {
    const session = this.data.counselingSessions.find(s => s.id === sessionId);
    if (!session) throw new Error('Sesi konseling tidak ditemukan');

    const repId = `REP-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newReport = {
      id: repId,
      sessionId: session.id,
      reservationId: session.reservationId,
      clientId: session.clientId,
      clientName: session.clientName,
      counselorId: session.counselorId,
      counselorName: session.counselorName,
      serviceType: session.serviceType,
      fileName: fileName || `Curhati_Report_${session.clientName.replace(/\s+/g, '')}_${session.id}.pdf`,
      fileUrl: `#secure-signed-storage/${repId}`,
      mimeType: 'application/pdf',
      fileSize: '512 KB',
      uploadedAt: now,
      sentAt: now,
      notesForClient: notesForClient || 'Laporan hasil konseling dan langkah tindak lanjut yang disepakati.'
    };

    this.data.reports.unshift(newReport);
    session.hasReport = true;
    session.reportId = repId;

    this.addAuditLog('UPLOAD_REPORT', 'Report', repId, `Uploaded ${newReport.fileName} for client ${session.clientName}`);
    this.addAuditLog('SEND_REPORT', 'Report', repId, `Report sent securely to client notification box`);

    this.saveState();
    return newReport;
  }

  // Assessment Actions (Strictly separated from counseling)
  submitAssessment({ type, answers, scoreSummary, hasCrisisAnswer }) {
    const asmId = `ASM-2026-${Math.floor(100 + Math.random() * 900)}`;
    const priority = hasCrisisAnswer ? 'HIGH' : (scoreSummary.totalScore > 15 ? 'MEDIUM' : 'LOW');

    const newAssessment = {
      id: asmId,
      clientId: this.data.currentUser.id,
      clientName: this.data.currentUser.name,
      type: type || 'Skrining Kesejahteraan Psikologis (DASS-21)',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'NEW',
      priority,
      score: scoreSummary,
      summary: hasCrisisAnswer 
        ? 'PERHATIAN: Terdapat indikasi pemikiran berisiko tinggi. Memerlukan penanganan krisis/evaluasi darurat.'
        : `Skor indikator: Kecemasan ${scoreSummary.anxiety || 0}, Stres ${scoreSummary.stress || 0}, Suasana Hati ${scoreSummary.depression || 0}.`,
      answers,
      assignedStaff: 'Rian Hidayat',
      internalNotes: '',
      recommendedService: null
    };

    this.data.assessments.unshift(newAssessment);
    this.addAuditLog('SUBMIT_ASSESSMENT', 'Assessment', asmId, `Client submitted assessment (${priority} priority)`);
    this.saveState();
    return newAssessment;
  }

  reviewAssessment(asmId, { internalNotes, status, recommendedService }) {
    const asm = this.data.assessments.find(a => a.id === asmId);
    if (asm) {
      if (internalNotes !== undefined) asm.internalNotes = internalNotes;
      if (status) asm.status = status;
      if (recommendedService !== undefined) asm.recommendedService = recommendedService;

      this.addAuditLog('REVIEW_ASSESSMENT', 'Assessment', asmId, `Staff updated status to ${status}. Service rec: ${recommendedService || 'None'}`);
      this.saveState();
    }
  }

  // Chat Actions
  sendMessage(conversationId, text) {
    const conv = this.data.chatConversations.find(c => c.id === conversationId);
    if (!conv) throw new Error('Percakapan tidak ditemukan');

    const senderRole = this.data.currentUser.role;
    const msgId = `m-${Date.now()}`;
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      id: msgId,
      senderId: this.data.currentUser.id,
      senderRole,
      text,
      time,
      read: false
    };

    conv.messages.push(newMsg);
    conv.lastMessage = text;
    conv.lastMessageTime = time;

    if (senderRole === 'CLIENT') {
      conv.unreadCounselor = (conv.unreadCounselor || 0) + 1;
    } else {
      conv.unreadClient = (conv.unreadClient || 0) + 1;
    }

    this.addAuditLog('SEND_CHAT_MESSAGE', 'Chat', conversationId, `Message sent by ${this.data.currentUser.name}`);
    this.saveState();
    return newMsg;
  }

  markChatAsRead(conversationId) {
    const conv = this.data.chatConversations.find(c => c.id === conversationId);
    if (!conv) return;

    const role = this.data.currentUser.role;
    if (role === 'CLIENT') {
      conv.unreadClient = 0;
    } else {
      conv.unreadCounselor = 0;
    }
    conv.messages.forEach(m => {
      if (m.senderRole !== role) m.read = true;
    });
    this.saveState();
  }

  // Audit Log helper
  addAuditLog(action, resource, resourceId, metadata = '') {
    const log = {
      id: `AUD-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: this.data.currentUser ? this.data.currentUser.id : 'system',
      userName: this.data.currentUser ? `${this.data.currentUser.name} (${this.data.currentUser.role})` : 'SYSTEM',
      action,
      resource,
      resourceId,
      ipAddress: '127.0.0.1',
      metadata
    };
    this.data.auditLogs.unshift(log);
    // Keep last 100 logs
    if (this.data.auditLogs.length > 100) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 100);
    }
  }
}

// Global Store Instance
window.curhatiStore = new CurhatiStore();
