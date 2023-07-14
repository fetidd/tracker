import { Pupil, PupilSchema } from "./pupil"
import { Metric, MetricSchema } from "./metric"
import { Record } from "./record"
import { z } from "zod"

export const ExpandedRecordSchema = z.object({
  id: z.number(),
  pupil: z.custom<Pupil>(validatePupil),
  metric: z.custom<Metric>(validateMetric),
  score: z.number(),
  note: z.string().default(""),
  createdAt: z.coerce.date()
})

function validatePupil(input: any): boolean {
  return PupilSchema.safeParse(input).success
}

function validateMetric(input: any): boolean {
  return MetricSchema.safeParse(input).success
}

export type ExpandedRecord = z.infer<typeof ExpandedRecordSchema>

export function generateExpandedRecords(records: Record[], pupils: Pupil[], metrics: Metric[]): ExpandedRecord[] {
  // create maps of id to pupil/metric
  let pupilsMap = new Map(pupils.map(p => [p.id, p]))
  let metricsMap = new Map(metrics.map(m => [m.id, m]))
  let expRecs = records.map(r => ({
    pupil: pupilsMap.get(r.pupilId)!,
    metric: metricsMap.get(r.metricId)!,
    score: r.score,
    note: r.note,
    createdAt: r.createdAt,
    id: r.id
  }))
  return expRecs
}
