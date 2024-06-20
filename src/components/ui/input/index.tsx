import {
  Stack,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";

type InputProps = ChakraInputProps & {
  label: string;
  variant?: "default" | "currency";
};

export default function Input({
  label,
  variant = "default",
  ...props
}: InputProps) {
  if (variant === "currency") {
    return (
      <Stack gap={1}>
        <Text color="grey">{label}</Text>
        <InputGroup>
          <InputLeftAddon>R$</InputLeftAddon>
          <ChakraInput colorScheme="teal" {...props} />
        </InputGroup>
      </Stack>
    );
  }

  return (
    <Stack gap={1}>
      <Text color="grey">
        {label}
        {props.isRequired ? "*" : ""}
      </Text>
      <ChakraInput colorScheme="teal" {...props} />
    </Stack>
  );
}
