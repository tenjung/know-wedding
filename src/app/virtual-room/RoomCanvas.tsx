"use client";

import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import { User, Heart, MessageSquare, Sparkles, PlusCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AvatarSVG } from "@/app/avatar/AvatarSVG";
import { DUMMY_GUEST_CONFIGS, BRIDE_CONFIG, GROOM_CONFIG } from "@/lib/avatar/dummyGuests";

/**
 * 🎨 사용자 이미지 스킨 맞춤형 하객 좌표
 * 이미지 내의 5x5 그리드 의자 위치에 최대한 맞춤 (x: 0-100%, y: 0-100%)
 */
const GUESTS_POSITIONS = [
  // 좌측 5열 (x: 15~35% 부근)
  { id: 1, x: 18, y: 41, color: "bg-[#e3c2b4]" },
  { id: 2, x: 22, y: 41, color: "bg-[#b9826e]" },
  { id: 3, x: 26, y: 41, color: "bg-[#4a2521]" },
  { id: 4, x: 30, y: 41, color: "bg-[#7b4a38]" },
  { id: 5, x: 34, y: 41, color: "bg-[#9b5f49]" },

  { id: 6, x: 18, y: 51, color: "bg-[#e3c2b4]" },
  { id: 7, x: 22, y: 51, color: "bg-[#b9826e]" },
  { id: 8, x: 26, y: 51, color: "bg-[#4a2521]" },
  { id: 9, x: 30, y: 51, color: "bg-[#7b4a38]" },
  { id: 10, x: 34, y: 51, color: "bg-[#9b5f49]" },

  { id: 11, x: 18, y: 61, color: "bg-[#e3c2b4]" },
  { id: 12, x: 22, y: 61, color: "bg-[#b9826e]" },
  { id: 13, x: 26, y: 61, color: "bg-[#4a2521]" },
  { id: 14, x: 30, y: 61, color: "bg-[#7b4a38]" },
  { id: 15, x: 34, y: 61, color: "bg-[#9b5f49]" },

  // 우측 5열 (x: 65~85% 부근)
  { id: 16, x: 66, y: 41, color: "bg-[#e3c2b4]" },
  { id: 17, x: 70, y: 41, color: "bg-[#b9826e]" },
  { id: 18, x: 74, y: 41, color: "bg-[#4a2521]" },
  { id: 19, x: 78, y: 41, color: "bg-[#7b4a38]" },
  { id: 20, x: 82, y: 41, color: "bg-[#9b5f49]" },

  { id: 21, x: 66, y: 51, color: "bg-[#e3c2b4]" },
  { id: 22, x: 70, y: 51, color: "bg-[#b9826e]" },
  { id: 23, x: 74, y: 51, color: "bg-[#4a2521]" },
  { id: 24, x: 78, y: 51, color: "bg-[#7b4a38]" },
  { id: 25, x: 82, y: 51, color: "bg-[#9b5f49]" },

  { id: 26, x: 66, y: 61, color: "bg-[#e3c2b4]" },
  { id: 27, x: 70, y: 61, color: "bg-[#b9826e]" },
  { id: 28, x: 74, y: 61, color: "bg-[#4a2521]" },
  { id: 29, x: 78, y: 61, color: "bg-[#7b4a38]" },
  { id: 30, x: 82, y: 61, color: "bg-[#9b5f49]" },
];

