/**
 * ULULATO Marketplace Page
 * Design: Advanced search, category filters, product grid
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useState, useMemo } from 'react';
import { useSearch } from 'wouter';
import { Search, SlidersHorizontal, X, Grid3X3, LayoutList, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories, ProductCategory } from '@/lib/mockDb';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export default function Market() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialCategory = params.get('category') as ProductCategory | null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSortBy('featured');
  };

  const hasActiveFilters = searchQuery || selectedCategory || sortBy !== 'featured';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Marketplace <span className="text-primary">Ancestral</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Descubre productos únicos creados por artesanos colombianos. 
              Cada compra apoya comunidades y preserva tradiciones.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters Bar */}
      <section className="sticky top-16 md:top-20 z-40 py-4 backdrop-blur-xl bg-background/80 border-b border-white/10">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos, artesanos, categorías..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 bg-white/5 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="md:hidden border-white/10 hover:bg-white/10"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtros
                {hasActiveFilters && (
                  <span className="ml-2 w-2 h-2 rounded-full bg-primary" />
                )}
              </Button>

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-3">
                {/* Category Select */}
                <Select
                  value={selectedCategory || 'all'}
                  onValueChange={(v) => setSelectedCategory(v === 'all' ? null : v as ProductCategory)}
                >
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort Select */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destacados</SelectItem>
                    <SelectItem value="newest">Más recientes</SelectItem>
                    <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                    <SelectItem value="rating">Mejor valorados</SelectItem>
                  </SelectContent>
                </Select>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Limpiar
                  </Button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-8 w-8',
                    viewMode === 'grid' && 'bg-primary/20 text-primary'
                  )}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-8 w-8',
                    viewMode === 'list' && 'bg-primary/20 text-primary'
                  )}
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          <div
            className={cn(
              'md:hidden overflow-hidden transition-all duration-300',
              showFilters ? 'max-h-96 mt-4' : 'max-h-0'
            )}
          >
            <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
              {/* Category Select */}
              <div>
                <label className="text-sm font-medium mb-2 block">Categoría</label>
                <Select
                  value={selectedCategory || 'all'}
                  onValueChange={(v) => setSelectedCategory(v === 'all' ? null : v as ProductCategory)}
                >
                  <SelectTrigger className="w-full bg-white/5 border-white/10">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Select */}
              <div>
                <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-full bg-white/5 border-white/10">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destacados</SelectItem>
                    <SelectItem value="newest">Más recientes</SelectItem>
                    <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                    <SelectItem value="rating">Mejor valorados</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="w-full border-white/10"
                  onClick={clearFilters}
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-6 overflow-x-auto">
        <div className="container">
          <div className="flex items-center gap-3 pb-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'rounded-full whitespace-nowrap',
                selectedCategory === null
                  ? 'bg-primary text-primary-foreground'
                  : 'border-white/10 hover:bg-white/10'
              )}
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  'rounded-full whitespace-nowrap',
                  selectedCategory === cat.name
                    ? 'bg-primary text-primary-foreground'
                    : 'border-white/10 hover:bg-white/10'
                )}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.icon} {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
            </p>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div
              className={cn(
                'grid gap-6',
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              )}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                No encontramos productos
              </h3>
              <p className="text-muted-foreground mb-6">
                Intenta con otros términos de búsqueda o filtros
              </p>
              <Button onClick={clearFilters} className="btn-brand">
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
