"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { Part } from "@/lib/types";
import { useState } from "react";

interface AddToCartButtonProps {
  part: Part;
  quantity?: number;
}

export default function AddToCartButton({ part, quantity = 1 }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(part, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      disabled={part.stock === 0}
      onClick={handleAddToCart}
      className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
        part.stock > 0
          ? added
            ? "bg-green-600 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      <ShoppingCart className="w-5 h-5" />
      {added ? "Added to Cart!" : "Add to Cart"}
    </button>
  );
}
