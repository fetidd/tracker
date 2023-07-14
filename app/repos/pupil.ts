import { db } from "~/db/db.server"
import { PupilUpdate, NewPupil } from "~/models/pupil"
import { Pupil } from "@prisma/client"
import { AbstractRepo } from "./repo"

export default class PupilRepo extends AbstractRepo<Pupil, NewPupil, PupilUpdate> {
	constructor() {
		super()
		this.table = db.pupil
	}

	async create(data: NewPupil): Promise<Pupil> {
		data = {
			...data,
			startDate: new Date(data.startDate),
			endDate: data.endDate ? new Date(data.endDate) : null
		}
		return await super.create(data)
  }
	
	async update(id: number, data: PupilUpdate): Promise<Pupil> {
		data = {
			...data,
			startDate: new Date(data.startDate),
			endDate: data.endDate ? new Date(data.endDate) : null
		}
		return await super.update(id, data)
  }
}
