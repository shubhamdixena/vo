"use client"

import type React from "react"

import { useState, useEffect } from "react"

// Public pages
import Home from "../pages/Home"
import Login from "../pages/Login"
import NotFound from "../pages/not-found"
import About from "../pages/About"

// Admin pages
import Dashboard from "../pages/admin/Dashboard"
import PostsList from "../pages/admin/posts/PostsList"
import PostEditor from "../pages/admin/posts/PostEditor"
import MediaLibrary from "../pages/admin/media/MediaLibrary"
import CategoriesList from "../pages/admin/categories/CategoriesList"
import Settings from "../pages/admin/settings/Settings"

export type RouteParams = Record<string, string>

export interface RouterState {
  currentRoute: string
  params: RouteParams
  navigate: (to: string, params?: RouteParams) => void
}

// Create a global router state that can be accessed from anywhere
let routerState: RouterState | null = null
let setRouterState: ((state: RouterState) => void) | null = null

export function useRouter(): RouterState {
  if (!routerState) {
    throw new Error("Router not initialized. Make sure SimpleRouter is mounted.")
  }
  return routerState
}

export function navigateTo(to: string, params: RouteParams = {}) {
  if (!routerState || !setRouterState) {
    console.error("Router not initialized. Make sure SimpleRouter is mounted.")
    return
  }

  console.log(`Navigating to: ${to}`, params)

  // Update the router state
  const newState = {
    ...routerState,
    currentRoute: to,
    params,
  }
  setRouterState(newState)

  // Update the URL
  let url = "/"
  if (to !== "home") {
    url = `/${to}`
    if (to === "admin/posts/edit" && params.id) {
      url = `${url}/${params.id}`
    }
  }

  window.history.pushState({}, "", url)
}

interface SimpleRouterProps {
  children?: React.ReactNode
}

const SimpleRouter: React.FC<SimpleRouterProps> = ({ children }) => {
  // Parse the initial route from the URL
  const getInitialRoute = (): { route: string; params: RouteParams } => {
    if (typeof window === "undefined") {
      return { route: "home", params: {} }
    }

    const path = window.location.pathname.replace(/^\/|\/$/g, "") || "home"
    console.log("Initial path:", path)

    // Handle admin/posts/edit/ID pattern
    const match = path.match(/^admin\/posts\/edit\/(.+)$/)
    if (match) {
      return { route: "admin/posts/edit", params: { id: match[1] } }
    }

    return { route: path, params: {} }
  }

  const initial = getInitialRoute()
  const [state, setState] = useState<RouterState>({
    currentRoute: initial.route,
    params: initial.params,
    navigate: (to, params = {}) => navigateTo(to, params),
  })

  // Set the global router state
  routerState = state
  setRouterState = setState

  // Listen for popstate events (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const { route, params } = getInitialRoute()
      setState((prev) => ({
        ...prev,
        currentRoute: route,
        params,
      }))
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Debug output
  useEffect(() => {
    console.log("Current route:", state.currentRoute)
    console.log("Params:", state.params)
  }, [state.currentRoute, state.params])

  // Render the appropriate component based on the current route
  const renderRoute = () => {
    const { currentRoute, params } = state

    // If we're in Next.js App Router context, just render children
    if (children) {
      return children
    }

    // Public routes
    if (currentRoute === "home") return <Home />
    if (currentRoute === "about") return <About />
    if (currentRoute === "login") return <Login />

    // Admin routes
    if (currentRoute === "admin" || currentRoute === "admin/dashboard") return <Dashboard />
    if (currentRoute === "admin/posts") return <PostsList />
    if (currentRoute === "admin/posts/new") return <PostEditor />
    if (currentRoute === "admin/posts/edit") return <PostEditor id={params.id} />
    if (currentRoute === "admin/media") return <MediaLibrary />
    if (currentRoute === "admin/categories") return <CategoriesList />
    if (currentRoute === "admin/settings") return <Settings />

    // 404 for unknown routes
    return <NotFound />
  }

  // Use client-side only rendering for the debug display
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {renderRoute()}
      {/* Debug display - only rendered on client */}
      {isClient && process.env.NODE_ENV !== "production" && (
        <div className="fixed bottom-0 right-0 bg-black bg-opacity-80 text-white p-2 text-xs z-50 max-w-xs">
          <div>
            <strong>Route:</strong> {state.currentRoute}
          </div>
          <div>
            <strong>Params:</strong> {JSON.stringify(state.params)}
          </div>
          <div>
            <strong>URL:</strong> {typeof window !== "undefined" ? window.location.pathname : ""}
          </div>
        </div>
      )}
    </>
  )
}

export default SimpleRouter
