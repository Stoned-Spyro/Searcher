import React from 'react'

export const ProductList = (props) => {
  const visibleColumns = Object.keys(props.columns).filter(column => props.columns[column] === true);
  return (
    <div id="product-list">
      <header>
        <strong>Product List ({props.products.length} items)</strong>
      </header>
      <table>
        <thead>
          <tr>
            {visibleColumns.map((column, index) => <th key={index}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {props.products.map((product, productIndex)=>{
            return(
              <tr key={productIndex}>
                {visibleColumns.map((column, columnIndex) => <td key={columnIndex}>{product[column]}</td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
