import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import { StyledInputContainer } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';
import { FieldError } from "react-hook-form";
interface IInputPros extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}
const Input = forwardRef(({label, error, id,...rest}: IInputPros, ref: ForwardedRef<HTMLInputElement>) => {
  return(
  <div>
      <StyledInputContainer>
        <input ref={ref} {...rest} type='text' id={id} placeholder=' ' />
        {label? <label htmlFor={id}>{label}</label>: null}
      </StyledInputContainer>
      {error? <StyledParagraph fontColor='red'>{error.message}</StyledParagraph>: null}
    </div>
  );
});
export default Input;
