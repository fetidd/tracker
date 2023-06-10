import { RefinementCtx, z } from 'zod'
import { zfd } from 'zod-form-data'
import { YEARS } from '~/constant'
import { MAX_YEAR, MIN_YEAR } from '~/constant'

const BasePupilSchema = {
  id: z.number().optional(),
  firstNames: z
    .string({ required_error: "Learner must have at least one first name" })
    .min(1, "cannot have empty first names"),
  lastName: z
    .string({ required_error: "Learner must have a last name" })
    .min(1, "Cannot have empty last name"),
  gender: z
    .string({ required_error: "Learner must have a gender" })
    .min(1, "Cannot have empty gender"),
  year: z
    .number({ required_error: `Learner needs a year group (${MIN_YEAR} to ${MAX_YEAR})`})
    .min(MIN_YEAR, `${MIN_YEAR} (${YEARS[MIN_YEAR.toString() as keyof typeof YEARS]}) is the lowest year allowed`)
    .max(MAX_YEAR, `${MAX_YEAR} (${YEARS[MAX_YEAR.toString() as keyof typeof YEARS]}) is the highest year allowed`), // get min and max valid years from constant
  startDate: z.date({ errorMap: (error, ctx) => { // TODO add required messages to both dates
    return {message: error.code == "invalid_date" ? "Learner must have a start date" : ctx.defaultError}
  },coerce: true }),
  endDate: z.date({coerce: true}).nullable(),
  notes: z.string().optional(),
  active: z.boolean(),
  mat: z.boolean(),
  fsm: z.boolean(),
  eal: z.boolean(),
  lac: z.boolean(),
  aln: z.boolean(),
}
export const PupilSchema = z.object(BasePupilSchema)
export type Pupil = z.infer<typeof PupilSchema>

const BasePupilFormSchema = {
  firstNames: zfd.text(BasePupilSchema.firstNames),
  lastName: zfd.text(BasePupilSchema.lastName),
  gender: zfd.text(BasePupilSchema.gender),
  year: zfd.numeric(BasePupilSchema.year),
  startDate: zfd.text(z.string()),
  endDate: zfd.text(z.string().optional()),
  notes: zfd.text(BasePupilSchema.notes),
  active: zfd.checkbox(),
  mat: zfd.checkbox(),
  fsm: zfd.checkbox(),
  eal: zfd.checkbox(),
  lac: zfd.checkbox(),
  aln: zfd.checkbox(),
}

/** Zod refinement to ensure a Pupil cannot be created or 
  * updated to be active with an end date */
function checkActiveEndDate({ active, endDate }: any, ctx: RefinementCtx) {
  let issue = { path: ["endDate"], message: null, code: z.ZodIssueCode.custom }
  if (active && endDate !== undefined) {
    ctx.addIssue({ ...issue, message: "Active pupils cannot have an end date" })
  }
  if (!active && (endDate === undefined)) {
    ctx.addIssue({ ...issue, message: "Inactive pupils must have an end date" })
  }
}
export const NewPupilFormSchema = zfd.formData(BasePupilFormSchema)
  .superRefine(checkActiveEndDate)
export const UpdatePupilFormSchema = zfd.formData({ ...BasePupilFormSchema, id: zfd.numeric(z.number()) })
  .superRefine(checkActiveEndDate)

export const parsePupil = (x: any) => {
  return PupilSchema.parse(x) // TODO how can I make the argument be something better than 'any'
}
