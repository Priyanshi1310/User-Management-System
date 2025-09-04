"use client"

import { useParams, useRouter } from 'next/navigation'
import { useUsers } from '../../../hooks/useUsers'
import { getInitials } from '../../../utils/getInitials'
import { useUserStore } from '../../../store/userStore'
import { ClockIcon } from '@heroicons/react/24/solid'

export default function UserDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: users, isLoading } = useUsers()
  const { activityLog } = useUserStore()

  const user = users?.find((u) => u.id === Number(id))

  if (isLoading) return <div className="p-4">Loading...</div>
  if (!user) return <div className="p-4">User not found</div>

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded shadow relative">
      {/* ❌ Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white text-xl"
        aria-label="Go back"
      >
        &times;
      </button>

      {/* Avatar + Name */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
          {getInitials(user.name)}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
      </div>

      {/* Activity Log */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Activity Log</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {activityLog
            .filter((log) => log.includes(user.name))
            .map((log, i) => (
              <li key={i}>{log}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}
