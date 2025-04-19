"use client"
import { Activity, Users, PieChart, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

const StatCard = ({ title, value, change, icon, color }) => {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users size={24} />
      case "activity":
        return <Activity size={24} />
      case "pie-chart":
        return <PieChart size={24} />
      case "dollar-sign":
        return <DollarSign size={24} />
      default:
        return <Activity size={24} />
    }
  }

  const isPositive = change.startsWith("+")

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Background gradient circle */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-r ${color} opacity-10`} />

      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className={`text-sm mt-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>{change}</p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color} text-white`}>{getIcon()}</div>
      </div>
    </motion.div>
  )
}

export default StatCard
