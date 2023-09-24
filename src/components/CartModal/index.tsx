import { MdClose } from 'react-icons/md';
import CartProductList from './CartProductList';
import { StyledCartModalBox } from './style';
import { StyledParagraph, StyledTitle } from '../../styles/typography';
import { CartContext } from '../../providers/CartContext';
import { useContext } from 'react';


const CartModal = () => {
  
  const { closeModal, cart } = useContext(CartContext);

  return(
  <StyledCartModalBox>
    <dialog>
      <header>
        <StyledTitle tag='h2' $fontSize='three'>
          Carrinho de compras
        </StyledTitle>
        <button
          type='button'
          aria-label='Fechar'
          onClick={() => {
            closeModal();
          }}
        >
          <MdClose size={21} />
        </button>
      </header>
      <div className='cartBox'>
        <CartProductList />

        <div className='emptyBox'>
          <StyledTitle tag='h3' $fontSize='three' textAlign='center'>
          {cart.length === 0 ? ("Sua sacola está vazia") : ("Sua sacola tem itens")}
          </StyledTitle>
          <StyledParagraph textAlign='center'>          {cart.length === 0 ? ("Adicione Itens") : ("Adicione Mais Itens")}
</StyledParagraph>
        </div>
      </div>
    </dialog>
  </StyledCartModalBox>
)};

export default CartModal;
