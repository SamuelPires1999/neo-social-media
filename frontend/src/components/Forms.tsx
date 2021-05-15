import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";

export const RegisterForm = () => {
  return (
    <VStack
      border="1px"
      borderRadius="md"
      borderColor="facebook.500"
      padding="10"
      spacing="6"
      minW="container.sm"
      maxW="container.lg"
      mt="10"
    >
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input border="1px" borderColor="gray.400" type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input border="1px" borderColor="gray.400" type="text" />
        <FormHelperText>
          This name will be displayed for other users
        </FormHelperText>
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input border="1px" borderColor="gray.400" type="password" />
        <FormHelperText>Choose a strong password</FormHelperText>
      </FormControl>
      <Button w="full" colorScheme="teal" type="submit">
        Submit
      </Button>
    </VStack>
  );
};

export const LoginForm = () => {
  return (
    <VStack
      border="1px"
      borderRadius="md"
      borderColor="facebook.500"
      padding="10"
      spacing="6"
      minW="container.sm"
      maxW="container.lg"
      mt="10"
    >
      <FormControl id="email">
        <FormLabel>Email or Username</FormLabel>
        <Input border="1px" borderColor="gray.400" type="email" />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input border="1px" borderColor="gray.400" type="password" />
      </FormControl>
      <Button w="full" colorScheme="teal" type="submit">
        Submit
      </Button>
    </VStack>
  );
};
