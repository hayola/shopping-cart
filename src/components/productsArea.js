import React from 'react'
import PropTypes from 'prop-types'

const ProductsArea = ({ children, ...others }) => (
  <div className='products-area l-main grid-item' {...others}>
    {children}
  </div>
)

ProductsArea.propTypes = {
  children: PropTypes.node
}

export default ProductsArea
