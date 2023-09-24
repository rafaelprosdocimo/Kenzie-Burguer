import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserContext } from '../../../providers/UserContext';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
export interface IRegisterFormData{
  name: string;
  email: string;
  password: string;
  confirm: string;
}


const RegisterForm = () => {
  const schemaRegister = z.object({

    email: z.string().nonempty("Email é obrigatório").email(),
    password: z.string().min(7)
    .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra maiúscula")
    .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula")
    .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
    .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      ),
    name: z.string().nonempty("Nome é obrigatório"),
    confirm: z.string().min(1, "A confirmação de senha é obrigatória"),
}).refine(({password, confirm}) => password === confirm, {
  message: "As senhas precisam corresponderem",
  path: ["confirm"],
})

  const [loading, setLoading] = useState(false);

  const { userRegister } = useContext(UserContext) ;

  
  const { register, handleSubmit, formState: {errors}} = useForm<IRegisterFormData>(
    {
      resolver: zodResolver(schemaRegister)
    }
  );
  const submit: SubmitHandler<IRegisterFormData> = (formData) => {
    console.log(formData)  
    userRegister(formData, setLoading)
  }


  
  return(
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input id='name' label='Name'{...register("name")} disabled={loading} error={errors.name}/>
      <Input id='email' label='E-mail' {...register("email")} disabled={loading} error={errors.email}/>
      <Input id='passwors' label='Senha'{...register("password")} disabled={loading} error={errors.password}/>
      <Input id='confirm'  {...register("confirm")} label='Confirmar Senha' disabled={loading} error={errors.confirm}/>
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
}
export default RegisterForm;
