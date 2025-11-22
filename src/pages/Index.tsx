import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import CatalogTab from '@/components/CatalogTab';
import OrdersTab from '@/components/OrdersTab';
import ProfileTab from '@/components/ProfileTab';

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        setActiveTab={setActiveTab}
      />

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

          <TabsContent value="catalog">
            <CatalogTab
              filteredProducts={filteredProducts}
              reviews={reviews}
              addToCart={addToCart}
            />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab orders={orders} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab products={products} />
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
