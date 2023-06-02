import { PrismaClient, } from '@prisma/client'
import { faker } from "@faker-js/faker"
const prisma = new PrismaClient()
async function main() {
  await prisma.pupil.deleteMany()
  await prisma.pupil.createMany({data: generatePupils(10)})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

function generatePupils(n: number) {
  return [...Array(n).keys()].map(() => {
    let active = Math.random() < 0.9
    return {
      firstNames: faker.person.firstName(),
      lastName: faker.person.lastName(),
      gender: faker.person.gender(),
      year: faker.number.int({min: -1, max: 6}),
      startDate: faker.date.soon(),
      endDate: !active ? faker.date.future(6) : undefined,
      active: active,
      mat: Math.random() < 0.05,
      fsm: Math.random() < 0.3,
      lac: Math.random() < 0.15,
      aln: Math.random() < 0.2,
      eal: Math.random() < 0.2,
      notes: faker.lorem.lines()
    }
  })
}
