"use client";

import { useUser } from "@/lib/hooks/useUser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DisplayNameForm from "../components/account/DisplayNameForm";

export default function LoginPage() {
  const router = useRouter();
  const { user, displayName, setDisplayName, logout } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    else router.refresh();
  };

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  if (!user) {
    return (
      <div className="max-w-sm mx-auto p-6">
        <h1 className="heading-1 mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-danger">{error}</p>}
          <button className="button">Log In</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="heading-1 mb-6">My Account</h1>

      <p className="text-sm text-gray-600 mb-2">
        Logged in as <b>{user.email}</b>
      </p>

      <DisplayNameForm
        user={user}
        initialDisplayName={displayName ?? null}
        onUpdate={setDisplayName}
      />

      <button onClick={handleLogout} className="button">
        Log out
      </button>
    </div>
  );
}
