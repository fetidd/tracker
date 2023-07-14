import { PrismaClient, } from '@prisma/client'
import { faker } from "@faker-js/faker"
const prisma = new PrismaClient()
async function main() {
  await prisma.record.deleteMany()
  await prisma.pupil.deleteMany()
  await prisma.metric.deleteMany()
  generatePupils(40).forEach(async pupil => await prisma.pupil.create({data: pupil}))
  generateMetrics().forEach(async metric => await prisma.metric.create({data: metric}))
  generateRecords().then(res => res.forEach(async record => await prisma.record.create({data: record})))
}

//=======================================================
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
      gender: Math.random() < 0.5 ? "Male" : "Female",
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

function generateMetrics() {
  return [...Array(7).keys()].map(() => {
    return {
      name: faker.word.noun().toUpperCase(),
      score1: faker.word.adjective().toUpperCase(),
      score2: faker.word.adjective().toUpperCase(),
      score3: faker.word.adjective().toUpperCase(),
      score4: faker.word.adjective().toUpperCase(),
      score1desc: faker.lorem.lines(5),
      score2desc: faker.lorem.lines(5),
      score3desc: faker.lorem.lines(5),
      score4desc: faker.lorem.lines(5),
      description: faker.lorem.lines({min: 10, max: 30})
    }
  })
}

async function generateRecords() {
  let pupils = await prisma.pupil.findMany()
  let metrics = await prisma.metric.findMany()
  return [...Array(300).keys()].map(() => {
    return {
      score: Math.ceil(Math.random() * 4),
      pupilId: pupils[Math.floor(Math.random() * pupils.length)].id,
      metricId: metrics[Math.floor(Math.random() * metrics.length)].id,
      createdAt: faker.date.past(),
      note: faker.lorem.lines(2)
    }
  })
}
