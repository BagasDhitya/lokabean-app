import { Request, Response, NextFunction } from "express";
import { productService } from "./product.service";

class ProductController {
  create(req: Request, res: Response, next: NextFunction) {
    productService
      .createProduct(req.body)
      .then((data) => res.status(201).json({ success: true, data }))
      .catch(next);
  }

  getAll(req: Request, res: Response, next: NextFunction) {
    productService
      .getAllProducts()
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  getById(req: Request, res: Response, next: NextFunction) {
    productService
      .getProductById(req.params.id)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  update(req: Request, res: Response, next: NextFunction) {
    productService
      .updateProduct(req.params.id, req.body)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  delete(req: Request, res: Response, next: NextFunction) {
    productService
      .deleteProduct(req.params.id)
      .then((data) => res.json({ success: true, message: "Product deleted" }))
      .catch(next);
  }
}

export const productController = new ProductController();
