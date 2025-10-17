import { NextResponse } from "next/server"
import { generateCacheMetrics, generateTimeSeriesData } from "@/lib/mock-data"

export async function GET() {
  const metrics = generateCacheMetrics()

  const timeSeriesData = {
    hitRatio: generateTimeSeriesData(30, 90, 10),
    latency: generateTimeSeriesData(30, 150, 50),
    requestRate: generateTimeSeriesData(30, 1000, 300),
    dbLoad: generateTimeSeriesData(30, 20, 10),
  }

  return NextResponse.json({
    current: metrics,
    timeSeries: timeSeriesData,
  })
}
