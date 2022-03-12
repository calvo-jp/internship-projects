/* eslint-disable @next/next/no-img-element */
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

const Dashboard = () => {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) return <div>Something went wrong.</div>;

  return (
    <div>
      <div>{user.name}</div>
      {user.picture && <img src={user.picture} alt="" />}
    </div>
  );
};

export default Dashboard;
