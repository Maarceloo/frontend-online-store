import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api';

export default class Home extends Component {
  state = {
    categorieList: [],
  }

  componentDidMount() {
    this.getCategoriesApi();
  }

   getCategoriesApi = async () => {
     const api = await getCategories();
     console.log(api);
     this.setState({
       categorieList: api.map((categorie) => categorie),
     });
   }

   handleClick = ({ target }) => {
     const { checked, id } = target;
     console.log(checked, id);
     //  if (checked ===)
   }

   render() {
     const { categorieList } = this.state;
     return (
       <div>
         <nav>
           <Link to="/shopping-cart" data-testid="shopping-cart-button">
             <button type="button">Carrinho</button>
           </Link>
         </nav>
         <input
           type="text"
         />
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
       </div>
     );
   }
}
