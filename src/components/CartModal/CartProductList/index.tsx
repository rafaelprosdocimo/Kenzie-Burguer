import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext';
import { useContext } from 'react';
const CartProductList = () => {
  
  const { cart , cartTotal, cleanCart} = useContext(CartContext);
  
  return(
  <StyledCartProductList>
    <ul>
      {cart.map((item) => {
        return(

          <CartProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            category={item.category}
            price={item.price}
            img={item.img}
          />
          )}
      )}
      
    </ul>

    <div className='totalBox'>
      <StyledParagraph>
        <strong>Total</strong>
      </StyledParagraph>
      <StyledParagraph className='total'>{cartTotal.toFixed(2)}</StyledParagraph>
    </div>
    <StyledButton onClick={()=>{cleanCart()}} $buttonSize='default' $buttonStyle='gray'>
      Remover todos
    </StyledButton>
  </StyledCartProductList>
)};

export default CartProductList;
