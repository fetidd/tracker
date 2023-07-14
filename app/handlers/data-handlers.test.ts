import { Pupil } from "@prisma/client"
import { FormData } from "@remix-run/node"
import { HandlerResponse, handleNew, handleUpdate } from "~/handlers/data-handlers"
import { MockRepo } from "~/mock-repo"
import { NewPupil, NewPupilFormSchema, PupilUpdate, PupilUpdateFormSchema } from "~/models/pupil"

class MockPupilRepo extends MockRepo<Pupil, NewPupil, PupilUpdate> {
  create = (data: NewPupil)  => {
    let rec = {
      ...data, 
      startDate: new Date(data.startDate), 
      id: ++this.currId, 
      notes: data.notes || "", 
      endDate: data.endDate ? new Date(data.endDate) : null
    }
    this.store.push(rec)
    return rec
  }
  
  update = (id: number, update: PupilUpdate) => {
    let index = this.store.findIndex(r => r.id === id)
    if (index > -1) {
      this.store[index] = {
        ...this.store[index], 
        ...update,
        startDate: new Date(update.startDate),
        endDate: update.endDate ? new Date(update.endDate) : null
      }
      return this.store[index]
    } else {
      return undefined // TODO check if this is correct
    }
  }
  
  delete = () => null
  
  deleteMany = () => null
  
  read = () => null
  
  readOne = () => null
  
  readMany = () => null
}

const testPupil = {firstNames: "Ben", lastName: "Jones", gender: "male", year: 6, startDate: new Date("2021-01-01"), endDate: null, active: true, mat: false, lac: false, aln: false, eal: false, fsm: false, notes: "", id: 1}

describe("handlers/data-handlers", () => {
  test("handleNew<Pupil, NewPupil>", async () => {
    let tests: [any, HandlerResponse][] = [
      [[["firstNames", "Ben"]], {success: false, errors: [
        {message: "Learner must have a last name", path: ["lastName"]},
        {message: "Learner must have a gender", path: ["gender"]},
        {message: "Learner needs a year group (-1 to 6)", path: ["year"]},
        {message: "Required", path: ["startDate"]}, // TODO the actual form always sends a startdate of some kind so this never gets seen, but fix anyway
      ]}],
      [[["firstNames", "Ben"],["lastName", "Jones"],["gender", "male"],["year","6"],["startDate","2021-01-01"]], {success: false, errors: [
        {message: "Inactive pupils must have an end date", path: ["endDate"]}
      ]}],
      [[["firstNames", "Ben"],["lastName", "Jones"],["gender", "male"],["year","6"],["startDate","2021-01-01"],["active","on"]], {success: true, entity: testPupil}],
    ]
    for (let [data, response] of tests) {
      let formdata = new FormData()
      for (let [k, v] of data) {
        formdata.append(k, v)
      }
      let mock = new MockPupilRepo()
      expect(await handleNew(NewPupilFormSchema, formdata, mock)).toStrictEqual(response)
    }
  })
})

describe("handlers/data-handlers", () => {
  test("handleUpdate<Pupil, PupilUpdate>", async () => {
    let tests: [any, HandlerResponse][] = [
      [[["firstNames", "Ben"],["lastName", "Jones"],["gender", "male"],["year","6"],["startDate","2021-01-01"],["active","on"],["id","1"]], {success: true, entity: testPupil}],
      [[["firstNames", "Ben"],["lastName", "Jones"],["gender", "female"],["year","3"],["startDate","2021-01-01"],["active","on"],["id","1"],["lac","on"]], {success: true, entity: {...testPupil, lac: true, gender: "female", year: 3}}],
    ]
    for (let [data, response] of tests) {
      let formdata = new FormData()
      for (let [k, v] of data) {
        formdata.append(k, v)
      }
      let mock = new MockPupilRepo([testPupil])
      expect(await handleUpdate(PupilUpdateFormSchema, formdata, mock)).toStrictEqual(response)
    }
  })
})
