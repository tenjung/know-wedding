"use client";

import {
  ArrowLeft, Share2, Users, Radio,
  ShieldCheck, Gift, ShoppingBag,
  Palette, Sparkles, UserCircle2,
} from "lucide-react";
import Link from "next/link";
import { RoomCanvas } from "./RoomCanvas";
import { useAppStore } from "@/lib/store";
import { ItemShop } from "./ItemShop";
import { SkinSelector } from "./SkinSelector";
import { AvatarModal } from "@/app/avatar/AvatarModal";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";

const SIDEBAR_ITEMS = [
  { id: "avatar", icon: UserCircle2, label: "My Avatar",   color: "bg-rose-500"   },
  { id: "skin",   icon: Palette,     label: "Change Skin", color: "bg-indigo-600" },
  { id: "shop",   icon: ShoppingBag, label: "Item Shop",   color: "bg-primary"    },
  { id: "pay",    icon: Gift,        label: "Love Pay",    color: "bg-accent"     },
] as const;

export function VirtualRoomClient() {
  const { guestCount, setCurrentSkinId } = useAppStore();
  const [isShopOpen,   setIsShopOpen]   = useState(false);
  const [isSkinOpen,   setIsSkinOpen]   = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const sidebarActions: Record<string, () => void> = {
    avatar: () => setIsAvatarOpen(true),
    skin:   () => setIsSkinOpen(true),
    shop:   () => setIsShopOpen(true),
    pay:    () => {},
  };

  const handlePurchase = (item: any) => {
    if (item.type === "SKIN") {
      setCurrentSkinId(item.payload_schema?.skinId || "SKIN_1");
    }
    toast.success(`${item.name}을(를) 구매했습니다!`, {
      icon: <Sparkles className="h-4 w-4 text-accent" />,
    });
    setIsShopOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-7xl px-6 py-6 pb-24">

        {/* 헤더 */}
        <header className="flex items-center justify-between mb-8">
          <Link href="/" className="group flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
            <div className="h-8 w-8 rounded-full border border-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-[11px] font-bold text-primary tracking-widest uppercase">Live Celebration</span>
            </div>
            <button className="h-10 w-10 glass rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="relative w-full">
          {/* 타이틀 */}
          <div className="absolute top-10 left-10 z-[70] pointer-events-none">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
              <h1 className="text-3xl font-serif text-primary">VIP Virtual Hall</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Modern Luxury Metaverse</p>
            </motion.div>
          </div>

          {/* 캔버스 */}
          <div className="w-full h-[800px] relative">
            <RoomCanvas />

            {/* 우측 사이드바 */}
            <div className="absolute top-10 right-10 z-[100] flex flex-col items-end gap-4">

              {/* 통계 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass px-4 py-2.5 rounded-2xl border-accent/10 shadow-lg flex items-center gap-4"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-accent uppercase tracking-wider">Live</span>
                  <span className="text-sm font-bold text-primary leading-none">{guestCount}</span>
                </div>
                <div className="h-6 w-[1px] bg-muted/30" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-accent uppercase tracking-wider">Hits</span>
                  <span className="text-sm font-bold text-primary leading-none">3,452</span>
                </div>
              </motion.div>

              {/* 사이드바 버튼 */}
              <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {SIDEBAR_ITEMS.map(item => (
                  <motion.button
                    key={item.id}
                    onClick={sidebarActions[item.id]}
                    whileHover={{ width: 140 }}
                    className={`group relative flex h-12 w-12 items-center overflow-hidden rounded-2xl ${item.color} text-white shadow-xl transition-all duration-300 ease-out`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="whitespace-nowrap pr-4 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* 좌측 하단 */}
            <div className="absolute bottom-10 left-10 z-[100]">
              <div className="flex gap-3">
                {([
                  { icon: Users,       title: "하객" },
                  { icon: Radio,       title: "방송" },
                  { icon: ShieldCheck, title: "보안" },
                ] as const).map((b, idx) => (
                  <button key={idx} className="h-10 w-10 glass rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all">
                    <b.icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 개발 콘솔 링크 */}
        <div className="fixed bottom-10 right-10 z-50">
          <Link href="/dev/room-control" className="flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-full font-bold text-xs shadow-2xl hover:scale-105 transition-all">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            Developer Console
          </Link>
        </div>
      </main>

      <ItemShop isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} onPurchase={handlePurchase} />
      <SkinSelector isOpen={isSkinOpen} onClose={() => setIsSkinOpen(false)} />
      <AvatarModal isOpen={isAvatarOpen} onClose={() => setIsAvatarOpen(false)} />
    </div>
  );
}
