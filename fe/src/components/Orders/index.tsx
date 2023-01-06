import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

const orders: Order[] = [
  {
    _id: '6372e48cbcd195b0d3d0f7f3',
    table: '123',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Pizza quatro queijos',
          imagePath: '1672958618422-quatro-queijos.png',
          price: 40,
        },
        quantity: 3,
        _id: '6372e48cbcd195b0d3d0f7f4'
      },
      {
        product: {
          name: 'Coca cola',
          imagePath: '1672959279825-coca-cola.png',
          price: 7,
        },
        quantity: 2,
        _id: '6372e48cbcd195b0d3d0f7f5'
      }
    ],
  }
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon="⏲"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={[]}
      />
      <OrdersBoard
        icon="🍽️"
        title="Pronto"
        orders={[]}
      />

    </Container>
  );
}
