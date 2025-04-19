"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Check, AlertCircle, Loader, FileText } from "lucide-react"

export default function Permissions() {
  const [activeTab, setActiveTab] = useState("requested")
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [activePermission, setActivePermission] = useState(null)

  // Sample records data (in a real app, this would be fetched from an API)
  const records = [
    { id: 1, name: "Annual Report 2023", type: "PDF", size: "2.4 MB", date: "2023-12-15", status: "Active" },
    { id: 2, name: "Q4 Financial Statement", type: "XLSX", size: "1.8 MB", date: "2023-11-30", status: "Active" },
    { id: 3, name: "Marketing Strategy", type: "DOCX", size: "3.2 MB", date: "2023-10-22", status: "Archived" },
    { id: 4, name: "User Research Results", type: "PDF", size: "5.7 MB", date: "2023-09-18", status: "Active" },
    { id: 5, name: "Product Roadmap", type: "PPTX", size: "4.1 MB", date: "2023-08-05", status: "Active" },
    { id: 6, name: "Employee Handbook", type: "PDF", size: "1.5 MB", date: "2023-07-12", status: "Archived" },
  ]

  const requestedPermissions = [
    {
      id: 1,
      name: "Vinish Clinic",
      description: "Requested to access your medical records and share data between their departments",
      date: "2023/05/12",
    },
    {
      id: 2,
      name: "Sahyadri Clinic",
      description: "Requested to access your medical records for consultation",
      date: "2023/05/10",
    },
  ]

  const toggleFileSelection = (id) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter((fileId) => fileId !== id))
    } else {
      setSelectedFiles([...selectedFiles, id])
    }
  }

  const handleGrantAccess = (permission) => {
    setActivePermission(permission)
    setActiveTab("fileSelect")
    setSelectedFiles([])
    setError(null)
    setSuccess(false)
  }

  const handleAccept = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one file to grant access")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Placeholder for API request
      // In a real app, you would send the selectedFiles and activePermission to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      // Simulate successful response
      setSuccess(true)

      // Reset after showing success message
      setTimeout(() => {
        setActiveTab("granted")
        setIsSubmitting(false)
        setSuccess(false)
      }, 1500)
    } catch (err) {
      console.error("Error granting access:", err)
      setError("Failed to grant access. Please try again.")
      setIsSubmitting(false)
    }
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "PDF":
        return "bg-red-100 text-red-600"
      case "XLSX":
        return "bg-green-100 text-green-600"
      case "DOCX":
        return "bg-blue-100 text-blue-600"
      case "PPTX":
        return "bg-purple-100 text-purple-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Permissions Management</h1>
      </div>

      {/* Permission Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("requested")}
            className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === "requested" ? "border-b-2 border-[#9B65FF] text-[#9B65FF]" : "text-gray-500"}`}
          >
            Requested
          </button>
          <button
            onClick={() => setActiveTab("granted")}
            className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === "granted" ? "border-b-2 border-[#9B65FF] text-[#9B65FF]" : "text-gray-500"}`}
          >
            Granted
          </button>
          <button
            onClick={() => setActiveTab("revoked")}
            className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === "revoked" ? "border-b-2 border-[#9B65FF] text-[#9B65FF]" : "text-gray-500"}`}
          >
            Revoked
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "requested" && (
            <motion.div
              key="requested"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              {requestedPermissions.map((permission) => (
                <motion.div
                  key={permission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 last:mb-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{permission.name}</h3>
                      <p className="text-sm text-gray-500">{permission.description}</p>
                    </div>
                    <div className="text-xs text-gray-400">Date: {permission.date}</div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                      Deny
                    </button>
                    <button
                      onClick={() => handleGrantAccess(permission)}
                      className="px-4 py-2 bg-[#9B65FF] text-white rounded-md hover:bg-[#8A50F0] transition-colors"
                    >
                      Grant Access
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "fileSelect" && (
            <motion.div
              key="fileSelect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <button onClick={() => setActiveTab("requested")} className="flex items-center gap-2 text-[#9B65FF] mb-4">
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              {activePermission && (
                <div className="mb-6">
                  <h3 className="font-medium">Granting access to {activePermission.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Select files you want to share:</p>
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-50 border-l-4 border-red-500 p-3 rounded-md mb-4 flex items-center gap-2"
                >
                  <AlertCircle size={16} className="text-red-500" />
                  <p className="text-red-600 text-sm">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-green-50 border-l-4 border-green-500 p-3 rounded-md mb-4 flex items-center gap-2"
                >
                  <Check size={16} className="text-green-500" />
                  <p className="text-green-600 text-sm">Access granted successfully!</p>
                </motion.div>
              )}

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left font-medium text-gray-500 w-12">
                          <div className="flex items-center justify-center">
                            <span className="sr-only">Select</span>
                          </div>
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Name</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Type</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Size</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record, index) => (
                        <motion.tr
                          key={record.id}
                          className={`border-t hover:bg-gray-50 transition-colors ${
                            selectedFiles.includes(record.id) ? "bg-[#9B65FF]/5" : ""
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center">
                              <div
                                onClick={() => toggleFileSelection(record.id)}
                                className={`w-5 h-5 rounded border ${
                                  selectedFiles.includes(record.id)
                                    ? "bg-[#9B65FF] border-[#9B65FF]"
                                    : "border-gray-300"
                                } flex items-center justify-center cursor-pointer transition-colors`}
                              >
                                {selectedFiles.includes(record.id) && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                  >
                                    <Check size={12} className="text-white" />
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getFileIcon(record.type)}`}>
                                <FileText size={16} />
                              </div>
                              <span className="font-medium">{record.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{record.type}</td>
                          <td className="py-3 px-4">{record.size}</td>
                          <td className="py-3 px-4">{record.date}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccept}
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-[#9B65FF] text-white rounded-lg hover:bg-[#8A50F0] transition-colors flex items-center gap-2 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Accept</span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === "granted" && (
            <motion.div
              key="granted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <p className="text-gray-500">No permissions have been granted yet.</p>
            </motion.div>
          )}

          {activeTab === "revoked" && (
            <motion.div
              key="revoked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <p className="text-gray-500">No permissions have been revoked yet.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
