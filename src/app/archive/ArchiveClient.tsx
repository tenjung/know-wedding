"use client";

import { useAppStore } from "@/lib/store";
import { 
  Heart, 
  Image as ImageIcon, 
  MessageSquare, 
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Sparkles,
  Download,
  Users
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Mock Data for Demo
const ARCHIVED_MESSAGES = [
  { id: 1, name: "김민석", text: "두 분의 앞날에 축복이 가득하길 빌어요!", time: "12:05 PM" },
  { id: 2, name: "이지연", text: "진짜 너무 예뻐요... 공주님 같아요!", time: "12:12 PM" },
  { id: 3, name: "박성준", text: "평생 행복하게 잘 사세요!", time: "12:20 PM" },
  { id: 4, name: "최유진", text: "가상 예식이라니 너무 신기하고 멋져요.", time: "12:35 PM" },
  { id: 5, name: "정훈", text: "축하한다 서준아! 잘 살아라!", time: "12:44 PM" },
  { id: 6, name: "김태희", text: "세상에서 가장 아름다운 커플입니다.", time: "01:02 PM" },
];

const ARCHIVED_MEDIA = [
  { id: 1, type: "image", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80", caption: "Ceremony Start" },
  { id: 2, type: "image", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80", caption: "Main Hall" },
  { id: 3, type: "image", url: "https://images.unsplash.com/photo-1460364154753-15962f3f7253?auto=format&fit=crop&q=80", caption: "After Party" },
  { id: 4, type: "image", url: "https://images.unsplash.com/photo-1519225495810-753b55230c1d?auto=format&fit=crop&q=80", caption: "Blessing Moments" },
];

export function ArchiveClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#f1f1f1] selection:bg-accent/20">
      {/* 프리미엄 배경 레이어 */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] h-[60rem] w-[60rem] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[50rem] w-[50rem] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-20 space-y-24">
        {/* 헤더 & 네비게이션 */}
        <header className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
            <div className="h-8 w-8 rounded-full border border-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <Archive className="h-3 w-3 text-accent" />
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Permanent Record</span>
            </div>
            <button className="h-10 w-10 glass rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* 타이틀 섹션 */}
        <section className="text-center space-y-8">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-3 glass px-4 py-1.5 rounded-full text-accent shadow-sm">
                 <Sparkles className="h-3 w-3" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Memories are Eternal</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-primary">
                Seojun <span className="serif italic font-light">&</span> Jiwoo
              </h1>
              <p className="text-sm font-light text-muted-foreground tracking-[0.2em] uppercase">
                May 24, 2026 — Digital Wedding Archive
              </p>
           </div>
           
           <div className="flex justify-center gap-12 pt-6">
              {[
                { icon: Users, label: "Total Guests", value: "324" },
                { icon: MessageSquare, label: "Blessings", value: "1,240" },
                { icon: ImageIcon, label: "Moments", value: "48" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center group cursor-default">
                   <stat.icon className="h-5 w-5 text-accent/40 mx-auto mb-2 group-hover:text-accent transition-colors" />
                   <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                   <p className="text-xl font-bold text-primary">{stat.value}</p>
                </div>
              ))}
           </div>
        </section>

        {/* 미디어 그리드 섹션 */}
        <section className="space-y-10">
           <div className="flex items-end justify-between border-b border-muted/30 pb-6">
              <div className="space-y-1">
                 <h2 className="text-2xl font-serif text-primary">Photo Moments</h2>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Captured Highlights of the Celebration</p>
              </div>
              <button className="text-[10px] font-bold text-accent uppercase tracking-widest border-b border-accent flex items-center gap-2 pb-1 hover:text-primary hover:border-primary transition-all">
                 <Download className="h-3 w-3" />
                 Download All
              </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ARCHIVED_MEDIA.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative h-80 rounded-[32px] overflow-hidden shadow-lg border border-white/20"
                >
                   <img src={item.url} alt={item.caption} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <p className="text-white text-xs font-bold uppercase tracking-widest">{item.caption}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* 방명록 월 (Wall) */}
        <section className="space-y-10">
           <div className="flex items-end justify-between border-b border-muted/30 pb-6">
              <div className="space-y-1">
                 <h2 className="text-2xl font-serif text-primary">Blessing Wall</h2>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Warm Words from our loved ones</p>
              </div>
           </div>
           
           <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {ARCHIVED_MESSAGES.map((msg, idx) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="break-inside-avoid glass p-8 rounded-[40px] space-y-4 hover:shadow-xl transition-all border-white/40"
                >
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Heart className="h-3 w-3 text-primary" />
                         </div>
                         <span className="text-xs font-bold text-primary">{msg.name}</span>
                      </div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase">{msg.time}</span>
                   </div>
                   <p className="text-sm font-light text-primary/80 leading-relaxed italic">
                      "{msg.text}"
                   </p>
                </motion.div>
              ))}
           </div>
        </section>

        {/* 하단 푸터 */}
        <footer className="pt-20 pb-10 text-center space-y-12">
           <div className="flex items-center justify-center gap-4">
              <div className="h-[0.5px] w-20 bg-primary/10" />
              <Sparkles className="h-5 w-5 text-accent/30" />
              <div className="h-[0.5px] w-20 bg-primary/10" />
           </div>
           
           <div className="space-y-4">
              <p className="text-2xl font-serif text-primary">Know Wedding Archive</p>
              <p className="text-[10px] font-bold text-muted-foreground tracking-[0.5em] uppercase">The Story Continues Forever</p>
           </div>
           
           <div className="pt-10">
              <Link href="/consult" className="glass px-10 py-4 rounded-full text-[10px] font-bold text-primary uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all">
                 Request Your Own Archive
              </Link>
           </div>
        </footer>
      </main>
    </div>
  );
}

// Helper Archive icon
function Archive(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}
