import Link from "next/link";

const Landing = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/api/auth/login" passHref>
            <a>Login</a>
          </Link>
        </li>

        <li>
          <Link href="/api/auth/logout" passHref>
            <a>Logout</a>
          </Link>
        </li>

        <li>
          <Link href="/api/auth/register" passHref>
            <a>Create Account</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Landing;
