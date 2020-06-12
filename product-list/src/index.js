import React from 'react'
import ReactDOM from 'react-dom'
import FilterableProductTable from './filterable-product-table'
import { Products, PRODUCTS } from './context'

class App extends React.Component {
  render() {
    return <FilterableProductTable />
  }
}

ReactDOM.render(
  <Products.Provider value={PRODUCTS}>
    <App />
  </Products.Provider>,
  document.getElementById('root')
)
