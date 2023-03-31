// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import { STORAGE_KEYS } from '@/configs/storage'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    // if (window.localStorage.getItem(STORAGE_KEYS.userData)) {
    //   router.replace('/')
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  // if (auth.loading || (!auth.loading && auth.user !== null)) {
  if (auth.loading) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
