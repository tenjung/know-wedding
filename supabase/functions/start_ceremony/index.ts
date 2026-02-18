import { corsHeaders } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase.ts";

type StartCeremonyBody = {
  roomId: string;
  hostUserId: string;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as StartCeremonyBody;
    if (!body.roomId || !body.hostUserId) {
      return new Response(JSON.stringify({ error: "roomId and hostUserId are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("rooms")
      .update({ status: "ceremony", ceremony_started_at: new Date().toISOString() })
      .eq("id", body.roomId)
      .eq("host_user_id", body.hostUserId)
      .select("id, status, ceremony_started_at")
      .single();

    if (error || !data) throw error ?? new Error("Room update failed");

    return new Response(
      JSON.stringify({
        roomId: data.id,
        status: data.status,
        ceremonyStartedAt: data.ceremony_started_at,
      }),
      {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
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
