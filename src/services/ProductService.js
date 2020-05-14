/**
 * @description product service class
 * 
 */
export default class ProductService {

  constructor(ProductRepository) {
    this.productRepository = ProductRepository;
  }

  addProduct(product) {
    return this.productRepository.addProduct(product);
  }

  getAllProducts() {
    return this.productRepository.getAllProducts();
  }

  getProduct(id) {
    return this.productRepository.getProduct(id);
  }
}
