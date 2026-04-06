'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FilterOption {
  value: string;
  label: string;
  color?: string;
}

interface GlassmorphismFiltersProps {
  searchPlaceholder?: string;
  categories: FilterOption[];
  activeCategory: string;
  activeSearch: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  onSearchSubmit: () => void;
  resultCount?: number;
}

export function GlassmorphismFilters({
  searchPlaceholder = 'Pesquisar...',
  categories,
  activeCategory,
  activeSearch,
  onCategoryChange,
  onSearchChange,
  onSearchSubmit,
  resultCount,
}: GlassmorphismFiltersProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeFiltersCount = categories.filter((c) => c.value === activeCategory).length;

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
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                isFocused ? 'text-brand-600 dark:text-brand-400' : 'text-muted-foreground'
              }`}
            />
            <Input
              ref={inputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={activeSearch}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onSearchSubmit();
                }
              }}
              className="pl-10 pr-10 bg-secondary/50 border-transparent focus:bg-background focus:border-brand-500 focus:ring-brand-500 rounded-xl h-11"
            />
            <AnimatePresence>
              {activeSearch && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => {
                    onSearchChange('');
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/30 flex items-center justify-center transition-colors"
                >
                  <X className="h-3 w-3" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <div className="md:hidden">
            <Button
              variant="outline"
              className="gap-2 rounded-xl"
              onClick={() => {
                const el = document.getElementById('filter-pills');
                el?.classList.toggle('hidden');
              }}
            >
              <Filter className="h-4 w-4" />
              Filtros
              {activeCategory && activeCategory !== 'all' && (
                <span className="h-5 w-5 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center">
                  1
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Category Pills */}
        <div
          id="filter-pills"
          className="flex flex-wrap gap-2 mt-4 hidden md:flex"
        >
          {/* All/None Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              !activeCategory
                ? 'bg-brand-600 text-white shadow-md scale-105'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:scale-105'
            }`}
          >
            Todas
          </motion.button>

          {/* Category Pills */}
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryChange(isActive ? '' : cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-md scale-105'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:scale-105'
                }`}
                style={
                  isActive && cat.color
                    ? { backgroundColor: cat.color, boxShadow: `0 4px 12px ${cat.color}40` }
                    : isActive
                    ? { backgroundColor: 'var(--brand-600)', boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)' }
                    : {}
                }
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
