import { Link } from "react-router-dom";
import { Book, Plus } from "react-feather";
import { Metric } from "@prisma/client";
import { ReactNode } from "react";

const DIVIDER_CLASS =
  "italic text-slate-400 mx-auto flex items-center justify-between";


export default function Menu({data}: MenuProps) {
  return (
    <div id="menu" className="flex flex-col justify-between bg-white h-full">
      <div className="flex flex-col gap-6 p-2 mt-1">
        <div className="flex flex-col gap-2">
          <span className={DIVIDER_CLASS}>Manage</span>
          <MenuItem route={"/pupils"} title="Learners" icon={<Book size={16} />} />
        </div>
        <div className="flex flex-col gap-2">
          <span className={DIVIDER_CLASS}>Metrics</span>
          <MenuItem route={"/metrics/new"} title="Add new" icon={<Plus size={16} />}/>
          {data.metrics.map((m: Metric) => <MenuItem key={m.id} route={`/metrics/${m.id}`} title={m.name} />)}
        </div>
      </div>
    </div>
  );
}

type MenuProps = {
  data: any
}

function MenuItem({ route, title, icon }: MenuItemProps) {
  return (
    <Link to={route}>
    <div className="bg-slate-100 hover:bg-slate-200 border-2 border-slate-100 rounded-md flex gap-2 justify-center items-center">
        {icon}

        <span className="text-md text-center">{title}</span>
    </div>
    </Link>
  );
}

interface MenuItemProps {
  route: string
  title: any
  icon?: ReactNode
}
