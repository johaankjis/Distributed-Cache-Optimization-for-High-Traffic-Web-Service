"use client"

import { useEffect, useState } from "react"
import { MetricCard } from "@/components/metric-card"
import { CacheChart } from "@/components/cache-chart"
import { LiveDemo } from "@/components/live-demo"
import { Activity, Database, Gauge, Layers, Server, Zap } from "lucide-react"

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await fetch("/api/metrics")
      const data = await res.json()
      setMetrics(data)
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!metrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Layers className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-balance">Distributed Cache Optimization</h1>
              <p className="text-sm text-muted-foreground">Real-time monitoring and performance metrics</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Key Metrics */}
          <section>
            <h2 className="text-lg font-semibold mb-4">System Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                title="Cache Hit Ratio"
                value={`${metrics.current.hitRatio.toFixed(1)}%`}
                subtitle="Target: >90%"
                icon={Gauge}
                trend="up"
                trendValue="+4.2% from baseline"
              />
              <MetricCard
                title="Avg Response Time"
                value={`${Math.round(metrics.current.avgLatency)}ms`}
                subtitle="Target: <200ms"
                icon={Zap}
                trend="down"
                trendValue="-45ms improvement"
              />
              <MetricCard
                title="Requests/Second"
                value={Math.round(metrics.current.requestsPerSecond)}
                subtitle="Current load"
                icon={Activity}
                trend="neutral"
                trendValue="Stable"
              />
              <MetricCard
                title="DB Load Reduction"
                value={`${metrics.current.dbLoadReduction.toFixed(1)}%`}
                subtitle="Queries saved"
                icon={Database}
                trend="up"
                trendValue="+12% efficiency"
              />
              <MetricCard
                title="Cache Size"
                value={metrics.current.cacheSize.toLocaleString()}
                subtitle="Active entries"
                icon={Server}
                trend="neutral"
                trendValue="Within limits"
              />
              <MetricCard
                title="Coalesced Requests"
                value={metrics.current.coalescedRequests}
                subtitle="Per minute"
                icon={Layers}
                trend="up"
                trendValue="Preventing duplicates"
              />
            </div>
          </section>

          {/* Time Series Charts */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Performance Trends (Last 30 Minutes)</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <CacheChart
                title="Cache Hit Ratio"
                data={metrics.timeSeries.hitRatio}
                color="hsl(var(--chart-1))"
                unit="%"
              />
              <CacheChart
                title="Response Latency"
                data={metrics.timeSeries.latency}
                color="hsl(var(--chart-2))"
                unit="ms"
              />
              <CacheChart
                title="Request Rate"
                data={metrics.timeSeries.requestRate}
                color="hsl(var(--chart-3))"
                unit="/s"
              />
              <CacheChart title="Database Load" data={metrics.timeSeries.dbLoad} color="hsl(var(--chart-4))" unit="%" />
            </div>
          </section>

          {/* Live Demo */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Interactive Demo</h2>
            <LiveDemo />
          </section>
        </div>
      </main>
    </div>
  )
}
