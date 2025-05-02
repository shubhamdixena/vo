"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase, getCurrentUser } from "../lib/supabase"
import type { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  loading: boolean
  error: Error | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    console.log("AuthProvider mounted")

    const fetchUser = async () => {
      try {
        console.log("Fetching current user...")
        const currentUser = await getCurrentUser()
        console.log("Current user:", currentUser)
        setUser(currentUser || null)
      } catch (err) {
        console.error("Error fetching user:", err)
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      console.log("Cleaning up auth listener")
      authListener.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
