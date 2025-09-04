import { create } from 'zustand'

interface LoggedInUser {
  id: number
  name: string
  email: string
  avatar?: string
}

interface UserState {
  darkMode: boolean
  activityLog: string[]
  loggedInUser: LoggedInUser | null
  toggleDarkMode: () => void
  setDarkMode: (value: boolean) => void
  addLog: (entry: string) => void
  setLoggedInUser: (user: LoggedInUser) => void
  logout: () => void
  hydrateUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  darkMode: false,
  activityLog: [],
  loggedInUser: null,
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', newMode)
        localStorage.setItem('darkMode', JSON.stringify(newMode))
      }
      return { darkMode: newMode }
    }),
  setDarkMode: (value) =>
    set(() => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', value)
        localStorage.setItem('darkMode', JSON.stringify(value))
      }
      return { darkMode: value }
    }),
  addLog: (entry) =>
    set((state) => ({ activityLog: [...state.activityLog, entry] })),
  
setLoggedInUser: (user) => {
    set({ loggedInUser: user })
    localStorage.setItem('loggedInUser', JSON.stringify(user))
  },

  logout: () => {
    set({ loggedInUser: null })
    localStorage.removeItem('loggedInUser')
  },

  hydrateUser: () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('loggedInUser')
      if (saved) {
        set({ loggedInUser: JSON.parse(saved) })
      }
    }
  },
}))
