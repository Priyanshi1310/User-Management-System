"use client"

import { useUserStore } from '../store/userStore'
import { ReactNode, useEffect, useState } from 'react'

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const { darkMode } = useUserStore()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <>
      {children}
    </>
  )
}
