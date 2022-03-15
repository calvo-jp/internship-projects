import { gql, useQuery } from "@apollo/client";
import { Box, Code } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { GetCountries } from "types/GetCountries";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;

const Test = () => {
  const { data } = useQuery<GetCountries>(GET_COUNTRIES);
  const { data: session } = useSession();

  console.log(session);

  if (!data) return null;

  return (
    <Box p={8}>
      <Code w="full" p={16}>
        <pre>{JSON.stringify(session, null, 4)}</pre>
      </Code>
    </Box>
  );
};

export default Test;
