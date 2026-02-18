import Link from "next/link";

export default function ArchivePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-12 text-[#2d241d]">
      <h1 className="text-4xl font-bold">웨딩 아카이브</h1>
      <p className="mt-4 text-lg text-[#5a4738]">축하 메시지, 구매 이벤트, 업로드 미디어를 행사 종료 후에도 한 페이지에서 보존합니다.</p>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-5"><h2 className="font-bold">축하 로그</h2><p className="mt-2 text-sm">채팅/스탬프/전광판 이력</p></article>
        <article className="rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-5"><h2 className="font-bold">미디어</h2><p className="mt-2 text-sm">사진/영상/메시지 카드</p></article>
        <article className="rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-5"><h2 className="font-bold">정산</h2><p className="mt-2 text-sm">구매 합계, 수수료, 실정산</p></article>
      </section>
      <Link className="mt-8 inline-flex rounded-full bg-[#4b2e1f] px-5 py-3 text-sm font-semibold text-[#fff8ee]" href="/">홈으로</Link>
    </main>
  );
}
