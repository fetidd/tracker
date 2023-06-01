import { FieldSpec } from "~/fields"
import { snakeCase } from "~/utils/functions"

type FieldProps = {
  spec: FieldSpec,
  error: any,
  current?: any
}

// TODO make this generic over ZodSchemas(?) so it can validate itself
export default function Field({spec, error, current}: FieldProps) {
  console.log(current)
  if (current instanceof Date) {
    current = current.toJSON().split("T")[0]
  }
  return (
    <div className="flex justify-between items-center p-2">
      <label htmlFor={`${snakeCase(spec.name)}-input`}>{spec.name}</label>
      {error && <span className="text-red-600 text-sm">{error}</span>}
      {["text", "number", "date"].includes(spec.type) &&
        <input id={`${snakeCase(spec.name)}-input`} type={spec.type} name={snakeCase(spec.name)} defaultValue={current !== undefined ? current : spec.default !== undefined ? spec.default as string | number : ""}/>
      }
      {spec.type === "checkbox" &&
        <input id={`${snakeCase(spec.name)}-input`} type={spec.type} name={snakeCase(spec.name)} defaultChecked={current !== undefined ? current : spec.default !== undefined ? spec.default as boolean : false}/>
      }
    </div>
  )
}

