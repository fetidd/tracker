import { IRepo } from "~/repos/repo"

export abstract class MockRepo<DB, New, Update> implements IRepo {
  currId: number = 0
  store: DB[]
  constructor(store?: DB[]) {
    this.store = store ? store : []
  }
  abstract create: (data: New) => DB
  abstract update: (id: number, data: Update) => DB | undefined
  abstract delete: (id: number) => DB | null
  abstract deleteMany: (where: any) => DB[] | null
  abstract read: () => DB[] | null
  abstract readOne: (id: number) => DB | null
  abstract readMany: (where: any) => DB[] | null
}
