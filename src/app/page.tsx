import Link from "next/link";

const layers = [
  {
    id: "Layer 1",
    title: "무료 모바일 청첩장",
    desc: "결혼식을 하지 않아도 지인에게 관계 변화와 소식을 자연스럽게 전달하는 유입 채널.",
    href: "/invitation/free",
    cta: "무료 시작",
  },
  {
    id: "Layer 2",
    title: "VIP 디자인 초대장",
    desc: "브랜드형 레이아웃, 커스텀 타이포, 애니메이션 테마로 커플 서사를 표현하는 프리미엄 레이어.",
    href: "/invitation/vip",
    cta: "VIP 보기",
  },
  {
    id: "Layer 3",
    title: "VIP 노웨딩 가상공간",
    desc: "실시간 2D 아바타 웨딩룸에서 축하, 메시지, 구매 이벤트, 기록 아카이브까지 연결하는 핵심 수익 레이어.",
    href: "/virtual-room",
    cta: "가상공간 체험",
  },
];

const problems = [
  "과도한 결혼식 비용과 보여주기식 행사 피로",
  "직접 참석이 어려운 하객 증가",
  "노웨딩 선택 시 축하/축의금/기록의 명분 약화",
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f3eb] text-[#1f2937]">
      <div className="pointer-events-none absolute -left-40 top-[-120px] h-96 w-96 rounded-full bg-[#ffd8a8] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#a8dadc] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-160px] left-1/3 h-96 w-96 rounded-full bg-[#f1c0e8] opacity-70 blur-3xl" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="rounded-3xl border border-[#b7a796] bg-[#fff8ee]/90 p-8 shadow-[0_14px_36px_rgba(70,40,20,0.12)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b5e34]">No Wedding, Know Wedding</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-[#4b2e1f] md:text-5xl">
            행사는 줄이고, 결혼의 본질은 더 선명하게
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5b4a3b] md:text-lg">
            알림, 축하, 축의금, 기록 보존을 하나의 디지털 웨딩 경험으로 설계합니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/virtual-room" className="rounded-full bg-[#4b2e1f] px-5 py-3 text-sm font-semibold text-[#fff8ee] transition hover:-translate-y-0.5">
              가상공간 바로가기
            </Link>
            <Link href="/archive" className="rounded-full border border-[#8b5e34] px-5 py-3 text-sm font-semibold text-[#6f4424] transition hover:bg-[#f4e7d7]">
              아카이브 구조 보기
            </Link>
            <Link href="/dev/room-control" className="rounded-full border border-[#2d6a6d] px-5 py-3 text-sm font-semibold text-[#1f6b70] transition hover:bg-[#e7f5f5]">
              개발 콘솔
            </Link>
          </div>
        </header>

        <section className="grid gap-4 rounded-3xl border border-[#e7d9c8] bg-[#fffdf9] p-6 md:grid-cols-3">
          {problems.map((problem) => (
            <article key={problem} className="rounded-2xl bg-[#fdf5e8] p-4 text-sm text-[#604633] shadow-sm">
              {problem}
            </article>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#4b2e1f] md:text-3xl">서비스 레이어 구조</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {layers.map((layer, index) => (
              <article
                key={layer.id}
                className="group rounded-3xl border border-[#d8c6b3] bg-[#fff8ee] p-6 shadow-[0_10px_24px_rgba(80,40,10,0.08)] transition hover:-translate-y-1"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b5e34]">{layer.id}</p>
                <h3 className="mt-2 text-xl font-bold text-[#4b2e1f]">{layer.title}</h3>
                <p className="mt-3 min-h-20 text-sm leading-relaxed text-[#5b4a3b]">{layer.desc}</p>
                <Link href={layer.href} className="mt-6 inline-flex rounded-full border border-[#8b5e34] px-4 py-2 text-sm font-semibold text-[#6f4424] transition group-hover:bg-[#f4e7d7]">
                  {layer.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[#d8c6b3] bg-[#fff8ee] p-6">
          <h2 className="text-2xl font-bold text-[#4b2e1f]">운영 구조</h2>
          <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
            <div className="rounded-xl bg-[#f9ecdb] p-3"><b>알림</b><p className="mt-1">모바일 청첩장 링크 배포</p></div>
            <div className="rounded-xl bg-[#f9ecdb] p-3"><b>축하</b><p className="mt-1">실시간 채팅/메시지/아바타</p></div>
            <div className="rounded-xl bg-[#f9ecdb] p-3"><b>축의금</b><p className="mt-1">디지털 아이템 구매 이벤트</p></div>
            <div className="rounded-xl bg-[#f9ecdb] p-3"><b>기록</b><p className="mt-1">행사 후 아카이브 보존</p></div>
          </div>
        </section>
      </main>
    </div>
  );
}
