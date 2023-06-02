import { PrismaClient, } from '@prisma/client'
import { faker } from "@faker-js/faker"
import { Pupil } from '~/models/pupil'
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

function generatePupils(n: number): Pupil[] {
  return [...Array(n).keys()].map(() => {
    let active = Math.random() < 0.9
    return {
      first_names: faker.person.firstName(),
      last_name: faker.person.lastName(),
      gender: faker.person.gender(),
      year: faker.number.int({min: -1, max: 6}),
      start_date: faker.date.soon(),
      end_date: !active ? faker.date.future(6) : undefined,
      active: active,
      more_able_and_talented: Math.random() < 0.05,
      free_school_meals: Math.random() < 0.3,
      looked_after_child: Math.random() < 0.15,
      additional_learning_needs: Math.random() < 0.2,
      english_as_additional_language: Math.random() < 0.2,
      notes: faker.lorem.lines()
    }
  })
}
