import { z } from 'zod'
import { zfd } from 'zod-form-data'

// BASE METRIC
// ===========
const BaseMetric = {
  name: z.string({required_error: "Metric name is required"}),
  description: z.string().optional(),
  score1: z.string({required_error: "Score 1 needs a name"}),
  score1desc: z.string().optional(),
  score2: z.string({required_error: "Score 2 needs a name"}),
  score2desc: z.string().optional(),
  score3: z.string({required_error: "Score 3 needs a name"}),
  score3desc: z.string().optional(),
  score4: z.string({required_error: "Score 4 needs a name"}),
  score4desc: z.string().optional(),
}

const BaseMetricForm = {
  name: zfd.text(BaseMetric.name),
  description: zfd.text(BaseMetric.description).optional(),
  score1: zfd.text(BaseMetric.score1),
  score1desc: zfd.text(BaseMetric.score1desc).catch(""),
  score2: zfd.text(BaseMetric.score2),
  score2desc: zfd.text(BaseMetric.score2desc),
  score3: zfd.text(BaseMetric.score3),
  score3desc: zfd.text(BaseMetric.score3desc),
  score4: zfd.text(BaseMetric.score4),
  score4desc: zfd.text(BaseMetric.score4desc),
}

// NEW METRIC
// ==========
const NewMetric = {
  ...BaseMetric
}
const NewMetricForm = {
  ...BaseMetricForm
}

export const NewMetricSchema = z.object(NewMetric)
export const NewMetricFormSchema = zfd.formData(NewMetricForm)
export type NewMetric = z.infer<typeof NewMetricSchema>


// METRIC UPDATE
// =============
const MetricUpdate = {
  ...BaseMetric,
  id: z.number(),
}
const MetricUpdateForm = {
  ...BaseMetricForm,
  id: zfd.numeric(MetricUpdate.id),
}

export const MetricUpdateSchema = z.object(MetricUpdate)
export const MetricUpdateFormSchema = zfd.formData(MetricUpdateForm)
export type MetricUpdate = z.infer<typeof MetricUpdateSchema>

