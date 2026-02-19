import type { Metadata } from "next";
import { ConsultForm } from "./ConsultForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "상담 신청 | Know Wedding",
  description: "두 분만의 특별한 결혼 이야기를 들려주세요. Know Wedding 유선 및 비대면 상담 신청 페이지입니다.",
};

export default function ConsultPage() {
  return (
    <div className="relative min-h-screen selection:bg-accent/20">
      {/* 프리미엄 배경 레이어 */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#fbf8f6]">
        <div className="absolute top-[-5%] left-[-10%] h-[50rem] w-[50rem] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <main className="mx-auto max-w-3xl px-6 py-12 md:py-24">
        {/* 네비게이션 */}
        <div className="mb-20">
          <Link href="/" className="group inline-flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
            <div className="h-8 w-8 rounded-full border border-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Home
          </Link>
        </div>

        <div className="space-y-20">
          {/* 헤더 섹션 */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-serif text-primary tracking-tight">
              Begin Your Story
            </h1>
            <p className="text-lg text-muted-foreground font-light max-w-lg leading-relaxed">
              격식에 얽매이지 않는, 두 분만을 위한 <br />
              진정한 예식이 여기에서 시작됩니다.
            </p>
          </div>

          {/* 인트랙티브 폼 */}
          <section className="glass-card p-8 md:p-16 rounded-[60px] shadow-2xl bg-white/40 backdrop-blur-xl border-accent/10">
            <ConsultForm />
          </section>

          {/* 추가 정보 */}
          <div className="grid md:grid-cols-2 gap-10 pt-10">
             <div className="space-y-3">
                <h4 className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Contact Us</h4>
                <p className="text-sm font-light text-muted-foreground">hello@knowwedding.com</p>
                <p className="text-sm font-light text-muted-foreground">1588-0000 (09:00 - 18:00)</p>
             </div>
             <div className="space-y-3 md:text-right">
                <h4 className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Our Office</h4>
                <p className="text-sm font-light text-muted-foreground">서울특별시 강남구 테헤란로</p>
                <p className="text-sm font-light text-muted-foreground">Know Wedding Studio 1F</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
