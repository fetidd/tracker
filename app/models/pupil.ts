import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { MAX_YEAR, MIN_YEAR } from '~/constant'

const BasePupilSchema = {
  id: z.number().optional(),
  first_names: z.string().min(1, "cannot have empty first names"),
  last_name: z.string().min(1, "cannot have empty last name"),
  gender: z.string().min(1, "cannot have empty gender"),
  year: z.number().min(MIN_YEAR).max(MAX_YEAR), // get min and max valid years from constant
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional(),
  notes: z.string().optional(),
  active: z.boolean().default(true),
  more_able_and_talented: z.boolean().default(false),
  free_school_meals: z.boolean().default(false),
  english_as_additional_language: z.boolean().default(false),
  looked_after_child: z.boolean().default(false),
  additional_learning_needs: z.boolean().default(false),
}

export const PupilSchema = z.object(BasePupilSchema)
export type Pupil = z.infer<typeof PupilSchema>

export const PupilFormDataSchema = zfd.formData({ 
  first_names: zfd.text(BasePupilSchema.first_names),
  last_name: zfd.text(BasePupilSchema.last_name),
  gender: zfd.text(BasePupilSchema.gender),
  year: zfd.numeric(BasePupilSchema.year),
  start_date: zfd.text(BasePupilSchema.start_date),
  end_date: zfd.text(BasePupilSchema.end_date),
  notes: zfd.text(BasePupilSchema.notes),  
  active: zfd.checkbox(),
  more_able_and_talented: zfd.checkbox(),
  free_school_meals: zfd.checkbox(),
  english_as_additional_language: zfd.checkbox(),
  looked_after_child: zfd.checkbox(),
  additional_learning_needs: zfd.checkbox(),
})
export type PupilFormData = z.infer<typeof PupilFormDataSchema>

export function pupilFromJson(j: any): Pupil {
  try { 
    return {
      first_names: j.first_names,
      last_name: j.last_name,
      gender: j.gender,
      year: j.year,
      start_date: new Date(j.start_date),
      end_date: j.end_date ? new Date(j.end_date) : undefined,
      more_able_and_talented: j.more_able_and_talented,
      english_as_additional_language: j.english_as_additional_language,
      additional_learning_needs: j.additional_learning_needs,
      looked_after_child: j.looked_after_child,
      free_school_meals: j.free_school_meals,
      active: j.active
    }
  } catch {
    throw Error("wasn't provided a valid pupil json")
  }
}
