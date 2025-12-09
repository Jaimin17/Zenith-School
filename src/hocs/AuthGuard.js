'use client'

import { useEffect, useState } from 'react'
import { isAuthenticated } from '@/utils/cookie'
import { useRouter } from 'next/navigation'

export default function AuthGuard({ children }) {
    const [auth, setAuth] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const status = isAuthenticated()
        setAuth(status)

        if (!status) {
            router.push('/') // navigate only inside useEffect
        }
    }, [])

    // while checking auth, return nothing or a loader
    if (auth === null) return null

    return <>{children}</>
}
