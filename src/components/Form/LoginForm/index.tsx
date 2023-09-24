import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { useContext, useState } from "react";
import { useForm , SubmitHandler} from "react-hook-form"
import { UserContext } from "../../../providers/UserContext";
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';

export interface ILoginFormData{
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { usersLogin } = useContext(UserContext) ;
  const schema = z.object({
    email: z.string().nonempty("Email é obrigatório").email(),
    password: z.string().min(1, "A senha é obrigatória").nonempty(),
})

  const { register, handleSubmit, formState: {errors}} = useForm<ILoginFormData>({
    resolver: zodResolver(schema)

  })
  const submit: SubmitHandler<ILoginFormData> = (formData) => {
    console.log(formData)
      usersLogin(formData, setLoading)
  }



  return(
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input id='login' label='E-mail' {...register("email")} disabled={loading} error={errors.email}/>
      <Input id='senha' label='Senha'{...register("password")} disabled={loading} error={errors.password}/>
      <StyledButton $buttonSize='default' disabled={loading} $buttonStyle='green'>
        {loading ? 'Entrando...' : 'Entrar'}
      </StyledButton>
    </StyledForm>
  )
}

export default LoginForm;


