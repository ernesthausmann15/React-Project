/**
 * Normalize unknown thrown values into a safe user-facing message.
 * Never returns empty strings and never rethrows.
 */
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return "";
    }
    return error.message.trim() || fallback;
  }

  if (typeof error === "string" && error.trim()) {
    return error.trim();
  }

  return fallback;
}

export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}
