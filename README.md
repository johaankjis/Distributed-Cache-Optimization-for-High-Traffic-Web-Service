# Distributed Cache Optimization for High-Traffic Web Service

A real-time monitoring dashboard and demonstration platform for distributed cache optimization techniques, built with Next.js and TypeScript. This project showcases cache strategies, request coalescing, and performance metrics visualization for high-traffic web services.

## Features

### Real-Time Monitoring Dashboard
- **System Overview Metrics**: Monitor cache hit ratio, average response time, requests per second, database load reduction, cache size, and coalesced requests
- **Performance Trends**: Visualize time-series data for cache performance over the last 30 minutes
- **Interactive Charts**: Dynamic charts showing cache hit ratio, response latency, request rate, and database load

### Cache Optimization Techniques
- **Request Coalescing**: Automatically deduplicate concurrent requests to the same resource
- **TTL-based Caching**: Configurable time-to-live for cached entries
- **Cache Statistics**: Real-time tracking of hits, misses, and coalesced requests
- **Automatic Expiration**: Built-in cache eviction for expired entries

### Interactive Demo
- **Live Simulation**: Run simulated API requests to demonstrate caching behavior
- **Visual Feedback**: See cache hits and misses in real-time
- **Performance Metrics**: Observe latency improvements from caching

## Technology Stack

- **Framework**: [Next.js 15.2.4](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4.1.9](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) for dark mode support

## Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/johaankjis/Distributed-Cache-Optimization-for-High-Traffic-Web-Service.git
cd Distributed-Cache-Optimization-for-High-Traffic-Web-Service
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
.
├── app/                        # Next.js App Router
│   ├── api/                    # API routes
│   │   ├── cache/              # Cache statistics endpoint
│   │   ├── metrics/            # Metrics data endpoint
│   │   ├── products/           # Product API with caching
│   │   └── users/              # User API with caching
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Dashboard homepage
├── components/                 # React components
│   ├── ui/                     # Reusable UI components (Radix UI)
│   ├── cache-chart.tsx         # Chart component for metrics
│   ├── live-demo.tsx           # Interactive demo component
│   ├── metric-card.tsx         # Metric display card
│   └── theme-provider.tsx      # Theme provider wrapper
├── lib/                        # Utility libraries
│   ├── cache-simulator.ts      # Cache simulation logic
│   ├── mock-data.ts            # Mock data generation
│   └── utils.ts                # Utility functions
├── public/                     # Static assets
├── styles/                     # Additional styles
├── hooks/                      # Custom React hooks
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json                # Project dependencies
```

## API Endpoints

### GET `/api/metrics`
Returns current cache metrics and time-series data.

**Response:**
```json
{
  "current": {
    "hitRatio": 92.5,
    "avgLatency": 145,
    "requestsPerSecond": 1050,
    "dbLoadReduction": 78.3,
    "cacheSize": 1245,
    "coalescedRequests": 23
  },
  "timeSeries": {
    "hitRatio": [...],
    "latency": [...],
    "requestRate": [...],
    "dbLoad": [...]
  }
}
```

### GET `/api/products/[id]`
Fetch product data with caching enabled.

**Parameters:**
- `id` - Product ID

**Features:**
- 5-minute TTL caching
- Request coalescing for concurrent requests

### GET `/api/users/[id]`
Fetch user data with caching enabled.

**Parameters:**
- `id` - User ID

**Features:**
- 5-minute TTL caching
- Request coalescing for concurrent requests

### GET `/api/cache/stats`
Returns cache statistics.

**Response:**
```json
{
  "hits": 1523,
  "misses": 127,
  "coalesced": 45,
  "totalRequests": 1695,
  "hitRatio": 89.83,
  "cacheSize": 234
}
```

## Cache Simulator

The cache simulator (`lib/cache-simulator.ts`) implements a distributed cache layer with the following features:

- **In-Memory Storage**: Fast key-value storage with TTL support
- **Request Coalescing**: Prevents duplicate concurrent requests
- **Statistics Tracking**: Monitors hits, misses, and coalesced requests
- **Automatic Expiration**: Cleans up expired cache entries

### Usage Example

```typescript
import { cacheSimulator } from '@/lib/cache-simulator'

const data = await cacheSimulator.get(
  'user:123',
  async () => {
    // Fetch from database or external API
    return await fetchUserFromDB(123)
  },
  300000 // 5 minutes TTL
)
```

## Key Metrics Explained

- **Cache Hit Ratio**: Percentage of requests served from cache (Target: >90%)
- **Avg Response Time**: Average API response latency (Target: <200ms)
- **Requests/Second**: Current request load on the system
- **DB Load Reduction**: Percentage of database queries saved by caching
- **Cache Size**: Number of active entries in the cache
- **Coalesced Requests**: Number of duplicate requests prevented per minute

## Performance Optimization Techniques

1. **Request Coalescing**: Multiple concurrent requests for the same resource are deduplicated, reducing backend load
2. **TTL-based Caching**: Configurable expiration prevents stale data while maximizing cache efficiency
3. **Lazy Loading**: Components load data on demand with React Suspense patterns
4. **Efficient Re-rendering**: React hooks minimize unnecessary component updates
5. **Time-Series Data**: Efficient storage and visualization of historical metrics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is provided as-is for educational and demonstration purposes.

## Acknowledgments

- Built with [v0.dev](https://v0.dev/) by Vercel
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
