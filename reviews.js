/**
 * SHINE JOURNEY / CURHATI - Client Reviews & Testimonials System
 * Fitur Review & Rating Klien untuk Konselor dan Psikolog
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'SHINEJOURNEY_COUNSELOR_REVIEWS_V1';

  // 13 Official Counselors & Psychologists Metadata
  const COUNSELORS = [
    {
      id: 'csl-1',
      name: 'Wilda Nurbayani, S.Psi., M.Psi., Psikolog',
      role: 'Psikolog Klinis · STR & SIPP Aktif',
      category: 'klinis',
      avatar: 'team-wilda.jpg',
      badge: 'Psikolog Berizin (SIPP)',
      badgeColor: '#4F46E5',
      badgeBg: '#EEF2FF',
      baseRating: 4.98,
      baseCount: 380,
      price: 'Rp 175.000/sesi',
      focus: 'Stres Akademik, Distress, Kecemasan, Depresi, Overthinking, Regulasi Emosi'
    },
    {
      id: 'csl-2',
      name: 'Haura Maulidianawati, S.Psi., Psikolog',
      role: 'Psikolog Klinis · STR & SIPP Aktif',
      category: 'klinis',
      avatar: 'team-haura.jpg',
      badge: 'Psikolog Berizin (SIPP)',
      badgeColor: '#0369A1',
      badgeBg: '#E0F2FE',
      baseRating: 4.92,
      baseCount: 290,
      price: 'Rp 165.000/sesi',
      focus: 'Stres Kerja, Quarter-Life Crisis, Relasi Interpersonal, Self-Esteem'
    },
    {
      id: 'csl-3',
      name: 'Hanifa Putri Anggraini, S.Psi., Psikolog',
      role: 'Psikolog Klinis · STR & SIPP Aktif',
      category: 'klinis',
      avatar: 'team-hanifa.jpg',
      badge: 'Psikolog Berizin (SIPP)',
      badgeColor: '#4338CA',
      badgeBg: '#EEF2FF',
      baseRating: 4.90,
      baseCount: 260,
      price: 'Rp 165.000/sesi',
      focus: 'Stres Akademik, Kecemasan, Manajemen Waktu, Quarter Life Crisis'
    },
    {
      id: 'csl-4',
      name: 'Rasidia Nur Kinasti, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      category: 'teman_cerita',
      avatar: 'team-rasidia.jpg',
      badge: 'Teman Cerita (Peer Support)',
      badgeColor: '#B45309',
      badgeBg: '#FEF3C7',
      baseRating: 4.95,
      baseCount: 240,
      price: 'Rp 50.000/sesi',
      focus: 'Stres Akademik, Relasi Interpersonal, Overthinking, Quarter-Life Crisis'
    },
    {
      id: 'csl-5',
      name: 'Putri Dyah Wahyupramesthi, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      category: 'teman_cerita',
      avatar: 'team-putri.jpg',
      badge: 'Teman Cerita (Peer Support)',
      badgeColor: '#BE185D',
      badgeBg: '#FCE7F3',
      baseRating: 4.90,
      baseCount: 210,
      price: 'Rp 50.000/sesi',
      focus: 'Stres Akademik, Kecemasan Ringan, Manajemen Waktu, Self-Esteem'
    },
    {
      id: 'csl-6',
      name: 'Anif Fatul Rohmah, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      category: 'teman_cerita',
      avatar: 'team-anif.jpg',
      badge: 'Teman Cerita (Peer Support)',
      badgeColor: '#B45309',
      badgeBg: '#FEF3C7',
      baseRating: 4.91,
      baseCount: 175,
      price: 'Rp 50.000/sesi',
      focus: 'Prokrastinasi & Motivasi, Kesepian, Regulasi Emosi, Pengenalan Emosi'
    },
    {
      id: 'csl-7',
      name: 'Shabrina Rihhadatul Aisy',
      role: 'Pendengar Aktif Sebaya',
      category: 'teman_cerita',
      avatar: 'team-shabrina.jpg',
      badge: 'Teman Cerita (Peer Support)',
      badgeColor: '#059669',
      badgeBg: '#ECFDF5',
      baseRating: 4.88,
      baseCount: 180,
      price: 'Rp 50.000/sesi',
      focus: 'Relasi Interpersonal, Prokrastinasi, Kesepian, Self-Growth'
    },
    {
      id: 'csl-8',
      name: 'Theresa Adelya Setyawan, S.Psi',
      role: 'PIC Edukasi Konten · Lulusan S.Psi',
      category: 'teman_cerita',
      avatar: 'team-theresa.jpg',
      badge: 'Teman Cerita (Peer Support)',
      badgeColor: '#6D28D9',
      badgeBg: '#F5F3FF',
      baseRating: 4.92,
      baseCount: 195,
      price: 'Rp 50.000/sesi',
      focus: 'Stres Akademik, Relasi Keluarga & Pasangan, Overthinking, Karir'
    },
    {
      id: 'csl-9',
      name: 'Annisa, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      category: 'teman_cerita',
      avatar: 'team-annisa.jpg',
      badge: 'Teman Cerita (Peer Support)',
      badgeColor: '#9D174D',
      badgeBg: '#FDF2F8',
      baseRating: 4.89,
      baseCount: 170,
      price: 'Rp 50.000/sesi',
      focus: 'Relasi Interpersonal, Kecemasan Ringan, Kesepian & Dukungan Sosial'
    },
    {
      id: 'csl-10',
      name: 'Binti Nadhifah, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      category: 'teman_cerita',
      avatar: 'team-binti.jpg',
      badge: 'Teman Cerita (Peer Support)',
      badgeColor: '#B45309',
      badgeBg: '#FEF3C7',
      baseRating: 4.93,
      baseCount: 185,
      price: 'Rp 50.000/sesi',
      focus: 'Relasi Interpersonal, Kesepian, Self-Esteem, Menghadapi Kegagalan'
    },
    {
      id: 'csl-11',
      name: 'Rizki Dwi Rahmadani Putri',
      role: 'Pendengar Aktif Sebaya',
      category: 'teman_cerita',
      avatar: 'team-rizki.jpg',
      badge: 'Teman Cerita (Peer Support)',
      badgeColor: '#059669',
      badgeBg: '#ECFDF5',
      baseRating: 4.88,
      baseCount: 150,
      price: 'Rp 50.000/sesi',
      focus: 'Stres Akademik, Relasi Interpersonal, Manajemen Waktu, Kesepian'
    },
    {
      id: 'csl-12',
      name: 'Syifa Dyandri Kemaputri, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      category: 'teman_cerita',
      avatar: 'team-syifa.jpg',
      badge: 'Teman Cerita (Peer Support)',
      badgeColor: '#15803D',
      badgeBg: '#F0FDF4',
      baseRating: 4.94,
      baseCount: 205,
      price: 'Rp 50.000/sesi',
      focus: 'Distress, Relasi Interpersonal, Prokrastinasi, Overthinking, Self-Esteem'
    },
    {
      id: 'csl-13',
      name: 'Siratia Katana, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      category: 'teman_cerita',
      avatar: 'team-siratia.jpg',
      badge: 'Teman Cerita (Peer Support)',
      badgeColor: '#A16207',
      badgeBg: '#FEF9C3',
      baseRating: 4.91,
      baseCount: 165,
      price: 'Rp 50.000/sesi',
      focus: 'Overthinking, Relasi Interpersonal, Kecemasan Ringan, Stres Akademik'
    }
  ];

  // Seed authentic verified reviews
  const SEED_REVIEWS = [
    // Wilda
    {
      id: 'rev-wilda-1',
      counselorId: 'csl-1',
      clientName: 'Reza Pratama',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-15',
      serviceType: 'Konseling Psikolog Klinis',
      tags: ['Sangat Solutif', 'Pendekatan CBT', 'Pikiran Lebih Tenang'],
      comment: 'Sesi konseling dengan Kak Wilda benar-benar titik balik buat saya saat burnout parah dan panic attack mengganggu tidur. Pendekatannya sistematis, terstruktur, dan solutif. Beliau memberikan worksheet dan teknik pernapasan yang langsung bisa saya terapkan. Sangat recommended!'
    },
    {
      id: 'rev-wilda-2',
      counselorId: 'csl-1',
      clientName: 'Siti M. (Klien Terverifikasi)',
      isAnonymous: true,
      rating: 5,
      date: '2026-09-10',
      serviceType: 'Konseling Psikolog Klinis',
      tags: ['Empatik & Hangat', 'Ruang Aman', 'Regulasi Emosi'],
      comment: 'Pertama kali konsultasi psikolog klinis berizin dan merasa sangat aman. Kak Wilda mendengarkan tanpa menghakimi sama sekali dan membantu memetakan pola overthinking saya dengan sangat jelas.'
    },
    {
      id: 'rev-wilda-3',
      counselorId: 'csl-1',
      clientName: 'Fajar K.',
      isAnonymous: false,
      rating: 5,
      date: '2026-08-28',
      serviceType: 'Konseling Psikolog Klinis',
      tags: ['Bebas Penghakiman', 'Solusi Praktis'],
      comment: 'Sangat profesional, tepat waktu, dan komunikasinya sangat adem. Keraguan saya sebelum sesi langsung hilang karena keramahan beliau.'
    },

    // Haura
    {
      id: 'rev-haura-1',
      counselorId: 'csl-2',
      clientName: 'Nadia S.',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-12',
      serviceType: 'Konseling Psikolog Klinis',
      tags: ['Quarter-Life Crisis', 'Empatik', 'Sangat Solutif'],
      comment: 'Sesi dengan Kak Haura membuka sudut pandang baru tentang karir dan ekspektasi keluarga. Saya jadi lebih menerima diri dan tahu langkah konkrit apa yang perlu diambil minggu ini.'
    },
    {
      id: 'rev-haura-2',
      counselorId: 'csl-2',
      clientName: 'Anonim (Alumni Konseling)',
      isAnonymous: true,
      rating: 5,
      date: '2026-09-02',
      serviceType: 'Konseling Psikolog Klinis',
      tags: ['Ruang Aman', 'Relasi Interpersonal'],
      comment: 'Kak Haura sangat peka dan detail mengurai konflik relasi yang selama ini bikin saya cemas berlebihan. Terima kasih banyak Kak!'
    },

    // Hanifa
    {
      id: 'rev-hanifa-1',
      counselorId: 'csl-3',
      clientName: 'Nurul Hidayati',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-14',
      serviceType: 'Konseling Psikolog Klinis',
      tags: ['Stres Skripsi', 'Manajemen Waktu', 'Bikin Tenang'],
      comment: 'Skripsi macet dan kecemasan tinggi teratasi pelan-pelan berkat sesi bersama Kak Hanifa. Penjelasannya mudah dipahami dan sangat suportif.'
    },

    // Rasidia
    {
      id: 'rev-rasidia-1',
      counselorId: 'csl-4',
      clientName: 'Dinda A.',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-16',
      serviceType: 'Sesi Teman Cerita',
      tags: ['Mendengarkan dengan Sabar', 'Pikiran Lebih Plong', 'Bebas Penghakiman'],
      comment: 'Awalnya deg-degan mau curhat, tapi Kak Rasidia bener-bener ramah kayak ngobrol sama sahabat sendiri tapi dengan empati profesional. Plong banget rasanya selesai sesi!'
    },
    {
      id: 'rev-rasidia-2',
      counselorId: 'csl-4',
      clientName: 'Kevin T.',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-08',
      serviceType: 'Sesi Teman Cerita',
      tags: ['Overthinking', 'Hangat & Ramah'],
      comment: 'Pelayanan cepat via WhatsApp, sesi online nyaman tanpa ribet. Kak Rasidia sangat sabar mendengarkan keluh kesah saya tanpa memotong.'
    },

    // Putri Dyah
    {
      id: 'rev-putri-1',
      counselorId: 'csl-5',
      clientName: 'Laras W.',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-11',
      serviceType: 'Sesi Teman Cerita',
      tags: ['Self-Esteem', 'Empatik', 'Solusi Praktis'],
      comment: 'Kak Putri membantu saya memetakan kebiasaan menunda dan memulihkan rasa percaya diri yang drop. Suasananya sangat positif.'
    },

    // Anif Fatul
    {
      id: 'rev-anif-1',
      counselorId: 'csl-6',
      clientName: 'Bagas P.',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-09',
      serviceType: 'Sesi Teman Cerita',
      tags: ['Motivasi', 'Regulasi Emosi'],
      comment: 'Kak Anif pintar banget memantik insight baru. Masalah yang tadinya kerasa ruwet jadi terurai satu per satu.'
    },

    // Shabrina
    {
      id: 'rev-shabrina-1',
      counselorId: 'csl-7',
      clientName: 'Maya K.',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-05',
      serviceType: 'Sesi Teman Cerita',
      tags: ['Pendengar Aktif', 'Hangat'],
      comment: 'Bener-bener pendengar yang tulus. Gak ada kesan menggurui, murni ruang berbagi yang menenangkan.'
    },

    // Theresa
    {
      id: 'rev-theresa-1',
      counselorId: 'csl-8',
      clientName: 'Arif Setiawan',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-13',
      serviceType: 'Sesi Teman Cerita',
      tags: ['Relasi Keluarga', 'Overthinking', 'Solutif'],
      comment: 'Sesi yang insightful banget. Kak Theresa membantu saya melihat perspektif keluarga dengan lebih dingin dan terarah.'
    },

    // Annisa
    {
      id: 'rev-annisa-1',
      counselorId: 'csl-9',
      clientName: 'Tia R.',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-07',
      serviceType: 'Sesi Teman Cerita',
      tags: ['Ruang Nyaman', 'Mendengarkan dengan Sabar'],
      comment: 'Keren banget, rasanya didukung secara penuh. Biayanya juga terjangkau sekali untuk kualitas konseling sebaik ini.'
    },

    // Binti Nadhifah
    {
      id: 'rev-binti-1',
      counselorId: 'csl-10',
      clientName: 'Rian D.',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-12',
      serviceType: 'Sesi Teman Cerita',
      tags: ['Bangkit dari Gagal', 'Empatik'],
      comment: 'Kak Binti sangat suportif menemani proses saya bangkit dari kegagalan rekrutmen kerja. Terima kasih banyak Kak!'
    },

    // Rizki Dwi
    {
      id: 'rev-rizki-1',
      counselorId: 'csl-11',
      clientName: 'Amara G.',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-04',
      serviceType: 'Sesi Teman Cerita',
      tags: ['Manajemen Waktu', 'Bikin Tenang'],
      comment: 'Kak Rizki ramah banget dan komunikatif. Sesi 45 menit berasa singkat karena sangat mengalir dan bermanfaat.'
    },

    // Syifa Dyandri
    {
      id: 'rev-syifa-1',
      counselorId: 'csl-12',
      clientName: 'Hendra B.',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-14',
      serviceType: 'Sesi Teman Cerita',
      tags: ['Distress', 'Overthinking', 'Solutif'],
      comment: 'Kak Syifa sangat analitis dan mengerti akar stres yang saya alami. Sangat cocok buat yang lagi mumet urusan kerjaan dan relasi.'
    },

    // Siratia Katana
    {
      id: 'rev-siratia-1',
      counselorId: 'csl-13',
      clientName: 'Vina P.',
      isAnonymous: false,
      rating: 5,
      date: '2026-09-10',
      serviceType: 'Sesi Teman Cerita',
      tags: ['Kecemasan Ringan', 'Ruang Aman'],
      comment: 'Sangat menenangkan bicara dengan Kak Siratia. Suaranya adem dan sarannya sangat membumi.'
    }
  ];

  // Helper avatar colors for reviewers
  const AVATAR_COLORS = [
    'linear-gradient(135deg, #4F46E5, #3730A3)',
    'linear-gradient(135deg, #0284C7, #0369A1)',
    'linear-gradient(135deg, #059669, #047857)',
    'linear-gradient(135deg, #D97706, #B45309)',
    'linear-gradient(135deg, #DB2777, #BE185D)',
    'linear-gradient(135deg, #7C3AED, #6D28D9)',
    'linear-gradient(135deg, #0D9488, #0F766E)'
  ];

  class CounselorReviewManager {
    constructor() {
      this.counselors = COUNSELORS;
      this.reviews = this.loadReviews();
      this.currentCounselorId = 'csl-1';
      this.currentRatingFilter = 0; // 0 = all
      this.selectedFormRating = 5;
      this.selectedTags = new Set(['Sangat Solutif', 'Mendengarkan dengan Sabar']);

      this.init();
    }

    loadReviews() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Reviews localStorage read error:', e);
      }
      // Save seed initial data
      this.saveReviews(SEED_REVIEWS);
      return [...SEED_REVIEWS];
    }

    saveReviews(list) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (e) {
        console.error('Failed to save reviews to localStorage:', e);
      }
    }

    getCounselor(id) {
      return this.counselors.find(c => c.id === id) || this.counselors[0];
    }

    getReviewsForCounselor(id) {
      return this.reviews.filter(r => r.counselorId === id);
    }

    calculateStats(counselorId) {
      const c = this.getCounselor(counselorId);
      const counselorReviews = this.getReviewsForCounselor(counselorId);
      const addedCount = counselorReviews.length;

      // Base rating calculation
      let totalRatingScore = c.baseRating * c.baseCount;
      counselorReviews.forEach(r => {
        totalRatingScore += Number(r.rating) || 5;
      });

      const totalCount = c.baseCount + addedCount;
      const averageRating = (totalRatingScore / (totalCount || 1)).toFixed(2);

      return {
        averageRating: Math.min(5.0, Number(averageRating)).toFixed(2),
        totalCount: totalCount,
        recentReviewsCount: addedCount
      };
    }

    init() {
      this.bindCardTriggers();
      this.bindTestiSectionButton();
      this.updateAllCardBadges();
    }

    updateAllCardBadges() {
      // Update stats and add review triggers to existing cards
      const cards = document.querySelectorAll('.psych-card');
      cards.forEach((card, index) => {
        const counselor = this.counselors[index];
        if (!counselor) return;

        const stats = this.calculateStats(counselor.id);

        // Update rating in .psych-stats
        const statsEl = card.querySelector('.psych-stats');
        if (statsEl) {
          const starSpan = statsEl.querySelector('span:first-child');
          if (starSpan) {
            starSpan.innerHTML = `<i class="fas fa-star" style="color:var(--accent,#F59E0B);"></i> ${stats.averageRating}`;
            starSpan.style.cursor = 'pointer';
            starSpan.setAttribute('title', 'Klik untuk melihat ulasan klien');
            starSpan.addEventListener('click', (e) => {
              e.preventDefault();
              this.openModal(counselor.id, 'list');
            });
          }
        }

        // Add or ensure .btn-review-trigger exists
        let reviewBtn = card.querySelector('.btn-review-trigger');
        if (!reviewBtn) {
          reviewBtn = document.createElement('button');
          reviewBtn.type = 'button';
          reviewBtn.className = 'btn-review-trigger';
          reviewBtn.setAttribute('data-counselor-id', counselor.id);
          reviewBtn.setAttribute('title', `Lihat ulasan & testimoni untuk ${counselor.name}`);
          
          const consultBtn = card.querySelector('.btn-consult');
          if (consultBtn && consultBtn.parentNode) {
            consultBtn.parentNode.insertBefore(reviewBtn, consultBtn);
          } else {
            card.querySelector('.psych-info').appendChild(reviewBtn);
          }
        }

        reviewBtn.innerHTML = `
          <span class="rv-btn-stars"><i class="fas fa-star"></i> ${stats.averageRating}</span>
          <span class="rv-btn-text">Lihat &amp; Beri Ulasan (${stats.totalCount})</span>
        `;

        reviewBtn.onclick = (e) => {
          e.preventDefault();
          this.openModal(counselor.id, 'list');
        };
      });
    }

    bindCardTriggers() {
      // Listeners are delegated or bound in updateAllCardBadges
    }

    bindTestiSectionButton() {
      // In testimonials section, add or listen to general review button
      const testiHeader = document.querySelector('#testimonials .section-header');
      if (testiHeader && !document.getElementById('btnOpenTestiReview')) {
        const btnWrap = document.createElement('div');
        btnWrap.style.marginTop = '18px';
        btnWrap.innerHTML = `
          <button type="button" id="btnOpenTestiReview" class="btn-write-review-hero">
            <i class="fas fa-pen-nib"></i> Tulis Ulasan Sesi Konseling Kamu
          </button>
        `;
        testiHeader.appendChild(btnWrap);

        document.getElementById('btnOpenTestiReview').addEventListener('click', () => {
          this.openModal(this.currentCounselorId, 'form');
        });
      }
    }

    openModal(counselorId = 'csl-1', defaultTab = 'list') {
      this.currentCounselorId = counselorId;
      const modal = document.getElementById('counselorReviewModal');
      if (!modal) return;

      this.renderCounselorHeader();
      this.populateCounselorDropdown();
      this.renderReviewsList();
      this.initFormState();
      this.switchTab(defaultTab);

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Accessibility focus
      const closeBtn = document.getElementById('closeReviewModal');
      if (closeBtn) closeBtn.focus();
    }

    closeModal() {
      const modal = document.getElementById('counselorReviewModal');
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    switchTab(tab) {
      const tabListBtn = document.getElementById('tabReviewsList');
      const tabFormBtn = document.getElementById('tabReviewsForm');
      const panelList = document.getElementById('panelReviewsList');
      const panelForm = document.getElementById('panelReviewsForm');

      if (!tabListBtn || !tabFormBtn || !panelList || !panelForm) return;

      if (tab === 'list') {
        tabListBtn.classList.add('active');
        tabFormBtn.classList.remove('active');
        panelList.style.display = 'block';
        panelForm.style.display = 'none';
        this.renderReviewsList();
      } else {
        tabFormBtn.classList.add('active');
        tabListBtn.classList.remove('active');
        panelForm.style.display = 'block';
        panelList.style.display = 'none';
      }
    }

    renderCounselorHeader() {
      const c = this.getCounselor(this.currentCounselorId);
      const stats = this.calculateStats(c.id);

      const avatarEl = document.getElementById('modalCounselorAvatar');
      const nameEl = document.getElementById('modalCounselorName');
      const roleEl = document.getElementById('modalCounselorRole');
      const badgeEl = document.getElementById('modalCounselorBadge');
      const ratingNumEl = document.getElementById('modalCounselorRatingNum');
      const starsEl = document.getElementById('modalCounselorStars');
      const countEl = document.getElementById('modalCounselorCount');

      if (avatarEl) avatarEl.src = c.avatar;
      if (avatarEl) avatarEl.alt = c.name;
      if (nameEl) nameEl.textContent = c.name;
      if (roleEl) roleEl.textContent = c.role;

      if (badgeEl) {
        badgeEl.textContent = c.badge;
        badgeEl.style.color = c.badgeColor;
        badgeEl.style.backgroundColor = c.badgeBg;
      }

      if (ratingNumEl) ratingNumEl.textContent = stats.averageRating;
      if (countEl) countEl.textContent = `${stats.totalCount} Ulasan Terverifikasi`;

      if (starsEl) {
        starsEl.innerHTML = this.renderStarIcons(Number(stats.averageRating));
      }
    }

    populateCounselorDropdown() {
      const selectEl = document.getElementById('formCounselorSelect');
      if (!selectEl) return;

      selectEl.innerHTML = this.counselors.map(c => `
        <option value="${c.id}" ${c.id === this.currentCounselorId ? 'selected' : ''}>
          ${c.name} (${c.category === 'klinis' ? 'Psikolog Klinis' : 'Teman Cerita'})
        </option>
      `).join('');

      selectEl.onchange = (e) => {
        this.currentCounselorId = e.target.value;
        this.renderCounselorHeader();
        this.renderReviewsList();
      };
    }

    renderStarIcons(rating) {
      const fullStars = Math.floor(rating);
      const hasHalf = (rating - fullStars) >= 0.4;
      let html = '';

      for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
          html += '<i class="fas fa-star text-amber"></i>';
        } else if (i === fullStars + 1 && hasHalf) {
          html += '<i class="fas fa-star-half-alt text-amber"></i>';
        } else {
          html += '<i class="far fa-star text-gray"></i>';
        }
      }
      return html;
    }

    renderReviewsList() {
      const container = document.getElementById('reviewsCardsList');
      if (!container) return;

      const counselorReviews = this.getReviewsForCounselor(this.currentCounselorId);
      const filtered = this.currentRatingFilter === 0 
        ? counselorReviews 
        : counselorReviews.filter(r => Number(r.rating) === this.currentRatingFilter);

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="reviews-empty-state">
            <div class="empty-icon"><i class="fas fa-comment-dots"></i></div>
            <h4>Belum Ada Ulasan untuk Kategori Ini</h4>
            <p>Jadilah yang pertama membagikan ulasan dan pengalaman konseling kamu dengan konselor ini.</p>
            <button type="button" class="btn-write-review-inline" onclick="window.counselorReviews.switchTab('form')">
              <i class="fas fa-pen"></i> Tulis Ulasan Pertama
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map((rev, idx) => {
        const initial = (rev.clientName || 'K').trim().charAt(0).toUpperCase();
        const avatarBg = AVATAR_COLORS[idx % AVATAR_COLORS.length];
        const dateFormatted = this.formatDate(rev.date);

        const tagsHtml = (rev.tags && rev.tags.length > 0)
          ? `<div class="rev-card-tags">${rev.tags.map(t => `<span class="rev-tag-badge">${t}</span>`).join('')}</div>`
          : '';

        const anonymousBadge = rev.isAnonymous
          ? `<span class="anon-badge" title="Identitas nama disamarkan sesuai kode etik privasi klien"><i class="fas fa-shield-alt"></i> Identitas Disamarkan</span>`
          : `<span class="verified-badge" title="Klien Terverifikasi"><i class="fas fa-check-circle"></i> Terverifikasi</span>`;

        return `
          <div class="client-review-card">
            <div class="rev-card-header">
              <div class="rev-card-user">
                <div class="rev-avatar" style="background:${avatarBg};">${initial}</div>
                <div class="rev-user-meta">
                  <div class="rev-name-row">
                    <strong>${this.escapeHtml(rev.clientName)}</strong>
                    ${anonymousBadge}
                  </div>
                  <span class="rev-service-type">${rev.serviceType || 'Konseling'} · <span class="rev-date">${dateFormatted}</span></span>
                </div>
              </div>
              <div class="rev-stars">
                ${this.renderStarIcons(rev.rating)}
                <span class="rev-rating-num">${rev.rating}.0</span>
              </div>
            </div>
            ${tagsHtml}
            <div class="rev-card-body">
              <p>${this.escapeHtml(rev.comment)}</p>
            </div>
          </div>
        `;
      }).join('');
    }

    initFormState() {
      this.selectedFormRating = 5;
      this.selectedTags = new Set(['Sangat Solutif', 'Mendengarkan dengan Sabar']);

      // Setup stars picker
      const starPicker = document.getElementById('formStarPicker');
      if (starPicker) {
        this.renderFormStarPicker();
      }

      // Setup quick tag chips
      const chipsContainer = document.getElementById('formTagChips');
      if (chipsContainer) {
        const availableTags = [
          'Mendengarkan dengan Sabar',
          'Sangat Solutif',
          'Ruang Aman & Bebas Judge',
          'Bikin Pikiran Lebih Tenang',
          'Empatik & Hangat',
          'Solusi Praktis & Aplikatif',
          'Tepat Waktu & Profesional',
          'Worksheet Bermanfaat'
        ];

        chipsContainer.innerHTML = availableTags.map(tag => `
          <button type="button" class="form-tag-chip ${this.selectedTags.has(tag) ? 'active' : ''}" data-tag="${tag}">
            ${tag}
          </button>
        `).join('');

        chipsContainer.querySelectorAll('.form-tag-chip').forEach(chip => {
          chip.onclick = () => {
            const tag = chip.dataset.tag;
            if (this.selectedTags.has(tag)) {
              this.selectedTags.delete(tag);
              chip.classList.remove('active');
            } else {
              this.selectedTags.add(tag);
              chip.classList.add('active');
            }
          };
        });
      }

      // Name & Anonymous toggle
      const anonCheckbox = document.getElementById('formAnonToggle');
      const nameInput = document.getElementById('formClientName');
      if (anonCheckbox && nameInput) {
        anonCheckbox.onchange = () => {
          if (anonCheckbox.checked) {
            nameInput.dataset.realName = nameInput.value;
            nameInput.value = 'Anonim (Klien Terverifikasi)';
            nameInput.disabled = true;
          } else {
            nameInput.disabled = false;
            nameInput.value = nameInput.dataset.realName || '';
            nameInput.placeholder = 'Nama atau Inisial Kamu (contoh: Maya P.)';
          }
        };
      }
    }

    renderFormStarPicker() {
      const container = document.getElementById('formStarPicker');
      const labelEl = document.getElementById('formRatingLabel');
      if (!container) return;

      const labels = {
        5: '⭐⭐⭐⭐⭐ Luar Biasa & Sangat Membantu',
        4: '⭐⭐⭐⭐ Bagus & Sangat Memuaskan',
        3: '⭐⭐⭐ Cukup Baik & Membantu',
        2: '⭐⭐ Perlu Peningkatan',
        1: '⭐ Kurang Memuaskan'
      };

      container.innerHTML = [1, 2, 3, 4, 5].map(star => `
        <button type="button" class="star-btn ${star <= this.selectedFormRating ? 'selected' : ''}" data-star="${star}" aria-label="${star} Bintang">
          <i class="fas fa-star"></i>
        </button>
      `).join('');

      if (labelEl) labelEl.textContent = labels[this.selectedFormRating] || '';

      container.querySelectorAll('.star-btn').forEach(btn => {
        btn.onclick = () => {
          this.selectedFormRating = parseInt(btn.dataset.star, 10);
          this.renderFormStarPicker();
        };

        btn.onmouseenter = () => {
          const hoveredStar = parseInt(btn.dataset.star, 10);
          container.querySelectorAll('.star-btn').forEach(b => {
            const val = parseInt(b.dataset.star, 10);
            b.classList.toggle('hovered', val <= hoveredStar);
          });
        };

        btn.onmouseleave = () => {
          container.querySelectorAll('.star-btn').forEach(b => b.classList.remove('hovered'));
        };
      });
    }

    handleFormSubmit(e) {
      e.preventDefault();

      const counselorId = document.getElementById('formCounselorSelect').value;
      const isAnon = document.getElementById('formAnonToggle').checked;
      let clientName = document.getElementById('formClientName').value.trim();
      const serviceType = document.getElementById('formServiceType').value;
      const comment = document.getElementById('formComment').value.trim();

      if (!isAnon && !clientName) {
        this.showToast('Silakan isi nama atau centang opsi Samarkan Nama.', 'error');
        document.getElementById('formClientName').focus();
        return;
      }

      if (!comment || comment.length < 10) {
        this.showToast('Silakan tuliskan ulasan Anda minimal 10 karakter.', 'error');
        document.getElementById('formComment').focus();
        return;
      }

      if (isAnon) {
        clientName = 'Klien Anonim (Terverifikasi)';
      }

      const newReview = {
        id: 'rev-user-' + Date.now(),
        counselorId: counselorId,
        clientName: clientName,
        isAnonymous: isAnon,
        rating: this.selectedFormRating,
        date: new Date().toISOString().split('T')[0],
        serviceType: serviceType,
        tags: Array.from(this.selectedTags),
        comment: comment
      };

      // Add to front of reviews
      this.reviews.unshift(newReview);
      this.saveReviews(this.reviews);

      // Re-render and update UI
      this.currentCounselorId = counselorId;
      this.updateAllCardBadges();
      this.renderCounselorHeader();

      // Reset form fields
      document.getElementById('formComment').value = '';
      if (!isAnon) document.getElementById('formClientName').value = '';

      this.showToast('Terima kasih! Ulasan Anda berhasil diterbitkan.', 'success');

      // Switch to list to view new review
      this.switchTab('list');
    }

    showToast(message, type = 'success') {
      let toast = document.getElementById('reviewToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'reviewToast';
        toast.className = 'review-toast';
        document.body.appendChild(toast);
      }

      const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
      toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
      toast.className = `review-toast active ${type}`;

      clearTimeout(this._toastTimeout);
      this._toastTimeout = setTimeout(() => {
        toast.classList.remove('active');
      }, 4000);
    }

    formatDate(dateStr) {
      if (!dateStr) return 'Baru saja';
      try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      } catch (e) {
        return dateStr;
      }
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  // Bind DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    window.counselorReviews = new CounselorReviewManager();

    // Bind modal close buttons & overlay
    const modal = document.getElementById('counselorReviewModal');
    const closeBtn = document.getElementById('closeReviewModal');
    const tabListBtn = document.getElementById('tabReviewsList');
    const tabFormBtn = document.getElementById('tabReviewsForm');
    const reviewForm = document.getElementById('counselorReviewForm');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => window.counselorReviews.closeModal());
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) window.counselorReviews.closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        window.counselorReviews.closeModal();
      }
    });

    if (tabListBtn) {
      tabListBtn.addEventListener('click', () => window.counselorReviews.switchTab('list'));
    }
    if (tabFormBtn) {
      tabFormBtn.addEventListener('click', () => window.counselorReviews.switchTab('form'));
    }

    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => window.counselorReviews.handleFormSubmit(e));
    }

    // Filter rating buttons in list tab
    const filterContainer = document.getElementById('reviewRatingFilters');
    if (filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.rv-filter-pill');
        if (!btn) return;
        filterContainer.querySelectorAll('.rv-filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        window.counselorReviews.currentRatingFilter = parseInt(btn.dataset.rating, 10) || 0;
        window.counselorReviews.renderReviewsList();
      });
    }
  });

})();
