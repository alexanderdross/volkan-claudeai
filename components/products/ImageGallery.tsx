"use client";

import { useState } from "react";

interface ImageGalleryProps {
  images?: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // For now, create placeholder images
  const galleryImages = images && images.length > 0
    ? images
    : Array(4).fill("placeholder");

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden relative group">
        <div className="text-9xl">✈️</div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300" />
      </div>

      {/* Thumbnail Strip */}
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-blue-600 ring-2 ring-blue-600 ring-opacity-50"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <div className="text-3xl">✈️</div>
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="text-center text-sm text-gray-500">
        Image {selectedImage + 1} of {galleryImages.length}
      </div>
    </div>
  );
}
