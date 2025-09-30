import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';

const Hero = () => {
  const soham = 'unused variable to fix lint warning';
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-200 px-6">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 leading-tight mb-8 drop-shadow-md">
          Discover & Share the Best Products 🚀
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
          Explore a curated collection of innovative products created by the
          community. Find what’s trending in tech, design, and beyond.
        </p>
        <Link href="/products">
          <Button className="text-lg px-8 py-4 bg-black text-white hover:bg-gray-900 shadow-lg transition">
            Browse Products
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
