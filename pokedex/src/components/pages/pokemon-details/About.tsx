import {
  Divider,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Card from "components/widgets/card";
import CardHeading from "components/widgets/card/CardHeading";
import { GetPokemon } from "__generated__/GetPokemon";

type TPokemon = NonNullable<GetPokemon["pokemon"]>;

interface AboutProps {
  data: TPokemon;
}

const About = ({ data }: AboutProps) => {
  const getEggGroups = () => {
    return !data.specy
      ? "NA"
      : data.specy.eggGroups
          .map(({ eggGroup }) => eggGroup?.name)
          .filter((value) => !!value)
          .join(", ");
  };

  const getGender = () => {
    const genderRate = data.specy?.genderRate;

    return !genderRate || genderRate <= 0
      ? "genderless"
      : genderRate >= 8
      ? genderRate * 10 + "% female"
      : genderRate * 10 + "% male";
  };

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

        <Wrap mt={3} spacing={8}>
          {[
            ["Gender", getGender()],
            ["Egg Group", getEggGroups()],
            ["Egg Cycle", data.specy?.eggCycyle || 0],
          ].map(([label, value]) => (
            <WrapItem key={label}>
              <Text color="brand.gray.400">{label}:</Text>
              <Text color="brand.gray.50" ml={2}>
                {value}
              </Text>
            </WrapItem>
          ))}
        </Wrap>
      </Card>
    </VStack>
  );
};

export default About;
