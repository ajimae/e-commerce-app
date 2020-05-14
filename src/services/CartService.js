/**
 * @description cart service class
 * 
 */
export default class CartService {

  constructor(CartRepository) {
    this.cartRepository = CartRepository;
  }

  addProductToCart(product) {
    return this.cartRepository.addProductToCart(product);
  }
}
