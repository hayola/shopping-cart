import Immutable from 'immutable'
import { products } from '../productsContainer/selectors'
import { createSelector } from 'reselect'
import { SortingConstants } from '../../constants/sortingConstants'
import { sortBy } from '../../utils/sortBy'

export function cartProductsIds (state) {
  return state.getIn(['cart', 'data'])
}

export function currentSorting (state) {
  return state.getIn(['cart', 'sorting'])
}

export function cartPurchaseStatus (state) {
  return state.getIn(['cart', 'status'])
}

// TODO: refactorig
// 1. Comparators to utils
// 2. localeCompare for strings
// 3. Issue with preserving order
const cartProducts = createSelector(
  [products, cartProductsIds, currentSorting],
  (products, ids, currentSorting) => {
    if (ids.size === 0) {
      return Immutable.List()
    }

    const productsInCart = ids.reduce((acc, count, id) => {
      const product = products.get(id)
      const cartProduct = product.set(
        'amount',
        ids.get(id)
      )
      return acc.push(cartProduct)
    }, Immutable.List())

    if (currentSorting.size) {
      const sortDirection = currentSorting.get('direction')
      const comparator = sortDirection === SortingConstants.Directions.ASCENDING
        ? (a, b) => a < b ? -1 : a > b ? 1 : 0
        : (b, a) => a < b ? -1 : a > b ? 1 : 0
      const sortId = currentSorting.get('id')
      const sortedProductsInCart = sortBy(productsInCart.toJS(), product => {
        const field = product[sortId]
        return typeof field === 'string' ? field.toUpperCase() : field
      }, comparator)
      return Immutable.fromJS(sortedProductsInCart)
    }

    return productsInCart
  }
)

const productsTotalCost = createSelector(
  [products, cartProductsIds],
  (products, cartProductsIds) => {
    return cartProductsIds.reduce((acc, productAmount, productId) => {
      const sum = acc + products.getIn([productId, 'price']) * productAmount
      return sum
    }, 0)
  }
)

export function cartContainerSelector (state) {
  return {
    productsTotalCost: productsTotalCost(state),
    currentSorting: currentSorting(state),
    products: cartProducts(state),
    status: cartPurchaseStatus(state)
  }
}
