"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Globe, FileText, Menu, X } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useTheme } from "../contexts/ThemeContext"
import ThemeToggle from "./ThemeToggle"
import CustomLink from "./CustomLink"
import axios from "axios"

const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { toggleLanguage, t, language } = useLanguage()
  const { isDark } = useTheme()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [basicInfo, setBasicInfo] = useState({
    name: "Mohamed Hamdy",
    logo: "/logo.svg",
  })

  useEffect(() => {
    setMounted(true)

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

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: t("about") },
    { path: "/projects", label: t("projects") },
    { path: "/services", label: t("services") },
    { path: "/contact", label: t("contact") },
  ]

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <CustomLink to="/" className="-m-1.5 p-1.5 flex items-center">
            <span className="sr-only">{basicInfo.name}</span>
            <div className="relative h-10 w-10 mr-2 rounded-full overflow-hidden border-2 border-primary">
              <img src={basicInfo.logo || "/placeholder.svg"} alt="MH Logo" className="object-contain w-full h-full" />
            </div>
            <div className="text-xl font-bold text-primary dark:text-primary-dark hidden sm:block">
              {basicInfo.name}
            </div>
          </CustomLink>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <CustomLink
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold leading-6 transition-colors relative group ${
                isActive(item.path)
                  ? "text-primary dark:text-primary-dark"
                  : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark"
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-primary-dark transition-all group-hover:w-full"></span>
            </CustomLink>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark transition-colors relative group flex items-center"
          >
            {t("resume")}
            <FileText className="ml-1 h-4 w-4" />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-primary-dark transition-all group-hover:w-full"></span>
          </a>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
          {mounted && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className="rounded-full p-2 bg-primary/10 text-primary dark:text-primary-dark hover:bg-primary/20 transition-colors"
                aria-label="Toggle Language"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">{language === "en" ? "العربية" : "English"}</span>
              </motion.button>
              <ThemeToggle />
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="lg:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navItems.map((item) => (
              <CustomLink
                key={item.path}
                to={item.path}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary dark:text-primary-dark"
                    : "text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary dark:hover:text-primary-dark"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </CustomLink>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary dark:hover:text-primary-dark flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("resume")}
              <FileText className="ml-1 h-4 w-4" />
            </a>
            <div className="flex items-center space-x-2 px-3 py-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className="rounded-full p-2 bg-primary/10 text-primary dark:text-primary-dark hover:bg-primary/20 transition-colors"
                aria-label="Toggle Language"
              >
                <Globe className="h-5 w-5" />
              </motion.button>
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Header

