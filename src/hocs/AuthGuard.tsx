'use client'

import { useEffect, useState, ReactNode } from 'react'
import { isAuthenticated } from '@/utils/cookie'
import { useRouter } from 'next/navigation'

interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [auth, setAuth] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const status = isAuthenticated()
    setAuth(status)

    if (!status) {
      router.push('/')
    }
  }, [router])

  // While checking authentication
  if (auth === null) return null

  return <>{children}</>
}
