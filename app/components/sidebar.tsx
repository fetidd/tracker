import {
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    BookOpenIcon,
} from "@heroicons/react/24/solid";
import { Metric } from "@prisma/client";
import { routes } from "~/routes";
import { Link } from "@remix-run/react";
 
export default function Sidebar({metrics}: {metrics: Metric[]}) {
  return (
    <div id="menu" className="">
      <List>
        <Link to={routes.pupils.index()}>
        <ListItem>
          <ListItemPrefix>
            <BookOpenIcon className="h-5 w-5" />
          </ListItemPrefix>
          Learners
        </ListItem>
      </Link>
      </List>
    </div>
  );
}
