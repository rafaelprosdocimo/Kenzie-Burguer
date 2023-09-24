import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { useContext } from 'react';

import { CartContext } from '../../../providers/CartContext';

const SearchForm = () => {
  const { value, onChange, onSearch} = useContext(CartContext);
  return(
  <StyledSearchForm>
    <input type='text' placeholder='Digitar pesquisa' value={value} onChange={onChange}/>
    <StyledButton type='button' $buttonSize='medium' $buttonStyle='green' onClick={(e)=>{
      e.preventDefault();
      onSearch(value);
    }}>
      <MdSearch />
    </StyledButton>
  </StyledSearchForm>
)};

export default SearchForm;
