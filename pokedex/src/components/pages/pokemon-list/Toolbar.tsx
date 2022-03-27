import {
  Center,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  Tag,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  CheckIcon,
  FilterIcon,
  ViewGridIcon,
  ViewListIcon,
} from "@heroicons/react/outline";
import usePokemonTypes from "hooks/usePokemonTypes";
import useStore from "hooks/useStore";
import * as React from "react";

interface ToolbarProps {
  /** aka. pokemon types */
  filters?: string[];
  /** aka. onChange */
  onFilterChange: (value: string[]) => void;
}

const Toolbar = ({ filters, onFilterChange }: ToolbarProps) => {
  const toggleListView = useStore((state) => state.toggleListView);

  const handleToggle = (value?: boolean) => () => toggleListView(value);

  return (
    <Wrap spacing={8}>
      <WrapItem>
        <FilterTool value={filters} onChange={onFilterChange} />
      </WrapItem>
      <WrapItem>
        <Tooltip label="toggle list view" hasArrow>
          <button onClick={handleToggle(true)}>
            <ToolbarIcon icon={ViewListIcon} />
          </button>
        </Tooltip>
      </WrapItem>
      <WrapItem>
        <Tooltip label="toggle grid view" hasArrow>
          <button onClick={handleToggle(false)}>
            <ToolbarIcon icon={ViewGridIcon} />
          </button>
        </Tooltip>
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
  const { data, loading } = usePokemonTypes();

  const toggle = React.useCallback(
    (subject: string) => {
      return () => {
        if (!value.includes(subject)) return onChange([subject, ...value]);
        const newValue = value.filter((item) => item !== subject);
        return onChange(newValue);
      };
    },
    [onChange, value]
  );

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
        {loading && <Loader />}

        {!loading && (
          <Flex display="flex" gap={2} flexWrap="wrap" h="auto">
            {data?.map((item) => (
              <Tag
                key={item}
                as="button"
                p={2}
                rounded="lg"
                color={
                  value.includes(item) ? "brand.gray.700" : "brand.gray.100"
                }
                bgColor={
                  value.includes(item) ? "brand.primary" : "brand.gray.700"
                }
                onClick={toggle(item)}
              >
                {item}
              </Tag>
            ))}
          </Flex>
        )}
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
