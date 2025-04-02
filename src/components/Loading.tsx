function Loading() {
  return (
    <div>
        <div className="h-screen flex items-center justify-center bg-gray-900">
            <div className="flex flex-col items-center">
            {/* Spinning Loader */}
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            
            {/* Text with fade animation */}
            <p className="mt-4 text-gray-300 text-lg animate-pulse">
                Connecting to Chat...
            </p>
            </div>
        </div>
    </div>
  )
}

export default Loading