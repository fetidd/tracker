type Table = {
  create: (args: any) => any,
  update: (args: any) => any,
  findMany: (args?: any) => any,
  findFirst: (args: any) => any,
  delete: (args: any) => any,
  deleteMany: (args: any) => any
} | null

export interface IRepo {
  create: (data: any) => any,
  update: (id: number, data: any) => any,
  delete: (id: number) => any,
  deleteMany: (where: any) => any,
  read: () => any,
  readOne: (id: number) => any,
  readMany: (where: any) => any,
}

export abstract class AbstractRepo<DBType, NewType, UpdateType> implements IRepo {
  table: Table = null
  
  async create(data: NewType): Promise<DBType> {
    let res = await this.table!.create({data: data})
    return res
  }

  async update(id: number, data: UpdateType): Promise<DBType> {
    let res: DBType = await this.table!.update({where: {id: id}, data: data})
		return res
  }
  
  async read(): Promise<DBType[]> {
    let res: DBType[] = await this.table!.findMany()
		return res
  }
	
  async readOne(id: number): Promise<DBType> {
    let res: DBType = await this.table!.findFirst({where: {id: id}})
		return res
  }
	
  async readMany(where: any): Promise<DBType[]> {
    let res: DBType[] = await this.table!.findMany(where)
		return res
  }
  
  async delete(id: number):Promise<DBType> {
    let res = await this.table!.delete({where: {id: id}})
		return res
  } 
  
  async deleteMany(where: any):Promise<DBType> {
    let res = await this.table!.deleteMany(where)
		return res
  } 
}
