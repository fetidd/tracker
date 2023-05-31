export interface FieldSpec {
  name: string,
  type: string, 
  default?: string | number| boolean | null
}

export const PUPIL_FIELDS: FieldSpec[] = [
  { name: "First names", type: "text", default: ""},
  { name: "Last name", type: "text", default: "" },
  { name: "Year", type: "number", default: 1},
  { name: "Gender", type: "text", default: "" },
  { name: "Active", type: "checkbox", default: true },
  { name: "More able and talented", type: "checkbox", default: false},
  { name: "Additional learning needs", type: "checkbox", default: false},
  { name: "English as additional language", type: "checkbox", default: false },
  { name: "Free school meals", type: "checkbox", default: false },
  { name: "Looked after child", type: "checkbox", default: false },
  { name: "Start date", type: "date", default: null },
  { name: "End date", type: "date", default: null },
];

export const USER_FIELDS: FieldSpec[] = [
  { name: "First names", type: "text"},
]

export const METRIC_FIELDS = [
  { name: "Name", type: "text" },
  { name: "Description", type: "textarea" },
  { name: "Score 1", type: "text" },
  { name: "Score 2", type: "text" },
  { name: "Score 3", type: "text" },
  { name: "Score 4", type: "text" },
];
