import { PropsWithChildren, createContext, useState } from "react";
import { Product } from "./types";
import { productsMock } from "./mocks";

const noop = () => {};

type PurchaseItem = {
  product: Product;
  quantity: number;
};

type PurchaseContextValues = {
  products: Product[];
  selectedProducts: PurchaseItem[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (
    productId: string,
    updatedProduct: Omit<Product, "id">
  ) => void;
  increaseProduct: (productId: string) => void;
  decreaseProduct: (productId: string) => void;
  savePurchase: () => void;
};

const initialState: PurchaseContextValues = {
  products: [],
  selectedProducts: [],
  addProduct: noop,
  removeProduct: noop,
  updateProduct: noop,
  increaseProduct: noop,
  decreaseProduct: noop,
  savePurchase: noop,
};

const PurchaseContext = createContext<PurchaseContextValues>(initialState);

export function PurchaseProvider({ children }: PropsWithChildren) {
  const [selectedProducts, setSelectedProducts] = useState<PurchaseItem[]>([]);
  const [products] = useState<Product[]>(productsMock);
  const filteredProducts = products.filter((product) => {
    return !selectedProducts.find(
      (selected) => selected.product.id === product.id
    );
  });

  function addProduct(product: Product) {
    let result = true;

    setSelectedProducts((prev) => {
      const productIsSelected = prev.find(
        (item) => item.product.id === product.id
      );

      if (productIsSelected) {
        result = false;
        return prev;
      }

      return prev.concat({ product, quantity: 1 });
    });

    console.log(result);

    return result;
  }

  function removeProduct(productId: string) {
    setSelectedProducts((prev) => {
      return prev.filter((item) => item.product.id !== productId);
    });
  }

  function updateProduct(
    productId: string,
    updatedProduct: Omit<Product, "id">
  ) {
    setSelectedProducts((prev) => {
      const productIndex = prev.findIndex(
        (item) => item.product.id === productId
      );

      if (productIndex !== -1) {
        const updatedProducts = [...prev];

        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          product: {
            ...updatedProducts[productIndex],
            ...updatedProduct,
            id: productId,
          },
        };

        return updatedProducts;
      }

      return prev;
    });
  }

  function increaseProduct(productId: string) {
    setSelectedProducts((prev) => {
      const productIndex = prev.findIndex(
        (item) => item.product.id === productId
      );

      if (productIndex !== -1) {
        const updatedProducts = [...prev];

        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity: updatedProducts[productIndex].quantity + 1,
        };

        return updatedProducts;
      }

      return prev;
    });
  }

  function decreaseProduct(productId: string) {
    setSelectedProducts((prev) => {
      const productIndex = prev.findIndex(
        (item) => item.product.id === productId
      );

      if (productIndex !== -1 && prev[productIndex].quantity > 1) {
        const updatedProducts = [...prev];

        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity: updatedProducts[productIndex].quantity - 1,
        };

        return updatedProducts;
      }

      return prev;
    });
  }

  function savePurchase() {}

  return (
    <PurchaseContext.Provider
      value={{
        products: filteredProducts,
        selectedProducts,
        addProduct,
        removeProduct,
        updateProduct,
        increaseProduct,
        decreaseProduct,
        savePurchase,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}

export default PurchaseContext;
