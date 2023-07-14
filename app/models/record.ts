import { z } from "zod"
import { zfd } from "zod-form-data"

// BASE RECORD
// ===========
const BaseRecord = {
	pupilId: z.number(),
	metricId: z.number(),
	score: z.number(),
	note: z.string().default(""),
	createdAt: z.date().default(new Date())
}

const BaseRecordForm = {
	pupilId: zfd.numeric(BaseRecord.pupilId),
	metricId: zfd.numeric(BaseRecord.metricId),
	score: zfd.numeric(BaseRecord.score),
	note: zfd.text(BaseRecord.note),
	createdAt: zfd.text(z.string())
}

export const RecordSchema = z.object({...BaseRecord, id: z.number()})
export type Record = z.infer<typeof RecordSchema>

// NEW RECORD
// ==========
const NewRecord = {
  ...BaseRecord
}
const NewRecordForm = {
  ...BaseRecordForm
}

export const NewRecordSchema = z.object(NewRecord)
export const NewRecordFormSchema = zfd.formData(NewRecordForm)
export type NewRecord = z.infer<typeof NewRecordSchema>


// RECORD UPDATE
// =============
const RecordUpdate = {
  ...BaseRecord,
  id: z.number(),
}
const RecordUpdateForm = {
  ...BaseRecordForm,
  id: zfd.numeric(RecordUpdate.id),
}

export const RecordUpdateSchema = z.object(RecordUpdate)
export const RecordUpdateFormSchema = zfd.formData(RecordUpdateForm)
export type RecordUpdate = z.infer<typeof RecordUpdateSchema>
