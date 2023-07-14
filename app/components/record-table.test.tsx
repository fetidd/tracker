/** @jest-environment jsdom */
import {fireEvent, render} from '@testing-library/react';
import RecordTable from "~/components/record-table"
import { ExpandedRecord } from '~/models/expanded-record';
import { MemoryRouter } from "react-router-dom"
import { faker } from '@faker-js/faker';

const matchRecords = (_c: any, e: any) => e?.tagName.toLowerCase() === "a" && e?.getAttribute("href")?.includes("/records/") || false

function generateTestExpandedRecords(n: number) {
  return [...Array(n).keys()].map(i => (
    {
      id: i, 
      pupil: {
        id: i,
        firstNames: faker.person.firstName(),
        lastName: faker.person.lastName(),
        gender: "male",
        year: 2,
        active: true,
        aln: false,
        lac: false,
        fsm: false,
        eal: false,
        mat: false,
        startDate: new Date(),
        endDate: null
      }, 
      metric: {
        id: i,
        name: "met1",
        score1: "sc1",
        score2: "sc2",
        score3: "sc3",
        score4: "sc4",
      }, 
      score: 1, 
      note: "", 
      createdAt: new Date("2021-01-01")
    }  
  ))
}

const renderRecord = (i: number) => render((
  <a href={`/records/${i}`}>
    <div className=""></div>
  </a>
)).getByText("records")

it("RecordTable shows records correctly", async () => {
  let records: ExpandedRecord[] = generateTestExpandedRecords(1)
  let expectedRendered = [...Array(1).keys()].map(i => renderRecord(i))
  const recordTable = render(
    <RecordTable records={records} />,
    {wrapper: MemoryRouter}
  )
  let actualRenderedRecords = recordTable.queryAllByText(matchRecords)
  // expect(actualRenderedRecords.length).toBe(1)
  expect(actualRenderedRecords).toBe(expectedRendered)
});
