import { useFetcher, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { db } from "~/db/db.server";
import { useAppState } from "~/app-state";
import { routes } from "~/routes";
import Button from "@material-tailwind/react/components/Button";
import { Card, Checkbox, Chip, Input, Typography } from "@material-tailwind/react";
import { YEARS } from "~/constant";
import { sortPupils } from "~/utils/functions";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Pupil, parsePupil } from "~/models/pupil";
import { Fragment, RefObject, useEffect, useState } from "react";
import toast from "react-hot-toast";

export async function loader(_args: LoaderArgs) {
  let pupils = await db.pupil.findMany();
  return json({
    pupils: pupils,
  });
}

export async function action({ request }: ActionArgs) {
  const data = await request.formData()
  if (request.method == "DELETE") {
    let id = data.get("id")
    if (id !== null) {
      let res = await db.pupil.delete({where: {id: parseInt(id as string)}})
      return json({success: true, name: `${res.firstNames} ${res.lastName}`})
    }
  }
}

export default function PupilsIndex() {
  let data = useLoaderData<typeof loader>();
  let pupils = data.pupils.map(parsePupil)
  let [searchParams, _] = useSearchParams()
  let justCreated = searchParams.get("justCreated") !== null ? parseInt(searchParams.get("justCreated")!) : undefined
  return (
    <div className="flex flex-col gap-2 h-[85vh] grow">
      <SettingsBox />
      <PupilTable pupils={pupils} selected={justCreated} />
    </div>
  );
}

type SettingsBoxProps = {
}
function SettingsBox({  }: SettingsBoxProps) {
  const [app, mutate] = useAppState()
  return (
    <Card className="flex flex-row gap-4 items-center p-3">
      <div className="w-72">
        <Input label="Filter" onChange={ev => mutate({property: "pupilFilter", mutation: ev.target.value})} defaultValue={app!.pupilFilter} />
      </div>
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

type PupilTableProps = {
  pupils: Pupil[],
  selected?: number,
}

function PupilTable({ pupils, selected }: PupilTableProps) {
  const [app, _mutate] = useAppState()
  const nav = useNavigate()
  const [expanded, setExpanded] = useState<number | null>(selected ? selected : null)
  const fetcher = useFetcher()

  const deletePupil = (id: number) => {  
    fetcher.submit({id: id.toString()}, {method: "DELETE", action: `${routes.pupils.index()}?index`})
  }

  useEffect(() => {
    if (fetcher.data && fetcher.state == "idle" && fetcher.data.success) {
      let pupil = fetcher.data.name
      toast.success(`Deleted ${pupil}`)
    }
  }, [fetcher])

  // Allow the table to automatically scroll to the just created pupil // FIXME deleting a pupil means one less ref on redraw, so React freaks out
  let refs: {[i: number]: RefObject<HTMLTableRowElement> | null} = {}
  // pupils.forEach(p => refs[p.id!] = useRef<HTMLTableRowElement>(null))
  // useEffect(() => {
  //   if (selected !== undefined && refs[selected]?.current) refs[selected]?.current?.scrollIntoView()  
  // }, [])
  
  return (
      <Card className="p-3 grow overflow-auto">
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded">
      <table className="w-full min-w-max table-auto text-left">
        <tbody>
          {pupils
            .sort((a, b) => sortPupils(a, b))
            .filter(p => `${p.firstNames.toLowerCase()} ${p.lastName.toLowerCase()}`.includes(app!.pupilFilter.toLowerCase()))
            .filter(p => p.active ? true : app.showInactive ? true : false)
            .map((p) => (
              <Fragment key={p.id}>
              <tr className={`cursor-pointer hover:bg-gray-100 `} ref={refs[p.id!]} onClick={() => {
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
                    {expanded === p.id && 
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
                  <Fragment>
                  <tr className="cursor-pointer pl-10 gap-4" onClick={() => setExpanded(null)}>
                    <td colSpan={3} className={`p-2 bg-gray-100 ${!p.notes ? "rounded-b-md" : ""}`}>
                      <div className="flex items-center gap-5">
                        <Typography variant="small" color={p.endDate ? "red" : "green"} className="font-normal">
                          {p.startDate.toDateString()}
                        </Typography>
                        {p.endDate && 
                          <Typography variant="small" color="red" className="font-normal">
                            {"-> " + (p.endDate !== undefined && p.endDate !== null ? p.endDate.toDateString() : "")}
                          </Typography>
                        }
                        <div className="flex gap-2 items-center">
                          {["mat", "aln", "fsm", "lac", "eal"].map((t, i) => {
                            return p[t as keyof typeof p] ? <Chip size="sm" className="rounded-3xl z-0" variant="outlined" color="red" key={i} value={t.toUpperCase()}/> : null
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 pt-1 bg-gray-100 rounded-b-md">
                        <Button size="sm" className="mx-auto flex items-center gap-3 w-[100px]" color="red" onClick={() => deletePupil(p.id!)}>
                         <XMarkIcon className="w-8"/> Delete
                        </Button>                    
                    </td>
                  </tr>
                  {p.notes && p.notes.split("\n").slice(0, 3).map((note, i) => ( 
                    <tr key={i} className="cursor-pointer pl-10 gap-4" onClick={() => setExpanded(null)}>
                      <td colSpan={5} className={`p-2 bg-gray-100 ${i === 3 || i === p.notes!.split("\n").length-1 ? "rounded-b-md": ""}`}>
                        <Typography variant="small">{note}</Typography>
                      </td>
                    </tr>))
                  }
                  </Fragment>
              }
              </Fragment>
            ))
          }
        </tbody>
      </table>
      </div>
      </Card>
  )
}