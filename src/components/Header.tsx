import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

interface CartItem extends Product {
  quantity: number;
}

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  setActiveTab: (tab: string) => void;
}

const Header = ({ searchQuery, setSearchQuery, cart, updateQuantity, removeFromCart, setActiveTab }: HeaderProps) => {
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Store" size={32} className="text-secondary" />
            <h1 className="text-2xl font-bold">OZON</h1>
          </div>
          
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                placeholder="Искать товары..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10"
              />
              <Icon name="Search" size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-white/10">
                  <Icon name="ShoppingCart" size={24} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Icon name="ShoppingCart" size={24} />
                    Корзина
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="ShoppingBag" size={64} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {cart.map(item => (
                          <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm mb-2">{item.name}</h4>
                                  <p className="text-lg font-bold text-primary">{item.price.toLocaleString('ru-RU')} ₽</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7 ml-auto"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Icon name="Trash2" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="border-t pt-4 space-y-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span className="text-primary">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/10"
              onClick={() => setActiveTab('profile')}
            >
              <Icon name="User" size={24} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
