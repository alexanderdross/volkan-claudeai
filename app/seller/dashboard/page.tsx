import Link from "next/link";
import { Package, DollarSign, TrendingUp, Eye } from "lucide-react";
import { getPartsBySeller } from "@/lib/api/parts";

// Mock seller ID for now
const CURRENT_SELLER_ID = "seller-1";

export default async function SellerDashboard() {
  const sellerParts = await getPartsBySeller(CURRENT_SELLER_ID);

  // Calculate stats
  const totalProducts = sellerParts.length;
  const totalValue = sellerParts.reduce(
    (sum, part) => sum + part.price * part.stock,
    0
  );
  const inStockProducts = sellerParts.filter((part) => part.stock > 0).length;
  const totalStock = sellerParts.reduce((sum, part) => sum + part.stock, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your products and track your inventory
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Products</span>
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {totalProducts}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {inStockProducts} in stock
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Inventory Value</span>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 mt-1">Total stock value</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Units</span>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {totalStock}
            </div>
            <div className="text-sm text-gray-500 mt-1">Units in stock</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Avg. Price</span>
              <Eye className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${Math.round(totalValue / totalStock || 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 mt-1">Per unit</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/seller/products/new"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
            >
              Add New Product
            </Link>
            <Link
              href="/seller/products"
              className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition text-center"
            >
              Manage Products
            </Link>
            <Link
              href="/products"
              className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition text-center"
            >
              View Marketplace
            </Link>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Products
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Part Number
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Stock
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {sellerParts.slice(0, 5).map((part) => (
                  <tr key={part.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Link
                        href={`/products/${part.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {part.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {part.partNumber}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {part.category}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      ${part.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {part.stock}
                    </td>
                    <td className="py-3 px-4">
                      {part.stock > 0 ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sellerParts.length > 5 && (
            <div className="mt-4 text-center">
              <Link
                href="/seller/products"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All Products →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
