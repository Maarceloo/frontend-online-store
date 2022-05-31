import React, { Component } from 'react';
import TesteCarrinho from './ComponetCart';

export default class Checkout extends Component {
  render() {
    return (
      <div>
        <TesteCarrinho />
        <form>
          <label htmlFor="Nome">
            Nome Completo
            <input type="text" data-testid="checkout-fullname" required />
          </label>
          <label htmlFor="Email">
            Email
            <input type="email" data-testid="checkout-email" required />
          </label>
          <label htmlFor="CPF">
            CPF
            <input type="text" data-testid="checkout-cpf" required />
          </label>
          <label htmlFor="phone">
            Phone
            <input type="text" data-testid="checkout-phone" required />
          </label>
          <label htmlFor="Cep">
            CEP
            <input type="text" data-testid="checkout-cep" required />
          </label>
          <label htmlFor="endereco">
            Endereço
            <input type="text" data-testid="checkout-address" required />
          </label>
        </form>
      </div>
    );
  }
}
