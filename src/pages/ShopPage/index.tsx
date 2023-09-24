import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { CartContext } from '../../providers/CartContext';
import { useContext } from 'react';
import { StyledContainer } from '../../styles/grid';

const ShopPage = () => {
  
  const { modalBool } = useContext(CartContext);

  

  return(
  <StyledShopPage>
    {modalBool === true ? <CartModal /> : null}
    <Header />
    <main>
      <StyledContainer containerWidth={1300}>
        <ProductList />
      </StyledContainer>
    </main>
  </StyledShopPage>
)};

export default ShopPage;
