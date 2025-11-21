import Link from "next/link";
import Image from "next/image";
import { Part } from "@/lib/types";

interface ProductCardProps {
  part: Part;
}

export default function ProductCard({ part }: ProductCardProps) {
  const conditionColors = {
    New: "bg-green-100 text-green-800",
    Overhauled: "bg-blue-100 text-blue-800",
    Used: "bg-gray-100 text-gray-800",
  };

  return (
    <Link href={`/products/${part.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            ✈️
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-grow flex flex-col">
          {/* Category & Condition */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">{part.category}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                conditionColors[part.condition]
              }`}
            >
              {part.condition}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {part.name}
          </h3>

          {/* Part Number */}
          <p className="text-sm text-gray-600 mb-2">P/N: {part.partNumber}</p>

          {/* Manufacturer */}
          <p className="text-sm text-gray-700 mb-3">
            <span className="font-medium">Mfr:</span> {part.manufacturer}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
            {part.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${part.price.toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {part.stock > 0 ? (
                <span className="text-green-600">In Stock ({part.stock})</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
