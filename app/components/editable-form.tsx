import { MouseEventHandler, useState } from "react";
import { Button, EditableField } from "../components";
import { Form } from "@remix-run/react";

// TODO delete button needs a prompt in case of accidental clicks

function transformKey(fieldName: string): string {
  let replaceChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
    fieldName[fieldName.length - 1]
  )
    ? ""
    : "_";
  return fieldName.toLowerCase().replace(" ", replaceChar);
}

export default function EditableForm({
  alwaysEdit = false,
  fields,
  onCancel,
  onSave,
  onDelete,
  data,
}: FormProps) {
  const [editMode, setEditMode] = useState(alwaysEdit);
  const [inputState, setInputState] = useState<Map<string, any>>(
    data || mapFromFieldSpecArray(fields)
  );
  return (
    <Form>
      <div className="lg:w-[50%] min-w-[300px] p-5">
        <div className="flex flex-col gap-2 mb-4">
          {fields
            .filter((f) => f.type !== "textarea")
            .map((f) => (
              <div
                key={f.name.toLowerCase()}
                className="flex justify-between items-center"
              >
                <label htmlFor={`${transformKey(f.name)}-input`}>
                  {f.name}
                </label>
                <EditableField
                  inputType={f.type}
                  id={`${transformKey(f.name)}-input`}
                  editMode={editMode}
                  value={inputState.get(transformKey(f.name))}
                  onChange={(ev) => {
                    let newVal =
                      f.type === "checkbox"
                        ? ev.target.checked
                        : ev.target.value;
                    let updated = inputState.set(transformKey(f.name), newVal);
                    let m = new Map(updated);
                    setInputState(m);
                  }}
                />
              </div>
            ))}
        </div>
        {fields
          .filter((f) => f.type === "textarea")
          .map((f) => (
            <div
              className="flex flex-col gap-2 mb-4"
              key={transformKey(f.name)}
            >
              <label htmlFor={`${transformKey(f.name)}-input`}>{f.name}</label>
              <textarea
                className="rounded-md border-solid border-2 border-gray-200 p-1"
                onChange={(ev) => {
                  let updated = inputState.set(
                    transformKey(f.name),
                    ev.target.value
                  );
                  let m = new Map(updated);
                  setInputState(m);
                }}
                value={inputState.get(transformKey(f.name))}
              />
            </div>
          ))}
        <div>
          <div className={`flex justify-end gap-2 ${editMode ? "hidden" : ""}`}>
            <Button
              color="Gray"
              text="Edit"
              handler={(_) => setEditMode(!editMode)}
            />
            <Button color="Red" text="Delete" handler={onDelete} />
          </div>
          <div className={`flex justify-end gap-2 ${editMode ? "" : "hidden"}`}>
            <Button
              color="Green"
              text="Save"
              handler={() => {
                onSave(inputState);
              }}
            />
            <Button
              color="Gray"
              text="Cancel"
              handler={(ev) => {
                if (typeof onCancel !== "undefined") {
                  onCancel(ev);
                }
                setInputState(data || mapFromFieldSpecArray(fields));
                console.log(inputState);
                setEditMode(!editMode);
              }}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}

interface FormProps {
  alwaysEdit?: boolean;
  fields: FieldSpec[];
  data?: Map<string, any>;
  onSave: (a: Map<string, any>) => void;
  onCancel?: MouseEventHandler;
  onDelete?: MouseEventHandler;
}

interface FieldSpec {
  name: string;
  type: string;
}

const FORM_DEFAULTS = new Map<string, any>([
  ["text", ""],
  ["number", 0],
  ["date", new Date()],
  ["checkbox", false],
  ["textarea", ""],
]);

function mapFromFieldSpecArray(specs: FieldSpec[]) {
  let m = new Map<string, any>();
  for (let spec of specs) {
    m.set(transformKey(spec.name), FORM_DEFAULTS.get(spec.type));
  }
  return m;
}
