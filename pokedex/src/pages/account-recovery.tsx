import { Box, Center, HStack, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountLayout from "components/layouts/account";
import Button from "components/widgets/Button";
import Link from "components/widgets/Link";
import TextField from "components/widgets/TextField";
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const AccountRecovery = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Recover Account</title>
      </Head>

      <AccountLayout
        heading="Forgot Password"
        backgroundUrl="/assets/bg/sign-in.png"
      >
        <AccountRecoveryForm />

        <Center mt={12} fontSize="sm">
          <HStack spacing={1}>
            <Box>Remember your password?</Box>
            <Link href="/login">Log in</Link>
          </HStack>
        </Center>
      </AccountLayout>
    </>
  );
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const AccountRecoveryForm = () => {
  const { register, formState, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const recoverAccount = handleSubmit(async (data) => {});

  return (
    <Box as="form" onSubmit={recoverAccount}>
      <VStack spacing={4}>
        <TextField
          label="Email"
          placeholder="Enter email"
          error={formState.errors.email?.message}
          {...register("email")}
        />
      </VStack>

      <Button type="submit" size="lg" fontSize="sm" mt={6} w="full">
        Send password reset link
      </Button>
    </Box>
  );
};

export default AccountRecovery;
