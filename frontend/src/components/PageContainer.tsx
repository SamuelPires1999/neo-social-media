import { Container } from "@chakra-ui/layout";

const PageContainer: React.FC = ({ children }) => {
  return (
    <Container maxW="xl" centerContent flexDir="column" display="flex">
      {children}
    </Container>
  );
};

export default PageContainer;
