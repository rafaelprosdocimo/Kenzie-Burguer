import { MdDelete } from 'react-icons/md';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { Iitem } from '../../../../providers/CartContext';
import { CartContext } from '../../../../providers/CartContext';
import { useContext } from 'react';

const CartProductCard = ({id, name, category, price, img}: Iitem) => {

  const { removeFromCart } = useContext(CartContext);
  
  return(
  <StyledCartProductCard>
    <div className='imageBox'>
      <img src={img} alt={name} />
    </div>
    <div className='contentBox'>
      <StyledTitle tag='h3' $fontSize='three'>
        {name}
      </StyledTitle>
      <button type='button' aria-label='Remover' onClick={()=>{removeFromCart(id)}}>
        <MdDelete size={24} />
      </button>
    </div>
  </StyledCartProductCard>
)};

export default CartProductCard;
