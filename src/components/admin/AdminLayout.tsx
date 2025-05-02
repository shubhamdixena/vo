"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { LayoutDashboard, FileText, ImageIcon, Tag, Settings, LogOut, Menu, X } from "lucide-react"
import { signOut } from "../../lib/supabase"
import { navigateTo, useRouter } from "../SimpleRouter"

// Create a simple Button component to avoid import issues
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const variantClasses = {
    default: "bg-charity-blue text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  }

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 py-1 text-sm",
    lg: "h-12 px-6 py-3 text-lg",
    icon: "h-9 w-9 p-2",
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        variantClasses[variant] || variantClasses.default
      } ${sizeClasses[size] || sizeClasses.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, loading } = useAuth()
  const { currentRoute } = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  console.log("AdminLayout - Current route:", currentRoute)

  const navigation = [
    { name: "Dashboard", href: "admin", icon: LayoutDashboard },
    { name: "Blog Posts", href: "admin/posts", icon: FileText },
    { name: "Media Library", href: "admin/media", icon: ImageIcon },
    { name: "Categories", href: "admin/categories", icon: Tag },
    { name: "Settings", href: "admin/settings", icon: Settings },
  ]

  const isActive = (item) => {
    if (currentRoute === item.href) return true
    if (item.href === "admin" && (currentRoute === "admin" || currentRoute === "admin/dashboard")) return true
    return false
  }

  const handleSignOut = async () => {
    await signOut()
    navigateTo("login")
  }

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user && !redirecting) {
      console.log("AdminLayout - No user, redirecting to login")
      setRedirecting(true)
      navigateTo("login")
    }
  }, [loading, user, redirecting])

  if (loading || redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-blue"></div>
      </div>
    )
  }

  if (!user) {
    console.log("AdminLayout - No user, returning null")
    return null // Will be redirected by the useEffect
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-40 p-4">
        <Button variant="outline" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-white">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <span className="text-xl font-bold text-charity-blue">Admin Panel</span>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => {
                const isCurrentActive = isActive(item)
                console.log(`AdminLayout - Nav item ${item.href} active:`, isCurrentActive)

                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      console.log(`AdminLayout - Navigating to ${item.href}`)
                      navigateTo(item.href)
                      setSidebarOpen(false)
                    }}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors w-full text-left ${
                      isCurrentActive
                        ? "bg-charity-blue bg-opacity-10 text-charity-blue"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${isCurrentActive ? "text-charity-blue" : "text-gray-400"}`} />
                    {item.name}
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-64">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default AdminLayout
