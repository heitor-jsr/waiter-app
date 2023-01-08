import { StatusBar } from 'expo-status-bar';
import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkButton } from './styles';

interface OrderConfirmedProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmed({ visible, onOk }: OrderConfirmedProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
    >
      <StatusBar style='light'/>

      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text opacity={0.9} color="#fff" style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção
        </Text>
        <OkButton onPress={onOk}>
          <Text color="#D73035" weight="600">OK</Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
