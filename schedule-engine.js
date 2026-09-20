/**
 * SHINE JOURNEY / CURHATI - Dynamic Counselor Schedule & Availability Engine
 * Berdasarkan Data Resmi: JADWAL PIKET TIM CURHATI.xlsx & Jadwal Piket.xlsx
 */

(function () {
  'use strict';

  const STORAGE_OVERRIDE_KEY = 'SHINEJOURNEY_STATUS_OVERRIDE_V1';

  // Mapping Counselor ID to Excel Name Codes
  const COUNSELOR_MAPPING = {
    'csl-1': {
      id: 'csl-1',
      name: 'Wilda Nurbayani, S.Psi., M.Psi., Psikolog',
      role: 'Psikolog Klinis · STR & SIPP Aktif',
      codes: ['KONS - Wilda'],
      avatar: 'team-wilda.jpg',
      category: 'klinis'
    },
    'csl-2': {
      id: 'csl-2',
      name: 'Haura Maulidianawati, S.Psi., Psikolog',
      role: 'Psikolog Klinis · STR & SIPP Aktif',
      codes: ['KONS - Haura', 'KONS -Haura', 'Haura'],
      avatar: 'team-haura.jpg',
      category: 'klinis'
    },
    'csl-3': {
      id: 'csl-3',
      name: 'Hanifa Putri Anggraini, S.Psi., Psikolog',
      role: 'Psikolog Klinis · STR & SIPP Aktif',
      codes: ['KONS - Hanifa', 'KONS -Hanifa', 'Hanifa Putri'],
      avatar: 'team-hanifa.jpg',
      category: 'klinis'
    },
    'csl-4': {
      id: 'csl-4',
      name: 'Rasidia Nur Kinasti, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      codes: ['TC - Rasidia', 'Rasidia Nur'],
      avatar: 'team-rasidia.jpg',
      category: 'teman_cerita'
    },
    'csl-5': {
      id: 'csl-5',
      name: 'Putri Dyah Wahyupramesthi, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      codes: ['TC - Putri', 'TC - Putri Dyah'],
      avatar: 'team-putri.jpg',
      category: 'teman_cerita'
    },
    'csl-6': {
      id: 'csl-6',
      name: 'Anif Fatul Rohmah, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      codes: ['TC - Anif', 'Anif Fatul'],
      avatar: 'team-anif.jpg',
      category: 'teman_cerita'
    },
    'csl-7': {
      id: 'csl-7',
      name: 'Shabrina Rihhadatul Aisy',
      role: 'Pendengar Aktif Sebaya',
      codes: ['TC - Shabrina'],
      avatar: 'team-shabrina.jpg',
      category: 'teman_cerita'
    },
    'csl-8': {
      id: 'csl-8',
      name: 'Theresa Adelya Setyawan, S.Psi',
      role: 'PIC Edukasi Konten · Lulusan S.Psi',
      codes: ['TC - Theresa'],
      avatar: 'team-theresa.jpg',
      category: 'teman_cerita'
    },
    'csl-9': {
      id: 'csl-9',
      name: 'Annisa, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      codes: ['TC - Annisa'],
      avatar: 'team-annisa.jpg',
      category: 'teman_cerita'
    },
    'csl-10': {
      id: 'csl-10',
      name: 'Binti Nadhifah, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      codes: ['TC - Binti', 'TC - Nadhifah'],
      avatar: 'team-binti.jpg',
      category: 'teman_cerita'
    },
    'csl-11': {
      id: 'csl-11',
      name: 'Rizki Dwi Rahmadani Putri',
      role: 'Pendengar Aktif Sebaya',
      codes: ['TC - Rizki', 'TC - Rizki Dwi', 'Rizki Dwi'],
      avatar: 'team-rizki.jpg',
      category: 'teman_cerita'
    },
    'csl-12': {
      id: 'csl-12',
      name: 'Syifa Dyandri Kemaputri, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      codes: ['TC - Syifa', 'TC  - Syifa', 'KONS - Syifa', 'Syifa'],
      avatar: 'team-syifa.jpg',
      category: 'teman_cerita'
    },
    'csl-13': {
      id: 'csl-13',
      name: 'Siratia Katana, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      codes: ['TC - Siratia', 'Siratia'],
      avatar: 'team-siratia.jpg',
      category: 'teman_cerita'
    },
    'csl-14': {
      id: 'csl-14',
      name: 'Faiqotul Himmah, S.Psi',
      role: 'Pendamping Sebaya · Lulusan S.Psi',
      codes: ['TC - Faiqotul', 'Faiqotul Himmah'],
      avatar: 'team-faiqotul.jpg',
      category: 'teman_cerita'
    }
  };

  // Full weekly piket schedule extracted from JADWAL PIKET TIM CURHATI.xlsx
  const PIKET_WEEKLY_DATA = {
    "Senin": [
      { "time": "07.00 - 08.00", "staff": [] },
      { "time": "08.15 - 09.15", "staff": ["TC - Anif", "TC - Rasidia", "TC - Putri"] },
      { "time": "09.30 - 10.30", "staff": ["TC - Rasidia", "TC - Putri"] },
      { "time": "10.45 - 11.45", "staff": ["TC - Rasidia", "TC - Putri"] },
      { "time": "12.00 - 13.00", "staff": ["TC - Rasidia", "TC - Putri"] },
      { "time": "13.15 - 14.15", "staff": ["TC - Rasidia", "TC - Siratia"] },
      { "time": "14.30 - 15.30", "staff": ["TC - Rasidia", "TC - Rizki"] },
      { "time": "15.45 - 16.45", "staff": ["TC - Rasidia", "TC - Shabrina", "TC - Rizki"] },
      { "time": "17.00 - 18.00", "staff": ["TC - Annisa", "TC - Rizki"] },
      { "time": "18.15 - 19.15", "staff": ["TC  - Syifa", "TC - Rizki", "TC - Putri"] },
      { "time": "19.30 - 20.30", "staff": ["KONS - Haura", "TC - Theresa", "TC  - Syifa", "TC - Binti", "TC - Rizki"] },
      { "time": "20.45 - 21.45", "staff": ["KONS - Haura", "TC  - Syifa"] }
    ],
    "Selasa": [
      { "time": "07.00 - 08.00", "staff": [] },
      { "time": "08.15 - 09.15", "staff": ["TC - Anif", "TC - Putri Dyah", "TC - Shabrina", "TC - Rasidia"] },
      { "time": "09.30 - 10.30", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "10.45 - 11.45", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "12.00 - 13.00", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "13.15 - 14.15", "staff": ["TC - Rasidia"] },
      { "time": "14.30 - 15.30", "staff": ["TC - Rizki Dwi", "TC - Rasidia", "TC - Siratia"] },
      { "time": "15.45 - 16.45", "staff": ["TC - Rizki Dwi", "TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "17.00 - 18.00", "staff": ["KONS - Wilda", "TC - Annisa", "TC - Rizki Dwi", "KONS -Hanifa"] },
      { "time": "18.15 - 19.15", "staff": ["KONS - Wilda", "KONS - Syifa", "TC - Rizki Dwi", "TC - Putri Dyah"] },
      { "time": "19.30 - 20.30", "staff": ["KONS -Haura", "KONS - Syifa", "TC - Nadhifah", "TC - Theresa", "TC - Rizki Dwi"] },
      { "time": "20.45 - 21.45", "staff": ["KONS -Haura", "KONS - Syifa", "TC - Rizki Dwi", "TC - Theresa"] }
    ],
    "Rabu": [
      { "time": "07.00 - 08.00", "staff": [] },
      { "time": "08.15 - 09.15", "staff": ["TC - Anif", "TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "09.30 - 10.30", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "10.45 - 11.45", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "12.00 - 13.00", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "13.15 - 14.15", "staff": ["TC - Shabrina", "TC - Rasidia", "TC - Siratia"] },
      { "time": "14.30 - 15.30", "staff": ["TC - Rizki Dwi", "TC - Shabrina", "TC - Rasidia"] },
      { "time": "15.45 - 16.45", "staff": ["TC - Rizki Dwi", "TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "17.00 - 18.00", "staff": ["KONS - Wilda", "TC - Annisa", "TC - Rizki Dwi", "KONS - Hanifa"] },
      { "time": "18.15 - 19.15", "staff": ["KONS - Wilda", "KONS - Syifa", "TC - Rizki Dwi", "TC - Putri Dyah"] },
      { "time": "19.30 - 20.30", "staff": ["KONS - Haura", "TC - Nadhifah", "TC - Rizki Dwi", "TC - Theresa", "KONS - Syifa"] },
      { "time": "20.45 - 21.45", "staff": ["KONS - Haura", "TC - Rizki Dwi", "TC - Theresa", "KONS - Syifa"] }
    ],
    "Kamis": [
      { "time": "07.00 - 08.00", "staff": [] },
      { "time": "08.15 - 09.15", "staff": ["TC - Anif", "TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "09.30 - 10.30", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "10.45 - 11.45", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "12.00 - 13.00", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "13.15 - 14.15", "staff": ["TC - Rasidia", "TC - Siratia"] },
      { "time": "14.30 - 15.30", "staff": ["TC - Rizki Dwi", "TC - Rasidia"] },
      { "time": "15.45 - 16.45", "staff": ["TC - Rizki Dwi", "TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "17.00 - 18.00", "staff": ["KONS - Wilda", "TC - Annisa", "TC - Rizki Dwi", "KONS - Hanifa"] },
      { "time": "18.15 - 19.15", "staff": ["KONS - Wilda", "TC - Rizki Dwi", "TC - Putri Dyah", "KONS - Syifa"] },
      { "time": "19.30 - 20.30", "staff": ["KONS - Haura", "TC - Nadhifah", "TC - Rizki Dwi", "TC - Theresa", "KONS - Syifa"] },
      { "time": "20.45 - 21.45", "staff": ["KONS - Haura", "TC - Rizki Dwi", "TC - Theresa", "KONS - Syifa"] }
    ],
    "Jumat": [
      { "time": "07.00 - 08.00", "staff": ["TC - Rasidia"] },
      { "time": "08.15 - 09.15", "staff": ["TC - Anif", "TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "09.30 - 10.30", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "10.45 - 11.45", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "12.00 - 13.00", "staff": ["TC - Faiqotul", "TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "13.15 - 14.15", "staff": ["TC - Rasidia", "TC - Siratia"] },
      { "time": "14.30 - 15.30", "staff": ["TC - Rizki Dwi", "TC - Shabrina", "TC - Rasidia"] },
      { "time": "15.45 - 16.45", "staff": ["TC - Rizki Dwi", "TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "17.00 - 18.00", "staff": ["KONS - Wilda", "TC - Annisa", "TC - Rizki Dwi", "KONS - Hanifa"] },
      { "time": "18.15 - 19.15", "staff": ["KONS - Wilda", "TC - Putri Dyah", "TC - Rasidia", "KONS - Syifa"] },
      { "time": "19.30 - 20.30", "staff": ["KONS - Wilda", "TC - Nadhifah", "TC - Rasidia", "TC - Theresa", "KONS - Syifa"] },
      { "time": "20.45 - 21.45", "staff": ["TC - Rasidia", "TC - Theresa", "KONS - Syifa"] }
    ],
    "Sabtu": [
      { "time": "07.00 - 08.00", "staff": [] },
      { "time": "08.15 - 09.15", "staff": ["TC - Anif", "TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "09.30 - 10.30", "staff": ["TC - Nadhifah", "TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "10.45 - 11.45", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "12.00 - 13.00", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "13.15 - 14.15", "staff": ["TC - Rasidia", "KONS - Syifa", "KONS - Hanifa"] },
      { "time": "14.30 - 15.30", "staff": ["KONS - Haura", "TC - Rasidia", "KONS - Syifa", "KONS - Hanifa"] },
      { "time": "15.45 - 16.45", "staff": ["KONS - Haura", "TC - Rasidia", "KONS - Syifa", "KONS - Hanifa"] },
      { "time": "17.00 - 18.00", "staff": ["TC - Annisa", "KONS - Syifa"] },
      { "time": "18.15 - 19.15", "staff": ["TC - Putri Dyah", "KONS - Syifa", "KONS - Wilda"] },
      { "time": "19.30 - 20.30", "staff": ["TC - Shabrina", "TC - Putri Dyah", "KONS - Wilda"] },
      { "time": "20.45 - 21.45", "staff": ["TC - Putri Dyah"] }
    ],
    "Minggu": [
      { "time": "07.00 - 08.00", "staff": [] },
      { "time": "08.15 - 09.15", "staff": ["TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "09.30 - 10.30", "staff": ["TC - Nadhifah", "TC - Putri Dyah", "TC - Rasidia"] },
      { "time": "10.45 - 11.45", "staff": ["TC - Annisa", "TC - Putri Dyah", "TC - Rasidia", "KONS - Hanifa"] },
      { "time": "12.00 - 13.00", "staff": ["TC - Putri Dyah", "TC - Rasidia", "KONS - Hanifa"] },
      { "time": "13.15 - 14.15", "staff": ["TC - Rasidia", "KONS - Syifa"] },
      { "time": "14.30 - 15.30", "staff": ["TC - Rasidia", "KONS - Syifa"] },
      { "time": "15.45 - 16.45", "staff": ["TC - Rasidia", "TC - Putri Dyah", "KONS - Syifa"] },
      { "time": "17.00 - 18.00", "staff": ["TC - Shabrina", "KONS - Syifa"] },
      { "time": "18.15 - 19.15", "staff": ["TC - Putri Dyah", "KONS - Syifa"] },
      { "time": "19.30 - 20.30", "staff": ["TC - Putri Dyah", "TC - Theresa", "KONS - Hanifa"] },
      { "time": "20.45 - 21.45", "staff": ["TC - Putri Dyah", "TC - Theresa", "KONS - Hanifa"] }
    ]
  };

  const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  class ScheduleManager {
    constructor() {
      this.mapping = COUNSELOR_MAPPING;
      this.piketData = PIKET_WEEKLY_DATA;
      this.overrides = this.loadOverrides();
      this.init();
    }

    loadOverrides() {
      try {
        const stored = localStorage.getItem(STORAGE_OVERRIDE_KEY);
        return stored ? JSON.parse(stored) : {};
      } catch (e) {
        return {};
      }
    }

    saveOverrides() {
      try {
        localStorage.setItem(STORAGE_OVERRIDE_KEY, JSON.stringify(this.overrides));
      } catch (e) {
        console.error('Failed to save status overrides:', e);
      }
    }

    // Set manual status by Psychologist or Admin
    setStatusOverride(counselorId, status) {
      // status: 'AUTO' | 'ONLINE' | 'BUSY' | 'OFFLINE'
      if (status === 'AUTO') {
        delete this.overrides[counselorId];
      } else {
        this.overrides[counselorId] = {
          status: status,
          updatedAt: new Date().toISOString()
        };
      }
      this.saveOverrides();
      this.updateAllCardStatuses();
    }

    // Get live status for a counselor
    getCounselorStatus(counselorId) {
      // 1. Check manual override first
      const override = this.overrides[counselorId];
      if (override && override.status && override.status !== 'AUTO') {
        if (override.status === 'ONLINE') {
          return {
            state: 'online',
            label: '● Tersedia Sekarang',
            badgeClass: 'status-online',
            isPiket: true,
            note: 'Tersedia untuk sesi & konsultasi langsung'
          };
        }
        if (override.status === 'BUSY') {
          return {
            state: 'busy',
            label: '● Sedang Dalam Sesi',
            badgeClass: 'status-busy',
            isPiket: true,
            note: 'Sedang mendampingi klien'
          };
        }
        if (override.status === 'OFFLINE') {
          return {
            state: 'offline',
            label: '○ Sesuai Janji Temu',
            badgeClass: 'status-offline',
            isPiket: false,
            note: 'Konsultasi via reservasi jadwal'
          };
        }
      }

      // 2. Automatic evaluation based on Piket Excel Schedule
      const counselor = this.mapping[counselorId];
      if (!counselor) {
        return {
          state: 'offline',
          label: '○ Sesuai Janji Temu',
          badgeClass: 'status-offline',
          isPiket: false,
          note: 'Reservasi jadwal'
        };
      }

      const now = new Date();
      // WIB Time (UTC+7)
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const wibDate = new Date(utc + (3600000 * 7));

      const dayName = DAY_NAMES[wibDate.getDay()];
      const currentHours = wibDate.getHours();
      const currentMinutes = wibDate.getMinutes();
      const currentDec = currentHours + (currentMinutes / 60);

      const todaySlots = this.piketData[dayName] || [];
      let isDutyNow = false;
      let activeSlot = null;

      for (const slot of todaySlots) {
        const [startStr, endStr] = slot.time.split('-').map(s => s.trim());
        const [sh, sm] = startStr.split('.').map(Number);
        const [eh, em] = endStr.split('.').map(Number);
        const startDec = sh + (sm / 60);
        const endDec = eh + (em / 60);

        if (currentDec >= startDec && currentDec <= endDec) {
          // In this slot, check if counselor is assigned
          const matches = slot.staff.some(s => counselor.codes.some(c => s.includes(c)));
          if (matches) {
            isDutyNow = true;
            activeSlot = slot.time;
            break;
          }
        }
      }

      if (isDutyNow) {
        return {
          state: 'online',
          label: '● Bertugas Sekarang',
          badgeClass: 'status-online',
          isPiket: true,
          slot: activeSlot,
          note: `Jadwal piket aktif hari ini (${activeSlot} WIB)`
        };
      }

      // Find next piket slot
      const nextShift = this.findNextShift(counselorId, dayName, currentDec);
      return {
        state: 'offline',
        label: nextShift ? `Piket: ${nextShift.day} ${nextShift.time.split('-')[0].trim()}` : '○ Sesuai Janji Temu',
        badgeClass: 'status-offline',
        isPiket: false,
        nextShift: nextShift,
        note: nextShift ? `Piket berikutnya: ${nextShift.day}, ${nextShift.time} WIB` : 'Konsultasi sesuai kesepakatan jadwal'
      };
    }

    findNextShift(counselorId, currentDayName, currentDec) {
      const counselor = this.mapping[counselorId];
      if (!counselor) return null;

      const dayOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
      const startIndex = dayOrder.indexOf(currentDayName);

      // 1. Check later today
      const todaySlots = this.piketData[currentDayName] || [];
      for (const slot of todaySlots) {
        const [startStr] = slot.time.split('-').map(s => s.trim());
        const [sh, sm] = startStr.split('.').map(Number);
        if ((sh + sm / 60) > currentDec) {
          if (slot.staff.some(s => counselor.codes.some(c => s.includes(c)))) {
            return { day: 'Hari Ini', time: slot.time };
          }
        }
      }

      // 2. Check next days
      for (let i = 1; i <= 6; i++) {
        const nextDay = dayOrder[(startIndex + i) % 7];
        const slots = this.piketData[nextDay] || [];
        for (const slot of slots) {
          if (slot.staff.some(s => counselor.codes.some(c => s.includes(c)))) {
            return { day: nextDay, time: slot.time };
          }
        }
      }

      return null;
    }

    getAllShiftsForCounselor(counselorId) {
      const counselor = this.mapping[counselorId];
      if (!counselor) return {};

      const result = {};
      const dayOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

      dayOrder.forEach(day => {
        const slots = this.piketData[day] || [];
        const counselorSlots = slots.filter(slot => 
          slot.staff.some(s => counselor.codes.some(c => s.includes(c)))
        );
        if (counselorSlots.length > 0) {
          result[day] = counselorSlots.map(s => s.time);
        }
      });

      return result;
    }

    updateAllCardStatuses() {
      const cards = document.querySelectorAll('.psych-card');
      cards.forEach((card, idx) => {
        const cslId = card.getAttribute('data-counselor-id') || `csl-${idx + 1}`;
        const statusEl = card.querySelector('.psych-status');
        if (!statusEl) return;

        const info = this.getCounselorStatus(cslId);

        statusEl.className = `psych-status csl-status-badge ${info.badgeClass}`;
        statusEl.setAttribute('title', info.note + ' (Klik untuk lihat jadwal lengkap)');
        statusEl.innerHTML = `<span class="status-dot">●</span> <span class="status-text">${info.label}</span>`;
        statusEl.style.cursor = 'pointer';

        statusEl.onclick = (e) => {
          e.preventDefault();
          this.openScheduleModal(cslId);
        };
      });
    }

    openScheduleModal(counselorId) {
      const counselor = this.mapping[counselorId];
      if (!counselor) return;

      const shifts = this.getAllShiftsForCounselor(counselorId);
      const currentStatus = this.getCounselorStatus(counselorId);

      let modal = document.getElementById('counselorScheduleModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'counselorScheduleModal';
        modal.className = 'counselor-schedule-modal-overlay';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        document.body.appendChild(modal);
      }

      const dayOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
      let shiftsHtml = '';

      dayOrder.forEach(day => {
        const dayShifts = shifts[day];
        if (dayShifts && dayShifts.length > 0) {
          shiftsHtml += `
            <div class="schedule-day-row">
              <div class="sched-day-name"><i class="far fa-calendar-check"></i> <strong>${day}</strong></div>
              <div class="sched-slots-pills">
                ${dayShifts.map(s => `<span class="sched-slot-pill"><i class="far fa-clock"></i> ${s} WIB</span>`).join('')}
              </div>
            </div>
          `;
        }
      });

      if (!shiftsHtml) {
        shiftsHtml = `
          <div class="schedule-empty-info">
            <p>Jadwal konseling untuk beliau fleksibel sesuai dengan kesepakatan janji temu (appointment based). Silakan hubungi admin untuk reservasi waktu yang sesuai.</p>
          </div>
        `;
      }

      // Check current role in window to show manual override control for psychologist/admin
      const canOverride = true; // Enabled for intuitive testing & operational control
      const overrideStatus = (this.overrides[counselorId] && this.overrides[counselorId].status) || 'AUTO';

      modal.innerHTML = `
        <div class="schedule-modal-card">
          <div class="schedule-modal-header">
            <div class="sched-csl-info">
              <img src="${counselor.avatar}" alt="${counselor.name}" class="sched-csl-img">
              <div>
                <div class="sched-csl-status-row">
                  <span class="psych-status ${currentStatus.badgeClass}" style="position:static; margin-bottom:4px; display:inline-flex;">
                    <span class="status-dot">●</span> ${currentStatus.label}
                  </span>
                </div>
                <h3>${counselor.name}</h3>
                <p>${counselor.role}</p>
              </div>
            </div>
            <button type="button" class="btn-close-modal" id="closeScheduleModal" aria-label="Tutup"><i class="fas fa-times"></i></button>
          </div>

          <div class="schedule-modal-body">
            <!-- Fast Status Override Controls (Untuk Psikolog & Admin) -->
            <div class="schedule-override-box">
              <div class="override-header">
                <span><i class="fas fa-toggle-on"></i> Pengaturan Status Ketersediaan (Psikolog / Admin)</span>
                <span class="override-tooltip" title="Dapat diubah oleh konselor atau admin operasional">Live Override</span>
              </div>
              <div class="override-btn-group" id="schedOverrideGroup">
                <button type="button" class="btn-override ${overrideStatus === 'AUTO' ? 'active' : ''}" data-val="AUTO">
                  <i class="fas fa-sync-alt"></i> Otomatis (Jadwal Piket)
                </button>
                <button type="button" class="btn-override ${overrideStatus === 'ONLINE' ? 'active' : ''}" data-val="ONLINE">
                  <i class="fas fa-circle text-emerald"></i> Online Sekarang
                </button>
                <button type="button" class="btn-override ${overrideStatus === 'BUSY' ? 'active' : ''}" data-val="BUSY">
                  <i class="fas fa-clock text-amber"></i> Sedang Sesi
                </button>
                <button type="button" class="btn-override ${overrideStatus === 'OFFLINE' ? 'active' : ''}" data-val="OFFLINE">
                  <i class="fas fa-moon text-gray"></i> Istirahat / Offline
                </button>
              </div>
            </div>

            <h4 class="schedule-section-title"><i class="fas fa-calendar-alt"></i> Jadwal Piket Pelayanan Mingguan (Excel Piket)</h4>
            <div class="schedule-days-list">
              ${shiftsHtml}
            </div>

            <div class="schedule-modal-notice">
              <i class="fas fa-info-circle"></i>
              <span>Di luar jam piket bertugas, sesi konseling tetap dapat dijadwalkan melalui konfirmasi admin WhatsApp atau formulir pendaftaran.</span>
            </div>
          </div>

          <div class="schedule-modal-footer">
            <a href="https://wa.me/6283187689054?text=Halo%20Admin%20Curhati%20Shine%20Journey%2C%20saya%20ingin%20booking%20sesi%20konseling%20dengan%20${encodeURIComponent(counselor.name)}." class="btn-consult-wa" target="_blank" rel="noopener">
              <i class="fab fa-whatsapp"></i> Booking Sesi Sekarang
            </a>
          </div>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Bind close button
      const closeBtn = document.getElementById('closeScheduleModal');
      if (closeBtn) {
        closeBtn.onclick = () => this.closeScheduleModal();
      }

      modal.onclick = (e) => {
        if (e.target === modal) this.closeScheduleModal();
      };

      // Bind override buttons
      const overrideGroup = document.getElementById('schedOverrideGroup');
      if (overrideGroup) {
        overrideGroup.querySelectorAll('.btn-override').forEach(btn => {
          btn.onclick = () => {
            const val = btn.dataset.val;
            this.setStatusOverride(counselorId, val);
            this.openScheduleModal(counselorId); // refresh modal view
          };
        });
      }
    }

    closeScheduleModal() {
      const modal = document.getElementById('counselorScheduleModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    init() {
      this.updateAllCardStatuses();
      // Auto-refresh status every 60 seconds
      setInterval(() => {
        this.updateAllCardStatuses();
      }, 60000);
    }
  }

  // Bind DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    window.counselorSchedule = new ScheduleManager();

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (window.counselorSchedule) window.counselorSchedule.closeScheduleModal();
      }
    });
  });

})();
