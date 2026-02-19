import type { Metadata } from "next";
import { ArchiveClient } from "./ArchiveClient";

export const metadata: Metadata = {
  title: "Digital Archive | Seojun & Jiwoo",
  description: "서준과 지우의 모든 순간이 영원이 되는 곳. Know Wedding 지능형 아카이브 페이지입니다.",
  openGraph: {
    title: "Seojun & Jiwoo | Wedding Archive",
    description: "함께 나눈 모든 대화와 정경이 아름다운 디지털 기록으로 보존됩니다.",
    images: ["/wedding-archive-og.jpg"],
  },
};

export default function ArchivePage() {
  return <ArchiveClient />;
}
