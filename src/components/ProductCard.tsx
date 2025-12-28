import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addProductItem } = useCart();

  const handleAddToCart = () => {
    addProductItem(product);
  };

  return (
    <motion.div
      className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-secondary/50 transition-all duration-300"
      whileHover={{ y: -4, boxShadow: '0 10px 30px -10px hsl(var(--secondary) / 0.3)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Product Image */}
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            📦
          </div>
        )}

        {/* Category Badge */}
        <Badge className="absolute top-2 left-2 bg-secondary/90 text-secondary-foreground text-xs">
          {product.category}
        </Badge>

        {/* Availability Badge */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}

        {/* Quick Add Button (appears on hover) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          <Button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-2 mb-1 text-foreground">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
          {product.description}
        </p>
        <p className="text-primary font-bold">Rs {product.price}</p>
      </div>
    </motion.div>
  );
}
