import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [mounted, setMounted] = useState(false) 
  useEffect(() => setMounted(true), [])

  return (
    <div style={{ visibility: !mounted ? 'hidden' : undefined }}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
}
