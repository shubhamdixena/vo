"use client"

import { createContext, useContext } from "react"

type NavigationContextType = {
  currentPage: string
  setCurrentPage: (page: string) => void
  params: Record<string, string>
  setParams: (params: Record<string, string>) => void
}

const NavigationContext = createContext<NavigationContextType>({
  currentPage: "home",
  setCurrentPage: () => {},
  params: {},
  setParams: () => {},
})

export const NavigationProvider = NavigationContext.Provider

export const useNavigation = () => useContext(NavigationContext)

// Helper function to navigate to a page
export const navigate = (
  setCurrentPage: (page: string) => void,
  setParams: (params: Record<string, string>) => void,
  to: string,
  params: Record<string, string> = {},
) => {
  console.log("NavigationContext - Navigating to:", to, "with params:", params)

  // Normalize admin route
  if (to === "admin") {
    to = "admin/dashboard"
  }

  setCurrentPage(to)
  setParams(params)

  // Update URL immediately for better user experience
  let url = "/"
  if (to !== "home") {
    url = `/${to}`
    if (to === "admin/posts/edit" && params.id) {
      url = `${url}/${params.id}`
    }
  }

  console.log("NavigationContext - Setting URL to:", url)
  window.history.pushState({}, "", url)
}
