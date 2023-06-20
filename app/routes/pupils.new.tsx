import { Card, Input, Switch, Textarea } from "@material-tailwind/react";
import Button from "@material-tailwind/react/components/Button";
import { ActionArgs, json } from "@remix-run/node";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "~/db/db.server";
import { NewPupilFormSchema } from "~/models/pupil";
import { routes } from "~/routes";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  let validationResult = NewPupilFormSchema.safeParse(formData)
  if (validationResult.success) {
    let pupil = await db.pupil.create({data: {
      ...validationResult.data, 
      startDate: new Date(validationResult.data.startDate),
      endDate: validationResult.data.endDate ? new Date(validationResult.data.endDate) : null
    }})
    return json({success: true, pupil: pupil, errors: []})
  } else {
    return json({success: false, errors: validationResult.error.issues.map(i => {return {path: i.path, message: i.message}}), pupil: null}, {status: 400}) 
  }
}

export default function NewPupil() {
  const actionData = useActionData<typeof action>()
  const [isActive, setIsActive] = useState(true)
  const nav = useNavigate()
  useEffect(() => {
    if (actionData) {
      if (actionData.success && actionData.pupil !== null) {
        toast.success(`Added ${actionData.pupil.firstNames} ${actionData.pupil.lastName}`)
        nav(`${routes.pupils.index()}?justCreated=${actionData.pupil.id}`)
      } else {
        actionData.errors.forEach(err => toast.error(err.message))
      }
    }
  }, [actionData])
  return (
    <Card className="p-3 grow">
        <Form method="post">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
            <div className="flex flex-col gap-4">
              <div className="w-72">
                <Input label="First names" name="firstNames" />
              </div>
              <div className="w-72">
                <Input label="Last name" name="lastName" />
              </div>
              <div className="w-72">
                <Input label="Year" type="number" name="year" />
              </div>
              <div className="w-72">
                <Input label="Gender" name="gender" />
              </div>
              <div className="w-72">
                <Input label="Start date" type="date" name="startDate" />
              </div>
              <div className="w-72">
                <Input label="End date" type="date" name="endDate" disabled={isActive} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
                <Switch id="active-switch" label="Active" defaultChecked={true} name="active" onChange={() => setIsActive(!isActive)} />
                <Switch id="mat-switch" label="More able and talented" name="mat"/>
                <Switch id="lac-switch" label="Looked after child" name="lac"/>
                <Switch id="fsm-switch" label="Free school meals" name="fsm" />
                <Switch id="eal-switch" label="English as additional language" name="eal" />
                <Switch id="aln-switch" label="Additional learning needs" name="aln" />
            </div>
            <div className="grow">
              <Textarea label="Notes" size="lg"/>
            </div>
          </div>
          <div className="mt-4">
            <Button type="submit" color="green">Add Learner</Button>
          </div>
        </Form>
    </Card>
  );
}
