"use client"

import type React from "react"
import App from "../src/App"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <App>{children}</App>
}
