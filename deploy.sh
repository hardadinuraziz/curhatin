#!/usr/bin/env bash
# ==============================================================================
# Shine Journey / Curhati — CLI Server Deployment Helper Script
# ==============================================================================
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "=========================================================="
echo " 🚀 Shine Journey — CLI Server Deployment"
echo "=========================================================="

# 1. Update archive public_html.zip
echo "📦 1. Mengemas berkas terbaru ke public_html.zip..."
zip -FSr public_html.zip . -x "*.git*" "backend/*" "node_modules/*" ".DS_Store" > /dev/null
echo "   ✅ public_html.zip siap diunggah ($(du -h public_html.zip | cut -f1))."
echo ""

# 2. Pilihan Metode Deployment
echo "Pilih metode upload ke server:"
echo "1) SSH / SCP (Upload public_html.zip & auto-unzip di server)"
echo "2) Rsync over SSH (Sinkronisasi berkas langsung tanpa zip)"
echo "3) FTP / FTPS via curl (Bawaan macOS, tanpa SSH)"
echo "4) Keluar"
echo ""

read -rp "Masukkan pilihan [1-4]: " CHOICE

case "$CHOICE" in
    1)
        echo ""
        echo "--- Upload via SCP (SSH) ---"
        read -rp "Host / IP Server (misal: 103.xxx.xxx atau domain.com): " HOST
        read -rp "Username SSH: " USER
        read -rp "Port SSH (tekan Enter untuk 22): " PORT
        PORT="${PORT:-22}"
        read -rp "Remote Path (tekan Enter untuk /home/$USER/public_html): " REMOTEPATH
        REMOTEPATH="${REMOTEPATH:-/home/$USER/public_html}"

        echo ""
        echo "🚀 Mengunggah public_html.zip ke $USER@$HOST:$REMOTEPATH..."
        scp -P "$PORT" public_html.zip "$USER@$HOST:$REMOTEPATH/"

        echo ""
        read -rp "Ekstrak otomatis di server sekarang? (y/n): " DO_UNZIP
        if [[ "$DO_UNZIP" =~ ^[Yy]$ ]]; then
            echo "📂 Mengekstrak di server..."
            ssh -p "$PORT" "$USER@$HOST" "cd '$REMOTEPATH' && unzip -o public_html.zip && echo '✅ Berhasil diekstrak di server!'"
        fi
        echo "🎉 Selesai!"
        ;;

    2)
        echo ""
        echo "--- Sinkronisasi via Rsync over SSH ---"
        read -rp "Host / IP Server: " HOST
        read -rp "Username SSH: " USER
        read -rp "Port SSH (tekan Enter untuk 22): " PORT
        PORT="${PORT:-22}"
        read -rp "Remote Path (tekan Enter untuk /home/$USER/public_html/): " REMOTEPATH
        REMOTEPATH="${REMOTEPATH:-/home/$USER/public_html/}"

        echo ""
        echo "🚀 Menjalankan rsync ke $USER@$HOST:$REMOTEPATH..."
        rsync -avz -e "ssh -p $PORT" \
            --exclude='.git' \
            --exclude='node_modules' \
            --exclude='backend' \
            --exclude='.DS_Store' \
            ./ "$USER@$HOST:$REMOTEPATH"
        echo "🎉 Sinkronisasi rsync selesai!"
        ;;

    3)
        echo ""
        echo "--- Upload via FTP (curl bawaan Mac) ---"
        read -rp "Host FTP (misal: ftp.domainanda.com atau IP): " FTP_HOST
        read -rp "Username FTP: " FTP_USER
        read -s -rp "Password FTP: " FTP_PASS
        echo ""
        read -rp "Remote Path (tekan Enter untuk /public_html/): " FTP_PATH
        FTP_PATH="${FTP_PATH:-/public_html/}"

        echo "🚀 Mengunggah public_html.zip via FTP..."
        curl --progress-bar -T public_html.zip "ftp://$FTP_HOST$FTP_PATH" --user "$FTP_USER:$FTP_PASS"
        echo ""
        echo "✅ public_html.zip berhasil diunggah ke FTP!"
        echo "💡 Silakan buka File Manager cPanel Anda dan ekstrak file public_html.zip tersebut."
        ;;

    4|*)
        echo "Dibatalkan."
        exit 0
        ;;
esac
