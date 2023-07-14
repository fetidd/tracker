import { ZodSchema } from "zod"
import { AbstractRepo, IRepo } from "~/repos/repo"

export type HandlerResponse = 
  | {success: true, entity: any}
  | {success: false, errors: any[]}

export async function handleNew<DBType>(schema: ZodSchema, formData: FormData, repo: IRepo): Promise<HandlerResponse> {
  let val = schema.safeParse(formData)
  if (val.success) {
    let ent: DBType = await repo.create(val.data)
    return {success: true, entity: ent}
  } else {
    return {success: false, errors: val.error.issues.map(i => {return {path: i.path, message: i.message}})}
  }
}

export async function handleUpdate<DBType>(schema: ZodSchema, formData: FormData, repo: IRepo): Promise<HandlerResponse> {
  let val = schema.safeParse(formData)
  if (val.success) {
    let ent: DBType = await repo.update(val.data.id, val.data)
    return {success: true, entity: ent}
  } else {
    return {success: false, errors: val.error.issues.map(i => {return {path: i.path, message: i.message}})}
  }
}

export async function handleFetchAll<DBType>(repo: IRepo): Promise<HandlerResponse> {
  let res: DBType[] = await repo.read()
  if (res) {
    return {success: true, entity: res}
  } else {
    return {success: false, errors: [{message: "handler error"}]}
  }
}

export async function handleFetchOne<DBType>(id: number, repo: IRepo): Promise<HandlerResponse> {
  let res: DBType = await repo.readOne(id)
  if (res) {
    return {success: true, entity: res}
  } else {
    return {success: false, errors: [{message: "handler error"}]}
  }
}

export async function handleFetchMany<DBType>(where: any, repo: IRepo): Promise<HandlerResponse> {
  let res: DBType[] = await repo.readMany(where)
  if (res) {
    return {success: true, entity: res}
  } else {
    return {success: false, errors: [{message: "handler error"}]}
  }
}

export async function handleDelete<DBType>(where: number | any, repo: IRepo): Promise<HandlerResponse> {
  let res: DBType = typeof where == "number" ? await repo.delete(where) : await repo.deleteMany(where)
  if (res) {
    return {success: true, entity: res}
  } else {
    return {success: false, errors: [{message: "handler error"}]}
  }
}
