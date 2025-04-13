"use client";

import { useUser } from "@/lib/context/UserContext";
import LoginForm from "../components/account/LoginForm";
import MyAccount from "../components/account/MyAccount";
import Spinner from "../components/Spinner";

export default function AccountPage() {
  const { user, loading } = useUser();

  if (loading) return <Spinner />;

  return (
    <div className="max-w-xl w-full mx-auto p-6">
      <h1 className="heading-1 mb-6">{user ? "My Account" : "Login"}</h1>
      {user ? <MyAccount /> : <LoginForm />}
    </div>
  );
}
