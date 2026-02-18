"use client";

import { FormEvent, useState } from "react";

async function postJson<T>(url: string, body: Record<string, unknown>) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(data.error ?? "Request failed");
  return data;
}

export default function Home() {
  const [hostUserId, setHostUserId] = useState("");
  const [roomTitle, setRoomTitle] = useState("No Wedding Ceremony");
  const [createResult, setCreateResult] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [guestUserId, setGuestUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [joinResult, setJoinResult] = useState("");

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);

  async function onCreateRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingCreate(true);
    setCreateResult("");
    try {
      const data = await postJson<{ roomId: string; joinCode: string }>(
        "/api/rooms/create",
        { hostUserId, title: roomTitle },
      );
      setCreateResult(`roomId=${data.roomId}, joinCode=${data.joinCode}`);
      setJoinCode(data.joinCode);
    } catch (error) {
      setCreateResult(error instanceof Error ? error.message : "Failed");
    } finally {
      setLoadingCreate(false);
    }
  }

  async function onJoinRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingJoin(true);
    setJoinResult("");
    try {
      const data = await postJson<{ roomId: string; memberId: string }>(
        "/api/rooms/join",
        { userId: guestUserId, nickname, joinCode },
      );
      setJoinResult(`roomId=${data.roomId}, memberId=${data.memberId}`);
    } catch (error) {
      setJoinResult(error instanceof Error ? error.message : "Failed");
    } finally {
      setLoadingJoin(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <main className="mx-auto grid w-full max-w-4xl gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h1 className="text-2xl font-semibold">Create Room</h1>
          <p className="mt-2 text-sm text-slate-300">
            Calls Next API route <code>/api/rooms/create</code>.
          </p>
          <form className="mt-5 space-y-3" onSubmit={onCreateRoom}>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Host user UUID"
              value={hostUserId}
              onChange={(e) => setHostUserId(e.target.value)}
              required
            />
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Room title"
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loadingCreate}
              className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50"
            >
              {loadingCreate ? "Creating..." : "Create Room"}
            </button>
          </form>
          <p className="mt-4 min-h-6 text-sm text-cyan-300">{createResult}</p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-semibold">Join Room</h2>
          <p className="mt-2 text-sm text-slate-300">
            Calls Next API route <code>/api/rooms/join</code>.
          </p>
          <form className="mt-5 space-y-3" onSubmit={onJoinRoom}>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Join code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              required
            />
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Guest user UUID"
              value={guestUserId}
              onChange={(e) => setGuestUserId(e.target.value)}
              required
            />
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loadingJoin}
              className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50"
            >
              {loadingJoin ? "Joining..." : "Join Room"}
            </button>
          </form>
          <p className="mt-4 min-h-6 text-sm text-emerald-300">{joinResult}</p>
        </section>
      </main>
    </div>
  );
}
