import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Product as ProductType } from "../../../routes/purchase/types";
import { formatCurrency } from "../../../utils/currency";
import {
  DeleteIcon,
  EditIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { useRef } from "react";

type ProductItemProps = {
  product: ProductType;
  quantity?: number;
  onClick?: (product: ProductType) => void;
  onIncrease?: (productId: string) => void;
  onDecrease?: (productId: string) => void;
  onEdit?: () => void;
  onRemove?: (productId: string) => void;
};

function RemoveProductDialog({
  visible,
  onClose,
  onRemove,
}: {
  visible: boolean;
  onClose: () => void;
  onRemove: () => void;
}) {
  const cancelRef = useRef<any>();

  return (
    <AlertDialog
      isOpen={visible}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Remover produto da compra
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza disso? Você pode adicionar o produto novamente se
            desejar
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onRemove();
                onClose();
              }}
              ml={3}
            >
              Remover da compra
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default function ProductItem({
  product,
  quantity,
  onClick,
  onIncrease,
  onDecrease,
  onEdit,
  onRemove,
}: ProductItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        backgroundColor="ghostwhite"
        cursor={onClick ? "pointer" : undefined}
        key={product.id}
        py={2}
        px={4}
        borderRadius={10}
        alignItems="center"
        justifyContent="space-between"
        onClick={() => onClick?.(product)}
        userSelect="none"
      >
        <Stack>
          {product.category ? (
            <Text color="grey">{product.category}</Text>
          ) : null}
          <Heading size="md">{product.name}</Heading>
        </Stack>
        {onEdit && onRemove && (
          <Flex gap={6} mr={6} flex={1} justifyContent="flex-end">
            <DeleteIcon cursor="pointer" onClick={onOpen} />
            <EditIcon cursor="pointer" onClick={onEdit} />
          </Flex>
        )}
        <Stack>
          {onIncrease && onDecrease && (
            <Flex gap={4} alignItems="center" justifyContent="flex-end">
              <TriangleDownIcon
                cursor="pointer"
                onClick={() => onDecrease(product.id)}
              />
              <Heading size="sm">{quantity}</Heading>
              <TriangleUpIcon
                cursor="pointer"
                onClick={() => onIncrease(product.id)}
              />
            </Flex>
          )}
          {product.price ? (
            <Heading size="sm">
              {" "}
              R${" "}
              {quantity
                ? formatCurrency((product.price ?? 0) * (quantity ?? 0))
                : formatCurrency(product.price ?? 0)}
            </Heading>
          ) : null}
        </Stack>
      </Flex>
      <RemoveProductDialog
        visible={isOpen}
        onClose={onClose}
        onRemove={() => onRemove?.(product.id)}
      />
    </>
  );
}
