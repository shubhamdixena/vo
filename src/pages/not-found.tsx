"use client"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-medium text-gray-700">Page Not Found</h2>
        <p className="text-gray-500">The page you are looking for does not exist.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-charity-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
