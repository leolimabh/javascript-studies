import React from 'react'

export default ({
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
      <>
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
      </>
    </form>
  )
}
