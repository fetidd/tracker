import { Metric, Pupil, User } from "@prisma/client"

export interface FieldSpec<T> {
  field: keyof T,
  label: string,
  type: string, 
  default?: string | number| boolean | null
}

export const PUPIL_FIELDS: FieldSpec<Pupil>[] = [
  { field: "firstNames", label: "First names", type: "text", default: ""},
  { field: "lastName", label: "Last name", type: "text", default: "" },
  { field: "year", label: "Year", type: "number", default: 1},
  { field: "gender", label: "Gender", type: "text", default: "" },
  { field: "active", label: "Active", type: "checkbox", default: true },
  { field: "mat", label: "More able and talented", type: "checkbox", default: false},
  { field: "aln", label: "Additional learning needs", type: "checkbox", default: false},
  { field: "eal", label: "English as additional language", type: "checkbox", default: false },
  { field: "fsm", label: "Free school meals", type: "checkbox", default: false },
  { field: "lac", label: "Looked after child", type: "checkbox", default: false },
  { field: "startDate", label: "Start date", type: "date", default: null },
  { field: "endDate", label: "End date", type: "date", default: null },
];

export const USER_FIELDS: FieldSpec<User>[] = [
  { field: "firstNames", label: "First names", type: "text"},
]

export const METRIC_FIELDS: FieldSpec<Metric>[] = [
  { field: "name", label: "Name", type: "text" },
  { field: "description", label: "Description", type: "textarea" },
  { field: "score1", label: "Score 1", type: "text" },
  { field: "score2", label: "Score 2", type: "text" },
  { field: "score3", label: "Score 3", type: "text" },
  { field: "score4", label: "Score 4", type: "text" },
];
