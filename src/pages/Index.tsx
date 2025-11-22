import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'shipping' | 'processing';
  items: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Смартфон Galaxy Pro Max',
    price: 89990,
    oldPrice: 109990,
    image: 'https://cdn.poehali.dev/projects/3e057dd8-f1c2-4c87-898c-dc8640a0ab13/files/4b426b80-3432-4afb-bc36-f937ae4f9f9c.jpg',
    rating: 4.8,
    reviews: 342,
    discount: 18
  },
  {
    id: 2,
    name: 'Беспроводные наушники AirSound',
    price: 12990,
    oldPrice: 15990,
    image: 'https://cdn.poehali.dev/projects/3e057dd8-f1c2-4c87-898c-dc8640a0ab13/files/25c59709-8669-4037-9ae4-4ee4466e82e2.jpg',
    rating: 4.6,
    reviews: 189,
    discount: 19
  },
  {
    id: 3,
    name: 'Умные часы SmartTime X5',
    price: 24990,
    image: 'https://cdn.poehali.dev/projects/3e057dd8-f1c2-4c87-898c-dc8640a0ab13/files/c082b1f0-8e14-448b-a662-1253d4551d37.jpg',
    rating: 4.7,
    reviews: 276
  },
  {
    id: 4,
    name: 'Планшет Tab Ultra 11"',
    price: 45990,
    oldPrice: 54990,
    image: 'https://cdn.poehali.dev/projects/3e057dd8-f1c2-4c87-898c-dc8640a0ab13/files/4b426b80-3432-4afb-bc36-f937ae4f9f9c.jpg',
    rating: 4.5,
    reviews: 156,
    discount: 16
  },
  {
    id: 5,
    name: 'Портативная колонка SoundWave',
    price: 8990,
    image: 'https://cdn.poehali.dev/projects/3e057dd8-f1c2-4c87-898c-dc8640a0ab13/files/25c59709-8669-4037-9ae4-4ee4466e82e2.jpg',
    rating: 4.4,
    reviews: 234
  },
  {
    id: 6,
    name: 'Фитнес-браслет HealthBand Pro',
    price: 6990,
    oldPrice: 8990,
    image: 'https://cdn.poehali.dev/projects/3e057dd8-f1c2-4c87-898c-dc8640a0ab13/files/c082b1f0-8e14-448b-a662-1253d4551d37.jpg',
    rating: 4.3,
    reviews: 412,
    discount: 22
  }
];

const reviews: Review[] = [
  {
    id: 1,
    author: 'Александр К.',
    avatar: 'AK',
    rating: 5,
    date: '15 ноября 2024',
    text: 'Отличный смартфон! Быстрая доставка, качество на высоте. Камера просто огонь!',
    productId: 1
  },
  {
    id: 2,
    author: 'Мария С.',
    avatar: 'МС',
    rating: 4,
    date: '12 ноября 2024',
    text: 'Наушники супер, звук чистый. Немного не хватает басов, но за эту цену отлично!',
    productId: 2
  },
  {
    id: 3,
    author: 'Дмитрий П.',
    avatar: 'ДП',
    rating: 5,
    date: '10 ноября 2024',
    text: 'Часы превзошли ожидания. Батарея держит 5 дней, экран яркий, функций море!',
    productId: 3
  },
  {
    id: 4,
    author: 'Елена В.',
    avatar: 'ЕВ',
    rating: 5,
    date: '8 ноября 2024',
    text: 'Покупала в подарок, очень довольны! Упаковка красивая, товар соответствует описанию.',
    productId: 1
  }
];

const orders: Order[] = [
  {
    id: '№ 1234567890',
    date: '15 ноября 2024',
    total: 89990,
    status: 'delivered',
    items: 1
  },
  {
    id: '№ 1234567891',
    date: '10 ноября 2024',
    total: 37980,
    status: 'shipping',
    items: 2
  },
  {
    id: '№ 1234567892',
    date: '5 ноября 2024',
    total: 12990,
    status: 'delivered',
    items: 1
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      delivered: { label: 'Доставлен', variant: 'default' as const },
      shipping: { label: 'В пути', variant: 'secondary' as const },
      processing: { label: 'Обработка', variant: 'outline' as const }
    };
    return variants[status];
  };

  return (
    <div className="min-h-screen bg-background">
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

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <Icon name="LayoutGrid" size={18} />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Icon name="Package" size={18} />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Icon name="User" size={18} />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-8">
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
          </TabsContent>

          <TabsContent value="orders">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Package" size={32} className="text-primary" />
                Мои заказы
              </h2>
              <div className="space-y-4">
                {orders.map(order => (
                  <Card key={order.id} className="animate-fade-in hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold">{order.id}</h3>
                            <Badge {...getStatusBadge(order.status)}>
                              {getStatusBadge(order.status).label}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            {order.date} • {order.items} {order.items === 1 ? 'товар' : 'товара'}
                          </p>
                          <p className="text-2xl font-bold text-primary">
                            {order.total.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                        <Button variant="outline">
                          Подробнее
                          <Icon name="ChevronRight" size={18} className="ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="max-w-2xl mx-auto">
              <Card className="animate-fade-in">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                        ИП
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-1">Иван Петров</h2>
                        <p className="text-muted-foreground">ivan.petrov@example.com</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Icon name="Phone" size={20} />
                          <span>+7 (999) 123-45-67</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Icon name="MapPin" size={20} />
                          <span>Москва, ул. Примерная, д. 123</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Icon name="CreditCard" size={20} />
                          <span>Бонусов: 1,250 баллов</span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button>
                          <Icon name="Settings" size={18} className="mr-2" />
                          Настройки
                        </Button>
                        <Button variant="outline">
                          <Icon name="LogOut" size={18} className="mr-2" />
                          Выйти
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6 animate-fade-in">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Heart" size={24} className="text-red-500" />
                    Избранное
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {products.slice(0, 4).map(product => (
                      <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors cursor-pointer">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{product.name}</p>
                          <p className="text-primary font-bold">{product.price.toLocaleString('ru-RU')} ₽</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Store" size={24} className="text-primary" />
                OZON
              </h3>
              <p className="text-muted-foreground text-sm">
                Крупнейший маркетплейс России. Миллионы товаров с быстрой доставкой.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Как сделать заказ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Способы оплаты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Сервисы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Ozon Premium</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ozon Travel</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ozon Карта</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  8 800 234 56 78
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  support@ozon.ru
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            © 2024 OZON. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
