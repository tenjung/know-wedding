import Link from "next/link";

export default function VipInvitationPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-12 text-[#2d241d]">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e34]">Layer 2</p>
      <h1 className="mt-2 text-4xl font-bold">VIP 디자인 초대장</h1>
      <p className="mt-4 text-lg text-[#5a4738]">프리미엄 커스터마이징으로 &quot;우리다운&quot; 결혼 서사를 표현합니다.</p>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-5"><h2 className="font-bold">디자인 옵션</h2><p className="mt-2 text-sm">타이포 테마, 컬러 팔레트, 모션 커버, 스토리 섹션.</p></article>
        <article className="rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-5"><h2 className="font-bold">매출 포인트</h2><p className="mt-2 text-sm">템플릿 업셀, 브랜드 커스텀, 전문 편집 서비스.</p></article>
      </section>
      <Link className="mt-8 inline-flex rounded-full bg-[#4b2e1f] px-5 py-3 text-sm font-semibold text-[#fff8ee]" href="/">홈으로</Link>
    </main>
  );
}
