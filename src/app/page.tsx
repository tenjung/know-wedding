import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Archive, PlayCircle, Star, ShieldCheck, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Know Wedding | 당신의 결혼을 정의하는 새로운 방식",
  description: "실시간 2D 아타바 가상 웨딩과 영구 보존되는 아카이브. '우리다운' 결혼의 시작, 노웨딩(Know Wedding) 플랫폼에서 경험하세요.",
  openGraph: {
    title: "Know Wedding | 프리미엄 디지털 웨딩 플랫폼",
    description: "공간의 제약을 넘어 실시간으로 소통하는 하이엔드 가상 예식.",
    images: ["/og-image.jpg"],
  },
};

const steps = [
  {
    title: "설레는 초대",
    desc: "모바일 청첩장을 통해 소중한 분들께 디지털 공간으로의 첫 초대장을 보냅니다.",
    icon: Sparkles,
    tag: "Invitation",
  },
  {
    title: "실시간 동행",
    desc: "2D 아바타로 구현된 예식장에서 하객들과 실시간으로 눈을 맞추며 축하를 나눕니다.",
    icon: Heart,
    tag: "Experience",
  },
  {
    title: "영원한 기록",
    desc: "모든 순간의 대화, 영상, 축복의 메시지는 아름다운 아카이브로 평생 보존됩니다.",
    icon: Archive,
    tag: "Archive",
  },
];

