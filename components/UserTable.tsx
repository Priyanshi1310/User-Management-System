"use client";

import { useState, useEffect } from "react";
import { useUsers } from "../hooks/useUsers";
import { useUserStore } from "../store/userStore";
import { useModalStore } from "../store/modalStore";
import Pagination from "./Pagination";
import { getInitials } from "../utils/getInitials";
import { useRouter } from 'next/navigation'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import Link from "next/link";

export default function UserTable() {
  const { data: users, isLoading } = useUsers();
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { addLog } = useUserStore();
  const { openModal } = useModalStore();
  const { openDeleteConfirm } = useModalStore();
  const router = useRouter()

  useEffect(() => {
    setCurrentPage(1);
  }, [search, companyFilter]);

  if (isLoading) return <div>Loading...</div>;

  const filtered = (users ?? [])
    ?.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .filter((u) => (companyFilter ? u.company.name === companyFilter : true))
    .sort((a, b) =>
      sortAsc ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
    );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (

    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-md font-inter text-base">
      <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">Users ({filtered.length})</h2>
      <button
        onClick={() => openModal()}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
      >
        + Add User
      </button>
    </div>
  <div className="flex flex-wrap gap-4 mb-6 items-center">
   <div className="flex-1 min-w-[250px]">
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search"
      className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md text-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
    <div className="flex-1 flex gap-4 justify-end min-w-[250px]">
    <select
      value={companyFilter}
      onChange={(e) => setCompanyFilter(e.target.value)}
      className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md text-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Companies</option>
      {[...new Set(users?.map((u) => u.company.name))].map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>

    <button
      onClick={() => setSortAsc(!sortAsc)}
      className="border border-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition"
    >
      Email ({sortAsc ? "A-Z" : "Z-A"})
    </button>
  </div>
  </div>

  <table className="w-full text-sm border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
    <thead className="dark:bg-gray-800 text-left">
      <tr>
        <th className="px-4 py-3 border-b dark:border-gray-700">Avatar</th>
        <th className="px-4 py-3 border-b dark:border-gray-700">Name</th>
        <th className="px-4 py-3 border-b dark:border-gray-700">Email</th>
        <th className="px-4 py-3 border-b dark:border-gray-700">Company</th>
        <th className="px-4 py-3 border-b dark:border-gray-700">Actions</th>
      </tr>
    </thead>
    <tbody>
      {paginated.map((user) => (
        <tr
          key={user.id}
          onClick={() => router.push(`/users/${user.id}`)}
          className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        >
          <td className="px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm shadow-sm">
              {getInitials(user.name)}
            </div>
          </td>
          <td className="px-4 py-3 text-gray-800">{user.name}</td>
          <td className="px-4 py-3 text-gray-800">{user.email}</td>
          <td className="px-4 py-3 text-gray-800">{user.company.name}</td>
          <td className="px-4 py-3 flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation()
                openModal(user)
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
              aria-label="Edit"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                openDeleteConfirm(user)
              }}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
              aria-label="Delete"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Pagination */}
  <div className="mt-6 flex justify-end">
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  </div>
</div>

  );
}
