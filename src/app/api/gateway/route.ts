import { NextResponse } from "next/server";

const adapterTargetConfigured = Boolean(process.env.ADAPTER_CLIENT_TOKEN?.trim());

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      ok: false,
      code: "vercel_ws_proxy_unavailable",
      message:
        "This Vercel deployment cannot terminate or proxy raw WebSocket upgrades to the adapter. Vercel Functions are request/response only, and the configured adapter host is on a private 100.x tailnet address that Vercel cannot reach directly.",
      targetConfigured: adapterTargetConfigured,
      expectedBrowserPath: "/api/gateway/ws",
      requiredFix:
        "Run a dedicated public WebSocket bridge/container in front of the adapter, then point the frontend at that bridge or rewrite to it.",
    },
    { status: 501 },
  );
}
