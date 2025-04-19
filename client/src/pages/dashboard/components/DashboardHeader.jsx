"use client"

import { useState } from "react"
import { Bell, Search, User } from "lucide-react"

const DashboardHeader = () => {
  const [notifications, setNotifications] = useState(3)

  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-[#F2613F] text-white text-xs flex items-center justify-center rounded-full">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#9B65FF] to-[#F2613F] flex items-center justify-center text-white">
              <User size={20} />
            </div>
            <div className="hidden md:block">
              <p className="font-medium text-sm">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