export function RoomCanvas() {
  const { 
    guestCount, 
    setGuestCount, 
    messages, 
    addMessage, 
    removeMessage,
    billboardText, 
    setBillboardText, 
    roomBackground,
    currentSkinId,
    reactions,
    addReaction,
    removeOldReactions,
    avatarConfig,
  } = useAppStore();
  const [mounted, setMounted] = React.useState(false);
  const supabase = createClient();
  const channelRef = useRef<any>(null);

  // ── 내 아바타 위치/방향 ───────────────────────────
  const [myPos, setMyPos] = useState({ x: 50, y: 75 }); // % 기준
  const [myDir, setMyDir] = useState(1); // 1=오른쪽, -1=왼쪽
  const [showHint, setShowHint] = useState(true);
  const keysDown = useRef<Set<string>>(new Set());

  // 이동 루프
  useEffect(() => {
    const STEP = 0.6; // 1프레임당 이동량(%)
    const timer = setInterval(() => {
      const k = keysDown.current;
      if (k.size === 0) return;
      setMyPos(prev => {
        let { x, y } = prev;
        if (k.has('ArrowLeft')  || k.has('a') || k.has('A')) { x -= STEP; setMyDir(-1); }
        if (k.has('ArrowRight') || k.has('d') || k.has('D')) { x += STEP; setMyDir(1); }
        if (k.has('ArrowUp')    || k.has('w') || k.has('W')) y -= STEP;
        if (k.has('ArrowDown')  || k.has('s') || k.has('S')) y += STEP;
        return {
          x: Math.max(5, Math.min(95, x)),
          y: Math.max(10, Math.min(90, y)),
        };
      });
    }, 16);
    return () => clearInterval(timer);
  }, []);

  // 키 이벤트
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const dirs = ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','a','d','w','s','A','D','W','S'];
      if (dirs.includes(e.key)) {
        e.preventDefault();
        keysDown.current.add(e.key);
        setShowHint(false);
      }
    };
    const up   = (e: KeyboardEvent) => keysDown.current.delete(e.key);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup',   up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  // 힌트 5초 후 자동 숨김
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      removeOldReactions();
    }, 1000);
    return () => clearInterval(interval);
  }, [removeOldReactions]);

  useEffect(() => {
    const channel = supabase.channel('room_vip_demo', {
      config: {
        presence: { key: 'user_' + Math.random().toString(36).substr(2, 9) },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setGuestCount(Object.keys(state).length + 320); // 시연용 하객수
      })
      .on('broadcast', { event: 'celebration' }, (payload) => {
        const msgId = Date.now().toString() + Math.random();
        addMessage({
          id: msgId,
          text: payload.payload.text,
          x: payload.payload.x,
          y: payload.payload.y,
        });
        setTimeout(() => removeMessage(msgId), 4000);
      })
      .on('broadcast', { event: 'billboard' }, (payload) => {
        setBillboardText(payload.payload.text);
      })
      .on('broadcast', { event: 'emoji_reaction' }, (payload) => {
        addReaction({
          id: Date.now() + Math.random().toString(),
          emoji: payload.payload.emoji,
          x: payload.payload.x,
          y: payload.payload.y,
          timestamp: Date.now()
        });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); };
  }, [setGuestCount, addMessage, removeMessage, setBillboardText, supabase, addReaction]);

  const sendEmoji = (emoji: string) => {
    if (!channelRef.current) return;
    const randomGuest = GUESTS_POSITIONS[Math.floor(Math.random() * GUESTS_POSITIONS.length)];
    const x = randomGuest.x + (Math.random() - 0.5) * 5;
    const y = randomGuest.y - 5;
    const payload = { emoji, x, y };
    channelRef.current.send({ type: 'broadcast', event: 'emoji_reaction', payload });
    addReaction({ id: Date.now() + Math.random().toString(), ...payload, timestamp: Date.now() });
  };

  const sendCelebration = () => {
    const randomGuest = GUESTS_POSITIONS[Math.floor(Math.random() * GUESTS_POSITIONS.length)];
    const texts = ["축하해! 🥂", "대박 예쁨!", "행복해야해!", "꽃길만 가자 🌸", "역대급 웨딩!"];
    const payload = {
      text: texts[Math.floor(Math.random() * texts.length)],
      x: randomGuest.x,
      y: randomGuest.y - 12,
    };
    const msgId = Date.now().toString() + Math.random();
    channelRef.current?.send({ type: 'broadcast', event: 'celebration', payload });
    addMessage({ id: msgId, ...payload });
    setTimeout(() => removeMessage(msgId), 4000);
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[40px] border border-muted/30 bg-[#fff] shadow-2xl group">
      
      {/* 🖼️ 사용자 맞춤 2D 환경 스킨 */}
      {mounted && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSkinId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              {/* Skin 1: Pure White Floral */}
              {currentSkinId === "SKIN_1" && (
                <div className="absolute inset-0 bg-[#fdfbfb] bg-gradient-to-b from-[#fdfbfb] to-[#ebedee]">
                  {/* 중앙 버진 로드 */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[20%] h-full bg-white shadow-[0_0_100px_rgba(0,0,0,0.05)] opacity-50" />
                  {/* 대리석 패턴 */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 100 M100 0 L0 100' stroke='black' fill='none'/%3E%3C/svg%3E")` }} />
                  {/* 상단 화이트 플라워 아치 (CSS/SVG) */}
                  <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-80" viewBox="0 0 600 200">
                    <path d="M50,200 Q300,0 550,200" fill="none" stroke="#fcf3f2" strokeWidth="40" strokeLinecap="round" />
                    <circle cx="100" cy="150" r="10" fill="#fff5f5" />
                    <circle cx="200" cy="80" r="15" fill="#fff5f5" />
                    <circle cx="300" cy="50" r="12" fill="#fff5f5" />
                    <circle cx="400" cy="80" r="15" fill="#fff5f5" />
                    <circle cx="500" cy="150" r="10" fill="#fff5f5" />
                  </svg>
                </div>
              )}

              {/* Skin 2: Golden Night */}
              {currentSkinId === "SKIN_2" && (
                <div className="absolute inset-0 bg-[#0f0f1b] bg-gradient-to-b from-[#0f0f1b] via-[#1a1a2e] to-[#0f0f1b]">
                  {/* 빛나는 버진 로드 */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[18%] h-full bg-gradient-to-t from-[#c5a059]/10 to-transparent shadow-[0_0_80px_rgba(197,160,89,0.2)]" />
                  {/* 별빛 효과 */}
                  <div className="absolute inset-0">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0.1 }}
                        animate={{ opacity: [0.1, 0.8, 0.1] }}
                        transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
                        className="absolute h-[1px] w-[1px] bg-white rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                      />
                    ))}
                  </div>
                  {/* 골드 조명 아치 */}
                  <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] opacity-40" viewBox="0 0 700 250">
                    <path d="M50,250 Q350,20 650,250" fill="none" stroke="#c5a059" strokeWidth="2" strokeDasharray="5,10" />
                    <circle cx="350" cy="80" r="60" fill="url(#goldGrad)" opacity="0.1" />
                    <defs>
                      <radialGradient id="goldGrad"><stop offset="0%" stopColor="#c5a059" /><stop offset="100%" stopColor="transparent" /></radialGradient>
                    </defs>
                  </svg>
                </div>
              )}

              {/* Skin 3: Blooming Garden */}
              {currentSkinId === "SKIN_3" && (
                <div className="absolute inset-0 bg-[#f9fbf2] bg-gradient-to-b from-[#f9fbf2] to-[#e8f5e9]">
                  {/* 우드 버진 로드 */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[22%] h-full bg-[#efebe9]/40 border-x border-[#d7ccc8]/20" />
                  {/* 풀속성 오버레이 */}
                  <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 C40 10 40 20 30 30 C20 40 20 50 30 60' stroke='green' fill='none'/%3E%3C/svg%3E")` }} />
                  {/* 자연광 효과 */}
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-yellow-200/20 to-transparent rounded-full blur-3xl" />
                  {/* 정원 아치 */}
                  <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[180px] opacity-60" viewBox="0 0 550 180">
                    <path d="M40,180 Q275,0 510,180" fill="none" stroke="#81c784" strokeWidth="30" strokeLinecap="round" />
                    <circle cx="275" cy="40" r="20" fill="#f48fb1" opacity="0.5" />
                    <circle cx="150" cy="80" r="15" fill="#f48fb1" opacity="0.4" />
                    <circle cx="400" cy="80" r="15" fill="#f48fb1" opacity="0.4" />
                  </svg>
                </div>
              )}

              {/* Fallback provided by user or default */}
              {!["SKIN_1", "SKIN_2", "SKIN_3"].includes(currentSkinId) && roomBackground && (
                <motion.img 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={roomBackground}
                  alt="Custom 2D Venue"
                  className="w-full h-full object-fill"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* 배경 꽃잎 효과 (이미지와 어울리게 반투명 처리) */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
           {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                 key={`petal-${i}`}
                 initial={{ x: Math.random() * 100 + "%", y: -20, opacity: 0 }}
                 animate={{ 
                    y: ["0%", "120%"],
                    x: [Math.random() * 100 + "%", (Math.random() * 100 - 15) + "%"],
                    rotate: [0, 720],
                    opacity: [0, 0.5, 0]
                 }}
                 transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 10 }}
                 className="absolute"
              >
                 <div className="h-2 w-2 bg-rose-200/40 rounded-full blur-[1px]" />
              </motion.div>
           ))}
        </div>
      )}

      {/* 2D 하객 아바타 레이어 */}
      {GUESTS_POSITIONS.map((guest) => (
        <motion.div
          key={guest.id}
          className="absolute z-50"
          style={{ left: `${guest.x}%`, top: `${guest.y}%`, transform: 'translate(-50%, -100%)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: guest.id * 0.04, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2 + (guest.id % 3) * 0.5, ease: 'easeInOut' }}
          >
            <AvatarSVG
              config={DUMMY_GUEST_CONFIGS[(guest.id - 1) % DUMMY_GUEST_CONFIGS.length]}
              size={36}
            />
          </motion.div>
          <div className="mx-auto -mt-1 h-1 w-4 bg-black/12 rounded-full blur-[1px]" />
        </motion.div>
      ))}


      {/* 제단 신랑신부 - AvatarSVG 컴포넌트 */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 z-40 flex justify-center gap-6">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <AvatarSVG config={GROOM_CONFIG} size={58} />
          <span className="text-[9px] text-muted-foreground font-bold mt-[-4px]">신랑</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <AvatarSVG config={BRIDE_CONFIG} size={58} />
          <span className="text-[9px] text-muted-foreground font-bold mt-[-4px]">신부</span>
        </motion.div>
      </div>

      {/* ── 내 아바타 (키보드로 이동) ── */}
      <motion.div
        className="absolute z-[55] cursor-pointer"
        style={{
          left: `${myPos.x}%`,
          top:  `${myPos.y}%`,
          transform: 'translate(-50%, -100%)',
          scaleX: myDir,
        }}
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
      >
        {/* 내 이름 라벨 */}
        <div className="text-center mb-0.5">
          <span className="bg-rose-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-md">
            나 ⭐
          </span>
        </div>
        <AvatarSVG config={avatarConfig} size={52} />
        {/* 발 그림자 */}
        <div className="mx-auto mt-[-4px] h-1.5 w-8 bg-black/15 rounded-full blur-[2px]" />
      </motion.div>

      {/* 키보드 이동 힌트 */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[110] pointer-events-none"
          >
            <div className="bg-black/60 backdrop-blur-md text-white text-xs px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl">
              <span>⌨️</span>
              <span className="font-bold">방향키 / WASD</span>
              <span className="opacity-70">로 내 캐릭터를 이동하세요</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 리액션 & 이모지 레이어 */}
      <div className="absolute inset-0 pointer-events-none z-[60]">
        <AnimatePresence>
          {reactions.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.5, 1, 0.5], y: -180, x: (Math.random()-0.5)*50 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute text-5xl"
              style={{ left: `${r.x}%`, top: `${r.y}%`, transform: 'translateX(-50%)' }}
            >
              {r.emoji}
            </motion.div>
          ))}
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.8], y: [10, 0, 0, -20] }}
              transition={{ duration: 4, times: [0, 0.1, 0.8, 1], ease: 'easeInOut' }}
              className="absolute z-[70]"
              style={{ left: `${msg.x}%`, top: `${msg.y}%`, transform: 'translate(-50%, -100%)' }}
            >
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-rose-100 min-w-[80px] text-center">
                 <p className="text-xs font-bold text-primary whitespace-nowrap">{msg.text}</p>
                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45 border-r border-b border-rose-100" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 하단 공지사항 (Billboard) */}
      {billboardText && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-[80] w-full max-w-md">
           <div className="bg-white/40 backdrop-blur-xl border border-white/50 px-8 py-3 rounded-full shadow-2xl">
              <p className="text-base font-bold text-primary text-center tracking-widest uppercase truncate">{billboardText}</p>
           </div>
        </div>
      )}

      {/* 하단 컨트롤 바 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 glass-dark p-2 rounded-full shadow-2xl z-[100] backdrop-blur-2xl bg-black/5">
         <button onClick={sendCelebration} className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-lg">
            <Sparkles className="h-5 w-5" />
         </button>
         <div className="h-8 w-[1px] bg-primary/20 mx-1" />
         <div className="flex gap-1.5 px-2">
            {['👍', '❤️', '😂', '🎉', '🔥', '👏'].map((emoji) => (
               <button key={emoji} onClick={() => sendEmoji(emoji)} className="w-11 h-11 flex items-center justify-center text-2xl hover:bg-white/50 rounded-full active:scale-75 transition-all">
                  {emoji}
               </button>
            ))}
         </div>
      </div>
    </div>
  );
}
