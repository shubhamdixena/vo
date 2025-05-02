"use client"

import Home from "../src/pages/Home"
import { useEffect } from "react"

export default function Page() {
  // Force client-side rendering to ensure SimpleRouter is initialized
  useEffect(() => {
    // This effect ensures the component is mounted on the client
  }, [])

  return <Home />
}
