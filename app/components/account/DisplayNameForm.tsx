"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type Props = {
  user: User;
  initialDisplayName: string | null;
  onUpdate: (newName: string) => void;
};

export default function DisplayNameForm({
  user,
  initialDisplayName,
  onUpdate,
}: Props) {
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialDisplayName != null) {
      setDisplayName(initialDisplayName);
    }
  }, [initialDisplayName]);

  const handleSave = async () => {
    if (!displayName.trim()) return;

    setSaving(true);
    setStatus(null);
    setError(null);

    const { data: existing, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", displayName)
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
      .upsert({ id: user.id, display_name: displayName });

    if (error) {
      setError("Failed to update display name.");
    } else {
      setStatus("Display name updated!");
      onUpdate(displayName);
    }

    setSaving(false);
  };

  return (
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
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <button type="submit" disabled={saving} className="button">
        {saving ? "Saving..." : "Save Display Name"}
      </button>

      {status && <p className="text-green-600 text-sm">{status}</p>}
      {error && <p className="text-danger text-sm">{error}</p>}
    </form>
  );
}
