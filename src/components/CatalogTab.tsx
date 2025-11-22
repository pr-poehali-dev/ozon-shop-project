import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
}

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  productId: number;
}

interface CatalogTabProps {
  filteredProducts: Product[];
  reviews: Review[];
  addToCart: (product: Product) => void;
}

const CatalogTab = ({ filteredProducts, reviews, addToCart }: CatalogTabProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Icon
            key={star}
            name="Star"
            size={14}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Icon name="Sparkles" size={32} className="text-primary" />
          Популярные товары
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in cursor-pointer"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.discount && (
                    <Badge className="absolute top-3 left-3 bg-secondary text-white">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
                  
                  <div className="flex items-center gap-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.oldPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full group-hover:scale-105 transition-transform"
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Icon name="MessageSquare" size={32} className="text-accent" />
          Отзывы покупателей
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map(review => (
            <Card key={review.id} className="animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {review.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{review.author}</h4>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    {renderStars(review.rating)}
                    <p className="text-muted-foreground">{review.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogTab;
