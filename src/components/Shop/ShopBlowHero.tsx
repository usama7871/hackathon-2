"use client";
import { useState, useEffect, useCallback } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { products } from '@/data/products';

interface FilterState {
  category: string[];
  priceRange: string;
  rating: number | null;
  inStock: boolean;
}

interface ShopBlowHeroProps {
  onFilterChange: (filteredProducts: any[]) => void;
  totalProducts: number;
}

export default function ShopBlowHero({ onFilterChange, totalProducts }: ShopBlowHeroProps) {
  const [itemsPerPage, setItemsPerPage] = useState('16');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: 'all',
    rating: null,
    inStock: false
  });

  const categories = Array.from(new Set(products.map(p => p.features.category)));
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under 1M', value: '0-1000000' },
    { label: '1M - 2M', value: '1000000-2000000' },
    { label: '2M - 3M', value: '2000000-3000000' },
    { label: 'Over 3M', value: '3000000-up' }
  ];

  const applyFilters = useCallback(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(p => filters.category.includes(p.features.category));
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(p => {
        const price = p.salePrice || p.price;
        if (max === undefined) return price >= min;
        return price >= min && price < max;
      });
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(p => p.features.rating >= filters.rating!);
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(p => p.features.specifications.inStock);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price_desc':
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'popularity':
          return b.features.reviewCount - a.features.reviewCount;
        default: // newest
          return new Date(b.features.manufacturingDate).getTime() - 
                 new Date(a.features.manufacturingDate).getTime();
      }
    });

    onFilterChange(filtered);
  }, [filters, sortBy, itemsPerPage]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="relative">
      <div className="w-full h-16 bg-[#F9F1E7] flex justify-between items-center px-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 hover:text-[#B88E2F] transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter</span>
          </button>
          <p className="text-gray-600">
            Showing {Math.min(Number(itemsPerPage), totalProducts)} of {totalProducts} results
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              className="w-16 h-8 bg-white border border-gray-300 rounded px-2 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            >
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
              <option value="64">64</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-40 h-8 bg-white border border-gray-300 rounded px-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popularity">Popularity</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg z-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category)}
                      onChange={(e) => {
                        setFilters(prev => ({
                          ...prev,
                          category: e.target.checked
                            ? [...prev.category, category]
                            : prev.category.filter(c => c !== category)
                        }));
                      }}
                      className="rounded border-gray-300 text-[#B88E2F] focus:ring-[#B88E2F]"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={filters.priceRange === range.value}
                      onChange={(e) => {
                        setFilters(prev => ({
                          ...prev,
                          priceRange: e.target.value
                        }));
                      }}
                      className="border-gray-300 text-[#B88E2F] focus:ring-[#B88E2F]"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-semibold mb-3">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => {
                        setFilters(prev => ({
                          ...prev,
                          rating: rating
                        }));
                      }}
                      className="border-gray-300 text-[#B88E2F] focus:ring-[#B88E2F]"
                    />
                    <span>{rating}+ Stars</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div>
              <h3 className="font-semibold mb-3">Availability</h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => {
                    setFilters(prev => ({
                      ...prev,
                      inStock: e.target.checked
                    }));
                  }}
                  className="rounded border-gray-300 text-[#B88E2F] focus:ring-[#B88E2F]"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                setFilters({
                  category: [],
                  priceRange: 'all',
                  rating: null,
                  inStock: false
                });
              }}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#B88E2F]"
            >
              <X size={16} />
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}