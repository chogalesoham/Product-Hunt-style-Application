import React from 'react';

const categories = ['All', 'AI', 'SaaS', 'Devtools'];

const Filters = ({
  selectedCategory,
  handleFilter,
  sortOption,
  handleSort
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
      <div>
        <span className="mr-4 font-semibold text-gray-700">Filter by:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`mr-2 mb-2 sm:mb-0 px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? 'bg-black text-white'
                : 'bg-white text-gray-700'
            } hover:bg-gray-100 transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div>
        <span className="mr-4 font-semibold text-gray-700">Sort by:</span>
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="Trending">Trending</option>
          <option value="Latest">Latest</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
