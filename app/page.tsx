"use client";

import Navbar from "../components/Navbar";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { useUserStore } from "@/store/userStore";
import { ClockIcon } from "@heroicons/react/24/outline";


export default function Home() {
  const { activityLog } = useUserStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />

      <main className="pt-20 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-md">
            <UserTable />
            <UserForm />
            <DeleteConfirmModal />
          </section>

          <aside className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              Activity Log
            </h2>

            {activityLog.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  No activity yet. User actions will appear here.
                </p>
              </div>
            ) : (
              <ul className="list-disc pl-5 space-y-2 text-sm max-h-[400px] overflow-y-auto">
                {activityLog.map((log, i) => (
                  <li key={i}>{log}</li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
