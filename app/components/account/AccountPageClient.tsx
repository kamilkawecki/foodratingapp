"use client";

import { useUser } from "@/lib/context/UserContext";
import LoginForm from "./LoginForm";
import MyAccount from "./MyAccount";
import Spinner from "../Spinner";

export default function AccountPageClient() {
  const { user, loading } = useUser();

  if (loading) return <Spinner />;

  return (
    <>
      <h1 className="heading-1 mb-6">{user ? "My Account" : "Login"}</h1>
      {user ? <MyAccount /> : <LoginForm />}
    </>
  );
}
