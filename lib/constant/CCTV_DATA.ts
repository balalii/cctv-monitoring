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
        id: 'wonosobo',
        name: 'Wonosobo',
        cctvCount: 11,
        onlineCount: 11,
        alertCount: 0,
        url: 'https://cctv.wonosobokab.go.id/',
      },
    ],
  },
];