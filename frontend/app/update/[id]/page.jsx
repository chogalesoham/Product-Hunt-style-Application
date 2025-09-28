'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud } from 'lucide-react';
import { handleSuccessToast } from '@/lib/toast -message';
import { FaSpinner } from 'react-icons/fa6';
import { useLoadUser } from '@/hooks/useLoadUser';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ProductFormUI = () => {
  const { user, loading } = useLoadUser();
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    websiteUrl: '',
    category: '',
    logoUrl: ''
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/products/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token || ''
          }
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        const { name, tagline, description, websiteUrl, category, logoUrl } =
          data.data;
        setFormData({
          name,
          tagline,
          description,
          websiteUrl,
          category,
          logoUrl
        });
      } catch (error) {
        console.error('Error fetching product:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle file select and store in local state (don't upload here)
  const handleLogoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    // Optional: Show preview before upload by setting logoUrl to local URL
    setFormData((prev) => ({
      ...prev,
      logoUrl: URL.createObjectURL(selectedFile)
    }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));
    setIsLoading(true);

    try {
      const form = new FormData();

      // Append all text fields
      form.append('name', formData.name);
      form.append('tagline', formData.tagline);
      form.append('description', formData.description);
      form.append('websiteUrl', formData.websiteUrl);
      form.append('category', formData.category);

      // Append file only if user selected a new file
      if (file) {
        form.append('logoUrl', file);
      }

      const res = await fetch(`${apiUrl}/api/products/update/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: token || ''
          // Don't set Content-Type, browser will set to multipart/form-data boundary automatically
        },
        body: form
      });

      if (!res.ok) throw new Error('Failed to update product');

      const result = await res.json();
      handleSuccessToast(result?.message);
      router.push('/products');
    } catch (error) {
      console.error('Update failed:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  return (
    <div className="max-w-2xl mt-20 mx-auto p-4 bg-white rounded-2xl shadow-xl border">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">
        📦 Edit Product
      </h2>

      <form className="space-y-4" onSubmit={handleUpdateProduct}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
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
              placeholder="Product Tagline"
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
            placeholder="Brief product description"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <Input
            type="url"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            placeholder="https://yourproduct.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {['AI', 'SaaS', 'Devtools'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, category: cat }))
                }
                className={`px-4 py-1.5 rounded-full border text-sm transition ${
                  formData.category === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo Upload (optional)
          </label>
          <div
            className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => document.getElementById('logoInput')?.click()}
          >
            <UploadCloud className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-gray-600 text-sm">
              {file
                ? 'New Logo Selected ✅'
                : formData.logoUrl
                  ? 'Current Logo ✅'
                  : 'Click to upload'}
            </span>
            <span className="text-xs text-gray-500">PNG, JPG (max 1MB)</span>
            <input
              id="logoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </div>

          {formData.logoUrl && (
            <img
              src={formData.logoUrl}
              alt="Logo preview"
              className="h-16 mt-2 rounded-md object-contain"
            />
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 text-sm bg-black text-white hover:bg-gray-900 disabled:opacity-50"
        >
          {isLoading ? <FaSpinner className=" animate-spin" /> : 'Save Product'}
        </Button>
      </form>
    </div>
  );
};

export default ProductFormUI;
