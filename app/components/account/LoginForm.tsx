"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/context/UserContext";

export default function LoginForm() {
  const { refresh } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      await refresh();
    }
    setSubmitting(false);
  };

  return (
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
      <button type="submit" disabled={submitting} className="button">
        {submitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
