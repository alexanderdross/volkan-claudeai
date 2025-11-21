"use client";

import { useState, useEffect } from "react";
import { Part, ProductFilters as Filters } from "@/lib/types";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { searchParts, getAllParts } from "@/lib/api/parts";

export default function ProductsPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [filteredParts, setFilteredParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);

  useEffect(() => {
    async function loadParts() {
      try {
        const allParts = await getAllParts();
        setParts(allParts);
        setFilteredParts(allParts);

        // Extract unique categories and manufacturers
        const uniqueCategories = Array.from(
          new Set(allParts.map((p) => p.category))
        ).sort();
        const uniqueManufacturers = Array.from(
          new Set(allParts.map((p) => p.manufacturer))
        ).sort();

        setCategories(uniqueCategories);
        setManufacturers(uniqueManufacturers);
      } catch (error) {
        console.error("Error loading parts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadParts();
  }, []);

  const handleFilterChange = async (filters: Filters) => {
    setLoading(true);
    try {
      const results = await searchParts(filters);
      setFilteredParts(results);
    } catch (error) {
      console.error("Error filtering parts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Browse Products
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              onFilterChange={handleFilterChange}
              categories={categories}
              manufacturers={manufacturers}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : filteredParts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-xl text-gray-600">No products found</p>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  Showing {filteredParts.length} product
                  {filteredParts.length !== 1 ? "s" : ""}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredParts.map((part) => (
                    <ProductCard key={part.id} part={part} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
