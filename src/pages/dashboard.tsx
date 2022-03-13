import { Button } from "@chakra-ui/react";
import Protected from "components/Protected";
import { signOut, useSession } from "next-auth/react";

const Dashboard = () => {
  const { data } = useSession();

  return (
    <Protected>
      <div>
        <div>
          <code>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </code>
        </div>

        <Button onClick={() => signOut({ callbackUrl: "/login" })}>
          Logout
        </Button>
      </div>
    </Protected>
  );
};

export default Dashboard;
