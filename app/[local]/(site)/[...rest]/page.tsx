// app/[local]/[...rest]/page.tsx
import { notFound } from 'next/navigation'

export default function CatchAllRoute() {
  // This explicitly catches any unmatched URL under /[local]/...
  // and forces Next.js to render your app/[local]/not-found.tsx
  notFound()
}