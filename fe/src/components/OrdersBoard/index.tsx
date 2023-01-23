import { useState } from 'react';
import { toast } from 'react-toastify';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }


  async function handleChangeOrderStatus() {
    if (!selectedOrder) return;
    setIsLoading(true);

    const status = selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`, { status });

    onChangeOrderStatus(selectedOrder?._id, status);
    toast.success(`O pedido da mesa ${selectedOrder?.table} teve seu status alterado com sucesso`);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    if (!selectedOrder) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    await api.delete(`/orders/${selectedOrder?._id}`);
    onCancelOrder(selectedOrder?._id);
    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado com sucesso`);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal
        onCancelOrder={handleCancelOrder}
        order={selectedOrder}
        visible={isModalVisible}
        onClose={handleModal}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      {orders.length && (
        <OrdersContainer>
          {orders.map((order) =>
            <button key={order._id} type="button" onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          )}
        </OrdersContainer>
      )}
    </Board>
  );
}
