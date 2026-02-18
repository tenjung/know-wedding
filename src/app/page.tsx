import Link from "next/link";

const moments = [
  {
    title: "초대",
    desc: "모바일 청첩장으로 소식을 전하고 참석 흐름을 엽니다.",
  },
  {
    title: "입장",
    desc: "하객이 2D 아바타로 같은 공간에 모여 실시간으로 축하를 나눕니다.",
  },
  {
    title: "기록",
    desc: "채팅, 영상, 축하 메시지를 아카이브로 남깁니다.",
  },
];

const packages = [
  {
    name: "기본 가상 웨딩룸",
    price: "39만원",
    detail: "1회 행사 · 1년 보관",
  },
  {
    name: "프리미엄 패키지",
    price: "99만원+",
    detail: "커스텀 테마 · 영상 제작 · 무기한 보관 · USB 전달",
  },
];

const upsell = ["무료 청첩장", "디자인 VIP", "가상 웨딩", "영상 제작 추가"];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f2ef] text-[#2b1d1a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,#ffe4dc_0%,transparent_38%),radial-gradient(circle_at_85%_18%,#f8d8e7_0%,transparent_30%),radial-gradient(circle_at_60%_90%,#f8e7c8_0%,transparent_35%)]" />
      <div className="pointer-events-none absolute left-[-120px] top-24 h-72 w-72 rounded-full border border-[#e3c3b6] opacity-60" />
      <div className="pointer-events-none absolute right-[-80px] top-12 h-64 w-64 rounded-full border border-[#d9b9cf] opacity-60" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-8 md:gap-16 md:pt-10">
        <header className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9b5f49]">No Wedding, Know Wedding</p>
          <Link
            href="/pricing"
            className="rounded-full border border-[#b9826e] bg-white/60 px-4 py-2 text-xs font-semibold tracking-wide text-[#7b4a38] backdrop-blur"
          >
            Pricing
          </Link>
        </header>

        <section className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <article className="space-y-6">
            <p className="inline-flex rounded-full border border-[#d8b6a8] bg-white/60 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#9b5f49]">
              DIGITAL WEDDING EXPERIENCE
            </p>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-[#3d2320] md:text-7xl">
              Wedding,
              <br />
              Without The Stage.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#6a4a42] md:text-lg">
              결혼식이라는 형식은 줄이고, 결혼의 본질은 더 아름답게 남깁니다.
              알림, 축하, 축의금, 기록까지 하나의 웨딩 랜딩에서 완성합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/virtual-room"
                className="rounded-full bg-[#4a2521] px-6 py-3 text-sm font-semibold text-[#fff4ef] transition hover:-translate-y-0.5"
              >
                가상 웨딩룸 체험
              </Link>
              <Link
                href="/invitation/vip"
                className="rounded-full border border-[#b9826e] bg-white/70 px-6 py-3 text-sm font-semibold text-[#7b4a38] transition hover:-translate-y-0.5"
              >
                VIP 초대장 보기
              </Link>
            </div>
          </article>

          <article className="relative rounded-[28px] border border-[#e3c2b4] bg-white/65 p-6 shadow-[0_20px_45px_rgba(112,52,45,0.16)] backdrop-blur md:p-8">
            <div className="rounded-2xl border border-[#edcbc0] bg-[linear-gradient(140deg,#fff2ee,#ffe7dc_55%,#f7dce8)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b5f49]">Sample Ceremony Card</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#4a2521]">Minji · Taewoo</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#714f47]">
                2026.11.14 SAT 6:00 PM
                <br />
                No Wedding Virtual Room
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-[#6e4a42]">
                <div className="rounded-xl bg-white/80 p-3">
                  <p className="font-semibold text-[#4a2521]">실시간 하객</p>
                  <p className="mt-1">최대 30명 동시 접속</p>
                </div>
                <div className="rounded-xl bg-white/80 p-3">
                  <p className="font-semibold text-[#4a2521]">아카이브</p>
                  <p className="mt-1">행사 후 기록 자동 보존</p>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {moments.map((moment, idx) => (
            <article
              key={moment.title}
              className="rounded-2xl border border-[#e4c4b7] bg-white/65 p-5 backdrop-blur"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b5f49]">Moment {idx + 1}</p>
              <h3 className="mt-2 text-2xl font-semibold text-[#4a2521]">{moment.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6f4b43]">{moment.desc}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 rounded-3xl border border-[#e4c4b7] bg-white/60 p-6 md:grid-cols-[1fr_1fr] md:p-8">
          <article>
            <h2 className="text-3xl font-semibold text-[#4a2521]">가격 플랜</h2>
            <p className="mt-2 text-sm text-[#6f4b43]">수익화 방향을 랜딩 핵심 메시지로 고정합니다.</p>
            <div className="mt-5 space-y-3">
              {packages.map((pkg) => (
                <div key={pkg.name} className="rounded-2xl border border-[#e8cbbf] bg-[#fff7f3] p-4">
                  <p className="text-sm font-semibold text-[#7b4a38]">{pkg.name}</p>
                  <p className="mt-1 text-2xl font-bold text-[#4a2521]">{pkg.price}</p>
                  <p className="mt-1 text-sm text-[#6f4b43]">{pkg.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h3 className="text-2xl font-semibold text-[#4a2521]">Upsell Funnel</h3>
            <div className="mt-4 grid gap-3">
              {upsell.map((step, idx) => (
                <div key={step} className="flex items-center gap-3 rounded-xl bg-[#fff7f3] px-4 py-3 text-sm text-[#6f4b43]">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f1c5b6] text-xs font-semibold text-[#5d342b]">
                    {idx + 1}
                  </span>
                  <span className="font-medium">{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#7a5146]">
              <span className="rounded-full border border-[#d9b2a3] bg-white/70 px-3 py-1">테마 마켓 판매</span>
              <span className="rounded-full border border-[#d9b2a3] bg-white/70 px-3 py-1">연장 보관</span>
              <span className="rounded-full border border-[#d9b2a3] bg-white/70 px-3 py-1">제휴 광고</span>
              <span className="rounded-full border border-[#d9b2a3] bg-white/70 px-3 py-1">촬영 패키지 연계</span>
            </div>
          </article>
        </section>

        <footer className="flex flex-wrap items-center gap-3 border-t border-[#e1c1b4] pt-6">
          <Link href="/archive" className="rounded-full border border-[#b9826e] px-4 py-2 text-sm font-semibold text-[#7b4a38]">
            아카이브
          </Link>
          <Link href="/pricing" className="rounded-full border border-[#b9826e] px-4 py-2 text-sm font-semibold text-[#7b4a38]">
            가격/수익화 상세
          </Link>
          <Link href="/dev/room-control" className="rounded-full border border-[#86a9ac] px-4 py-2 text-sm font-semibold text-[#31666d]">
            개발 콘솔
          </Link>
        </footer>
      </main>
    </div>
  );
}
