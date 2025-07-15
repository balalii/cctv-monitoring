export interface CCTVLocation {
  id: string;
  name: string;
  address: string;
  status: 'online' | 'offline' | 'maintenance';
  lastUpdate: string;
  cameraCount: number;
  alerts: number;
}

export interface Kabupaten {
  id: string;
  name: string;
  cctvCount: number;
  onlineCount: number;
  alertCount: number;
  url: string;
}

export interface Provinsi {
  id: string;
  name: string;
  kabupatens: Kabupaten[];
  totalCCTV?: number;
  onlineCount?: number;
  alertCount?: number;
  kabupatenCount?: number;
}

export const indonesiaData: Provinsi[] = [
  {
    id: 'jateng',
    name: 'Jawa Tengah',
    kabupatens: [
      {
        id: 'semarang',
        name: 'Semarang',
        cctvCount: 165,
        onlineCount: 154,
        alertCount: 0,
        url: 'https://pantausemar.semarangkota.go.id/?cctv_category_id=fc3ed271-787c-4191-a7dd-fc84314a9f71',
      },
      {
        id: 'pekalongan',
        name: 'Pekalongan',
        cctvCount: 40,
        onlineCount: 31,
        alertCount: 0,
        url: 'https://cctv.pekalongankota.go.id/',
      },
      {
        id: 'wonosobo',
        name: 'Wonosobo',
        cctvCount: 11,
        onlineCount: 11,
        alertCount: 0,
        url: 'https://cctv.wonosobokab.go.id/',
      },
      {
        id: 'kebumen',
        name: 'Kebumen',
        cctvCount: 5,
        onlineCount: 5,
        alertCount: 0,
        url: 'https://cctv.kebumenkab.go.id/',
      },
      {
        id: 'magelang',
        name: 'magelang',
        cctvCount: 27,
        onlineCount: 27,
        alertCount: 0,
        url: 'https://cctv.dishub.magelangkab.go.id/map-cctv',
      },
    ],
  },
  {
    id: 'jogjakarta',
    name: 'Yogyakarta',
    kabupatens: [
      {
        id: 'jogja',
        name: 'Yogya kota',
        cctvCount: 162,
        onlineCount: 145,
        alertCount: 0,
        url: 'https://cctv.jogjakota.go.id/',
      },
    ],
  },
  {
    id: 'jatim',
    name: 'Jawa Timur',
    kabupatens: [
      {
        id: 'gersik',
        name: 'Gersik',
        cctvCount: 165,
        onlineCount: 154,
        alertCount: 0,
        url: 'https://cctvkanjeng.gresikkab.go.id/',
      },
      {
        id: 'banyuwangi',
        name: 'Banyuwangi',
        cctvCount: 52,
        onlineCount: 45,
        alertCount: 0,
        url: 'https://live.banyuwangikab.go.id/?page=1',
      },
      {
        id: 'tulungagung',
        name: 'Tulungagung',
        cctvCount: 26,
        onlineCount: 22,
        alertCount: 0,
        url: 'https://dishub.tulungagung.go.id/cctvtulungagung/',
      },
      {
        id: 'bojonegoro',
        name: 'Bojonegoro',
        cctvCount: 21,
        onlineCount: 17,
        alertCount: 0,
        url: 'https://bojonegorokab.go.id/gis-cctv/0',
      },
    ],
  },
  {
    id: 'jabar',
    name: 'Jawa Barat',
    kabupatens: [
      {
        id: 'bandung',
        name: 'Bandung',
        cctvCount: 388,
        onlineCount: 127,
        alertCount: 0,
        url: 'https://pelindung.bandung.go.id/',
      },
    ],
  },
  {
    id: 'Sumatra Barat',
    name: 'Sumatra Barat',
    kabupatens: [
      {
        id: 'padang',
        name: 'Padang',
        cctvCount: 6,
        onlineCount: 0,
        alertCount: 0,
        url: 'https://streamcctv.padang.go.id/#',
      },
      {
        id: 'bukit tinggi',
        name: 'Bukit tinggi',
        cctvCount: 25,
        onlineCount: 18,
        alertCount: 0,
        url: 'https://cctv.bukittinggikota.go.id/',
      },
    ],
  },
  {
    id: 'Aceh',
    name: 'Aceh',
    kabupatens: [
      {
        id: 'Banda Aceh',
        name: 'Banda Aceh',
        cctvCount: 21,
        onlineCount: 17,
        alertCount: 0,
        url: 'https://cctv.bandaacehkota.go.id/',
      },
    ],
  },
  {
    id: 'kalimantan',
    name: 'Kalimantan',
    kabupatens: [
      {
        id: 'kotawaringin-barat',
        name: 'Kotawaringin Barat',
        cctvCount: 15,
        onlineCount: 14,
        alertCount: 0,
        url: 'https://cctv.kotawaringinbaratkab.go.id/',
      },
    ],
  },
];
