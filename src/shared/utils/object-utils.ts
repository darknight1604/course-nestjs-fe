export function cleanObject<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  const cleaned: Partial<T> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      !(typeof value === "string" && value.trim() === "")
    ) {
      cleaned[key as keyof T] = value as T[keyof T];
    }
  });

  return cleaned;
}
