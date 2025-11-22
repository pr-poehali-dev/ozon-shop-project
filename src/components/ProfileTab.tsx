import { Button } from '@/components/ui/button';
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

interface ProfileTabProps {
  products: Product[];
}

const ProfileTab = ({ products }: ProfileTabProps) => {
  return (
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
  );
};

export default ProfileTab;
