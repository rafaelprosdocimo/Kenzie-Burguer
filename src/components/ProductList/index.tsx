import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext';
import { useContext } from 'react';
const ProductList = () => {

  const { filteredProducts } = useContext(CartContext);

  

  return(
    <StyledProductList>
      {filteredProducts.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            img={product.img}
          />
        )
      })}
    </StyledProductList>
)};

export default ProductList;
