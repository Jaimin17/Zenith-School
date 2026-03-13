'use client'

import { useEffect, useState, ReactNode } from 'react'
import { isAuthenticated } from '@/utils/cookie'
import { useRouter } from 'next/navigation'
import { Box, Skeleton } from '@mui/material'

interface AuthGuardProps {
  children: ReactNode
}

function DashboardSkeleton() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar skeleton */}
      <Box sx={{ width: 240, flexShrink: 0, p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Skeleton variant="rounded" height={48} sx={{ mb: 2 }} />
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} variant="rounded" height={36} />
        ))}
      </Box>
      {/* Main content skeleton */}
      <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Skeleton variant="rounded" height={56} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rounded" sx={{ flex: 1, height: 100 }} />
          ))}
        </Box>
        <Skeleton variant="rounded" height={320} />
      </Box>
    </Box>
  )
}

export default function AuthGuard({ children }: AuthGuardProps) {
  // Lazy initializer: reads cookie synchronously on the client so the first
  // render is already auth=true on a post-login navigation — no null gap.
  // On SSR (window is undefined) we defer to the useEffect below.
  const [auth, setAuth] = useState<boolean | null>(() =>
    typeof window !== 'undefined' ? isAuthenticated() : null
  )
  const router = useRouter()

  useEffect(() => {
    const status = isAuthenticated()
    setAuth(status)

    if (!status) {
      router.push('/')
    }
  }, [router])

  // SSR / pre-hydration: show a structural skeleton instead of blank screen
  if (auth === null) return <DashboardSkeleton />

  return <>{children}</>
}
