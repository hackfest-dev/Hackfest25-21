"use client"

import { useState, useRef, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { handleIPFSUpload } from "../../utils/fileUploadService"
import { uploadRecord } from '../../contracts/methods/patients'
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Trash2,
  Edit,
  X,
  Upload,
  File,
  ImageIcon,
  FileSpreadsheet,
  FileCode,
  FilePieChart,
  Loader,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import AuthContext from "../../context/AuthContext"
import useWallet from "../../hooks/useWallet"

export default function Records() {
  const [records, setRecords] = useState([
    { id: 1, name: "Annual Report 2023", type: "PDF", size: "2.4 MB", date: "2023-12-15", status: "Active" },
    { id: 2, name: "Q4 Financial Statement", type: "XLSX", size: "1.8 MB", date: "2023-11-30", status: "Active" },
    { id: 3, name: "Marketing Strategy", type: "DOCX", size: "3.2 MB", date: "2023-10-22", status: "Archived" },
    { id: 4, name: "User Research Results", type: "PDF", size: "5.7 MB", date: "2023-09-18", status: "Active" },
    { id: 5, name: "Product Roadmap", type: "PPTX", size: "4.1 MB", date: "2023-08-05", status: "Active" },
    { id: 6, name: "Employee Handbook", type: "PDF", size: "1.5 MB", date: "2023-07-12", status: "Archived" },
  ])
  
  const { userData } = useContext(AuthContext);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadStatus, setUploadStatus] = useState("idle") // idle, uploading, success, error
  const [uploadError, setUploadError] = useState(null)
  const [viewingFile, setViewingFile] = useState(null)

  const { connectWallet } = useWallet();

  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    console.log(files);
    

    // Convert files to our format
    const newFiles = files.map((file, index) => ({
      id: `temp-${Date.now()}-${index}`,
      file,
      name: file.name,
      type: file.name.split(".").pop().toUpperCase(),
      size: formatFileSize(file.size),
      date: new Date().toISOString().split("T")[0],
      status: "Uploading",
      progress: 0,
    }))

    console.log(newFiles);
    

    setSelectedFiles([...selectedFiles, ...newFiles])
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const removeSelectedFile = (id) => {
    setSelectedFiles(selectedFiles.filter((file) => file.id !== id))
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setUploadStatus("uploading")
    setUploadError(null)

    try {
      console.log("running");
      
      // Placeholder for API request
      // In a real app, you would send the files to your backend
      for(const file of selectedFiles){        
      const hashId = await handleIPFSUpload(file.file);
      // console.log("hashid",hashId);
      console.log(userData);
      // const { contract } = await connectWallet();
      await uploadRecord(userData.contract,hashId)
      }
  
      // Simulate successful upload
      const newRecords = selectedFiles.map((file) => ({
        id: Math.max(...records.map((r) => r.id), 0) + 1,
        name: file.name,
        type: file.type,
        size: file.size,
        date: new Date().toLocaleDateString("en-CA"),
        status: "Active",
      }))

      setRecords([...records, ...newRecords])
      setUploadStatus("success")

      // Close modal after showing success message
      setTimeout(() => {
        setIsAddModalOpen(false)
        setSelectedFiles([])
        setUploadStatus("idle")
      }, 1500)
    } catch (err) {
      console.error("Upload error:", err)
      setUploadStatus("error")
      setUploadError("Failed to upload files. Please try again.")
    }
  }

  const handleViewFile = (file) => {
    setViewingFile(file)
    setIsViewModalOpen(true)
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "PDF":
        return <FileText size={24} />
      case "XLSX":
        return <FileSpreadsheet size={24} />
      case "DOCX":
        return <FileCode size={24} />
      case "PPTX":
        return <FilePieChart size={24} />
      case "JPG":
      case "PNG":
        return <ImageIcon size={24} />
      default:
        return <File size={24} />
    }
  }

  const getFileIconClass = (type) => {
    switch (type) {
      case "PDF":
        return "bg-red-100 text-red-600"
      case "XLSX":
        return "bg-green-100 text-green-600"
      case "DOCX":
        return "bg-blue-100 text-blue-600"
      case "PPTX":
        return "bg-purple-100 text-purple-600"
      case "JPG":
      case "PNG":
        return "bg-yellow-100 text-yellow-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Records Management</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          <span>Add Record</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search records..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-500">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Type</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Size</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                <th className="py-3 px-4 text-right font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <motion.tr
                  key={record.id}
                  className="border-t hover:bg-gray-50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onDoubleClick={() => handleViewFile(record)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getFileIconClass(record.type)}`}>
                        <FileText size={16} />
                      </div>
                      <span className="font-medium">{record.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{record.type}</td>
                  <td className="py-3 px-4">{record.size}</td>
                  <td className="py-3 px-4">{record.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 rounded-md hover:bg-gray-100" title="Download">
                        <Download size={16} />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100" title="Delete">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100" title="More">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-4 py-3">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{records.length}</span> of{" "}
            <span className="font-medium">{records.length}</span> records
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded border border-gray-200 text-sm font-medium disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded border border-gray-200 text-sm font-medium disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Record Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => uploadStatus !== "uploading" && setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-lg font-semibold">Add New Records</h3>
                <button
                  onClick={() => uploadStatus !== "uploading" && setIsAddModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  disabled={uploadStatus === "uploading"}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4">
                {/* File Upload Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#9B65FF] transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    disabled={uploadStatus === "uploading"}
                  />
                  <Upload size={36} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOCX, XLSX, PPTX, JPG, PNG</p>
                </div>

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                    <p className="text-sm font-medium text-gray-700">Selected Files ({selectedFiles.length})</p>

                    {selectedFiles.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-md ${getFileIconClass(file.type)}`}>
                            {getFileIcon(file.type)}
                          </div>
                          <div className="truncate max-w-[200px]">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>

                        {uploadStatus !== "uploading" && (
                          <button
                            onClick={() => removeSelectedFile(file.id)}
                            className="p-1 rounded-full hover:bg-gray-200 text-gray-500"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Upload Status */}
                {uploadStatus === "uploading" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 flex items-center justify-center gap-2 text-[#9B65FF]"
                  >
                    <Loader size={18} className="animate-spin" />
                    <span className="text-sm font-medium">Uploading files...</span>
                  </motion.div>
                )}

                {uploadStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 bg-red-50 border-l-4 border-red-500 p-3 rounded-md flex items-center gap-2"
                  >
                    <AlertCircle size={18} className="text-red-500" />
                    <p className="text-red-600 text-sm">{uploadError || "Failed to upload files"}</p>
                  </motion.div>
                )}

                {uploadStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 bg-green-50 border-l-4 border-green-500 p-3 rounded-md flex items-center gap-2"
                  >
                    <CheckCircle size={18} className="text-green-500" />
                    <p className="text-green-600 text-sm">Files uploaded successfully!</p>
                  </motion.div>
                )}
              </div>

              <div className="border-t p-4 flex justify-end gap-2">
                <button
                  onClick={() => uploadStatus !== "uploading" && setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={uploadStatus === "uploading"}
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpload}
                  disabled={selectedFiles.length === 0 || uploadStatus === "uploading"}
                  className={`px-4 py-2 bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white rounded-lg transition-opacity ${
                    selectedFiles.length === 0 || uploadStatus === "uploading"
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:opacity-90"
                  }`}
                >
                  {uploadStatus === "uploading" ? "Uploading..." : "Upload Files"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View File Modal */}
      <AnimatePresence>
        {isViewModalOpen && viewingFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsViewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getFileIconClass(viewingFile.type)}`}>
                    {getFileIcon(viewingFile.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{viewingFile.name}</h3>
                    <p className="text-xs text-gray-500">
                      {viewingFile.type} • {viewingFile.size} • {viewingFile.date}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-6 bg-gray-50">
                {/* File Preview Content */}
                <div className="bg-white rounded-lg border shadow-sm p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className={`p-4 rounded-lg ${getFileIconClass(viewingFile.type)} inline-block mb-4`}>
                      {getFileIcon(viewingFile.type)}
                    </div>
                    <p className="text-gray-500">
                      Preview not available for {viewingFile.type} files.
                      <br />
                      <span className="text-sm">In a real application, this would show the actual file content.</span>
                    </p>
                    <button className="mt-4 px-4 py-2 bg-[#9B65FF] text-white rounded-lg hover:bg-[#8A50F0] transition-colors flex items-center gap-2 mx-auto">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
