"use client"

import { useState, useEffect, useContext } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { LayoutDashboard, Shield, FileText, MessageSquare, User, Settings, LogOut, Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import AuthContext from "../../../context/AuthContext"

const Sidebar = () => {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState("")
  const [expanded, setExpanded] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setExpanded(false)
      } else {
        setExpanded(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Set active item based on current route
  useEffect(() => {
    const path = location.pathname.split("/")[2] || "dashboard"
    setActiveItem(path)
  }, [location])

  const navItems = [
   
    {
      name: "Permissions",
      icon: <Shield size={20} />,
      path: "/dashboard/permissions",
      active: location.pathname.includes("permissions"),
    },
    {
      name: "Records",
      icon: <FileText size={20} />,
      path: "/dashboard/records",
      active: location.pathname.includes("records"),
    },
    {
      name: "Chat",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/chat",
      active: location.pathname.includes("chat"),
    },
  ]

  const bottomNavItems = [
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { name: "Logout", icon: <LogOut size={20} />, path: "/login" },
  ]

  const { logoutUser } = useContext(AuthContext);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && expanded && <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setExpanded(false)} />}

      {/* Sidebar */}
      <motion.div
        className={`fixed lg:relative z-30 h-full bg-white shadow-lg flex flex-col
                   ${expanded ? "w-64" : "w-20"}`}
        initial={false}
        animate={{
          width: expanded ? (isMobile ? "240px" : "256px") : "80px",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {expanded ? (
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#9B65FF] to-[#F2613F] bg-clip-text text-transparent">
              Dashboard
            </h1>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#9B65FF] to-[#F2613F] flex items-center justify-center text-white font-bold">
              D
            </div>
          )}

          <button onClick={() => setExpanded(!expanded)} className="p-1 rounded-md hover:bg-gray-100 transition-colors">
            {expanded ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                relative flex items-center px-3 py-3 rounded-lg transition-all duration-300 group
                ${item.active ? "text-white" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              {item.active && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#9B65FF] to-[#F2613F]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center">
                <span className={`${item.active ? "text-white" : "text-gray-500 group-hover:text-gray-700"}`}>
                  {item.icon}
                </span>
                {expanded && (
                  <motion.span
                    className={`ml-3 font-medium ${item.active ? "text-white" : ""}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="py-6 px-3 space-y-1 border-t">
          {bottomNavItems.map((item) => (
            <NavLink
            onClick={() => { if(item.name == "Logout") logoutUser()}}
              key={item.name}
              to={item.path}
              className="flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              <span className="text-gray-500">{item.icon}</span>
              {expanded && (
                <motion.span
                  className="ml-3 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
              )}
            </NavLink>
          ))}
        </div>
      </motion.div>

      {/* Mobile toggle button */}
      {isMobile && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="fixed bottom-4 left-4 z-20 p-3 rounded-full bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white shadow-lg"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  )
}

export default Sidebar
