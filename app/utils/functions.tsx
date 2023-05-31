export function snakeCase(str: string): string {
  return str.replaceAll(" ", "_").toLowerCase()
}

