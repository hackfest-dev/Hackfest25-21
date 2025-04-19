"use client"
import { motion } from "framer-motion"
import { User, FileText, MessageSquare, Shield } from "lucide-react"

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "updated permissions",
    time: "2 minutes ago",
    icon: <Shield size={16} />,
    color: "bg-purple-100 text-[#9B65FF]",
  },
  {
    id: 2,
    user: "Sarah Smith",
    action: "added new record",
    time: "1 hour ago",
    icon: <FileText size={16} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "sent a message",
    time: "3 hours ago",
    icon: <MessageSquare size={16} />,
    color: "bg-orange-100 text-[#F2613F]",
  },
  {
    id: 4,
    user: "Emily Wilson",
    action: "created account",
    time: "1 day ago",
    icon: <User size={16} />,
    color: "bg-green-100 text-green-600",
  },
]

const RecentActivity = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          className="flex items-start space-x-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className={`p-2 rounded-full ${activity.color} flex-shrink-0`}>{activity.icon}</div>
          <div>
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span> {activity.action}
            </p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </motion.div>
      ))}

      <button className="w-full mt-4 text-sm text-[#9B65FF] hover:text-[#8A50F0] font-medium">View All Activity</button>
    </div>
  )
}

export default RecentActivity
