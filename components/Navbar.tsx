"use client"

import { useUserStore } from '../store/userStore'
import * as Switch from '@radix-ui/react-switch'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'

export default function Navbar() {
  const { darkMode, toggleDarkMode, setDarkMode  } = useUserStore()

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') {
      setDarkMode(true)
    }
  }, [setDarkMode])

  return (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 text-black dark:text-white shadow-md px-6 py-4 flex items-center justify-between">

      <h1 className="text-xl font-bold">User Dashboard</h1>

      <div className="flex items-center gap-3">
        {darkMode ? (
          <MoonIcon className="w-5 h-5 text-blue-500" />
        ) : (
          <SunIcon className="w-5 h-5 text-yellow-500" />
        )}
        
        <Switch.Root
          checked={darkMode}
          onCheckedChange={toggleDarkMode}
          className="w-10 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600"
        >
          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow absolute top-0.5 left-0.5 transition-transform data-[state=checked]:translate-x-4" />
        </Switch.Root>
      </div>
    </nav>
  )
}
