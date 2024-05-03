// Type guard to check for expected object structure
export function resultHandler(
  obj: any
): obj is { success: boolean; error: boolean; message: string } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "success" in obj &&
    "error" in obj &&
    "message" in obj
  );
}
