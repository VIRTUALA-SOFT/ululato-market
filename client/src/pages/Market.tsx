/**
 * ULULATO Marketplace Page
 * Design: Advanced search, category filters, price range, product grid
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useState, useMemo, useEffect } from 'react';
import { useSearch, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Grid3X3, 
  LayoutList, 
  Scale,
  History,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
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
import { products, categories, ProductCategory, formatPrice, getProductById } from '@/lib/mockDb';
import { useRecentlyViewedStore, useCompareStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

// Get min and max prices from products
const allPrices = products.map(p => p.price);
const MIN_PRICE = Math.min(...allPrices);
const MAX_PRICE = Math.max(...allPrices);

// Compare Floating Panel Component
function ComparePanel() {
  const { compareIds, removeFromCompare, clearCompare, openComparePanel, isOpen, closeComparePanel } = useCompareStore();
  
  const compareProducts = compareIds.map(id => getProductById(id)).filter(Boolean);
  
  if (compareIds.length === 0) return null;
  
  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        onClick={openComparePanel}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
      >
        <Scale className="w-5 h-5" />
        <span className="font-medium">Comparar ({compareIds.length})</span>
      </motion.button>

      {/* Compare Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-end md:items-center justify-center p-4"
            onClick={closeComparePanel}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="w-full max-w-5xl max-h-[80vh] overflow-auto rounded-2xl glass-card border border-white/10 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold">Comparar Productos</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={clearCompare}>
                    Limpiar
                  </Button>
                  <Button variant="ghost" size="icon" onClick={closeComparePanel}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {compareProducts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr>
                        <th className="text-left p-3 border-b border-white/10 w-32">Característica</th>
                        {compareProducts.map((product) => (
                          <th key={product!.id} className="p-3 border-b border-white/10">
                            <div className="relative">
                              <button
                                onClick={() => removeFromCompare(product!.id)}
                                className="absolute -top-1 -right-1 p-1 rounded-full bg-destructive/80 hover:bg-destructive transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              <img
                                src={product!.images[0]}
                                alt={product!.title}
                                className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                              />
                              <Link href={`/product/${product!.slug}`}>
                                <p className="font-medium text-sm hover:text-primary transition-colors line-clamp-2">
                                  {product!.title}
                                </p>
                              </Link>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-b border-white/10 text-muted-foreground">Precio</td>
                        {compareProducts.map((product) => (
                          <td key={product!.id} className="p-3 border-b border-white/10 text-center">
                            <span className="font-bold text-primary">{formatPrice(product!.price)}</span>
                            {product!.compareAtPrice && (
                              <span className="block text-sm text-muted-foreground line-through">
                                {formatPrice(product!.compareAtPrice)}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-white/10 text-muted-foreground">Categoría</td>
                        {compareProducts.map((product) => (
                          <td key={product!.id} className="p-3 border-b border-white/10 text-center">
                            {product!.category}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-white/10 text-muted-foreground">Calificación</td>
                        {compareProducts.map((product) => (
                          <td key={product!.id} className="p-3 border-b border-white/10 text-center">
                            <span className="text-primary">★</span> {product!.rating} ({product!.reviewCount})
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-white/10 text-muted-foreground">Vendidos</td>
                        {compareProducts.map((product) => (
                          <td key={product!.id} className="p-3 border-b border-white/10 text-center">
                            {product!.sold}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-white/10 text-muted-foreground">Vendedor</td>
                        {compareProducts.map((product) => (
                          <td key={product!.id} className="p-3 border-b border-white/10 text-center">
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                              {product!.storeLevel}
                            </span>
                            <p className="text-sm mt-1">{product!.storeName}</p>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">Stock</td>
                        {compareProducts.map((product) => (
                          <td key={product!.id} className="p-3 text-center">
                            <span className={product!.stock > 5 ? 'text-green-500' : 'text-orange-500'}>
                              {product!.stock} disponibles
                            </span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No hay productos para comparar
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Recently Viewed Section Component
function RecentlyViewedSection() {
  const { viewedIds } = useRecentlyViewedStore();
  
  const recentProducts = viewedIds
    .map(id => getProductById(id))
    .filter(Boolean)
    .slice(0, 6);
  
  if (recentProducts.length === 0) return null;
  
  return (
    <section className="py-8 border-t border-white/10">
      <div className="container">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-5 h-5 text-primary" />
          <h2 className="font-display text-xl font-bold">Vistos Recientemente</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentProducts.map((product) => (
            <Link key={product!.id} href={`/product/${product!.slug}`}>
              <div className="group relative rounded-xl overflow-hidden glass-card border border-white/10 hover:border-primary/30 transition-all">
                <div className="aspect-square">
                  <img
                    src={product!.images[0]}
                    alt={product!.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    {product!.title}
                  </p>
                  <p className="text-sm text-primary font-bold">
                    {formatPrice(product!.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Market() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialCategory = params.get('category') as ProductCategory | null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  
  const { addToCompare, isInCompare, canAddMore } = useCompareStore();

  // Update category from URL params
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

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

    // Price range filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

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
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSortBy('featured');
    setPriceRange([MIN_PRICE, MAX_PRICE]);
  };

  const hasActiveFilters = searchQuery || selectedCategory || sortBy !== 'featured' || 
    priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE;

  const handleAddToCompare = (productId: string) => {
    if (isInCompare(productId)) {
      toast.info('Este producto ya está en la comparación');
      return;
    }
    if (!canAddMore()) {
      toast.error('Máximo 4 productos para comparar');
      return;
    }
    addToCompare(productId);
    toast.success('Producto agregado a comparación');
  };

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
              showFilters ? 'max-h-[500px] mt-4' : 'max-h-0'
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

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Rango de precio: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  step={5000}
                  className="mt-4"
                />
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

      {/* Category Pills + Price Filter */}
      <section className="py-6">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 flex-1">
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

            {/* Desktop Price Range */}
            <div className="hidden lg:flex items-center gap-4 min-w-[350px]">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Precio:</span>
              <div className="flex-1">
                <Slider
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  step={5000}
                />
              </div>
              <span className="text-sm font-medium whitespace-nowrap min-w-[180px] text-right">
                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </span>
            </div>
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
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onCompare={() => handleAddToCompare(product.id)}
                  showCompare
                />
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

      {/* Recently Viewed Section */}
      <RecentlyViewedSection />

      {/* Compare Panel */}
      <ComparePanel />

      <Footer />
    </div>
  );
}
