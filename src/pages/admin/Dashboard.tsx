"use client"

import { useState, useEffect } from "react"
import AdminLayout from "../../components/admin/AdminLayout"
import { getBlogs } from "../../lib/supabase"
import { FileText, ImageIcon, Tag } from "lucide-react"
import { navigateTo } from "../../components/SimpleRouter"

// Create simple Card components to avoid import issues
const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-lg font-medium ${className}`} {...props}>
    {children}
  </h3>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

const Dashboard = () => {
  const [blogCount, setBlogCount] = useState(0)
  const [recentBlogs, setRecentBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await getBlogs()
        setBlogCount(blogs.length)
        setRecentBlogs(blogs.slice(0, 5))
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome to your blog admin panel</p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-blue"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{blogCount}</div>
                  <p className="text-xs text-gray-500 mt-1">{blogCount === 1 ? "Post" : "Posts"} in your blog</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Media Files</CardTitle>
                  <ImageIcon className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">--</div>
                  <p className="text-xs text-gray-500 mt-1">Files in your media library</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Categories</CardTitle>
                  <Tag className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">--</div>
                  <p className="text-xs text-gray-500 mt-1">Blog categories</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Recent Blog Posts</h2>
              {recentBlogs.length > 0 ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {recentBlogs.map((blog) => (
                      <li key={blog.id}>
                        <button
                          onClick={() => navigateTo("admin/posts/edit", { id: blog.id })}
                          className="block hover:bg-gray-50 transition-colors w-full text-left"
                        >
                          <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-charity-blue truncate">{blog.title}</p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    blog.status === "published"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {blog.status}
                                </p>
                              </div>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 truncate">
                              {new Date(blog.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
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
          </>
        )}
      </div>
    </AdminLayout>
  )
}

export default Dashboard
