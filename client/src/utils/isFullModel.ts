export type WithIdOrFull<T> = string | T;

// Utility function to check if a value is the full model
export function isFullModel<T>(value: WithIdOrFull<T>): value is T {
  console.log(typeof value);
  return typeof value !== "string";
}

export function getWholeModel<T>(value: WithIdOrFull<T>): T | string {
  return value;
}
