"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axios.get("/api/translations")
        setTranslations(response.data)
      } catch (error) {
        console.error("Error fetching translations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTranslations()
  }, [])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"))
    document.documentElement.dir = language === "en" ? "rtl" : "ltr"
  }

  const t = (key) => {
    if (!translations[key]) return key
    return translations[key][language] || key
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

