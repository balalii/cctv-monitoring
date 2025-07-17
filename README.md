# ATCS Monitor Indonesia

Aplikasi monitoring CCTV lalu lintas ATCS (Area Traffic Control System) real-time untuk seluruh Indonesia dengan antarmuka yang modern dan responsif.

## 🚀 Fitur Utama

- **Monitoring Real-time**: Pantau status CCTV lalu lintas secara real-time
- **Navigasi Hierarkis**: Jelajahi data dari tingkat provinsi hingga kabupaten/kota
- **Animasi Smooth**: Transisi halus antar halaman dengan Framer Motion
- **Responsive Design**: Tampilan optimal di semua perangkat
- **Search Functionality**: Pencarian cepat provinsi dan kabupaten
- **Status Indicators**: Indikator visual untuk status online/offline dan alert
- **Progress Tracking**: Bar progress untuk ketersediaan CCTV

## 🛠️ Teknologi yang Digunakan

- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type safety dan developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animasi dan transisi yang smooth
- **Shadcn/ui** - Komponen UI yang konsisten dan accessible
- **Lucide React** - Icon library yang modern

## 📱 Struktur Aplikasi

### Tingkat Navigasi
1. **Provinsi** - Tampilan utama menampilkan semua provinsi di Indonesia
2. **Kabupaten/Kota** - Daftar kabupaten/kota dalam provinsi yang dipilih
3. **Lokasi** - Detail lokasi CCTV (akan dikembangkan)

### Komponen Utama
- **Header dengan Stats** - Menampilkan statistik total CCTV dan status online
- **Search Bar** - Pencarian dengan placeholder dinamis
- **Card List** - Daftar item dengan animasi hover dan loading
- **Breadcrumb Navigation** - Navigasi hierarkis yang interaktif

## 🎨 Animasi dan Transisi

### Page Transitions
- **Slide Animation**: Transisi slide horizontal antar halaman
- **Scale Effect**: Efek scale saat transisi
- **Staggered Loading**: Animasi bertahap untuk card list

### Micro Interactions
- **Hover Effects**: Scale dan shadow pada card hover
- **Button Animations**: Scale effect pada button press
- **Icon Animations**: Pulse dan rotate untuk indikator status
- **Progress Bars**: Animasi fill dengan delay bertahap

### Loading States
- **Skeleton Loading**: Placeholder saat data loading
- **Spinner Animation**: Loading spinner dengan rotasi smooth
- **Fade In**: Fade in effect untuk konten yang muncul

## 📊 Data Structure

\`\`\`typescript
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
\`\`\`

## 🚀 Instalasi dan Setup

1. **Clone repository**
   \`\`\`bash
   git clone <repository-url>
   cd atcs-monitor
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   **or**
   yarn install
   **or**
   pnpm install
   \`\`\`

3. **Jalankan development server**
   \`\`\`bash
   npm run dev
   **or**
   yarn dev
   **or**
   pnpm dev
   \`\`\`

4. **Buka browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## 📁 Struktur Folder

\`\`\`
├── app/
│   ├── page.tsx                 # Main component
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   └── ui/                     # Shadcn/ui components
├── lib/
│   ├── constant/
│   │   └── CCTV_DATA.ts       # Data constants
│   └── utils.ts               # Utility functions
└── README.md
\`\`\`

## 🎯 Fitur yang Akan Datang

- [ ] **Real-time Data Integration** - Koneksi ke API real-time
- [ ] **Map Integration** - Integrasi peta untuk visualisasi lokasi
- [ ] **Notification System** - Notifikasi untuk alert dan status change
- [ ] **Dashboard Analytics** - Analytics dan reporting
- [ ] **User Authentication** - Sistem login dan role management
- [ ] **Mobile App** - Aplikasi mobile dengan React Native
- [ ] **Dark Mode** - Theme switching
- [ ] **Export Data** - Export laporan dalam format PDF/Excel

## 🔧 Kustomisasi

### Mengubah Data CCTV
Edit file `lib/constant/CCTV_DATA.ts` untuk menambah atau mengubah data provinsi dan kabupaten.

### Mengubah Animasi
Modifikasi variants di `app/page.tsx`:
- `pageVariants` - Animasi transisi halaman
- `cardVariants` - Animasi card list
- `statsVariants` - Animasi statistik
- `headerVariants` - Animasi header

### Mengubah Styling
- Edit `tailwind.config.ts` untuk kustomisasi theme
- Modifikasi class Tailwind di komponen untuk styling

## 📱 Responsive Design

Aplikasi dioptimalkan untuk:
- **Mobile** (320px - 768px)
- **Tablet** (768px - 1024px)  
- **Desktop** (1024px+)

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide](https://lucide.dev/) - Icon library

---

**ATCS Monitor Indonesia** - Monitoring CCTV Lalu Lintas Real-time 🚦📹
