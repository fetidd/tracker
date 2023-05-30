import { Link } from "react-router-dom";
import { Plus } from "react-feather";
import { IconButton } from "~/components";

const DIVIDER_CLASS =
  "italic text-slate-400 mx-auto flex items-center justify-between";

export default function Menu() {
  return (
    <div id="menu" className="flex flex-col justify-between bg-white h-full">
      <div className="flex flex-col gap-6 p-2 mt-1">
        <div className="flex flex-col gap-2">
          <span className={DIVIDER_CLASS}>{"Manage"}</span>
          <MenuItem route={"/pupils"} title="Learners" />
        </div>
        <div className="flex flex-col gap-2">
          <span className={DIVIDER_CLASS}>
            {"Metrics"}
            <Link to={"/metrics/add"}>
              <IconButton icon={<Plus />} />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ route, title }: MenuItemProps) {
  return (
    <div className="bg-slate-100 hover:bg-slate-200 border-2 border-slate-100 rounded-md">
      <Link to={route}>
        <p className="text-md text-center">{title}</p>
      </Link>
    </div>
  );
}

interface MenuItemProps {
  route: string;
  title: string;
}
