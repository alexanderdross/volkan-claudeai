import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Shield, Plane } from "lucide-react";
import { getPartById } from "@/lib/api/parts";
import { getSellerById } from "@/lib/api/sellers";
import AddToCartButton from "@/components/products/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const part = await getPartById(params.id);

  if (!part) {
    notFound();
  }

  const seller = await getSellerById(part.sellerId);

  const conditionColors = {
    New: "bg-green-100 text-green-800",
    Overhauled: "bg-blue-100 text-blue-800",
    Used: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-9xl">✈️</div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Category & Condition */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-500">{part.category}</span>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    conditionColors[part.condition]
                  }`}
                >
                  {part.condition}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {part.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${part.price.toLocaleString()}
                </span>
                <span className="text-gray-600 ml-2">{part.currency}</span>
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

              {/* Add to Cart Button */}
              <AddToCartButton part={part} />
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

        {/* Product Details */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Product Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Part Number</h3>
              <p className="text-gray-600">{part.partNumber}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Manufacturer
              </h3>
              <p className="text-gray-600">{part.manufacturer}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
              <p className="text-gray-600">{part.category}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Condition</h3>
              <p className="text-gray-600">{part.condition}</p>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Plane className="w-5 h-5" />
                Compatible Aircraft Models
              </h3>
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
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {part.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
