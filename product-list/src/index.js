import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const SearchBar = ({
  filterText,
  inStockOnly,
  handleFilterTextChange,
  handleInStockChange,
}) => {
  const onFilterTextChange = e => {
    handleFilterTextChange(e.target.value)
  }
  const onInStockChange = e => {
    handleInStockChange(e.target.checked)
  }

  return (
    <form>
      <div>
        <input
          type='text'
          placeholder='Search...'
          value={filterText}
          onChange={onFilterTextChange}
        />
        <p>
          <input
            type='checkbox'
            checked={inStockOnly}
            onChange={onInStockChange}
          />{' '}
          Only show products in stock
        </p>
      </div>
    </form>
  )
}

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

const ProductTable = ({ products, filterText, inStockOnly }) => {
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

const FilterableProductTable = ({ products }) => {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        handleFilterTextChange={value => setFilterText(value)}
        handleInStockChange={checked => setInStockOnly(checked)}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  )
}

const PRODUCTS = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football',
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball',
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball',
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch',
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5',
  },
  {
    category: 'Electronics',
    price: '$199.99',
    stocked: true,
    name: 'Nexus 7',
  },
]

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
)
