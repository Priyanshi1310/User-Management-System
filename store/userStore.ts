import { create } from 'zustand'

interface UserState {
  darkMode: boolean
  activityLog: string[]
  toggleDarkMode: () => void
  setDarkMode: (value: boolean) => void
  addLog: (entry: string) => void
}

export const useUserStore = create<UserState>((set) => ({
  darkMode: false,
  activityLog: [],
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
}))
