"use client";

import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Target, 
  Compass, 
  Zap, 
  Quote,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen selection:bg-accent/20 overflow-x-hidden">
      {/* 프리미엄 배경 레이어 */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#fbf8f6]">
        <div className="absolute top-[-5%] left-[-10%] h-[50rem] w-[50rem] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-24">
        {/* 네비게이션 */}
        <div className="mb-20">
          <Link href="/" className="group inline-flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
            <div className="h-8 w-8 rounded-full border border-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Home
          </Link>
        </div>

        <div className="space-y-32">
          {/* 타이틀 섹션 */}
          <section className="space-y-12">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-8"
            >
               <div className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-full shadow-sm">
                  <Compass className="h-4 w-4 text-accent" />
                  <span className="text-[11px] font-bold tracking-[0.25em] text-accent uppercase">Our Vision & Essence</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-serif text-primary leading-[0.9] tracking-tighter">
                  Beyond <br />
                  <span className="serif italic font-light text-accent">Ceremony.</span>
               </h1>
            </motion.div>
            
            <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl"
            >
               우리는 결혼식이 단순히 '보여주는 쇼'가 아닌, <span className="text-primary font-medium">두 사람의 본질적인 결합과 약속</span>의 순간으로 남기를 원합니다. 
               공간의 한계를 넘어 진심이 닿는 예식을 창조하는 것, 그것이 노웨딩(Know Wedding)의 시작입니다.
            </motion.p>
          </section>

          {/* 철학 섹션 */}
          <section className="grid md:grid-cols-2 gap-20 items-center">
             <div className="relative group">
                <div className="aspect-[3/4] rounded-[60px] overflow-hidden shadow-2xl">
                   <img 
                     src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80" 
                     alt="Vision" 
                     className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                   />
                </div>
                <div className="absolute -bottom-10 -right-10 glass-card p-10 rounded-[40px] shadow-2xl border-accent/20 max-w-xs animate-float">
                   <Target className="h-8 w-8 text-accent mb-4" />
                   <h3 className="text-xl font-bold text-primary mb-2">The Authentic Way</h3>
                   <p className="text-xs text-muted-foreground font-light leading-relaxed">복잡한 절차보다 진심 어린 축복과 영원한 기록에 가치를 둡니다.</p>
                </div>
             </div>
             
             <div className="space-y-12">
                <div className="space-y-6">
                   <h2 className="text-4xl font-serif text-primary">Knowing the <br />Real Wedding.</h2>
                   <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      과거의 전통과 미래의 기술이 만나 새로운 형태의 결혼 문화를 제안합니다. 
                      우리는 2D 아바타를 통해 하객들과 눈을 맞추고, 모든 순간을 데이터로 영구 보존하며, 
                      전 세계 어디서나 소중한 분들이 함께할 수 있는 디지털 유토피아를 지향합니다.
                   </p>
                </div>
                
                <div className="grid gap-6">
                   {[
                     { title: "Pure Connection", desc: "거리와 관계없이 모두가 실시간으로 소통하는 인터랙티브 환경" },
                     { title: "Eternal Record", desc: "휘발되는 순간이 아닌 영구 보존되는 디지털 아카이브" },
                     { title: "Personal Story", desc: "두 사람의 취향과 철학이 담긴 고유의 디자인 테마" }
                   ].map((item, idx) => (
                     <div key={idx} className="flex gap-6 items-start">
                        <div className="h-6 w-6 rounded-full border border-accent flex-shrink-0 mt-1 flex items-center justify-center text-[10px] text-accent font-bold">0{idx+1}</div>
                        <div className="space-y-2">
                           <h4 className="text-sm font-bold text-primary">{item.title}</h4>
                           <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* 인용구 섹션 */}
          <section className="py-24 border-y border-muted/20 relative">
             <Quote className="absolute top-10 left-0 h-40 w-40 text-primary opacity-[0.03] -z-10" />
             <div className="max-w-3xl mx-auto text-center space-y-10">
                <h3 className="text-3xl md:text-5xl font-serif text-primary italic leading-tight">
                  "우리의 목표는 결혼식을 대신하는 것이 아니라, <br />
                  결혼식의 본질을 더 깊게 <span className="text-accent">알아가는(Know)</span> 것입니다."
                </h3>
                <p className="text-[10px] font-bold text-accent uppercase tracking-[0.5em]">CEO Of Know Wedding platform</p>
             </div>
          </section>

          {/* 팀/브랜드 섹션 */}
          <section className="space-y-16">
             <div className="text-center space-y-4">
                <h2 className="text-4xl font-serif text-primary">Innovation Together.</h2>
                <p className="text-sm text-muted-foreground font-light uppercase tracking-widest leading-relaxed">
                   각 분야의 예술가와 개발자들이 모여 <br />
                   당신의 가장 아름다운 순간을 설계합니다.
                </p>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1,2,3,4].map(idx => (
                  <div key={idx} className="glass p-8 rounded-[40px] space-y-6 text-center group hover:bg-white transition-all">
                     <div className="h-20 w-20 rounded-full bg-secondary mx-auto overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                        <img src={`https://i.pravatar.cc/150?img=${idx+10}`} alt="Team" className="h-full w-full object-cover" />
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-sm font-bold text-primary">Creative Mind</h4>
                        <p className="text-[10px] text-accent uppercase tracking-widest">Director 0{idx}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* CTA 섹션 */}
          <section className="pt-20 text-center">
             <div className="space-y-10">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.4em]">Are you ready to redefine your wedding?</p>
                <Link href="/consult" className="group inline-flex items-center gap-6 bg-primary text-white pl-12 pr-6 py-6 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl">
                   Start Your Journey
                   <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="h-4 w-4" />
                   </div>
                </Link>
             </div>
          </section>
        </div>
      </main>

      <footer className="text-center pb-20">
         <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[0.5px] w-12 bg-primary/10" />
            <Sparkles className="h-4 w-4 text-accent/30" />
            <div className="h-[0.5px] w-12 bg-primary/10" />
         </div>
         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.5em]">Knowing the Essence, Know Wedding</p>
      </footer>
    </div>
  );
}
