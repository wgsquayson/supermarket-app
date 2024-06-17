import { Flex, Heading, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren & {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
};

export default function Layout({
  title,
  subtitle,
  children,
  footer,
}: LayoutProps) {
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
      <Flex flexDir="column" w="full" maxW="430" h="full">
        <Flex flexDir="column" gap={2}>
          <Heading size="md">{title}</Heading>
          <Text color="grey">{subtitle}</Text>
        </Flex>
        <Flex flexDir="column" flex={1}>
          {children}
        </Flex>
        {footer}
      </Flex>
    </Flex>
  );
}
