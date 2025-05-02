"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function CreateAdmin() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const createAdminUser = async () => {
    setStatus("loading")
    setMessage("Creating admin user...")

    try {
      // Check if user already exists
      const { data: existingUsers } = await supabase
        .from("auth.users")
        .select("*")
        .eq("email", "admin@gmail.com")
        .limit(1)

      if (existingUsers && existingUsers.length > 0) {
        setMessage("Admin user already exists!")
        setStatus("success")
        return
      }

      // Create new user
      const { data, error } = await supabase.auth.signUp({
        email: "admin@gmail.com",
        password: "123123",
      })

      if (error) {
        throw error
      }

      setMessage(`Admin user created successfully! User ID: ${data.user?.id}`)
      setStatus("success")
    } catch (error) {
      console.error("Error creating admin user:", error)
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`)
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Admin User</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            This will create an admin user with email: admin@gmail.com and password: 123123
          </p>
        </div>

        {status !== "idle" && (
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
        )}

        <button
          onClick={createAdminUser}
          disabled={status === "loading"}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-charity-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-charity-blue disabled:opacity-50"
        >
          {status === "loading" ? "Creating..." : "Create Admin User"}
        </button>
      </div>
    </div>
  )
}
