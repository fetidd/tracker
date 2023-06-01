import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button, DetailsHeader, DetailsRow, DetailsText, Field, Tag } from "~/components";
import { db } from "~/db/db.server";
import { PUPIL_FIELDS } from "~/fields";
import { PupilFormDataSchema, pupilFromJson } from "~/models/pupil";
import { snakeCase } from "~/utils/functions";

// TODO record view section

export async function loader({ params }: LoaderArgs) {
  const pupilId = params.id!
  let pupil = await db.pupil.findFirst({where: {id: {equals: parseInt(pupilId)}}})
  return json(pupil)
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  let validationResult = PupilFormDataSchema.safeParse(formData)
  if (validationResult.success) {
    let pupil = await db.pupil.create({data: validationResult.data})
    return redirect(`/pupils/${pupil.id}`)
  } else {
    return json(validationResult.error.issues.map(i => {return {path: i.path, message: i.message}}), {status: 400}) 
  }
}

export default function PupilDetails() {
  const nav = useNavigate()
  const pupilJson = useLoaderData<typeof loader>()
  const pupil = pupilFromJson(pupilJson)
  useEffect(() => {
    if (pupil === null) {
      // TODO error toast for non-existent pupil
      nav("/pupils")
    }
  }, [])
  const [edit, setEdit] = useState(false)
  const actionData = useActionData<typeof action>()
  const errors = actionData ? actionData : []
  return edit === false ? (<>
    <div className="flex justify-between w-full bg-zinc-100 p-2">
      <div className="flex flex-col w-[40%] p-2 pr-12 gap-2">
        <DetailsHeader level={2} value={`${pupil?.first_names} ${pupil?.last_name}`} />
        <DetailsRow label="Year" value={pupil?.year} />
        <DetailsRow label="Gender" value={pupil?.gender} />
        <DetailsRow label="Started" value={pupil?.start_date.toString().split("T")[0]} />
        {pupil?.end_date &&
          <DetailsRow label="Left" value={pupil?.end_date.toString().split("T")[0]} />
        }
        <div className="flex gap-2" >
          {pupil?.more_able_and_talented && <Tag text="MAT" color="Red" />}
          {pupil?.looked_after_child && <Tag text="LAC" color="Yellow" />}
          {pupil?.additional_learning_needs && <Tag text="ALN" color="Orange" />}
          {pupil?.free_school_meals && <Tag text="FSM" color="Blue" />}
          {pupil?.english_as_additional_language && <Tag text="EAL" color="Green" />}
        </div>
        <DetailsText text={pupil?.notes || ""} />
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
    <Button handler={() => setEdit(true)} text="Edit" color="Yellow"/>
    </>
  ) : (
    <div className="bg-zinc-100 m-2">
      <Form method="post">
        {PUPIL_FIELDS.map(f => {
          let error = errors.find(e => e.path.includes(snakeCase(f.name)))?.message
          return <Field key={`${snakeCase(f.name)}-input`} spec={f} current={pupil![snakeCase(f.name)]} error={error} />
        })}
        <Button type="submit" text="Save" color="Green"/>
        <Button handler={() => setEdit(false)} text="Cancel" color="Gray"/>
      </Form>
    </div>
  )
}

