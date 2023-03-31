import { ReactNode, useEffect, useRef } from 'react'

import '@/styles/tailwind.css'
import 'focus-visible'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Toaster } from 'react-hot-toast'
import NextNProgress from 'nextjs-progressbar'
import GuestGuard from '@/components/auth/GuestGuard'
import AuthGuard from '@/components/auth/AuthGuard'
import { Spinner } from '@/components/Spinner'
import AclGuard from '@/components/auth/AclGuard'
import { defaultACLObj } from '@/configs/acl'
import { AuthProvider } from '@/context/AuthContext'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}
const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

export default function App({ Component, pageProps, router }) {
  const previousPathname = usePrevious(router.pathname)

  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false
  const aclAbilities = Component.acl ?? defaultACLObj

  return (
    <>
      <NextNProgress color="#14b8a6" />

      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <AuthProvider>
        <Guard authGuard={authGuard} guestGuard={guestGuard}>
          {/* <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}> */}
          <div className="relative">
            <Header />
            <main>
              <Component previousPathname={previousPathname} {...pageProps} />
            </main>
            <Footer />
          </div>
          {/* </AclGuard> */}
        </Guard>
      </AuthProvider>

      <Toaster />
    </>
  )
}
