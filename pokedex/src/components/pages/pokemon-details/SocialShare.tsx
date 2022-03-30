import { useQuery } from "@apollo/client";
import { Box, Flex, HStack, Icon, Tooltip } from "@chakra-ui/react";
import { GET_POKEMON } from "graphql/pokeapi/queries";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import { PropsWithChildren } from "react";
import { GetPokemon, GetPokemonVariables } from "__generated__/GetPokemon";

interface SocialsShareProps {
  /** pokemon id */
  id: number;
}

const baseUrl = "https://internship-project-pokedex.vercel.app/og/pokemons/";

const SocialShare = ({ id }: SocialsShareProps) => {
  const { loading, data, error } = useQuery<GetPokemon, GetPokemonVariables>(
    GET_POKEMON,
    { variables: { id } }
  );

  if (loading) return null;
  if (!data?.pokemon) return null;

  const url = baseUrl + data.pokemon.id;

  return (
    <HStack>
      <ButtonWrapper label="Share on facebook">
        <FacebookShareButton
          url={url}
          hashtag={data.pokemon.name}
          windowWidth={400}
          windowHeight={400}
        >
          <Icon as={FacebookIcon} w={8} h={8} fill="white" />
        </FacebookShareButton>
      </ButtonWrapper>

      <ButtonWrapper label="Share on twitter">
        <TwitterShareButton
          url={url}
          hashtags={[data.pokemon.name]}
          windowWidth={400}
          windowHeight={400}
        >
          <Icon as={TwitterIcon} w={8} h={8} fill="white" />
        </TwitterShareButton>
      </ButtonWrapper>

      <ButtonWrapper label="Share on linkedin">
        <LinkedinShareButton url={url} windowWidth={400} windowHeight={400}>
          <Icon as={LinkedinIcon} w={8} h={8} fill="white" />
        </LinkedinShareButton>
      </ButtonWrapper>
    </HStack>
  );
};

const ButtonWrapper = ({
  label,
  children,
}: PropsWithChildren<{ label?: string }>) => {
  return (
    <Tooltip shouldWrapChildren label={label} hasArrow>
      <Box rounded="full" overflow="hidden" w="32px" h="32px" shadow="md">
        {children}
      </Box>
    </Tooltip>
  );
};

export default SocialShare;
