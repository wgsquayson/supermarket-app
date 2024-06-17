import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/ui";

export default function Home() {
  const navigate = useNavigate();

  function handleNewProductPress() {
    navigate("/products/new");
  }

  function handleNewPurchasePress() {
    navigate("/purchases/new");
  }

  return (
    <Layout
      title="Suas compras"
      subtitle="Ainda sem compras. Registre produtos e compras nos botões abaixo."
      footer={
        <Flex flexDir="column" gap={3}>
          <Button
            colorScheme="teal"
            variant="outline"
            size="lg"
            onClick={handleNewProductPress}
          >
            Registrar produto
          </Button>
          <Button colorScheme="teal" size="lg" onClick={handleNewPurchasePress}>
            Registrar compra
          </Button>
        </Flex>
      }
    ></Layout>
  );
}
