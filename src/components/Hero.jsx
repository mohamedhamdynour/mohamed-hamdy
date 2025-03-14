"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { FileText, ArrowRight } from "lucide-react"
import axios from "axios"
import CustomLink from "./CustomLink"

const Hero = () => {
  const { t, language } = useLanguage()
  const [displayedName, setDisplayedName] = useState("")
  const [basicInfo, setBasicInfo] = useState({
    name: "Mohamed Hamdy",
    shortDescription: "Junior Data Analyst with a passion for transforming data into actionable insights.",
    logo: "/logo.svg",
    resumeLink: "/resume.pdf",
  })
  const typingCompleted = useRef(false)

  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const response = await axios.get("/api/basic-info")
        if (response.data) {
          setBasicInfo(response.data)
        }
      } catch (error) {
        console.error("Error fetching basic info:", error)
      }
    }

    fetchBasicInfo()
  }, [])

  useEffect(() => {
    setDisplayedName("")
    typingCompleted.current = false
    let i = 0
    const fullName = basicInfo.name

    const typingInterval = setInterval(() => {
      if (i < fullName.length) {
        setDisplayedName((prev) => prev + fullName.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
        typingCompleted.current = true
      }
    }, 150)

    return () => clearInterval(typingInterval)
  }, [basicInfo.name, language])

  return (
    <div id="home" className="relative isolate overflow-hidden bg-white dark:bg-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-50/30 dark:from-blue-900/10 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-700/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-200/20 dark:bg-purple-700/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div
          className={`mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0 ${language === "ar" ? "lg:text-right" : ""}`}
        >
          <motion.h1
            className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {displayedName}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 animate-pulse">
              {typingCompleted.current ? "" : "|"}
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {basicInfo.shortDescription}
          </motion.p>
          <motion.div
            className="mt-10 flex items-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.a
              href={basicInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("resume")}
              <FileText className="ml-2 h-5 w-5" />
            </motion.a>
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <CustomLink
                to="/projects"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white flex items-center"
              >
                {t("exploreWork")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </CustomLink>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="mx-auto mt-16 lg:mt-0 relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="relative">
            {/* Logo circle with background */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 flex items-center justify-center">
              <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-white dark:bg-gray-800 p-4 flex items-center justify-center shadow-lg">
                <img
                  src={basicInfo.logo || "/placeholder.svg"}
                  alt="Mohamed Hamdy Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-blue-500/30 dark:bg-blue-500/20"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-purple-500/30 dark:bg-purple-500/20"></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero

