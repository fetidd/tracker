type Table = {
  create: (args: any) => any,
  update: (args: any) => any,
  findMany: (args?: any) => any,
  findFirst: (args: any) => any,
  delete: (args: any) => any,
} | null

export default abstract class AbstractRepo<DBType, NewType, UpdateType> {
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
}
