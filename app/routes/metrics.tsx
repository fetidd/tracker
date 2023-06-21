import { Card, List, ListItem } from "@material-tailwind/react"
import { Link, Outlet } from "@remix-run/react"
import { ErrorBoundaryInner } from "~/components"
import { routes } from "~/routes"
import { LIST_ITEM_CLASS } from "~/styling"

export const ErrorBoundary = () => ErrorBoundaryInner()

export default function Metrics() {

	return (
		<div className="flex gap-2 m-2 h-[85vh]">
			<MetricsMenu />
			<Outlet />
		</div>
	)
}

function MetricsMenu({}: MetricsMenuProps) {
	return (
		<Card className="p-3 w-[200px]">
      <List>
        <Link to={routes.records.index()}><ListItem className={LIST_ITEM_CLASS}>View Records</ListItem></Link>
      </List>
		</Card>
	)
}

type MetricsMenuProps = {
	
}
