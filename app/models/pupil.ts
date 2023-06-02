import { RefinementCtx, z } from 'zod'
import { zfd } from 'zod-form-data'
import { MAX_YEAR, MIN_YEAR } from '~/constant'

const BasePupilSchema = {
  id: z.number().optional(),
  firstNames: z.string().min(1, "cannot have empty first names"),
  lastName: z.string().min(1, "cannot have empty last name"),
  gender: z.string().min(1, "cannot have empty gender"),
  year: z.number().min(MIN_YEAR).max(MAX_YEAR), // get min and max valid years from constant
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  notes: z.string().optional(),
  active: z.boolean().default(true),
  mat: z.boolean().default(false),
  fsm: z.boolean().default(false),
  eal: z.boolean().default(false),
  lac: z.boolean().default(false),
  aln: z.boolean().default(false),
}
export const PupilSchema = z.object(BasePupilSchema)
export type Pupil = z.infer<typeof PupilSchema>

const BasePupilFormSchema = {
  firstNames: zfd.text(BasePupilSchema.firstNames),
  lastName: zfd.text(BasePupilSchema.lastName),
  gender: zfd.text(BasePupilSchema.gender),
  year: zfd.numeric(BasePupilSchema.year),
  startDate: zfd.text(BasePupilSchema.startDate),
  endDate: zfd.text(BasePupilSchema.endDate),
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
function checkActiveEndDate({active, endDate}: Pupil, ctx: RefinementCtx) {
  let issue = {path: ["endDate"], message: null, code: z.ZodIssueCode.custom}
  if (active && endDate !== undefined) {
    ctx.addIssue({...issue, message: "Active pupils cannot have an end date"})
  }
  if (!active && endDate === undefined) {
    ctx.addIssue({...issue, message: "Inactive pupils must have an end date"})
  }
}
export const NewPupilFormSchema = zfd.formData(BasePupilFormSchema)
  .superRefine(checkActiveEndDate)
export const UpdatePupilFormSchema = zfd.formData({...BasePupilFormSchema, id: zfd.numeric(z.number())})
  .superRefine(checkActiveEndDate)

/** Turn a JSON pupil into a Pupil */
export function pupilFromJson(j: any): Pupil {
  try { 
    return {
      ...j,
      startDate: new Date(j.startDate),
      endDate: j.end_date ? new Date(j.endDate) : undefined,
    }
  } catch (e) {
    throw Error(`wasn't provided a valid pupil json: ${e}`)
  }
}
