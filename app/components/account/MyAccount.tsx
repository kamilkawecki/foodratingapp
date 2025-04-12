"use client";

import { useUser } from "@/lib/context/UserContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function MyAccount() {
  const { user, displayName, refresh, logout } = useUser();
  const router = useRouter();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (displayName != null) setName(displayName);
  }, [displayName]);

  const handleSave = async () => {
    if (!name.trim() || !user) return;

    setSaving(true);
    setStatus(null);
    setError(null);

    const { data: existing, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", name)
      .neq("id", user.id);

    if (checkError) {
      setError("Failed to check display name.");
      setSaving(false);
      return;
    }

    if (existing?.length > 0) {
      setError("This display name is already taken.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, display_name: name });

    if (error) {
      setError("Failed to update display name.");
    } else {
      setStatus("Display name updated!");
      await refresh();
    }

    setSaving(false);
  };

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <>
      <p className="text-sm text-gray-600 mb-2">
        Logged in as <b>{user?.email}</b>
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-2 mb-6"
      >
        <label className="block">Display Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={saving} className="button">
          {saving ? "Saving..." : "Save Display Name"}
        </button>

        {status && <p className="text-green-600 text-sm">{status}</p>}
        {error && <p className="text-danger text-sm">{error}</p>}
      </form>

      <button onClick={handleLogout} className="button">
        Log out
      </button>
    </>
  );
}
