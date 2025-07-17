'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Cctv, Search, AlertTriangle, Wifi, ChevronRight, ArrowLeft, Building2 } from 'lucide-react';
import Link from 'next/link';
import { indonesiaData, type Kabupaten, type Provinsi } from '@/lib/constant/CCTV_DATA';

type ViewLevel = 'provinsi' | 'kabupaten' | 'lokasi';

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
  },
  animate: {
    zIndex: 1,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    scale: 1.03,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      ease: [0.5, 0, 0.75, 0],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
    rotateX: 15,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  }),
  hover: {
    scale: 1.03,
    y: -8,
    rotateX: -2,
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

const statsVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
    rotateY: 90,
  },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    rotateY: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  }),
};

const headerVariants = {
  hidden: {
    opacity: 0,
    y: -60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const searchVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2,
    },
  },
};

const breadcrumbVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function CCTVMonitoringApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<ViewLevel>('provinsi');
  const [selectedProvinsi, setSelectedProvinsi] = useState<Provinsi | null>(null);
  const [selectedKabupaten, setSelectedKabupaten] = useState<Kabupaten | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [navigationDirection, setNavigationDirection] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setNavigationDirection(1);
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProvinsi(provinsi);
      setCurrentView('kabupaten');
      setSearchQuery('');
      setIsTransitioning(false);
    }, 50);
  };

  const handleBackClick = () => {
    setNavigationDirection(-1);
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentView === 'lokasi') {
        setCurrentView('kabupaten');
        setSelectedKabupaten(null);
      } else if (currentView === 'kabupaten') {
        setCurrentView('provinsi');
        setSelectedProvinsi(null);
      }
      setSearchQuery('');
      setIsTransitioning(false);
    }, 50);
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
    if (currentView === 'provinsi') return 'Pantau CCTV lalu lintas ATCS real-time';
    if (currentView === 'kabupaten') return 'Pilih Kabupaten/Kota';
    if (currentView === 'lokasi') return 'Lokasi CCTV';
    return '';
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        >
          <div className="w-12 h-12 border-4 border-white/20 rounded-full" />
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-white border-t-transparent rounded-full" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.div key={currentView} variants={pageTransitionVariants as any} initial="initial" animate="animate" exit="exit" className="min-h-screen">
          {/* Header */}
          <motion.div className="bg-black sticky top-0 z-10 backdrop-blur-sm" variants={headerVariants as any} initial="hidden" animate="visible">
            <div className="px-4 py-4 pb-7">
              <motion.div
                className="flex items-center justify-between mb-4"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <div className="flex items-center gap-3">
                  {currentView !== 'provinsi' && (
                    <motion.div
                      initial={{ opacity: 0, x: -30, rotate: -90 }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                        type: 'spring',
                        stiffness: 100,
                      }}
                    >
                      <Button variant="ghost" size="icon" onClick={handleBackClick} className="transform transition-all duration-300 hover:scale-110 hover:bg-gray-800 active:scale-95 hover:rotate-[-5deg]">
                        <ArrowLeft className="w-5 h-5 text-white transition-transform duration-300" />
                      </Button>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <motion.h1 className="text-xl font-bold text-white" layoutId="title">
                      {getTitle()}
                    </motion.h1>
                    <motion.p className="text-sm text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                      {getSubtitle()}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Breadcrumb */}
              {currentView !== 'provinsi' && (
                <motion.div className="flex items-center gap-2 text-sm text-gray-200 mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                  <motion.span
                    className="cursor-pointer text-gray-400 transition-all duration-300 hover:text-white"
                    whileHover={{
                      scale: 1.05,
                      textShadow: '0 0 8px rgba(255,255,255,0.5)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setNavigationDirection(-1);
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentView('provinsi');
                        setSelectedProvinsi(null);
                        setSelectedKabupaten(null);
                        setIsTransitioning(false);
                      }, 50);
                    }}
                    variants={breadcrumbVariants as any}
                    custom={0}
                  >
                    Indonesia
                  </motion.span>
                  {selectedProvinsi && (
                    <>
                      <motion.div initial={{ opacity: 0, scale: 0, rotate: -180 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }}>
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                      <motion.div
                        className={`${currentView === 'lokasi' ? 'cursor-pointer hover:text-gray-300 transition-all duration-300' : 'text-gray-300'}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={currentView === 'lokasi' ? { scale: 1.05, textShadow: '0 0 8px rgba(255,255,255,0.3)' } : {}}
                        onClick={() => (currentView === 'lokasi' ? handleBackClick() : undefined)}
                        variants={breadcrumbVariants as any}
                        custom={1}
                      >
                        <div className="flex items-center">
                          <Building2 className="w-3 h-3 mr-2" />
                          <span>{selectedProvinsi.name}</span>{' '}
                        </div>
                      </motion.div>
                    </>
                  )}
                  {selectedKabupaten && (
                    <>
                      <motion.div initial={{ opacity: 0, scale: 0, rotate: -180 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.6, type: 'spring', stiffness: 200 }}>
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                      <motion.span className="text-gray-700" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} variants={breadcrumbVariants as any} custom={2}>
                        {selectedKabupaten.name}
                      </motion.span>
                    </>
                  )}
                </motion.div>
              )}

              {/* Stats Cards */}
              <motion.div className="grid grid-cols-2 gap-3" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
                <motion.div variants={statsVariants as any} initial="hidden" animate="visible" custom={0} whileHover={{ scale: 1.05, rotateY: 5, transition: { duration: 0.3 } }} whileTap={{ scale: 0.95 }}>
                  <Card className="p-3 py-4 bg-[#1b1b1bc5] border-[#393939] backdrop-blur-sm transition-all duration-500 hover:bg-[#252525c5] hover:border-green-500/30">
                    <motion.div
                      className="flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-full mx-auto mb-2"
                      animate={{ boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0.6)', '0 0 0 15px rgba(34, 197, 94, 0)', '0 0 0 0 rgba(34, 197, 94, 0.6)'] }}
                      transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                    >
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}>
                        <Wifi className="w-5 h-5 text-green-400" />
                      </motion.div>
                    </motion.div>
                    <div className="text-center">
                      <motion.div
                        className="text-xl text-green-500 font-bold"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 150 }}
                        key={stats.online}
                      >
                        {stats.online}
                      </motion.div>
                      <div className="text-xs text-gray-400">Online</div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={statsVariants as any} initial="hidden" animate="visible" custom={1} whileHover={{ scale: 1.05, rotateY: -5, transition: { duration: 0.3 } }} whileTap={{ scale: 0.95 }}>
                  <Card className="p-3 py-4 bg-[#1b1b1bc5] border-[#393939] backdrop-blur-sm transition-all duration-500 hover:bg-[#252525c5] hover:border-blue-500/30">
                    <motion.div
                      className="flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-full mx-auto mb-2"
                      animate={{ boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.6)', '0 0 0 15px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0.6)'] }}
                      transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.8, ease: 'easeInOut' }}
                    >
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}>
                        <Cctv className="w-5 h-5 text-blue-400" />
                      </motion.div>
                    </motion.div>
                    <div className="text-center">
                      <motion.div className="text-xl font-bold text-white" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.7, type: 'spring', stiffness: 150 }} key={stats.total}>
                        {stats.total}
                      </motion.div>
                      <div className="text-xs text-gray-400">Total CCTV</div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
            <motion.div className="h-4 rounded-t-[60px] bg-gray-100" />
          </motion.div>

          {/* Content */}
          <div className="px-4 pt-1 pb-8 bg-gray-100">
            <motion.div
              className={`space-y-4 pb-5 min-h-[60vh] transition-all duration-500 ${isTransitioning ? 'opacity-30 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Search Bar */}
              <motion.div className="relative" variants={searchVariants as any} initial="hidden" animate="visible">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Input
                  placeholder={`Cari ${currentView === 'provinsi' ? 'provinsi' : currentView === 'kabupaten' ? 'kabupaten/kota' : 'lokasi'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-5 border-gray-300 shadow-md backdrop-blur-sm transition-all duration-500 focus:scale-[1.02] focus:shadow-xl hover:shadow-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </motion.div>

              {/* Provinsi View */}
              {currentView === 'provinsi' &&
                (filteredData as (Provinsi & { totalCCTV: number; onlineCount: number; alertCount: number; kabupatenCount: number })[]).map((provinsi, index) => {
                  return (
                    <motion.div key={provinsi.id} variants={cardVariants as any} initial="hidden" animate="visible" whileHover="hover" whileTap="tap" custom={index} style={{ perspective: 1000 }}>
                      <Card className="hover:shadow-xl transition-all duration-500 cursor-pointer backdrop-blur-sm border-gray-200 hover:border-blue-300" onClick={() => handleProvinsiClick(provinsi)}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <motion.h3 className="font-semibold text-gray-900 transition-colors duration-300" whileHover={{ color: '#3b82f6' }}>
                                  {provinsi.name}
                                </motion.h3>
                                <motion.div animate={{ x: [0, 8, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}>
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                </motion.div>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}>
                                  <Building2 className="w-3 h-3" />
                                </motion.div>
                                <span>{provinsi.kabupatenCount} Kabupaten/Kota</span>
                              </div>
                            </div>
                            {!!(provinsi.alertCount && provinsi.alertCount > 0) && (
                              <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}>
                                <Badge variant="destructive" className="ml-2 shadow-md">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  {provinsi.alertCount}
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-xs text-green-500 font-bold">
                                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}>
                                  <Wifi className="w-3 h-3" />
                                </motion.div>
                                <span>{provinsi.onlineCount} Online</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-blue-500 font-bold">
                                <Cctv className="w-3 h-3" />
                                <span>{provinsi.totalCCTV} CCTV</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                              <span>Ketersediaan CCTV</span>
                              <motion.span key={provinsi.totalCCTV} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                                {provinsi.totalCCTV && provinsi.totalCCTV > 0 ? Math.round((provinsi.onlineCount / provinsi.totalCCTV) * 100) : 0}%
                              </motion.span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden shadow-inner">
                              <motion.div
                                className={`h-2 rounded-full shadow-sm ${provinsi.onlineCount >= provinsi.totalCCTV * 0.8 ? 'bg-green-500' : provinsi.onlineCount >= provinsi.totalCCTV * 0.5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                initial={{ width: 0, opacity: 0 }}
                                animate={{
                                  width: `${provinsi.totalCCTV && provinsi.totalCCTV > 0 ? (provinsi.onlineCount / provinsi.totalCCTV) * 100 : 0}%`,
                                  opacity: 1,
                                }}
                                transition={{
                                  duration: 1.2,
                                  delay: index * 0.15 + 0.8,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}

              {/* Kabupaten View */}
              {currentView === 'kabupaten' &&
                (filteredData as Kabupaten[]).map((kabupaten, index) => (
                  <motion.div key={kabupaten.id} variants={cardVariants as any} initial="hidden" animate="visible" whileHover="hover" whileTap="tap" custom={index} style={{ perspective: 1000 }}>
                    <Card className="hover:shadow-xl transition-all duration-500 backdrop-blur-sm border-gray-200 hover:border-blue-300">
                      <Link href={kabupaten.url} className="block cursor-pointer">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}>
                                  <Building2 className="w-3 h-3" />
                                </motion.div>
                                <motion.h3 className="font-semibold text-gray-900 transition-colors duration-300" whileHover={{ color: '#3b82f6' }}>
                                  {kabupaten.name}
                                </motion.h3>
                                <motion.div animate={{ x: [0, 8, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}>
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                </motion.div>
                              </div>
                            </div>
                            {kabupaten.alertCount > 0 && (
                              <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}>
                                <Badge variant="destructive" className="ml-2 shadow-md">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  {kabupaten.alertCount}
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-xs text-green-500 font-bold">
                                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}>
                                  <Wifi className="w-3 h-3" />
                                </motion.div>
                                <span>{kabupaten.onlineCount} Online</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-blue-500 font-bold">
                                <Cctv className="w-3 h-3" />
                                <span>{kabupaten.cctvCount} CCTV</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>

            {filteredData.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.div animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }} className="mb-4">
                  <Cctv className="w-16 h-16 text-gray-300 mx-auto" />
                </motion.div>
                <motion.p className="text-gray-500 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
                  Tidak ada data yang ditemukan
                </motion.p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
