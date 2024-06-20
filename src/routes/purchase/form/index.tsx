import { Button, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { Layout } from "../../../components/ui";
import { useNavigate } from "react-router-dom";
import NewProductModal from "../components/new-product-modal";
import { useContext, useState } from "react";
import ProductItem from "../../../components/ui/product";
import PurchaseContext from "../context";
import { Product } from "../types";
import { formatCurrency } from "../../../utils/currency";

export default function PurchaseForm() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(
    undefined
  );

  const { selectedProducts, increaseProduct, decreaseProduct, removeProduct } =
    useContext(PurchaseContext);

  function handleSubmit() {
    navigate("/");
  }

  function handleCancel() {
    navigate("/", { replace: true });
  }

  const total = selectedProducts.reduce((acc, next) => {
    return acc + (next.product.price ?? 0) * next.quantity;
  }, 0);

  return (
    <>
      <Layout
        title="Nova compra"
        subtitle={
          selectedProducts.length === 0
            ? "Seus produtos aparecerão aqui"
            : `Parcial: R$ ${formatCurrency(total)}`
        }
        subtitleColor="black"
        footer={
          <Stack gap={3}>
            <Button
              colorScheme="teal"
              size="lg"
              variant="outline"
              onClick={onOpen}
            >
              Adicionar produto
            </Button>
            <Flex gap={3} justifyContent="space-between">
              <Button
                flex={1}
                colorScheme="red"
                size="lg"
                onClick={handleCancel}
                variant="ghost"
              >
                Cancelar e voltar
              </Button>
              <Button
                flex={1}
                colorScheme="teal"
                size="lg"
                onClick={handleSubmit}
              >
                Finalizar compra
              </Button>
            </Flex>
          </Stack>
        }
      >
        <Stack gap={3} overflowY="auto" maxH="100%" mb={3}>
          {selectedProducts.map(({ product, quantity }) => {
            return (
              <ProductItem
                product={product}
                quantity={quantity}
                onIncrease={increaseProduct}
                onDecrease={decreaseProduct}
                onEdit={() => {
                  setProductToEdit(product);
                  onOpen();
                }}
                onRemove={removeProduct}
                key={product.id}
              />
            );
          })}
        </Stack>
      </Layout>
      <NewProductModal
        isOpen={isOpen}
        onClose={onClose}
        product={productToEdit}
        onFinishEdit={() => {
          setProductToEdit(undefined);
        }}
      />
    </>
  );
}
