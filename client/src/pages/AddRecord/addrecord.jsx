"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddRecord() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [status, setStatus] = useState("Active");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setName(selectedFile.name);
      setType(selectedFile.type.split("/")[1]);
      setSize((selectedFile.size / 1024).toFixed(2) + " KB");
    }
  };

  const handleSubmit = () => {
    console.log({ file, name, type, size, status });
    // API call or database logic goes here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto p-6 rounded-2xl border bg-white shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <UploadCloud className="w-6 h-6 text-blue-500" />
        Upload New Record
      </h2>

      {/* File Upload */}
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl py-10 bg-gray-50 cursor-pointer transition">
        {file ? (
          <div className="text-center text-sm text-gray-600">
            <FileText className="w-8 h-8 mx-auto text-green-500" />
            <p className="mt-2">{file.name}</p>
            <p className="text-xs text-gray-400">{type} · {size}</p>
          </div>
        ) : (
          <>
            <UploadCloud className="w-10 h-10 text-gray-400" />
            <p className="mt-2 text-gray-500 text-sm">Drag & drop or click to browse</p>
          </>
        )}
        <Input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Metadata Form */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="File Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="File Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <Input
          type="text"
          placeholder="File Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-3 py-2 text-gray-700 bg-white"
        >
          <option value="Active">Active</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setFile(null)}>
          <X className="w-4 h-4 mr-1" />
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Upload Record
        </Button>
      </div>
    </motion.div>
  );
}
