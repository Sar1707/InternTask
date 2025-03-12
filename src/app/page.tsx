"use client";
import { useEffect, useState } from "react";
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../lib/api";
import { Product } from "../types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    category: "",
  });

  // Load products from the API
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Update filtered list based on search query
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(query)
      )
    );
  };

  // Handle input changes for adding a new product
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // Handle input changes for editing an existing product
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;
    const { name, value } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  // Save the updated product to the API
  const handleSaveEdit = async () => {
    if (!editingProduct) return;
    try {
      // Note: updateProduct expects an id and the product object
      await updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
      await loadProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Add a new product to the API
  const handleAddProduct = async () => {
    if (!newProduct.name || newProduct.price <= 0 || !newProduct.category) {
      alert("Please fill all fields correctly.");
      return;
    }
    try {
      await addProduct(newProduct);
      setNewProduct({ name: "", price: 0, category: "" });
      await loadProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Delete a product from the API
  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setFilteredProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-10">
      <div className="p-5 bg-black m-auto max-w-4xl border rounded-2xl shadow">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 w-full mb-4 bg-black"
        />

        {/* Add Product Form */}
        <div className="mb-4 flex overflow-x-auto gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="border p-2 bg-black"
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={newProduct.price ? newProduct.price : ""}
            onChange={handleInputChange}
            className="border p-2 bg-black"
          />
          <input
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="border p-2 bg-black"
          />
          <Button
            onClick={handleAddProduct}
            className="bg-black text-white p-2 m-2  border rounded  hover:bg-gray-500 transition"
          >
            Add Product
          </Button>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="border p-2 rounded shadow bg-black text-white"
              >
                {editingProduct && editingProduct.id === product.id ? (
                  <>
                    <input
                      name="name"
                      value={editingProduct.name}
                      onChange={handleEditChange}
                      className="border p-2 w-full mb-2"
                    />
                    <input
                      name="price"
                      type="number"
                      value={editingProduct.price}
                      onChange={handleEditChange}
                      className="border p-2 w-full mb-2"
                    />
                    <input
                      name="category"
                      value={editingProduct.category}
                      onChange={handleEditChange}
                      className="border p-2 w-full mb-2"
                    />
                    <Button
                      onClick={handleSaveEdit}
                      className="bg-green-600 text-white p-2 w-full  hover:bg-green-700 transition"
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <CardHeader>
                      <CardTitle className="m-auto text-3xl">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h1 className="pb-2 m-auto">Category: {product.category}</h1>
                      <h1>Price: ${product.price}</h1>
                    </CardContent>
                    <div className=" flex p-2 justify-between w-30% ">
                    <Button
                      onClick={() => setEditingProduct(product)}
                      className="bg-green-500 text-white p-2 mt-2  hover:bg-green-600 transition"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white p-2 mt-2 hover:bg-red-600 transition"
                    >
                      Delete
                    </Button>
                    </div>
                  </>

                )}
              </Card>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
