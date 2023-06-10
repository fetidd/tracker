import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/node";
import { db } from "~/db/db.server";
import { useAppState } from "~/app-state";
import { routes } from "~/routes";
import Button from "@material-tailwind/react/components/Button";
import { Card, Checkbox, Chip, IconButton, Input, Typography } from "@material-tailwind/react";
import { YEARS } from "~/constant";
import { sortPupils } from "~/utils/functions";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Pupil, parsePupil } from "~/models/pupil";
import { Fragment, useState } from "react";

export async function loader(_args: LoaderArgs) {
  let pupils = await db.pupil.findMany();
  return json({
    pupils: pupils,
  });
}

export default function PupilsIndex() {
  let data = useLoaderData<typeof loader>();
  let pupils = data.pupils.map(parsePupil)
  return (
  <div className="flex flex-col gap-2 m-2 h-[85vh]">
      <SettingsBox />
      <PupilTable pupils={pupils} />
    </div>
  );
}

function SettingsBox() {
  const [app, mutate] = useAppState()
  return (
    <Card className="flex flex-row gap-4 items-center p-4">
      <Link to={routes.pupils.new()}>
        <Button>Add Learner</Button>
      </Link>
      <div className="w-72"><Input label="Filter" /></div>
      <Checkbox
        label="Show inactive learners"
        defaultChecked={app.showInactive}
        onChange={() => {
          mutate({property: "showInactive", mutation: !app.showInactive});
        }}
      />
    </Card>
  )
}


function PupilTable({ pupils }: {pupils: Pupil[]}) {
  const [app, _mutate] = useAppState()
  const nav = useNavigate()
  const [expanded, setExpanded] = useState<number | null>(null)
  return (
      <Card className="p-2 grow overflow-auto">
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded">
      <table className="w-full min-w-max table-auto text-left">
        <tbody>
          {pupils.sort((a, b) => sortPupils(a, b)).filter(p => p.active ? true : app.showInactive ? true : false).map((p) => (
            <Fragment key={p.id}>
            <tr className={`cursor-pointer hover:bg-gray-100 `} onClick={() => {
                  if (expanded === p.id) {
                    setExpanded(null)
                  } else if (p.id !== undefined) {
                    setExpanded(p.id)
                  }
                }}>
              <td className={`p-2 w-[600px] ${expanded==p.id?'bg-gray-100 rounded-tl-md':''}`}>
                <Typography variant="h5" color="blue-gray" className="font-normal">
                  {`${p.firstNames} ${p.lastName}`}
                </Typography>
              </td>
              <td className={`p-2 w-[100px] ${expanded==p.id?'bg-gray-100':''}`}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {YEARS[p.year.toString() as keyof typeof YEARS]}
                </Typography>
              </td>
              <td className={`p-2 w-[200px] ${expanded==p.id?'bg-gray-100':''}`}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {p.gender}
                </Typography>
              </td>
              <td className={`p-2 w-26 ${expanded==p.id?'bg-gray-100 rounded-tr-md':''}`}>
                  {expanded !== p.id ? 
                    (<IconButton size="sm" className="mx-auto flex" onClick={ev => {
                      ev.stopPropagation()
                      nav(routes.pupils.details(p.id!))
                    }}>
                      <PencilIcon className="w-5"/>
                    </IconButton>) 
                    : 
                    (<Button size="sm" className="mx-auto flex items-center gap-3 w-[100px]" onClick={ev => {
                      ev.stopPropagation()
                      nav(routes.pupils.details(p.id!))
                    }}>
                     <PencilIcon className="w-5"/> Edit
                    </Button>) 
                  }
              </td>
            </tr>
            {expanded === p.id &&
                <tr className="cursor-pointer pl-10 gap-4" onClick={() => setExpanded(null)}>
                  <td colSpan={3} className="p-2 bg-gray-100 rounded-b-md">
                    <div className="flex items-center gap-5">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {p.startDate.toDateString()}
                      </Typography>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {p.endDate !== undefined && p.endDate !== null ? p.endDate.toDateString() : ""}
                      </Typography>
                      <div className="flex gap-2 items-center">
                        {["mat", "aln", "fsm", "lac", "eal"].map((t, i) => {
                          return p[t as keyof typeof p] ? <Chip size="sm" className="rounded-3xl z-0" variant="outlined" color="red" key={i} value={t.toUpperCase()}/> : null
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 pt-1 bg-gray-100 rounded-b-md">
                    <Button size="sm" className="mx-auto flex items-center gap-3 w-[100px]" color="red">
                     <XMarkIcon className="w-5"/> Delete
                    </Button>                    
                  </td>
                </tr>
            }
            </Fragment>
          ))}
        </tbody>
      </table>
      </div>
      </Card>
  )
}