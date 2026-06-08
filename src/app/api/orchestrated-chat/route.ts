import { cookies } from "next/headers";
import { getServerAuthTokens } from "@/utils/cookie";

const FASTAPI_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/";

const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "X-Accel-Buffering": "no",
};

function sseError(message: string): Response {
  const line = `data: ${JSON.stringify({ type: "error", message })}\n\n`;
  return new Response(line, { headers: SSE_HEADERS });
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const { accessToken } = getServerAuthTokens(cookieStore);

  if (!accessToken) {
    return sseError("Authentication required. Please log in again.");
  }

  const upstream = await fetch(
    `${FASTAPI_BASE}api/v1/chatbot/orchestrated-chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: await req.text(),
    }
  ).catch(() => null);

  if (!upstream?.ok || !upstream.body) {
    return sseError("Unable to reach the school assistant. Please try again.");
  }

  return new Response(upstream.body, { headers: SSE_HEADERS });
}
