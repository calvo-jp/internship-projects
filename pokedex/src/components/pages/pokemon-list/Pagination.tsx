import { HStack, Icon, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = ({ onNext, onPrev }: PaginationProps) => {
  return (
    <HStack spacing={8} justify="center">
      <HStack spacing={4}>
        <Control control="previous" onClick={onPrev} />
        <Control control="next" onClick={onNext} />
      </HStack>
    </HStack>
  );
};

interface ControlProps extends React.ComponentProps<"button"> {
  control: "next" | "previous";
}

const Control = ({ control, ...props }: ControlProps) => {
  const icon = (
    <Icon as={control === "next" ? ChevronRightIcon : ChevronLeftIcon} />
  );

  return (
    <IconButton
      aria-label={control}
      icon={icon}
      bgColor="brand.primary"
      color="brand.gray.800"
      rounded="full"
      shadow="md"
      _hover={{ bgColor: "brand.primary", color: "brand.gray.800" }}
      _active={{ bgColor: "brand.primary", color: "brand.gray.800" }}
      {...props}
    />
  );
};

export default Pagination;
