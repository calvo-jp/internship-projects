import { useLazyQuery } from "@apollo/client";
import { PROFILE } from "graphql/auth-api/queries/users";
import { useSession } from "next-auth/react";
import * as React from "react";
import { Profile } from "__generated__/Profile";

interface IProfile {
  name: string;
  email: string;
  image?: string;
}

const useProfile = () => {
  const session = useSession();
  const [fetchProfile, { loading }] = useLazyQuery<Profile>(PROFILE);
  const [profile, setProfile] = React.useState<IProfile>();

  const getServerProfile = React.useCallback(async () => {
    const result = await fetchProfile();
    if (!result.data) return;
    const details = result.data.me;
    setProfile({
      name: details.firstname + " " + details.lastname,
      email: details.email,
    });
  }, [fetchProfile]);

  React.useEffect(() => {
    if (session.status !== "authenticated") return;
    if (session.data.user.__auth_method__ === "oauth")
      return setProfile(session.data.user);
    getServerProfile();
  }, [getServerProfile, session]);

  return {
    loading: loading || session.status === "loading",
    profile,
  };
};

export default useProfile;