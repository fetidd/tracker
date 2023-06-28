import { db } from "~/db/db.server"
import { MetricUpdate, NewMetric } from "~/models/metric"
import { Metric } from "@prisma/client"
import AbstractRepo from "./repo"

export default class MetricRepo extends AbstractRepo<Metric, NewMetric, MetricUpdate> {
	constructor() {
		super()
		this.table = db.metric
	}
  async create(data: NewMetric): Promise<Metric> {
    let metric = this.parseNewFormData(data)
    let res = await super.create(metric)
    return res
  }

  async update(id: number, data: MetricUpdate): Promise<Metric> {
    let update = this.parseUpdateFormData(data)
    let res = await super.update(id, update)
		return res
  }
  
  private parseUpdateFormData(data: MetricUpdate): MetricUpdate {
    return {
      ...data, 
      score1desc: data.score1desc || "",
      score2desc: data.score2desc || "",
      score3desc: data.score3desc || "",
      score4desc: data.score4desc || "",
      description: data.description || "",
    }
  }
  private parseNewFormData(data: NewMetric): NewMetric {
    return {
      ...data,
      score1desc: data.score1desc || "",
      score2desc: data.score2desc || "",
      score3desc: data.score3desc || "",
      score4desc: data.score4desc || "",
      description: data.description || "",
    }
  }
}
