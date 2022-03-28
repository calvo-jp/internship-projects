import { useQuery } from "@apollo/client";
import { HStack, Icon, IconButton } from "@chakra-ui/react";
import FacebookIcon from "components/icons/Facebook";
import LinkedInIcon from "components/icons/LinkedIn";
import TwitterIcon from "components/icons/Twitter";
import { GET_POKEMON } from "graphql/pokeapi/queries";
import * as React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { GetPokemon, GetPokemonVariables } from "__generated__/GetPokemon";

interface SocialsProps {
  /** pokemon id */
  id: number;
}

const SocialShare = ({ id }: SocialsProps) => {
  const { loading, data, error } = useQuery<GetPokemon, GetPokemonVariables>(
    GET_POKEMON,
    {
      variables: { id },
    }
  );

  if (loading) return null;
  if (!data?.pokemon) return null;

  const url = "https://hov-pokedex.vercel.app/pokemons/" + data.pokemon.id;

  return (
    <React.Fragment>
      <HStack>
        <FacebookShareButton url={url} hashtag={data.pokemon.name}>
          <IconButton
            aria-label=""
            icon={<Icon w={3} h={3} as={FacebookIcon} fill="white" />}
            rounded="full"
            size="sm"
          />
        </FacebookShareButton>

        <TwitterShareButton url={url} hashtags={[data.pokemon.name]}>
          <IconButton
            aria-label=""
            icon={<Icon w={3} h={3} as={TwitterIcon} fill="white" />}
            rounded="full"
            size="sm"
          />
        </TwitterShareButton>

        <LinkedinShareButton url={url}>
          <IconButton
            aria-label=""
            icon={<Icon w={3} h={3} as={LinkedInIcon} fill="white" />}
            rounded="full"
            size="sm"
          />
        </LinkedinShareButton>
      </HStack>
    </React.Fragment>
  );
};

export default SocialShare;
