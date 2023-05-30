import { ActionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { ArrowLeft } from "react-feather";
import { db } from "~/db/db.server";
import { PUPIL_FIELDS } from "~/fields";
import { PupilFormDataSchema } from "~/models/pupil";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  let validationResult = PupilFormDataSchema.safeParse(formData)
  if (validationResult.success) {
    let pupil = await db.pupil.create({data: validationResult.data})
    return redirect(`/pupils?id=${pupil.id}`)
  } else {
    return json(validationResult.error.issues.map(i => {return {path: i.path, message: i.message}}), {status: 400}) 
  }
}

function snakeCase(str: string): string {
  return str.replace(" ", "_").toLowerCase()
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
      <div className="">
        <Form method="post">
          {PUPIL_FIELDS.map(f => {
            return (
              <div key={`${snakeCase(f.name)}-input-row`}>
                <div className="flex justify-between items-center">
                  <label htmlFor={`${snakeCase(f.name)}-input`}>{f.name}</label>
                  {["text", "number", "date"].includes(f.type) &&
                    <input id={`${snakeCase(f.name)}-input`} type={f.type} name={snakeCase(f.name)} defaultValue={f.default !== undefined ? f.default as string | number : ""}/>
                  }
                  {f.type === "checkbox" &&
                    <input id={`${snakeCase(f.name)}-input`} type={f.type} name={snakeCase(f.name)} defaultChecked={f.default !== undefined ? f.default as boolean : false}/>
                  }
                </div>

                {errors.find(e => e.path.includes(snakeCase(f.name))) &&
                  <span className="text-red-600">{errors.find(e => e.path.includes(snakeCase(f.name)))?.message}</span>
                }
              </div>
            )
          })}
          <button type="submit">Add learner</button>
        </Form>
      </div>
    </>
  );
}
