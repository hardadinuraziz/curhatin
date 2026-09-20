/**
 * CURHATI - Fullstack System Blueprint Interactive Prototype
 * Application Controller & Dynamic UI Renderer
 */

(function () {
  'use strict';

  const store = window.curhatiStore;
  let currentActiveTab = 'overview';
  let activeChatConvId = 'CONV-01';

  // DOM Elements
  let roleSelectEl;
  let sidebarNavEl;
  let pageTitleEl;
  let pageDescEl;
  let topUserAvatarEl;
  let topUserNameEl;
  let topUserRoleEl;
  let viewportEl;
  let modalContainerEl;

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initElements();
    renderRoleOptions();
    bindEvents();
    renderView();

    // Listen to store updates
    store.subscribe(() => {
      renderRoleOptions();
      renderView();
    });
  });

  function initElements() {
    roleSelectEl = document.getElementById('roleSelector');
    sidebarNavEl = document.getElementById('sidebarNav');
    pageTitleEl = document.getElementById('pageTitle');
    pageDescEl = document.getElementById('pageDesc');
    topUserAvatarEl = document.getElementById('topUserAvatar');
    topUserNameEl = document.getElementById('topUserName');
    topUserRoleEl = document.getElementById('topUserRole');
    viewportEl = document.getElementById('contentViewport');
    modalContainerEl = document.getElementById('modalContainer');
  }

  function renderRoleOptions() {
    const state = store.data;
    if (!roleSelectEl) return;

    roleSelectEl.innerHTML = state.roles
      .map(
        r => `<option value="${r.id}" ${r.id === state.currentRole ? 'selected' : ''}>
          ${r.label}
        </option>`
      )
      .join('');

    if (topUserAvatarEl) topUserAvatarEl.src = state.currentUser.avatar;
    if (topUserNameEl) topUserNameEl.textContent = state.currentUser.name;
    if (topUserRoleEl) topUserRoleEl.textContent = state.currentUser.title || state.currentUser.role;
  }

  function bindEvents() {
    if (roleSelectEl) {
      roleSelectEl.addEventListener('change', e => {
        const newRole = e.target.value;
        store.setRole(newRole);
        currentActiveTab = 'overview';
        showToast(`Beralih ke Role: ${newRole}`, 'success');
      });
    }

    const resetBtn = document.getElementById('resetStateBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset seluruh data mock ke kondisi awal blueprint?')) {
          store.resetToDefault();
          showToast('Data prototipe telah di-reset ke default blueprint', 'success');
        }
      });
    }
  }

  // Define sidebar navigation per role according to Blueprint Section 23 & User Multi-Role Architecture
  function getNavigationForRole(role) {
    if (role.startsWith('csl-') || role === 'PSYCHOLOGIST' || role === 'TEMAN_CERITA') {
      const csl = store.data.counselors.find(c => c.id === role);
      const isPsych = csl ? csl.serviceType === 'PSIKOLOG_KLINIS' : role === 'PSYCHOLOGIST';
      return [
        {
          title: isPsych ? 'DASHBOARD PSIKOLOG KLINIS' : 'WORKSPACE TEMAN CERITA',
          items: [
            { id: 'overview', label: 'Overview & Status Piket', icon: 'layout-dashboard' },
            { id: 'sessions', label: 'Kelola Sesi Konseling', icon: 'users', badge: '1 Aktif' },
            { id: 'schedule', label: 'Jadwal Piket Saya', icon: 'calendar' }
          ]
        },
        {
          title: 'KOMUNIKASI & LAPORAN',
          items: [
            { id: 'chat', label: 'Chat Klien (Web Chat)', icon: 'message-circle', badge: '1' },
            { id: 'counselor-reports', label: 'Unggah Laporan Sesi', icon: 'upload-cloud' }
          ]
        }
      ];
    }

    if (role.startsWith('asm-') || role === 'ASSESSMENT_STAFF') {
      return [
        {
          title: 'TIM ASESMEN (10 ASESOR)',
          items: [
            { id: 'overview', label: 'Overview Asesmen', icon: 'layout-dashboard' },
            { id: 'assessment-queue', label: 'Antrean Submission', icon: 'inbox', badge: '1 Baru' },
            { id: 'completed-assessments', label: 'Selesai Direview', icon: 'check-circle' }
          ]
        }
      ];
    }

    switch (role) {
      case 'CLIENT':
        return [
          {
            title: 'PORTAL KLIEN (GMAIL LOGIN)',
            items: [
              { id: 'overview', label: 'Overview', icon: 'layout-dashboard' },
              { id: 'reservation', label: 'Pesan Konseling', icon: 'calendar-plus' },
              { id: 'my-reservations', label: 'Riwayat Reservasi', icon: 'calendar-check' }
            ]
          },
          {
            title: 'ASSESSMENT (INDEPENDEN)',
            items: [
              { id: 'assessment-form', label: 'Skrining Asesmen', icon: 'clipboard-list' },
              { id: 'my-assessments', label: 'Hasil Skrining Saya', icon: 'file-heart' }
            ]
          },
          {
            title: 'KOMUNIKASI & HASIL',
            items: [
              { id: 'chat', label: 'Chat Konselor & AI', icon: 'message-circle', badge: '1' },
              { id: 'reports', label: 'Laporan Sesi', icon: 'file-text' }
            ]
          }
        ];

      case 'COORDINATOR':
        return [
          {
            title: 'KOORDINATOR (AKSES MASTER)',
            items: [
              { id: 'overview', label: 'Dashboard Eksekutif', icon: 'trending-up' },
              { id: 'schedule-all', label: 'Jadwal Piket Konseling & Asesmen', icon: 'calendar-check' },
              { id: 'counselors-roster', label: '15 Akun Konselor', icon: 'users' },
              { id: 'assessments-roster', label: '10 Akun Asesor', icon: 'clipboard-list' }
            ]
          },
          {
            title: 'OPERASIONAL & AI',
            items: [
              { id: 'ai-config', label: 'Admin by AI (ShineBot)', icon: 'robot' },
              { id: 'transactions', label: 'Keuangan & Billing', icon: 'dollar-sign' },
              { id: 'audit-logs', label: 'Audit Trail Sistem', icon: 'shield' }
            ]
          }
        ];

      case 'ADMIN':
        return [
          {
            title: 'ADMIN OPERASIONAL (1 AKUN - 5 USER)',
            items: [
              { id: 'overview', label: 'Overview Sistem', icon: 'shield' },
              { id: 'schedule-all', label: 'Kontrol Jadwal & Status Online', icon: 'calendar-check' },
              { id: 'users', label: 'Kelola 15 Konselor & 10 Asesor', icon: 'users-cog' },
              { id: 'services', label: 'Kelola Layanan', icon: 'sliders' },
              { id: 'audit-logs', label: 'Audit Logs Keamanan', icon: 'activity' }
            ]
          }
        ];

      case 'AI_ADMIN':
        return [
          {
            title: 'ADMIN BY AI (SHINEBOT)',
            items: [
              { id: 'overview', label: 'Status & Auto-Reply AI', icon: 'robot' },
              { id: 'chat', label: 'Ruang Chat Realtime', icon: 'message-circle' }
            ]
          }
        ];

      case 'FINANCE':
        return [
          {
            title: 'KEUANGAN & BILLING (1 AKUN)',
            items: [
              { id: 'overview', label: 'Ringkasan Keuangan', icon: 'dollar-sign' },
              { id: 'transactions', label: 'Daftar Transaksi', icon: 'receipt' },
              { id: 'invoices', label: 'Tagihan & Invoices', icon: 'file-spreadsheet' }
            ]
          }
        ];

      case 'OWNER':
        return [
          {
            title: 'EXECUTIVE INTELLIGENCE',
            items: [
              { id: 'overview', label: 'Business Dashboard', icon: 'trending-up' },
              { id: 'owner-analytics', label: 'Analitik Layanan & Omzet', icon: 'pie-chart' }
            ]
          }
        ];

      default:
        return [];
    }
  }

  function renderSidebar() {
    const role = store.data.currentRole;
    const groups = getNavigationForRole(role);

    const iconMap = {
      'layout-dashboard': 'fas fa-th-large',
      'calendar-plus': 'fas fa-calendar-plus',
      'calendar-check': 'fas fa-calendar-check',
      'clipboard-list': 'fas fa-clipboard-list',
      'file-heart': 'fas fa-file-medical',
      'message-circle': 'fas fa-comments',
      'file-text': 'fas fa-file-alt',
      'users': 'fas fa-users',
      'calendar': 'fas fa-calendar-alt',
      'upload-cloud': 'fas fa-cloud-upload-alt',
      'heart-handshake': 'fas fa-handshake',
      'inbox': 'fas fa-inbox',
      'check-circle': 'fas fa-check-circle',
      'dollar-sign': 'fas fa-dollar-sign',
      'receipt': 'fas fa-receipt',
      'file-spreadsheet': 'fas fa-file-invoice-dollar',
      'shield': 'fas fa-shield-alt',
      'users-cog': 'fas fa-users-cog',
      'sliders': 'fas fa-sliders-h',
      'activity': 'fas fa-chart-line',
      'trending-up': 'fas fa-chart-line',
      'pie-chart': 'fas fa-chart-pie',
      'robot': 'fas fa-robot',
      'message-square': 'fas fa-comment-alt'
    };

    sidebarNavEl.innerHTML = groups
      .map(
        g => `
      <div class="nav-group">
        <div class="nav-group-title">${g.title}</div>
        ${g.items
          .map(
            item => `
          <div class="nav-link ${currentActiveTab === item.id ? 'active' : ''}" data-tab="${item.id}">
            <i class="${iconMap[item.icon] || 'fas fa-circle'}" data-lucide="${item.icon}"></i>
            <span>${item.label}</span>
            ${item.badge ? `<span class="nav-badge badge-count">${item.badge}</span>` : ''}
          </div>
        `
          )
          .join('')}
      </div>
    `
      )
      .join('');

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // Rebind nav click events
    sidebarNavEl.querySelectorAll('.nav-link').forEach(btn => {
      btn.addEventListener('click', () => {
        currentActiveTab = btn.getAttribute('data-tab');
        renderSidebar();
        renderMainContent();
      });
    });
  }

  function renderView() {
    renderSidebar();
    renderMainContent();
  }

  function renderMainContent() {
    const role = store.data.currentRole;
    const state = store.data;

    // Header Titles
    const titles = {
      CLIENT: { title: 'Portal Klien Curhati (Login Gmail/No HP)', desc: 'Akses reservasi konseling, skrining mandiri independen, dan sesi bimbingan psikologis.' },
      COORDINATOR: { title: 'Konsol Koordinator Layanan (Akses Penuh Master)', desc: 'Pemantauan komprehensif 15 konselor, 10 asesor, jadwal piket terintegrasi, dan performa Admin by AI.' },
      ADMIN: { title: 'Konsol Administrasi Bersama (1 Akun untuk 5 Staf)', desc: 'Pengaturan jadwal piket, status ketersediaan online, akun konselor, dan verifikasi reservasi klien.' },
      AI_ADMIN: { title: 'Admin by AI (ShineBot Auto-Responder)', desc: 'Respon otomatis pintar berbasis empati psikologis saat staf/konselor sedang sesi atau offline.' },
      FINANCE: { title: 'Dashboard Keuangan & Transaksi (1 Akun)', desc: 'Pemantauan omzet, rekonsiliasi gateway Midtrans/Xendit/Stripe, dan status invoice.' },
      ASSESSMENT_STAFF: { title: 'Pusat Review Asesmen (10 Tim Asesor)', desc: 'Pemeriksaan instrumen skrining mandiri, catatan internal asesor, dan rekomendasi layanan.' },
      OWNER: { title: 'Executive Business Overview', desc: 'Metrik agregat pertumbuhan, performa layanan, dan ringkasan finansial (Privasi Klinis Terproteksi).' }
    };

    let headerInfo = titles[role];
    if (!headerInfo) {
      if (role.startsWith('csl-')) {
        const csl = state.counselors.find(c => c.id === role);
        headerInfo = {
          title: `Workspace Pribadi: ${csl ? csl.name : 'Konselor'}`,
          desc: 'Kelola sesi konseling personal, chat langsung dengan klien via web, dan atur ketersediaan status online Anda.'
        };
      } else {
        headerInfo = { title: 'Curhati Dashboard', desc: '' };
      }
    }
    pageTitleEl.textContent = headerInfo.title;
    pageDescEl.textContent = headerInfo.desc;

    // Route views for all roles
    if (role.startsWith('csl-') || role === 'PSYCHOLOGIST' || role === 'TEMAN_CERITA') {
      renderCounselorView(currentActiveTab, role);
      return;
    }
    if (role.startsWith('asm-') || role === 'ASSESSMENT_STAFF') {
      renderAssessmentStaffView(currentActiveTab);
      return;
    }
    if (role === 'COORDINATOR') {
      renderCoordinatorView(currentActiveTab);
      return;
    }
    if (role === 'AI_ADMIN') {
      renderAiAdminView(currentActiveTab);
      return;
    }

    // Render tab router
    switch (role) {
      case 'CLIENT':
        renderClientView(currentActiveTab);
        break;
      case 'FINANCE':
        renderFinanceView(currentActiveTab);
        break;
      case 'ADMIN':
        renderAdminView(currentActiveTab);
        break;
      case 'OWNER':
        renderOwnerView(currentActiveTab);
        break;
      default:
        viewportEl.innerHTML = `<div class="p-6">Role tidak dikenali</div>`;
    }
  }

  /* ==========================================================================
     1. CLIENT VIEW (Reservation, Independent Assessment, Chat, Reports)
     ========================================================================== */
  function renderClientView(tab) {
    const state = store.data;

    if (tab === 'reservation') {
      renderReservationWizard();
      return;
    }

    if (tab === 'assessment-form') {
      renderAssessmentForm();
      return;
    }

    if (tab === 'chat') {
      renderChatUI();
      return;
    }

    if (tab === 'reports') {
      renderClientReports();
      return;
    }

    if (tab === 'my-reservations') {
      renderClientReservations();
      return;
    }

    if (tab === 'my-assessments') {
      renderClientAssessmentHistory();
      return;
    }

    // Default Overview
    const myReservations = state.reservations.filter(r => r.clientId === state.currentUser.id);
    const upcoming = myReservations.find(r => r.status === 'CONFIRMED' || r.status === 'PENDING');
    const myReports = state.reports.filter(r => r.clientId === state.currentUser.id);
    const myAssessments = state.assessments.filter(a => a.clientId === state.currentUser.id);

    viewportEl.innerHTML = `
      <!-- Ethics & Guidance Banner -->
      <div class="ethics-notice-banner">
        <div class="ethics-icon">💡</div>
        <div class="ethics-text">
          <h4>Prinsip Keamanan & Privasi Curhati</h4>
          <p>Layanan <strong>Konseling</strong> dan <strong>Asesmen</strong> berjalan pada alur independen. Hasil asesmen mandiri tidak otomatis dipublikasikan sebagai rekam medis tanpa persetujuan Anda.</p>
        </div>
      </div>

      <!-- Quick Action Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div>
            <div class="stat-label">Sesi Konseling Mendatang</div>
            <div class="stat-value" style="font-size: 1.25rem;">
              ${upcoming ? `${upcoming.serviceType}` : 'Belum Ada Sesi'}
            </div>
            <div class="stat-sub">
              ${upcoming ? `📅 ${upcoming.date} (${upcoming.timeSlot})` : 'Jadwalkan konseling pertama Anda'}
            </div>
          </div>
          <div class="stat-icon icon-teal">📅</div>
        </div>

        <div class="stat-card">
          <div>
            <div class="stat-label">Konselor Terpilih</div>
            <div class="stat-value" style="font-size: 1.25rem;">
              ${upcoming ? upcoming.counselorName.split(',')[0] : 'Pilih Konselor'}
            </div>
            <div class="stat-sub positive">
              ${upcoming ? 'Konseling Daring Siap' : '3 Kategori Layanan Tersedia'}
            </div>
          </div>
          <div class="stat-icon icon-indigo">👩‍⚕️</div>
        </div>

        <div class="stat-card">
          <div>
            <div class="stat-label">Laporan Sesi Tersedia</div>
            <div class="stat-value">${myReports.length}</div>
            <div class="stat-sub">Dokumen PDF Terenkripsi</div>
          </div>
          <div class="stat-icon icon-emerald">📄</div>
        </div>

        <div class="stat-card">
          <div>
            <div class="stat-label">Skrining Asesmen Mandiri</div>
            <div class="stat-value">${myAssessments.length}</div>
            <div class="stat-sub">Independen dari Sesi</div>
          </div>
          <div class="stat-icon icon-amber">📋</div>
        </div>
      </div>

      <!-- Active Session Alert Box if any -->
      ${
        upcoming
          ? `
        <div class="dashboard-card" style="border-left: 4px solid var(--primary);">
          <div class="card-header">
            <div>
              <h3>Konseling Anda Siap: ${upcoming.serviceType}</h3>
              <p>Jadwal: ${upcoming.date} • Waktu: ${upcoming.timeSlot} • Bersama ${upcoming.counselorName}</p>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.navigateTo('chat')">Buka Chat Konselor</button>
              <span class="badge badge-confirmed">TERKONFIRMASI</span>
            </div>
          </div>
        </div>
      `
          : ''
      }

      <!-- Main Action Tiles -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        <div class="dashboard-card" style="padding: 1.75rem; border-top: 4px solid var(--primary);">
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--slate-900);">Butuh Ruang Berbagi atau Bantuan Profesional?</h3>
          <p style="color: var(--slate-600); font-size: 0.875rem; margin-bottom: 1.25rem; line-height: 1.5;">
            Pilih antara <strong>Teman Cerita</strong> untuk berbagi rasa hangat sehari-hari, atau <strong>Psikolog Profesional</strong> (Umum/Klinis) untuk penanganan terstruktur.
          </p>
          <button class="btn btn-primary" onclick="window.curhatiApp.navigateTo('reservation')">
            Pesan Jadwal Konseling Sekarang →
          </button>
        </div>

        <div class="dashboard-card" style="padding: 1.75rem; border-top: 4px solid var(--secondary);">
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--slate-900);">Kenali Kondisi Diri Lewat Skrining Mandiri</h3>
          <p style="color: var(--slate-600); font-size: 0.875rem; margin-bottom: 1.25rem; line-height: 1.5;">
            Ikuti kuesioner kesejahteraan emosional secara privat. Asesmen ini tidak mendiagnosis dan tidak otomatis mendaftarkan konseling.
          </p>
          <button class="btn btn-secondary" onclick="window.curhatiApp.navigateTo('assessment-form')">
            Mulai Skrining Asesmen →
          </button>
        </div>
      </div>

      <!-- Recent Reservations Table -->
      <div class="dashboard-card">
        <div class="card-header">
          <div>
            <h3>Riwayat Reservasi Terkini</h3>
            <p>Jadwal reservasi konseling Anda di Curhati</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.navigateTo('my-reservations')">Lihat Semua</button>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID Reservasi</th>
                <th>Layanan & Konselor</th>
                <th>Tanggal & Waktu</th>
                <th>Biaya</th>
                <th>Status Pembayaran</th>
                <th>Status Sesi</th>
              </tr>
            </thead>
            <tbody>
              ${myReservations
                .map(
                  r => `
                <tr>
                  <td><strong>${r.id}</strong></td>
                  <td>
                    <div><strong>${r.serviceType}</strong></div>
                    <div style="font-size: 0.75rem; color: var(--slate-500);">${r.counselorName}</div>
                  </td>
                  <td>${r.date} <br><span style="font-size: 0.75rem; color: var(--slate-500);">${r.timeSlot}</span></td>
                  <td>IDR ${r.price.toLocaleString('id-ID')}</td>
                  <td><span class="badge badge-${r.paymentStatus.toLowerCase()}">${r.paymentStatus}</span></td>
                  <td><span class="badge badge-${r.status.toLowerCase()}">${r.status}</span></td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Reservation Wizard (Client Flow in Blueprint Section 6 & 9)
  function renderReservationWizard() {
    const state = store.data;
    let selectedService = state.services[2]; // Default Psikolog Klinis
    let selectedCounselor = state.counselors[0];
    let selectedSlot = selectedCounselor.availableSlots[0];
    let selectedDate = '2026-09-19';

    function updateWizardHTML() {
      viewportEl.innerHTML = `
        <div class="flex items-center justify-between" style="margin-bottom: 1.5rem;">
          <div>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--slate-900);">Pemesanan Sesi Konseling Curhati</h2>
            <p style="color: var(--slate-500); font-size: 0.875rem;">Alur reservasi mandiri dengan pencegahan double booking dan verifikasi pembayaran otomatis.</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.navigateTo('overview')">← Kembali ke Overview</button>
        </div>

        <!-- Step 1: Service Selection -->
        <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--slate-800);">1. Pilih Kategori Layanan</h3>
        <div class="service-cards-grid">
          ${state.services
            .map(
              s => `
            <div class="service-selection-card ${selectedService.id === s.id ? 'selected' : ''}" onclick="window.curhatiApp.selectService('${s.id}')">
              <div>
                <div class="service-icon-box" style="background: ${s.category === 'TEMAN_CERITA' ? 'var(--accent-amber-light)' : 'var(--primary-light)'}; color: ${s.category === 'TEMAN_CERITA' ? 'var(--accent-amber)' : 'var(--primary)'};">
                  ${s.category === 'TEMAN_CERITA' ? '🤝' : s.category === 'PSIKOLOG_UMUM' ? '🧠' : '🛡️'}
                </div>
                <h4 style="font-size: 1.125rem; font-weight: 700; color: var(--slate-900); margin-bottom: 0.5rem;">${s.name}</h4>
                <p style="font-size: 0.8125rem; color: var(--slate-600); line-height: 1.4;">${s.description}</p>
              </div>
              <div>
                <div class="service-price-tag">
                  IDR ${s.price.toLocaleString('id-ID')}
                  <span>/ ${s.durationMinutes} Menit</span>
                </div>
                <div style="margin-top: 0.75rem;">
                  <span class="badge ${selectedService.id === s.id ? 'badge-confirmed' : 'badge-new'}">
                    ${selectedService.id === s.id ? '✓ Dipilih' : 'Pilih Layanan'}
                  </span>
                </div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <!-- Step 2: Counselor Selection -->
        <h3 style="font-size: 1.125rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: var(--slate-800);">2. Pilih Konselor Tersedia</h3>
        <div class="counselors-grid">
          ${state.counselors
            .filter(c => c.serviceType === selectedService.category)
            .map(
              c => `
            <div class="counselor-card ${selectedCounselor.id === c.id ? 'selected' : ''}" onclick="window.curhatiApp.selectCounselor('${c.id}')">
              <img src="${c.avatar}" class="counselor-avatar-lg" alt="${c.name}">
              <div style="flex: 1;">
                <div class="flex items-center justify-between">
                  <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--slate-900);">${c.name}</h4>
                  <span style="font-size: 0.8125rem; font-weight: 700; color: #f59e0b;">★ ${c.rating}</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--slate-500); margin-bottom: 0.5rem;">${c.license}</div>
                <div class="flex flex-wrap gap-1" style="margin-bottom: 0.5rem;">
                  ${c.topics.map(t => `<span class="badge badge-new" style="font-size: 0.6875rem;">${t}</span>`).join('')}
                </div>
                <div style="font-size: 0.75rem; font-weight: 600; color: var(--primary);">
                  ${selectedCounselor.id === c.id ? '✓ Konselor Terpilih' : 'Klik untuk memilih'}
                </div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <!-- Step 3: Date & Slot Selection -->
        <div class="dashboard-card" style="margin-top: 2rem;">
          <div class="card-header">
            <h3>3. Pilih Tanggal & Slot Waktu Konseling</h3>
            <p>Jadwal terlindungi database transaction untuk mencegah double-booking</p>
          </div>
          <div class="card-body">
            <div style="display: grid; grid-template-columns: 240px 1fr; gap: 2rem;">
              <div>
                <label class="form-label">Pilih Tanggal</label>
                <input type="date" class="form-control" id="bookingDateInput" value="${selectedDate}" min="2026-09-17" max="2026-09-30">
              </div>
              <div>
                <label class="form-label">Slot Waktu Tersedia (WIB)</label>
                <div class="slot-pills">
                  ${selectedCounselor.availableSlots
                    .map(
                      slot => `
                    <div class="slot-pill ${selectedSlot === slot ? 'selected' : ''}" onclick="window.curhatiApp.selectSlot('${slot}')">
                      ${slot}
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </div>
            </div>

            <!-- Booking Summary & Payment Simulation -->
            <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--slate-200); display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-size: 0.875rem; color: var(--slate-500);">Total Pembayaran:</div>
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">
                  IDR ${selectedService.price.toLocaleString('id-ID')}
                </div>
                <div style="font-size: 0.75rem; color: var(--slate-400);">Simulasi Gateway: Midtrans / Xendit Webhook Verification</div>
              </div>
              <button class="btn btn-primary" style="padding: 0.75rem 1.75rem; font-size: 1rem;" onclick="window.curhatiApp.confirmBooking()">
                Konfirmasi & Bayar Konseling →
              </button>
            </div>
          </div>
        </div>
      `;

      // Date input listener
      const dateInp = document.getElementById('bookingDateInput');
      if (dateInp) {
        dateInp.addEventListener('change', e => {
          selectedDate = e.target.value;
        });
      }
    }

    // Expose helpers on window
    window.curhatiApp.selectService = serviceId => {
      selectedService = state.services.find(s => s.id === serviceId);
      const matchedCounselor = state.counselors.find(c => c.serviceType === selectedService.category);
      if (matchedCounselor) {
        selectedCounselor = matchedCounselor;
        selectedSlot = selectedCounselor.availableSlots[0];
      }
      updateWizardHTML();
    };

    window.curhatiApp.selectCounselor = counselorId => {
      selectedCounselor = state.counselors.find(c => c.id === counselorId);
      selectedSlot = selectedCounselor.availableSlots[0];
      updateWizardHTML();
    };

    window.curhatiApp.selectSlot = slot => {
      selectedSlot = slot;
      updateWizardHTML();
    };

    window.curhatiApp.confirmBooking = () => {
      try {
        const newRes = store.createReservation({
          counselorId: selectedCounselor.id,
          date: selectedDate,
          timeSlot: selectedSlot
        });
        showToast(`Reservasi ${newRes.id} Berhasil Dikonfirmasi! Sesi konseling telah dijadwalkan.`, 'success');
        currentActiveTab = 'overview';
        renderView();
      } catch (err) {
        showToast(err.message, 'danger');
      }
    };

    updateWizardHTML();
  }

  // Independent Assessment Module Form (Blueprint Section 7, 8, 12)
  function renderAssessmentForm() {
    viewportEl.innerHTML = `
      <div class="flex items-center justify-between" style="margin-bottom: 1.5rem;">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--slate-900);">Skrining Asesmen Kesejahteraan Emosional</h2>
          <p style="color: var(--slate-500); font-size: 0.875rem;">Modul asesmen independen. Hasil skrining tidak otomatis menjadi catatan sesi konseling.</p>
        </div>
        <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.navigateTo('overview')">← Kembali</button>
      </div>

      <!-- Ethical Disclaimer Alert (Blueprint Section 8) -->
      <div class="ethics-notice-banner">
        <div class="ethics-icon">⚖️</div>
        <div class="ethics-text">
          <h4>Pedoman Etis & Batasan Skrining:</h4>
          <p>
            Sistem Curhati <strong>TIDAK MENDIAGNOSIS</strong> gangguan kejiwaan/psikologis. Hasil ini merupakan <em>initial screening</em> dan indikator risiko awal untuk refleksi pribadi Anda. Penilaian resmi memerlukan tinjauan profesional berlisensi.
          </p>
        </div>
      </div>

      <!-- Crisis Safety Protocol Banner -->
      <div class="crisis-banner">
        <div>
          <h4>🆘 Saluran Bantuan Darurat (Crisis Helpline)</h4>
          <p>Jika Anda atau orang terdekat sedang berada dalam krisis mendesak atau memiliki dorongan menyakiti diri, hubungi segera <strong>Hotline Sejiwa Kemenkes (119 ext 8)</strong> atau UGD RS terdekat.</p>
        </div>
        <a href="tel:119" class="crisis-hotline-btn">
          <span>📞 Hubungi 119 ext 8</span>
        </a>
      </div>

      <div class="dashboard-card">
        <div class="card-header">
          <h3>Kuesioner Indikator Refleksi Diri (DASS-21 / Burnout Check)</h3>
          <p>Pilihlah respon yang paling menggambarkan kondisi Anda dalam 2 minggu terakhir</p>
        </div>
        <div class="card-body">
          <form id="assessmentForm" onsubmit="window.curhatiApp.submitAssessmentForm(event)">
            
            <div class="form-group" style="padding-bottom: 1.25rem; border-bottom: 1px solid var(--slate-100);">
              <label class="form-label" style="font-size: 0.9375rem;">1. Merasa sulit untuk menenangkan diri dan mudah gelisah</label>
              <div class="flex gap-3 flex-wrap">
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q1" value="0" required> Tidak pernah
                </label>
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q1" value="1"> Kadang-kadang
                </label>
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q1" value="2"> Sering
                </label>
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q1" value="3"> Hampir selalu
                </label>
              </div>
            </div>

            <div class="form-group" style="padding-bottom: 1.25rem; border-bottom: 1px solid var(--slate-100);">
              <label class="form-label" style="font-size: 0.9375rem;">2. Mengalami kekhawatiran berlebih terhadap hal-hal yang belum tentu terjadi</label>
              <div class="flex gap-3 flex-wrap">
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q2" value="0" required> Tidak pernah
                </label>
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q2" value="1"> Kadang-kadang
                </label>
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q2" value="2"> Sering
                </label>
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q2" value="3"> Hampir selalu
                </label>
              </div>
            </div>

            <div class="form-group" style="padding-bottom: 1.25rem; border-bottom: 1px solid var(--slate-100);">
              <label class="form-label" style="font-size: 0.9375rem;">3. Merasa terkuras energinya dan kehilangan antusiasme dalam rutinitas kerja/kuliah</label>
              <div class="flex gap-3 flex-wrap">
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q3" value="0" required> Tidak pernah
                </label>
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q3" value="1"> Kadang-kadang
                </label>
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q3" value="2"> Sering
                </label>
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q3" value="3"> Hampir selalu
                </label>
              </div>
            </div>

            <div class="form-group" style="padding-bottom: 1.25rem;">
              <label class="form-label" style="font-size: 0.9375rem; color: var(--crisis-rose);">4. Pernah terpikir untuk menyakiti diri sendiri dalam 1 bulan terakhir</label>
              <div class="flex gap-3 flex-wrap">
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q4" value="0" required checked> Tidak pernah
                </label>
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q4" value="1"> Pernah terlintas sekilas
                </label>
                <label class="inline-flex items-center gap-2" style="font-size: 0.875rem;">
                  <input type="radio" name="q4" value="2"> Cukup sering
                </label>
              </div>
            </div>

            <div class="flex items-center justify-between" style="padding-top: 1.5rem; border-top: 1px solid var(--slate-100);">
              <p style="font-size: 0.8125rem; color: var(--slate-500);">
                Submisi akan diteruskan ke <strong>Assessment Staff Dashboard</strong> untuk evaluasi independen.
              </p>
              <button type="submit" class="btn btn-secondary" style="padding: 0.75rem 1.5rem;">
                Kirim Skrining Asesmen →
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    window.curhatiApp.submitAssessmentForm = e => {
      e.preventDefault();
      const form = e.target;
      const q1 = parseInt(form.q1.value, 10);
      const q2 = parseInt(form.q2.value, 10);
      const q3 = parseInt(form.q3.value, 10);
      const q4 = parseInt(form.q4.value, 10);

      const hasCrisis = q4 > 0;
      const totalScore = q1 + q2 + q3;

      const newAsm = store.submitAssessment({
        type: 'Skrining Kesejahteraan Psikologis (DASS-21 Mandiri)',
        hasCrisisAnswer: hasCrisis,
        scoreSummary: {
          stress: q1 * 4,
          anxiety: q2 * 4,
          depression: q3 * 4,
          totalScore
        },
        answers: [
          { q: 'Merasa sulit untuk menenangkan diri dan mudah gelisah', a: q1 === 0 ? 'Tidak pernah' : q1 === 1 ? 'Kadang-kadang' : q1 === 2 ? 'Sering' : 'Hampir selalu' },
          { q: 'Mengalami kekhawatiran berlebih', a: q2 === 0 ? 'Tidak pernah' : q2 === 1 ? 'Kadang-kadang' : q2 === 2 ? 'Sering' : 'Hampir selalu' },
          { q: 'Merasa terkuras energinya dan burnout', a: q3 === 0 ? 'Tidak pernah' : q3 === 1 ? 'Kadang-kadang' : q3 === 2 ? 'Sering' : 'Hampir selalu' },
          { q: 'Pernah terpikir menyakiti diri sendiri', a: q4 === 0 ? 'Tidak pernah' : 'Pernah terlintas' }
        ]
      });

      showToast(`Skrining ${newAsm.id} berhasil dikirim ke tim Asesmen!`, 'success');
      currentActiveTab = 'my-assessments';
      renderView();
    };
  }

  function renderClientAssessmentHistory() {
    const state = store.data;
    const myAssessments = state.assessments.filter(a => a.clientId === state.currentUser.id);

    viewportEl.innerHTML = `
      <div class="flex items-center justify-between" style="margin-bottom: 1.5rem;">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--slate-900);">Riwayat Skrining Asesmen Saya</h2>
          <p style="color: var(--slate-500); font-size: 0.875rem;">Status review asesmen oleh staf profesional</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.curhatiApp.navigateTo('assessment-form')">+ Isi Skrining Baru</button>
      </div>

      <div class="dashboard-card">
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID Asesmen</th>
                <th>Jenis Skrining</th>
                <th>Waktu Kirim</th>
                <th>Indikator Risiko</th>
                <th>Status Review Staf</th>
                <th>Rekomendasi Layanan</th>
              </tr>
            </thead>
            <tbody>
              ${myAssessments
                .map(
                  a => `
                <tr>
                  <td><strong>${a.id}</strong></td>
                  <td>${a.type}</td>
                  <td>${a.submittedAt}</td>
                  <td><span class="badge badge-${a.priority.toLowerCase()}">${a.priority} RISK</span></td>
                  <td><span class="badge badge-${a.status.toLowerCase()}">${a.status}</span></td>
                  <td>
                    ${
                      a.recommendedService
                        ? `<div class="flex items-center gap-2">
                            <span class="badge badge-paid">${a.recommendedService}</span>
                            <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.navigateTo('reservation')">Pesan Sekarang</button>
                          </div>`
                        : '<span style="color: var(--slate-400); font-size: 0.8125rem;">Menunggu Review</span>'
                    }
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderClientReports() {
    const state = store.data;
    const myReports = state.reports.filter(r => r.clientId === state.currentUser.id);

    viewportEl.innerHTML = `
      <div class="flex items-center justify-between" style="margin-bottom: 1.5rem;">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--slate-900);">Dokumen & Laporan Konseling</h2>
          <p style="color: var(--slate-500); font-size: 0.875rem;">File laporan terenkripsi yang dikirimkan konselor setelah sesi selesai.</p>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID Laporan</th>
                <th>Nama File</th>
                <th>Konselor Pengirim</th>
                <th>Ukuran</th>
                <th>Tanggal Terbit</th>
                <th>Aksi Unduh</th>
              </tr>
            </thead>
            <tbody>
              ${
                myReports.length > 0
                  ? myReports
                      .map(
                        rep => `
                  <tr>
                    <td><strong>${rep.id}</strong></td>
                    <td>
                      <div class="flex items-center gap-2">
                        <span style="font-size: 1.25rem;">📄</span>
                        <div>
                          <strong>${rep.fileName}</strong>
                          <div style="font-size: 0.75rem; color: var(--slate-500);">${rep.notesForClient}</div>
                        </div>
                      </div>
                    </td>
                    <td>${rep.counselorName}</td>
                    <td>${rep.fileSize}</td>
                    <td>${rep.sentAt}</td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="window.curhatiApp.downloadReport('${rep.id}')">
                        📥 Unduh PDF
                      </button>
                    </td>
                  </tr>
                `
                      )
                      .join('')
                  : `<tr><td colspan="6" style="text-align: center; color: var(--slate-400); padding: 2rem;">Belum ada laporan yang dikirimkan konselor. Laporan dibuat setelah sesi selesai.</td></tr>`
              }
            </tbody>
          </table>
        </div>
      </div>
    `;

    window.curhatiApp.downloadReport = repId => {
      const rep = state.reports.find(r => r.id === repId);
      store.addAuditLog('DOWNLOAD_REPORT', 'Report', repId, `Downloaded signed document: ${rep ? rep.fileName : repId}`);
      showToast(`Mengunduh berkas aman: ${rep.fileName} via Temporary Signed URL`, 'success');
    };
  }

  function renderClientReservations() {
    const state = store.data;
    const myReservations = state.reservations.filter(r => r.clientId === state.currentUser.id);

    viewportEl.innerHTML = `
      <div class="flex items-center justify-between" style="margin-bottom: 1.5rem;">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--slate-900);">Semua Reservasi Konseling</h2>
          <p style="color: var(--slate-500); font-size: 0.875rem;">Kelola pemesanan, jadwal konsultasi, dan pembatalan.</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.curhatiApp.navigateTo('reservation')">+ Pesan Jadwal Baru</button>
      </div>

      <div class="dashboard-card">
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Konselor</th>
                <th>Kategori</th>
                <th>Jadwal</th>
                <th>Harga</th>
                <th>Status Pembayaran</th>
                <th>Status Sesi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${myReservations
                .map(
                  r => `
                <tr>
                  <td><strong>${r.id}</strong></td>
                  <td>${r.counselorName}</td>
                  <td>${r.serviceType}</td>
                  <td>${r.date} <br><span style="font-size: 0.75rem; color: var(--slate-500);">${r.timeSlot}</span></td>
                  <td>IDR ${r.price.toLocaleString('id-ID')}</td>
                  <td><span class="badge badge-${r.paymentStatus.toLowerCase()}">${r.paymentStatus}</span></td>
                  <td><span class="badge badge-${r.status.toLowerCase()}">${r.status}</span></td>
                  <td>
                    ${
                      r.status === 'CONFIRMED'
                        ? `<button class="btn btn-danger btn-sm" onclick="window.curhatiApp.cancelBooking('${r.id}')">Batalkan</button>`
                        : '<span style="color: var(--slate-400); font-size: 0.75rem;">-</span>'
                    }
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    window.curhatiApp.cancelBooking = resId => {
      if (confirm(`Yakin ingin membatalkan reservasi ${resId}?`)) {
        store.cancelReservation(resId);
        showToast(`Reservasi ${resId} telah dibatalkan`, 'warning');
        renderView();
      }
    };
  }

  /* ==========================================================================
     2. COUNSELOR VIEW (Psychologist & Teman Cerita)
     ========================================================================== */
  function renderCounselorView(tab, role) {
    const state = store.data;
    let currentCounselor = null;
    if (state.currentUser && state.currentUser.id && state.currentUser.id.startsWith('csl-')) {
      currentCounselor = state.counselors.find(c => c.id === state.currentUser.id);
    }
    if (!currentCounselor && typeof role === 'string' && role.startsWith('csl-')) {
      currentCounselor = state.counselors.find(c => c.id === role);
    }
    if (!currentCounselor) {
      currentCounselor = state.counselors.find(c => (role === 'PSYCHOLOGIST' ? c.serviceType === 'PSIKOLOG_KLINIS' : c.serviceType === 'TEMAN_CERITA')) || state.counselors[0];
    }
    const mySessions = state.counselingSessions.filter(s => s.counselorId === currentCounselor.id);

    if (tab === 'chat') {
      renderChatUI();
      return;
    }

    if (tab === 'counselor-reports') {
      renderCounselorReportUpload(mySessions);
      return;
    }

    if (tab === 'schedule') {
      if (window.counselorSchedule) {
        window.counselorSchedule.openScheduleModal(currentCounselor.id);
      }
    }

    const liveStatus = window.counselorSchedule ? window.counselorSchedule.getCounselorLiveStatus(currentCounselor.id) : { status: 'offline', text: 'Offline' };
    const currentOverride = window.counselorSchedule ? window.counselorSchedule.getManualOverride(currentCounselor.id) : 'auto';

    // Sessions Tab / Overview Tab
    viewportEl.innerHTML = `
      <!-- Live Status & Shift Control Banner -->
      <div class="dashboard-card" style="margin-bottom: 1.5rem; background: linear-gradient(135deg, #f8fafc, #f1f5f9); border: 1px solid #cbd5e1;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div>
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #475569; letter-spacing: 0.05em;">
              Status Ketersediaan Anda di Web Publik
            </div>
            <h3 style="margin: 0.25rem 0 0; font-size: 1.125rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 0.5rem;">
              <span>${currentCounselor.name}</span>
              <span class="badge ${liveStatus.status === 'online' ? 'badge-completed' : liveStatus.status === 'session' ? 'badge-waiting' : 'badge-cancelled'}" style="font-size: 0.75rem;">
                ${liveStatus.status === 'online' ? '● ' : liveStatus.status === 'session' ? '⏳ ' : '○ '}${liveStatus.text}
              </span>
            </h3>
            <p style="margin: 0.25rem 0 0; font-size: 0.8125rem; color: #64748b;">
              Status ini mengontrol label pada kartu profil Anda di beranda utama untuk klien. Mode aktif saat ini: <strong>${currentOverride === 'auto' ? 'Otomatis Sesuai Jadwal Piket Excel' : 'Manual Override (' + currentOverride.toUpperCase() + ')'}</strong>.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn btn-sm ${currentOverride === 'auto' ? 'btn-primary' : 'btn-outline'}" onclick="window.curhatiApp.setOverrideStatus('${currentCounselor.id}', 'auto')">
              🔄 Ikuti Jadwal Piket
            </button>
            <button class="btn btn-sm ${currentOverride === 'online' ? 'btn-primary' : 'btn-outline'}" style="${currentOverride === 'online' ? '' : 'color: #059669; border-color: #10b981;'}" onclick="window.curhatiApp.setOverrideStatus('${currentCounselor.id}', 'online')">
              ● Online Sekarang
            </button>
            <button class="btn btn-sm ${currentOverride === 'session' ? 'btn-primary' : 'btn-outline'}" style="${currentOverride === 'session' ? '' : 'color: #d97706; border-color: #f59e0b;'}" onclick="window.curhatiApp.setOverrideStatus('${currentCounselor.id}', 'session')">
              ⏳ Sedang Sesi
            </button>
            <button class="btn btn-sm ${currentOverride === 'offline' ? 'btn-primary' : 'btn-outline'}" style="${currentOverride === 'offline' ? '' : 'color: #ef4444; border-color: #ef4444;'}" onclick="window.curhatiApp.setOverrideStatus('${currentCounselor.id}', 'offline')">
              ○ Offline
            </button>
            <button class="btn btn-sm btn-outline" style="color: #4f46e5; border-color: #6366f1;" onclick="if(window.counselorSchedule) window.counselorSchedule.openScheduleModal('${currentCounselor.id}')">
              📅 Buka Piket Mingguan
            </button>
          </div>
        </div>
      </div>

      <!-- Ethics / Clinical Notice -->
      <div class="ethics-notice-banner" style="border-color: #c7d2fe; background: #eef2ff;">
        <div class="ethics-icon">🔒</div>
        <div class="ethics-text">
          <h4 style="color: #312e81;">Ruang Rekam Klinis Terproteksi (Least-Privilege)</h4>
          <p style="color: #4338ca;">Catatan internal (*Private Clinical Notes*) hanya dapat diakses oleh Anda sebagai konselor yang bertugas. Catatan ini tidak dapat dilihat oleh Client maupun Executive/Owner demi menjaga kerahasiaan terapeutik.</p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div>
            <div class="stat-label">Total Sesi Terjadwal</div>
            <div class="stat-value">${mySessions.length}</div>
            <div class="stat-sub positive">Aktif Minggu Ini</div>
          </div>
          <div class="stat-icon icon-indigo">👥</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Sesi Menunggu Laporan</div>
            <div class="stat-value">${mySessions.filter(s => s.status === 'COMPLETED' && !s.hasReport).length}</div>
            <div class="stat-sub">Harap kirimkan laporan</div>
          </div>
          <div class="stat-icon icon-amber">⏳</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Sesi Selesai</div>
            <div class="stat-value">${mySessions.filter(s => s.status === 'COMPLETED').length}</div>
            <div class="stat-sub positive">Tuntas Konseling</div>
          </div>
          <div class="stat-icon icon-emerald">✅</div>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="card-header">
          <div>
            <h3>Daftar Sesi Konseling & Tindakan Konselor</h3>
            <p>Mulai sesi, simpan catatan klinis terenkripsi, selesaikan sesi, dan upload laporan.</p>
          </div>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID Sesi</th>
                <th>Nama Klien</th>
                <th>Jadwal Sesi</th>
                <th>Status</th>
                <th>Catatan Rahasia Konselor</th>
                <th>Laporan</th>
                <th>Aksi Konselor</th>
              </tr>
            </thead>
            <tbody>
              ${mySessions
                .map(
                  s => `
                <tr>
                  <td><strong>${s.id}</strong></td>
                  <td>
                    <strong>${s.clientName}</strong>
                    <div style="font-size: 0.75rem; color: var(--slate-500);">${s.serviceType}</div>
                  </td>
                  <td>${s.scheduledDate} <br><span style="font-size: 0.75rem; color: var(--slate-500);">${s.timeSlot}</span></td>
                  <td><span class="badge badge-${s.status.toLowerCase()}">${s.status}</span></td>
                  <td style="max-width: 250px;">
                    <div style="font-size: 0.8125rem; color: var(--slate-700); font-style: italic;">
                      ${s.privateNotes || '<span style="color: var(--slate-400);">Belum ada catatan internal</span>'}
                    </div>
                  </td>
                  <td>
                    ${
                      s.hasReport
                        ? `<span class="badge badge-paid">✓ Terkirim</span>`
                        : s.status === 'COMPLETED'
                        ? `<button class="btn btn-outline btn-sm" onclick="window.curhatiApp.openUploadReportModal('${s.id}')">Upload Laporan</button>`
                        : `<span style="color: var(--slate-400); font-size: 0.75rem;">Selesaikan sesi dahulu</span>`
                    }
                  </td>
                  <td>
                    <div class="flex gap-2">
                      ${
                        s.status === 'SCHEDULED'
                          ? `<button class="btn btn-primary btn-sm" onclick="window.curhatiApp.startCounselingSession('${s.id}')">▶ Mulai Sesi</button>`
                          : s.status === 'ONGOING'
                          ? `<button class="btn btn-success btn-sm" onclick="window.curhatiApp.openCompleteSessionModal('${s.id}')">✓ Selesaikan Sesi</button>`
                          : `<button class="btn btn-outline btn-sm" onclick="window.curhatiApp.openNotesModal('${s.id}')">Edit Catatan</button>`
                      }
                      <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.navigateTo('chat')">💬 Chat</button>
                    </div>
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Counselor Action Handlers
    window.curhatiApp.startCounselingSession = sessionId => {
      store.startSession(sessionId);
      showToast(`Sesi ${sessionId} resmi dimulai! Status sekarang ONGOING.`, 'success');
      renderView();
    };

    window.curhatiApp.openCompleteSessionModal = sessionId => {
      const session = mySessions.find(s => s.id === sessionId);
      modalContainerEl.innerHTML = `
        <div class="modal-backdrop">
          <div class="modal-dialog">
            <div class="modal-header">
              <h3 style="font-size: 1.125rem; font-weight: 700;">Selesaikan Sesi Konseling: ${session.id}</h3>
              <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.closeModal()">✕</button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Klien: ${session.clientName} (${session.serviceType})</label>
                <p style="font-size: 0.8125rem; color: var(--slate-500); margin-bottom: 1rem;">
                  Masukkan ringkasan evaluasi klinis/refleksi internal. Catatan ini bersifat rahasia dan tersimpan pada modul konseling terenkripsi.
                </p>
                <textarea id="sessionCompleteNotes" class="form-control" rows="4" placeholder="Tuliskan catatan kemajuan klien, rekomendasi latihan mandiri, dan observasi perilaku...">${session.privateNotes || ''}</textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-outline" onclick="window.curhatiApp.closeModal()">Batal</button>
              <button class="btn btn-success" onclick="window.curhatiApp.saveCompleteSession('${session.id}')">Simpan & Selesaikan Sesi</button>
            </div>
          </div>
        </div>
      `;
    };

    window.curhatiApp.saveCompleteSession = sessionId => {
      const notes = document.getElementById('sessionCompleteNotes').value;
      store.completeSession(sessionId, notes);
      window.curhatiApp.closeModal();
      showToast(`Sesi ${sessionId} berhasil diselesaikan. Anda dapat mengunggah laporan untuk klien sekarang.`, 'success');
      renderView();
    };

    window.curhatiApp.openNotesModal = sessionId => {
      const session = mySessions.find(s => s.id === sessionId);
      modalContainerEl.innerHTML = `
        <div class="modal-backdrop">
          <div class="modal-dialog">
            <div class="modal-header">
              <h3 style="font-size: 1.125rem; font-weight: 700;">Catatan Rahasia Konselor: ${session.id}</h3>
              <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.closeModal()">✕</button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Private Clinical Notes</label>
                <textarea id="sessionEditNotes" class="form-control" rows="5">${session.privateNotes || ''}</textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-outline" onclick="window.curhatiApp.closeModal()">Tutup</button>
              <button class="btn btn-primary" onclick="window.curhatiApp.saveEditedNotes('${session.id}')">Simpan Perubahan</button>
            </div>
          </div>
        </div>
      `;
    };

    window.curhatiApp.saveEditedNotes = sessionId => {
      const notes = document.getElementById('sessionEditNotes').value;
      store.saveSessionNotes(sessionId, notes);
      window.curhatiApp.closeModal();
      showToast(`Catatan sesi ${sessionId} berhasil diperbarui.`, 'success');
      renderView();
    };

    window.curhatiApp.openUploadReportModal = sessionId => {
      const session = mySessions.find(s => s.id === sessionId);
      modalContainerEl.innerHTML = `
        <div class="modal-backdrop">
          <div class="modal-dialog">
            <div class="modal-header">
              <h3 style="font-size: 1.125rem; font-weight: 700;">Upload Laporan Konseling</h3>
              <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.closeModal()">✕</button>
            </div>
            <div class="modal-body">
              <p style="font-size: 0.8125rem; color: var(--slate-600); margin-bottom: 1rem;">
                Kirimkan berkas hasil evaluasi untuk <strong>${session.clientName}</strong>. Berkas akan disimpan pada secure object storage dan hanya dapat diunduh klien melalui temporary signed URL.
              </p>
              <div class="form-group">
                <label class="form-label">Nama Dokumen Laporan (PDF / DOCX)</label>
                <input type="text" id="reportFileName" class="form-control" value="Curhati_Hasil_Konseling_${session.clientName.replace(/\s+/g, '')}_${session.id}.pdf">
              </div>
              <div class="form-group">
                <label class="form-label">Pesan / Catatan Tindak Lanjut untuk Klien</label>
                <textarea id="reportClientNotes" class="form-control" rows="3" placeholder="Contoh: Terima kasih atas keterbukaan Anda. Silakan pelajari poin refleksi dan latihan grounding di halaman 2."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-outline" onclick="window.curhatiApp.closeModal()">Batal</button>
              <button class="btn btn-primary" onclick="window.curhatiApp.submitReportUpload('${session.id}')">Unggah & Kirim ke Klien</button>
            </div>
          </div>
        </div>
      `;
    };

    window.curhatiApp.submitReportUpload = sessionId => {
      const fileName = document.getElementById('reportFileName').value;
      const notes = document.getElementById('reportClientNotes').value;

      store.uploadReport({
        sessionId,
        fileName,
        notesForClient: notes
      });

      window.curhatiApp.closeModal();
      showToast(`Laporan ${fileName} berhasil diunggah dan dikirim ke klien!`, 'success');
      renderView();
    };
  }

  function renderCounselorReportUpload(mySessions) {
    const state = store.data;
    const completedWithoutReport = mySessions.filter(s => s.status === 'COMPLETED' && !s.hasReport);

    viewportEl.innerHTML = `
      <div class="flex items-center justify-between" style="margin-bottom: 1.5rem;">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--slate-900);">Manajemen Laporan Pasien</h2>
          <p style="color: var(--slate-500); font-size: 0.875rem;">Unggah dokumen hasil konseling resmi untuk klien.</p>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="card-header">
          <h3>Sesi Menunggu Laporan (${completedWithoutReport.length})</h3>
        </div>
        <div class="card-body">
          ${
            completedWithoutReport.length > 0
              ? completedWithoutReport
                  .map(
                    s => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border: 1px solid var(--slate-200); border-radius: var(--radius-md); margin-bottom: 0.75rem;">
                  <div>
                    <strong>${s.clientName}</strong> (${s.serviceType})
                    <div style="font-size: 0.75rem; color: var(--slate-500);">Sesi selesai pada: ${s.scheduledDate} (${s.timeSlot})</div>
                  </div>
                  <button class="btn btn-primary btn-sm" onclick="window.curhatiApp.openUploadReportModal('${s.id}')">Upload Laporan Sekarang</button>
                </div>
              `
                  )
                  .join('')
              : '<p style="color: var(--slate-500); font-size: 0.875rem;">Semua sesi yang selesai telah memiliki laporan.</p>'
          }
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     3. ASSESSMENT STAFF VIEW (Strictly Independent from Counseling)
     ========================================================================== */
  function renderAssessmentStaffView(tab) {
    const state = store.data;

    viewportEl.innerHTML = `
      <!-- Independence Reminder -->
      <div class="ethics-notice-banner">
        <div class="ethics-icon">📑</div>
        <div class="ethics-text">
          <h4>Aturan Bisnis Kritis: Pemisahan Modul Asesmen & Konseling</h4>
          <p>
            Asesmen berjalan independen. <strong>JANGAN PERNAH</strong> membuat sesi konseling secara otomatis dari hasil asesmen. Jika klien membutuhkan bantuan lebih lanjut, berikan <strong>Rekomendasi Layanan</strong> secara eksplisit pada hasil telaah.
          </p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div>
            <div class="stat-label">Submisi Baru</div>
            <div class="stat-value">${state.assessments.filter(a => a.status === 'NEW').length}</div>
            <div class="stat-sub positive">Perlu Review</div>
          </div>
          <div class="stat-icon icon-rose">📥</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Dalam Proses Telaah</div>
            <div class="stat-value">${state.assessments.filter(a => a.status === 'IN_PROGRESS').length}</div>
            <div class="stat-sub">In Progress</div>
          </div>
          <div class="stat-icon icon-amber">⚙️</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Prioritas Tinggi (High Risk)</div>
            <div class="stat-value">${state.assessments.filter(a => a.priority === 'HIGH').length}</div>
            <div class="stat-sub" style="color: var(--danger);">Perhatian Segera</div>
          </div>
          <div class="stat-icon icon-rose">⚠️</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Selesai Direview</div>
            <div class="stat-value">${state.assessments.filter(a => a.status === 'COMPLETED').length}</div>
            <div class="stat-sub positive">Arsip Asesmen</div>
          </div>
          <div class="stat-icon icon-emerald">✅</div>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="card-header">
          <div>
            <h3>Antrean Submisi Asesmen Masuk</h3>
            <p>Tabel pemeriksaan skrining mandiri klien oleh staf asesmen</p>
          </div>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID Submisi</th>
                <th>Nama Klien</th>
                <th>Jenis Asesmen</th>
                <th>Waktu Submisi</th>
                <th>Prioritas</th>
                <th>Status</th>
                <th>Rekomendasi Layanan</th>
                <th>Aksi Staf</th>
              </tr>
            </thead>
            <tbody>
              ${state.assessments
                .map(
                  asm => `
                <tr>
                  <td><strong>${asm.id}</strong></td>
                  <td><strong>${asm.clientName}</strong></td>
                  <td>${asm.type}</td>
                  <td>${asm.submittedAt}</td>
                  <td><span class="badge badge-${asm.priority.toLowerCase()}">${asm.priority}</span></td>
                  <td><span class="badge badge-${asm.status.toLowerCase()}">${asm.status}</span></td>
                  <td>
                    ${asm.recommendedService ? `<span class="badge badge-paid">${asm.recommendedService}</span>` : '<span style="color: var(--slate-400); font-size: 0.75rem;">Belum Ditentukan</span>'}
                  </td>
                  <td>
                    <button class="btn btn-primary btn-sm" onclick="window.curhatiApp.openReviewAssessmentModal('${asm.id}')">
                      Periksa & Review
                    </button>
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Assessment Review Modal
    window.curhatiApp.openReviewAssessmentModal = asmId => {
      const asm = state.assessments.find(a => a.id === asmId);
      modalContainerEl.innerHTML = `
        <div class="modal-backdrop">
          <div class="modal-dialog" style="max-width: 680px;">
            <div class="modal-header">
              <h3 style="font-size: 1.125rem; font-weight: 700;">Review Asesmen: ${asm.id} (${asm.clientName})</h3>
              <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.closeModal()">✕</button>
            </div>
            <div class="modal-body">
              <div style="margin-bottom: 1.25rem; background: var(--slate-50); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--slate-200);">
                <div class="flex justify-between items-center" style="margin-bottom: 0.5rem;">
                  <span style="font-size: 0.8125rem; font-weight: 700; color: var(--slate-700);">Ringkasan Indikator:</span>
                  <span class="badge badge-${asm.priority.toLowerCase()}">${asm.priority} PRIORITY</span>
                </div>
                <p style="font-size: 0.875rem; color: var(--slate-800);">${asm.summary}</p>
              </div>

              <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--slate-800); margin-bottom: 0.75rem;">Jawaban Klien:</h4>
              <div style="margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
                ${asm.answers
                  .map(
                    ans => `
                  <div style="font-size: 0.8125rem; border-left: 2px solid var(--primary); padding-left: 0.75rem;">
                    <div style="color: var(--slate-600);">${ans.q}</div>
                    <div style="font-weight: 700; color: var(--slate-900);">${ans.a}</div>
                  </div>
                `
                  )
                  .join('')}
              </div>

              <div class="form-group">
                <label class="form-label">Catatan Internal Staf Asesor (Internal Notes)</label>
                <textarea id="asmInternalNotes" class="form-control" rows="3" placeholder="Tuliskan catatan analisis untuk tim asesmen...">${asm.internalNotes || ''}</textarea>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">Update Status</label>
                  <select id="asmStatusSelect" class="form-control">
                    <option value="NEW" ${asm.status === 'NEW' ? 'selected' : ''}>NEW</option>
                    <option value="IN_PROGRESS" ${asm.status === 'IN_PROGRESS' ? 'selected' : ''}>IN_PROGRESS</option>
                    <option value="COMPLETED" ${asm.status === 'COMPLETED' ? 'selected' : ''}>COMPLETED</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Rekomendasikan Layanan (Eksplisit)</label>
                  <select id="asmRecService" class="form-control">
                    <option value="">-- Tidak ada rekomendasi --</option>
                    <option value="Teman Cerita" ${asm.recommendedService === 'Teman Cerita' ? 'selected' : ''}>Teman Cerita (Peer)</option>
                    <option value="Psikolog Umum" ${asm.recommendedService === 'Psikolog Umum' ? 'selected' : ''}>Psikolog Umum</option>
                    <option value="Psikolog Klinis" ${asm.recommendedService === 'Psikolog Klinis' ? 'selected' : ''}>Psikolog Klinis</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-outline" onclick="window.curhatiApp.closeModal()">Tutup</button>
              <button class="btn btn-primary" onclick="window.curhatiApp.saveAssessmentReview('${asm.id}')">Simpan Hasil Review</button>
            </div>
          </div>
        </div>
      `;
    };

    window.curhatiApp.saveAssessmentReview = asmId => {
      const internalNotes = document.getElementById('asmInternalNotes').value;
      const status = document.getElementById('asmStatusSelect').value;
      const recService = document.getElementById('asmRecService').value;

      store.reviewAssessment(asmId, {
        internalNotes,
        status,
        recommendedService: recService || null
      });

      window.curhatiApp.closeModal();
      showToast(`Asesmen ${asmId} berhasil diperbarui.`, 'success');
      renderView();
    };
  }

  /* ==========================================================================
     4. FINANCE VIEW
     ========================================================================== */
  function renderFinanceView() {
    const state = store.data;
    const paidInvoices = state.invoices.filter(i => i.status === 'PAID');
    const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.amount, 0);

    viewportEl.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div>
            <div class="stat-label">Total Pendapatan Terverifikasi</div>
            <div class="stat-value" style="font-size: 1.5rem;">IDR ${totalRevenue.toLocaleString('id-ID')}</div>
            <div class="stat-sub positive">Dari ${paidInvoices.length} transaksi sukses</div>
          </div>
          <div class="stat-icon icon-emerald">💰</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Transaksi Paid</div>
            <div class="stat-value">${paidInvoices.length}</div>
            <div class="stat-sub positive">Webhook verified</div>
          </div>
          <div class="stat-icon icon-teal">💳</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Transaksi Pending</div>
            <div class="stat-value">${state.invoices.filter(i => i.status === 'PENDING').length}</div>
            <div class="stat-sub">Menunggu pembayaran VA/QRIS</div>
          </div>
          <div class="stat-icon icon-amber">⏳</div>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="card-header">
          <div>
            <h3>Daftar Transaksi & Invoices</h3>
            <p>Integrasi Gateway Pembayaran: Midtrans, Xendit, Stripe (Webhook Verified)</p>
          </div>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>No. Invoice</th>
                <th>Klien</th>
                <th>Deskripsi Layanan</th>
                <th>Nominal</th>
                <th>Metode Pembayaran</th>
                <th>Status</th>
                <th>Waktu Transaksi</th>
              </tr>
            </thead>
            <tbody>
              ${state.invoices
                .map(
                  inv => `
                <tr>
                  <td><strong>${inv.id}</strong></td>
                  <td>${inv.clientName}</td>
                  <td>${inv.serviceName}</td>
                  <td><strong>IDR ${inv.amount.toLocaleString('id-ID')}</strong></td>
                  <td>${inv.paymentMethod}</td>
                  <td><span class="badge badge-${inv.status.toLowerCase()}">${inv.status}</span></td>
                  <td>${inv.createdAt}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     5. OWNER VIEW (Executive Dashboard with HIPAA Privacy Guard)
     ========================================================================== */
  function renderOwnerView() {
    const state = store.data;
    const totalSessions = state.counselingSessions.length;
    const totalAssessments = state.assessments.length;
    const totalRevenue = state.invoices.filter(i => i.status === 'PAID').reduce((sum, i) => sum + i.amount, 0);

    viewportEl.innerHTML = `
      <!-- Privacy Safeguard Banner for Executive Role -->
      <div class="ethics-notice-banner" style="border-color: #fbcfe8; background: #fdf2f8;">
        <div class="ethics-icon">🛡️</div>
        <div class="ethics-text">
          <h4 style="color: #9d174d;">Owner Least-Privilege Data Governance</h4>
          <p style="color: #be185d;">
            Sesuai regulasi privasi data kesehatan dan spesifikasi blueprint Curhati: <strong>Akun Owner hanya menerima agregasi performa bisnis</strong> dan <em>dibatasi secara sistem</em> dari membaca catatan konseling privat atau riwayat chat sensitif pasien.
          </p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div>
            <div class="stat-label">Total Omzet Bisnis</div>
            <div class="stat-value" style="font-size: 1.5rem;">IDR ${totalRevenue.toLocaleString('id-ID')}</div>
            <div class="stat-sub positive">↑ 18.5% dari bulan lalu</div>
          </div>
          <div class="stat-icon icon-emerald">📈</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Total Sesi Konseling</div>
            <div class="stat-value">${totalSessions}</div>
            <div class="stat-sub positive">Klinis & Teman Cerita</div>
          </div>
          <div class="stat-icon icon-indigo">💬</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Total Asesmen Mandiri</div>
            <div class="stat-value">${totalAssessments}</div>
            <div class="stat-sub">Screening Submissions</div>
          </div>
          <div class="stat-icon icon-teal">📋</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Klien Terdaftar</div>
            <div class="stat-value">128</div>
            <div class="stat-sub positive">+12 klien baru minggu ini</div>
          </div>
          <div class="stat-icon icon-amber">👥</div>
        </div>
      </div>

      <!-- Aggregated Service Performance -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div class="dashboard-card">
          <div class="card-header">
            <h3>Distribusi Layanan Terlaris</h3>
          </div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div>
                <div class="flex justify-between" style="font-size: 0.875rem; margin-bottom: 0.25rem;">
                  <span>Psikolog Klinis Dewasa (IDR 260K)</span>
                  <strong>55%</strong>
                </div>
                <div style="height: 8px; background: var(--slate-100); border-radius: 4px; overflow: hidden;">
                  <div style="width: 55%; height: 100%; background: var(--primary);"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between" style="font-size: 0.875rem; margin-bottom: 0.25rem;">
                  <span>Teman Cerita Peer Counseling (IDR 65K)</span>
                  <strong>30%</strong>
                </div>
                <div style="height: 8px; background: var(--slate-100); border-radius: 4px; overflow: hidden;">
                  <div style="width: 30%; height: 100%; background: var(--accent-amber);"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between" style="font-size: 0.875rem; margin-bottom: 0.25rem;">
                  <span>Psikolog Umum (IDR 175K)</span>
                  <strong>15%</strong>
                </div>
                <div style="height: 8px; background: var(--slate-100); border-radius: 4px; overflow: hidden;">
                  <div style="width: 15%; height: 100%; background: var(--secondary);"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-header">
            <h3>Kepuasan Konselor & Rating Agregat</h3>
          </div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="padding: 0.75rem; border: 1px solid var(--slate-200); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong>Wilda Nurbayani, S.Psi., M.Psi., Psikolog</strong>
                  <div style="font-size: 0.75rem; color: var(--slate-500);">380 Sesi Konseling</div>
                </div>
                <span style="font-weight: 700; color: #f59e0b;">★ 4.98</span>
              </div>
              <div style="padding: 0.75rem; border: 1px solid var(--slate-200); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong>Rasidia Nur Kinasti, S.Psi (Teman Cerita)</strong>
                  <div style="font-size: 0.75rem; color: var(--slate-500);">280 Sesi Curhat</div>
                </div>
                <span style="font-weight: 700; color: #f59e0b;">★ 4.95</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     6. ADMIN VIEW (Users, Integrated Schedule, Services, Audit Logs)
     ========================================================================== */
  function renderAdminView(tab) {
    const state = store.data;

    if (tab === 'audit-logs') {
      renderAuditLogs();
      return;
    }

    if (tab === 'users') {
      viewportEl.innerHTML = `
        <div class="flex items-center justify-between" style="margin-bottom: 1.5rem;">
          <div>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--slate-900);">Manajemen Akun & Hak Akses (Multi-Role)</h2>
            <p style="color: var(--slate-500); font-size: 0.875rem;">Arsitektur akun: 1 Admin Bersama (5 Staf), 1 Finance, 1 Koordinator, 1 Admin by AI, 15 Konselor, 10 Asesor, dan Akun Klien.</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="showToast('Fitur Tambah Anggota Baru siap digunakan', 'success')">+ Tambah Akun Mitra</button>
        </div>

        <div class="dashboard-card" style="margin-bottom: 1.5rem;">
          <div class="card-header">
            <div>
              <h3>Akun Inti & Manajemen Operasional</h3>
              <p>Akun administratif, keuangan, dan bot AI dengan sesi akses simultan.</p>
            </div>
          </div>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nama Peran</th>
                  <th>Email Login</th>
                  <th>Kapasitas Akses</th>
                  <th>Status Akun</th>
                  <th>Hak Akses</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>🛡️ Admin Operasional</strong></td>
                  <td><code>admin@curhatinshinejourney.com</code></td>
                  <td><span class="badge badge-completed">1 Akun (5 User Aktif)</span></td>
                  <td><span class="badge badge-scheduled">Aktif Simultan</span></td>
                  <td>Akses data, verifikasi reservasi, atur jadwal piket & status online</td>
                </tr>
                <tr>
                  <td><strong>👑 Koordinator Layanan</strong></td>
                  <td><code>koordinator@curhatinshinejourney.com</code></td>
                  <td><span class="badge badge-new">1 Akun Master</span></td>
                  <td><span class="badge badge-scheduled">Aktif</span></td>
                  <td>Akses penuh ke seluruh modul, keuangan, dan evaluasi klinis</td>
                </tr>
                <tr>
                  <td><strong>💳 Finance & Billing</strong></td>
                  <td><code>finance@curhatinshinejourney.com</code></td>
                  <td><span class="badge badge-new">1 Akun Personal</span></td>
                  <td><span class="badge badge-scheduled">Aktif</span></td>
                  <td>Rekonsiliasi transaksi, kelola invoice, dan laporan omzet</td>
                </tr>
                <tr>
                  <td><strong>🤖 Admin by AI (ShineBot)</strong></td>
                  <td><code>ai.admin@curhatinshinejourney.com</code></td>
                  <td><span class="badge badge-waiting">Sistem Otomatis</span></td>
                  <td><span class="badge badge-completed">Online 24/7</span></td>
                  <td>Auto-responder empati saat konselor/staf belum merespon chat web klien</td>
                </tr>
                <tr>
                  <td><strong>👤 Client (Login Klien)</strong></td>
                  <td><code>maya.pratama@gmail.com / No HP</code></td>
                  <td><span class="badge badge-new">Mandiri via Web</span></td>
                  <td><span class="badge badge-scheduled">Aktif</span></td>
                  <td>Reservasi, skrining mandiri, dan konseling chat realtime via web</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="dashboard-card" style="margin-bottom: 1.5rem;">
          <div class="card-header">
            <div>
              <h3>Daftar 15 Akun Konseling (Psikolog & Teman Cerita)</h3>
              <p>Masing-masing konselor memiliki akun pribadi untuk berinteraksi langsung via chat web dengan klien.</p>
            </div>
            <button class="btn btn-outline btn-sm" onclick="if(window.counselorSchedule) window.counselorSchedule.openScheduleModal()">📅 Buka Jadwal Piket Excel</button>
          </div>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID Akun</th>
                  <th>Nama Lengkap Konselor</th>
                  <th>Kategori Layanan</th>
                  <th>Status Online Sekarang</th>
                  <th>Aksi Kontrol</th>
                </tr>
              </thead>
              <tbody>
                ${state.counselors
                  .map(c => {
                    const st = window.counselorSchedule ? window.counselorSchedule.getCounselorLiveStatus(c.id) : { status: 'offline', text: 'Offline' };
                    const ov = window.counselorSchedule ? window.counselorSchedule.getManualOverride(c.id) : 'auto';
                    return `
                      <tr>
                        <td><code>${c.id}</code></td>
                        <td>
                          <strong>${c.name}</strong>
                          <div style="font-size: 0.75rem; color: var(--slate-500);">${c.license || c.education}</div>
                        </td>
                        <td><span class="badge ${c.serviceType === 'PSIKOLOG_KLINIS' ? 'badge-completed' : 'badge-waiting'}">${c.serviceType === 'PSIKOLOG_KLINIS' ? 'Psikolog Klinis' : 'Teman Cerita'}</span></td>
                        <td>
                          <span class="badge ${st.status === 'online' ? 'badge-completed' : st.status === 'session' ? 'badge-waiting' : 'badge-cancelled'}">
                            ${st.status === 'online' ? '● ' : st.status === 'session' ? '⏳ ' : '○ '}${st.text}
                          </span>
                          <span style="font-size: 0.6875rem; color: var(--slate-400); display: block;">(${ov === 'auto' ? 'Auto Piket' : 'Manual: ' + ov})</span>
                        </td>
                        <td>
                          <div style="display: flex; gap: 0.25rem;">
                            <button class="btn btn-sm btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="store.setRole('${c.id}'); showToast('Beralih ke akun ${c.name}', 'success');">Login Akun</button>
                            <button class="btn btn-sm btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="if(window.counselorSchedule) window.counselorSchedule.openScheduleModal('${c.id}')">Piket</button>
                          </div>
                        </td>
                      </tr>
                    `;
                  })
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-header">
            <div>
              <h3>Daftar 10 Akun Tim Asesmen (Asesor Psikologi)</h3>
              <p>Diadaptasi dari file Jadwal Piket.xlsx untuk review instrumen mandiri klien.</p>
            </div>
          </div>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID Asesor</th>
                  <th>Nama Staf Asesmen</th>
                  <th>Spesialisasi</th>
                  <th>Shift Piket Excel</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${state.assessmentStaff
                  .map(
                    a => `
                  <tr>
                    <td><code>${a.id}</code></td>
                    <td><strong>${a.name}</strong></td>
                    <td><span class="badge badge-new">${a.specialization}</span></td>
                    <td>${a.shifts ? a.shifts.join(', ') : 'Sesuai Jadwal'}</td>
                    <td><span class="badge badge-completed">Siap Review</span></td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      return;
    }

    if (tab === 'schedule-all') {
      viewportEl.innerHTML = `
        <div class="flex items-center justify-between" style="margin-bottom: 1.5rem;">
          <div>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--slate-900);">Kontrol Jadwal Piket & Status Online Terintegrasi</h2>
            <p style="color: var(--slate-500); font-size: 0.875rem;">Status otomatis dihitung berdasarkan waktu WIB nyata dari file Excel tim konseling & asesmen. Admin & konselor dapat mengubah status kapan saja.</p>
          </div>
          <button class="btn btn-primary" onclick="if(window.counselorSchedule) window.counselorSchedule.openScheduleModal()">📅 Tampilkan Matriks Piket Lengkap</button>
        </div>

        <div class="dashboard-card" style="margin-bottom: 1.5rem;">
          <div class="card-header">
            <div>
              <h3>Status Ketersediaan Konselor di Web Publik (15 Akun)</h3>
              <p>Ubah status live ketersediaan yang langsung tampil pada kartu psikolog/konselor di web.</p>
            </div>
          </div>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Konselor</th>
                  <th>Kategori</th>
                  <th>Status Realtime</th>
                  <th>Mode Kontrol Saat Ini</th>
                  <th>Aksi Cepat Admin</th>
                </tr>
              </thead>
              <tbody>
                ${state.counselors
                  .map(c => {
                    const st = window.counselorSchedule ? window.counselorSchedule.getCounselorLiveStatus(c.id) : { status: 'offline', text: 'Offline' };
                    const ov = window.counselorSchedule ? window.counselorSchedule.getManualOverride(c.id) : 'auto';
                    return `
                      <tr>
                        <td><strong>${c.name}</strong></td>
                        <td><span class="badge ${c.serviceType === 'PSIKOLOG_KLINIS' ? 'badge-completed' : 'badge-waiting'}">${c.serviceType === 'PSIKOLOG_KLINIS' ? 'Psikolog Klinis' : 'Teman Cerita'}</span></td>
                        <td>
                          <span class="badge ${st.status === 'online' ? 'badge-completed' : st.status === 'session' ? 'badge-waiting' : 'badge-cancelled'}">
                            ${st.status === 'online' ? '● ' : st.status === 'session' ? '⏳ ' : '○ '}${st.text}
                          </span>
                        </td>
                        <td>
                          <strong>${ov === 'auto' ? '🔄 Otomatis (Excel Piket)' : '📌 Manual (' + ov.toUpperCase() + ')'}</strong>
                        </td>
                        <td>
                          <div style="display: flex; gap: 0.25rem; flex-wrap: wrap;">
                            <button class="btn btn-sm ${ov === 'auto' ? 'btn-primary' : 'btn-outline'}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="window.curhatiApp.setOverrideStatus('${c.id}', 'auto')">Auto</button>
                            <button class="btn btn-sm ${ov === 'online' ? 'btn-primary' : 'btn-outline'}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; color: #059669;" onclick="window.curhatiApp.setOverrideStatus('${c.id}', 'online')">Online</button>
                            <button class="btn btn-sm ${ov === 'session' ? 'btn-primary' : 'btn-outline'}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; color: #d97706;" onclick="window.curhatiApp.setOverrideStatus('${c.id}', 'session')">Sesi</button>
                            <button class="btn btn-sm ${ov === 'offline' ? 'btn-primary' : 'btn-outline'}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; color: #ef4444;" onclick="window.curhatiApp.setOverrideStatus('${c.id}', 'offline')">Offline</button>
                            <button class="btn btn-sm btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="if(window.counselorSchedule) window.counselorSchedule.openScheduleModal('${c.id}')">Piket</button>
                          </div>
                        </td>
                      </tr>
                    `;
                  })
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      return;
    }

    viewportEl.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div>
            <div class="stat-label">Total Akun Terdaftar</div>
            <div class="stat-value">29 Akun</div>
            <div class="stat-sub">15 Konselor, 10 Asesor, 4 Inti</div>
          </div>
          <div class="stat-icon icon-teal">👥</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Audit Events Tercatat</div>
            <div class="stat-value">${state.auditLogs.length}</div>
            <div class="stat-sub positive">In-memory / LocalStorage Log</div>
          </div>
          <div class="stat-icon icon-indigo">📜</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Admin by AI (ShineBot)</div>
            <div class="stat-value">Aktif 24/7</div>
            <div class="stat-sub positive">Auto-Reply Standby</div>
          </div>
          <div class="stat-icon icon-emerald">🤖</div>
        </div>
      </div>

      <div class="dashboard-card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <h3>Pemantauan Status Ketersediaan Konselor Hari Ini</h3>
            <p>Dihitung otomatis dari JADWAL PIKET TIM CURHATI.xlsx (WIB)</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.navigateTo('schedule-all')">Kelola Seluruh Jadwal</button>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Nama Konselor</th>
                <th>Layanan</th>
                <th>Status Ketersediaan Web</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${state.counselors.slice(0, 6).map(c => {
                const st = window.counselorSchedule ? window.counselorSchedule.getCounselorLiveStatus(c.id) : { status: 'offline', text: 'Offline' };
                return `
                  <tr>
                    <td><strong>${c.name}</strong></td>
                    <td>${c.serviceType === 'PSIKOLOG_KLINIS' ? 'Psikolog Klinis' : 'Teman Cerita'}</td>
                    <td>
                      <span class="badge ${st.status === 'online' ? 'badge-completed' : st.status === 'session' ? 'badge-waiting' : 'badge-cancelled'}">
                        ${st.status === 'online' ? '● ' : st.status === 'session' ? '⏳ ' : '○ '}${st.text}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-outline" onclick="if(window.counselorSchedule) window.counselorSchedule.openScheduleModal('${c.id}')">Lihat Shift</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="card-header">
          <div>
            <h3>Audit Trail Keamanan Sistem Terkini</h3>
            <p>Mencatat Login, Reservasi, Transaksi, dan Pengunggahan Berkas</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.navigateTo('audit-logs')">Buka Log Lengkap</button>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Waktu (WIB)</th>
                <th>Pengguna</th>
                <th>Aksi</th>
                <th>Resource</th>
                <th>Detail Aktivitas</th>
              </tr>
            </thead>
            <tbody>
              ${state.auditLogs
                .slice(0, 6)
                .map(
                  log => `
                <tr>
                  <td><span style="font-family: monospace; font-size: 0.8125rem;">${log.timestamp}</span></td>
                  <td><strong>${log.userName}</strong></td>
                  <td><span class="badge badge-new">${log.action}</span></td>
                  <td>${log.resource} (${log.resourceId})</td>
                  <td style="color: var(--slate-600);">${log.metadata}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderAuditLogs() {
    const state = store.data;
    viewportEl.innerHTML = `
      <div class="flex items-center justify-between" style="margin-bottom: 1.5rem;">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--slate-900);">Security Audit Logs</h2>
          <p style="color: var(--slate-500); font-size: 0.875rem;">Seluruh aktivitas transaksi dan tindakan klinis dicatat untuk audit kepatuhan.</p>
        </div>
        <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.navigateTo('overview')">← Kembali</button>
      </div>

      <div class="dashboard-card">
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Resource</th>
                <th>Resource ID</th>
                <th>Metadata</th>
              </tr>
            </thead>
            <tbody>
              ${state.auditLogs
                .map(
                  log => `
                <tr>
                  <td><code>${log.id}</code></td>
                  <td><span style="font-family: monospace; font-size: 0.75rem;">${log.timestamp}</span></td>
                  <td><strong>${log.userName}</strong></td>
                  <td><span class="badge badge-new">${log.action}</span></td>
                  <td>${log.resource}</td>
                  <td><code>${log.resourceId}</code></td>
                  <td>${log.metadata}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     6.1. COORDINATOR VIEW (Master Access to All Modules)
     ========================================================================== */
  function renderCoordinatorView(tab) {
    const state = store.data;

    if (tab === 'schedule-all') {
      renderAdminView('schedule-all');
      return;
    }
    if (tab === 'counselors-roster' || tab === 'assessments-roster' || tab === 'users') {
      renderAdminView('users');
      return;
    }
    if (tab === 'ai-config') {
      renderAiAdminView('overview');
      return;
    }
    if (tab === 'transactions') {
      renderFinanceView('transactions');
      return;
    }
    if (tab === 'audit-logs') {
      renderAuditLogs();
      return;
    }

    viewportEl.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div>
            <div class="stat-label">Total 15 Konselor</div>
            <div class="stat-value">13 Aktif + 2 Mitra</div>
            <div class="stat-sub positive">Psikolog Klinis & Teman Cerita</div>
          </div>
          <div class="stat-icon icon-indigo">👩‍⚕️</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Total 10 Asesor</div>
            <div class="stat-value">8 Shift + 2 Cadangan</div>
            <div class="stat-sub positive">Jadwal Piket.xlsx</div>
          </div>
          <div class="stat-icon icon-amber">📋</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Admin Bersama (5 Staf)</div>
            <div class="stat-value">1 Akun Shared</div>
            <div class="stat-sub positive">Sesi Akses Simultan</div>
          </div>
          <div class="stat-icon icon-teal">🛡️</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Admin by AI (ShineBot)</div>
            <div class="stat-value">Auto-Responder Aktif</div>
            <div class="stat-sub positive">Fallback Chat <2 Detik</div>
          </div>
          <div class="stat-icon icon-emerald">🤖</div>
        </div>
      </div>

      <div class="dashboard-card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <h3>Matriks Pemantauan Layanan Curhati (Koordinator)</h3>
            <p>Akses langsung ke seluruh instrumen operasional, jadwal piket, dan sistem reservasi.</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-primary btn-sm" onclick="if(window.counselorSchedule) window.counselorSchedule.openScheduleModal()">📅 Buka Jadwal Piket Excel</button>
            <button class="btn btn-outline btn-sm" onclick="window.curhatiApp.navigateTo('ai-config')">🤖 Konfigurasi AI</button>
          </div>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Layanan</th>
                <th>Total Staf Bertugas</th>
                <th>Ketersediaan Hari Ini</th>
                <th>Aksi Cepat Koordinator</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Psikolog Klinis Dewasa</strong></td>
                <td>3 Psikolog Berlisensi</td>
                <td><span class="badge badge-completed">Tersedia Sesuai Piket</span></td>
                <td><button class="btn btn-sm btn-outline" onclick="window.curhatiApp.navigateTo('schedule-all')">Lihat Piket</button></td>
              </tr>
              <tr>
                <td><strong>Teman Cerita (Peer Support)</strong></td>
                <td>12 Konselor Lulusan S.Psi</td>
                <td><span class="badge badge-completed">12 Slot/Hari (07.00 - 21.45)</span></td>
                <td><button class="btn btn-sm btn-outline" onclick="window.curhatiApp.navigateTo('schedule-all')">Lihat Piket</button></td>
              </tr>
              <tr>
                <td><strong>Asesmen Psikologi</strong></td>
                <td>10 Asesor Terstandar</td>
                <td><span class="badge badge-waiting">Review Mandiri Aktif</span></td>
                <td><button class="btn btn-sm btn-outline" onclick="window.curhatiApp.navigateTo('assessments-roster')">Kelola Asesor</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     6.2. AI ADMIN VIEW (ShineBot Auto-Responder)
     ========================================================================== */
  function renderAiAdminView(tab) {
    const state = store.data;

    viewportEl.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div>
            <div class="stat-label">Status Admin by AI</div>
            <div class="stat-value">ONLINE & AKTIF</div>
            <div class="stat-sub positive">ShineBot Standby 24/7</div>
          </div>
          <div class="stat-icon icon-emerald">🤖</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Waktu Respon Cepat</div>
            <div class="stat-value">1.5 Detik</div>
            <div class="stat-sub">Fallback Otomatis saat Konselor Belum Merespon</div>
          </div>
          <div class="stat-icon icon-teal">⚡</div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">Akun Integrasi</div>
            <div class="stat-value">ai.admin@curhatinshinejourney.com</div>
            <div class="stat-sub">Terhubung ke Web Chat</div>
          </div>
          <div class="stat-icon icon-indigo">💬</div>
        </div>
      </div>

      <div class="dashboard-card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <h3>Logika & Aturan Auto-Reply Admin by AI</h3>
            <p>Membantu menjawab salam klien, menenangkan emosi awal, dan mengonfirmasi ketersediaan konselor bertugas.</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="showToast('Konfigurasi prompt AI telah tersimpan', 'success')">💾 Simpan Aturan</button>
        </div>
        <div style="padding: 1rem; background: var(--slate-50); border-radius: var(--radius-md); font-size: 0.875rem; color: var(--slate-700); line-height: 1.6;">
          <div style="margin-bottom: 0.75rem;"><strong>1. Empati & Validasi Emosi Awal:</strong> Saat klien mengirim pesan pertama, AI segera menyapa dengan hangat dan memvalidasi perasaan klien tanpa menghakimi.</div>
          <div style="margin-bottom: 0.75rem;"><strong>2. Cek Jadwal Piket Otomatis:</strong> AI mengidentifikasi konselor yang sedang bertugas hari ini berdasarkan jam WIB (07.00 - 21.45) dari file Excel tim konseling.</div>
          <div style="margin-bottom: 0.75rem;"><strong>3. Eskalasi ke Manusia:</strong> Jika pesan membutuhkan tindakan mendesak atau konselor telah siap di ruang chat web, AI menyerahkan percakapan secara mulus ke konselor terkait.</div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     7. CHAT MODULE (One-to-One Chat with File Attachment & Status)
     ========================================================================== */
  function renderChatUI() {
    const state = store.data;
    const role = state.currentRole;
    let conv = state.chatConversations.find(c => c.id === activeChatConvId) || state.chatConversations[0];

    // Mark as read when entering
    store.markChatAsRead(conv.id);

    viewportEl.innerHTML = `
      <div class="flex items-center justify-between" style="margin-bottom: 1rem;">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--slate-900);">Ruang Chat Terenkripsi</h2>
          <p style="color: var(--slate-500); font-size: 0.875rem;">Komunikasi satu-ke-satu antara Klien dan Konselor yang ditugaskan.</p>
        </div>
      </div>

      <div class="chat-container">
        <!-- Chat Contacts Sidebar -->
        <div class="chat-sidebar">
          <div class="chat-search-box">
            <input type="text" placeholder="Cari percakapan..." class="form-control" style="font-size: 0.8125rem;">
          </div>
          <div class="chat-list">
            ${state.chatConversations
              .map(
                c => `
              <div class="chat-item ${c.id === conv.id ? 'active' : ''}" onclick="window.curhatiApp.switchConversation('${c.id}')">
                <div style="position: relative;">
                  <div class="user-avatar" style="background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700;">
                    ${role === 'CLIENT' ? c.counselorName[0] : c.clientName[0]}
                  </div>
                  <span style="position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background: #10b981; border: 2px solid white; border-radius: 50%;"></span>
                </div>
                <div style="flex: 1; overflow: hidden;">
                  <div class="flex justify-between items-center">
                    <strong style="font-size: 0.875rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${role === 'CLIENT' ? c.counselorName : c.clientName}
                    </strong>
                    <span style="font-size: 0.6875rem; color: var(--slate-400);">${c.lastMessageTime}</span>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--slate-500); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${c.lastMessage}
                  </div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Chat Main Room -->
        <div class="chat-main">
          <div class="chat-header">
            <div class="flex items-center gap-3">
              <div>
                <h4 style="font-size: 1rem; font-weight: 700; color: var(--slate-900);">
                  ${role === 'CLIENT' ? conv.counselorName : conv.clientName}
                </h4>
                <div style="font-size: 0.75rem; color: #10b981; font-weight: 600;">● Online • Sesi Daring Aktif</div>
              </div>
            </div>
            <div>
              <span class="badge badge-scheduled">${conv.serviceType}</span>
            </div>
          </div>

          <!-- Messages Scroll Area -->
          <div class="chat-messages" id="chatMessagesBox">
            ${conv.messages
              .map(
                m => `
              <div class="message-bubble ${m.senderRole === role ? 'message-out' : 'message-in'}">
                <div>${m.text}</div>
                <div class="message-meta">
                  <span>${m.time}</span>
                  ${m.senderRole === role ? `<span>${m.read ? '✓✓' : '✓'}</span>` : ''}
                </div>
              </div>
            `
              )
              .join('')}
          </div>

          <!-- Input Area -->
          <form class="chat-input-area" onsubmit="window.curhatiApp.sendChatMessage(event)">
            <button type="button" class="btn btn-outline btn-sm" onclick="showToast('Simulasi lampiran file aman (.pdf, .jpg)', 'warning')">📎</button>
            <input type="text" id="chatTextInput" class="chat-input" placeholder="Tulis pesan untuk ${role === 'CLIENT' ? 'konselor' : 'klien'}..." required autocomplete="off">
            <button type="submit" class="btn btn-primary">Kirim</button>
          </form>
        </div>
      </div>
    `;

    // Scroll chat to bottom
    const box = document.getElementById('chatMessagesBox');
    if (box) box.scrollTop = box.scrollHeight;

    window.curhatiApp.switchConversation = convId => {
      activeChatConvId = convId;
      renderChatUI();
    };

    window.curhatiApp.sendChatMessage = e => {
      e.preventDefault();
      const input = document.getElementById('chatTextInput');
      const text = input.value.trim();
      if (!text) return;

      store.sendMessage(conv.id, text);
      input.value = '';
      renderChatUI();

      // Trigger Admin by AI auto-response if client sends a message
      if (role === 'CLIENT') {
        setTimeout(() => {
          if (store.sendAiAutoReply) {
            store.sendAiAutoReply(conv.id, text);
            renderChatUI();
          }
        }, 1200);
      }
    };
  }

  // General App Router helper
  window.curhatiApp = {
    navigateTo(tab) {
      currentActiveTab = tab;
      renderSidebar();
      renderMainContent();
    },
    setOverrideStatus(cslId, status) {
      if (window.counselorSchedule) {
        window.counselorSchedule.setStatusOverride(cslId, status);
        const label = status === 'auto' ? 'Otomatis Sesuai Jadwal Piket Excel' : `Manual: ${status.toUpperCase()}`;
        showToast(`Status ketersediaan diubah: ${label}`, 'success');
        renderSidebar();
        renderMainContent();
      }
    },
    closeModal() {
      if (modalContainerEl) modalContainerEl.innerHTML = '';
    }
  };

  // Toast Notification System
  function showToast(message, type = 'primary') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>${type === 'success' ? '✅' : type === 'danger' ? '⚠️' : 'ℹ️'}</span>
        <span>${message}</span>
      </div>
      <button style="border: none; background: transparent; cursor: pointer; color: var(--slate-400); font-weight: bold;" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 4500);
  }
})();
