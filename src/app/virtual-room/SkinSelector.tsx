"use client";

import { useAppStore } from "@/lib/store";
import { Palette, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SkinSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const SKINS = [
  { 
    id: "SKIN_1", 
    name: "Pure White Floral", 
    description: "깨끗하고 화사한 전통 호텔 웨딩",
    colors: ["#ffffff", "#f8f1ef"],
    preview: "bg-gradient-to-br from-white to-[#f8f1ef]"
  },
  { 
    id: "SKIN_2", 
    name: "Golden Night", 
    description: "로맨틱한 조명과 깊이감 있는 럭셔리",
    colors: ["#1a1a2e", "#c5a059"],
    preview: "bg-gradient-to-br from-[#1a1a2e] to-[#2d2d2d]"
  },
  { 
    id: "SKIN_3", 
    name: "Blooming Garden", 
    description: "산뜻한 야외 정원 감성의 싱그러움",
    colors: ["#e8f5e9", "#fce4ec"],
    preview: "bg-gradient-to-br from-[#e8f5e9] to-[#fce4ec]"
  }
];

export function SkinSelector({ isOpen, onClose }: SkinSelectorProps) {
  const { currentSkinId, setCurrentSkinId } = useAppStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/20 backdrop-blur-xs"
          />
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-24 top-40 z-[111] w-72"
          >
            <div className="glass-card bg-white/95 p-6 rounded-[32px] shadow-2xl border-white/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-primary">Background Skins</h3>
                </div>
                <button onClick={onClose} className="text-muted-foreground hover:text-primary">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                {SKINS.map((skin) => (
                  <button
                    key={skin.id}
                    onClick={() => setCurrentSkinId(skin.id)}
                    className={`w-full group relative flex flex-col gap-2 p-3 rounded-2xl border transition-all ${
                      currentSkinId === skin.id 
                      ? "border-primary bg-primary/5 shadow-inner" 
                      : "border-muted/30 hover:border-primary/50 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl ${skin.preview} border border-black/5 shadow-sm`} />
                      <div className="text-left">
                        <p className={`text-xs font-bold ${currentSkinId === skin.id ? "text-primary" : "text-muted-foreground"}`}>
                          {skin.name}
                        </p>
                        <p className="text-[9px] text-muted-foreground/70 font-medium">{skin.description}</p>
                      </div>
                      {currentSkinId === skin.id && (
                        <div className="ml-auto h-5 w-5 bg-primary rounded-full flex items-center justify-center text-white">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-muted/20 text-center">
                <p className="text-[9px] font-bold text-accent uppercase tracking-widest">Premium Collection</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
