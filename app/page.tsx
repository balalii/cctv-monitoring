'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {  Cctv, Search, AlertTriangle, Wifi, ChevronRight, ArrowLeft,  Building2,  } from 'lucide-react';
import Link from 'next/link';
import { indonesiaData, Kabupaten, Provinsi } from '@/lib/constant/CCTV_DATA';

type ViewLevel = 'provinsi' | 'kabupaten' | 'lokasi';

export default function CCTVMonitoringApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<ViewLevel>('provinsi');
  const [selectedProvinsi, setSelectedProvinsi] = useState<Provinsi | null>(null);
  const [selectedKabupaten, setSelectedKabupaten] = useState<Kabupaten | null>(null);

  const processedData = useMemo(() => {
    return indonesiaData.map((provinsi) => {
      const totalCCTV = provinsi.kabupatens.reduce((sum, kab) => sum + kab.cctvCount, 0);
      const onlineCount = provinsi.kabupatens.reduce((sum, kab) => sum + kab.onlineCount, 0);
      const alertCount = provinsi.kabupatens.reduce((sum, kab) => sum + kab.alertCount, 0);
      const kabupatenCount = provinsi.kabupatens.length;

      return {
        ...provinsi,
        totalCCTV,
        onlineCount,
        alertCount,
        kabupatenCount,
      };
    });
  }, []);

  const handleProvinsiClick = (provinsi: Provinsi) => {
    setSelectedProvinsi(provinsi);
    setCurrentView('kabupaten');
    setSearchQuery('');
  };

  const handleBackClick = () => {
    if (currentView === 'lokasi') {
      setCurrentView('kabupaten');
      setSelectedKabupaten(null);
    } else if (currentView === 'kabupaten') {
      setCurrentView('provinsi');
      setSelectedProvinsi(null);
    }
    setSearchQuery('');
  };

  const getFilteredData = () => {
    if (currentView === 'provinsi') {
      return processedData.filter((provinsi) => provinsi.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (currentView === 'kabupaten' && selectedProvinsi) {
      return selectedProvinsi.kabupatens.filter((kabupaten) => kabupaten.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return [];
  };

  const getTotalStats = () => {
    if (currentView === 'provinsi') {
      const totalCCTV = processedData.reduce((sum, p) => sum + (p.totalCCTV || 0), 0);
      const totalOnline = processedData.reduce((sum, p) => sum + (p.onlineCount || 0), 0);
      const totalAlerts = processedData.reduce((sum, p) => sum + (p.alertCount || 0), 0);
      return { total: totalCCTV, online: totalOnline, alerts: totalAlerts };
    } else if (currentView === 'kabupaten' && selectedProvinsi) {
      return {
        total: selectedProvinsi.totalCCTV || 0,
        online: selectedProvinsi.onlineCount || 0,
        alerts: selectedProvinsi.alertCount || 0,
      };
    } else if (currentView === 'lokasi' && selectedKabupaten) {
      return {
        total: selectedKabupaten.cctvCount,
        online: selectedKabupaten.onlineCount,
        alerts: selectedKabupaten.alertCount,
      };
    }
    return { total: 0, online: 0, alerts: 0 };
  };

  const stats = getTotalStats();
  const filteredData = getFilteredData();

  const getTitle = () => {
    if (currentView === 'provinsi') return 'ATCS Monitor Indonesia';
    if (currentView === 'kabupaten') return selectedProvinsi?.name || '';
    if (currentView === 'lokasi') return selectedKabupaten?.name || '';
    return 'ATCS Monitor';
  };

  const getSubtitle = () => {
    if (currentView === 'provinsi') return '';
    if (currentView === 'kabupaten') return 'Pilih Kabupaten/Kota';
    if (currentView === 'lokasi') return 'Lokasi CCTV';
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-200/70">
      {/* Header */}
      <div className="bg-black shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-4 pb-7">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {currentView !== 'provinsi' && (
                <Button variant="ghost" size="icon" onClick={handleBackClick}>
                  <ArrowLeft className="w-5 h-5 text-white" />
                </Button>
              )}
              <div>
                <h1 className="text-xl font-bold text-white">{getTitle()}</h1>
                <p className="text-sm text-gray-200">{getSubtitle()}</p>
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          {currentView !== 'provinsi' && (
            <div className="flex items-center gap-2 text-sm text-gray-200 mb-4">
              <span
                className="cursor-pointer hover:text-gray-300"
                onClick={() => {
                  setCurrentView('provinsi');
                  setSelectedProvinsi(null);
                  setSelectedKabupaten(null);
                }}
              >
                Indonesia
              </span>
              {selectedProvinsi && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className={`${currentView === 'lokasi' ? 'cursor-pointer hover:text-gray-300' : 'text-gray-300'}`} onClick={() => (currentView === 'lokasi' ? handleBackClick() : undefined)}>
                    {selectedProvinsi.name}
                  </span>
                </>
              )}
              {selectedKabupaten && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-gray-700">{selectedKabupaten.name}</span>
                </>
              )}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Card className="p-3 bg-[#1b1b1b] border-[#313131]">
              <div className="text-center">
                <div className="text-lg text-green-500 font-bold ">{stats.online}</div>
                <div className="text-xs text-gray-500">Online</div>
              </div>
            </Card>
            <Card className="p-3 bg-[#1b1b1b] border-[#313131]">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{stats.total}</div>
                <div className="text-xs text-gray-500">Total CCTV</div>
              </div>
            </Card>
            <Card className="p-3 bg-[#1b1b1b] border-[#313131]">
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">{stats.alerts}</div>
                <div className="text-xs text-gray-500">Alert</div>
              </div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2  transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={`Cari ${currentView === 'provinsi' ? 'provinsi' : currentView === 'kabupaten' ? 'kabupaten/kota' : 'lokasi'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1b1b1b] border-[#313131] text-white py-3"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <div className="space-y-4">
          {/* Provinsi View */}
          {currentView === 'provinsi' &&
            filteredData.map((provinsi) => {
              const p = provinsi as Provinsi;
              return (
                <Card key={p.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleProvinsiClick(p)}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{p.name}</h3>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                          <Building2 className="w-3 h-3" />
                          <span>{p.kabupatenCount} Kabupaten/Kota</span>
                        </div>
                      </div>
                      {!!(p.alertCount && p.alertCount > 0) && (
                        <Badge variant="destructive" className="ml-2">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {p.alertCount}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-green-500 font-bold font-bold">
                          <Wifi size={19} className="w-3 h-3" />
                          <span>{p.onlineCount} Online</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Cctv className="w-3 h-3" />
                          <span>{p.totalCCTV} CCTV</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

          {/* Kabupaten View */}
          {currentView === 'kabupaten' &&
            filteredData.map((kabupaten: any) => (
              <Card key={kabupaten.id} className="hover:shadow-md transition-shadow">
                <Link href={kabupaten.url} key={kabupaten.id} className="block cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{kabupaten.name}</h3>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      {kabupaten.alertCount > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {kabupaten.alertCount}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-green-500 font-bold font-bold">
                          <Wifi size={19} className="w-3 h-3" />
                          <span>{kabupaten.onlineCount} Online</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Cctv className="w-3 h-3" />
                          <span>{kabupaten.cctvCount} CCTV</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <Cctv className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Tidak ada data yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
