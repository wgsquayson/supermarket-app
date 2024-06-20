import { Stack, Text } from "@chakra-ui/react";
import { Product } from "../../types";
import { Input } from "../../../../components/ui";
import { useState } from "react";
import ProductItem from "../../../../components/ui/product";

type ProductListProps = {
  products: Product[];
  onClick: (product: Product) => void;
};

export default function ProductList({ products, onClick }: ProductListProps) {
  const [search, setSearch] = useState("");

  if (!products || products.length === 0)
    return <Text textAlign="center">Nenhum produto encontrado.</Text>;

  const filteredProducts = search
    ? products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <Stack gap={3} overflowY="auto">
      <Input
        label="Procure um produto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Text>Clique em um produto para adicioná-lo</Text>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductItem product={product} onClick={onClick} />
        ))
      ) : (
        <Text textAlign="center" color="grey">
          Nenhum produto encontrado.
        </Text>
      )}
    </Stack>
  );
}
