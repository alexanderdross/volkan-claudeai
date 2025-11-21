import { Category } from "@/lib/types";
import categoriesData from "@/data/categories.json";

export async function getAllCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return categoriesData as Category[];
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const categories = categoriesData as Category[];
  return categories.find((category) => category.slug === slug);
}
