import { Button, Card, Input } from "@material-tailwind/react";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useRef } from "react";
import { useAppState } from "~/app-state";
import RecordTable from "~/components/record-table";
import { ExpandedRecord, ExpandedRecordSchema, generateExpandedRecords } from "~/models/expanded-record";
import MetricRepo from "~/repos/metric";
import PupilRepo from "~/repos/pupil";
import RecordRepo from "~/repos/record";


export async function loader(args: LoaderArgs) {
  const metricId = parseInt(args.params["id"] as string)
  const pupRepo = new PupilRepo()
  const recRepo = new RecordRepo()
  const metRepo = new MetricRepo()
  let records = await recRepo.readMany({where: {metricId: metricId}})
  let pupils = await pupRepo.readMany({where: {id: {in: records.map(r => r.pupilId)}}})
  let metric = await metRepo.readOne(metricId)
  let expRecs: ExpandedRecord[] = generateExpandedRecords(records, pupils, [metric])
  return json({
    records: expRecs
  })
}

export default function MetricRecords() {
  const data = useLoaderData<typeof loader>()
  const [app, _] = useAppState()
  let records = data.records
    .map(r => ExpandedRecordSchema.parse(r))
    .sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf())
    .filter(r => `${r.pupil.firstNames.toLowerCase()} ${r.pupil.lastName.toLowerCase()}`.includes(app!.pupilFilter.toLowerCase()))
  return (
    <div className="flex flex-col w-full gap-2">
      <SettingsBox />      
      <RecordTable records={records} />
    </div>
  )
}


export function SettingsBox() {
  const [app, mutate] = useAppState()
  const filterInput = useRef<HTMLInputElement>(null)
  return (
    <Card className="flex flex-row gap-4 items-center p-3">
      <div className="w-72 relative flex w-full max-w-[24rem]">
        <Input inputRef={filterInput} label="Filter" onChange={ev => {mutate({property: "pupilFilter", mutation: ev.target.value})}} defaultValue={app!.pupilFilter} />
        <Button size="sm" disabled={filterInput.current?.value === ""} className="!absolute right-1 top-1 rounded" onClick={() => {
          mutate({property: "pupilFilter", mutation: ""})
          filterInput.current!.value = ""
        }} >Clear</Button>
      </div>
    </Card>
  )
}
