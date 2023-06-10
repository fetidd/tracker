// import { FieldSpec } from "~/fields"

type FieldProps = {
  type: string,
  field?: string,
  label?: string,
  current?: any
  onChange?: any
}

// TODO make this generic over ZodSchemas(?) so it can validate itself
export default function Field({type, onChange, field, label, current}: FieldProps) {
  if (current instanceof Date) {
    current = current.toJSON().split("T")[0]
  }
  if (["text", "number", "date"].includes(type)) {
    // if the field has a current value (e.g. for editing an entity), use it. Else if the field has a default set, use that. Else just a sensible default
    let defaultValue = current ? current : ""
    return (
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input type={type} name={field as string} className="input input-bordered input-sm w-full max-w-xs" defaultValue={defaultValue}/>
      </div>
    )
  } else if (type === "checkbox") {
    let defaultValue = current ? current : false
    return (
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{label}</span> 
          <input onChange={onChange} type="checkbox" name={field as string} defaultChecked={false} className="checkbox" defaultValue={defaultValue}/>
        </label>
      </div>
    )
  } else throw Error("Invalid type")
}

