import { Card, Tooltip, Typography } from "@material-tailwind/react";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import RecordTable from "~/components/record-table";
import { handleFetchMany, handleFetchOne } from "~/handlers/data-handlers";
import { Metric } from "~/models/metric";
import MetricRepo from "~/repos/metric";
import PupilRepo from "~/repos/pupil";
import RecordRepo from "~/repos/record";
import { Record } from "~/models/record"
import { ExpandedRecordSchema, generateExpandedRecords } from "~/models/expanded-record";

export async function loader({ params }: LoaderArgs) {
  const metricId = parseInt(params.id!)
  const repo = new MetricRepo()
  let metric = await handleFetchOne(metricId, repo)
  let records = await handleFetchMany({where: {metricId: metricId}}, new RecordRepo())
  if (metric.success && records.success) {
    let pupils = await handleFetchMany({where: {id: {in: records.entity.map((r: Record) => r.pupilId)}}}, new PupilRepo())
    if (pupils.success) {
      let expRecs = generateExpandedRecords(records.entity, pupils.entity, [metric.entity])
      return json({success: true, metric: metric.entity, records: expRecs})
    } else {
      throw json({success: false, errors: [Error("failed to fetch pupils to generate expanded records")]})
    }
  } else {
    throw json({success: false, errors: [
      !records.success ? records.errors : [], 
      !metric.success ? metric.errors : []
    ]})
  }
}

export default function MetricDashboard() {
	const data = useLoaderData<typeof loader>()
  return (
    <div className="flex flex-col gap-2 w-full">
      <Card className="p-3">
        <div className="flex justify-between mb-4">
          <Typography variant="h2">{data.metric.name}</Typography>
          <MetricKey metric={data.metric} />
        </div>
        <Typography variant="paragraph">{data.metric.description}</Typography>
      </Card>
      <RecordTable records={data.records.map(r => ExpandedRecordSchema.parse(r)).sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf())}/>
    </div>
  )
}

const KEY_CLASS = "w-fit flex items-center rounded-xl p-2 border-solid border-4"

type MetricKeyProps = {
  metric: Metric
}

function MetricKey({ metric }: MetricKeyProps) {
  
  return (
    <div className="flex h-16 justify-stretch gap-2">
      <Tooltip content={metric.score1desc}>
      <div className={KEY_CLASS + " bg-red-100 border-red-400"}>
        <Typography variant="h3">{metric.score1}</Typography>
      </div>
      </Tooltip>
      <div className={KEY_CLASS + " bg-orange-100 border-orange-400"}>
        <Typography variant="h3">{metric.score2}</Typography>
      </div>
      <div className={KEY_CLASS + " bg-yellow-100 border-yellow-400"}>
        <Typography variant="h3">{metric.score3}</Typography>
      </div>
      <div className={KEY_CLASS + " bg-green-100 border-green-400"}>
        <Typography variant="h3">{metric.score4}</Typography>
      </div>
    </div>
  )
}