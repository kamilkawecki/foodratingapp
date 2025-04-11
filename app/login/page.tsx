"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import type { User } from "@supabase/supabase-js";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Get existing displayName if logged in
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", user.id)
          .single();

        if (data?.display_name) {
          setDisplayName(data.display_name);
        }
      }
    };

    loadProfile();
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    else router.push("/");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleSetDisplayName = async () => {
    if (!user) return;
    if (!displayName.trim()) return;

    // Check if display name is unique
    const { data: existing, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", displayName)
      .neq("id", user.id);

    if (checkError) {
      setError("Failed to check display name.");
      return;
    }

    if (existing?.length > 0) {
      setError("This display name is already taken.");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, display_name: displayName });

    if (error) setError("Failed to update display name.");
    else setStatus("Display name updated!");
  };

  if (!user) {
    return (
      <div className="max-w-sm mx-auto p-6">
        <h1 className="text-2xl font-heading font-semibold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="w-full bg-accent text-white py-3 rounded-lg">
            Log In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="heading-1 mb-6">My Account</h1>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Logged in as <b>{user.email}</b>
        </p>
      </div>

      <div className="space-y-2 mb-6">
        <label className="block">Display Name</label>
        <input
          type="text"
          placeholder="Display Name"
          className="w-full border border-gray-300 rounded-lg p-3"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button className="button" onClick={handleSetDisplayName}>
          Save Display Name
        </button>
        {status && <p className="text-green-600 text-sm">{status}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      <button onClick={handleLogout} className="button">
        Log out
      </button>
    </div>
  );
}
