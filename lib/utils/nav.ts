export function getAuthLabel(
  displayName?: string | null,
  email?: string | null
): string {
  if (displayName === undefined) return "Login";
  return displayName || email || "Login";
}
