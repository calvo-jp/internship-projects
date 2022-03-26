import {
  Divider,
  HStack,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Card from "components/widgets/card";
import CardHeading from "components/widgets/card/CardHeading";
import { useCallback } from "react";
import unkebab from "utils/unkebab";
import { GetPokemon } from "__generated__/GetPokemon";

type TPokemon = NonNullable<GetPokemon["pokemon"]>;

interface AboutProps {
  data: TPokemon;
}

const About = ({ data }: AboutProps) => {
  const getEggGroups = useCallback(() => {
    return data.specy
      ? data.specy.eggGroups
          .map(({ eggGroup }) => eggGroup?.name ?? "")
          .filter((value) => value.length > 0)
          .map(unkebab)
      : [];
  }, [data.specy]);

  const getGender = useCallback(() => {
    const genderRate = data.specy?.genderRate;

    return !genderRate || genderRate <= 0
      ? "genderless"
      : genderRate >= 8
      ? genderRate * 10 + "% female"
      : genderRate * 10 + "% male";
  }, [data.specy?.genderRate]);

  return (
    <VStack spacing={8} align="start">
      <Text>{data.others?.descriptions.at(0)?.description}</Text>

      <Card py={4} bgColor="others.gray.800">
        <HStack
          gap={6}
          divider={
            <Divider
              h="75px"
              orientation="vertical"
              borderColor="brand.gray.700"
            />
          }
        >
          {[
            ["Weight", data.weight + "KG"],
            ["Height", data.height + "M"],
          ].map(([label, value]) => (
            <VStack key={label} spacing={2} align="start">
              <CardHeading>{label}</CardHeading>

              <Text color="brand.gray.50">{value}</Text>
            </VStack>
          ))}
        </HStack>
      </Card>

      <Card bgColor="others.gray.800">
        <CardHeading>Breed</CardHeading>

        <Wrap mt={3} spacing={8} color="brand.gray.50">
          <WrapItem>
            <Text color="brand.gray.400">Gender:</Text>
            <Text ml={2}>{getGender()}</Text>
          </WrapItem>
          <WrapItem>
            <Text color="brand.gray.400">Egg Group:</Text>
            <HStack ml={2} spacing={1}>
              {getEggGroups().map((eggGroup) => (
                <Tag key={eggGroup}>{eggGroup}</Tag>
              ))}
            </HStack>
          </WrapItem>
          <WrapItem>
            <Text color="brand.gray.400">Egg Cycle:</Text>
            <Text ml={2}>{data.specy?.eggCycyle ?? 0}</Text>
          </WrapItem>
        </Wrap>
      </Card>
    </VStack>
  );
};

export default About;
