'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FilterOption {
  value: string;
  label: string;
}

interface DocumentsFiltersProps {
  categories: FilterOption[];
  activeCategory: string;
  activeSearch: string;
  resultCount?: number;
}

export function DocumentsFilters({
  categories,
  activeCategory,
  activeSearch,
  resultCount,
}: DocumentsFiltersProps) {
  const router = useRouter();
  const [search, setSearch] = useState(activeSearch);
  const [category, setCategory] = useState(activeCategory);
  const [isFocused, setIsFocused] = useState(false);

  const applyFilters = (newSearch: string, newCategory: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newCategory) params.set('category', newCategory);
    router.push(`/documentos${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(search, category);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    applyFilters(search, newCategory);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (!value) {
      applyFilters('', category);
    }
  };

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-20 z-40 mb-8"
    >
      {/* Glassmorphism Toolbar */}
      <div
        className={`bg-background/80 dark:bg-card/80 backdrop-blur-xl border rounded-2xl p-4 shadow-lg transition-all duration-300 ${
          isFocused
            ? 'border-brand-300 dark:border-brand-700 shadow-brand-100 dark:shadow-none'
            : 'border-border/50'
        }`}
      >
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                  isFocused ? 'text-brand-600 dark:text-brand-400' : 'text-muted-foreground'
                }`}
              />
              <Input
                type="text"
                placeholder="Pesquisar documentos..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="pl-10 pr-10 bg-secondary/50 border-transparent focus:bg-background focus:border-brand-500 focus:ring-brand-500 rounded-xl h-11"
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => {
                      setSearch('');
                      applyFilters('', category);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/30 flex items-center justify-center transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Search Button (Mobile) */}
            <div className="md:hidden">
              <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 gap-2">
                <Search className="h-4 w-4" />
                Pesquisar
              </Button>
            </div>
          </div>
        </form>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {/* All Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryChange('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              !category
                ? 'bg-brand-600 text-white shadow-md scale-105'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:scale-105'
            }`}
          >
            Todos
          </motion.button>

          {/* Category Pills */}
          {categories.map((cat) => {
            const isActive = category === cat.value;
            return (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(isActive ? '' : cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md scale-105'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:scale-105'
                }`}
              >
                {cat.label}
              </motion.button>
            );
          })}

          {/* Result Count */}
          {resultCount !== undefined && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-auto flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Filter className="h-4 w-4" />
              {resultCount} resultado{resultCount !== 1 ? 's' : ''}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
