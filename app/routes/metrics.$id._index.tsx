import { Card, Tooltip, Typography } from "@material-tailwind/react";
import { Metric } from "@prisma/client";
import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { handleFetchOne } from "~/handlers/data-handlers";
import MetricRepo from "~/repos/metric";
import { css } from "~/style";

export async function loader({ params }: LoaderArgs) {
  const metricId = parseInt(params.id!)
  const repo = new MetricRepo()
  return await handleFetchOne(metricId, repo)
}

export default function MetricDashboard() {
	const metric: Metric = useLoaderData<typeof loader>()
  return (
    <Card className={css.outletCard}>
      <div className="flex justify-between mb-4">
        <Typography variant="h2">{metric.name}</Typography>
        <MetricKey metric={metric} />
      </div>
      <Typography variant="paragraph">{metric.description}</Typography>
    </Card>
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
      <div className={KEY_CLASS + " bg-red-400 border-red-600"}>
        <Typography variant="h3" color="white">{metric.score1}</Typography>
      </div>
      </Tooltip>
      <div className={KEY_CLASS + " bg-orange-400 border-orange-600"}>
        <Typography variant="h3">{metric.score2}</Typography>
      </div>
      <div className={KEY_CLASS + " bg-yellow-400 border-yellow-600"}>
        <Typography variant="h3">{metric.score3}</Typography>
      </div>
      <div className={KEY_CLASS + " bg-green-400 border-green-600"}>
        <Typography variant="h3" color="white">{metric.score4}</Typography>
      </div>
    </div>
  )
}