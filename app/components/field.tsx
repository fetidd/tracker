import { FieldSpec } from "~/fields"

type FieldProps<T> = {
  spec: FieldSpec<T>,
  error: any,
  current?: any
}

// TODO make this generic over ZodSchemas(?) so it can validate itself
export default function Field<T>({spec, error, current}: FieldProps<T>) {
  if (current instanceof Date) {
    current = current.toJSON().split("T")[0]
  }
  return (
    <div className="flex justify-between items-center p-2">
      <label htmlFor={`${spec.field as string}-input`}>{spec.label}</label>
      {error && <span className="text-red-600 text-sm">{error}</span>}
      {["text", "number", "date"].includes(spec.type) &&
        <input id={`${spec.field as string}-input`} type={spec.type} name={spec.field as string} defaultValue={current !== undefined ? current : spec.default !== undefined ? spec.default as string | number : ""}/>
      }
      {spec.type === "checkbox" &&
        <input id={`${spec.field as string}-input`} type={spec.type} name={spec.field as string} defaultChecked={current !== undefined ? current : spec.default !== undefined ? spec.default as boolean : false}/>
      }
    </div>
  )
}

