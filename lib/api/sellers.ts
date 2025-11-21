import { Seller } from "@/lib/types";
import sellersData from "@/data/sellers.json";

export async function getAllSellers(): Promise<Seller[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return sellersData as Seller[];
}

export async function getSellerById(id: string): Promise<Seller | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const sellers = sellersData as Seller[];
  return sellers.find((seller) => seller.id === id);
}
