import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Layout } from "../../../components/ui";
import { useState } from "react";
import { formatCurrency } from "../../../utils/currency";

export default function NewProduct() {
  const [price, setPrice] = useState("");

  return (
    <Layout
      title="Novo produto"
      footer={
        <Stack gap={3}>
          <Text color="grey">*campos obrigatórios</Text>
          <Button colorScheme="teal" size="lg">
            Salvar novo produto
          </Button>
          <Button colorScheme="teal" variant="outline" size="lg">
            Cancelar e voltar
          </Button>
        </Stack>
      }
    >
      <Stack gap={3}>
        <Stack gap={1}>
          <Text color="grey">Nome do produto*</Text>
          <Input colorScheme="teal" required />
        </Stack>
        <Stack gap={1}>
          <Text color="grey">Valor do produto</Text>
          <InputGroup>
            <InputLeftAddon>R$</InputLeftAddon>
            <Input
              placeholder="0,00"
              value={price}
              onChange={(e) => setPrice(formatCurrency(e.target.value))}
            />
          </InputGroup>
        </Stack>
      </Stack>
    </Layout>
  );
}
