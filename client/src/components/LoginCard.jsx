"use client"

import { useContext, useState } from "react"
import useWallet from "../hooks/useWallet"
import { useNavigate } from "react-router-dom"
import { setToken } from "../utils/authToken"
import AuthContext from "../context/AuthContext"
import { motion } from "framer-motion"
import { LockKeyhole, User, UserCog, Stethoscope } from "lucide-react"
import { registerAsPatient } from "../contracts/methods/patients.js"
import {registerAsDoctor} from "../contracts/methods/doctors.js"

export default function LoginCard() {
  const { connectWallet , getContract} = useWallet()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeButton, setActiveButton] = useState(null)

  const { loginUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const baseURL = import.meta.env.VITE_API_BASE_URL

  // Handler for generating nonce
  const handleGetNonce = async (signer) => {
    try {
      console.log(signer)

      const walletAddress = await signer?.getAddress()
      console.log(walletAddress)

      const response = await fetch(baseURL + "/user/nonce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress }),
      })

      const data = await response.json()
      if (response.status === 201) {
        return { nonce: data.data }
      } else {
        setError(data.error)
        return { nonce: null }
      }
    } catch (err) {
      console.error("Error fetching nonce:", err)
      setError("An error occurred while fetching the nonce")
      return { nonce: null }
    }
  }

  // Handler for verifying the signature
  const handleVerifySignature = async (signer, nonce, role, contract) => {
    try {
      const walletAddress = await signer?.getAddress()

      const signature = await signer?.signMessage(nonce)

      const response = await fetch(baseURL + "/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress, signature, role: role }),
      })

      const data = await response.json()
    
      if (response.status === 201) {
        if(role==='doctor'){
          console.log("Entering Doctor")
          await registerAsDoctor(contract);
        }
        else if(role==='patient'){
          console.log("Entering Patient")
          console.log("contract -1 ",contract);
          
          await registerAsPatient(contract);
        }
         else{
          return;
         }
        setToken(data.data.token)
        loginUser(walletAddress, role, contract, true)
        navigate("/profile")
        setError("")
      } else {
        setError(data.error)
      }
    } catch (err) {
      console.error("Error verifying signature:", err)
      setError("An error occurred while verifying the signature")
    }
  }

  const handleLogin = async (role) => {
    setLoading(true)
    setActiveButton(role)
    setError("")
    try {
      const { signer, contract } = await connectWallet()
      if (!signer) return
      const data = await handleGetNonce(signer)
      if (!data.nonce) return
      await handleVerifySignature(signer, data.nonce, role, contract)
    } catch (err) {
      console.error("Login error:", err)
      setError("Something went wrong during login")
    } finally {
      setLoading(false)
      setActiveButton(null)
    }
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-96 p-8 bg-white border border-gray-100 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
    >
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="font-sans text-4xl font-bold bg-gradient-to-r from-[#9B65FF] to-[#F2613F] bg-clip-text text-transparent mb-3 tracking-tight">
            Welcome
          </h2>
          <p className="text-gray-600 text-sm mb-6 font-medium">Please select your role to continue</p>
        </motion.div>
      </div>

      <div className="space-y-4 mb-6">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleLogin("patient")}
          disabled={loading}
          className={`w-full py-3.5 px-4 flex items-center justify-center gap-2 rounded-xl font-medium tracking-wide transition-all duration-200 
                    ${
                      loading && activeButton === "patient"
                        ? "bg-opacity-70 cursor-not-allowed"
                        : "hover:shadow-md active:shadow-inner"
                    } 
                    focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white`}
        >
          {loading && activeButton === "patient" ? (
            <span className="inline-flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting...
            </span>
          ) : (
            <>
              <User size={18} />
              <span>Patient</span>
            </>
          )}
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleLogin("doctor")}
          disabled={loading}
          className={`w-full py-3.5 px-4 flex items-center justify-center gap-2 rounded-xl font-medium tracking-wide transition-all duration-200 
                    ${
                      loading && activeButton === "doctor"
                        ? "bg-opacity-70 cursor-not-allowed"
                        : "hover:shadow-md active:shadow-inner"
                    } 
                    focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white`}
        >
          {loading && activeButton === "doctor" ? (
            <span className="inline-flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting...
            </span>
          ) : (
            <>
              <Stethoscope size={18} />
              <span>Doctor</span>
            </>
          )}
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleLogin("staff")}
          disabled={loading}
          className={`w-full py-3.5 px-4 flex items-center justify-center gap-2 rounded-xl font-medium tracking-wide transition-all duration-200 
                    ${
                      loading && activeButton === "staff"
                        ? "bg-opacity-70 cursor-not-allowed"
                        : "hover:shadow-md active:shadow-inner"
                    } 
                    focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white`}
        >
          {loading && activeButton === "staff" ? (
            <span className="inline-flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting...
            </span>
          ) : (
            <>
              <UserCog size={18} />
              <span>Medical Staff</span>
            </>
          )}
        </motion.button>
      </div>

      {error ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-red-50 border-l-4 border-red-500 p-3 rounded-md"
        >
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center space-x-2 text-gray-500 text-xs py-2 border-t border-gray-100"
        >
          <LockKeyhole className="h-4 w-4 text-[#9B65FF]" />
          <p className="font-medium">Secure login powered by blockchain</p>
        </motion.div>
      )}
    </motion.div>
  )
}
