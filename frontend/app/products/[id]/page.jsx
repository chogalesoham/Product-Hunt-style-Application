"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Comments from "@/components/comments";
import { useParams } from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const SingleProduct = () => {
  const [product, setProduct] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const params = useParams();
  const id = params.id;

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <section className="  bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="bg-transparent rounded-3xl p-4 lg:p-7 ">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="relative w-[300px] h-[240px] rounded-2xl overflow-hidden border-8 border-white/30 shadow-lg shadow-white/20">
              <img
                src={product.logoUrl}
                alt={product.name}
                className="object-contain w-full h-full p-4 bg-white rounded-xl"
              />
            </div>
            <div className="max-w-lg">
              <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">
                {product.name}
              </h1>
              <p className="text-lg text-white italic mb-4 tracking-wide drop-shadow-md">
                {product.tagline}
              </p>
              <p className="text-base text-white leading-relaxed mb-6 drop-shadow-md">
                {product.description}
              </p>
              <Badge
                variant="outline"
                className="text-white border-white/60 bg-white/10 px-4 py-2 rounded-full text-sm font-semibold tracking-wide"
              >
                {product?.category}
              </Badge>
              <a
                href={product.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 ml-4"
              >
                <Button className="bg-white/20 text-white text-sm px-6 py-3 rounded-full flex items-center gap-3 shadow-md hover:bg-white/40 transition duration-300">
                  Visit Website <ExternalLink size={18} />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <Comments productId={product._id} />
      </div>
    </section>
  );
};

export default SingleProduct;
