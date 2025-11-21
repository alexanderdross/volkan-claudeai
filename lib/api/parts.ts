import { Part, ProductFilters } from "@/lib/types";
import partsData from "@/data/parts.json";

export async function getAllParts(): Promise<Part[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return partsData as Part[];
}

export async function getPartById(id: string): Promise<Part | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const parts = partsData as Part[];
  return parts.find((part) => part.id === id);
}

export async function getFeaturedParts(limit = 8): Promise<Part[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const parts = partsData as Part[];
  return parts.filter((part) => part.featured).slice(0, limit);
}

export async function getPartsByCategory(category: string): Promise<Part[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const parts = partsData as Part[];
  return parts.filter(
    (part) => part.category.toLowerCase() === category.toLowerCase()
  );
}

export async function searchParts(filters: ProductFilters): Promise<Part[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  let parts = partsData as Part[];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    parts = parts.filter(
      (part) =>
        part.name.toLowerCase().includes(searchLower) ||
        part.partNumber.toLowerCase().includes(searchLower) ||
        part.description.toLowerCase().includes(searchLower)
    );
  }

  if (filters.category) {
    parts = parts.filter((part) => part.category === filters.category);
  }

  if (filters.manufacturer) {
    parts = parts.filter((part) => part.manufacturer === filters.manufacturer);
  }

  if (filters.condition) {
    parts = parts.filter((part) => part.condition === filters.condition);
  }

  if (filters.minPrice !== undefined) {
    parts = parts.filter((part) => part.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    parts = parts.filter((part) => part.price <= filters.maxPrice!);
  }

  if (filters.compatibility) {
    parts = parts.filter((part) =>
      part.compatibility.some((model) =>
        model.toLowerCase().includes(filters.compatibility!.toLowerCase())
      )
    );
  }

  return parts;
}

export async function getPartsBySeller(sellerId: string): Promise<Part[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const parts = partsData as Part[];
  return parts.filter((part) => part.sellerId === sellerId);
}

export async function getRelatedParts(
  partId: string,
  limit = 4
): Promise<Part[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const parts = partsData as Part[];
  const currentPart = parts.find((part) => part.id === partId);

  if (!currentPart) return [];

  // Find parts in the same category, excluding the current part
  const relatedParts = parts
    .filter(
      (part) => part.category === currentPart.category && part.id !== partId
    )
    .slice(0, limit);

  // If not enough in same category, add parts from same manufacturer
  if (relatedParts.length < limit) {
    const manufacturerParts = parts
      .filter(
        (part) =>
          part.manufacturer === currentPart.manufacturer &&
          part.id !== partId &&
          !relatedParts.includes(part)
      )
      .slice(0, limit - relatedParts.length);
    relatedParts.push(...manufacturerParts);
  }

  return relatedParts;
}
