'use client'

import { useEffect } from 'react'
import { useUserStore } from '../store/userStore'

export default function UserHydration() {
  const { setLoggedInUser, hydrateUser } = useUserStore()

  useEffect(() => {
    const saved = localStorage.getItem('loggedInUser')
    if (saved) {
      hydrateUser()
    } else {
      // Hardcoded user for demo
      setLoggedInUser({
        id: 1,
        name: 'Leanne Graham',
        email: 'leanne@example.com',
        avatar: 'LG',
      })
    }
  }, [setLoggedInUser, hydrateUser])

  return null
}
