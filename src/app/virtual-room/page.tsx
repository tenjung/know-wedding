import type { Metadata } from "next";
import { VirtualRoomClient } from "./VirtualRoomClient";

export const metadata: Metadata = {
  title: "VIP Virtual Hall | 실시간 가상 웨딩 체험",
  description: "실시간 2D 아타바 기술로 구현된 프라이빗 웨딩 공간. 전세계 어디서나 소중한 분들과 눈을 맞추며 축하를 나누세요.",
  openGraph: {
    title: "Know Wedding | VIP Virtual Hall",
    description: "공간의 제약을 넘어 실시간으로 소통하는 하이엔드 가상 예식.",
    images: ["/virtual-room-og.jpg"],
  },
};

export default function VirtualRoomPage() {
  return <VirtualRoomClient />;
}
