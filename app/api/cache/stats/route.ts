import { NextResponse } from "next/server"
import { cacheSimulator } from "@/lib/cache-simulator"

export async function GET() {
  const stats = cacheSimulator.getStats()
  return NextResponse.json(stats)
}
