"use client";

import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Share2, 
  Music,
  Clock,
  MessageSquare,
  Radio
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

export function VipInvitationClient() {
  const { guestCount } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const supabase = createClient();
  const channelRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    
    // 실시간 채널 연결
    const channel = supabase.channel('room_vip_demo');
    channel.subscribe();
    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const sendBlessing = async () => {
    if (!message.trim()) {
      toast.error("축하 메시지를 입력해 주세요.");
      return;
    }

    setIsSending(true);
    try {
      // 가상 웨딩룸으로 실시간 전송 (Broadcast)
      channelRef.current?.send({
        type: 'broadcast',
        event: 'celebration',
        payload: {
          text: message,
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60,
        },
      });

      toast.success("축복의 메시지가 전달되었습니다!");
      setMessage("");
    } catch (error) {
       toast.error("전송에 실패했습니다.");
    } finally {
      setIsSending(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#f8f2ef] overflow-x-hidden selection:bg-accent/20">
      {/* 프리미엄 배경 요소 */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-background">
        <div className="absolute top-[-10%] left-[-5%] h-[60rem] w-[60rem] rounded-full bg-accent/10 opacity-60 blur-[130px]" />
        <div className="absolute bottom-[-5%] right-[-5%] h-[50rem] w-[50rem] rounded-full bg-primary/5 opacity-40 blur-[110px]" />
      </div>

      <main className="mx-auto max-w-[540px] shadow-2xl bg-white/40 backdrop-blur-sm min-h-screen relative">
        {/* 플로팅 컨트롤 (상단) */}
        <div className="absolute top-8 left-0 right-0 z-50 px-8 flex justify-between items-center">
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
            <Music className="h-3 w-3 text-accent animate-spin-slow" />
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">The Eternal Path</span>
          </div>
          <button className="h-10 w-10 glass rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-md">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* 히어로 커버 섹션 */}
        <section className="relative px-8 pt-24 pb-16 text-center space-y-12">
           <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <p className="text-[11px] font-bold tracking-[0.4em] text-accent uppercase">We Invite You to Our Story</p>
              <h1 className="text-5xl md:text-6xl font-serif text-primary leading-tight">
                Seojun <br />
                <span className="serif italic font-light text-accent text-4xl">&</span> <br />
                Jiwoo
              </h1>
           </div>

           <div className="relative group perspective-1000 animate-in fade-in scale-in-95 duration-1000 delay-300">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl ring-1 ring-muted/30">
                 <img 
                   src="https://images.unsplash.com/photo-1583939411023-1478287c8b94?auto=format&fit=crop&q=80" 
                   alt="Main Couple" 
                   className="h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent flex flex-col justify-end p-10 text-white text-left">
                    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-1">Our Beginning</p>
                    <h3 className="text-3xl font-serif">2026. 05. 24</h3>
                 </div>
              </div>
           </div>

           <div className="space-y-6 pt-10">
              <div className="flex justify-center gap-12 items-center">
                 <div className="text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">When</p>
                    <p className="text-sm font-medium text-primary uppercase">Sunday, 12:00 PM</p>
                 </div>
                 <div className="h-8 w-[0.5px] bg-muted/50" />
                 <div className="text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Where</p>
                    <p className="text-sm font-medium text-primary uppercase">Virtual VIP Hall</p>
                 </div>
              </div>
           </div>
        </section>

        {/* 인트로 메시지 */}
        <section className="px-12 py-20 bg-white/40 border-y border-muted/20">
           <div className="text-center space-y-8">
              <Heart className="h-6 w-6 text-accent mx-auto animate-pulse" />
              <p className="text-lg leading-relaxed text-primary font-light">
                함께 걷는 길이 언제나 <br />
                봄처럼 따뜻하고 <br />
                별처럼 빛나길 소망합니다. <br /><br />
                우리의 소중한 첫 출발에 <br />
                함께해 주시기를 바랍니다.
              </p>
              <div className="pt-6">
                 <p className="text-xs font-bold text-accent uppercase tracking-[0.2em]">Seojun & Jiwoo</p>
              </div>
           </div>
        </section>

        {/* 가상 웨딩홀 입장 배너 */}
        <section className="px-8 py-16">
           <div className="glass-card p-10 rounded-[50px] space-y-8 relative overflow-hidden shadow-xl border-accent/20">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Sparkles className="h-32 w-32 text-accent" />
              </div>
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-3">
                    <Radio className="h-4 w-4 text-accent animate-pulse" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Live Interactive Experience</span>
                 </div>
                 <h2 className="text-3xl font-serif text-primary leading-tight">
                   공간의 경계를 넘어, <br />
                   당신과 함께하는 순간.
                 </h2>
                 <p className="text-xs text-muted-foreground font-light leading-relaxed">
                   2D 아바타 기술로 구현된 우리만의 특별한 디지털 예식장에서 실시간으로 축하를 나누어 보세요.
                 </p>
                 <div className="pt-4">
                    <Link 
                      href="/virtual-room"
                      className="group flex items-center justify-between bg-primary text-white pl-8 pr-4 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-[1.02] hover:shadow-2xl"
                    >
                      Enter Virtual Room
                      <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                         <ChevronRight className="h-5 w-5" />
                      </div>
                    </Link>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest pt-2">
                    <Clock className="h-3 w-3" />
                    <span>Ceremony Starts in 15:24:02</span>
                 </div>
              </div>
           </div>
        </section>

        {/* 캘린더 & 위치 */}
        <section className="px-10 py-24 space-y-24">
           <div className="text-center space-y-12">
              <div className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-full">
                 <Calendar className="h-4 w-4 text-accent" />
                 <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Mark The Date</span>
              </div>
              <div className="space-y-4">
                 <h3 className="text-5xl font-serif text-primary">May 2026</h3>
                 <div className="grid grid-cols-7 gap-y-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => <div key={d}>{d}</div>)}
                    {Array.from({ length: 31 }).map((_, i) => (
                      <div key={i} className={`h-10 w-10 flex items-center justify-center rounded-full transition-all ${i + 1 === 24 ? 'bg-primary text-white shadow-lg' : 'hover:bg-accent/5'}`}>
                        {i + 1}
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-10">
              <div className="flex items-center gap-4 border-b border-muted/30 pb-6">
                 <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-primary">
                    <MapPin className="h-6 w-6" />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold text-primary">Virtual VIP Hall</h4>
                    <p className="text-xs text-muted-foreground font-light">전세계 어디서나 소중한 분들과 함께합니다.</p>
                 </div>
              </div>
              <button className="w-full glass py-5 rounded-2xl text-xs font-bold text-primary uppercase tracking-widest hover:bg-white transition-colors">
                 Copy Invitation URL
              </button>
           </div>
        </section>

        {/* 방명록 & RSVP */}
        <section className="px-8 py-24 bg-primary text-white rounded-t-[60px] space-y-12">
           <div className="text-center space-y-4">
              <h2 className="text-4xl font-serif">Blessing Message</h2>
              <p className="text-xs font-light text-white/60 leading-relaxed max-w-xs mx-auto uppercase tracking-widest">
                Our first step is made special by your presence and words.
              </p>
           </div>

           <div className="space-y-4">
              <div className="glass bg-white/10 p-6 rounded-3xl space-y-4 border-white/10">
                 <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest opacity-80">
                    <MessageSquare className="h-3 w-3" />
                    <span>Write for Us</span>
                 </div>
                 <textarea 
                   className="w-full bg-transparent border-none outline-none text-sm placeholder:text-white/30 resize-none h-24" 
                   placeholder="신랑 신부에게 축하의 메시지를 남겨주세요."
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
                   disabled={isSending}
                 />
                 <button 
                   onClick={sendBlessing}
                   disabled={isSending}
                   className="w-full bg-white text-primary py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all disabled:opacity-50"
                 >
                    {isSending ? "Sending..." : "Send Blessing"}
                 </button>
              </div>
           </div>

           <div className="pt-20 text-center pb-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                 <div className="h-[0.5px] w-12 bg-white/20" />
                 <Heart className="h-4 w-4 text-accent fill-accent" />
                 <div className="h-[0.5px] w-12 bg-white/20" />
              </div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">No Wedding, Know Wedding</p>
           </div>
        </section>
      </main>
    </div>
  );
}
