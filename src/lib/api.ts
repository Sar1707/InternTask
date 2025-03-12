import axios from "axios";
import { Product } from "../types";

const API_URL = "http://localhost:5000/products";

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

// Add a new product
export const addProduct = async (product: Omit<Product, "id">): Promise<void> => {
  await axios.post(API_URL, product);
};

// Update a product
export const updateProduct = async (id: number, product: Product): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, product);
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};