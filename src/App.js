import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Logo from './assets/form-logo.png'

import './App.css';

const esquemaDeValidacao = yup.object({
  name: yup.string().required("O nome é obrigatório!"),
  email: yup.string().email("Digite um e-mail válido.").required("O e-mail é obrigatório!"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória!"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "As senhas devem ser iguais.").required("Confirmar a senha é obrigatório!"),
 
}).required();

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(esquemaDeValidacao)
  });

  function onSubmit(userData) {
    console.log(userData) // Os dados que chegam poderiam ser gravados em uma tabela de BD.
  }

  return (
    // Evento do formulário (onSubmit abaixo) utiliza o handleSubmit do useForm com uma função chamada onSubmit acima,
    // mas a função poderia ter queqlquer nome:

    <form onSubmit={handleSubmit(onSubmit)}> 
      <img src={Logo} alt="imagem-logo" />
      <label>
          Nome: 
        <input type="text" {...register("name",{ required: true })} />
        <span>{errors.name?.message}</span>
      </label>

      <label>
          E-mail: 
        <input type="text" {...register("email")} />
        <span>{errors.email?.message}</span>
      </label>

      <label>
          Senha: 
        <input type="password" {...register("password")} />
        <span>{errors.password?.message}</span>
      </label>

      <label>
          Confirmar senha: 
        <input type="password" {...register("confirmPassword")} />
        <span>{errors.confirmPassword?.message}</span>
      </label>

      <button type="submit">Cadastrar-se</button>
    </form>
  );
}

export default App;
