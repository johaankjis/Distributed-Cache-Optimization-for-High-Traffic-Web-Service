import { type NextRequest, NextResponse } from "next/server"
import { cacheSimulator } from "@/lib/cache-simulator"
import { generateProductData } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const productId = Number.parseInt(id)

  // Simulate database fetch with caching
  const product = await cacheSimulator.get(
    `product:${productId}`,
    async () => {
      // Simulate database latency
      await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200))
      return generateProductData(productId)
    },
    300000, // 5 minute TTL
  )

  return NextResponse.json(product)
}
