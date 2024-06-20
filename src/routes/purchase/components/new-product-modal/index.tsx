import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Input } from "../../../../components/ui";
import { FormEvent, useContext, useEffect, useState } from "react";
import { formatCurrency, unformatCurrency } from "../../../../utils/currency";
import { Product } from "../../types";
import ProductList from "../product-list";
import PurchaseContext from "../../context";

type NewProductModalProps = Omit<ModalProps, "children"> & {
  product?: Product;
  onFinishEdit?: () => void;
};

export default function NewProductModal({
  product,
  onFinishEdit,
  ...props
}: NewProductModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { products, addProduct, updateProduct } = useContext(PurchaseContext);

  function clearForm() {
    setName("");
    setCategory("");
    setPrice("");
  }

  function onClose() {
    setShowForm(false);
    clearForm();
    onFinishEdit?.();
    props.onClose();
  }

  function onUpdateList(product: Product) {
    addProduct(product);
    onClose();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (product) {
      updateProduct(product.id, {
        name,
        category,
        price: unformatCurrency(price),
      });

      return onClose();
    }

    addProduct({
      name,
      category,
      price: unformatCurrency(price),
    });

    onClose();
  }

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category ?? "");
      setPrice(product?.price ? formatCurrency(product.price) : "");
      setShowForm(true);
    } else clearForm();
  }, [product]);

  return (
    <Modal {...props}>
      <ModalOverlay h="100vh" />
      <ModalContent maxH="80vh" overflowY="auto">
        <ModalHeader>
          {product ? "Editar produto" : "Adicionar produto à compra"}
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          {!showForm ? (
            <Button
              width="full"
              variant="outline"
              colorScheme="teal"
              onClick={() => {
                setShowForm(true);
              }}
              mb={3}
            >
              Adicionar novo produto
            </Button>
          ) : null}
          {showForm ? (
            <form onSubmit={handleSubmit} id="new-product-form">
              <Stack gap={3}>
                <Input
                  label="Nome do produto"
                  isRequired
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Categoria"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <Input
                  label="Valor"
                  value={price}
                  onChange={(e) => setPrice(formatCurrency(e.target.value))}
                  variant="currency"
                  placeholder="0,00"
                />
                <Text size="sm" color="grey">
                  *campos obrigatórios
                </Text>
              </Stack>
            </form>
          ) : (
            <ProductList onClick={onUpdateList} products={products} />
          )}
        </ModalBody>

        <ModalFooter>
          {showForm ? (
            <>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </Button>
              <Button variant="ghost" type="submit" form="new-product-form">
                Salvar produto
              </Button>
            </>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
