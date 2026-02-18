import { corsHeaders } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase.ts";

type PaymentWebhookBody = {
  roomId: string;
  buyerMemberId: string;
  itemId: string;
  amount: number;
  provider: string;
  providerTxId: string;
  status: "paid" | "failed" | "refunded";
};

function calculateFee(gross: number) {
  return Math.round(gross * 0.2 * 100) / 100;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as PaymentWebhookBody;

    if (!body.roomId || !body.buyerMemberId || !body.itemId || !body.providerTxId) {
      return new Response(JSON.stringify({ error: "required fields are missing" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createServiceClient();

    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .upsert(
        {
          room_id: body.roomId,
          buyer_member_id: body.buyerMemberId,
          item_id: body.itemId,
          price: body.amount,
          provider: body.provider,
          provider_tx_id: body.providerTxId,
          status: body.status,
          paid_at: body.status === "paid" ? new Date().toISOString() : null,
        },
        { onConflict: "provider,provider_tx_id" },
      )
      .select("id, room_id, price, status")
      .single();

    if (purchaseError || !purchase) throw purchaseError ?? new Error("Failed to upsert purchase");

    if (purchase.status === "paid") {
      const fee = calculateFee(Number(purchase.price));
      const net = Number(purchase.price) - fee;

      const { error: settlementError } = await supabase.rpc("increment_settlement_totals", {
        p_room_id: purchase.room_id,
        p_gross_inc: Number(purchase.price),
        p_fee_inc: fee,
        p_net_inc: net,
      });

      if (settlementError) {
        // Function may not exist yet; keep webhook idempotent while MVP evolves.
        console.error("increment_settlement_totals RPC failed", settlementError.message);
      }
    }

    return new Response(JSON.stringify({ ok: true, purchaseId: purchase.id }), {
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
