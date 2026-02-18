import { corsHeaders } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase.ts";

type JoinRoomBody = {
  roomId?: string;
  joinCode?: string;
  userId: string;
  nickname: string;
  skinId?: string | null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as JoinRoomBody;
    if (!body.userId || !body.nickname || (!body.roomId && !body.joinCode)) {
      return new Response(JSON.stringify({ error: "roomId or joinCode, userId, nickname are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createServiceClient();

    let roomQuery = supabase.from("rooms").select("id, capacity").limit(1);
    roomQuery = body.roomId ? roomQuery.eq("id", body.roomId) : roomQuery.eq("join_code", body.joinCode!);

    const { data: room, error: roomError } = await roomQuery.single();
    if (roomError || !room) throw roomError ?? new Error("Room not found");

    const { count, error: countError } = await supabase
      .from("room_members")
      .select("id", { count: "exact", head: true })
      .eq("room_id", room.id)
      .is("left_at", null);

    if (countError) throw countError;
    if ((count ?? 0) >= room.capacity) {
      return new Response(JSON.stringify({ error: "Room is full" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: member, error: upsertError } = await supabase
      .from("room_members")
      .upsert(
        {
          room_id: room.id,
          user_id: body.userId,
          nickname: body.nickname,
          role: "guest",
          skin_id: body.skinId ?? null,
          left_at: null,
        },
        { onConflict: "room_id,user_id" },
      )
      .select("id")
      .single();

    if (upsertError || !member) throw upsertError ?? new Error("Join failed");

    return new Response(JSON.stringify({ roomId: room.id, memberId: member.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