const plans = [
  {
    name: "Classic Studio",
    price: "₩390,000",
    features: ["가상 웨딩룸 1회 진행", "1년 디지털 아카이브 보관", "기본 테마 제공", "이메일 기술 지원"],
    isPopular: false,
  },
  {
    name: "Grand Premiere",
    price: "₩990,000+",
    features: ["커스텀 테마 디자인", "무제한 아카이브 보관", "식전 영상 제작", "기념 USB 패키지", "1:1 퍼스널 매니저"],
    isPopular: true,
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* 프리미엄 배경 레이어 */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-background">
        <div className="absolute left-[-10%] top-[-5%] h-[60rem] w-[60rem] rounded-full bg-accent/10 opacity-60 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[50rem] w-[50rem] rounded-full bg-primary/5 opacity-40 blur-[100px]" />
      </div>

      <main className="mx-auto max-w-7xl px-6">
        {/* 네비게이션 */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-serif text-xl shadow-lg">W</div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-widest uppercase text-primary leading-none">No Wedding</span>
              <span className="text-[10px] font-medium tracking-[0.3em] text-accent uppercase">Knowing the Essence</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {["Services", "Archive", "Plans", "About"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
                {item}
              </Link>
            ))}
            <Link 
              href="/virtual-room" 
              className="glass px-7 py-3 rounded-full text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white shadow-sm hover:shadow-md"
            >
              Demo Experience
            </Link>
          </div>
        </nav>

        {/* 히어로 섹션 */}
        <section className="relative pt-12 pb-24 md:pt-16 md:pb-32">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-12">
              <div className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-default">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-[11px] font-bold tracking-[0.25em] text-accent uppercase">The Future of Celebration</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-6xl font-medium leading-[1.05] text-primary md:text-[5.5rem] tracking-tight">
                  Wedding, <br />
                  <span className="italic font-light serif text-accent">Without</span> The Stage.
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl font-light">
                  우리는 정해진 형식보다 <span className="text-primary font-medium">두 사람의 본질적인 이야기</span>에 집중합니다. 
                  가장 아름다운 디지털 공간에서 소중한 사람들과의 진정한 연결을 경험하세요.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-4">
                <Link
                  href="/virtual-room"
                  className="group flex items-center gap-4 bg-primary px-10 py-5 rounded-full text-lg font-bold text-white transition-all hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(74,37,33,0.15)] active:scale-95"
                >
                  가상 웨딩 체험하기
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/pricing"
                  className="glass px-10 py-5 rounded-full text-lg font-bold text-primary transition-all hover:bg-white/90 hover:shadow-md"
                >
                  플랜 보기
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-muted/30">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold text-primary shadow-sm overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-accent text-accent" />)}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Trusted by 500+ couples</p>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-10">
              <div className="animate-float glass-card overflow-hidden rounded-[50px] p-3 shadow-2xl">
                <div 
                  className="aspect-[4/5] rounded-[42px] bg-cover bg-center md:aspect-[3.5/4] transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80')" }}
                >
                  <div className="h-full w-full bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex flex-col justify-end p-10 text-white">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-90 mb-3 border-l-2 border-accent pl-3">Exclusive Experience</p>
                    <h3 className="text-4xl font-serif mb-2">The Eternal Moment</h3>
                    <p className="text-sm font-light opacity-80 max-w-xs">당신의 모든 순간이 영원이 되는 곳, 노웨딩입니다.</p>
                  </div>
                </div>
              </div>
              
              {/* 장식 요소 */}
              <div className="absolute -bottom-12 -left-8 -z-10 h-72 w-72 rounded-full border-[0.5px] border-accent/30 animate-pulse" />
              <div className="absolute top-1/2 -right-8 -z-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
            </div>
          </div>
        </section>

        {/* 특장점 섹션 */}
        <section className="py-24 md:py-32">
          <div className="mb-16 space-y-6 text-center">
            <h2 className="text-5xl font-medium text-primary md:text-6xl tracking-tight">Our Journey Together</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground font-light text-xl">
              단순한 온라인 미팅이 아닙니다. 예술적인 감각으로 빚어낸 <br />
              고품격 디지털 웨딩 아카이빙 플랫폼입니다.
            </p>
          </div>
          
          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div key={step.title} className="glass-card group p-12 transition-all hover:bg-white hover:-translate-y-3 hover:shadow-2xl">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-12 shadow-inner">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">{step.tag} — 0{idx + 1}</p>
                  <h3 className="text-2xl font-bold text-primary">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light text-base">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 차별화 요소 (Statistics/Trusted) */}
        <section className="py-16 border-y border-muted/20 my-16">
          <div className="grid gap-12 md:grid-cols-3 text-center">
            <div>
              <div className="text-5xl font-serif text-primary mb-3">99.9%</div>
              <p className="text-xs font-bold text-accent uppercase tracking-widest">Success Rate</p>
            </div>
            <div>
              <div className="text-5xl font-serif text-primary mb-3">1,200+</div>
              <p className="text-xs font-bold text-accent uppercase tracking-widest">Stories Saved</p>
            </div>
            <div>
              <div className="text-5xl font-serif text-primary mb-3">24/7</div>
              <p className="text-xs font-bold text-accent uppercase tracking-widest">Expert Support</p>
            </div>
          </div>
        </section>

        {/* 가격 플랜 섹션 */}
        <section className="py-24 md:py-32">
          <div className="glass-card overflow-hidden rounded-[60px] grid lg:grid-cols-[0.8fr_1.2fr] shadow-2xl">
            <div className="bg-primary p-16 text-white flex flex-col justify-center relative overflow-hidden">
              {/* 장식용 원 */}
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
              
              <div className="relative z-10 space-y-8">
                <h2 className="text-5xl font-serif leading-tight">Pick Your <br /><span className="text-accent italic font-light serif">Perfect</span> Plan.</h2>
                <p className="text-white/70 font-light leading-relaxed text-lg">
                  두 분의 소중한 순간에 맞는 <br />최적의 플랜을 제안해 드립니다. <br />
                  형식은 빼고, 감동은 더했습니다.
                </p>
                <div className="space-y-5 pt-8">
                  {[
                    { icon: Globe, text: "글로벌 어디서나 접속 가능한 예식" },
                    { icon: ShieldCheck, text: "안전한 프라이빗 데이터 보안" },
                    { icon: Star, text: "예술가들이 디자인한 프리미엄 테마" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-sm text-white/90">
                      <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-accent" />
                      </div>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-16 grid gap-10 md:grid-cols-2 bg-white/50 backdrop-blur-sm">
              {plans.map((plan) => (
                <div key={plan.name} className={`relative flex flex-col rounded-[40px] p-12 border transition-all duration-500 ${plan.isPopular ? 'border-accent bg-white shadow-[0_30px_60px_rgba(185,130,110,0.15)] scale-105 z-10' : 'border-muted/50 bg-white/30 hover:bg-white/60'}`}>
                  {plan.isPopular && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg">Most Popular</span>
                  )}
                  <div className="mb-10">
                    <h3 className="text-xl font-bold text-primary tracking-widest uppercase mb-4">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    </div>
                  </div>
                  <ul className="space-y-5 mb-12 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4 text-sm text-muted-foreground font-medium">
                        <Heart className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-5 rounded-full text-sm font-bold transition-all shadow-sm ${plan.isPopular ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-xl hover:scale-[1.02]' : 'bg-secondary text-primary hover:bg-muted/50'}`}>
                    이 플랜으로 시작하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-24 text-center">
          <div className="glass-card max-w-4xl mx-auto p-20 rounded-[50px] space-y-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10">
                <Sparkles className="h-40 w-40 text-accent" />
             </div>
             <h2 className="text-4xl md:text-5xl font-medium text-primary leading-tight">
               당신의 특별한 날을 <br /> 영원의 기록으로 남기세요.
             </h2>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/consult" className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-full font-bold text-lg hover:shadow-xl transition-all">
                  전문가 상담 신청
                </Link>
                <Link href="/demo" className="w-full sm:w-auto border border-primary text-primary px-12 py-5 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all">
                  둘러보기
                </Link>
             </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="mt-32 pb-16 pt-16 border-t border-muted/30">
          <div className="grid gap-12 md:grid-cols-4 mb-16">
            <div className="md:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-serif text-lg">W</div>
                <span className="font-serif text-xl font-bold text-primary">No Wedding</span>
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                결혼식의 본질을 찾는 여정, <br />
                노웨딩이 함께합니다.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Platform</h4>
              <ul className="space-y-3">
                {["Virtual Room", "Marketplace", "Archive", "Member"].map(item => (
                  <li key={item}><Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Company</h4>
              <ul className="space-y-3">
                {["Story", "Team", "Contact", "Careers"].map(item => (
                  <li key={item}><Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Resources</h4>
              <ul className="space-y-3">
                {["Guide", "Terms", "Privacy", "FAQ"].map(item => (
                  <li key={item}><Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-muted/10">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em]">© 2026 No Wedding, Know Wedding. All rights reserved.</p>
            <div className="flex gap-6">
              {["Instagram", "Twitter", "Facebook"].map(item => (
                <Link key={item} href="#" className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">{item}</Link>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
