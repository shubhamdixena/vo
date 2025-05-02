"use client"

import { useNavigation } from "../../contexts/NavigationContext"

const NavigationDebugger = () => {
  const { currentPage, params } = useNavigation()

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <div className="fixed bottom-0 right-0 bg-black bg-opacity-80 text-white p-2 text-xs z-50 max-w-xs">
      <div>
        <strong>Current Page:</strong> {currentPage}
      </div>
      <div>
        <strong>Params:</strong> {JSON.stringify(params)}
      </div>
      <div>
        <strong>URL:</strong> {window.location.pathname}
      </div>
    </div>
  )
}

export default NavigationDebugger
