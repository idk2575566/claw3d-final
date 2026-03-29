import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const buildPayload = () => ({
  ok: false,
  code: "vercel_ws_proxy_unavailable",
  message:
    "WebSocket proxying is not active on this Vercel deployment. Vercel Functions cannot act as a raw WebSocket proxy here, and the configured upstream adapter uses a private 100.x tailnet address that is not reachable from Vercel.",
  requiredFix:
    "Deploy a public WebSocket bridge/container and point /api/gateway/ws at that public bridge.",
});

export function GET(request: Request) {
  const upgrade = request.headers.get("upgrade");
  const status = upgrade?.toLowerCase() === "websocket" ? 426 : 501;

  return NextResponse.json(buildPayload(), {
    status,
    headers:
      status === 426
        ? {
            "Upgrade": "websocket",
            "Connection": "Upgrade",
          }
        : undefined,
  });
}
