// Mock data generators for the distributed cache system

export type MetricDataPoint = {
  timestamp: string
  value: number
}

export type CacheMetrics = {
  hitRatio: number
  avgLatency: number
  requestsPerSecond: number
  dbLoadReduction: number
  cacheSize: number
  coalescedRequests: number
}

export function generateTimeSeriesData(points: number, baseValue: number, variance: number): MetricDataPoint[] {
  const data: MetricDataPoint[] = []
  const now = Date.now()

  for (let i = points - 1; i >= 0; i--) {
    const timestamp = new Date(now - i * 60000).toISOString()
    const value = baseValue + (Math.random() - 0.5) * variance
    data.push({ timestamp, value: Math.max(0, value) })
  }

  return data
}

export function generateCacheMetrics(): CacheMetrics {
  return {
    hitRatio: 88 + Math.random() * 8, // 88-96%
    avgLatency: 120 + Math.random() * 80, // 120-200ms
    requestsPerSecond: 800 + Math.random() * 400, // 800-1200 rps
    dbLoadReduction: 75 + Math.random() * 15, // 75-90%
    cacheSize: Math.floor(15000 + Math.random() * 5000), // 15k-20k entries
    coalescedRequests: Math.floor(50 + Math.random() * 100), // 50-150 per minute
  }
}

export function generateProductData(id: number) {
  const products = [
    { name: "Wireless Headphones", category: "Electronics", price: 129.99 },
    { name: "Smart Watch", category: "Electronics", price: 299.99 },
    { name: "Laptop Stand", category: "Accessories", price: 49.99 },
    { name: "Mechanical Keyboard", category: "Electronics", price: 159.99 },
    { name: "USB-C Hub", category: "Accessories", price: 79.99 },
    { name: "Webcam HD", category: "Electronics", price: 89.99 },
    { name: "Desk Lamp", category: "Furniture", price: 39.99 },
    { name: 'Monitor 27"', category: "Electronics", price: 349.99 },
  ]

  const product = products[id % products.length]
  return {
    id,
    ...product,
    stock: Math.floor(Math.random() * 100),
    rating: (4 + Math.random()).toFixed(1),
  }
}

export function generateUserData(id: number) {
  const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry"]
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"]

  return {
    id,
    firstName: firstNames[id % firstNames.length],
    lastName: lastNames[Math.floor(id / firstNames.length) % lastNames.length],
    email: `user${id}@example.com`,
    joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  }
}
