import { ActionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { ArrowLeft } from "react-feather";
import { Button, Field } from "~/components";
import { db } from "~/db/db.server";
import { PUPIL_FIELDS } from "~/fields";
import { NewPupilFormSchema } from "~/models/pupil";
import { snakeCase } from "~/utils/functions";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  let validationResult = NewPupilFormSchema.safeParse(formData)
  if (validationResult.success) {
    let pupil = await db.pupil.create({data: validationResult.data})
    return redirect(`/pupils/${pupil.id}`)
  } else {
    return json(validationResult.error.issues.map(i => {return {path: i.path, message: i.message}}), {status: 400}) 
  }
}

export default function NewPupil() {
  const actionData = useActionData<typeof action>()
  const errors = actionData ? actionData : []
  return (
    <>
      <div className="flex justify-start items-center gap-3">
        <Link to="/pupils">
          <ArrowLeft size={16} />
        </Link>
        <span className="text-xl">{"Add a learner"}</span>
      </div>
      <div className="bg-zinc-100 m-2">
        <Form method="post">
          {PUPIL_FIELDS.map(f => {
            let error = errors.find(e => e.path.includes(snakeCase(f.name)))?.message
            return <Field key={`${snakeCase(f.name)}-input`} spec={f} error={error} />
          })}
          <Button type="submit" text="Add learner" color="Green"/>
        </Form>
      </div>
    </>
  );
}
