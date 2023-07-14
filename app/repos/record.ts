import { db } from "~/db/db.server";
import { AbstractRepo } from "./repo";
import { Record } from "@prisma/client"
import { NewRecord, RecordUpdate } from "~/models/record";

export default class RecordRepo extends AbstractRepo<Record, NewRecord, RecordUpdate> {
	constructor() {
		super()
		this.table = db.record
	}

	async create(data: NewRecord) {
		data = {
			...data,
			createdAt: new Date(data.createdAt)
		}
		return await super.create(data)
	}
	
	async update(id: number, data: RecordUpdate) {
		data = {
			...data,
			createdAt: new Date(data.createdAt)
		}
		return await super.update(id, data)
	}
}