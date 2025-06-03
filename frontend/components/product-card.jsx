import React from "react";
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

const ProductCard = ({
  id,
  name,
  tagline,
  description,
  websiteUrl,
  logoUrl,
  category,
  handleDelete,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={logoUrl}
          alt={name}
          className="w-16 h-16 object-cover rounded-full border border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">{tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-6 line-clamp-4">{description}</p>

      {/* Meta */}
      <div className="flex justify-between items-center mb-6">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Visit Website
        </a>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center gap-3">
        <Link href={`/products/${id}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-1"
          >
            Read More
          </Button>
        </Link>
        <Link href={`/update/${id}`}>
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-1"
          >
            <FiEdit />
            Update
          </Button>
        </Link>

        <Button
          variant="destructive"
          className="flex-1 flex items-center justify-center gap-1"
          onClick={() => handleDelete(id)}
        >
          <FiTrash2 />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
