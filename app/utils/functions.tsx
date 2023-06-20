export function snakeCase(str: string): string {
  return str.replaceAll(" ", "_").toLowerCase()
}

export function sortPupils(a: any, b: any): number {
  let af: string = a.firstNames.toLowerCase()
  let al: string = a.lastName.toLowerCase()
  let bf: string = b.firstNames.toLowerCase()
  let bl: string = b.lastName.toLowerCase()
  if (al === bl) {
    if (af > bf) return 1
    else if (af < bf) return -1
    else return 0
  }
  if (al > bl) return 1
  else if (al < bl) return -1
  else return 0
}

