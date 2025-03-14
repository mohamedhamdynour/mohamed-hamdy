"use client"

import { useTheme } from "../contexts/ThemeContext"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="rounded-full p-2 bg-primary/10 text-primary dark:text-primary-dark hover:bg-primary/20 transition-colors"
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </motion.button>
  )
}

export default ThemeToggle

