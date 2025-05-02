"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { navigateTo, useRouter } from "./SimpleRouter"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { currentRoute } = useRouter()

  // Navigation items
  const navItems = [
    { name: "Home", path: "home" },
    { name: "About", path: "about" },
    { name: "Blog", path: "blog" },
    { name: "Donate", path: "donate" },
    { name: "Admin", path: "admin" },
  ]

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleNavigation = (path: string) => {
    console.log(`Header - Navigating to: ${path}`)
    navigateTo(path)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation("home")}
              className={`text-2xl font-bold transition-colors ${isScrolled ? "text-charity-blue" : "text-white"}`}
            >
              Charity Water
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`font-medium transition-colors ${
                      isScrolled ? "text-gray-700 hover:text-charity-blue" : "text-white hover:text-gray-200"
                    } ${currentRoute === item.path || currentRoute.startsWith(item.path + "/") ? "font-bold" : ""}`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    handleNavigation(item.path)
                    setMobileMenuOpen(false)
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-charity-blue hover:bg-gray-50 w-full text-left"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
