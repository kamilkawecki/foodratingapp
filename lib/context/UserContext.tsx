"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { User } from "@supabase/supabase-js";

type UserContextType = {
  user: User | null | undefined;
  displayName: string | null | undefined;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [displayName, setDisplayName] = useState<string | null | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();

      setDisplayName(profile?.display_name ?? null);
    } else {
      setDisplayName(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh(); // handles both initial session and display name

    // Listen to auth state changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);

      if (newUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", newUser.id)
          .single();

        setDisplayName(profile?.display_name ?? null);
      } else {
        setDisplayName(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <UserContext.Provider
      value={{ user, displayName, loading, refresh, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
}
