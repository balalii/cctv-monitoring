export interface CCTVLocation {
  id: string
  name: string
  address: string
  status: "online" | "offline" | "maintenance"
  lastUpdate: string
  cameraCount: number
  alerts: number
}

export interface Kabupaten {
  id: string
  name: string
  cctvCount: number
  onlineCount: number
  alertCount: number
  url: string
}

export interface Provinsi {
  id:string
  name: string
  kabupatens: Kabupaten[]
  totalCCTV?: number
  onlineCount?: number
  alertCount?: number
  kabupatenCount?: number
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