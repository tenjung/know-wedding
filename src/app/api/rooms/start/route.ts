import { NextResponse } from "next/server";
import { invokeEdgeFunction } from "@/lib/supabase/functions";

type StartCeremonyPayload = {
  roomId: string;
  hostUserId: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as StartCeremonyPayload;

    if (!payload.roomId || !payload.hostUserId) {
      return NextResponse.json(
        { error: "roomId and hostUserId are required" },
        { status: 400 },
      );
    }

    const data = await invokeEdgeFunction("start_ceremony", payload);
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to start ceremony";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
