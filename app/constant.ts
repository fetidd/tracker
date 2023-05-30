export const APP_VERSION = "0.0.1";

export const YEARS = {
  "-1": "Nursery",
  0: "Reception",
  1: "Year 1",
  2: "Year 2",
  3: "Year 3",
  4: "Year 4",
  5: "Year 5",
  6: "Year 6",
}

export const MIN_YEAR = Math.min(...Object.keys(YEARS).map(Number))
export const MAX_YEAR = Math.max(...Object.keys(YEARS).map(Number))
