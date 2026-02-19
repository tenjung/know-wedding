// Server Component wrapper — Supabase 클라이언트가 빌드 시 실행되지 않도록 ssr: false
import dynamic from 'next/dynamic';

const AvatarPageContent = dynamic(
  () => import('./AvatarPageContent'),
  { ssr: false }
);

export default function AvatarPage() {
  return <AvatarPageContent />;
}
