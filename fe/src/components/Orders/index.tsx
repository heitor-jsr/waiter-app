import { useEffect, useState } from 'react';

import socketIo from 'socket.io-client';

import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';


export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  // o socket só vai receber as mensagens que forem sendo enviadas, e não todo o histórico de pedidos. com isso, o useEffect exclusivo permite que o novo pedido, ao entrar na page, não a atualize. por isso que é feito em useEffect separado.

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket']
    });

    socket.on('orders@new', (order) => {
      setOrders(prevState => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    api.get('/orders')
      .then(({ data }) => {
        setOrders(data);
      });
  }, []);

  function handleCancelOrder(orderId: string) {
    setOrders((prevstate) => prevstate.filter((order) => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId ? { ...order, status } : order
    )));
  }

  const waiting = orders.filter(({ status }) => status === 'WAITING');
  const inProduction = orders.filter(({ status }) => status === 'IN_PRODUCTION');
  const done = orders.filter(({ status }) => status === 'DONE');

  return (
    <Container>
      <OrdersBoard
        icon="⏲"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="🍽️"
        title="Pronto"
        orders={done}
        onChangeOrderStatus={handleOrderStatusChange}
        onCancelOrder={handleCancelOrder}
      />

    </Container>
  );
}
