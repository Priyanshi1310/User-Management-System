"use client"

import { useUserStore } from '../store/userStore'
import * as Switch from '@radix-ui/react-switch'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'

export default function Navbar() {
  const { darkMode, toggleDarkMode, setDarkMode  } = useUserStore()
  const { loggedInUser, logout } = useUserStore()

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') {
      setDarkMode(true)
    }
  }, [setDarkMode])

  return (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 text-black dark:text-white shadow-md px-6 py-4 flex items-center justify-between">

      <h1 className="text-xl font-bold">User Dashboard</h1>

      <div className="flex items-center gap-4">
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

        {loggedInUser && (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm">
            {loggedInUser.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <span className="text-sm text-gray-600">{loggedInUser.name}</span>
          <button
            onClick={logout}
            className="text-xs text-gray-500 hover:underline"
          >
            Logout
          </button>
        </div>
      )}
      </div>
      
    </nav>
  )
}
