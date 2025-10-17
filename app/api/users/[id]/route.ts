import { type NextRequest, NextResponse } from "next/server"
import { cacheSimulator } from "@/lib/cache-simulator"
import { generateUserData } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const userId = Number.parseInt(id)

  // Simulate database fetch with caching
  const user = await cacheSimulator.get(
    `user:${userId}`,
    async () => {
      // Simulate database latency
      await new Promise((resolve) => setTimeout(resolve, 150 + Math.random() * 250))
      return generateUserData(userId)
    },
    600000, // 10 minute TTL
  )

  return NextResponse.json(user)
}
