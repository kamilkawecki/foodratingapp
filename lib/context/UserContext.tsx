"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { User } from "@supabase/supabase-js";

type UserContextType = {
  user: User | null | undefined;
  displayName: string | null | undefined;
  setDisplayName: (name: string) => void;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [displayName, setDisplayName] = useState<string | null | undefined>(
    undefined
  );

  useEffect(() => {
    // Initial session fetch
    supabase.auth.getSession().then(async ({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", sessionUser.id)
          .single();

        setDisplayName(profile?.display_name ?? null);
      } else {
        setDisplayName(null);
      }
    });

    // Listen to auth changes
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
    <UserContext.Provider value={{ user, displayName, setDisplayName, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
}
