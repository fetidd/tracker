import { UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, List, ListItem } from "@material-tailwind/react";
import { Link, Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Fragment } from "react";
import { routes } from "~/routes";

export function ErrorBoundary() {
  const routeError = useRouteError()
  if (isRouteErrorResponse(routeError)) {
    const errors = routeError.data.map((e: any) => {
      return (
        <div>
          <p>{e.message}</p>
        </div>
      )
    })
    return <Fragment><p>errors</p>{errors}</Fragment>
  }
}

export default function Pupils() {
  return (
    <div className="flex gap-2 m-2 h-[85vh]">
      <PupilMenu />
      <Outlet />
    </div>
  )
}

const LIST_ITEM_CLASS = "flex gap-2 items-center w-fit"
function PupilMenu({}: PupilMenuProps) {
  return (
    <Card className="p-3 w-[200px]">
      <List>
        <Link to={routes.pupils.index()}><ListItem className={LIST_ITEM_CLASS}><UserGroupIcon className="w-5"/>View Learners</ListItem></Link>
        <Link to={routes.pupils.new()}><ListItem className={LIST_ITEM_CLASS}><UserPlusIcon className="w-5"/>Add Learner</ListItem></Link>
      </List>
    </Card>
  )
}

type PupilMenuProps = {
  
}
