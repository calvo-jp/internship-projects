import Error from "components/Error";

const NotFound = () => {
  return (
    <Error
      title="ERROR 404"
      message="The page you are looking for does not exist"
      redirect="/"
    />
  );
};

export default NotFound;
