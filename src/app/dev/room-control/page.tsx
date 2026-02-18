"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

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

export default function RoomControlPage() {
  const [hostUserId, setHostUserId] = useState("");
  const [roomTitle, setRoomTitle] = useState("No Wedding Ceremony");
  const [templateId, setTemplateId] = useState("classic_hall");
  const [backgroundKey, setBackgroundKey] = useState("");
  const [coupleNameA, setCoupleNameA] = useState("");
  const [coupleNameB, setCoupleNameB] = useState("");
  const [accountBank, setAccountBank] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [createResult, setCreateResult] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [guestUserId, setGuestUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [joinResult, setJoinResult] = useState("");

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingEnd, setLoadingEnd] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function bootstrapAuth() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user.id) {
        setHostUserId((current) => current || sessionData.session!.user.id);
        return;
      }

      const { data } = await supabase.auth.signInAnonymously();
      if (data.user?.id) {
        setHostUserId((current) => current || data.user!.id);
      }
    }

    bootstrapAuth();
  }, []);

  async function onCreateRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingCreate(true);
    setCreateResult("");
    try {
      const data = await postJson<{ roomId: string; joinCode: string }>(
        "/api/rooms/create",
        {
          hostUserId,
          title: roomTitle,
          templateId,
          backgroundKey: backgroundKey || null,
          coupleNameA: coupleNameA || null,
          coupleNameB: coupleNameB || null,
          accountBank: accountBank || null,
          accountHolder: accountHolder || null,
          accountNumber: accountNumber || null,
        },
      );
      setCreateResult(`roomId=${data.roomId}, joinCode=${data.joinCode}`);
      setRoomId(data.roomId);
      setRoomStatus("lobby");
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
      setRoomId((current) => current || data.roomId);
    } catch (error) {
      setJoinResult(error instanceof Error ? error.message : "Failed");
    } finally {
      setLoadingJoin(false);
    }
  }

  async function onStartCeremony() {
    if (!roomId || !hostUserId) return;
    setLoadingStart(true);
    setRoomStatus("");
    try {
      const data = await postJson<{ status: string }>("/api/rooms/start", {
        roomId,
        hostUserId,
      });
      setRoomStatus(data.status);
    } catch (error) {
      setRoomStatus(error instanceof Error ? error.message : "Failed");
    } finally {
      setLoadingStart(false);
    }
  }

  async function onEndEvent() {
    if (!roomId || !hostUserId) return;
    setLoadingEnd(true);
    setRoomStatus("");
    try {
      const data = await postJson<{ status: string }>("/api/rooms/end", {
        roomId,
        hostUserId,
      });
      setRoomStatus(data.status);
    } catch (error) {
      setRoomStatus(error instanceof Error ? error.message : "Failed");
    } finally {
      setLoadingEnd(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#111827] px-6 py-10 text-slate-100">
      <main className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-3">
        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <h1 className="text-2xl font-semibold">Create Room</h1>
          <form className="mt-5 space-y-3" onSubmit={onCreateRoom}>
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Host user UUID" value={hostUserId} onChange={(e) => setHostUserId(e.target.value)} required />
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Room title" value={roomTitle} onChange={(e) => setRoomTitle(e.target.value)} required />
            <select className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
              <option value="classic_hall">classic_hall</option>
              <option value="garden_daylight">garden_daylight</option>
              <option value="night_reception">night_reception</option>
            </select>
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Background key (optional)" value={backgroundKey} onChange={(e) => setBackgroundKey(e.target.value)} />
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Couple name A" value={coupleNameA} onChange={(e) => setCoupleNameA(e.target.value)} />
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Couple name B" value={coupleNameB} onChange={(e) => setCoupleNameB(e.target.value)} />
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Account bank (optional)" value={accountBank} onChange={(e) => setAccountBank(e.target.value)} />
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Account holder (optional)" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} />
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Account number (optional)" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
            <button type="submit" disabled={loadingCreate} className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50">{loadingCreate ? "Creating..." : "Create Room"}</button>
          </form>
          <p className="mt-4 min-h-6 text-sm text-cyan-300">{createResult}</p>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <h2 className="text-2xl font-semibold">Join Room</h2>
          <form className="mt-5 space-y-3" onSubmit={onJoinRoom}>
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Join code" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} required />
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Guest user UUID" value={guestUserId} onChange={(e) => setGuestUserId(e.target.value)} required />
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
            <button type="submit" disabled={loadingJoin} className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50">{loadingJoin ? "Joining..." : "Join Room"}</button>
          </form>
          <p className="mt-4 min-h-6 text-sm text-emerald-300">{joinResult}</p>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <h2 className="text-2xl font-semibold">Room Control</h2>
          <div className="mt-5 space-y-3">
            <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <div className="flex gap-2">
              <button type="button" onClick={onStartCeremony} disabled={loadingStart || !roomId || !hostUserId} className="rounded-md bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50">{loadingStart ? "Starting..." : "Start Ceremony"}</button>
              <button type="button" onClick={onEndEvent} disabled={loadingEnd || !roomId || !hostUserId} className="rounded-md bg-rose-300 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50">{loadingEnd ? "Ending..." : "End Event"}</button>
            </div>
            <p className="text-xs text-slate-400">Host ID: <code>{hostUserId || "loading..."}</code></p>
            <p className="min-h-6 text-sm text-amber-200">{roomStatus}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
