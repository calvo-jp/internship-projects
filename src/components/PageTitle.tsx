import { Heading } from "@chakra-ui/react";

interface PageTitleProps {
  label: string;
}

const PageTitle = ({ label }: PageTitleProps) => {
  return (
    <Heading as="h1" fontWeight={700} fontSize="44px" mb={16}>
      {label}
    </Heading>
  );
};

export default PageTitle;
