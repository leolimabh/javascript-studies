import React, { lazy, Suspense, useState } from 'react'
import SearchBar from './search-bar'
const ProductTable = lazy(() => import('./product-table'))

export default () => {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        handleFilterTextChange={value => setFilterText(value)}
        handleInStockChange={checked => setInStockOnly(checked)}
      />
      <Suspense fallback={<>loading...</>}>
        <ProductTable filterText={filterText} inStockOnly={inStockOnly} />
      </Suspense>
    </>
  )
}
