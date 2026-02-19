"use client";

import { FormEvent, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { 
  Plus, 
  Users, 
  Settings, 
  Play, 
  Square, 
  Megaphone, 
  ArrowLeft, 
  Layout, 
  Database,
  CheckCircle2,
  AlertCircle,
  Inbox
} from "lucide-react";
import { InquiryList } from "./InquiryList";

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
  const [roomStatus, setRoomStatus] = useState("idle");
  const [createResult, setCreateResult] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [guestUserId, setGuestUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [joinResult, setJoinResult] = useState("");
  const [billboardText, setBillboardText] = useState("");

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingEnd, setLoadingEnd] = useState(false);

  const supabase = createClient();
  const channelRef = useRef<any>(null);

  useEffect(() => {
    async function bootstrapAuth() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user.id) {
        setHostUserId(sessionData.session!.user.id);
      } else {
        const { data } = await supabase.auth.signInAnonymously();
        if (data.user?.id) setHostUserId(data.user!.id);
      }
    }

    bootstrapAuth();

    // 브로드캐스트용 채널 구독
    const channel = supabase.channel('room_vip_demo');
    channel.subscribe();
    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

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
      setCreateResult(`Success! Join Code: ${data.joinCode}`);
      setRoomId(data.roomId);
      setRoomStatus("LOBBY");
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
      setJoinResult(`Joined! Member ID: ${data.memberId.slice(0, 8)}...`);
      setRoomId((current) => current || data.roomId);
    } catch (error) {
      setJoinResult(error instanceof Error ? error.message : "Failed");
    } finally {
      setLoadingJoin(false);
    }
  }

  async function onStartCeremony() {
    if (!roomId) return;
    setLoadingStart(true);
    try {
      const data = await postJson<{ status: string }>("/api/rooms/start", {
        roomId,
        hostUserId,
      });
      setRoomStatus(data.status.toUpperCase());
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStart(false);
    }
  }

  async function onEndEvent() {
    if (!roomId) return;
    setLoadingEnd(true);
    try {
      const data = await postJson<{ status: string }>("/api/rooms/end", {
        roomId,
        hostUserId,
      });
      setRoomStatus(data.status.toUpperCase());
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingEnd(false);
    }
  }

  const sendBillboard = () => {
    if (!billboardText) return;
    channelRef.current?.send({
      type: 'broadcast',
      event: 'billboard',
      payload: { text: billboardText },
    });
    setBillboardText("");
  };

  const clearBillboard = () => {
    channelRef.current?.send({
      type: 'broadcast',
      event: 'billboard',
      payload: { text: "" },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f2ef] selection:bg-accent/20">
      {/* 배경 장식 */}
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute top-0 right-0 h-[40rem] w-[40rem] bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 h-[30rem] w-[30rem] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <nav className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Link href="/virtual-room" className="h-10 w-10 glass rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <ArrowLeft className="h-4 w-4" />
           </Link>
           <h1 className="text-xl font-bold tracking-widest uppercase text-primary font-serif">Master Control</h1>
        </div>
        <div className="glass px-5 py-2 rounded-full flex items-center gap-2">
           <div className={`h-2 w-2 rounded-full ${roomId ? 'bg-emerald-500 animate-pulse' : 'bg-muted'}`} />
           <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
              {roomId ? `Active Room: ${roomId.slice(0, 8)}` : 'System Standby'}
           </span>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 pb-24 grid gap-10 lg:grid-cols-[1fr_1fr_400px]">
        {/* Step 1: Create */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Layout className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-primary uppercase tracking-widest">01. Room Provisioning</h2>
          </div>
          
          <div className="glass-card p-8 rounded-[40px] space-y-6">
            <form onSubmit={onCreateRoom} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Room Title</label>
                <input className="w-full glass bg-white/40 px-5 py-3 rounded-2xl text-sm focus:bg-white transition-all border-none outline-none ring-1 ring-muted/30 focus:ring-accent" value={roomTitle} onChange={(e) => setRoomTitle(e.target.value)} required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Host ID</label>
                  <input className="w-full glass bg-white/40 px-5 py-3 rounded-2xl text-xs font-mono opacity-60" value={hostUserId} disabled />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Template</label>
                  <select className="w-full glass bg-white/40 px-5 py-3 rounded-2xl text-sm border-none outline-none ring-1 ring-muted/30 focus:ring-accent" value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
                    <option value="classic_hall">Classic Hall</option>
                    <option value="garden_daylight">Garden Daylight</option>
                    <option value="night_reception">Night Reception</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input className="glass bg-white/40 px-5 py-3 rounded-2xl text-sm ring-1 ring-muted/30 focus:ring-accent" placeholder="Couple A" value={coupleNameA} onChange={(e) => setCoupleNameA(e.target.value)} />
                <input className="glass bg-white/40 px-5 py-3 rounded-2xl text-sm ring-1 ring-muted/30 focus:ring-accent" placeholder="Couple B" value={coupleNameB} onChange={(e) => setCoupleNameB(e.target.value)} />
              </div>

              <button type="submit" disabled={loadingCreate} className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-sm tracking-widest uppercase hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2">
                 <Plus className="h-4 w-4" />
                 {loadingCreate ? 'Processing...' : 'Provision New Room'}
              </button>
            </form>
            {createResult && (
              <div className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-medium ${createResult.includes('Success') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                 {createResult.includes('Success') ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                 {createResult}
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Join Simulation */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-primary uppercase tracking-widest">02. Guest Emulation</h2>
          </div>
          
          <div className="glass-card p-8 rounded-[40px] space-y-6">
            <form onSubmit={onJoinRoom} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Join Code</label>
                <input className="w-full glass bg-white/40 px-5 py-3 rounded-2xl text-sm tracking-[0.5em] font-bold text-center" placeholder="CODE" value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Guest Nickname</label>
                <input className="w-full glass bg-white/40 px-5 py-3 rounded-2xl text-sm" placeholder="e.g. Joyful Guest" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
              </div>
              <button type="submit" disabled={loadingJoin} className="w-full bg-accent text-white py-4 rounded-2xl font-bold text-sm tracking-widest uppercase hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50">
                 {loadingJoin ? 'Joining...' : 'Simulate Guest Join'}
              </button>
            </form>
            {joinResult && (
              <div className="bg-white/40 p-4 rounded-2xl text-xs font-mono text-primary flex items-center gap-3">
                 <Database className="h-4 w-4 text-accent" />
                 {joinResult}
              </div>
            )}
          </div>
        </div>

        {/* Master Panel */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-primary uppercase tracking-widest">Master Panel</h2>
          </div>

          <div className="space-y-4">
             {/* Status Control */}
             <div className="glass-card p-8 rounded-[40px] border-primary/10">
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-6 block border-b border-muted/30 pb-3">Status Pipeline</h4>
                <div className="grid grid-cols-2 gap-3">
                   <button onClick={onStartCeremony} disabled={!roomId || loadingStart} className="flex flex-col items-center gap-3 glass p-5 rounded-3xl group hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-30">
                      <Play className="h-6 w-6 text-emerald-500 group-hover:text-white" />
                      <span className="text-[10px] font-bold uppercase">Start Show</span>
                   </button>
                   <button onClick={onEndEvent} disabled={!roomId || loadingEnd} className="flex flex-col items-center gap-3 glass p-5 rounded-3xl group hover:bg-rose-500 hover:text-white transition-all disabled:opacity-30">
                      <Square className="h-6 w-6 text-rose-500 group-hover:text-white" />
                      <span className="text-[10px] font-bold uppercase">End Event</span>
                   </button>
                </div>
                <div className="mt-6 p-4 bg-primary/5 rounded-2xl text-center">
                   <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Current Engine Status</p>
                   <p className="text-xl font-serif text-primary uppercase tracking-[0.2em]">{roomStatus}</p>
                </div>
             </div>

             {/* Billboard Broadcaster */}
             <div className="glass-card p-8 rounded-[40px] border-accent/20 bg-accent/5">
                <div className="flex items-center gap-3 mb-6">
                   <Megaphone className="h-4 w-4 text-accent" />
                   <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">Global Billboard</h4>
                </div>
                <div className="space-y-4">
                   <textarea className="w-full glass bg-white/60 p-5 rounded-2xl text-sm h-28 resize-none border-none outline-none focus:ring-1 focus:ring-accent" placeholder="Enter master message to broadcast to all guests..." value={billboardText} onChange={(e) => setBillboardText(e.target.value)} />
                   <div className="flex gap-3">
                      <button onClick={sendBillboard} className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all active:scale-95 disabled:opacity-50">
                        Broadcast
                      </button>
                      <button onClick={clearBillboard} className="px-5 glass rounded-2xl text-primary hover:bg-primary hover:text-white transition-colors">
                        <Square className="h-4 w-4" />
                      </button>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="lg:col-span-1 border-t border-muted/20 pt-10">
             <InquiryList />
          </div>
        </div>
      </main>
    </div>
  );
}
