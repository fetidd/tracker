import { Button, Input, Switch, Textarea } from "@material-tailwind/react";
import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "~/db/db.server";
import { UpdatePupilFormSchema } from "~/models/pupil";
import { routes } from "~/routes";

// TODO record view section

export async function loader({ params }: LoaderArgs) {
  const pupilId = parseInt(params.id!)
  let pupil = await db.pupil.findFirst({where: {id: {equals: pupilId}}})
  if (pupil) {
    return json(pupil)
  } else {
    return redirect(routes.pupils.index())
  }
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  let validationResult = UpdatePupilFormSchema.safeParse(formData)
  if (validationResult.success) {
    let update = {
      ...validationResult.data, 
      startDate: new Date(validationResult.data.startDate), 
      endDate: validationResult.data.endDate ? new Date(validationResult.data.endDate) : null
    }
    let pupil = await db.pupil.update({where: {id: update.id}, data: update})
    return json({pupil: pupil, error: null}, {status: 200})
  } else {
    return json({error: validationResult.error.issues.map(i => {
      return { path: i.path, message: i.message }
    }), pupil: null}, {status: 400}) 
  }
}

export default function PupilDetails() {
  const pupil = useLoaderData<typeof loader>()
  const nav = useNavigate()
  const actionData = useActionData<typeof action>()
  const [isActive, setIsActive] = useState(pupil.active)
  useEffect(() => {
    // if we've received a pupil in the action response then it means we have successfully saved a pupil edit, so turn edit mode off
    if (actionData?.pupil) {      
      toast.success(`Successfully updated ${actionData.pupil.firstNames} ${actionData.pupil.lastName}`)
      nav(routes.pupils.index())
    } else if (actionData?.error) {
      actionData.error.forEach(e => toast.error(e.message))
    }
  }, [actionData])
    return (
      <Form method="post">
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
  )
}

