"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaSpinner } from "react-icons/fa6";
import { UploadCloud } from "lucide-react";
import { handleErrorToast, handleSuccessToast } from "@/lib/toast -message";
import { useLoadUser } from "@/hooks/useLoadUser";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const categories = ["AI", "SaaS", "Devtools"];

const ProductFormUI = () => {
  const router = useRouter();
  const { user, loading } = useLoadUser();

  const [userr, setUserr] = useState(null); // Store parsed localStorage user
  const [isLoding, setIsLoding] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    website: "",
    category: "",
    submittedBy: "",
  });

  const [logo, setLogo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Safe localStorage access
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserr(parsedUser);
        setFormData((prev) => ({
          ...prev,
          submittedBy: parsedUser?._id || "",
        }));
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setFormData((prev) => ({ ...prev, category: cat }));
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, tagline, description, website, category } = formData;
    if (!name || !tagline || !description || !website || !category) {
      handleErrorToast("Please fill in all fields.");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    if (logo) form.append("logoUrl", logo);

    try {
      setIsLoding(true);
      const res = await fetch(`${apiUrl}/api/products/create`, {
        method: "POST",
        body: form,
      });

      const result = await res.json();

      if (result.success) {
        handleSuccessToast(result?.message);
        setIsLoding(false);
        setFormData({
          name: "",
          tagline: "",
          description: "",
          website: "",
          category: "",
          submittedBy: userr?._id || "",
        });
        setLogo(null);
        setSelectedCategory("");
      } else {
        handleErrorToast(result?.message);
      }
    } catch (err) {
      handleErrorToast("❌ Something went wrong.");
      setIsLoding(false);
    }
  };

  return (
    <div className="max-w-2xl mt-20 mx-auto p-4 bg-white rounded-2xl shadow-xl border">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">
        📦 Add Product
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Chat Genie 11"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tagline
            </label>
            <Input
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="Your AI assistant for everything"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="ChatGenie helps you automate customer support, write content, and handle tasks using AI."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <Input
            name="website"
            value={formData.website}
            onChange={handleChange}
            type="url"
            placeholder="https://chatgenie.ai"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo Upload
          </label>
          <label className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
            <UploadCloud className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-gray-600 text-sm">
              {logo ? logo.name : "Click to upload"}
            </span>
            <span className="text-xs text-gray-500">
              SVG, PNG, JPG (max 1MB)
            </span>
            <input
              name="logo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-1.5 rounded-full border text-sm transition ${
                  selectedCategory === cat
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-2 text-sm bg-black text-white hover:bg-gray-900"
        >
          {isLoding ? <FaSpinner className="animate-spin" /> : "Save Product"}
        </Button>
      </form>
    </div>
  );
};

export default ProductFormUI;
