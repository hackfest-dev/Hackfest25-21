"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Shield, Lock, FileText, UserCheck, ChevronRight, Database, ArrowRight } from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Home = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] to-[#f0f0ff] text-gray-800">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-[#9B65FF]"
            >
              MedLock
            </motion.div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-[#9B65FF] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-[#9B65FF] transition-colors">
              How It Works
            </a>
            <a href="#security" className="text-gray-700 hover:text-[#9B65FF] transition-colors">
              Security
            </a>
            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-white text-[#9B65FF] border border-[#9B65FF] hover:bg-[#9B65FF] hover:text-white transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 mb-12 md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Secure Your <span className="text-[#9B65FF]">Medical Records</span> with Blockchain
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            A decentralized platform that puts you in control of your health data. Share securely with trusted doctors
            and maintain complete privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/login"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white font-medium text-lg flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-lg border border-gray-300 text-gray-700 font-medium text-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:w-1/2 flex justify-center"
        >
          <DotLottieReact
            src="https://lottie.host/34a7119f-1b1e-4739-bdfc-0bee905a0a77/18p0qutuUv.lottie"
            loop
            autoplay
          />
        </motion.div>
      </section>


      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Why Choose <span className="text-[#F2613F]">MedLock</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our platform offers unparalleled security and control over your medical data
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-[#9B65FF]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-[#9B65FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Storage</h3>
              <p className="text-gray-600">
                Your medical records are encrypted and stored on a decentralized blockchain, ensuring maximum security
                and privacy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-[#F2613F]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Lock className="h-8 w-8 text-[#F2613F]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Access Control</h3>
              <p className="text-gray-600">
                You decide who can access your medical information. Grant and revoke permissions with a simple click.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-[#9B65FF]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-[#9B65FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Complete History</h3>
              <p className="text-gray-600">
                Maintain a comprehensive record of all your medical interactions in one secure place.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-[#9B65FF]/5 to-[#F2613F]/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              How It <span className="text-[#9B65FF]">Works</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              A simple process that puts you in control of your medical data
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-md relative z-10">
                <div className="bg-[#9B65FF] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Upload Records</h3>
                <p className="text-gray-600">
                  Securely upload your medical records after each doctor visit. All data is encrypted before storage.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                <ChevronRight className="h-10 w-10 text-[#9B65FF]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-md relative z-10">
                <div className="bg-[#F2613F] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Manage Access</h3>
                <p className="text-gray-600">
                  Receive access requests from healthcare providers and grant or deny permissions as needed.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                <ChevronRight className="h-10 w-10 text-[#F2613F]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-md relative z-10">
                <div className="bg-[#9B65FF] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Sharing</h3>
                <p className="text-gray-600">
                  Healthcare providers access only the records you've authorized, for the duration you specify.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
          <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:w-1/2 flex justify-center"
        >
          <DotLottieReact
              src="https://lottie.host/8bf0dfe7-a8d2-4bc2-adb8-b947a7e2ebe0/YCusDq54jZ.lottie"
            loop
            autoplay
          />
        </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2 md:pl-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Bank-Level <span className="text-[#F2613F]">Security</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our blockchain technology ensures your medical data is protected with the highest level of security
                available today.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-[#9B65FF]/10 p-2 rounded-full mr-4 mt-1">
                    <Database className="h-5 w-5 text-[#9B65FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Decentralized Storage</h3>
                    <p className="text-gray-600">No single point of failure means your data can't be compromised.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#F2613F]/10 p-2 rounded-full mr-4 mt-1">
                    <Lock className="h-5 w-5 text-[#F2613F]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">End-to-End Encryption</h3>
                    <p className="text-gray-600">Your data is encrypted before it leaves your device.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#9B65FF]/10 p-2 rounded-full mr-4 mt-1">
                    <UserCheck className="h-5 w-5 text-[#9B65FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Verified Providers</h3>
                    <p className="text-gray-600">
                      Only verified healthcare providers can request access to your records.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#9B65FF] to-[#F2613F]">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Take Control of Your Medical Records Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-10 max-w-3xl mx-auto"
          >
            Join thousands of patients who have already secured their medical data on our platform
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/login"
              className="px-10 py-4 rounded-lg bg-white text-[#9B65FF] font-medium text-lg inline-flex items-center hover:bg-opacity-90 transition-colors shadow-lg"
            >
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>


    </div>
  )
}

export default Home
