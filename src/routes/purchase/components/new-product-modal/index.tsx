import {
  Button,
  Flex,
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
import { FormEvent, useState } from "react";
import { formatCurrency } from "../../../../utils/currency";

export default function NewProductModal(props: Omit<ModalProps, "children">) {
  const [price, setPrice] = useState("");
  const [showForm, setShowForm] = useState(false);

  function onClose() {
    setShowForm(false);
    props.onClose();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onClose();
  }

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar produto à compra</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          {showForm ? (
            <form onSubmit={handleSubmit} id="new-product-form">
              <Stack gap={3}>
                <Input label="Nome do produto" isRequired />
                <Flex gap={3}>
                  <Input label="Quantidade" isRequired />
                  <Input
                    label="Valor"
                    value={price}
                    onChange={(e) => setPrice(formatCurrency(e.target.value))}
                    variant="currency"
                    placeholder="0,00"
                  />
                </Flex>
              </Stack>
            </form>
          ) : (
            <Text>Você ainda não possui produtos cadastrados.</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={showForm ? () => setShowForm(false) : onClose}
          >
            Cancelar
          </Button>
          <Button variant="ghost" onClick={() => setShowForm(true)}>
            {showForm ? "Salvar produto" : "Novo produto"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
