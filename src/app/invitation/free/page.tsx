import Link from "next/link";

export default function FreeInvitationPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-12 text-[#2d241d]">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e34]">Layer 1</p>
      <h1 className="mt-2 text-4xl font-bold">무료 모바일 청첩장</h1>
      <p className="mt-4 text-lg text-[#5a4738]">첫 진입 채널. 결혼 소식 전달과 RSVP를 단순하고 빠르게 처리합니다.</p>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-5"><h2 className="font-bold">필수 기능</h2><p className="mt-2 text-sm">커플 소개, 일정/지도, 캘린더 저장, 공유 링크.</p></article>
        <article className="rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-5"><h2 className="font-bold">KPI</h2><p className="mt-2 text-sm">링크 클릭률, RSVP 전환율, VIP 레이어 전환율.</p></article>
      </section>
      <Link className="mt-8 inline-flex rounded-full bg-[#4b2e1f] px-5 py-3 text-sm font-semibold text-[#fff8ee]" href="/">홈으로</Link>
    </main>
  );
}
