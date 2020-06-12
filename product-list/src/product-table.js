import React, { useContext } from 'react'
import { Products } from './context'

const ProductCategoryRow = ({ category }) => (
  <tr>
    <th colSpan='2'>{category}</th>
  </tr>
)

const ProductRow = ({ product }) => {
  const getName = () =>
    product.stocked ? (
      product.name
    ) : (
      <span style={{ color: 'red' }}>{product.name}</span>
    )

  return (
    <tr>
      <td>{getName()}</td>
      <td>{product.price}</td>
    </tr>
  )
}

export default ({ filterText, inStockOnly }) => {
  const products = useContext(Products)
  const getRows = () => {
    let lastCategory = null
    const rows = []
    products.forEach(product => {
      if (
        (inStockOnly && !product.stocked) ||
        product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1
      )
        return
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            key={product.category}
            category={product.category}
          />
        )
        lastCategory = product.category
      }
      rows.push(<ProductRow key={product.name} product={product} />)
    })
    return rows
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{getRows()}</tbody>
    </table>
  )
}
