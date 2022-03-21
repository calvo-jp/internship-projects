import { useLazyQuery } from "@apollo/client";
import { PROFILE } from "graphql/auth-api/queries";
import { useSession } from "next-auth/react";
import * as React from "react";
import { Profile } from "__generated__/Profile";

interface IProfile {
  name: string;
  email: string;
  image?: string;
}

// typescript does not know how to handle this
// type-checking should be bypassed
type UserProfile =
  | { loading: true; profile: undefined }
  | { loading: false; profile: IProfile };

const useProfile = (): UserProfile => {
  const session = useSession({ required: true });
  const [profile, setProfile] = React.useState<IProfile>();
  const [fetchProfile, { loading }] = useLazyQuery<Profile>(PROFILE, {
    context: {
      client: "auth",
    },
  });

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
    if (session.status === "loading") return;
    if (session.data.user.__auth_method__ === "oauth")
      return setProfile(session.data.user);
    getServerProfile();
  }, [getServerProfile, session]);

  // please see comment above
  // @ts-expect-error
  return {
    profile,
    loading:
      // getting session
      session.status === "loading" ||
      // fetching server profile
      loading ||
      // profile might be loaded later
      // even after session is already loaded or fetching is done.
      // this will inform them that it is not yet ready
      !profile,
  };
};

export default useProfile;
