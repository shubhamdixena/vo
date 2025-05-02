"use client"

import type React from "react"

import { QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "../components/ui/tooltip"
import { Toaster } from "../components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext"
import { queryClient } from "./lib/queryClient"
import SimpleRouter from "./components/SimpleRouter"
import { useEffect, useState } from "react"

interface AppProps {
  children?: React.ReactNode
}

function App({ children }: AppProps) {
  // Use client-side only rendering to prevent hydration errors
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          {isClient ? (
            <SimpleRouter>{children}</SimpleRouter>
          ) : (
            // Show a loading state during server-side rendering
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-blue"></div>
            </div>
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
