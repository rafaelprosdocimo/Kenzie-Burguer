import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { Iitem } from '../../../providers/CartContext';
import { CartContext } from '../../../providers/CartContext';
import { useContext } from 'react';
const ProductCard = ({id, name, category, price, img}: Iitem) => {

  const { addToCart } = useContext(CartContext);

  return(
  <StyledProductCard>
    <div className='imageBox'>
      <img src={img} alt={name} />
    </div>
    <div className='content'>
      <StyledTitle tag='h3' $fontSize='three'>
        {name}
      </StyledTitle>
      <StyledParagraph className='category'>{category}</StyledParagraph>
      <StyledParagraph className='price'>{price}</StyledParagraph>
      <StyledButton $buttonSize='medium' $buttonStyle='green' 
      onClick={() => {addToCart(id)}}
      >
        Adicionar
      </StyledButton>
    </div>
  </StyledProductCard>
)};

export default ProductCard;
