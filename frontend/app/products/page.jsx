"use client";
import React, { useEffect, useState } from "react";
import Filters from "@/components/filters";
import ProductCard from "@/components/product-card";
import { handleErrorToast, handleSuccessToast } from "@/lib/toast -message";
import { useRouter } from "next/navigation";
import { useLoadUser } from "@/hooks/useLoadUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ProductsUI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Trending");
  const router = useRouter();
  const { user, loading } = useLoadUser();

  // const token = JSON.parse(localStorage.getItem("token"));
  // const token = JSON.parse(localStorage.getItem("token"));

  const getAllProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/products`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setProductsData(data?.data || []);
      setFilteredProducts(data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/api/products/delete/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        handleSuccessToast(result?.message);
        getAllProducts();
      } else {
        handleErrorToast(result.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      handleErrorToast("Something went wrong.");
    }
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);

    let filtered = [...productsData];
    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (sortOption === "Latest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  };

  const handleSort = (sort) => {
    setSortOption(sort);

    let sorted = [...filteredProducts];

    if (sort === "Latest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(sorted);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    handleFilter(selectedCategory);
  }, [productsData]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  return (
    <section className="py-12 bg-gray-50 min-h-screen px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl mt-10 font-extrabold text-gray-900 mb-10 text-center">
          Product Listing
        </h1>

        <Filters
          selectedCategory={selectedCategory}
          handleFilter={handleFilter}
          sortOption={sortOption}
          handleSort={handleSort}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item._id}
              id={item._id}
              name={item.name}
              tagline={item.tagline}
              description={item.description}
              websiteUrl={item.websiteUrl}
              logoUrl={item.logoUrl}
              category={item.category}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsUI;
