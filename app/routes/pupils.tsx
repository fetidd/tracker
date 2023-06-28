import { UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, List, ListItem } from "@material-tailwind/react";
import { Link, Outlet } from "@remix-run/react";
import { routes } from "~/routes";
import { ErrorBoundaryInner } from "~/components";
import { css } from "~/style";

export const ErrorBoundary = () => ErrorBoundaryInner()

export default function Pupils() {
  return (
    <div className={css.outletLayout}>
      <PupilMenu />
      <Outlet />
    </div>
  )
}

function PupilMenu({}: PupilMenuProps) {
  return (
    <Card className="p-3 w-[200px]">
      <List>
        <Link to={routes.pupils.index()}><ListItem className={css.menuListItem}><UserGroupIcon className="w-5"/>View Learners</ListItem></Link>
        <Link to={routes.pupils.new()}><ListItem className={css.menuListItem}><UserPlusIcon className="w-5"/>Add Learner</ListItem></Link>
      </List>
    </Card>
  )
}

type PupilMenuProps = {
  
}
