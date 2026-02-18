import { corsHeaders } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase.ts";

type CreateRoomBody = {
  hostUserId: string;
  title: string;
  scheduledAt?: string | null;
  themeId?: string | null;
  capacity?: number;
  templateId?: string | null;
  backgroundKey?: string | null;
  coupleNameA?: string | null;
  coupleNameB?: string | null;
  greetingMessage?: string | null;
  accountBank?: string | null;
  accountHolder?: string | null;
  accountNumber?: string | null;
};

function randomJoinCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as CreateRoomBody;
    if (!body.hostUserId || !body.title) {
      return new Response(JSON.stringify({ error: "hostUserId and title are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createServiceClient();

    let backgroundKey = body.backgroundKey ?? null;
    if (!backgroundKey && body.templateId) {
      const { data: template } = await supabase
        .from("room_templates")
        .select("default_background_key")
        .eq("id", body.templateId)
        .single();
      backgroundKey = template?.default_background_key ?? null;
    }

    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .insert({
        host_user_id: body.hostUserId,
        title: body.title,
        scheduled_at: body.scheduledAt ?? null,
        theme_id: body.themeId ?? null,
        capacity: Math.min(body.capacity ?? 30, 30),
        join_code: randomJoinCode(),
        template_id: body.templateId ?? null,
        background_key: backgroundKey,
        couple_name_a: body.coupleNameA ?? null,
        couple_name_b: body.coupleNameB ?? null,
        greeting_message: body.greetingMessage ?? null,
        account_bank: body.accountBank ?? null,
        account_holder: body.accountHolder ?? null,
        account_number: body.accountNumber ?? null,
      })
      .select("id, join_code")
      .single();

    if (roomError || !room) throw roomError ?? new Error("Failed to create room");

    const { error: memberError } = await supabase.from("room_members").insert({
      room_id: room.id,
      user_id: body.hostUserId,
      nickname: "Host",
      role: "host",
    });

    if (memberError) throw memberError;

    const { error: stateError } = await supabase.from("room_object_state").insert({
      room_id: room.id,
      theme_id: body.themeId ?? null,
    });

    if (stateError) throw stateError;

    return new Response(JSON.stringify({ roomId: room.id, joinCode: room.join_code }), {
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
