import { createClient } from "@supabase/supabase-js"

// Use environment variables with proper fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vwmneqlybravacfoaqyw.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3bW5lcWx5YnJhdmFjZm9hcXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzIwNjgsImV4cCI6MjA2MTUwODA2OH0.MyvcWfsBI-8c0hAqFjlUNJVkfQAUpnVfF5Adc0eT9h4"

// Create a singleton client to prevent multiple instances
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }
  return supabaseClient
}

// Export the singleton client for convenience
export const supabase = getSupabaseClient()

// Authentication helpers
export const signIn = async (email: string, password: string) => {
  console.log("Attempting to sign in with:", email)
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  console.log("Sign in result:", result)
  return result
}

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  })
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser()
  return data.user
}

// Rest of your database functions remain the same
export const setupDatabase = async () => {
  // Create blogs table
  const { error: blogsError } = await supabase.rpc("create_blogs_table")
  if (blogsError && !blogsError.message.includes("already exists")) {
    console.error("Error creating blogs table:", blogsError)
  }

  // Create media table
  const { error: mediaError } = await supabase.rpc("create_media_table")
  if (mediaError && !mediaError.message.includes("already exists")) {
    console.error("Error creating media table:", mediaError)
  }

  // Create categories table
  const { error: categoriesError } = await supabase.rpc("create_categories_table")
  if (categoriesError && !categoriesError.message.includes("already exists")) {
    console.error("Error creating categories table:", categoriesError)
  }

  console.log("Database setup complete")
}

// Blog related functions
export const getBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*, categories(*)")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blogs:", error)
    return []
  }

  return data
}

export const getBlogById = async (id: string) => {
  const { data, error } = await supabase.from("blogs").select("*, categories(*)").eq("id", id).single()

  if (error) {
    console.error("Error fetching blog:", error)
    return null
  }

  return data
}

export const createBlog = async (blog: any) => {
  const { data, error } = await supabase.from("blogs").insert([blog]).select()

  if (error) {
    console.error("Error creating blog:", error)
    return null
  }

  return data[0]
}

export const updateBlog = async (id: string, blog: any) => {
  const { data, error } = await supabase.from("blogs").update(blog).eq("id", id).select()

  if (error) {
    console.error("Error updating blog:", error)
    return null
  }

  return data[0]
}

export const deleteBlog = async (id: string) => {
  const { error } = await supabase.from("blogs").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog:", error)
    return false
  }

  return true
}

// Media related functions
export const getMedia = async () => {
  const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching media:", error)
    return []
  }

  return data
}

export const uploadMedia = async (file: File) => {
  const fileExt = file.name.split(".").pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
  const filePath = `media/${fileName}`

  const { error: uploadError } = await supabase.storage.from("blog-media").upload(filePath, file)

  if (uploadError) {
    console.error("Error uploading file:", uploadError)
    return null
  }

  const { data: urlData } = supabase.storage.from("blog-media").getPublicUrl(filePath)

  const mediaEntry = {
    name: file.name,
    file_path: filePath,
    url: urlData.publicUrl,
    type: file.type,
    size: file.size,
  }

  const { data, error } = await supabase.from("media").insert([mediaEntry]).select()

  if (error) {
    console.error("Error creating media entry:", error)
    return null
  }

  return data[0]
}

export const deleteMedia = async (id: string, filePath: string) => {
  // Delete from storage
  const { error: storageError } = await supabase.storage.from("blog-media").remove([filePath])

  if (storageError) {
    console.error("Error deleting file from storage:", storageError)
  }

  // Delete from database
  const { error } = await supabase.from("media").delete().eq("id", id)

  if (error) {
    console.error("Error deleting media entry:", error)
    return false
  }

  return true
}

// Categories related functions
export const getCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data
}

export const createCategory = async (category: any) => {
  const { data, error } = await supabase.from("categories").insert([category]).select()

  if (error) {
    console.error("Error creating category:", error)
    return null
  }

  return data[0]
}

export const updateCategory = async (id: string, category: any) => {
  const { data, error } = await supabase.from("categories").update(category).eq("id", id).select()

  if (error) {
    console.error("Error updating category:", error)
    return null
  }

  return data[0]
}

export const deleteCategory = async (id: string) => {
  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) {
    console.error("Error deleting category:", error)
    return false
  }

  return true
}
