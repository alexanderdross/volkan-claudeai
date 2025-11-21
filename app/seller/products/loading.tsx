export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mt-2 animate-pulse"></div>
          </div>
          <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        <div className="mb-6">
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-center items-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-center text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
