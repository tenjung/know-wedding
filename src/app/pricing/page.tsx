"use client";

import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Crown, 
  Star, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import type { Metadata } from "next";

const PACKAGES = [
  {
    name: "Classic Studio",
    price: "₩390,000",
    description: "가장 본질적인 예식에 집중하고 싶은 분들을 위한 기본 서비스",
    features: [
      "가상 웨딩룸 1회 진행 (최대 30명)",
      "1년 디지털 아카이브 영구 보존",
      "클래식 디자인 테마 제공",
      "실시간 채팅 및 반응 시스템",
      "이메일 기술 지원"
    ],
    isPopular: false,
    color: "bg-white/40"
  },
  {
    name: "Grand Premiere",
    price: "₩990,000+",
    description: "두 사람만의 독창적인 이야기로 공간을 채우고 싶은 분들을 위한 커스텀 서비스",
    features: [
      "풀 커스텀 디자인 테마 (아트 디렉팅)",
      "무제한 디지털 아카이브 보관",
      "식전/식중 시네마틱 영상 제작",
      "프리미엄 기념 USB 패키지 배송",
      "1:1 전담 퍼스널 웨딩 매니저",
      "최대 100명 하객 동시 접속 지원"
    ],
    isPopular: true,
    color: "bg-primary text-white"
  }
];

export default function PricingPage() {
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

        <div className="space-y-24">
          {/* 헤더 섹션 */}
          <section className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-full shadow-sm">
               <Crown className="h-4 w-4 text-accent" />
               <span className="text-[11px] font-bold tracking-[0.25em] text-accent uppercase">Investment for Eternity</span>
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-serif text-primary tracking-tight">
                Our Pricing Plan.
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-light leading-relaxed">
                두 분의 소중한 순간에 맞는 최적의 플랜을 선택하세요. <br />
                형식은 간소화하고, 가치는 극대화했습니다.
              </p>
            </div>
          </section>

          {/* 패키지 카드 그리드 */}
          <section className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {PACKAGES.map((pkg, idx) => (
              <motion.div 
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col rounded-[50px] p-12 md:p-16 border border-accent/10 shadow-2xl backdrop-blur-xl ${pkg.color} ${pkg.isPopular ? 'scale-105 z-10' : ''}`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-lg">
                    Highest Value
                  </div>
                )}
                
                <div className="space-y-6 mb-12">
                  <h3 className="text-2xl font-bold tracking-widest uppercase">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{pkg.price}</span>
                  </div>
                  <p className={`text-sm font-light leading-relaxed ${pkg.isPopular ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-5 mb-12 flex-grow">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4 text-sm font-medium">
                      <CheckCircle2 className={`h-5 w-5 mt-0.5 shrink-0 ${pkg.isPopular ? 'text-accent' : 'text-primary'}`} />
                      <span className={pkg.isPopular ? 'opacity-90' : 'opacity-70'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/consult"
                  className={`w-full flex items-center justify-between px-8 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 ${
                    pkg.isPopular ? 'bg-white text-primary hover:shadow-2xl' : 'bg-primary text-white shadow-xl'
                  }`}
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </section>

          {/* 추가 혜택 & 수익 구조 */}
          <section className="bg-primary/5 rounded-[60px] p-12 md:p-20 border border-accent/10">
            <div className="grid md:grid-cols-3 gap-16">
               {[
                 { icon: Globe, title: "Global Scale", desc: "전 세계 어디서나 하객들이 화질 저하 없이 실시간으로 접속합니다." },
                 { icon: ShieldCheck, title: "Data Privacy", desc: "모든 예식 데이터와 아카이브는 고도의 보안 환경에서 안전하게 보관됩니다." },
                 { icon: Clock, title: "Rapid Support", desc: "준비 과정부터 행사 당일까지 전담 기술 팀이 24시간 대기합니다." }
               ].map((item, idx) => (
                 <div key={idx} className="space-y-6">
                    <div className="h-12 w-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-accent">
                       <item.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-lg font-bold text-primary tracking-tight">{item.title}</h4>
                       <p className="text-sm font-light text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* CTA 섹션 */}
          <section className="text-center py-20 bg-primary rounded-[60px] text-white overflow-hidden relative">
            <div className="absolute top-[-20%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-[100px] opacity-20" />
            <div className="relative z-10 space-y-10">
               <h2 className="text-4xl md:text-5xl font-serif">Ready to start your journey?</h2>
               <p className="text-white/60 font-light max-w-xl mx-auto uppercase tracking-widest text-xs">
                 더욱 자세한 내용이 궁금하시다면 지금 바로 웨딩 매니저와 상담하세요.
               </p>
               <div className="flex justify-center">
                  <Link href="/consult" className="bg-white text-primary px-12 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 hover:shadow-2xl transition-all">
                     Talk to Manager
                  </Link>
               </div>
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
         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.5em]">No Wedding, Know Wedding Platform</p>
      </footer>
    </div>
  );
}
