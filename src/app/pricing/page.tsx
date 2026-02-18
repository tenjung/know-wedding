import Link from "next/link";

const packages = [
  {
    name: "기본 가상 웨딩룸",
    price: "39만원",
    points: ["1회 행사", "1년 보관"],
  },
  {
    name: "프리미엄 패키지",
    price: "99만원+",
    points: ["커스텀 테마", "영상 제작", "무기한 보관", "USB 전달"],
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12 text-[#2d241d]">
      <h1 className="text-4xl font-bold">수익화/가격 정책</h1>
      <p className="mt-3 text-lg text-[#5a4738]">No Wedding의 직접 수익 방향을 제품 구조에 고정합니다.</p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {packages.map((pkg) => (
          <article key={pkg.name} className="rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-6">
            <h2 className="text-2xl font-bold">{pkg.name}</h2>
            <p className="mt-2 text-3xl font-extrabold text-[#8b5e34]">{pkg.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-[#5a4738]">
              {pkg.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-6">
        <h2 className="text-2xl font-bold">업셀 퍼널</h2>
        <p className="mt-2 text-sm text-[#5a4738]">무료 청첩장 -&gt; 디자인 VIP -&gt; 가상 웨딩 -&gt; 영상 제작 추가</p>
      </section>

      <section className="mt-8 rounded-2xl border border-[#dbcab8] bg-[#fffaf2] p-6">
        <h2 className="text-2xl font-bold">추가 수익원</h2>
        <ul className="mt-3 space-y-2 text-sm text-[#5a4738]">
          <li>- 테마 마켓 판매</li>
          <li>- 데이터 연장 보관</li>
          <li>- 제휴 광고</li>
          <li>- 촬영 패키지 연계</li>
        </ul>
      </section>

      <Link className="mt-8 inline-flex rounded-full bg-[#4b2e1f] px-5 py-3 text-sm font-semibold text-[#fff8ee]" href="/">
        홈으로
      </Link>
    </main>
  );
}
