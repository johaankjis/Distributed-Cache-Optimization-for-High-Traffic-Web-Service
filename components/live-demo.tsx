"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

export function LiveDemo() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Array<{ id: number; cached: boolean; latency: number }>>([])
  const [cacheStats, setCacheStats] = useState<any>(null)

  const simulateRequests = async () => {
    setLoading(true)
    setResults([])

    // Make multiple requests to the same resources to demonstrate caching
    const requests = [1, 2, 3, 1, 2, 3, 1, 4, 5, 1] // Repeated IDs to show cache hits

    for (const id of requests) {
      const start = Date.now()
      await fetch(`/api/products/${id}`)
      const latency = Date.now() - start

      setResults((prev) => [...prev, { id, cached: prev.some((r) => r.id === id), latency }])
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    // Fetch cache stats
    const statsRes = await fetch("/api/cache/stats")
    const stats = await statsRes.json()
    setCacheStats(stats)

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Cache Demo</CardTitle>
        <CardDescription>Simulate API requests to see caching and request coalescing in action</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={simulateRequests} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Simulation...
            </>
          ) : (
            "Run Cache Simulation"
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Request Results:</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {results.map((result, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                  <span>Product #{result.id}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={result.cached ? "default" : "secondary"}>
                      {result.cached ? "Cache Hit" : "Cache Miss"}
                    </Badge>
                    <span className="text-muted-foreground">{result.latency}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {cacheStats && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Hit Ratio</p>
              <p className="text-2xl font-bold">{cacheStats.hitRatio}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Requests</p>
              <p className="text-2xl font-bold">{cacheStats.totalRequests}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cache Hits</p>
              <p className="text-2xl font-bold text-green-600">{cacheStats.hits}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Coalesced</p>
              <p className="text-2xl font-bold text-blue-600">{cacheStats.coalesced}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
