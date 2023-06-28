import { json, redirect } from "@remix-run/node"
import { ZodSchema } from "zod"
import AbstractRepo from "~/repos/repo"
import { routes } from "~/routes"

export async function handleNew<DBType, NewType>(schema: ZodSchema, formData: FormData, repo: AbstractRepo<DBType, NewType, any>) {
  let val = schema.safeParse(formData)
  if (val.success) {
    let ent: DBType = await repo.create(val.data)
    return json({success: true, entity: ent, errors: []})
  } else {
    return json({success: false, entity: null, errors: val.error.issues.map(i => {return {path: i.path, message: i.message}}), metric: null}, {status: 400})
  }
}

export async function handleUpdate<DBType, UpdateType>(schema: ZodSchema, formData: FormData, repo: AbstractRepo<DBType, any, UpdateType>) {
  let val = schema.safeParse(formData)
  if (val.success) {
    let ent: DBType = await repo.update(val.data.id, val.data)
    return json({success: true, entity: ent, errors: []})
  } else {
    return json({success: false, entity: null, errors: val.error.issues.map(i => {return {path: i.path, message: i.message}}), metric: null}, {status: 400})
  }
}

export async function handleFetchAll<DBType>(repo: AbstractRepo<DBType, any, any>) {
  let res: DBType[] = await repo.read()
  if (res) {
    return json(res)
  } else {
    return redirect(routes.index())
  }
}

export async function handleFetchOne<DBType>(id: number, repo: AbstractRepo<DBType, any, any>) {
  let res: DBType = await repo.readOne(id)
  if (res) {
    return json(res)
  } else {
    return redirect(routes.index())
  }
}

export async function handleFetchMany<DBType>(where: any, repo: AbstractRepo<DBType, any, any>) {
  let res: DBType[] = await repo.readMany(where)
  if (res) {
    return json(res)
  } else {
    return redirect(routes.index())
  }
}

export async function handleDelete<DBType>(id: number, repo: AbstractRepo<DBType, any, any>) {
  let res = await repo.delete(id)
  return res
}
