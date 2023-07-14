import { useFetcher, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import toast from "react-hot-toast";
import Button from "@material-tailwind/react/components/Button";
import { Card, Checkbox, Chip, Input, Typography } from "@material-tailwind/react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { useAppState } from "~/app-state";
import { routes } from "~/routes";
import { YEARS } from "~/constant";
import { sortPupils } from "~/utils/functions";
import { Fragment, useEffect, useRef, useState } from "react";
import { css } from "~/style";
import { handleDelete, handleFetchAll } from "~/handlers/data-handlers";
import PupilRepo from "~/repos/pupil";
import { Pupil, PupilSchema } from "~/models/pupil";
import RecordRepo from "~/repos/record";

export async function loader(_args: LoaderArgs) {
  const repo = new PupilRepo()
  let res = await handleFetchAll(repo)
  if (res.success) {
    return json(res)
  } else {
    throw json(res)
  }
}

export async function action({ request }: ActionArgs) {
  const data = await request.formData()
  const pupils = new PupilRepo()
  const records = new RecordRepo()
  if (request.method == "DELETE") {
    let id = data.get("id")
    if (id !== null) {
      let deleteRecordsRes = await handleDelete({where: {pupilId: parseInt(id as string)}}, records)
      let deletePupilRes = await handleDelete(parseInt(id as string), pupils)
      if (deleteRecordsRes.success && deletePupilRes.success) {
        return json({success: true, entity: deletePupilRes.entity})
      } else {
        return json({succcess: false, errors: [
          deleteRecordsRes,
          deletePupilRes
        ]})
      }
    }
  }
}

export default function PupilsIndex() {
  let data = useLoaderData<typeof loader>().entity
  let pupils = data.map((p: Pupil) => PupilSchema.parse(p))
  let [searchParams, _] = useSearchParams()
  let justCreated = searchParams.get("justCreated") !== null ? parseInt(searchParams.get("justCreated")!) : undefined
  return (
    <div className="flex flex-col gap-2 h-[89vh] grow">
      <SettingsBox />
      <PupilTable pupils={pupils} selected={justCreated} />
    </div>
  );
}

function SettingsBox() {
  const [app, mutate] = useAppState()
  const filterInput = useRef<HTMLInputElement>(null)
  return (
    <Card className="flex flex-row gap-4 items-center p-3">
      <div className="w-72 relative flex w-full max-w-[24rem]">
        <Input inputRef={filterInput} label="Filter" onChange={ev => mutate({property: "pupilFilter", mutation: ev.target.value})} defaultValue={app!.pupilFilter} />
        <Button size="sm" disabled={filterInput.current?.value === ""} className="!absolute right-1 top-1 rounded" onClick={() => {
          mutate({property: "pupilFilter", mutation: ""})
          filterInput.current!.value = ""
        }} >Clear</Button>
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
  const [selectedToDelete, setSelectedToDelete] = useState<Pupil | null>(null)
  const fetcher = useFetcher()

  const deletePupil = (id: number) => {  
    fetcher.submit({id: id.toString()}, {method: "DELETE", action: `${routes.pupils.index()}?index`})
    setSelectedToDelete(null)
  }

  useEffect(() => {
    if (fetcher.data && fetcher.state == "idle" && fetcher.data.success) {
      let pupil = PupilSchema.parse(fetcher.data.entity)
      toast.success(`Deleted ${pupil.firstNames} ${pupil.lastName}`)
    }
  }, [fetcher])

  useEffect(() => {
    if (selected !== undefined) {
      document.querySelector(`#pupil-${selected}`)?.scrollIntoView()
    }
  }, [])
  
  return (
      <>
      <div className="flex justify-center">
        <DeletePupilDialog pupil={selectedToDelete} deleteCallback={deletePupil} setSelectedToDelete={setSelectedToDelete}/>
      </div>
      <Card className={css.outletCard}>
      <div className={css.scrollingDiv}>
      <table className="w-full min-w-max table-auto text-left">
        <tbody>
          {pupils
            .sort((a, b) => sortPupils(a, b))
            .filter(p => `${p.firstNames.toLowerCase()} ${p.lastName.toLowerCase()}`.includes(app!.pupilFilter.toLowerCase()))
            .filter(p => p.active ? true : app.showInactive ? true : false)
            .map((p) => (
              <Fragment key={p.id}>
              <tr id={`pupil-${p.id}`} className={`cursor-pointer hover:bg-gray-100 `} onClick={() => {
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
                  <Typography variant="paragraph" color="blue-gray" className="font-normal">
                    {YEARS[p.year.toString() as keyof typeof YEARS]}
                  </Typography>
                </td>
                <td className={`p-2 w-[200px] ${expanded==p.id?'bg-gray-100':''}`}>
                  <Typography variant="paragraph" color="blue-gray" className="font-normal">
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
                        <Typography variant="paragraph" color={p.endDate ? "red" : "green"} className="font-normal">
                          {p.startDate.toLocaleDateString()}
                        </Typography>
                        {p.endDate && 
                          <Typography variant="paragraph" color="red" className="font-normal">
                            {"-> " + (p.endDate !== undefined && p.endDate !== null ? p.endDate.toLocaleDateString() : "")}
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
                        <Button size="sm" className="mx-auto flex items-center gap-3 w-[100px]" color="red" onClick={() => setSelectedToDelete(p)}>
                         <XMarkIcon className="w-8"/> Delete
                        </Button>                    
                    </td>
                  </tr>
                  {p.notes && p.notes.split("\n").slice(0, 3).map((note, i) => ( 
                    <tr key={i} className="cursor-pointer pl-10 gap-4" onClick={() => setExpanded(null)}>
                      <td colSpan={5} className={`p-2 bg-gray-100 ${i === 3 || i === p.notes!.split("\n").length-1 ? "rounded-b-md": ""}`}>
                        <Typography variant="paragraph">{note}</Typography>
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
      </>
  )
}

type DeletePupilDialogProps = {
  pupil: Pupil | null,
  deleteCallback: (id: number) => void,
  setSelectedToDelete: (arg: Pupil | null) => void
}

function DeletePupilDialog({ pupil, deleteCallback, setSelectedToDelete }: DeletePupilDialogProps) {
  if (pupil) {
    return (
      <Card className={`${css.outletCard} h-[120px]`}>
        <div className="flex flex-col justify-between h-full">
          <Typography variant="h5">{`${pupil.firstNames} ${pupil.lastName} and all their records etc. will be gone forever - really delete?`}</Typography>
          <div className="flex justify-around gap-4">
            <Button color="red" onClick={() => deleteCallback(pupil.id)}>Yes</Button>
            <Button className="grow" color="green" onClick={() => setSelectedToDelete(null)}>No</Button>
          </div>
        </div>
      </Card>
    )
  } else {
    return <></>
  }
}