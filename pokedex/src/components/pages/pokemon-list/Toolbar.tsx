import {
  Checkbox,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  FilterIcon,
  ViewGridIcon,
  ViewListIcon,
} from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";
import usePokemonTypes from "hooks/usePokemonTypes";
import useStore from "hooks/useStore";

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
  const categories = usePokemonTypes();

  const handleChange = (newValue: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked && !value.includes(newValue))
        onChange([...value, newValue]);
      if (!e.target.checked && value.includes(newValue))
        onChange(value.filter((item) => item !== newValue));
    };
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton>
        <ToolbarIcon icon={FilterIcon} />
      </MenuButton>
      <MenuList
        color="brand.gray.100"
        bgColor="brand.gray.800"
        rounded="sm"
        display="flex"
        gap={1}
        flexWrap="wrap"
        maxW="400px"
        h="auto"
        p={4}
      >
        {categories.map((item) => {
          console.log(value.includes(item));
          return (
            <MenuItem key={item} w="fit-content" p={0}>
              <HStack bgColor="brand.gray.700" p={2} rounded="sm">
                <Checkbox
                  colorScheme="colorSchemeHacks.yellow"
                  borderColor="brand.gray.400"
                  iconColor="brand.primaryDark"
                  onChange={handleChange(item)}
                  isChecked={value.includes(item)}
                />

                <Text>{item}</Text>
              </HStack>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

interface ToolbarIconProps {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const ToolbarIcon = ({ icon }: ToolbarIconProps) => {
  return <Icon as={icon} fill="brand.gray.200" fontSize="xl" display="block" />;
};

export default Toolbar;
