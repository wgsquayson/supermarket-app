import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function handleNewProductPress() {
    navigate("/products/new");
  }

  function handleNewPurchasePress() {
    navigate("/purchases/new");
  }

  return (
    <Flex
      flex={1}
      alignItems="center"
      w="100vw"
      h="100vh"
      p={5}
      flexDirection="column"
      gap={5}
    >
      <Heading size="xl">supermarket app</Heading>
      <Flex
        flexDir="column"
        w="full"
        maxW="430"
        h="full"
        justifyContent="space-between"
      >
        <Flex flexDir="column" gap={2}>
          <Heading size="md">Suas compras</Heading>
          <Text color="grey">
            Ainda sem compras. Registre produtos e compras nos botões abaixo.
          </Text>
        </Flex>
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
      </Flex>
    </Flex>
  );
}
