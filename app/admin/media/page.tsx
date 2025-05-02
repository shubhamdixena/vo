"use client"

import MediaLibrary from "../../../src/pages/admin/media/MediaLibrary"
import { useEffect, useState } from "react"

export default function MediaPage() {
  // Use client-side only rendering to prevent hydration errors
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient ? (
        <MediaLibrary />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-blue"></div>
        </div>
      )}
    </>
  )
}
