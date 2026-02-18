export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <main className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-3xl font-semibold">No Wedding / Know Wedding</h1>
        <p className="mt-3 text-slate-300">
          Next.js + Supabase bootstrap is ready.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>
            Set <code>NEXT_PUBLIC_SUPABASE_URL</code> in{" "}
            <code>.env.local</code>
          </li>
          <li>
            Set <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
            <code>.env.local</code>
          </li>
          <li>Start development with <code>npm run dev</code></li>
        </ul>
      </main>
    </div>
  );
}
