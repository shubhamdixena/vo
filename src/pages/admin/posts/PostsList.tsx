"use client"

import React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import { getBlogs, deleteBlog } from "../../../lib/supabase"
import { navigateTo } from "../../../components/SimpleRouter"
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

// Simple UI components
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const variantClasses = {
    default: "bg-charity-blue text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  }

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 py-1 text-sm",
    lg: "h-12 px-6 py-3 text-lg",
    icon: "h-9 w-9 p-2",
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        variantClasses[variant] || variantClasses.default
      } ${sizeClasses[size] || sizeClasses.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Simple Table components
const Table = ({ children, className = "", ...props }) => (
  <div className={`w-full overflow-auto ${className}`} {...props}>
    <table className="w-full caption-bottom text-sm">{children}</table>
  </div>
)

const TableHeader = ({ children, className = "", ...props }) => (
  <thead className={`[&_tr]:border-b ${className}`} {...props}>
    {children}
  </thead>
)

const TableBody = ({ children, className = "", ...props }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props}>
    {children}
  </tbody>
)

const TableRow = ({ children, className = "", ...props }) => (
  <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`} {...props}>
    {children}
  </tr>
)

const TableHead = ({ children, className = "", ...props }) => (
  <th
    className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  >
    {children}
  </th>
)

const TableCell = ({ children, className = "", ...props }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
    {children}
  </td>
)

// Simple dropdown components
const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-block text-left">
      {React.Children.map(children, (child) => {
        if (child.type.displayName === "DropdownMenuTrigger") {
          return React.cloneElement(child, { onClick: () => setOpen(!open) })
        }
        if (child.type.displayName === "DropdownMenuContent") {
          return open ? child : null
        }
        return child
      })}
    </div>
  )
}

DropdownMenu.displayName = "DropdownMenu"

const DropdownMenuTrigger = ({ children, asChild, ...props }) => {
  return (
    <div {...props}>
      {asChild ? (
        children
      ) : (
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium">{children}</button>
      )}
    </div>
  )
}

DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = ({ children, align = "center", className = "", ...props }) => {
  return (
    <div
      className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = ({ children, asChild, className = "", ...props }) => {
  return asChild ? (
    children
  ) : (
    <button
      className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

DropdownMenuItem.displayName = "DropdownMenuItem"

// Simple Alert Dialog components
const AlertDialog = ({ children, open, onOpenChange }) => {
  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="z-50 p-4">{children}</div>
    </div>
  ) : null
}

const AlertDialogContent = ({ children, className = "", ...props }) => (
  <div
    className={`bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-in fade-in-0 zoom-in-95 ${className}`}
    {...props}
  >
    {children}
  </div>
)

const AlertDialogHeader = ({ children, className = "", ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
)

const AlertDialogTitle = ({ children, className = "", ...props }) => (
  <h2 className={`text-lg font-semibold ${className}`} {...props}>
    {children}
  </h2>
)

const AlertDialogDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>
)

const AlertDialogFooter = ({ children, className = "", ...props }) => (
  <div className={`flex justify-end space-x-2 mt-4 ${className}`} {...props}>
    {children}
  </div>
)

const AlertDialogCancel = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const AlertDialogAction = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 ${className}`}
    {...props}
  >
    {children}
  </button>
)

// Toast hook
const useToast = () => {
  const toast = ({ title, description, variant = "default" }) => {
    console.log(`Toast: ${title} - ${description} (${variant})`)
    // In a real implementation, this would show a toast notification
  }

  return { toast }
}

const PostsList = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const data = await getBlogs()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      const success = await deleteBlog(deleteId)
      if (success) {
        setPosts(posts.filter((post) => post.id !== deleteId))
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        })
      } else {
        throw new Error("Failed to delete post")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      })
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Blog Posts</h1>
            <p className="text-gray-500 mt-1">Manage your blog content</p>
          </div>
          <Button onClick={() => navigateTo("admin/posts/new")}>
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-blue"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          post.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </TableCell>
                    <TableCell>{post.categories?.name || "Uncategorized"}</TableCell>
                    <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <button
                              onClick={() => navigateTo("admin/posts/edit", { id: post.id })}
                              className="flex items-center w-full"
                            >
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => setDeleteId(post.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No blog posts yet</p>
            <button
              onClick={() => navigateTo("admin/posts/new")}
              className="mt-2 inline-flex items-center text-sm text-charity-blue hover:underline"
            >
              Create your first post
            </button>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}

export default PostsList
