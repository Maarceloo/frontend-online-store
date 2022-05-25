import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../api';

export default class Home extends Component {
  state = {
    categorieList: [],
    inputName: "",
    productList: [],
    notFound: "",
  }

  componentDidMount() {
    this.getCategoriesApi();
  }

   getCategoriesApi = async () => {
     const api = await getCategories();
     this.setState({
       categorieList: [...api],
     });
   }

  //  handleClick = ({ target }) => {
  //    const { checked, id } = target;
  //    console.log(checked, id);
  //    //  if (checked ===)
  //  }

  handleInputClick = async () => {
    const { inputName } = this.state;
    const api = await getProductsFromCategoryAndQuery("", inputName);
    const product = api.results;
    this.setState({
      productList: product,
      notFound: "Nenhum produto foi encontrado",
    })
    // console.log(this.state.productList);
  }

   handleOnChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };

   render() {
     const { categorieList, inputName, productList, notFound } = this.state;
     return (
       <div>
         <nav>
           <Link to="/shopping-cart" data-testid="shopping-cart-button">
             <button type="button">Carrinho</button>
           </Link>
         </nav>
         <input
           type="text"
           name="inputName"
           value={inputName}
           data-testid="query-input"
           onChange={this.handleOnChange}
         />
         <button 
         type="button" 
         data-testid="query-button" 
         onClick={this.handleInputClick}>
           Pesquisar
         </button>
         <div>
           <ul>
             {categorieList.map((categorie) => (
               (
                 <label
                   data-testid="category"
                   key={ categorie.id }
                   htmlFor={ categorie.name }
                 >
                   <br />
                   <input
                     onClick={ this.handleClick }
                     value={ categorie.id }
                     name="category"
                     type="radio"
                     id={ categorie.name }
                   />
                   {categorie.name}
                 </label>
               )
             ))}
           </ul>
         </div>
         <p data-testid="home-initial-message">
           Digite algum termo de pesquisa ou escolha uma categoria.
         </p>

         {productList.length > 0 ? productList.map(({ title, price, thumbnail, id }) => (
          <div key={id} data-testid="product">
            <h3 data-testid="product">
              {title}
            </h3>
            <img src={thumbnail} alt={title} width="200" data-testid="product" />
            <p data-testid="product">
              {price}
            </p>
          </div>
           )) :
           <p data-testid="product">{notFound}</p>
          }
       </div>       
     );
   }
}
