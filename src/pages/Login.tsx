"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { signIn } from "../lib/supabase"
import { AlertCircle } from "lucide-react"
import { navigateTo } from "../components/SimpleRouter"
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    // If user is already logged in, redirect to admin
    if (user && !authLoading) {
      navigateTo("admin")
    }
  }, [user, authLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      console.log("Submitting login form with email:", email)
      const { data, error } = await signIn(email, password)

      if (error) {
        console.error("Login error:", error)
        throw new Error(error.message)
      }

      console.log("Login successful:", data)
      navigateTo("admin")
    } catch (err) {
      console.error("Login exception:", err)
      setError(err instanceof Error ? err.message : "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  // For debugging purposes
  useEffect(() => {
    console.log("Login component mounted")
    console.log("Auth state:", { user, loading: authLoading })
  }, [user, authLoading])

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Access your blog admin panel</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-500 text-red-700 p-4 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-charity-blue focus:border-charity-blue"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-charity-blue focus:border-charity-blue"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-charity-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-charity-blue disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Debug information - remove in production */}
        <div className="mt-4 p-4 bg-gray-100 rounded-md text-xs">
          <p className="font-bold">Debug Info:</p>
          <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || "Using fallback URL"}</p>
          <p>Auth State: {user ? "Logged In" : "Not Logged In"}</p>
          <p>Loading: {authLoading ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login
