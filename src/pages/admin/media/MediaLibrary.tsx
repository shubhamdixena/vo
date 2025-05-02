"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import { getMedia, uploadMedia, deleteMedia } from "../../../lib/supabase"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent } from "../../../../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../components/ui/alert-dialog"
import { useToast } from "../../../../hooks/use-toast"
import { Upload, MoreHorizontal, Trash2, Copy, ExternalLink } from "lucide-react"

const MediaLibrary = () => {
  const [media, setMedia] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deleteItem, setDeleteItem] = useState<any | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const data = await getMedia()
      setMedia(data)
    } catch (error) {
      console.error("Error fetching media:", error)
      toast({
        title: "Error",
        description: "Failed to load media files",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const newMedia = await uploadMedia(file)
        if (newMedia) {
          setMedia((prev) => [newMedia, ...prev])
        }
      }
      toast({
        title: "Success",
        description: "Media uploaded successfully",
      })
    } catch (error) {
      console.error("Error uploading media:", error)
      toast({
        title: "Error",
        description: "Failed to upload media",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDelete = async () => {
    if (!deleteItem) return

    try {
      const success = await deleteMedia(deleteItem.id, deleteItem.file_path)
      if (success) {
        setMedia(media.filter((item) => item.id !== deleteItem.id))
        toast({
          title: "Success",
          description: "Media deleted successfully",
        })
      } else {
        throw new Error("Failed to delete media")
      }
    } catch (error) {
      console.error("Error deleting media:", error)
      toast({
        title: "Error",
        description: "Failed to delete media",
        variant: "destructive",
      })
    } finally {
      setDeleteItem(null)
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Copied",
      description: "URL copied to clipboard",
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Media Library</h1>
            <p className="text-gray-500 mt-1">Manage your media files</p>
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept="image/*"
            />
            <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-blue"></div>
          </div>
        ) : media.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {media.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative group">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img src={item.url || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="bg-white/80 backdrop-blur-sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => copyToClipboard(item.url)}>
                          <Copy className="mr-2 h-4 w-4" /> Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <ExternalLink className="mr-2 h-4 w-4" /> Open
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => setDeleteItem(item)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-xs truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{(item.size / 1024).toFixed(1)} KB</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No media files</h3>
            <p className="mt-1 text-sm text-gray-500">Upload images to use in your blog posts</p>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="mt-4">
              Upload Files
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the media file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}

export default MediaLibrary
