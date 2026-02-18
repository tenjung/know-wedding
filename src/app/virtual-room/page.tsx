import Link from "next/link";

export default function VirtualRoomPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12 text-[#2d241d]">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e34]">Layer 3</p>
      <h1 className="mt-2 text-4xl font-bold">VIP 노웨딩 가상공간</h1>
      <p className="mt-4 text-lg text-[#5a4738]">실시간 2D 아바타 룸에서 축하 참여와 구매 이벤트를 동시에 만듭니다.</p>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-5"><h2 className="font-bold">실시간</h2><p className="mt-2 text-sm">입장, 이동, 채팅, 상태 전환.</p></article>
        <article className="rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-5"><h2 className="font-bold">수익</h2><p className="mt-2 text-sm">전광판/장식/이펙트 구매와 즉시 반영.</p></article>
        <article className="rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-5"><h2 className="font-bold">기록</h2><p className="mt-2 text-sm">행사 종료 후 아카이브 자동 전환.</p></article>
      </section>
      <div className="mt-8 flex gap-3">
        <Link className="inline-flex rounded-full bg-[#4b2e1f] px-5 py-3 text-sm font-semibold text-[#fff8ee]" href="/dev/room-control">개발 콘솔 이동</Link>
        <Link className="inline-flex rounded-full border border-[#8b5e34] px-5 py-3 text-sm font-semibold text-[#6f4424]" href="/">홈으로</Link>
      </div>
    </main>
  );
}
