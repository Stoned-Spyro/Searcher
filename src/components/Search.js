import React, { useEffect, useState } from 'react'

import '../styles/Search.css';
import { ToggleColumns } from './ToggleColumns';
import { ProductList } from './ProductList';
import { FilterForm } from './FilterForm';

export const Search = (props) => {
  const [price, setPrice] = useState({ priceFrom: '', priceTo: '' });

  const [columns, setColumns] = useState({
    id: true,
    name: true,
    department: true,
    price: true,
    currency: true,
  });

  const [displayedProducts, setDisplayedProducts] = useState(props.products)

  useEffect(()=>{
    filterProducts()
  },[price])

  const onPriceInputChange = (name, value) => {
    setPrice((prevPrice) => ({
       ...prevPrice,
       [name]:value
     }))
  }

  const onCheckboxClick = (name, checked) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [name]:checked
    }))
  }

  const filterProducts = () => {
    const filteredProducts = props.products.filter(product => {
      const productPrice = product.price
      if(price.priceFrom === '' && price.priceTo === ''){
        return true
      }
      if(price.priceFrom !== '' && price.priceTo !==''){
        return productPrice >= price.priceFrom && productPrice <= price.priceTo;
      }
      if(price.priceFrom !== ''){
        return productPrice >= price.priceFrom;
      }
      if(price.priceTo !==''){
        return productPrice <= price.priceTo;
      }
      return false
    })
    setDisplayedProducts(filteredProducts)
  }

  //let displayedProducts = [];
  return (
    <div className="Products">
      <FilterForm
        priceFrom={price.priceFrom}
        priceTo={price.priceTo}
        onPriceInputChange={onPriceInputChange} />

      <ToggleColumns
        onCheckboxClick={onCheckboxClick}
        columns={columns} />

      <ProductList
        products={displayedProducts}
        columns={columns} />
    </div>
  );
}

export default Search;
