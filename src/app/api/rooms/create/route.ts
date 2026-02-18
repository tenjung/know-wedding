import { NextResponse } from "next/server";
import { invokeEdgeFunction } from "@/lib/supabase/functions";

type CreateRoomPayload = {
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

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateRoomPayload;

    if (!payload.hostUserId || !payload.title) {
      return NextResponse.json(
        { error: "hostUserId and title are required" },
        { status: 400 },
      );
    }

    const data = await invokeEdgeFunction("create_room", payload);
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create room";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
