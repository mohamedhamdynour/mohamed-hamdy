"use client"

import { useLanguage } from "../contexts/LanguageContext"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, Instagram, Globe } from "lucide-react"
import axios from "axios"
import { useState, useEffect } from "react"
import CustomLink from "./CustomLink"

const Footer = () => {
  const { t, language } = useLanguage()
  const [socialLinks, setSocialLinks] = useState([])
  const [basicInfo, setBasicInfo] = useState({
    name: "Mohamed Hamdy",
    email: "muhamedhamdynour@gmail.com",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [basicInfoResponse, socialLinksResponse] = await Promise.all([
          axios.get("/api/basic-info"),
          axios.get("/api/social-links"),
        ])

        if (basicInfoResponse.data) {
          setBasicInfo(basicInfoResponse.data)
        }

        if (socialLinksResponse.data) {
          setSocialLinks(socialLinksResponse.data)
        }
      } catch (error) {
        console.error("Error fetching footer data:", error)
      }
    }

    fetchData()
  }, [])

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return <Linkedin className="h-6 w-6" />
      case "github":
        return <Github className="h-6 w-6" />
      case "twitter":
        return <Twitter className="h-6 w-6" />
      case "instagram":
        return <Instagram className="h-6 w-6" />
      case "email":
        return <Mail className="h-6 w-6" />
      default:
        return <Globe className="h-6 w-6" />
    }
  }

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {[
            { name: t("footerAbout"), href: "/about" },
            { name: t("footerProjects"), href: "/projects" },
            { name: t("footerServices"), href: "/services" },
            { name: t("footerContact"), href: "/contact" },
            { name: t("footerPrivacy"), href: "/privacy-terms" },
          ].map((item) => (
            <div key={item.name} className="pb-6">
              <CustomLink
                to={item.href}
                className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {item.name}
              </CustomLink>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">{link.platform}</span>
              {getSocialIcon(link.platform)}
            </motion.a>
          ))}
        </div>
        <p className="mt-10 text-center text-sm leading-5 text-gray-500 dark:text-gray-400">{t("footerCopyright")}</p>
      </div>
    </footer>
  )
}

export default Footer

