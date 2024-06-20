import { Button, Flex, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Layout } from "../../../components/ui";
import { useNavigate } from "react-router-dom";
import NewProductModal from "../components/new-product-modal";

export default function PurchaseForm() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSubmit() {
    navigate("/");
  }

  function handleCancel() {
    navigate("/", { replace: true });
  }

  return (
    <>
      <Layout
        title="Nova compra"
        subtitle="Seus produtos cadastrados abaixo aparecerão aqui"
        footer={
          <Stack gap={3}>
            <Text color="grey">*campos obrigatórios</Text>
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
      ></Layout>
      <NewProductModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
