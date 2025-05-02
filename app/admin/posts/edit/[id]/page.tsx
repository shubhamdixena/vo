"use client"

import PostEditor from "../../../../../src/pages/admin/posts/PostEditor"
import { useEffect, useState } from "react"

export default function EditPostPage({ params }: { params: { id: string } }) {
  // Use client-side only rendering to prevent hydration errors
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient ? (
        <PostEditor id={params.id} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-blue"></div>
        </div>
      )}
    </>
  )
}
