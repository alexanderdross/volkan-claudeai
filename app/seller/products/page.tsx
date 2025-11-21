"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Part } from "@/lib/types";
import { getPartsBySeller } from "@/lib/api/parts";

// Mock seller ID for now
const CURRENT_SELLER_ID = "seller-1";

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Part[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Part[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const parts = await getPartsBySeller(CURRENT_SELLER_ID);
        setProducts(parts);
        setFilteredProducts(parts);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.partNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleDelete = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      // In a real app, this would call an API
      setProducts(products.filter((p) => p.id !== productId));
      alert("Product deleted successfully!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Products
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage your product listings
            </p>
          </div>
          <Link
            href="/seller/products/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products by name or part number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found</p>
              {searchTerm && (
                <p className="text-gray-500 mt-2">Try a different search term</p>
              )}
              {!searchTerm && (
                <Link
                  href="/seller/products/new"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                >
                  Add your first product
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Product
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Part Number
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Condition
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Stock
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-t hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <Link
                            href={`/products/${product.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {product.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            {product.manufacturer}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {product.partNumber}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {product.category}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            product.condition === "New"
                              ? "bg-green-100 text-green-800"
                              : product.condition === "Overhauled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {product.condition}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                        ${product.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-sm ${
                            product.stock > 0
                              ? "text-green-600 font-semibold"
                              : "text-red-600 font-semibold"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/seller/products/${product.id}/edit`}
                            className="text-blue-600 hover:text-blue-800 p-2"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-800 p-2"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary */}
        {!loading && filteredProducts.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        )}
      </div>
    </div>
  );
}
