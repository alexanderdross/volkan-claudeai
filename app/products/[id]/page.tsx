"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Shield,
  Plane,
  Share2,
  Heart,
  FileText,
} from "lucide-react";
import { Part, Seller } from "@/lib/types";
import { getPartById, getRelatedParts } from "@/lib/api/parts";
import { getSellerById } from "@/lib/api/sellers";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ImageGallery from "@/components/products/ImageGallery";
import QuantitySelector from "@/components/products/QuantitySelector";
import AddToCartButton from "@/components/products/AddToCartButton";
import ProductCard from "@/components/products/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const [part, setPart] = useState<Part | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [relatedParts, setRelatedParts] = useState<Part[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const partData = await getPartById(params.id as string);
        if (partData) {
          setPart(partData);
          const sellerData = await getSellerById(partData.sellerId);
          setSeller(sellerData || null);
          const related = await getRelatedParts(partData.id, 4);
          setRelatedParts(related);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!part) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800"
          >
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const conditionColors = {
    New: "bg-green-100 text-green-800",
    Overhauled: "bg-blue-100 text-blue-800",
    Used: "bg-gray-100 text-gray-800",
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: part.name,
        text: part.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Products", href: "/products" },
            { label: part.category, href: `/products?category=${part.category}` },
            { label: part.name, href: `/products/${part.id}` },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Image Gallery */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <ImageGallery images={part.images} productName={part.name} />
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Category & Condition */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/products?category=${part.category}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {part.category}
                  </Link>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      conditionColors[part.condition]
                    }`}
                  >
                    {part.condition}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                    title="Share"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                    title="Add to wishlist"
                  >
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {part.name}
              </h1>

              {/* Part Number */}
              <p className="text-gray-600 mb-4">
                Part Number: <span className="font-semibold">{part.partNumber}</span>
              </p>

              {/* Price */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${part.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600">{part.currency}</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {part.stock > 0 ? (
                  <div className="flex items-center text-green-600">
                    <Package className="w-5 h-5 mr-2" />
                    <span className="font-semibold">
                      In Stock ({part.stock} available)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <Package className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              {part.stock > 0 && (
                <div className="mb-6">
                  <QuantitySelector
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    max={part.stock}
                  />
                </div>
              )}

              {/* Add to Cart Button */}
              <AddToCartButton part={part} quantity={quantity} />

              {/* Key Features */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Key Information
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Manufacturer:</span>
                    <span className="font-medium text-gray-900">
                      {part.manufacturer}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Condition:</span>
                    <span className="font-medium text-gray-900">
                      {part.condition}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-900">
                      {part.category}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Seller Info */}
            {seller && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Seller Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">
                      Company:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {seller.companyName}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">
                      Contact:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {seller.contactEmail}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <span className="ml-2 text-gray-600">{seller.phone}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-700">
                        Certifications:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {seller.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details - Full Width */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Product Details
          </h2>

          {/* Specifications Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-4 bg-gray-50 font-semibold text-gray-700 w-1/4">
                    Part Number
                  </td>
                  <td className="py-4 px-4 text-gray-600">{part.partNumber}</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 bg-gray-50 font-semibold text-gray-700">
                    Manufacturer
                  </td>
                  <td className="py-4 px-4 text-gray-600">{part.manufacturer}</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 bg-gray-50 font-semibold text-gray-700">
                    Category
                  </td>
                  <td className="py-4 px-4 text-gray-600">{part.category}</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 bg-gray-50 font-semibold text-gray-700">
                    Condition
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        conditionColors[part.condition]
                      }`}
                    >
                      {part.condition}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 bg-gray-50 font-semibold text-gray-700 align-top">
                    <div className="flex items-center gap-2">
                      <Plane className="w-5 h-5" />
                      Compatible Aircraft
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-2">
                      {part.compatibility.map((model) => (
                        <span
                          key={model}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">{part.description}</p>
          </div>
        </div>

        {/* Related Products */}
        {relatedParts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedParts.map((relatedPart) => (
                <ProductCard key={relatedPart.id} part={relatedPart} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
