import Link from "next/link";

const Index = () => {
  return (
    <>
      <Link href="/auth/register">Register Page</Link>
      <Link href="/auth/login">Login Page</Link>
    </>
  );
};

export default Index;
