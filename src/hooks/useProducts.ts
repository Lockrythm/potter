import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { testProducts } from '@/data/testProducts';

interface UseProductsOptions {
  category?: string;
  searchQuery?: string;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use test products for now
    let filtered = [...testProducts];

    if (options.category) {
      filtered = filtered.filter((p) => p.category === options.category);
    }

    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    setProducts(filtered);
  }, [options.category, options.searchQuery]);

  return { products, loading, error };
}
