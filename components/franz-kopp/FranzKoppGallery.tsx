"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export interface MediaItem {
  id: string;
  index: number;
  type: "photo" | "video";
  title: string;
  src: string;
  thumb: string;
  poster?: string;
  width: number;
  height: number;
  origName: string;
  size: number;
  duration?: number;
}

interface FranzKoppGalleryProps {
  items: MediaItem[];
}

export default function FranzKoppGallery({ items }: FranzKoppGalleryProps) {
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayDelay] = useState(5000);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const filteredItems = items.filter((item) => {
    if (filter === "photo") return item.type === "photo";
    if (filter === "video") return item.type === "video";
    return true;
  });

  const photoCount = items.filter((i) => i.type === "photo").length;
  const videoCount = items.filter((i) => i.type === "video").length;

  const currentItem = activeIndex !== null ? filteredItems[activeIndex] : null;

  const handleNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
  }, [activeIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
  }, [activeIndex, filteredItems.length]);

  const handleDownload = () => {
    if (!currentItem) return;
    const filename =
      currentItem.origName ||
      `${currentItem.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.${currentItem.type === "photo" ? "webp" : "mp4"}`;
    const link = document.createElement("a");
    link.href = currentItem.src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => {
    setActiveIndex(null);
    setIsPlaying(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") handleClose();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
      if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleNext, handlePrev]);

  useEffect(() => {
    if (!isPlaying || activeIndex === null || !currentItem) return;
    if (currentItem.type === "photo") {
      const timer = setTimeout(() => {
        handleNext();
      }, autoplayDelay);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, activeIndex, currentItem, autoplayDelay, handleNext]);

  const handleVideoEnded = () => {
    if (isPlaying) {
      handleNext();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0a0c0f] text-gray-200 font-sans selection:bg-[#d4af37] selection:text-black"
    >
      <header className="sticky top-0 z-40 bg-[#12151b]/95 backdrop-blur-md border-b border-[#212631] px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-medium tracking-wide text-white">Franz Kopp Archiv</h1>
            <p className="text-xs text-gray-400">
              Privatsammlung • {photoCount} Fotos • {videoCount} Videos
            </p>
          </div>
        </div>

        <div className="flex items-center bg-[#191d26] p-1 rounded-xl border border-[#2a313d] text-xs font-medium">
          <button
            onClick={() => {
              setFilter("all");
              setActiveIndex(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg transition ${filter === "all" ? "bg-[#d4af37] text-black font-semibold" : "text-gray-400 hover:text-white"}`}
          >
            Alle ({items.length})
          </button>
          <button
            onClick={() => {
              setFilter("photo");
              setActiveIndex(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg transition ${filter === "photo" ? "bg-[#d4af37] text-black font-semibold" : "text-gray-400 hover:text-white"}`}
          >
            Fotos ({photoCount})
          </button>
          <button
            onClick={() => {
              setFilter("video");
              setActiveIndex(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg transition ${filter === "video" ? "bg-[#d4af37] text-black font-semibold" : "text-gray-400 hover:text-white"}`}
          >
            Videos ({videoCount})
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className="group relative aspect-square bg-[#151921] rounded-lg overflow-hidden border border-[#222834] cursor-pointer hover:border-[#d4af37]/60 hover:shadow-lg transition duration-200"
            >
              <img
                src={item.thumb || item.poster}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300 ease-out"
              />
              {item.type === "video" && (
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-[#d4af37] px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Video</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-200 flex items-end p-2">
                <span className="text-[11px] text-gray-200 truncate">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {currentItem && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-gradient-to-b from-black/80 to-transparent z-10 text-xs">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[#1f2530] text-[#d4af37] font-semibold">
                {activeIndex + 1} / {filteredItems.length}
              </span>
              <span className="text-gray-300 font-medium truncate max-w-[200px] md:max-w-md">{currentItem.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition ${
                  isPlaying
                    ? "bg-[#d4af37] text-black border-[#d4af37] font-bold"
                    : "bg-[#1f2530] text-gray-300 border-[#313a4a] hover:text-white"
                }`}
                title="Autoplay starten/stoppen (Leertaste)"
              >
                {isPlaying ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Autoplay</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-[#1f2530] hover:bg-[#2c3545] border border-[#313a4a] text-gray-300 hover:text-white flex items-center gap-1.5 transition text-xs cursor-pointer"
                title="Aktuelles Medium herunterladen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-[#d4af37]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span className="hidden sm:inline">Download</span>
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-[#1f2530] hover:bg-[#2c3545] border border-[#313a4a] text-gray-300 hover:text-white transition"
                title="Vollbild umschalten (F)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>

              <button
                onClick={handleClose}
                className="p-2 rounded-lg bg-[#2a1717] hover:bg-[#421d1d] border border-red-900/60 text-red-300 transition"
                title="Schließen (ESC)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center p-2 md:p-6 overflow-hidden">
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-6 z-20 p-3 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-black border border-white/10 transition duration-200 shadow-xl"
              title="Vorheriges Bild (Linke Pfeiltaste)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-6 z-20 p-3 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-black border border-white/10 transition duration-200 shadow-xl"
              title="Nächstes Bild (Rechte Pfeiltaste)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="w-full h-full flex items-center justify-center">
              {currentItem.type === "photo" ? (
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="max-h-[82vh] max-w-[92vw] object-contain rounded-md shadow-2xl transition duration-200"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={currentItem.src}
                  poster={currentItem.poster || currentItem.thumb}
                  controls
                  autoPlay={isPlaying}
                  onEnded={handleVideoEnded}
                  className="max-h-[82vh] max-w-[92vw] object-contain rounded-md shadow-2xl bg-black"
                />
              )}
            </div>
          </div>

          <div className="bg-black/80 backdrop-blur-md border-t border-white/10 p-2 overflow-x-auto flex gap-2 justify-center items-center h-20">
            {filteredItems
              .slice(Math.max(0, activeIndex - 5), Math.min(filteredItems.length, activeIndex + 6))
              .map((item) => {
                const itemIdx = filteredItems.findIndex((i) => i.id === item.id);
                const isSelected = itemIdx === activeIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveIndex(itemIdx)}
                    className={`relative flex-shrink-0 w-14 h-14 rounded overflow-hidden cursor-pointer border-2 transition ${
                      isSelected
                        ? "border-[#d4af37] scale-105 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={item.thumb || item.poster} alt={item.title} className="w-full h-full object-cover" />
                    {item.type === "video" && (
                      <div className="absolute bottom-0 right-0 bg-black/80 text-[#d4af37] px-1 text-[8px] font-bold">
                        ▶
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
