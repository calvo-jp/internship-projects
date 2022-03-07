import { Heading } from "@chakra-ui/react";

interface PageTitleProps {
  label: string;
}

const PageTitle = ({ label }: PageTitleProps) => {
  return (
    <Heading
      as="h1"
      fontWeight={700}
      fontSize={{ base: "30px", lg: "44px" }}
      mb={{ base: 8, lg: 16 }}
    >
      {label}
    </Heading>
  );
};

export default PageTitle;
