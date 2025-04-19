// 

"use client"

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, CalendarHeart, Droplet } from 'lucide-react'

export default function PatientForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    bloodGroup: '',
    gender: '',
    phone: '',
    city: '',
  })

  useEffect(() => {
    navigate('/dashboard');
  },[])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Patient Data Submitted:', formData)
    // navigate('/next-page')
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFBFB] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-5 rounded-2xl shadow-xl w-1/2"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-center bg-gradient-to-r from-[#9B65FF] to-[#F2613F] bg-clip-text text-transparent mb-6"
        >
          Patient Information
        </motion.h2>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-wrap gap-5 p-5 justify-center items-center"
        >
          <div className="grid grid-cols-2 gap-10 w-full">
            <motion.div variants={itemVariants} className="relative w-full">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <CalendarHeart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <Droplet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="bloodGroup"
                placeholder="Blood Group"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
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
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] transition-all"
                required
              />
            </motion.div>
          </div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white rounded-lg transition-all shadow-md hover:shadow-lg mt-6"
          >
            Submit
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}
