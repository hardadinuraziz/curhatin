/**
 * ShineBot - Asisten AI Kesehatan Mental & Navigasi Layanan Shine Journey
 * Didesain berdasarkan SOP & Pedoman Operasional Shine Journey
 */

(function () {
    'use strict';

    // State
    const STORAGE_KEY = 'SHINE_AI_CHAT_HISTORY_V1';
    let chatHistory = [];
    let isTyping = false;
    let isOpen = false;

    // Hotline Krisis Resmi
    const CRISIS_HOTLINE = '119 (ext 8)';
    const CRISIS_NAME = 'Layanan Sejiwa (Kemenkes RI)';
    const WA_ADMIN_URL = 'https://wa.me/6283187689054?text=Halo%20Admin%20Curhati%20Shine%20Journey%2C%20saya%20terhubung%20dari%20ShineBot%20AI%20dan%20ingin%20konsultasi.';
    const FORM_KONSELING_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf-Lup7Z74Dd1eddDma7gJqNmDoeHIExh-H4OqjgHR91qHRDg/viewform';
    const FORM_ASESMEN_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSehgHva1vLIceGe1PwkPy9NkIKkRSItkMRY26ZfPcxxrRtbQQ/viewform';

    // Inisialisasi Pesan Awal
    const INITIAL_BOT_MESSAGE = {
        id: 'msg-welcome',
        sender: 'bot',
        text: 'Halo! Saya **ShineBot**, asisten virtual Shine Journey. 🌿\n\nDi sini Anda berada di **ruang aman dan bebas penghakiman**. Anda bisa curhat tentang hal yang sedang mengganjal, mencari rekomendasi pendamping yang tepat, atau bertanya seputar layanan kami.\n\nApa yang sedang Anda rasakan hari ini?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: [
            '💬 Mau curhat masalah overthinking',
            '🩺 Bedanya Teman Cerita vs Psikolog?',
            '💰 Berapa biaya konseling & cara daftar?',
            '📋 Rekomendasi tes psikologi / asesmen',
            '🧘 Butuh latihan relaksasi pernapasan'
        ]
    };

    // Load riwayat dari local storage
    function loadHistory() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.warn('Gagal memuat riwayat chat:', e);
        }
        return [INITIAL_BOT_MESSAGE];
    }

    // Simpan riwayat
    function saveHistory() {
        try {
            const trimmed = chatHistory.slice(-40);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
        } catch (e) {
            console.warn('Gagal menyimpan riwayat chat:', e);
        }
    }

    // Engine Penjawab AI Empatis & Triage Klinis
    function generateAIResponse(userText) {
        const lower = userText.toLowerCase().trim();

        // 1. DETEKSI KRISIS / KEADAAN DARURAT (SAFETY FIRST)
        const crisisKeywords = [
            'bunuh diri', 'suicide', 'ingin mati', 'pengen mati', 'mau mati', 
            'akhiri hidup', 'mengakhiri hidup', 'self harm', 'melukai diri', 
            'sayat tangan', 'loncat', 'minum racun', 'gantung diri', 'gak sanggup hidup'
        ];
        if (crisisKeywords.some(k => lower.includes(k))) {
            return {
                text: '🚨 **Pesan Penting untuk Keselamatan Anda**\n\nKami mendengar betapa berat dan menyakitkannya rasa yang sedang Anda tanggung saat ini. Namun, **hidup Anda sangat berharga** dan Anda tidak harus menghadapinya seorang diri.\n\nKarena ini merupakan situasi darurat, mohon segera hubungi bantuan profesional krisis yang siaga 24 jam:\n\n• **Hotline Sejiwa Kemenkes**: Tekan **119 ext 8** (Bebas pulsa)\n• **Telepon Sahabat Peduli**: (021) 500-454\n• **Kontak Darurat Shine Journey**: Klik tombol di bawah untuk terhubung prioritas dengan tim kami.\n\n*Tolong bicarakan dengan seseorang yang Anda percayai sekarang juga.* 💙',
                isCrisis: true,
                actions: [
                    { label: '📞 Panggil Hotline 119 ext 8', url: 'tel:119,8', primary: true, isTel: true },
                    { label: '💬 WhatsApp Tim Prioritas', url: 'https://wa.me/6283187689054?text=EMERGENCY%3A%20Saya%20sedang%20dalam%20krisis%20dan%20memerlukan%20bantuan%20segera.', primary: false }
                ]
            };
        }

        // 2. LATIHAN PERNAPASAN / RELAKSASI
        if (lower.includes('pernapasan') || lower.includes('napas') || lower.includes('relaksasi') || lower.includes('panik') || lower.includes('tenang') || lower.includes('calming')) {
            return {
                text: 'Mari kita perlambat ritme sejenak bersama-sama. Coba **Teknik Pernapasan 4-7-8** ini:\n\n1. **Tarik napas** perlahan melalui hidung selama **4 detik** 🌬️\n2. **Tahan napas** dengan nyaman selama **7 detik** ⏳\n3. **Hembuskan napas** perlahan melalui mulut selama **8 detik** 🍃\n\n*Ulangi siklus ini 3–4 kali.* Rasakan bahu Anda mulai turun dan tubuh perlahan lebih rileks.\n\nJika rasa cemas masih mengganggu, tim konselor kami selalu siap menemani sesi Anda.',
                actions: [
                    { label: '💬 Curhat ke Teman Cerita (Rp 50k)', url: WA_ADMIN_URL, primary: true },
                    { label: '📋 Coba Asesmen Cemas (DASS-21)', url: '#self-assessment', primary: false, isScroll: true }
                ]
            };
        }

        // 3. OVERTHINKING, STRES, CEMAS, BURNOUT (CURHAT EMOSIONAL)
        if (lower.includes('overthinking') || lower.includes('cemas') || lower.includes('anxiety') || lower.includes('stres') || lower.includes('stress') || lower.includes('burnout') || lower.includes('capek') || lower.includes('lelah') || lower.includes('insecure') || lower.includes('skripsi') || lower.includes('kuliah') || lower.includes('kerja')) {
            return {
                text: 'Terima kasih sudah mau berbagi apa yang Anda rasakan. Merasa lelah, cemas, atau terjebak dalam pusaran *overthinking* adalah hal yang wajar dan sangat manusiawi, apalagi ketika banyak tuntutan datang bersamaan. 🤍\n\nIngat bahwa **Anda tidak perlu memikirkan semuanya sekaligus saat ini**. Yang bisa kita kendalikan hanyalah langkah kecil di depan mata.\n\nUntuk membantu meringankan beban pikiran ini, Anda bisa:\n• Menguraikan uneg-uneg secara santai bersama **Teman Cerita** (Rp 50.000/sesi).\n• Atau berkonsultasi dengan **Psikolog Klinis** kami jika rasa cemas ini mulai mengganggu tidur atau nafsu makan Anda.',
                actions: [
                    { label: '💬 Chat Teman Cerita Sekarang', url: WA_ADMIN_URL, primary: true },
                    { label: '🩺 Lihat Profil Psikolog & Tim', url: '#psychologists', primary: false, isScroll: true }
                ]
            };
        }

        // 4. PERBEDAAN TEMAN CERITA VS PSIKOLOG
        if (lower.includes('beda') || lower.includes('teman cerita vs') || (lower.includes('psikolog') && (lower.includes('teman') || lower.includes('cerita') || lower.includes('pilih')))) {
            return {
                text: 'Pertanyaan bagus! Sesuai Buku Panduan Operasional Shine Journey, ini perbedaannya:\n\n🤝 **Teman Cerita (Peer Counselor)**:\n• **Pelaksana**: Lulusan Sarjana Psikologi (S.Psi) terlatih.\n• **Fokus**: Menjadi pendengar aktif tanpa penghakiman, curhat masalah harian, stres kuliah/kerja ringan, quarter-life crisis, atau kesepian.\n• **Biaya**: Rp 50.000 / sesi (45 menit).\n\n🩺 **Psikolog Klinis (Profesional)**:\n• **Pelaksana**: Psikolog berlisensi resmi dengan STR & SIPP aktif (HIMPSI).\n• **Fokus**: Menangani depresi, trauma mendalam, gangguan kecemasan akut, evaluasi klinis, dan psikoterapi (CBT, dll).\n• **Biaya**: Rp 165.000 – Rp 175.000 / sesi (60 menit).\n\nAnda merasa kondisi Anda lebih condong ke yang mana saat ini?',
                actions: [
                    { label: 'Daftar Teman Cerita (S.Psi)', url: FORM_KONSELING_URL, primary: true },
                    { label: 'Konsultasi Psikolog Klinis', url: WA_ADMIN_URL, primary: false }
                ]
            };
        }

        // 5. ASESMEN PSIKOLOGI / TES
        if (lower.includes('tes') || lower.includes('asesmen') || lower.includes('assessment') || lower.includes('minat') || lower.includes('bakat') || lower.includes('kepribadian') || lower.includes('iq') || lower.includes('dass')) {
            return {
                text: 'Layanan **Asesmen Psikologi Resmi** Shine Journey menggunakan instrumen psikometri terstandarisasi yang diawasi langsung oleh psikolog berizin. 📊\n\nBeberapa tes populer kami:\n• **Tes Kepribadian (16PF / MBTI / DISC / Big Five)**: Rp 200.000\n• **Tes Kecerdasan & Sikap Kerja (CFIT / IST / Kraepelin)**: Rp 200.000\n• **Tes Minat & Bakat Karir (Holland RIASEC / RMIB)**: Rp 200.000\n• **Asesmen Potensi Komprehensif**: Rp 350.000\n• **Screening DASS-21 Mandiri**: Gratis di website!\n\nSeluruh hasil tes dilengkapi dengan lembar laporan resmi.',
                actions: [
                    { label: '📋 Buka Formulir Pendaftaran Asesmen', url: FORM_ASESMEN_URL, primary: true },
                    { label: '📊 Lihat Daftar Lengkap Pricelist', url: '#assessment', primary: false, isScroll: true }
                ]
            };
        }

        // 6. HARGA & CARA DAFTAR / BIAYA
        if (lower.includes('harga') || lower.includes('biaya') || lower.includes('tarif') || lower.includes('daftar') || lower.includes('booking') || lower.includes('jadwal') || lower.includes('bayar') || lower.includes('sop')) {
            return {
                text: 'Pendaftaran layanan di Shine Journey sangat mudah melalui **5 Langkah SOP Resmi**:\n\n1. **Isi Formulir**: Pilih jenis layanan dan isi data diri (anonim diperbolehkan untuk nama curhat).\n2. **Verifikasi**: Sistem mencatat jadwal dan keluhan utama secara privat.\n3. **Penugasan**: PIC menugaskan konselor yang paling tepat untuk masalah Anda.\n4. **Konfirmasi & Pembayaran**: Pembayaran aman via transfer bank / QRIS.\n5. **Sesi Berlangsung**: Konseling online privat via Chat / Voice Call.\n\n💰 **Biaya Layanan**:\n• Teman Cerita: Rp 50.000 / sesi\n• Psikolog Klinis: Rp 165.000 – Rp 175.000 / sesi',
                actions: [
                    { label: '📝 Formulir Konseling Online', url: FORM_KONSELING_URL, primary: true },
                    { label: '💬 Tanya Jadwal via WhatsApp', url: WA_ADMIN_URL, primary: false }
                ]
            };
        }

        // 7. SAPAAN / GREETING UMUM
        if (lower.includes('halo') || lower.includes('hai') || lower.includes('hi') || lower.includes('pagi') || lower.includes('siang') || lower.includes('sore') || lower.includes('malam') || lower.includes('assalam')) {
            return {
                text: 'Halo! Senang sekali Anda berkunjung ke Shine Journey. 🌸\n\nKesehatan mental Anda sama pentingnya dengan kesehatan fisik. Apakah ada hal yang sedang membuat Anda merasa terbebani, atau ingin mencari informasi layanan konseling & asesmen kami?',
                chips: [
                    '💬 Mau curhat uneg-uneg',
                    '🩺 Rekomendasi psikolog klinis',
                    '📋 Ingin ikut tes asesmen',
                    '💰 Info tarif & jadwal layanan'
                ]
            };
        }

        // 8. DEFAULT EMPATHIC FALLBACK
        return {
            text: 'Terima kasih telah bercerita kepada saya. Kami di Shine Journey percaya bahwa setiap perasaan yang Anda rasakan itu valid dan berharga untuk didengarkan. 🌿\n\nUntuk mendiskusikan hal ini lebih mendalam dan mendapatkan panduan yang lebih personal, kami sangat menyarankan untuk berbicara langsung dengan **Teman Cerita (S.Psi)** atau **Psikolog Klinis** kami secara privat.',
            actions: [
                { label: '💬 Konsultasi via WhatsApp (Admin)', url: WA_ADMIN_URL, primary: true },
                { label: '📝 Isi Form Konseling Resmi', url: FORM_KONSELING_URL, primary: false }
            ],
            chips: [
                '💬 Mau latihan pernapasan',
                '🩺 Bedanya Teman Cerita vs Psikolog',
                '💰 Cara pendaftaran konseling'
            ]
        };
    }

    // Format teks markdown sederhana (bold, list, newline)
    function formatMessageText(text) {
        if (!text) return '';
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
        return formatted;
    }

    // Render pesan ke chat container
    function renderMessages() {
        const container = document.getElementById('aiChatMessages');
        if (!container) return;

        container.innerHTML = '';

        chatHistory.forEach((msg, idx) => {
            const row = document.createElement('div');
            row.className = `ai-msg-row ${msg.sender === 'user' ? 'ai-user' : 'ai-bot'}`;

            const avatarHtml = msg.sender === 'bot' 
                ? `<div class="ai-avatar-badge"><i class="fas fa-robot"></i></div>` 
                : `<div class="ai-avatar-badge user"><i class="fas fa-user"></i></div>`;

            let bubbleContent = `
                <div class="ai-bubble ${msg.isCrisis ? 'ai-crisis-bubble' : ''}">
                    <div class="ai-bubble-text">${formatMessageText(msg.text)}</div>
            `;

            // Render Actions Button jika ada
            if (msg.actions && msg.actions.length > 0) {
                bubbleContent += `<div class="ai-action-buttons">`;
                msg.actions.forEach(action => {
                    const primaryClass = action.primary ? 'primary' : 'secondary';
                    if (action.isScroll) {
                        bubbleContent += `<a href="${action.url}" class="ai-action-btn ${primaryClass}" onclick="window.shineChatbotCloseModal()">${action.label}</a>`;
                    } else if (action.isTel) {
                        bubbleContent += `<a href="${action.url}" class="ai-action-btn ${primaryClass} emergency">${action.label}</a>`;
                    } else {
                        bubbleContent += `<a href="${action.url}" target="_blank" rel="noopener" class="ai-action-btn ${primaryClass}">${action.label}</a>`;
                    }
                });
                bubbleContent += `</div>`;
            }

            // Render Chips jika ada dan pesan terakhir
            if (msg.chips && msg.chips.length > 0 && idx === chatHistory.length - 1 && !isTyping) {
                bubbleContent += `<div class="ai-chips-list">`;
                msg.chips.forEach(chip => {
                    bubbleContent += `<button type="button" class="ai-chip-item" onclick="window.shineChatbotSendPrompt('${chip.replace(/'/g, "\\'")}')">${chip}</button>`;
                });
                bubbleContent += `</div>`;
            }

            bubbleContent += `<span class="ai-msg-time">${msg.timestamp || ''}</span></div>`;

            row.innerHTML = avatarHtml + bubbleContent;
            container.appendChild(row);
        });

        // Typing indicator
        if (isTyping) {
            const typingRow = document.createElement('div');
            typingRow.className = 'ai-msg-row ai-bot';
            typingRow.innerHTML = `
                <div class="ai-avatar-badge"><i class="fas fa-robot"></i></div>
                <div class="ai-bubble ai-typing-bubble">
                    <span class="ai-dot"></span>
                    <span class="ai-dot"></span>
                    <span class="ai-dot"></span>
                </div>
            `;
            container.appendChild(typingRow);
        }

        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    // Kirim pesan pengguna
    function handleUserSend(text) {
        if (!text || !text.trim() || isTyping) return;

        const cleanText = text.trim();
        const userMsg = {
            id: 'msg-' + Date.now(),
            sender: 'user',
            text: cleanText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        chatHistory.push(userMsg);
        saveHistory();
        renderMessages();

        // Tampilkan animasi mengetik
        isTyping = true;
        renderMessages();

        // Simulasi respon AI (500 - 800 ms agar natural)
        setTimeout(() => {
            const aiResp = generateAIResponse(cleanText);
            const botMsg = {
                id: 'msg-' + Date.now(),
                sender: 'bot',
                text: aiResp.text,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actions: aiResp.actions || null,
                chips: aiResp.chips || null,
                isCrisis: aiResp.isCrisis || false
            };

            isTyping = false;
            chatHistory.push(botMsg);
            saveHistory();
            renderMessages();
        }, 650);
    }

    // Buka / Tutup Modal Chatbot
    function toggleChat(forceOpen) {
        const modal = document.getElementById('aiChatModal');
        const fab = document.getElementById('aiChatFab');
        if (!modal || !fab) return;

        if (typeof forceOpen === 'boolean') {
            isOpen = forceOpen;
        } else {
            isOpen = !isOpen;
        }

        if (isOpen) {
            modal.classList.add('active');
            fab.classList.add('open');
            const input = document.getElementById('aiChatInput');
            if (input && window.innerWidth > 640) {
                setTimeout(() => input.focus(), 150);
            }
            renderMessages();
        } else {
            modal.classList.remove('active');
            fab.classList.remove('open');
        }
    }

    // Reset Chat
    function clearChat() {
        if (confirm('Hapus seluruh riwayat percakapan dengan ShineBot?')) {
            chatHistory = [INITIAL_BOT_MESSAGE];
            saveHistory();
            renderMessages();
        }
    }

    // Pasang Event Listeners
    function initEvents() {
        chatHistory = loadHistory();

        const fab = document.getElementById('aiChatFab');
        const closeBtn = document.getElementById('aiChatClose');
        const clearBtn = document.getElementById('aiChatClear');
        const form = document.getElementById('aiChatForm');
        const input = document.getElementById('aiChatInput');

        if (fab) {
            fab.addEventListener('click', () => toggleChat());
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', () => toggleChat(false));
        }
        if (clearBtn) {
            clearBtn.addEventListener('click', clearChat);
        }

        if (form && input) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const text = input.value;
                input.value = '';
                handleUserSend(text);
            });
        }

        // Tampilkan pesan pertama
        renderMessages();
    }

    // Ekspos fungsi global untuk interaksi inline
    window.shineChatbotSendPrompt = function (text) {
        handleUserSend(text);
    };

    window.shineChatbotCloseModal = function () {
        toggleChat(false);
    };

    window.shineChatbotOpen = function () {
        toggleChat(true);
    };

    // Jalankan saat DOM siap
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEvents);
    } else {
        initEvents();
    }

})();
