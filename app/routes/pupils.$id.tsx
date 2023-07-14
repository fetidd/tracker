import { Button, Card, Input, Switch, Textarea } from "@material-tailwind/react";
import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { handleFetchOne, handleUpdate } from "~/handlers/data-handlers";
import { PupilUpdateFormSchema } from "~/models/pupil";
import PupilRepo from "~/repos/pupil";
import { routes } from "~/routes";

// TODO record view section

export async function loader({ params }: LoaderArgs) {
  const pupilId = parseInt(params.id!)
  const repo = new PupilRepo()
  let res = await handleFetchOne(pupilId, repo)
  if (res.success) {
    return json(res)
  } else {
    throw json(res)
  }
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const repo = new PupilRepo()
  let res = await handleUpdate(PupilUpdateFormSchema, formData, repo)
  return json(res)
}

export default function PupilDetails() {
  const pupil = useLoaderData<typeof loader>().entity
  const nav = useNavigate()
  const actionData = useActionData<typeof action>()
  const [isActive, setIsActive] = useState(pupil.active)
  useEffect(() => {
    // if we've received a pupil in the action response then it means we have successfully saved a pupil edit, so turn edit mode off
    if (actionData) {
      if (actionData.success) {      
        let pupil = actionData.entity
        toast.success(`Successfully updated ${pupil.firstNames} ${pupil.lastName}`)
        nav(routes.pupils.index())
      } else {
        actionData.errors.forEach(e => toast.error(e.message))
      }
    }
  }, [actionData])
    return (
      <Card className="p-3 grow h-fit">
      <Form method="POST">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
          <div className="flex flex-col gap-4">
            <div className="w-72">
              <Input label="First names" name="firstNames" defaultValue={pupil.firstNames}/>
            </div>
            <div className="w-72">
              <Input label="Last name" name="lastName" defaultValue={pupil.lastName}/>
            </div>
            <div className="w-72">
              <Input label="Year" type="number" name="year" defaultValue={pupil.year}/>
            </div>
            <div className="w-72">
              <Input label="Gender" name="gender" defaultValue={pupil.gender}/>
            </div>
            <div className="w-72">
              <Input label="Start date" type="date" name="startDate" defaultValue={pupil.startDate.split("T")[0]}/>
            </div>
            <div className="w-72">
              <Input label="End date" type="date" name="endDate" defaultValue={pupil.endDate ? pupil.endDate.split("T")[0] : undefined} disabled={isActive} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
              <Switch id="active-switch" label="Active" defaultChecked={pupil.active} name="active" onChange={() => setIsActive(!isActive)} />
              <Switch id="mat-switch" label="More able and talented" defaultChecked={pupil.mat} name="mat"/>
              <Switch id="lac-switch" label="Looked after child" defaultChecked={pupil.lac} name="lac"/>
              <Switch id="fsm-switch" label="Free school meals" defaultChecked={pupil.fsm} name="fsm" />
              <Switch id="eal-switch" label="English as additional language" defaultChecked={pupil.eal} name="eal" />
              <Switch id="aln-switch" label="Additional learning needs" defaultChecked={pupil.aln} name="aln" />
          </div>
          <div className="grow">
            <Textarea label="Notes" size="lg" defaultValue={pupil.notes}/>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button type="submit" color="green">Save</Button>
          <Link to={routes.pupils.index()}><Button>Cancel</Button></Link>
        </div>
        <input type="hidden" name="id" value={pupil.id} />
      </Form>
      </Card>
  )
}

