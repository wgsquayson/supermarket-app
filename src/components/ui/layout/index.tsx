import { Heading, Stack, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren & {
  title?: string;
  subtitle?: string;
  subtitleColor?: string;
  footer?: React.ReactNode;
};

export default function Layout({
  title,
  subtitle,
  subtitleColor = "grey",
  children,
  footer,
}: LayoutProps) {
  return (
    <Stack alignItems="center" w="100vw" h="100vh" p={5} gap={5}>
      <Heading size="xl">supermarket app</Heading>
      <Stack w="full" maxW="430" h="full" maxH="100vh" overflow="scroll">
        <Stack gap={2}>
          <Heading size="md">{title}</Heading>
          <Text color={subtitleColor}>{subtitle}</Text>
        </Stack>
        <Stack flex="1" overflowY="scroll">
          {children}
        </Stack>
        {footer}
      </Stack>
    </Stack>
  );
}
