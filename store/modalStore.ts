import { create } from 'zustand'
import { User } from '../utils/types'

interface ModalState {
  isOpen: boolean
  editingUser: User | null
  deleteConfirmOpen: boolean
  openModal: (user?: User) => void
  closeModal: () => void
  openDeleteConfirm: (user: User) => void
  closeDeleteConfirm: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  editingUser: null,
  deleteConfirmOpen: false,
  openModal: (user) => set({ isOpen: true, editingUser: user || null }),
  closeModal: () => set({ isOpen: false, editingUser: null }),
  openDeleteConfirm: (user) => set({ deleteConfirmOpen: true, editingUser: user }),
  closeDeleteConfirm: () => set({ deleteConfirmOpen: false, editingUser: null }),
}))
