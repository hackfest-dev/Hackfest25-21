"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Award, FileText, Calendar } from "lucide-react"

export default function DoctorForm() {
  const [doctor, setDoctor] = useState({
    name: "",
    specialty: "",
    phone: "",
    email: "",
    gender: "",
    city: "",
    practiceYears: "",
    licenseNo: "",
    registrationYear: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setDoctor({ ...doctor, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Doctor Data Submitted:", doctor)
    // navigate('/doctor-dashboard')
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFBFB] p-4 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-5 rounded-2xl shadow-xl w-1/2    "
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-center bg-gradient-to-r from-[#9B65FF] to-[#F2613F] bg-clip-text text-transparent mb-6 "
        >
          Doctor Information
        </motion.h2>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-wrap gap-5 p-5   justify-center items-center"
        >
          {/* This is the only line that changed */}
          <div className="grid grid-cols-2 gap-10   w-full">
            <motion.div variants={itemVariants} className="relative w-full ">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="name"
                placeholder="Full Name"
                value={doctor.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={doctor.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="specialty"
                placeholder="Specialization"
                value={doctor.specialty}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full  ">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                name="gender"
                value={doctor.gender}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all appearance-none bg-white"
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="phone"
                placeholder="Phone Number"
                value={doctor.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="city"
                placeholder="Resident City"
                value={doctor.city}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="practiceYears"
                placeholder="Years of Practice"
                type="number"
                value={doctor.practiceYears}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="licenseNo"
                placeholder="License Number"
                type="text"
                value={doctor.licenseNo}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="registrationYear"
                placeholder="Year of Registration"
                type="number"
                value={doctor.registrationYear}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>
          </div>

          <motion.button
            variants={itemVariants}
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white rounded-lg transition-all shadow-md hover:shadow-lg mt-6"
          >
            Submit
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}
