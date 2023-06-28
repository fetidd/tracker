import { EyeIcon, PlusIcon, WrenchIcon } from "@heroicons/react/24/solid"
import { Card, List, ListItem } from "@material-tailwind/react"
import { Metric } from "@prisma/client"
import { LoaderArgs } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react"
import { ErrorBoundaryInner } from "~/components"
import { handleFetchOne } from "~/handlers/data-handlers"
import MetricRepo from "~/repos/metric"
import { routes } from "~/routes"
import { css } from "~/style"

export const ErrorBoundary = () => ErrorBoundaryInner()

export async function loader({ params }: LoaderArgs) {
  const metricId = parseInt(params.id!)
  const repo = new MetricRepo()
  let res = await handleFetchOne(metricId, repo)
  return res
}

export default function Metrics() {
	const metric = useLoaderData<typeof loader>()
	return (
		<div className={css.outletLayout}>
			<MetricsMenu metric={metric}/>
			<Outlet />
		</div>
	)
}

function MetricsMenu({metric}: MetricsMenuProps) {
	return (
		<Card className={css.menuCard}>
      <List>
        <Link to={routes.metrics.records(metric.id)}><ListItem className={css.menuListItem}><EyeIcon className="w-5"/>View Records</ListItem></Link>
        <Link to={`${routes.records.new()}?metric=${metric.id}`}><ListItem className={css.menuListItem}><PlusIcon className="w-5" />Add Record</ListItem></Link>
        <Link to={routes.metrics.manage(metric.id)}><ListItem className={css.menuListItem}><WrenchIcon className="w-5" />Manage</ListItem></Link>
      </List>
		</Card>
	)
}

type MetricsMenuProps = {
	metric: Metric
}
