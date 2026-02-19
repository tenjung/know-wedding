"use client";

import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Archive, 
  PlayCircle, 
  Star, 
  ShieldCheck, 
  Globe,
  ArrowRight,
  Monitor,
  Video,
  Database
} from "lucide-react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Virtual Wedding Hall",
    tag: "Experience",
    desc: "물리적 공간을 넘어 전 세계 어디서나 하객들이 축복을 나눌 수 있는 2D 가상 예식장을 제공합니다. 실시간 상호작용과 감각적인 디자인이 만납니다.",
    icon: Monitor,
    features: ["실시간 2D 아타바 제어", "멀티엔드 서버 동기화", "상호작용성 이펙트 전송", "하객 통계 대시보드"]
  },
  {
    title: "Cinematic Archiving",
    tag: "Eternal",
    desc: "예식의 모든 대화, 영상, 그리고 하객들의 진심 어린 메시지를 4K 시네마틱 아카이브로 보관합니다. 시간이 흘러도 당시의 감동을 그대로 재현합니다.",
    icon: Video,
    features: ["고화질 자동 녹화 연동", "영구적 디지털 방명록", "지능형 데이터 요약", "전용 모바일 앱 제공"]
  },
  {
    title: "Premium Directing",
    tag: "Design",
    desc: "두 분의 예술적 취향과 스토리를 담은 전용 테마를 디자인합니다. 아이콘 하나, 배경 색상 하나에도 두 사람의 철학이 깃듭니다.",
    icon: Sparkles,
    features: ["1:1 아트 디렉팅 컨설팅", "독점 폰트 및 컬러 에셋", "커스텀 스킨 시스템", "모바일 청첩장 패키지"]
  }
];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen selection:bg-accent/20">
      {/* 프리미엄 배경 레이어 */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#fbf8f6]">
        <div className="absolute top-[-5%] left-[-10%] h-[50rem] w-[50rem] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12 md:py-24">
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
          {/* 헤더 섹션 */}
          <section className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-full shadow-sm">
               <Star className="h-4 w-4 text-accent" />
               <span className="text-[11px] font-bold tracking-[0.25em] text-accent uppercase">Curated Service Portfolio</span>
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-serif text-primary tracking-tight">
                Our Services.
              </h1>
              <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
                노웨딩은 전통적인 결혼식의 한계를 넘어, 기술과 예술이 조화된 <br />
                새로운 차원의 축하 경험을 설계합니다.
              </p>
            </div>
          </section>

          {/* 서비스 리스트 */}
          <section className="space-y-40">
             {SERVICES.map((service, idx) => (
               <motion.div 
                 key={service.title}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className={`flex flex-col lg:flex-row items-center gap-20 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
               >
                  <div className="flex-1 space-y-10">
                     <div className="space-y-4">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em]">{service.tag}</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary">{service.title}</h2>
                        <p className="text-lg text-muted-foreground font-light leading-relaxed">
                           {service.desc}
                        </p>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-6">
                        {service.features.map(f => (
                          <div key={f} className="flex items-center gap-3">
                             <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                             <span className="text-xs font-bold text-primary uppercase tracking-tight">{f}</span>
                          </div>
                        ))}
                     </div>
                     
                     <Link href="/consult" className="group inline-flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-[0.2em] border-b border-primary/20 pb-2 hover:border-primary transition-all">
                        상담 신청하기
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>
                  
                  <div className="flex-1 relative">
                     <div className="aspect-video bg-white/40 rounded-[60px] shadow-2xl overflow-hidden border border-accent/10 flex items-center justify-center group cursor-pointer">
                        <service.icon className="h-20 w-20 text-accent/20 group-hover:text-accent transition-all duration-700 group-hover:scale-125" />
                        <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-accent/5 to-transparent">
                           <div className="h-1 w-20 bg-accent rounded-full mb-4" />
                           <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Premium Module 0{idx+1}</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
             ))}
          </section>

          {/* 통계/신뢰 섹션 */}
          <section className="bg-primary p-12 md:p-24 rounded-[80px] text-white overflow-hidden relative">
             <div className="absolute top-[-20%] right-[-10%] h-[50rem] w-[50rem] rounded-full bg-accent/20 blur-[120px] opacity-20" />
             <div className="grid md:grid-cols-2 gap-20 items-center relative z-10">
                <div className="space-y-8">
                   <h2 className="text-4xl md:text-5xl font-serif">Trust the Future.</h2>
                   <p className="text-white/60 font-light leading-relaxed max-w-md">
                      우리는 이미 수많은 글로벌 유저들의 가장 소중한 순간을 기술력으로 지탱해왔습니다. 
                      99.9%의 가동률과 견고한 보안 정책은 우리의 자부심입니다.
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-10">
                   {[
                     { label: "Active Rooms", value: "3,200+" },
                     { label: "Guest Sessions", value: "1.2M" },
                     { label: "Security Updates", value: "Weekly" },
                     { label: "Uptime", value: "99.99%" }
                   ].map(stat => (
                     <div key={stat.label} className="space-y-2">
                        <p className="text-2xl font-bold font-serif">{stat.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* 하단 CTA */}
          <section className="text-center space-y-12">
             <div className="flex justify-center gap-3">
                <Heart className="h-4 w-4 text-accent/30" />
                <Heart className="h-4 w-4 text-accent/30" />
                <Heart className="h-4 w-4 text-accent/30" />
             </div>
             <div className="space-y-4">
                <h3 className="text-3xl font-serif text-primary">Ready to design your moment?</h3>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">우리의 전문가들이 두 분의 특별한 예식을 디자인해 드립니다.</p>
             </div>
             <Link href="/consult" className="inline-flex bg-accent text-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-xl">
                Consult With Us
             </Link>
          </section>
        </div>
      </main>

      <footer className="text-center pb-20 mt-20">
         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.5em]">Knowing the Essence, Know Wedding</p>
      </footer>
    </div>
  );
}
