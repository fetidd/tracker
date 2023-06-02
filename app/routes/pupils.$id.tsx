import { Pupil } from "@prisma/client";
import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button, DetailsHeader, DetailsRow, DetailsText, Field, Tag } from "~/components";
import { db } from "~/db/db.server";
import { PUPIL_FIELDS } from "~/fields";
import { UpdatePupilFormSchema, pupilFromJson } from "~/models/pupil";

// TODO record view section

export async function loader({ params }: LoaderArgs) {
  const pupilId = params.id!
  let pupil = await db.pupil.findFirst({where: {id: {equals: parseInt(pupilId)}}})
  if (pupil) {
    return json(pupil)
  } else {
    return redirect("/pupils")
  }
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  let validationResult = UpdatePupilFormSchema.safeParse(formData)
  if (validationResult.success) {
    let pupilId = validationResult.data.id
    let pupil = await db.pupil.update({where: {id: pupilId}, data: validationResult.data})
    return json({pupil: pupil, errors: null}, {status: 200})
  } else {
    return json({errors: validationResult.error.issues.map(i => {return {path: i.path, message: i.message}}), pupil: null}, {status: 400}) 
  }
}

export default function PupilDetails() {
  const pupilJson = useLoaderData<typeof loader>()
  let pupil = pupilFromJson(pupilJson)
  const [edit, setEdit] = useState(false)
  const actionData = useActionData<typeof action>()
  useEffect(() => {
    // if we've received a pupil in the action response then it means we have successfully saved a pupil edit, so turn edit mode off
    if (actionData?.pupil) setEdit(false)
  }, [actionData])
  const errors = actionData?.errors ? actionData.errors : []
  return edit === false ? (<>
    <div className="flex justify-between w-full p-2">
      <div className="flex flex-col w-[40%] p-2 pr-12 gap-2">
        <DetailsHeader level={2} value={`${pupil.firstNames} ${pupil.lastName}`} />
        <DetailsRow label="Year" value={pupil.year} />
        <DetailsRow label="Gender" value={pupil.gender} />
        <DetailsRow label="Started" value={pupil.startDate.toJSON().split("T")[0]} />
        {pupil.endDate &&
          <DetailsRow label="Left" value={pupil.endDate.toJSON().split("T")[0]} />
        }
        <div className="flex gap-2" >
          {pupil.mat && <Tag text="MAT" color="Red" />}
          {pupil.lac && <Tag text="LAC" color="Yellow" />}
          {pupil.aln && <Tag text="ALN" color="Orange" />}
          {pupil.fsm && <Tag text="FSM" color="Blue" />}
          {pupil.eal && <Tag text="EAL" color="Green" />}
        </div>
        <Button handler={() => setEdit(true)} text="Edit" color="Yellow"/>
      </div>
      <div className="flex flex-col grow p-2 gap-2">
        <div className="p-1 bg-green-200 border-2 border-green-400 flex w-full h-fit justify-between">
          <span>Behaviour</span>
        </div>
        <div className="p-1 bg-yellow-200 border-2 border-yellow-400 flex w-full h-fit justify-between">
          <span>Effort</span>
        </div>
      </div>
    </div>
    <div className="p-4">
      <DetailsText text={pupil.notes || ""} />
    </div>
    </>
  ) : (
    <div className="bg-zinc-100 m-2">
      <Form method="post">
        {PUPIL_FIELDS.map(f => {
          let error = errors.find(e => e.path.includes(f.field))?.message
          return <Field key={`${f.field}-input`} spec={f} current={pupil![f.field as keyof Pupil]} error={error} />
        })}
        <div className="flex gap-2">
          <Button type="submit" text="Save" color="Green"/>
          <Button handler={() => setEdit(false)} text="Cancel" color="Gray"/>
        </div>
        <input type="hidden" name="id" value={pupil.id} />
      </Form>
    </div>
  )
}

