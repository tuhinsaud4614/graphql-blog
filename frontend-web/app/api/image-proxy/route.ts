import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("imageUrl");
  if (!url) return new NextResponse("Missing URL", { status: 400 });

  const res = await fetch(url);
  if (!res.ok) return new NextResponse("Fetch failed", { status: 500 });

  const buffer = await res.arrayBuffer();
  return new NextResponse(Buffer.from(buffer), {
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "image/*",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
// export async function GET(req: NextRequest, res: NextApiResponse) {
//   return withImageProxy({
//     whitelistedPatterns: [/^https?:\/\/(.*).googleusercontent.com/],
//   })(req, res);
// }
