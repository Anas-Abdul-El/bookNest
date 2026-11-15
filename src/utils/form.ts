// The accessibility attributes a form field needs when it has an error:
// marks it invalid and links it to the error message below it.
export function fieldErrorProps(id: string, error?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId(id) : undefined,
  };
}

export function errorId(fieldId: string): string {
  return `${fieldId}-error`;
}
