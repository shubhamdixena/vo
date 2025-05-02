"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import { getBlogById, createBlog, updateBlog, getCategories, getMedia } from "../../../lib/supabase"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Textarea } from "../../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { useToast } from "../../../../hooks/use-toast"
import { ArrowLeft, Save, ImageIcon, FileText } from "lucide-react"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import { navigateTo } from "../../../components/SimpleRouter"

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="border rounded-md p-4 h-64 bg-gray-50">Loading editor...</div>,
})

interface PostEditorProps {
  id?: string
}

const PostEditor = ({ id }: PostEditorProps) => {
  const isEditing = !!id

  const { toast } = useToast()

  const [post, setPost] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    category_id: "",
    status: "draft",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
  })

  const [categories, setCategories] = useState<any[]>([])
  const [media, setMedia] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)

        const mediaData = await getMedia()
        setMedia(mediaData)

        if (isEditing && id) {
          const postData = await getBlogById(id)
          if (postData) {
            setPost({
              title: postData.title || "",
              slug: postData.slug || "",
              content: postData.content || "",
              excerpt: postData.excerpt || "",
              featured_image: postData.featured_image || "",
              category_id: postData.category_id || "",
              status: postData.status || "draft",
              seo_title: postData.seo_title || "",
              seo_description: postData.seo_description || "",
              seo_keywords: postData.seo_keywords || "",
            })
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, isEditing, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPost((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from title
    if (name === "title" && !isEditing) {
      setPost((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-"),
        seo_title: prev.seo_title || value,
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (value: string) => {
    setPost((prev) => ({ ...prev, content: value }))
  }

  const handleSave = async () => {
    if (!post.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      })
      return
    }

    if (!post.slug) {
      toast({
        title: "Error",
        description: "Slug is required",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      if (isEditing && id) {
        await updateBlog(id, post)
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        })
      } else {
        const newPost = await createBlog(post)
        if (newPost) {
          navigateTo("admin/posts/edit", { id: newPost.id })
        }
        toast({
          title: "Success",
          description: "Blog post created successfully",
        })
      }
    } catch (error) {
      console.error("Error saving post:", error)
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const selectFeaturedImage = (url: string) => {
    setPost((prev) => ({ ...prev, featured_image: url }))
    setShowMediaLibrary(false)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-blue"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigateTo("admin/posts")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">{isEditing ? "Edit Post" : "New Post"}</h1>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={post.title} onChange={handleChange} className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" name="slug" value={post.slug} onChange={handleChange} className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <div className="mt-1 prose-container">
                    <ReactQuill
                      theme="snow"
                      value={post.content}
                      onChange={handleContentChange}
                      className="min-h-[300px]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={post.excerpt}
                    onChange={handleChange}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">SEO Settings</h2>
              <Tabs defaultValue="basic">
                <TabsList className="mb-4">
                  <TabsTrigger value="basic">Basic SEO</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div>
                    <Label htmlFor="seo_title">SEO Title</Label>
                    <Input
                      id="seo_title"
                      name="seo_title"
                      value={post.seo_title}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder={post.title}
                    />
                  </div>

                  <div>
                    <Label htmlFor="seo_description">Meta Description</Label>
                    <Textarea
                      id="seo_description"
                      name="seo_description"
                      value={post.seo_description}
                      onChange={handleChange}
                      className="mt-1"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <div>
                    <Label htmlFor="seo_keywords">Meta Keywords</Label>
                    <Input
                      id="seo_keywords"
                      name="seo_keywords"
                      value={post.seo_keywords}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Publish Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={post.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={post.category_id} onValueChange={(value) => handleSelectChange("category_id", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Featured Image</h2>
              {post.featured_image ? (
                <div className="space-y-4">
                  <div className="border rounded-md overflow-hidden">
                    <img
                      src={post.featured_image || "/placeholder.svg"}
                      alt="Featured"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setShowMediaLibrary(true)}>
                      Change
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPost((prev) => ({ ...prev, featured_image: "" }))}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
                  <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">No featured image selected</p>
                  <Button variant="outline" size="sm" onClick={() => setShowMediaLibrary(true)} className="mt-2">
                    Select Image
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showMediaLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Media Library</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowMediaLibrary(false)}>
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
              {media.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {media.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-md overflow-hidden cursor-pointer hover:border-charity-blue transition-colors"
                      onClick={() => selectFeaturedImage(item.url)}
                    >
                      <img src={item.url || "/placeholder.svg"} alt={item.name} className="w-full h-32 object-cover" />
                      <div className="p-2 text-xs truncate">{item.name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No media files found</p>
                  <p className="text-sm text-gray-400">Upload media files in the Media Library section</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <Button variant="outline" onClick={() => setShowMediaLibrary(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default PostEditor
