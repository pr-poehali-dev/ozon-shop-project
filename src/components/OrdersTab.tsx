import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'shipping' | 'processing';
  items: number;
}

interface OrdersTabProps {
  orders: Order[];
}

const OrdersTab = ({ orders }: OrdersTabProps) => {
  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      delivered: { label: 'Доставлен', variant: 'default' as const },
      shipping: { label: 'В пути', variant: 'secondary' as const },
      processing: { label: 'Обработка', variant: 'outline' as const }
    };
    return variants[status];
  };

  return (
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
  );
};

export default OrdersTab;
