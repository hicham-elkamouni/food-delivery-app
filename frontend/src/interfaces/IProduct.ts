export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICartXProduct {
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}
