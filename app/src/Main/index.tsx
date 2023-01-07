import { Container, CategoriesContainer, MenuContainer, FooterConteiner, Footer } from './styles';
import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { useState } from 'react';

export function Main() {
  const [isTableModaVisible, setIsTableModalVisble] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');


  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }


  return (
    <>
      <Container>
        <Header/>
        <CategoriesContainer>
          <Categories/>
        </CategoriesContainer>
        <MenuContainer>
          <Menu/>
        </MenuContainer>
      </Container>
      <Footer>
        <FooterConteiner>
          <Button onPress={() => setIsTableModalVisble(true)}>Novo Pedido</Button>
        </FooterConteiner>
      </Footer>
      <TableModal
        onClose={() => setIsTableModalVisble(false)}
        visible={isTableModaVisible}
        onSave={handleSaveTable}
      />
    </>
  );
}
