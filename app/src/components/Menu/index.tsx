import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formtaCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { Product, ProductImage, ProductDetails, Separator, PlusMinusButton } from './styles';
export function Menu() {
  return (
    <FlatList
      data={products}
      style={{marginTop: 32}}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ItemSeparatorComponent={Separator}
      keyExtractor={product => product._id}
      renderItem={({ item: product}) => (
        <Product>
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
          <PlusMinusButton>
            <PlusCircle />
          </PlusMinusButton>
        </Product>
      )}
    />
  );
}