import data from '../data/products.json'

const shoppingCartService = {

  /**
   * Fetches products data from the server
   *
   * @return {Promise.<Object[]>} - Returns Promise. When resolved, it provides products data
   */

  getData: () => {
    return Promise.resolve(data)
  },

  /**
   * Sends products ids from cart to the server
   * @param  {String[]} - Products ids
   * @return {Promise.<Object[]>} - Returns Promise for data sending.
   * When resolved, it indicates that products data was delivered successfully
   * When rejected, it indicates that products data wasn't delivered
   */

  sendData: (products) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000)
    })
  }
}

export default shoppingCartService
