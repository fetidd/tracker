export function snakeCase(str: string): string {
  return str.replaceAll(" ", "_").toLowerCase()
}

export function sortPupils(a: any, b: any): number {
  if (a.lastName == b.lastName) {
    if (a.firstNames > b.firstNames) return 1
    else if (a.firstNames < b.firstNames) return -1
    else return 0
  }
  if (a.lastName > b.lastName) return 1
  else if (a.lastName < b.lastName) return -1
  else return 0
}

