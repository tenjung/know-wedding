import type { Metadata } from "next";
import { VipInvitationClient } from "./VipInvitationClient";

export const metadata: Metadata = {
  title: "Seojun & Jiwoo | Wedding Invitation",
  description: "2026년 5월 24일, 서준과 지우의 새로운 시작에 여러분을 초대합니다. Know Wedding VIP 디지털 초대장.",
  openGraph: {
    title: "Seojun & Jiwoo | Wedding Invitation",
    description: "서준과 지우의 소중한 첫 출발에 함께해 주시기를 바랍니다.",
    images: ["/wedding-invitation-og.jpg"],
  },
};

export default function VipInvitationPage() {
  return <VipInvitationClient />;
}
