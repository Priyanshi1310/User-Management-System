"use client"

import * as Dialog from '@radix-ui/react-dialog'
import { useModalStore } from '../store/modalStore'
import { useUserStore } from '../store/userStore'

export default function DeleteConfirmModal() {
  const { deleteConfirmOpen, editingUser, closeDeleteConfirm } = useModalStore()
  const { addLog } = useUserStore()

  const handleDelete = () => {
    if (editingUser) {
      addLog(`Deleted user: ${editingUser.name}`)
    }
    closeDeleteConfirm()
  }

  return (
    <Dialog.Root open={deleteConfirmOpen} onOpenChange={closeDeleteConfirm}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-6 rounded shadow">
          <Dialog.Title className="text-lg font-bold mb-4">Confirm Deletion</Dialog.Title>
          <p className="mb-4">
            Are you sure you want to delete <strong>{editingUser?.name}</strong>?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={closeDeleteConfirm}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
