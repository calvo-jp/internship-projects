import { Heading } from "@chakra-ui/react";

interface PageTitleProps {
  label: string;
}

const PageTitle = ({ label }: PageTitleProps) => {
  return (
    <Heading
      as="h1"
      fontWeight={700}
      fontSize={{ base: "30px", md: "44px" }}
      mb={{ base: 8, md: 16 }}
    >
      {label}
    </Heading>
  );
};

export default PageTitle;
