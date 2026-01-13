/**
 * ULULATO Seller Studio Page
 * Design: Dashboard with charts and product creation wizard
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useState, useCallback } from 'react';
import { Link } from 'wouter';
import {
  BarChart3,
  Package,
  DollarSign,
  Eye,
  TrendingUp,
  Plus,
  Upload,
  X,
  Check,
  Image as ImageIcon,
  Box,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import { products, categories, formatPrice, ProductCategory } from '@/lib/mockDb';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Mock analytics data
const salesData = [
  { month: 'Ene', ventas: 12, vistas: 450 },
  { month: 'Feb', ventas: 19, vistas: 680 },
  { month: 'Mar', ventas: 15, vistas: 520 },
  { month: 'Abr', ventas: 25, vistas: 890 },
  { month: 'May', ventas: 32, vistas: 1200 },
  { month: 'Jun', ventas: 28, vistas: 980 },
];

// Stats Cards
function StatsCard({
  icon: Icon,
  title,
  value,
  change,
  changeType,
}: {
  icon: typeof Package;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}) {
  return (
    <div className="p-6 rounded-2xl glass-card border border-white/10">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <span
          className={cn(
            'text-sm font-medium px-2 py-1 rounded-full',
            changeType === 'positive' && 'bg-green-500/10 text-green-500',
            changeType === 'negative' && 'bg-red-500/10 text-red-500',
            changeType === 'neutral' && 'bg-white/10 text-muted-foreground'
          )}
        >
          {change}
        </span>
      </div>
      <p className="text-muted-foreground text-sm mb-1">{title}</p>
      <p className="font-display text-2xl font-bold">{value}</p>
    </div>
  );
}

// Product Creation Wizard
function CreateProductWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '' as ProductCategory | '',
    images: [] as string[],
  });

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate image upload
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  }, []);

  const handleGenerate3D = async () => {
    if (formData.images.length === 0) {
      toast.error('Sube al menos una imagen primero');
      return;
    }

    setIsGenerating(true);
    // Simulate 3D generation
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsGenerating(false);
    setStep(3);
    toast.success('¡Vista 3D generada exitosamente!');
  };

  const handleSubmit = () => {
    toast.success('¡Producto creado exitosamente!', {
      description: 'Tu producto está ahora visible en el marketplace.',
    });
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all',
                step >= s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/10 text-muted-foreground'
              )}
            >
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={cn(
                  'w-16 h-0.5 mx-2',
                  step > s ? 'bg-primary' : 'bg-white/10'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título del producto</Label>
            <Input
              id="title"
              placeholder="Ej: Mochila Wayuu Tradicional"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio (COP)</Label>
              <Input
                id="price"
                type="number"
                placeholder="150000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select
                value={formData.category}
                onValueChange={(v) => setFormData({ ...formData, category: v as ProductCategory })}
              >
                <SelectTrigger className="h-12 bg-white/5 border-white/10">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe tu producto, materiales, técnicas de elaboración..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[120px] bg-white/5 border-white/10 focus:border-primary/50"
            />
          </div>

          <Button
            className="w-full btn-brand"
            onClick={() => setStep(2)}
            disabled={!formData.title || !formData.price || !formData.category}
          >
            Continuar
          </Button>
        </div>
      )}

      {/* Step 2: Images & 3D Generation */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Imágenes del producto</Label>
            <div
              className={cn(
                'border-2 border-dashed border-white/20 rounded-xl p-8 text-center transition-colors',
                'hover:border-primary/50 cursor-pointer'
              )}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-1">Arrastra imágenes o haz clic para subir</p>
                <p className="text-sm text-muted-foreground">PNG, JPG hasta 10MB</p>
              </label>
            </div>
          </div>

          {/* Uploaded Images */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {formData.images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        images: formData.images.filter((_, i) => i !== index),
                      })
                    }
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center hover:bg-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Generate 3D Button */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-semibold mb-1">Generar Vista 3D</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Crea un "Gemelo Digital" de tu producto para que los compradores puedan verlo en 3D
                </p>
                <Button
                  onClick={handleGenerate3D}
                  disabled={formData.images.length === 0 || isGenerating}
                  className="btn-brand"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <Loader size="sm" />
                      Generando...
                    </span>
                  ) : (
                    <>
                      <Box className="w-4 h-4 mr-2" />
                      Generar 3D
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isGenerating && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                {/* Spinning feathers animation */}
                <div className="absolute inset-0 animate-spin">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M50 10 Q60 30 50 50 Q40 30 50 10"
                      fill="none"
                      stroke="#FFD100"
                      strokeWidth="2"
                    />
                    <path
                      d="M90 50 Q70 60 50 50 Q70 40 90 50"
                      fill="none"
                      stroke="#101C38"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-muted-foreground">Generando vista 3D de tu producto...</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 border-white/10"
              onClick={() => setStep(1)}
            >
              Volver
            </Button>
            <Button
              className="flex-1 btn-brand"
              onClick={() => setStep(3)}
              disabled={formData.images.length === 0}
            >
              Continuar sin 3D
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Preview & Publish */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl glass-card border border-white/10">
            <h4 className="font-display font-semibold mb-4">Vista previa del producto</h4>
            
            <div className="flex gap-6">
              {/* Product Image */}
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-secondary/50 flex-shrink-0">
                {formData.images[0] ? (
                  <img
                    src={formData.images[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-display font-bold text-lg mb-1">{formData.title}</h3>
                <p className="text-primary font-semibold text-xl mb-2">
                  {formatPrice(Number(formData.price))}
                </p>
                <span className="inline-block px-2 py-1 rounded-full bg-white/10 text-xs">
                  {formData.category}
                </span>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                  {formData.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 border-white/10"
              onClick={() => setStep(2)}
            >
              Volver
            </Button>
            <Button className="flex-1 btn-brand" onClick={handleSubmit}>
              <Check className="w-4 h-4 mr-2" />
              Publicar Producto
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Seller Studio Page
export default function SellerStudio() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Get seller's products (mock)
  const sellerProducts = products.filter((p) => p.storeId === 'store-1');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container pt-24 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Seller Studio</h1>
            <p className="text-muted-foreground">
              Gestiona tus productos y analiza tu rendimiento
            </p>
          </div>

          <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
            <DialogTrigger asChild>
              <Button className="btn-brand">
                <Plus className="w-5 h-5 mr-2" />
                Crear Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl glass-card border-white/10">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  Crear Nuevo Producto
                </DialogTitle>
              </DialogHeader>
              <CreateProductWizard onClose={() => setIsWizardOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={DollarSign}
            title="Ventas Totales"
            value={formatPrice(4850000)}
            change="+12%"
            changeType="positive"
          />
          <StatsCard
            icon={Package}
            title="Productos Activos"
            value="24"
            change="+3"
            changeType="positive"
          />
          <StatsCard
            icon={Eye}
            title="Vistas del Mes"
            value="3,420"
            change="+8%"
            changeType="positive"
          />
          <StatsCard
            icon={TrendingUp}
            title="Tasa de Conversión"
            value="4.2%"
            change="-0.3%"
            changeType="negative"
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="p-6 rounded-2xl glass-card border border-white/10">
            <h3 className="font-display font-semibold text-lg mb-6">
              Ventas vs Vistas
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(5,5,5,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ventas"
                    stroke="#FFD100"
                    strokeWidth={2}
                    dot={{ fill: '#FFD100' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="vistas"
                    stroke="#101C38"
                    strokeWidth={2}
                    dot={{ fill: '#101C38' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Sales Bar Chart */}
          <div className="p-6 rounded-2xl glass-card border border-white/10">
            <h3 className="font-display font-semibold text-lg mb-6">
              Ventas Mensuales
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(5,5,5,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="ventas" fill="#FFD100" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="p-6 rounded-2xl glass-card border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold text-lg">Mis Productos</h3>
            <Link href="/market">
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                Ver todos
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Producto
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Precio
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Stock
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Vendidos
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary/50">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium line-clamp-1">{product.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-primary font-medium">
                      {formatPrice(product.price)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={cn(
                          product.stock <= 5 ? 'text-destructive' : 'text-foreground'
                        )}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4">{product.sold}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                        Activo
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
