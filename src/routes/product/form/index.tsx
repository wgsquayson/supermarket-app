import { Button, Stack, Text } from "@chakra-ui/react";
import { Input, Layout } from "../../../components/ui";
import { FormEvent, useState } from "react";
import { formatCurrency } from "../../../utils/currency";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const navigate = useNavigate();

  const [price, setPrice] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/");
  }

  function handleCancel() {
    navigate("/", { replace: true });
  }

  return (
    <Layout
      title="Novo produto"
      footer={
        <Stack gap={3}>
          <Text color="grey">*campos obrigatórios</Text>
          <Button
            type="submit"
            form="new-product-form"
            colorScheme="teal"
            size="lg"
          >
            Salvar novo produto
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            size="lg"
            onClick={handleCancel}
          >
            Cancelar e voltar
          </Button>
        </Stack>
      }
    >
      <form onSubmit={handleSubmit} id="new-product-form">
        <Stack gap={3}>
          <Input label="Nome do produto" isRequired />
          <Input
            label="Valor do produto"
            value={price}
            onChange={(e) => setPrice(formatCurrency(e.target.value))}
            variant="currency"
            placeholder="0,00"
          />
        </Stack>
      </form>
    </Layout>
  );
}
