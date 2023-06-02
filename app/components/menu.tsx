import { Link } from "react-router-dom";
import { Plus } from "react-feather";
import { IconButton } from "~/components";
import { db } from "~/db/db.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Metric } from "@prisma/client";

const DIVIDER_CLASS =
  "italic text-slate-400 mx-auto flex items-center justify-between";

export async function loader() {
  let metrics = await db.metric.findMany()
  return json({
    metrics: metrics
  })
}

export default function Menu() {
  let data = useLoaderData<typeof loader>()
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
            {data?.metrics?.map((m: Metric) => <MenuItem key={m.id} route={`/metrics/${m.id}`} title={m.name} />)}
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
