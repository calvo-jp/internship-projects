import {
  Center,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  Tag,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  FilterIcon,
  ViewGridIcon,
  ViewListIcon,
} from "@heroicons/react/outline";
import usePokemonTypes from "hooks/usePokemonTypes";
import useStore from "hooks/useStore";
import * as React from "react";
import valx from "utils/valx";

interface ToolbarProps {
  /** aka. pokemon types */
  filters?: string[];
  /** aka. onChange */
  onFilter: (values: string[]) => void;
}

const Toolbar = ({ filters, onFilter }: ToolbarProps) => {
  const toggleListView = useStore((state) => state.toggleListView);
  const handleToggle = (value?: boolean) => () => toggleListView(value);

  return (
    <Wrap spacing={8}>
      <WrapItem>
        <FilterTool value={filters} onChange={onFilter} />
      </WrapItem>
      <WrapItem>
        <button onClick={handleToggle(true)}>
          <ToolbarIcon icon={ViewListIcon} />
        </button>
      </WrapItem>
      <WrapItem>
        <button onClick={handleToggle(false)}>
          <ToolbarIcon icon={ViewGridIcon} />
        </button>
      </WrapItem>
    </Wrap>
  );
};

interface FilterToolProps {
  value?: string[];
  onChange: (filters: string[]) => void;
}

/** Controlled component */
const FilterTool = ({ value = [], onChange }: FilterToolProps) => {
  const { data, error, loading } = usePokemonTypes();

  const toggle = (subject: string) => {
    return () => {
      if (!value.includes(subject)) return onChange([subject, ...value]);
      const newValue = value.filter((item) => item !== subject);
      return onChange(newValue);
    };
  };

  // TODO: handle error

  return (
    <Menu closeOnSelect={false}>
      <MenuButton>
        <ToolbarIcon icon={FilterIcon} />
      </MenuButton>

      <MenuList
        p={4}
        w="400px"
        maxW="full"
        rounded="sm"
        bgColor="brand.gray.800"
      >
        <Flex display="flex" gap={1.5} flexWrap="wrap" h="auto">
          {loading && <Loader />}

          {data?.map((item) => (
            <Tag
              key={item}
              as="button"
              p={2}
              rounded="md"
              color={valx({
                "brand.gray.800": value.includes(item),
                "brand.gray.100": !value.includes(item),
              })}
              bgColor={valx({
                "brand.primary": value.includes(item),
                "brand.gray.600": !value.includes(item),
              })}
              onClick={toggle(item)}
            >
              {item}
            </Tag>
          ))}
        </Flex>
      </MenuList>
    </Menu>
  );
};

const Loader = () => {
  return (
    <Center w="full">
      <Spinner />
    </Center>
  );
};

interface ToolbarIconProps {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const ToolbarIcon = ({ icon }: ToolbarIconProps) => {
  return <Icon as={icon} fill="brand.gray.200" fontSize="xl" display="block" />;
};

export default Toolbar;
