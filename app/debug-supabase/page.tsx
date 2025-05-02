"use client"

import { useState, useEffect } from "react"
import { supabase, getCurrentUser } from "../../src/lib/supabase"

export default function DebugSupabasePage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Checking Supabase connection...")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function checkConnection() {
      try {
        // Test the connection by making a simple query
        const { data, error } = await supabase.from("blogs").select("count").limit(1)

        if (error) {
          throw error
        }

        setMessage("Supabase connection successful!")
        setStatus("success")

        // Try to get current user
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Supabase connection error:", error)
        setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`)
        setStatus("error")
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Supabase Debug</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Testing connection to Supabase</p>
        </div>

        <div
          className={`p-4 rounded-md ${
            status === "loading"
              ? "bg-blue-50 text-blue-700"
              : status === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium">Environment Variables:</h3>
          <div className="bg-gray-100 p-4 rounded-md mt-2 text-sm">
            <p>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set (using fallback)"}</p>
            <p>
              NEXT_PUBLIC_SUPABASE_ANON_KEY:{" "}
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Not set (using fallback)"}
            </p>
          </div>
        </div>

        {user && (
          <div className="mt-4">
            <h3 className="text-lg font-medium">Current User:</h3>
            <div className="bg-gray-100 p-4 rounded-md mt-2 text-sm overflow-auto">
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
