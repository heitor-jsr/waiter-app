import { useState } from 'react';
import { FlatList } from 'react-native';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formtaCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import { Products, ProductImage, ProductDetails, Separator, PlusMinusButton } from './styles';

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <FlatList
        data={products}
        style={{marginTop: 32}}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={product => product._id}
        renderItem={({ item: product}) => (
          <Products onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.68.112:3001/uploads/${product.imagePath}`,
              }}
            />
            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }}>{product.description}</Text>
              <Text size={14} weight="600">{formatCurrency(product.price)}</Text>
            </ProductDetails>
            <PlusMinusButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </PlusMinusButton>
          </Products>
        )}
      />
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
