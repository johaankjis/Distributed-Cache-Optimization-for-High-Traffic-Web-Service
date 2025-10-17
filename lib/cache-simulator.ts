// Simulated distributed cache layer with request coalescing
type CacheEntry = {
  value: any
  timestamp: number
  ttl: number
}

type PendingRequest = {
  promise: Promise<any>
  timestamp: number
}

class CacheSimulator {
  private cache: Map<string, CacheEntry> = new Map()
  private pendingRequests: Map<string, PendingRequest> = new Map()
  private stats = {
    hits: 0,
    misses: 0,
    coalesced: 0,
    totalRequests: 0,
  }

  async get(key: string, fetcher: () => Promise<any>, ttl = 300000): Promise<any> {
    this.stats.totalRequests++

    // Check cache first
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      this.stats.hits++
      return cached.value
    }

    // Request coalescing: check if request is already in flight
    const pending = this.pendingRequests.get(key)
    if (pending) {
      this.stats.coalesced++
      return pending.promise
    }

    // Cache miss - fetch data
    this.stats.misses++
    const promise = fetcher().then((value) => {
      this.cache.set(key, { value, timestamp: Date.now(), ttl })
      this.pendingRequests.delete(key)
      return value
    })

    this.pendingRequests.set(key, { promise, timestamp: Date.now() })
    return promise
  }

  getStats() {
    const hitRatio = this.stats.totalRequests > 0 ? (this.stats.hits / this.stats.totalRequests) * 100 : 0
    return {
      ...this.stats,
      hitRatio: Math.round(hitRatio * 100) / 100,
      cacheSize: this.cache.size,
    }
  }

  clear() {
    this.cache.clear()
    this.pendingRequests.clear()
  }

  // Simulate cache eviction
  evictExpired() {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

export const cacheSimulator = new CacheSimulator()
