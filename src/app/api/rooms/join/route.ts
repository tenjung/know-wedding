import { NextResponse } from "next/server";
import { invokeEdgeFunction } from "@/lib/supabase/functions";

type JoinRoomPayload = {
  roomId?: string;
  joinCode?: string;
  userId: string;
  nickname: string;
  skinId?: string | null;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as JoinRoomPayload;

    if (!payload.userId || !payload.nickname) {
      return NextResponse.json(
        { error: "userId and nickname are required" },
        { status: 400 },
      );
    }

    if (!payload.roomId && !payload.joinCode) {
      return NextResponse.json(
        { error: "roomId or joinCode is required" },
        { status: 400 },
      );
    }

    const data = await invokeEdgeFunction("join_room", payload);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to join room";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
