import { UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, List, ListItem } from "@material-tailwind/react";
import { Link, Outlet } from "@remix-run/react";
import { routes } from "~/routes";
import { LIST_ITEM_CLASS } from "~/styling";
import { ErrorBoundaryInner } from "~/components";

export const ErrorBoundary = () => ErrorBoundaryInner()

export default function Pupils() {
  return (
    <div className="flex gap-2 m-2 h-[85vh]">
      <PupilMenu />
      <Outlet />
    </div>
  )
}

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
