ATCS Monitor Indonesia 🚦
<div align="center">
<img src="https://www.google.com/search?q=https://placehold.co/150x150/png%3Ftext%3DLogo" alt="Logo Proyek">
<p>
<b>Aplikasi monitoring CCTV lalu lintas (ATCS) real-time untuk seluruh Indonesia.</b>
</p>
<p>
Dibangun dengan antarmuka modern, responsif, dan animasi yang memukau.
</p>

</div>

📋 Daftar Isi
Tentang Proyek

Tampilan Aplikasi

Fitur Utama

Teknologi yang Digunakan

Struktur Aplikasi

Instalasi & Setup

Struktur Folder

Roadmap

Berkontribusi

Lisensi

Apresiasi

🌟 Tentang Proyek
ATCS Monitor Indonesia adalah sebuah platform web yang dirancang untuk memantau status CCTV lalu lintas dari berbagai kota dan kabupaten di seluruh Indonesia secara terpusat. Aplikasi ini menawarkan pengalaman pengguna yang mulus dengan navigasi hierarkis, animasi transisi yang halus, dan desain yang sepenuhnya responsif.


🚀 Fitur Utama
👁️ Monitoring Real-time: Pantau status CCTV (Online, Offline, Alert) secara langsung.

🗺️ Navigasi Hierarkis: Jelajahi data CCTV mulai dari tingkat Provinsi hingga Kabupaten/Kota.

✨ Animasi Halus: Transisi antar halaman yang elegan didukung oleh Framer Motion.

💻 Desain Responsif: Tampilan optimal di semua ukuran perangkat, dari mobile hingga desktop.

🔍 Fungsi Pencarian: Temukan Provinsi atau Kabupaten/Kota dengan cepat dan mudah.

📊 Indikator Visual: Indikator status dan progress bar untuk memvisualisasikan data ketersediaan CCTV.

🛠️ Teknologi yang Digunakan
Proyek ini dibangun menggunakan teknologi modern untuk memastikan performa, skalabilitas, dan pengalaman developer yang baik.

Next.js 14: Framework React dengan App Router.

TypeScript: Menjamin type safety dan skalabilitas kode.

Tailwind CSS: Framework CSS utility-first untuk desain yang cepat.

Framer Motion: Pustaka animasi untuk transisi yang kaya.

Shadcn/ui: Kumpulan komponen UI yang dapat diakses dan digunakan ulang.

Lucide React: Pustaka ikon yang bersih dan modern.

🏗️ Struktur Aplikasi
Tingkat Navigasi
Halaman Provinsi: Tampilan utama yang menampilkan daftar semua provinsi.

Halaman Kabupaten/Kota: Menampilkan daftar kabupaten/kota dalam provinsi yang dipilih.

Halaman Detail Lokasi: (Dalam pengembangan) Menampilkan detail CCTV pada lokasi spesifik.

Struktur Data
interface Kabupaten {
  id: string;
  name: string;
  cctvCount: number;
  onlineCount: number;
  alertCount: number;
  url: string;
}

interface Provinsi {
  id: string;
  name: string;
  kabupatens: Kabupaten[];
  totalCCTV?: number;
  onlineCount?: number;
  alertCount?: number;
  kabupatenCount?: number;
}

🚀 Instalasi & Setup
Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda.

Prasyarat
Pastikan Anda telah menginstal Node.js (v18.0 atau lebih baru) dan package manager (npm, yarn, atau pnpm).

Langkah-langkah
Clone repository

git clone [https://github.com/](https://github.com/)[USERNAME]/[REPO_NAME].git
cd atcs-monitor

Install dependencies

npm install
# atau
yarn install
# atau
pnpm install

Jalankan development server

npm run dev
# atau
yarn dev
# atau
pnpm dev

Buka di browser
Buka http://localhost:3000 di browser Anda.

📁 Struktur Folder
Struktur folder proyek ini dirancang agar mudah dinavigasi dan diskalakan.

atcs-monitor/
├── app/
│   ├── page.tsx            # Komponen utama (halaman provinsi)
│   ├── [provinsi]/page.tsx # Halaman dinamis untuk kabupaten
│   ├── layout.tsx          # Layout utama aplikasi
│   └── globals.css         # Gaya global
├── components/
│   └── ui/                 # Komponen dari Shadcn/ui
├── lib/
│   ├── constant/
│   │   └── CCTV_DATA.ts    # Data statis CCTV
│   └── utils.ts            # Fungsi utilitas
└── README.md

🎯 Roadmap
Berikut adalah fitur-fitur yang direncanakan untuk pengembangan di masa depan:

[ ] Integrasi Data Real-time - Koneksi ke API ATCS yang sebenarnya.

[ ] Integrasi Peta - Visualisasi lokasi CCTV menggunakan Leaflet atau Google Maps.

[ ] Sistem Notifikasi - Peringatan untuk perubahan status CCTV.

[ ] Dasbor Analitik - Grafik dan laporan statistik lalu lintas.

[ ] Autentikasi Pengguna - Sistem login dan manajemen peran.

[ ] Mode Gelap (Dark Mode) - Pergantian tema terang dan gelap.

[ ] Ekspor Data - Fitur untuk mengunduh laporan dalam format PDF/Excel.

🤝 Berkontribusi
Kontribusi Anda sangat kami hargai! Jika Anda ingin berkontribusi, silakan ikuti langkah-langkah berikut:

Fork repository ini.

Buat feature branch baru (git checkout -b feature/AmazingFeature).

Commit perubahan Anda (git commit -m 'Add some AmazingFeature').

Push ke branch tersebut (git push origin feature/AmazingFeature).

Buat Pull Request baru.

📄 Lisensi
Proyek ini didistribusikan di bawah Lisensi MIT. Lihat file LICENSE untuk informasi lebih lanjut.

🙏 Apresiasi
Proyek ini tidak akan terwujud tanpa pustaka dan tools hebat dari komunitas open-source.

Next.js

Tailwind CSS

Framer Motion

Shadcn/ui

Lucide