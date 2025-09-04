"use client"

import * as Dialog from '@radix-ui/react-dialog'
import { useModalStore } from '../store/modalStore'
import { useUserStore } from '../store/userStore'
import { useEffect, useState } from 'react'

export default function UserForm() {
  const { isOpen, editingUser, closeModal } = useModalStore()
  const { addLog } = useUserStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name)
      setEmail(editingUser.email)
      setCompany(editingUser.company.name)
    } else {
      setName('')
      setEmail('')
      setCompany('')
    }
  }, [editingUser])

  const handleSubmit = () => {
    if (!name || !email) return
    if (editingUser) {
      addLog(`Updated user: ${name}`)
    } else {
      addLog(`Added new user: ${name}`)
    }
    closeModal()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={closeModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded shadow">
          <Dialog.Title className="text-lg font-bold mb-4">
            {editingUser ? 'Edit User' : 'Add User'}
          </Dialog.Title>
          <div className="space-y-4">
            <input
              className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-700"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-700"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             <input
              className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-700"
              placeholder="company"
              value={company}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500"
              onClick={handleSubmit}
            >
              {editingUser ? 'Update' : 'Add'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
