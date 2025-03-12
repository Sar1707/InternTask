

This is a simple Next.js + TypeScript application that allows users to add, search, edit and delete products using a mock API (db.json).

Features

✅ Add new products (name, price, category)
✅ Search products by name
✅ Edit products
✅ Delete products
✅ Responsive UI with Navbar & Footer
✅ Uses json-server as a mock API




1. Installation

Prerequisites

Node.js installed (v16+ recommended)

Package manager (npm or yarn)


Steps

Clone the repository:

git clone https://github.com/your-username/your-repo.git
cd your-repo

Install dependencies:

npm install  # or yarn install

Start the mock API server:

npx json-server --watch db.json --port 5000

> This runs db.json on http://localhost:5000



Start the Next.js app:

npm run dev  # or yarn dev

> The app will be available at http://localhost:3000




---

2. Folder Structure

/project-root
│── /app (or /pages)        # Next.js pages
│── /components             # Reusable UI components
│── /lib                    # API calls
│── /public                 # Static assets
│── /styles                 # CSS files
│── db.json                 # Mock API data
│── README.md               # Project documentation
│── next.config.js          # Next.js config
│── tsconfig.json           # TypeScript config


---

3. API Endpoints (Mock API - db.json)

Example Product Data (db.json)

{
  "products": [
    { "id": 1, "name": "Steel Rod", "category": "Raw Material", "price": 100 },
    { "id": 2, "name": "Iron Sheet", "category": "Metal", "price": 250 }
  ]
}


---

4. How It Works

Adding a Product

Enter product details (name, price, category)

Click "Add Product"

Product is added and displayed


Searching for a Product

Type in the search bar

Products filter dynamically


Editing a Product 

Click "Edit" button 


Deleting a Product

Click "Delete" button

Product is removed

5. Code Highlights

Fetching Products (lib/api.ts)

export const fetchProducts = async () => {
  const res = await fetch("http://localhost:5000/products");
  return res.json();
};

Adding a Product (lib/api.ts)

export const addProduct = async (product: Omit<Product, "id">) => {
  await fetch("http://localhost:5000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};

Deleting a Product (lib/api.ts)

export const deleteProduct = async (id: number) => {
  await fetch(http://localhost:5000/products/${id}, { method: "DELETE" });
};

6. Styling & UI

Uses Tailwind CSS for styling


Responsive design



